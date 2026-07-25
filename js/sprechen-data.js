/* =============================================
   DEUTSCH LERNEN — Sprechen Data
   js/sprechen-data.js

   Each item that shows learner-facing description text now carries
   both `bn` (Bangla) and `en` (English) fields. Rendering code should
   pick the right one based on the current UI language, e.g.:
     const label = getLang() === "en" ? (item.en || item.bn) : item.bn;
============================================= */

export const DAILY_TASKS = [
  { id:"dt1", name:"৫টি sentence জোরে পড়ুন",             sub:"Laut vorlesen — উচ্চস্বরে পড়ুন",
    nameEn:"Read 5 sentences aloud",             subEn:"Laut vorlesen — reading aloud",             xp:10 },
  { id:"dt2", name:"নিজেকে German-এ পরিচয় দিন",          sub:"১ মিনিট Vorstellung practice",
    nameEn:"Introduce yourself in German",       subEn:"1-minute Vorstellung practice",             xp:15 },
  { id:"dt3", name:"১০টি নতুন শব্দ উচ্চারণ করুন",        sub:"Aussprache — pronunciation drill",
    nameEn:"Pronounce 10 new words",             subEn:"Aussprache — pronunciation drill",          xp:10 },
  { id:"dt4", name:"৩টি phrase শুনে repeat করুন",         sub:"Nachsprechen — listen & repeat",
    nameEn:"Listen and repeat 3 phrases",        subEn:"Nachsprechen — listen & repeat",            xp:10 },
  { id:"dt5", name:"আজকের prompt-এর উত্তর দিন",           sub:"Heute Prompt beantworten",
    nameEn:"Answer today's prompt",              subEn:"Heute Prompt beantworten",                  xp:20 },
];

