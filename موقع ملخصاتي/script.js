/**
 * =====================================================
 * script.js — v3 PREMIUM | ملخصاتي | Kotobati
 * =====================================================
 */

/* ─────────────────────────────────────────────
   1. قاموس الترجمات
───────────────────────────────────────────── */
const i18n = {
  ar: {
    navHome:          "الرئيسية",
    heroCta:          "تصفح المكتبة",
    libraryTitle:     "المكتبة",
    librarySub:       "كل كتاب، ملخص وافٍ في دقائق",
    backBtn:          "العودة إلى المكتبة",
    shareBtn:         "مشاركة",
    footerCopy:       "© 2025 — جميع الحقوق محفوظة",
    cardCta:          "اقرأ الملخص",
    bookBadge:        "ملخص كتاب",
    audioLabel:       "استمع إلى الملخص",
    summaryLabel:     "الملخص التفصيلي",
    downloadBtnAr:    "⬇ تحميل النسخة العربية",
    downloadBtnEn:    "⬇ Download English PDF",
    speedLabel:       "السرعة:",
    volLabel:         "الصوت",
    shareTitle:       "مشاركة الكتاب",
    copyLabel:        "نسخ",
    copiedLabel:      "✓ تم النسخ",
    toastCopied:      "✓ تم نسخ الرابط",
    toastNoFile:      "❌ الملف غير متوفر في هذا المسار",
    noResults:        "لا توجد نتائج مطابقة",
    searchPlaceholder:"ابحث عن كتاب...",
    statBooks:        "كتاب",
    statAudio:        "ملخص صوتي",
    statLang:         "لغة",
  },
  en: {
    navHome:          "Home",
    heroCta:          "Browse Library",
    libraryTitle:     "Library",
    librarySub:       "Every book, a full summary in minutes",
    backBtn:          "Back to Library",
    shareBtn:         "Share",
    footerCopy:       "© 2025 — All Rights Reserved",
    cardCta:          "Read Summary",
    bookBadge:        "Book Summary",
    audioLabel:       "Listen to Summary",
    summaryLabel:     "Detailed Summary",
    downloadBtnAr:    "⬇ Download Arabic PDF",
    downloadBtnEn:    "⬇ Download English PDF",
    speedLabel:       "Speed:",
    volLabel:         "Volume",
    shareTitle:       "Share Book",
    copyLabel:        "Copy",
    copiedLabel:      "✓ Copied",
    toastCopied:      "✓ Link copied!",
    toastNoFile:      "❌ File not found at this path",
    noResults:        "No matching results",
    searchPlaceholder:"Search books...",
    statBooks:        "Books",
    statAudio:        "Audio Summaries",
    statLang:         "Languages",
  }
};

/* ─────────────────────────────────────────────
   2. State
───────────────────────────────────────────── */
let currentLang   = "ar";
let isDark        = false;
let currentAudio  = null;
let isPlaying     = false;
let currentBookId = null;
let isMuted       = false;
let lastVol       = 1;

/* ─────────────────────────────────────────────
   3. Language
───────────────────────────────────────────── */
function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  applyLanguage(currentLang);
  localStorage.setItem("kotobati-lang", currentLang);
}

function applyLanguage(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir  = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("lang-en", lang === "en");

  document.title = lang === "ar"
    ? `${siteConfig.nameAr} | ${siteConfig.nameEn}`
    : `${siteConfig.nameEn} | Book Summaries`;

  document.getElementById("ltAr")?.classList.toggle("active", lang === "ar");
  document.getElementById("ltEn")?.classList.toggle("active", lang === "en");

  updateStaticText(lang);
  applyConfig();
  applyHero(lang);
  updateSearchPlaceholder(lang);

  const homeActive = document.getElementById("homeView")?.classList.contains("active");
  if (homeActive) {
    renderBooks(lang);
  } else if (currentBookId) {
    const savedTime  = currentAudio ? currentAudio.currentTime : 0;
    const wasPlaying = isPlaying;
    renderBookDetails(currentBookId, lang, true);
    swapAudioForLanguage(currentBookId, lang, savedTime, wasPlaying);
  }
}

