/**
 * =====================================================
 * data.js — إعدادات الموقع وبيانات الكتب
 * =====================================================
 *
 * ┌──────────────────────────────────────────────────┐
 * │  🔧 تعديل اسم الموقع — SITE NAME SETTINGS        │
 * │  غيّر القيم في siteConfig أدناه فقط               │
 * └──────────────────────────────────────────────────┘
 */

const siteConfig = {
  nameAr:      "خُطْوَة وَاحِدَةٍ",        // ← اسم الموقع بالعربية
  nameEn:      "One step",       // ← اسم الموقع بالإنجليزية
  taglineAr:   "اكتشف · اقرأ · استمع",
  taglineEn:   "Discover · Read · Listen",
  heroTitleAr: "ملخصات كتب",
  heroTitleEn: "Book Summaries",
  heroSubAr:   "تستحق وقتك",
  heroSubEn:   "Worth Your Time",
  heroDescAr:  "ملخصات نصية وصوتية باللغتين العربية والإنجليزية — اختر ما يناسبك وابدأ الرحلة.",
  heroDescEn:  "Text and audio summaries in Arabic & English — choose your style and start.",
};

/**
 * =====================================================
 * بيانات الكتب | Books Data Array
 * =====================================================
 *
 * كيفية إضافة كتاب جديد:
 * ─────────────────────────
 * 1. انسخ الكائن النموذجي في نهاية الملف
 * 2. ألصقه قبل ] مع فاصلة , قبله
 * 3. عدّل الحقول:
 *    • id           → رقم فريد متسلسل
 *    • titleAr/En   → عنوان الكتاب
 *    • descAr/En    → وصف قصير (1-2 جملة)
 *    • image        → رابط صورة الغلاف
 *    • summaryAr/En → الملخص التفصيلي
 *    • audioUrlAr   → رابط MP3 النسخة العربية ← يتغير مع اللغة
 *    • audioUrlEn   → رابط MP3 النسخة الإنجليزية ← يتغير مع اللغة
 *    • pdfUrl       → رابط PDF
 * =====================================================
 */