export const PROMPTS = [
  { de:"Stell dich vor.",                                    bn:"নিজেকে German-এ পরিচয় করিয়ে দাও।",                      en:"Introduce yourself in German.",                          level:"A1" },
  { de:"Beschreibe deine Familie.",                          bn:"তোমার পরিবারের বর্ণনা দাও।",                              en:"Describe your family.",                                  level:"A1" },
  { de:"Was machst du jeden Tag?",                           bn:"তুমি প্রতিদিন কী কর?",                                    en:"What do you do every day?",                              level:"A1" },
  { de:"Wie ist das Wetter heute?",                          bn:"আজকের আবহাওয়া কেমন?",                                    en:"How's the weather today?",                               level:"A1" },
  { de:"Was isst du zum Frühstück?",                         bn:"সকালে তুমি কী খাও?",                                      en:"What do you eat for breakfast?",                         level:"A2" },
  { de:"Beschreibe dein Zimmer.",                            bn:"তোমার ঘরের বর্ণনা দাও।",                                  en:"Describe your room.",                                    level:"A2" },
  { de:"Warum lernst du Deutsch?",                           bn:"তুমি কেন German শিখছ?",                                   en:"Why are you learning German?",                           level:"A2" },
  { de:"Erzähl von deinem letzten Urlaub.",                  bn:"তোমার শেষ ছুটির কথা বলো।",                               en:"Talk about your last vacation.",                         level:"B1" },
  { de:"Was denkst du über soziale Medien?",                 bn:"সোশ্যাল মিডিয়া সম্পর্কে তোমার মতামত কী?",               en:"What do you think about social media?",                  level:"B1" },
  { de:"Beschreibe ein Problem in deiner Stadt.",            bn:"তোমার শহরের একটি সমস্যার বর্ণনা দাও।",                  en:"Describe a problem in your city.",                       level:"B2" },
  { de:"Diskutiere Vor- und Nachteile der Digitalisierung.", bn:"Digitalization-এর সুবিধা ও অসুবিধা আলোচনা করো।",        en:"Discuss the pros and cons of digitalization.",           level:"B2" },
  { de:"Was sind die wichtigsten Umweltprobleme?",           bn:"সবচেয়ে গুরুত্বপূর্ণ পরিবেশ সমস্যাগুলো কী?",            en:"What are the most important environmental problems?",   level:"C1" },
  { de:"Argumentiere für oder gegen Globalisierung.",        bn:"Globalization-এর পক্ষে বা বিপক্ষে যুক্তি দাও।",         en:"Argue for or against globalization.",                    level:"C1" },
  { de:"Wie hat die Technologie unser Leben verändert?",     bn:"Technology কীভাবে আমাদের জীবন বদলে দিয়েছে?",            en:"How has technology changed our lives?",                  level:"C1" },
  { de:"Was bedeutet Heimat für dich?",                      bn:"তোমার কাছে 'Heimat' (আপন জায়গা) মানে কী?",              en:"What does 'Heimat' (home) mean to you?",                 level:"B2" },
  { de:"Beschreibe deinen Traumjob.",                        bn:"তোমার স্বপ্নের চাকরির বর্ণনা দাও।",                      en:"Describe your dream job.",                               level:"B1" },
  { de:"Was ist deine Meinung zur Klimakrise?",              bn:"জলবায়ু সংকট নিয়ে তোমার মতামত কী?",                     en:"What's your opinion on the climate crisis?",             level:"C1" },
  { de:"Erzähl von einem unvergesslichen Erlebnis.",         bn:"একটি অবিস্মরণীয় অভিজ্ঞতার কথা বলো।",                  en:"Talk about an unforgettable experience.",                level:"B2" },
  { de:"Wie verbringst du deine Freizeit?",                  bn:"তুমি অবসর সময় কীভাবে কাটাও?",                           en:"How do you spend your free time?",                       level:"A2" },
  { de:"Was sind deine Stärken und Schwächen?",              bn:"তোমার strengths ও weaknesses কী কী?",                    en:"What are your strengths and weaknesses?",                level:"B1" },
  { de:"Beschreibe eine typische Mahlzeit in deiner Kultur.",bn:"তোমার সংস্কৃতির একটি সাধারণ খাবারের বর্ণনা দাও।",      en:"Describe a typical meal in your culture.",               level:"B1" },
];