function swapAudioForLanguage(bookId, lang, savedTime, wasPlaying) {
  const book = booksData.find(b => b.id === bookId);
  if (!book) return;
  const newUrl = lang === "ar" ? book.audioUrlAr : book.audioUrlEn;
  stopAudio();
  currentAudio = new Audio(newUrl);
  isPlaying = false;
  currentAudio.addEventListener("loadedmetadata", () => {
    const dur = document.getElementById("audioDuration");
    if (dur) dur.textContent = formatTime(currentAudio.duration);
    if (savedTime > 0 && savedTime < currentAudio.duration)
      currentAudio.currentTime = savedTime;
    if (wasPlaying) {
      currentAudio.play().catch(() => {});
      isPlaying = true;
      updatePlayPauseUI(true);
    }
  }, { once: true });
  bindAudioEvents();
}

function updateStaticText(lang) {
  const dict = i18n[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (dict[k] !== undefined) el.textContent = dict[k];
  });
}

function updateSearchPlaceholder(lang) {
  const inp = document.getElementById("searchInput");
  if (inp) inp.placeholder = i18n[lang].searchPlaceholder;
}

function applyConfig() {
  const el = document.getElementById("logoAr");
  const en = document.getElementById("logoEn");
  const fb = document.getElementById("footerBrand");
  if (el) el.textContent = siteConfig.nameAr;
  if (en) en.textContent = siteConfig.nameEn;
  if (fb) fb.textContent = `${siteConfig.nameAr} · ${siteConfig.nameEn}`;
}

function applyHero(lang) {
  const set = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };
  const isAr = lang === "ar";
  set("heroEyebrow", isAr ? siteConfig.taglineAr  : siteConfig.taglineEn);
  set("heroLine1",   isAr ? siteConfig.heroTitleAr : siteConfig.heroTitleEn);
  set("heroLine2",   isAr ? siteConfig.heroSubAr   : siteConfig.heroSubEn);
  set("heroDesc",    isAr ? siteConfig.heroDescAr  : siteConfig.heroDescEn);
  set("heroBgWord",  siteConfig.nameEn.toUpperCase());
}

/* ─────────────────────────────────────────────
   4. Dark Mode
───────────────────────────────────────────── */
function toggleDark() {
  isDark = !isDark;
  applyDark(isDark);
  localStorage.setItem("kotobati-dark", isDark ? "1" : "0");
}

function applyDark(dark) {
  document.body.classList.toggle("dark", dark);
  const sun  = document.getElementById("iconSun");
  const moon = document.getElementById("iconMoon");
  if (sun)  sun.style.display  = dark ? "none"  : "block";
  if (moon) moon.style.display = dark ? "block" : "none";
}