const booksData = [

  // ─── الكتاب 1 ────────────────────────────────────
  {
    id: 1,
    titleAr:    " 3 تجربة الإنسان الكامل",
    titleEn:    "The perfect human",
    descAr:     "كتاب يتناول معايير كمال الإنسانية في الإسلام القائمة على التوازن بين العقل والروح والعمل، متخذاً من الإمام علي عليه السلام نموذجاً تطبيقياً.",
    descEn:     "A book exploring Islamic standards for human perfection through balanced growth of intellect, spirit, and action, presenting Imam Ali (peace be upon him) as the ultimate model.",
    image:      "images/الأنسان الكامل.jpeg",
    summaryAr:  "المحور الأول: مفهوم الإنسان الكامل وأهمية معرفتهيبدأ الشهيد المطهري بتوضيح أن (الإنسان الكامل) ليس مجرد مصطلح صوفي أو فلسفي، بل هو ضرورة تربوية واجتماعية حتمية. فبدون وجود نموذج أو مثال أعلى، يبقى الإنسان تائهًا في مسيرة تطوره الروحي والمادي.الفرق بين البشر والإنسان: يوضح الكتاب أن (البشر) هو الكائن الحي المنتمي لنوع بيولوجي، أما (الإنسان) فهو رتبة معنوية وقيمية. الكمال لا يكمن في كمال الجسد، بل في كمال القيم الإنسانية.الإنسان الكامل كمرآة: معرفة هذا النموذج ضرورية لسببين؛ الأول كمنهج عملي ليعرف الفرد ماذا يجب أن يكون، والثاني كمنهج معرفي لتحديد القيم التي تُبنى عليها الثقافة.المحور الثاني: نقد المدارس الفكرية في تعريف الكمال يستعرض المطهري خمس مدارس أساسية حاولت تعريف (الإنسان الكامل)، ويقوم بتحليلها كالآتي:المدرسة العقلية (الفلاسفة): ترى أن كمال الإنسان في عقله وحكمته فقط.نقد المطهري هذه المدرسة بما يلي: أنها حوّلت الإنسان إلى مجرد جهاز منطقي أو كتاب متحرك، وأهملت جوانب القلب والعاطفة والمسؤولية الاجتماعية.المدرسة العرفانية (الصوفية): ترى أن الكمال في القلب والارتباط الباطني بالله والزهد.ونقد المطهري هذه المدرسة بما يلي: أن العرفان ركز على الجانب الباطني وأهمل دور العقل والمسؤولية تجاه المجتمع والعدالة، مما قد يؤدي لإنتاج إنسان منزوٍ عن واقعه.مدرسة القوة (نيتشه): ترى أن الإنسان الكامل هو (الإنسان المتفوق) الذي يفرض إرادته بالقوة.ونقد المطهري هذه المدرسة بما يلي: أنها نظرة مادية تقدس القدرة وتلغي الرحمة والأخلاق، وتعتبر الرحمة نقصًا والضعف رذيلة.مدرسة المحبة (الخدمة): ترى أن الكمال في خدمة الآخرين والمحبة المطلقة.ونقد المطهري هذه المدرسة بما يلي: أنها رغم سموها، تجعل الإنسان أداة لراحة الآخرين دون التركيز على كماله الذاتي وارتباطه الروحي بالخالق.المدرسة الاجتماعية (الاشتراكية): تربط الكمال بالوعي الطبقي والعدالة الاجتماعية.ونقد المطهري هذه المدرسة بما يلي: أنها مدرسة مادية تقزم الإنسان في بعده الاقتصادي وتتجاهل جوهره الروحي وتفرده.المحور الثالث: الرؤية الإسلامية (نظرية التوازن الشامل)هذا هو جوهر الكتاب، حيث يطرح المطهري رؤية الإسلام التي تتجاوز أحادية المدارس الأخرى.النمو المتوازن: الإنسان الكامل في الإسلام هو الذي تنمو فيه كل القيم الإنسانية مثل العقل، الإيمان، العدالة، والمحبة، بشكل متوازن وفي آن واحد.العبودية لله: يشدد المطهري على أن نقطة الانطلاق هي العبودية الخالصة لله؛ فبقدر ما يتحرر الإنسان من عبودية نفسه، تزداد إنسانيته وتحققه.المحور الرابع: الإمام علي عليه السلام كنموذج تطبيقي يختم المطهري كتابه بتقديم شخصية الإمام علي عليه السلام باعتباره النموذج الأعلى الذي تجسدت فيه كل القيم المتناقضة في الظاهر والمؤتلفة في الحقيقة:جامع الأضداد: يصف الإمام علي عليه السلام بأنه العابد الشاكي في محرابه من خشية الله، وهو نفسه البطل الضرغام في ساحة الحرب. هو الحكيم الفيلسوف في فكره، وهو الأب الرحيم باليتامى والمساكين.الكمال العملي: الإمام علي عليه السلام لم يكن بطلاً في جانب واحد، بل كان بطلاً في الفكر، والعبادة، والعدالة، والزهد.الخلاصة: إن الاتباع الحقيقي هو محاولة الاقتداء بهذا التوازن، فلا يمكن لمدعي الاتباع أن يكون عابداً ظالماً أو عادلاً جاحداً.",
    summaryEn:  "Section 1: The Concept of the Perfect ManThe (Perfect Man) is a pedagogical necessity. Mutahhari distinguishes between the (Biological Human) and the (Value-based Human), emphasizing that perfection lies in spiritual and moral heights, not physical traits.Section 2: Critique of Intellectual SchoolsMutahhari analyzes various schools of thought and offers critical insights into their limitations:Rationalism: Critiqued for reducing humans to (logical machines) while neglecting the heart and social duty.Gnosticism: Critiqued for over-focusing on the inner self and ignoring social justice and the intellect.Power (Nietzsche): Critiqued for its materialistic view that equates perfection with raw power, dismissing mercy as a flaw.Service/Love: Critiqued for viewing humans as mere tools for others' comfort, neglecting personal spiritual growth.Section 3: The Islamic Vision of Balanced GrowthThe core Islamic concept is (Comprehensive Balance). A perfect human must develop all virtues—reason, faith, justice, and love—simultaneously. This growth is rooted in absolute servitude to God, which paradoxically leads to true human freedom.Section 4: Imam Ali (peace be upon him) as the Living ModelThe book presents Imam Ali (peace be upon him) as the ultimate example who unified seemingly opposite traits:The Unity of Opposites: He was the mystical worshipper by night and the fearless warrior by day. He was the profound philosopher and the compassionate father to the poor.The Lesson: True following of Imam Ali (peace be upon him) requires striving for this multi-dimensional balance in one's own life, avoiding the trap of one-sided spirituality or secularism.",
    audioUrlAr: "audio/ar/الإنسان الكامل.MP3",
    audioUrlEn: "audio/en/الأنسان الكامل.mp3",
    pdfUrlAr: "books/The-Perfect-Human.pdf",   // ← مسار النسخة العربية
    pdfUrlEn: "",   // ← مسار النسخة الإنجليزية
    hasPdfEn: false                 // ← true أو false
  },

  /*
   * ,{
   *   id: 6,
   *   titleAr:    "...",
   *   titleEn:    "...",
   *   descAr:     "...",
   *   descEn:     "...",
   *   image:      "https://...",
   *   summaryAr:  "...",
   *   summaryEn:  "...",
   *   audioUrlAr: "https://.../arabic-audio.mp3",
   *   audioUrlEn: "https://.../english-audio.mp3",
   *   pdfUrl:     "https://.../book.pdf"
   * }
   */
];