/* ── Pronunciation Cards → link to sub-pages ── */
export const PRONUN_CARDS = [
  { id:"umlaute",            icon:"🔤", title:"Umlaute",              subtitle:"ä · ö · ü",           desc:"German-এর বিশেষ স্বরবর্ণ — Umlaut উচ্চারণ শিখুন।",          descEn:"Learn the special German vowels — Umlaut pronunciation.", level:"A1", xp:30, href:"sprechen/umlaute.html",        accent:"#f5c842", color:"rgba(245,200,66,.1)",  border:"rgba(245,200,66,.25)"  },
  { id:"ch-laut",            icon:"🔊", title:"CH-Laut",              subtitle:"ich vs. ach",          desc:"'ich' ও 'Bach' — দুটি আলাদা CH উচ্চারণ।",                   descEn:"'ich' vs 'Bach' — two distinct CH sounds.",                level:"A1", xp:30, href:"sprechen/ch-laut.html",        accent:"#2dd4bf", color:"rgba(45,212,191,.1)",  border:"rgba(45,212,191,.25)"  },
  { id:"r-laut",             icon:"🗣️", title:"R-Laut",               subtitle:"German R উচ্চারণ",     desc:"Throat-এ বলা German R — বাংলা R-এর থেকে সম্পূর্ণ আলাদা।",   descEn:"The German R spoken from the throat — quite different from Bangla R.", level:"A1", xp:30, href:"sprechen/r-laut.html",         accent:"#818cf8", color:"rgba(129,140,248,.1)", border:"rgba(129,140,248,.25)" },
  { id:"sp-st",              icon:"💬", title:"SP / ST",              subtitle:"শব্দের শুরুতে",         desc:"'Sprechen' = 'Schprechen' — SP ও ST উচ্চারণ।",               descEn:"'Sprechen' = 'Schprechen' — SP and ST pronunciation.",     level:"A1", xp:25, href:"sprechen/sp-st.html",          accent:"#34d399", color:"rgba(52,211,153,.1)",  border:"rgba(52,211,153,.25)"  },
  { id:"lange-kurze-vokale", icon:"📏", title:"Lange & kurze Vokale", subtitle:"দীর্ঘ ও হ্রস্ব স্বর", desc:"Bieten vs. bitten — vowel length অর্থ বদলে দেয়।",             descEn:"Bieten vs. bitten — vowel length changes the meaning.",   level:"A2", xp:35, href:"sprechen/vokale.html",         accent:"#fb923c", color:"rgba(251,146,60,.1)",  border:"rgba(251,146,60,.25)"  },
  { id:"w-v-f",              icon:"🎵", title:"W · V · F",            subtitle:"উচ্চারণের ফাঁদ",       desc:"Wasser, Vogel, Feuer — W, V, F-এর সঠিক উচ্চারণ।",           descEn:"Wasser, Vogel, Feuer — the correct pronunciation of W, V, F.", level:"A2", xp:35, href:"sprechen/w-v-f.html",          accent:"#a78bfa", color:"rgba(167,139,250,.1)", border:"rgba(167,139,250,.25)" },
  { id:"wortakzent",         icon:"🎯", title:"Wortakzent",           subtitle:"Stress / জোর",         desc:"কোন syllable-এ জোর — German word stress rules।",              descEn:"Which syllable to stress — German word-stress rules.",    level:"B1", xp:40, href:"sprechen/wortakzent.html",     accent:"#38bdf8", color:"rgba(56,189,248,.1)",  border:"rgba(56,189,248,.25)"  },
  { id:"satzmelodie",        icon:"🎶", title:"Satzmelodie",          subtitle:"বাক্যের সুর",          desc:"প্রশ্ন, উত্তর ও command-এ আলাদা intonation।",                 descEn:"Different intonation for questions, statements, and commands.", level:"B1", xp:40, href:"sprechen/satzmelodie.html",    accent:"#fb7185", color:"rgba(251,113,133,.1)", border:"rgba(251,113,133,.25)" },
  { id:"konsonanten",        icon:"🎤", title:"Konsonanten",          subtitle:"ব্যঞ্জনবর্ণ clusters",  desc:"German consonant clusters — sch, tsch, pf, kn, gn।",         descEn:"German consonant clusters — sch, tsch, pf, kn, gn.",       level:"A2", xp:35, href:"sprechen/konsonanten.html",    accent:"#34d399", color:"rgba(52,211,153,.1)",  border:"rgba(52,211,153,.25)"  },
  { id:"ei-au-eu",           icon:"🔉", title:"Diphthonge",           subtitle:"ei · au · eu/äu",      desc:"Double vowels — 'ei' vs 'ie', 'au', 'eu' উচ্চারণ।",          descEn:"Double vowels — pronouncing 'ei' vs 'ie', 'au', 'eu'.",    level:"A1", xp:30, href:"sprechen/diphthonge.html",     accent:"#fbbf24", color:"rgba(251,191,36,.1)",  border:"rgba(251,191,36,.25)"  },
  { id:"endungen",           icon:"📝", title:"Endungen",             subtitle:"-en · -er · -el",      desc:"Word endings-এর সঠিক উচ্চারণ — -en, -er, -el, -ig।",        descEn:"Correct pronunciation of word endings — -en, -er, -el, -ig.", level:"A2", xp:35, href:"sprechen/endungen.html",       accent:"#f472b6", color:"rgba(244,114,182,.1)", border:"rgba(244,114,182,.25)" },
  { id:"zahlen-aussprache",  icon:"🔢", title:"Zahlen",               subtitle:"সংখ্যার উচ্চারণ",      desc:"১ থেকে ১,০০০,০০০ পর্যন্ত German numbers উচ্চারণ।",            descEn:"Pronouncing German numbers from 1 to 1,000,000.",          level:"A1", xp:25, href:"sprechen/zahlen-aussprache.html", accent:"#818cf8", color:"rgba(129,140,248,.1)", border:"rgba(129,140,248,.25)" },
];