/* ─────────────────────────────────────────────
   5. Router
───────────────────────────────────────────── */
function navigateTo(dest) {
  stopAudio();
  const home   = document.getElementById("homeView");
  const detail = document.getElementById("detailView");

  if (dest === "home") {
    home.classList.add("active");
    detail.classList.remove("active");
    currentBookId = null;
    window.location.hash = "";
    renderBooks(currentLang);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (dest.startsWith("book-")) {
    const id = parseInt(dest.replace("book-", ""));
    currentBookId = id;
    home.classList.remove("active");
    detail.classList.add("active");
    window.location.hash = dest;
    renderBookDetails(id, currentLang);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function readHash() {
  const hash = window.location.hash.replace("#", "");
  if (hash.startsWith("book-")) navigateTo(hash);
  else navigateTo("home");
}

/* ─────────────────────────────────────────────
   6. Render
───────────────────────────────────────────── */

/** عرض شبكة الكتب */
function renderBooks(lang, list) {
  const grid = document.getElementById("booksGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const books = list || booksData;
  const t     = i18n[lang];

  books.forEach(book => {
    const title = lang === "ar" ? book.titleAr : book.titleEn;
    const desc  = lang === "ar" ? book.descAr  : book.descEn;
    const arrow = lang === "ar" ? "←" : "→";

    const card = document.createElement("div");
    card.className = "book-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.onclick = () => navigateTo(`book-${book.id}`);
    card.onkeydown = e => { if (e.key === "Enter") navigateTo(`book-${book.id}`); };

    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${esc(book.image)}" alt="${esc(title)}" loading="lazy"
          onerror="this.src='https://placehold.co/300x400/F2EAD8/B85C38?text=📖'"/>
      </div>
      <div class="card-body">
        <h3 class="card-title">${esc(title)}</h3>
        <p class="card-desc">${esc(desc)}</p>
        <span class="card-cta">${esc(t.cardCta)} <span>${arrow}</span></span>
      </div>`;

    grid.appendChild(card);
  });
}

/** فلترة الكتب بالبحث */
function filterBooks(query) {
  const q = query.trim().toLowerCase();
  const noRes = document.getElementById("noResults");

  if (!q) {
    renderBooks(currentLang);
    if (noRes) noRes.style.display = "none";
    return;
  }

  const filtered = booksData.filter(book => {
    const title = (currentLang === "ar" ? book.titleAr : book.titleEn).toLowerCase();
    const desc  = (currentLang === "ar" ? book.descAr  : book.descEn).toLowerCase();
    return title.includes(q) || desc.includes(q);
  });

  renderBooks(currentLang, filtered);

  if (noRes) noRes.style.display = filtered.length === 0 ? "flex" : "none";
}

/** عرض تفاصيل كتاب */
function renderBookDetails(bookId, lang, skipAudio = false) {
  const wrap = document.getElementById("bookDetailWrap");
  if (!wrap) return;

  const book = booksData.find(b => b.id === bookId);
  if (!book) { wrap.innerHTML = `<p style="color:var(--accent)">الكتاب غير موجود.</p>`; return; }

  const t       = i18n[lang];
  const title   = lang === "ar" ? book.titleAr   : book.titleEn;
  const desc    = lang === "ar" ? book.descAr    : book.descEn;
  const summary = lang === "ar" ? book.summaryAr : book.summaryEn;
  const audioUrl = lang === "ar" ? book.audioUrlAr : book.audioUrlEn;

  const pdfArSafe = safeOnclick(book.pdfUrlAr);
  const titleArSafe = safeOnclick(`${book.titleAr}-AR.pdf`);
  const titleEnSafe = safeOnclick(`${book.titleEn}-EN.pdf`);
  const pdfEnSafe = safeOnclick(book.pdfUrlEn);

  wrap.innerHTML = `
    <div class="detail-img-col">
      <img class="detail-cover"
        src="${esc(book.image)}" alt="${esc(title)}"
        onerror="this.src='https://placehold.co/300x400/F2EAD8/B85C38?text=📖'"/>
      <div class="pdf-btns">
        <button class="detail-dl-btn dl-ar" onclick="downloadPdf('${pdfArSafe}','${titleArSafe}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          ${esc(t.downloadBtnAr)}
        </button>
        ${book.hasPdfEn
          ? `<button class="detail-dl-btn dl-en" onclick="downloadPdf('${pdfEnSafe}','${titleEnSafe}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              ${esc(t.downloadBtnEn)}
            </button>`
          : `<div class="pdf-unavailable">${lang === "ar" ? "النسخة الإنجليزية غير متوفرة" : "English version not available"}</div>`
        }
      </div>
    </div>

    <div class="detail-text-col">
      <span class="detail-badge">${esc(t.bookBadge)}</span>
      <h1 class="detail-title">${esc(title)}</h1>
      <div class="detail-desc-block">${esc(desc)}</div>

      <div class="audio-section">
        <div class="audio-section-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          ${esc(t.audioLabel)}
        </div>
        <div class="audio-player-card">
          <div class="audio-row1">
            <button class="play-btn" id="playPauseBtn"
              onclick="toggleAudio('${safeOnclick(audioUrl)}')" aria-label="play">
              <svg id="playIcon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <svg id="pauseIcon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display:none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            </button>
            <div class="progress-wrap">
              <input type="range" class="audio-progress" id="audioProgress"
                min="0" max="100" value="0" oninput="seekAudio(this.value)" aria-label="progress"/>
              <div class="audio-times">
                <span id="audioCurrentTime">0:00</span>
                <span id="audioDuration">--:--</span>
              </div>
            </div>
          </div>
          <div class="audio-row2">
            <div class="speed-group">
              <span class="speed-label">${esc(t.speedLabel)}</span>
              ${["0.5","0.75","1","1.25","1.5","2"].map(s =>
                `<button class="speed-btn${s==="1"?" active":""}" onclick="setSpeed(${s},this)">${s}×</button>`
              ).join("")}
            </div>
            <div class="volume-group">
              <svg class="vol-icon" id="volIcon" onclick="toggleMute()" width="16" height="16"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
              <input type="range" class="volume-slider" id="volumeSlider"
                min="0" max="1" step="0.05" value="1"
                oninput="setVolume(this.value)" aria-label="volume"/>
            </div>
          </div>
        </div>
      </div>

      <div class="summary-section">
        <div class="section-label">${esc(t.summaryLabel)}</div>
        <p class="detail-summary">${esc(summary)}</p>
      </div>
    </div>
  `;

  if (!skipAudio) setupAudio(audioUrl);
}

/* ─────────────────────────────────────────────
   7. Share
───────────────────────────────────────────── */
function openShare() {
  const book = booksData.find(b => b.id === currentBookId);
  if (!book) return;

  const title = currentLang === "ar" ? book.titleAr : book.titleEn;
  const url   = `${location.origin}${location.pathname}#book-${book.id}`;

  document.getElementById("shareTitle").textContent    = i18n[currentLang].shareTitle;
  document.getElementById("shareBookName").textContent = title;
  document.getElementById("shareLinkInput").value      = url;
  document.getElementById("shareCopyLabel").textContent = i18n[currentLang].copyLabel;
  document.getElementById("shareCopyBtn").classList.remove("copied");

  // محاولة Web Share API على الجوال أولاً
  if (navigator.share) {
    navigator.share({ title, text: title, url }).catch(() => {});
    return;
  }

  document.getElementById("shareOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeShare() {
  document.getElementById("shareOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function copyShareLink() {
  const input = document.getElementById("shareLinkInput");
  navigator.clipboard.writeText(input.value).then(() => {
    const btn = document.getElementById("shareCopyBtn");
    const lbl = document.getElementById("shareCopyLabel");
    btn.classList.add("copied");
    lbl.textContent = i18n[currentLang].copiedLabel;
    showToast(i18n[currentLang].toastCopied);
    setTimeout(() => {
      btn.classList.remove("copied");
      lbl.textContent = i18n[currentLang].copyLabel;
    }, 2500);
  }).catch(() => {
    input.select();
    document.execCommand("copy");
    showToast(i18n[currentLang].toastCopied);
  });
}

function shareVia(platform) {
  const book  = booksData.find(b => b.id === currentBookId);
  const title = book ? (currentLang === "ar" ? book.titleAr : book.titleEn) : "";
  const url   = encodeURIComponent(document.getElementById("shareLinkInput")?.value || location.href);
  const text  = encodeURIComponent(`${i18n[currentLang].shareTitle}: ${title}`);

  const links = {
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
    twitter:  `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${text}`,
  };

  if (links[platform]) window.open(links[platform], "_blank", "noopener");
  closeShare();
}

/* ─────────────────────────────────────────────
   8. Audio Player
───────────────────────────────────────────── */
function setupAudio(url) {
  stopAudio();
  currentAudio = new Audio(url);
  isPlaying = false;
  bindAudioEvents();
}

function bindAudioEvents() {
  if (!currentAudio) return;
  currentAudio.addEventListener("loadedmetadata", () => {
    const dur = document.getElementById("audioDuration");
    if (dur) dur.textContent = formatTime(currentAudio.duration);
  });
  currentAudio.addEventListener("timeupdate", () => {
    const prog = document.getElementById("audioProgress");
    const cur  = document.getElementById("audioCurrentTime");
    if (prog && currentAudio.duration)
      prog.value = (currentAudio.currentTime / currentAudio.duration) * 100;
    if (cur) cur.textContent = formatTime(currentAudio.currentTime);
  });
  currentAudio.addEventListener("ended", () => {
    isPlaying = false;
    updatePlayPauseUI(false);
    const prog = document.getElementById("audioProgress");
    if (prog) prog.value = 0;
    const cur = document.getElementById("audioCurrentTime");
    if (cur) cur.textContent = "0:00";
  });
}

function toggleAudio(url) {
  if (!currentAudio) setupAudio(url);
  if (isPlaying) {
    currentAudio.pause();
    isPlaying = false;
  } else {
    currentAudio.play().catch(() => {});
    isPlaying = true;
  }
  updatePlayPauseUI(isPlaying);
}

function seekAudio(val) {
  if (!currentAudio || !currentAudio.duration) return;
  currentAudio.currentTime = (val / 100) * currentAudio.duration;
}

function setSpeed(rate, btn) {
  if (currentAudio) currentAudio.playbackRate = rate;
  document.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

function setVolume(val) {
  if (currentAudio) currentAudio.volume = parseFloat(val);
  updateVolIcon(parseFloat(val));
}

function toggleMute() {
  if (!currentAudio) return;
  if (isMuted) {
    currentAudio.volume = lastVol;
    const sl = document.getElementById("volumeSlider");
    if (sl) sl.value = lastVol;
    isMuted = false;
    updateVolIcon(lastVol);
  } else {
    lastVol = currentAudio.volume;
    currentAudio.volume = 0;
    const sl = document.getElementById("volumeSlider");
    if (sl) sl.value = 0;
    isMuted = true;
    updateVolIcon(0);
  }
}

function updateVolIcon(val) {
  const icon = document.getElementById("volIcon");
  if (!icon) return;
  const lvl = parseFloat(val);
  if (lvl === 0)
    icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`;
  else if (lvl < 0.5)
    icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
  else
    icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
}

function updatePlayPauseUI(playing) {
  const pi = document.getElementById("playIcon");
  const pa = document.getElementById("pauseIcon");
  if (!pi || !pa) return;
  pi.style.display = playing ? "none"  : "block";
  pa.style.display = playing ? "block" : "none";
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }
  isPlaying = false;
}

/* ─────────────────────────────────────────────
   9. PDF Download
───────────────────────────────────────────── */
async function downloadPdf(url, filename) {
  if (!url || url.trim() === "") {
    showToast(i18n[currentLang].toastNoFile, true);
    return;
  }
  try {
    const res = await fetch(url);
    const ct  = res.headers.get("content-type") || "";
    if (!res.ok || ct.includes("text/html")) {
      showToast(`❌ ${url}`, true);
      return;
    }
    const blob   = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename || "book.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
  } catch {
    showToast(i18n[currentLang].toastNoFile, true);
  }
}

/* ─────────────────────────────────────────────
   10. Toast
───────────────────────────────────────────── */
let toastTimer = null;

function showToast(msg, isError = false) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.style.background = isError ? "#c0392b" : "var(--ink)";
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}

/* ─────────────────────────────────────────────
   11. Hero Stats
───────────────────────────────────────────── */
function renderStats(lang) {
  const el = document.getElementById("heroStats");
  if (!el) return;
  const t = i18n[lang];
  const total  = booksData.length;
  const audio  = booksData.filter(b => b.audioUrlAr || b.audioUrlEn).length;
  el.innerHTML = `
    <div class="stat-item"><div class="stat-num">${total}</div><div class="stat-label">${t.statBooks}</div></div>
    <div class="stat-item"><div class="stat-num">${audio}</div><div class="stat-label">${t.statAudio}</div></div>
    <div class="stat-item"><div class="stat-num">2</div><div class="stat-label">${t.statLang}</div></div>
  `;
}

/* ─────────────────────────────────────────────
   12. Scroll Effects
───────────────────────────────────────────── */
function initScrollEffects() {
  const header   = document.getElementById("siteHeader");
  const scrollBtn = document.getElementById("scrollTopBtn");
  const progress  = document.getElementById("readProgress");

  window.addEventListener("scroll", () => {
    const scrollY  = window.scrollY;
    const docH     = document.documentElement.scrollHeight - window.innerHeight;
    const pct      = docH > 0 ? (scrollY / docH) * 100 : 0;

    if (header)   header.classList.toggle("scrolled", scrollY > 30);
    if (scrollBtn) scrollBtn.classList.toggle("visible", scrollY > 400);
    if (progress)  progress.style.width = pct + "%";
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   Utilities
───────────────────────────────────────────── */
function formatTime(sec) {
  if (isNaN(sec)) return "--:--";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function esc(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// لتجنب كسر الـ onclick بسبب ' في أسماء الكتب
function safeOnclick(str) {
  if (typeof str !== "string") return "";
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function scrollToLibrary() {
  document.getElementById("libraryAnchor")?.scrollIntoView({ behavior: "smooth" });
}

/* ─────────────────────────────────────────────
   13. Init
───────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("kotobati-lang");
  if (savedLang === "ar" || savedLang === "en") currentLang = savedLang;

  const savedDark = localStorage.getItem("kotobati-dark");
  if (savedDark === "1") { isDark = true; applyDark(true); }

  applyLanguage(currentLang);
  renderStats(currentLang);
  readHash();
  initScrollEffects();

  window.addEventListener("hashchange", readHash);

  // إغلاق الـ modal بـ Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeShare();
  });
});