/* ── Big Pronunciation Hub Card ── */
export const AUSSPRACHE_HUB = {
  href:     "sprechen/aussprache.html",
  count:    "600+",
  levels:   ["A1","A2","B1","B2","C1","C2"],
  features: [
    "IPA phonetic guide",
    "Minimal pairs (বিভ্রান্তিকর শব্দজোড়)",
    "Tongue twisters",
    "Category অনুযায়ী filter",
    "Level অনুযায়ী filter",
  ],
  featuresEn: [
    "IPA phonetic guide",
    "Minimal pairs (confusable word-pairs)",
    "Tongue twisters",
    "Filter by category",
    "Filter by level",
  ],
};

/* ── Speaking Topics ── */
export const SPEAKING_TOPICS = [
  { icon:"👋", title:"Begrüßung",             desc:"হ্যালো থেকে Auf Wiedersehen — আনুষ্ঠানিক ও অনানুষ্ঠানিক শুভেচ্ছা।",     descEn:"From hello to goodbye — formal and informal greetings.",             level:"A1", xp:50,  href:"sprechen/begruessung-uebung.html",    color:"rgba(52,211,153,.1)",  border:"rgba(52,211,153,.25)"  },
  { icon:"🏠", title:"Familie & Zuhause",     desc:"পরিবার ও বাড়ি নিয়ে German-এ কথা বলুন।",                                    descEn:"Talk about family and home in German.",                              level:"A1", xp:50,  href:"sprechen/familie-uebung.html",        color:"rgba(245,200,66,.1)",  border:"rgba(245,200,66,.25)"  },
  { icon:"🍽️", title:"Essen & Trinken",       desc:"Restaurant-এ order দেওয়া, খাবার বর্ণনা করা।",                               descEn:"Ordering at a restaurant, describing food.",                          level:"A1", xp:50,  href:"sprechen/essen-uebung.html",          color:"rgba(251,146,60,.1)",  border:"rgba(251,146,60,.25)"  },
  { icon:"🎒", title:"Schule & Studium",      desc:"পড়াশোনা, subject, teacher নিয়ে German কথোপকথন।",                           descEn:"German conversation about school, subjects, and teachers.",          level:"A1", xp:50,  href:"sprechen/schule-uebung.html",         color:"rgba(56,189,248,.1)",  border:"rgba(56,189,248,.25)"  },
  { icon:"🌤️", title:"Wetter & Jahreszeiten", desc:"আবহাওয়া ও ঋতু নিয়ে German-এ কথা বলুন।",                                  descEn:"Talk about weather and seasons in German.",                          level:"A1", xp:50,  href:"sprechen/wetter-uebung.html",         color:"rgba(167,139,250,.1)", border:"rgba(167,139,250,.25)" },
  { icon:"🏙️", title:"Stadt & Orientierung",  desc:"পথ চেনা, direction দেওয়া, শহর বর্ণনা।",                                    descEn:"Finding your way, giving directions, describing a city.",            level:"A2", xp:75,  href:"sprechen/stadt-uebung.html",          color:"rgba(45,212,191,.1)",  border:"rgba(45,212,191,.25)"  },
  { icon:"🛒", title:"Einkaufen",             desc:"দোকানে German-এ কথা — দাম, size, exchange।",                                descEn:"Shop talk in German — prices, sizes, exchanges.",                    level:"A2", xp:75,  href:"sprechen/einkaufen-uebung.html",      color:"rgba(245,200,66,.1)",  border:"rgba(245,200,66,.25)"  },
  { icon:"🚉", title:"Reisen & Verkehr",      desc:"Train, Bus, Flughafen — travel German phrases।",                            descEn:"Train, bus, airport — travel German phrases.",                       level:"A2", xp:75,  href:"sprechen/reisen-uebung.html",         color:"rgba(129,140,248,.1)", border:"rgba(129,140,248,.25)" },
  { icon:"🏥", title:"Gesundheit & Arzt",     desc:"Doctor-এর কাছে German-এ কথা বলা, symptoms describe করা।",                  descEn:"Talking to a doctor in German, describing symptoms.",                level:"A2", xp:75,  href:"sprechen/gesundheit-uebung.html",     color:"rgba(251,113,133,.1)", border:"rgba(251,113,133,.25)" },
  { icon:"🎭", title:"Hobbys & Freizeit",     desc:"শখ ও অবসর নিয়ে German conversation।",                                      descEn:"German conversation about hobbies and free time.",                   level:"A2", xp:75,  href:"sprechen/hobbys-uebung.html",         color:"rgba(52,211,153,.1)",  border:"rgba(52,211,153,.25)"  },
  { icon:"💼", title:"Beruf & Bewerbung",     desc:"Job interview, CV, office — কাজের German।",                                 descEn:"Job interviews, CVs, office life — work German.",                    level:"B1", xp:100, href:"sprechen/beruf-uebung.html",          color:"rgba(251,146,60,.1)",  border:"rgba(251,146,60,.25)"  },
  { icon:"🌍", title:"Umwelt & Natur",        desc:"Climate change, পরিবেশ — B1 discussion।",                                   descEn:"Climate change, the environment — B1-level discussion.",             level:"B1", xp:100, href:"sprechen/umwelt-uebung.html",         color:"rgba(52,211,153,.1)",  border:"rgba(52,211,153,.25)"  },
  { icon:"📰", title:"Nachrichten & Medien",  desc:"News, current events নিয়ে German-এ মতামত দিন।",                            descEn:"Share opinions in German about news and current events.",           level:"B1", xp:100, href:"sprechen/nachrichten-uebung.html",    color:"rgba(56,189,248,.1)",  border:"rgba(56,189,248,.25)"  },
  { icon:"🤝", title:"Meinungen & Argumente", desc:"কোনো বিষয়ে মতামত প্রকাশ ও argue করা।",                                   descEn:"Expressing opinions and arguing a point.",                           level:"B1", xp:100, href:"sprechen/meinungen-uebung.html",      color:"rgba(167,139,250,.1)", border:"rgba(167,139,250,.25)" },
  { icon:"📱", title:"Medien & Technik",      desc:"Social media, technology নিয়ে German debate।",                              descEn:"German debate about social media and technology.",                  level:"B2", xp:125, href:"sprechen/medien-uebung.html",         color:"rgba(167,139,250,.1)", border:"rgba(167,139,250,.25)" },
  { icon:"💰", title:"Wirtschaft & Finanzen", desc:"Economy, bank, money — B2 level German।",                                  descEn:"Economy, banking, money — B2-level German.",                         level:"B2", xp:125, href:"sprechen/wirtschaft-uebung.html",     color:"rgba(245,200,66,.1)",  border:"rgba(245,200,66,.25)"  },
  { icon:"⚖️", title:"Politik & Gesellschaft",desc:"Politics, society, rights নিয়ে German discussion।",                        descEn:"German discussion on politics, society, and rights.",                level:"B2", xp:125, href:"sprechen/politik-uebung.html",        color:"rgba(251,113,133,.1)", border:"rgba(251,113,133,.25)" },
  { icon:"🧪", title:"Wissenschaft",          desc:"Science topics — research, discovery German-এ।",                            descEn:"Science topics — research and discovery, in German.",                level:"C1", xp:150, href:"sprechen/wissenschaft-uebung.html",   color:"rgba(45,212,191,.1)",  border:"rgba(45,212,191,.25)"  },
  { icon:"🧠", title:"Philosophie & Ethik",   desc:"Abstract ideas, ethics, philosophy German-এ।",                              descEn:"Abstract ideas, ethics, and philosophy, in German.",                 level:"C1", xp:150, href:"sprechen/philosophie-uebung.html",    color:"rgba(129,140,248,.1)", border:"rgba(129,140,248,.25)" },
  { icon:"🎓", title:"Akademisches Sprechen", desc:"University, research presentation, formal German।",                         descEn:"University, research presentations, formal German.",                 level:"C1", xp:150, href:"sprechen/akademisch-uebung.html",     color:"rgba(251,146,60,.1)",  border:"rgba(251,146,60,.25)"  },
  { icon:"🏛️", title:"Geschichte & Kultur",   desc:"German history, culture, literature নিয়ে কথা।",                           descEn:"Talking about German history, culture, and literature.",             level:"C1", xp:150, href:"sprechen/geschichte-uebung.html",     color:"rgba(52,211,153,.1)",  border:"rgba(52,211,153,.25)"  },
  { icon:"💎", title:"Rhetorik & Debatte",    desc:"Advanced argumentation ও rhetoric German-এ।",                               descEn:"Advanced argumentation and rhetoric in German.",                     level:"C2", xp:200, href:"sprechen/rhetorik-uebung.html",       color:"rgba(245,200,66,.1)",  border:"rgba(245,200,66,.25)"  },
  { icon:"📜", title:"Literatur & Sprache",   desc:"Goethe, Schiller — German literature discuss।",                             descEn:"Goethe, Schiller — discussing German literature.",                   level:"C2", xp:200, href:"sprechen/literatur-uebung.html",      color:"rgba(167,139,250,.1)", border:"rgba(167,139,250,.25)" },

  // ── Extra A1 ──
  { icon:"🔢", title:"Zahlen & Zeit",        desc:"সংখ্যা, সময় ও তারিখ German-এ বলুন।",                        descEn:"Say numbers, time, and dates in German.",              level:"A1", xp:50,  href:"sprechen/zahlen-uebung.html",         color:"rgba(52,211,153,.1)",  border:"rgba(52,211,153,.25)"  },
  { icon:"🌈", title:"Farben & Formen",      desc:"রঙ ও আকার German-এ describe করুন।",                          descEn:"Describe colors and shapes in German.",                level:"A1", xp:50,  href:"sprechen/farben-uebung.html",         color:"rgba(245,200,66,.1)",  border:"rgba(245,200,66,.25)"  },
  { icon:"🐶", title:"Tiere beschreiben",    desc:"প্রিয় প্রাণী German-এ বর্ণনা করুন।",                        descEn:"Describe your favorite animal in German.",             level:"A1", xp:50,  href:"sprechen/tiere-uebung.html",          color:"rgba(251,146,60,.1)",  border:"rgba(251,146,60,.25)"  },
  { icon:"📍", title:"Mein Zuhause",         desc:"বাড়ি ও পাড়া German-এ বর্ণনা করুন।",                        descEn:"Describe your home and neighborhood in German.",       level:"A1", xp:50,  href:"sprechen/zuhause-uebung.html",        color:"rgba(129,140,248,.1)", border:"rgba(129,140,248,.25)" },
  // ── Extra A2 ──
  { icon:"📞", title:"Telefonieren",         desc:"ফোনে German-এ কথা বলুন — formal ও informal।",               descEn:"Talk on the phone in German — formal and informal.",   level:"A2", xp:75,  href:"sprechen/telefonieren-uebung.html",   color:"rgba(56,189,248,.1)",  border:"rgba(56,189,248,.25)"  },
  { icon:"🍳", title:"Kochen & Rezepte",     desc:"রেসিপি ও রান্না German-এ explain করুন।",                    descEn:"Explain recipes and cooking in German.",               level:"A2", xp:75,  href:"sprechen/kochen-uebung.html",         color:"rgba(251,113,133,.1)", border:"rgba(251,113,133,.25)" },
  { icon:"🎭", title:"Freizeit & Hobbys",    desc:"শখ ও অবসরকালীন কার্যক্রম German-এ।",                       descEn:"Hobbies and free-time activities, in German.",         level:"A2", xp:75,  href:"sprechen/freizeit-uebung.html",       color:"rgba(167,139,250,.1)", border:"rgba(167,139,250,.25)" },
  { icon:"🏥", title:"Beim Arzt",            desc:"ডাক্তারের কাছে symptoms German-এ বলুন।",                    descEn:"Describe symptoms to a doctor in German.",             level:"A2", xp:75,  href:"sprechen/arzt-uebung.html",           color:"rgba(52,211,153,.1)",  border:"rgba(52,211,153,.25)"  },
  { icon:"📅", title:"Termin vereinbaren",   desc:"Phone বা face-to-face appointment নেওয়া।",                  descEn:"Making an appointment, by phone or in person.",        level:"A2", xp:75,  href:"sprechen/termin-uebung.html",         color:"rgba(245,200,66,.1)",  border:"rgba(245,200,66,.25)"  },
  // ── Extra B1 ──
  { icon:"🤝", title:"Konflikte lösen",      desc:"মতবিরোধ সমাধান ও diplomacy German-এ।",                     descEn:"Resolving disagreements and diplomacy, in German.",    level:"B1", xp:100, href:"sprechen/konflikte-uebung.html",      color:"rgba(251,146,60,.1)",  border:"rgba(251,146,60,.25)"  },
  { icon:"🏘️", title:"Stadtleben vs Landleben",desc:"শহর বনাম গ্রামজীবন নিয়ে German debate।",                descEn:"German debate — city life vs. country life.",          level:"B1", xp:100, href:"sprechen/stadtleben-uebung.html",     color:"rgba(56,189,248,.1)",  border:"rgba(56,189,248,.25)"  },
  { icon:"📚", title:"Bildungssystem",       desc:"শিক্ষাব্যবস্থা নিয়ে German-এ মতামত দিন।",                 descEn:"Share your opinion on the education system, in German.", level:"B1", xp:100, href:"sprechen/bildung-uebung.html",        color:"rgba(129,140,248,.1)", border:"rgba(129,140,248,.25)" },
  { icon:"🎬", title:"Filme & Kultur",       desc:"Film ও সংস্কৃতি নিয়ে German review দিন।",                  descEn:"Review films and culture in German.",                  level:"B1", xp:100, href:"sprechen/kultur-uebung.html",         color:"rgba(167,139,250,.1)", border:"rgba(167,139,250,.25)" },
  { icon:"✈️", title:"Reiseerfahrungen",     desc:"ভ্রমণের অভিজ্ঞতা German-এ বলুন।",                         descEn:"Talk about travel experiences in German.",             level:"B1", xp:100, href:"sprechen/reiseerfahrung-uebung.html", color:"rgba(52,211,153,.1)",  border:"rgba(52,211,153,.25)"  },
  // ── Extra B2 ──
  { icon:"🤖", title:"Künstliche Intelligenz",desc:"AI নিয়ে German-এ pros/cons discuss করুন।",               descEn:"Discuss AI pros and cons in German.",                  level:"B2", xp:125, href:"sprechen/ki-uebung.html",             color:"rgba(245,200,66,.1)",  border:"rgba(245,200,66,.25)"  },
  { icon:"🏛️", title:"Geschichte Deutschlands",desc:"জার্মানির ইতিহাস German-এ বর্ণনা করুন।",               descEn:"Describe German history, in German.",                  level:"B2", xp:125, href:"sprechen/geschichte-uebung.html",     color:"rgba(251,146,60,.1)",  border:"rgba(251,146,60,.25)"  },
  { icon:"⚖️", title:"Ethik & Moral",        desc:"নৈতিক প্রশ্ন নিয়ে German debate।",                        descEn:"German debate on ethical questions.",                  level:"B2", xp:125, href:"sprechen/ethik-uebung.html",          color:"rgba(251,113,133,.1)", border:"rgba(251,113,133,.25)" },
  { icon:"🌿", title:"Nachhaltigkeit",       desc:"টেকসই জীবনযাপন German-এ argue করুন।",                     descEn:"Argue for sustainable living, in German.",             level:"B2", xp:125, href:"sprechen/nachhaltig-uebung.html",     color:"rgba(52,211,153,.1)",  border:"rgba(52,211,153,.25)"  },
  // ── Extra C1 ──
  { icon:"📊", title:"Statistiken kommentieren",desc:"Chart ও statistics German-এ analyze করুন।",            descEn:"Analyze charts and statistics in German.",             level:"C1", xp:150, href:"sprechen/statistik-uebung.html",      color:"rgba(56,189,248,.1)",  border:"rgba(56,189,248,.25)"  },
  { icon:"🎤", title:"Rede & Präsentation",  desc:"Formal speech ও presentation German-এ।",                  descEn:"Formal speeches and presentations, in German.",        level:"C1", xp:150, href:"sprechen/rede-uebung.html",           color:"rgba(245,200,66,.1)",  border:"rgba(245,200,66,.25)"  },
  { icon:"🧬", title:"Wissenschaft & Forschung",desc:"Research topics German academic style-এ।",             descEn:"Research topics in academic German style.",            level:"C1", xp:150, href:"sprechen/forschung-uebung.html",      color:"rgba(129,140,248,.1)", border:"rgba(129,140,248,.25)" },
  // ── Extra C2 ──
  { icon:"🖊️", title:"Sprachkritik",         desc:"ভাষার সৌন্দর্য ও সমালোচনা — C2 mastery।",                descEn:"The beauty and critique of language — C2 mastery.",    level:"C2", xp:200, href:"sprechen/sprachkritik-uebung.html",   color:"rgba(245,200,66,.1)",  border:"rgba(245,200,66,.25)"  },
  { icon:"🌍", title:"Globale Herausforderungen",desc:"বৈশ্বিক সমস্যা নিয়ে expert-level German।",           descEn:"Expert-level German on global challenges.",            level:"C2", xp:200, href:"sprechen/global-uebung.html",         color:"rgba(45,212,191,.1)",  border:"rgba(45,212,191,.25)"  },
];

export const CHALLENGES = [
  { icon:"🔥", title:"7 Tage Streak",      desc:"টানা ৭ দিন speaking practice করুন।",           descEn:"Do speaking practice 7 days in a row.",           xp:200 },
  { icon:"🎤", title:"2-Minuten-Rede",     desc:"যেকোনো topic-এ ২ মিনিট German-এ বলুন।",      descEn:"Speak German for 2 minutes on any topic.",         xp:100 },
  { icon:"🗣️", title:"Aussprache-Meister", desc:"সব pronunciation cards সম্পন্ন করুন।",          descEn:"Complete all pronunciation cards.",               xp:300 },
  { icon:"📖", title:"Laut vorlesen",       desc:"একটি German paragraph জোরে পড়ুন।",           descEn:"Read a German paragraph aloud.",                  xp:50  },
  { icon:"💬", title:"Täglich sprechen",    desc:"প্রতিদিন ১টি prompt-এর উত্তর দিন।",          descEn:"Answer one prompt every day.",                    xp:150 },
  { icon:"🎯", title:"Alle Topics",         desc:"সব speaking topic সম্পন্ন করুন।",              descEn:"Complete all speaking topics.",                   xp:500 },
];

// ══════════════════════════════
// EXTRA SPEAKING TOPICS — 40+
// ══════════════════════════════
// (append to SPEAKING_TOPICS export)
