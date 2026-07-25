/* =============================================
   DEUTSCH LERNEN — Shadowing Data
   js/shadowing-data.js

   NOTE: fixed a pre-existing bug where 18 of the 35
   shadowing sets (the "EXTRA SHADOWING SETS" section)
   lived outside the exported array (starting with a
   stray leading comma), which made the file a syntax
   error if ever imported. All 35 sets are now inside
   SHADOWING_SETS below, and every sentence + title has
   an `en` field for the English UI.
============================================= */

export const SHADOWING_SETS = [
  {
    id:"s-a1-01", level:"A1", title:"Sich vorstellen",
    bn:"নিজেকে পরিচয় করানো", en:"Introducing yourself",
    icon:"👋", xp:40,
    sentences:[
      { de:"Hallo, ich heiße Ahmad.", bn:"হ্যালো, আমার নাম Ahmad।", en:"Hello, my name is Ahmad.", speed:"normal" },
      { de:"Ich komme aus Bangladesch.", bn:"আমি বাংলাদেশ থেকে এসেছি।", en:"I come from Bangladesh.", speed:"normal" },
      { de:"Ich bin 25 Jahre alt.", bn:"আমার বয়স ২৫ বছর।", en:"I am 25 years old.", speed:"normal" },
      { de:"Ich lerne Deutsch.", bn:"আমি German শিখছি।", en:"I am learning German.", speed:"normal" },
      { de:"Ich wohne in Dhaka.", bn:"আমি ঢাকায় বাস করি।", en:"I live in Dhaka.", speed:"normal" },
      { de:"Ich arbeite als Student.", bn:"আমি একজন ছাত্র।", en:"I work as a student.", speed:"normal" },
      { de:"Mein Hobby ist Lesen.", bn:"আমার শখ পড়া।", en:"My hobby is reading.", speed:"normal" },
      { de:"Es freut mich, Sie kennenzulernen.", bn:"আপনার সাথে পরিচিত হতে পেরে আনন্দিত।", en:"It's nice to meet you.", speed:"slow" },
    ]
  },
  {
    id:"s-a1-02", level:"A1", title:"Im Café bestellen",
    bn:"ক্যাফেতে অর্ডার দেওয়া", en:"Ordering at a café",
    icon:"☕", xp:40,
    sentences:[
      { de:"Guten Tag! Was möchten Sie?", bn:"শুভ দিন! আপনি কী নিতে চান?", en:"Good day! What would you like?", speed:"normal" },
      { de:"Ich hätte gern einen Kaffee.", bn:"আমি একটি কফি নিতে চাই।", en:"I would like a coffee.", speed:"normal" },
      { de:"Mit Milch und Zucker, bitte.", bn:"দুধ ও চিনি সহ, দয়া করে।", en:"With milk and sugar, please.", speed:"normal" },
      { de:"Und ein Stück Kuchen dazu.", bn:"এবং সাথে একটি কেকের টুকরো।", en:"And a piece of cake too.", speed:"normal" },
      { de:"Was kostet das?", bn:"এটার দাম কত?", en:"How much is that?", speed:"normal" },
      { de:"Das macht vier Euro fünfzig.", bn:"এটা চার ইউরো পঞ্চাশ।", en:"That comes to four euros fifty.", speed:"normal" },
      { de:"Hier ist mein Geld. Danke!", bn:"এই নিন আমার টাকা। ধন্যবাদ!", en:"Here's my money. Thanks!", speed:"normal" },
      { de:"Auf Wiedersehen!", bn:"বিদায়!", en:"Goodbye!", speed:"normal" },
    ]
  },
  {
    id:"s-a1-03", level:"A1", title:"Nach dem Weg fragen",
    bn:"পথ জিজ্ঞেস করা", en:"Asking for directions",
    icon:"🗺️", xp:40,
    sentences:[
      { de:"Entschuldigung, wo ist der Bahnhof?", bn:"মাফ করবেন, স্টেশন কোথায়?", en:"Excuse me, where's the train station?", speed:"normal" },
      { de:"Gehen Sie geradeaus.", bn:"সোজা যান।", en:"Go straight ahead.", speed:"normal" },
      { de:"Dann links abbiegen.", bn:"তারপর বাঁদিকে ঘুরুন।", en:"Then turn left.", speed:"normal" },
      { de:"Der Bahnhof ist auf der rechten Seite.", bn:"স্টেশন ডানদিকে আছে।", en:"The station is on the right side.", speed:"slow" },
      { de:"Wie weit ist es?", bn:"কতটুকু দূর?", en:"How far is it?", speed:"normal" },
      { de:"Etwa fünf Minuten zu Fuß.", bn:"পায়ে হেঁটে প্রায় পাঁচ মিনিট।", en:"About a five-minute walk.", speed:"slow" },
      { de:"Vielen Dank!", bn:"অনেক ধন্যবাদ!", en:"Thank you very much!", speed:"normal" },
      { de:"Bitte sehr, gern geschehen!", bn:"স্বাগতম, সাদরে গ্রহণযোগ্য!", en:"You're very welcome!", speed:"normal" },
    ]
  },
  {
    id:"s-a1-04", level:"A1", title:"Einkaufen gehen",
    bn:"কেনাকাটা করা", en:"Going shopping",
    icon:"🛒", xp:40,
    sentences:[
      { de:"Guten Morgen! Kann ich Ihnen helfen?", bn:"শুভ সকাল! আমি কি আপনাকে সাহায্য করতে পারি?", en:"Good morning! Can I help you?", speed:"normal" },
      { de:"Ja, ich suche eine Jacke.", bn:"হ্যাঁ, আমি একটি জ্যাকেট খুঁজছি।", en:"Yes, I'm looking for a jacket.", speed:"normal" },
      { de:"Welche Größe haben Sie?", bn:"আপনার সাইজ কত?", en:"What size do you wear?", speed:"normal" },
      { de:"Ich trage Größe medium.", bn:"আমি মিডিয়াম সাইজ পরি।", en:"I wear a medium.", speed:"normal" },
      { de:"Hier ist eine schöne Jacke.", bn:"এখানে একটি সুন্দর জ্যাকেট আছে।", en:"Here's a nice jacket.", speed:"normal" },
      { de:"Was kostet die Jacke?", bn:"জ্যাকেটটির দাম কত?", en:"How much is the jacket?", speed:"normal" },
      { de:"Sie kostet fünfzig Euro.", bn:"এটা পঞ্চাশ ইউরো।", en:"It costs fifty euros.", speed:"normal" },
      { de:"Ich nehme sie. Danke schön!", bn:"আমি এটা নিচ্ছি। অনেক ধন্যবাদ!", en:"I'll take it. Thank you so much!", speed:"normal" },
    ]
  },
  {
    id:"s-a2-01", level:"A2", title:"Über die Familie sprechen",
    bn:"পরিবার নিয়ে কথা বলা", en:"Talking about family",
    icon:"👨‍👩‍👧‍👦", xp:60,
    sentences:[
      { de:"Meine Familie ist ziemlich groß.", bn:"আমার পরিবার বেশ বড়।", en:"My family is quite large.", speed:"normal" },
      { de:"Ich habe zwei Schwestern und einen Bruder.", bn:"আমার দুই বোন ও একজন ভাই আছে।", en:"I have two sisters and a brother.", speed:"slow" },
      { de:"Mein Vater ist Ingenieur von Beruf.", bn:"আমার বাবা পেশায় ইঞ্জিনিয়ার।", en:"My father is an engineer by profession.", speed:"normal" },
      { de:"Meine Mutter arbeitet als Lehrerin.", bn:"আমার মা শিক্ষিকা হিসেবে কাজ করেন।", en:"My mother works as a teacher.", speed:"normal" },
      { de:"Wir wohnen alle zusammen.", bn:"আমরা সবাই একসাথে থাকি।", en:"We all live together.", speed:"normal" },
      { de:"Meine Großeltern wohnen in einem anderen Haus.", bn:"আমার দাদা-দাদি অন্য বাড়িতে থাকেন।", en:"My grandparents live in a different house.", speed:"slow" },
      { de:"Wir treffen uns jeden Sonntag.", bn:"আমরা প্রতি রবিবার একসাথে দেখা করি।", en:"We meet up every Sunday.", speed:"normal" },
      { de:"Die Familie bedeutet mir sehr viel.", bn:"পরিবার আমার কাছে অনেক গুরুত্বপূর্ণ।", en:"Family means a lot to me.", speed:"slow" },
    ]
  },
  {
    id:"s-a2-02", level:"A2", title:"Über Hobbys sprechen",
    bn:"শখ নিয়ে কথা বলা", en:"Talking about hobbies",
    icon:"🎨", xp:60,
    sentences:[
      { de:"In meiner Freizeit lese ich gern Bücher.", bn:"অবসর সময়ে আমি বই পড়তে ভালোবাসি।", en:"In my free time I like reading books.", speed:"normal" },
      { de:"Außerdem spiele ich Gitarre.", bn:"তাছাড়া আমি গিটার বাজাই।", en:"I also play the guitar.", speed:"normal" },
      { de:"Am Wochenende gehe ich oft wandern.", bn:"সপ্তাহান্তে আমি প্রায়ই হাইকিং করতে যাই।", en:"On weekends I often go hiking.", speed:"slow" },
      { de:"Sport ist mir sehr wichtig.", bn:"খেলাধুলা আমার কাছে খুব গুরুত্বপূর্ণ।", en:"Sports are very important to me.", speed:"normal" },
      { de:"Ich schwimme dreimal pro Woche.", bn:"আমি সপ্তাহে তিনবার সাঁতার কাটি।", en:"I swim three times a week.", speed:"normal" },
      { de:"Kochen macht mir auch Spaß.", bn:"রান্না করাও আমার কাছে মজার।", en:"Cooking is fun for me too.", speed:"normal" },
      { de:"Was sind deine Hobbys?", bn:"তোমার শখ কী কী?", en:"What are your hobbies?", speed:"normal" },
      { de:"Erzähl mir mehr davon!", bn:"আমাকে এ বিষয়ে আরও বলো!", en:"Tell me more about it!", speed:"normal" },
    ]
  },
  {
    id:"s-a2-03", level:"A2", title:"Das Wetter beschreiben",
    bn:"আবহাওয়া বর্ণনা করা", en:"Describing the weather",
    icon:"🌤️", xp:60,
    sentences:[
      { de:"Heute ist das Wetter sehr schön.", bn:"আজ আবহাওয়া খুব সুন্দর।", en:"Today the weather is very nice.", speed:"normal" },
      { de:"Die Sonne scheint und es ist warm.", bn:"রোদ উঠেছে এবং গরম আছে।", en:"The sun is shining and it's warm.", speed:"normal" },
      { de:"Die Temperatur beträgt 25 Grad.", bn:"তাপমাত্রা ২৫ ডিগ্রি।", en:"The temperature is 25 degrees.", speed:"normal" },
      { de:"Gestern hat es geregnet.", bn:"গতকাল বৃষ্টি হয়েছিল।", en:"It rained yesterday.", speed:"normal" },
      { de:"Es war kalt und windig.", bn:"ঠান্ডা ও বাতাস ছিল।", en:"It was cold and windy.", speed:"normal" },
      { de:"Morgen soll es schneien.", bn:"আগামীকাল তুষারপাতের পূর্বাভাস আছে।", en:"It's supposed to snow tomorrow.", speed:"slow" },
      { de:"Im Winter ist es hier sehr kalt.", bn:"এখানে শীতকালে খুব ঠান্ডা হয়।", en:"It's very cold here in winter.", speed:"normal" },
      { de:"Mein Lieblingsmonat ist der Mai.", bn:"আমার পছন্দের মাস হলো মে।", en:"My favorite month is May.", speed:"normal" },
    ]
  },
  {
    id:"s-a2-04", level:"A2", title:"Beim Arzt",
    bn:"ডাক্তারের কাছে", en:"At the doctor's",
    icon:"🏥", xp:60,
    sentences:[
      { de:"Guten Tag, ich habe einen Termin.", bn:"শুভ দিন, আমার অ্যাপয়েন্টমেন্ট আছে।", en:"Good day, I have an appointment.", speed:"normal" },
      { de:"Was sind Ihre Beschwerden?", bn:"আপনার সমস্যা কী?", en:"What are your symptoms?", speed:"normal" },
      { de:"Ich habe Kopfschmerzen und Fieber.", bn:"আমার মাথাব্যথা ও জ্বর আছে।", en:"I have a headache and a fever.", speed:"normal" },
      { de:"Seit wann haben Sie diese Beschwerden?", bn:"কতদিন ধরে এই সমস্যা আছে?", en:"How long have you had these symptoms?", speed:"slow" },
      { de:"Seit drei Tagen.", bn:"তিন দিন ধরে।", en:"Since three days ago.", speed:"normal" },
      { de:"Bitte machen Sie den Mund auf.", bn:"দয়া করে মুখ খুলুন।", en:"Please open your mouth.", speed:"normal" },
      { de:"Ich verschreibe Ihnen ein Medikament.", bn:"আমি আপনাকে একটি ওষুধ দিচ্ছি।", en:"I'll prescribe you a medication.", speed:"slow" },
      { de:"Gute Besserung!", bn:"দ্রুত আরোগ্য হোক!", en:"Get well soon!", speed:"normal" },
    ]
  },
  {
    id:"s-b1-01", level:"B1", title:"Meinung äußern",
    bn:"মতামত প্রকাশ করা", en:"Expressing an opinion",
    icon:"💬", xp:80,
    sentences:[
      { de:"Ich bin der Meinung, dass Bildung sehr wichtig ist.", bn:"আমার মতে শিক্ষা অত্যন্ত গুরুত্বপূর্ণ।", en:"I'm of the opinion that education is very important.", speed:"slow" },
      { de:"Einerseits hat das viele Vorteile.", bn:"একদিক থেকে এর অনেক সুবিধা আছে।", en:"On one hand it has many advantages.", speed:"normal" },
      { de:"Andererseits gibt es auch Nachteile.", bn:"অন্যদিক থেকে অসুবিধাও আছে।", en:"On the other hand there are also disadvantages.", speed:"normal" },
      { de:"Meiner Ansicht nach sollten wir das anders machen.", bn:"আমার দৃষ্টিতে আমাদের এটি ভিন্নভাবে করা উচিত।", en:"In my view we should do this differently.", speed:"slow" },
      { de:"Ich stimme dir zu.", bn:"আমি তোমার সাথে একমত।", en:"I agree with you.", speed:"normal" },
      { de:"Das sehe ich etwas anders.", bn:"এটা আমি একটু ভিন্নভাবে দেখি।", en:"I see it a bit differently.", speed:"normal" },
      { de:"Könntest du das näher erklären?", bn:"তুমি কি এটা আরও বিস্তারিত বলতে পারবে?", en:"Could you explain that further?", speed:"slow" },
      { de:"Das ist ein gutes Argument.", bn:"এটি একটি ভালো যুক্তি।", en:"That's a good argument.", speed:"normal" },
    ]
  },
  {
    id:"s-b1-02", level:"B1", title:"Über Zukunftspläne sprechen",
    bn:"ভবিষ্যৎ পরিকল্পনা নিয়ে কথা বলা", en:"Talking about future plans",
    icon:"🔮", xp:80,
    sentences:[
      { de:"In Zukunft möchte ich in Deutschland studieren.", bn:"ভবিষ্যতে আমি জার্মানিতে পড়তে চাই।", en:"In the future I want to study in Germany.", speed:"normal" },
      { de:"Ich werde Informatik studieren.", bn:"আমি কম্পিউটার বিজ্ঞান পড়ব।", en:"I will study computer science.", speed:"normal" },
      { de:"Nach dem Studium plane ich, zu arbeiten.", bn:"পড়াশোনার পর আমি কাজ করার পরিকল্পনা করছি।", en:"After my studies I plan to work.", speed:"slow" },
      { de:"Mein Traumjob ist Softwareentwickler.", bn:"আমার স্বপ্নের চাকরি হলো সফটওয়্যার ডেভেলপার।", en:"My dream job is software developer.", speed:"slow" },
      { de:"Ich hoffe, eine gute Stelle zu finden.", bn:"আমি আশা করি একটি ভালো পদ পাবো।", en:"I hope to find a good position.", speed:"slow" },
      { de:"Außerdem möchte ich reisen.", bn:"তাছাড়া আমি ভ্রমণ করতে চাই।", en:"I also want to travel.", speed:"normal" },
      { de:"Europa steht ganz oben auf meiner Liste.", bn:"ইউরোপ আমার তালিকার শীর্ষে আছে।", en:"Europe is at the top of my list.", speed:"slow" },
      { de:"Ich freue mich auf die Zukunft!", bn:"আমি ভবিষ্যতের জন্য উৎসাহিত!", en:"I'm looking forward to the future!", speed:"normal" },
    ]
  },
  {
    id:"s-b1-03", level:"B1", title:"Umweltschutz diskutieren",
    bn:"পরিবেশ রক্ষা নিয়ে আলোচনা", en:"Discussing environmental protection",
    icon:"🌍", xp:80,
    sentences:[
      { de:"Der Klimawandel ist eines der größten Probleme unserer Zeit.", bn:"জলবায়ু পরিবর্তন আমাদের সময়ের অন্যতম বড় সমস্যা।", en:"Climate change is one of the biggest problems of our time.", speed:"slow" },
      { de:"Wir müssen alle gemeinsam handeln.", bn:"আমাদের সবাই মিলে পদক্ষেপ নিতে হবে।", en:"We all need to act together.", speed:"normal" },
      { de:"Jeder kann etwas für die Umwelt tun.", bn:"প্রত্যেকে পরিবেশের জন্য কিছু করতে পারে।", en:"Everyone can do something for the environment.", speed:"normal" },
      { de:"Zum Beispiel kann man weniger Fleisch essen.", bn:"উদাহরণস্বরূপ কম মাংস খাওয়া যায়।", en:"For example, one can eat less meat.", speed:"slow" },
      { de:"Oder man benutzt öffentliche Verkehrsmittel.", bn:"অথবা গণপরিবহন ব্যবহার করা যায়।", en:"Or one can use public transportation.", speed:"slow" },
      { de:"Erneuerbare Energien sind die Zukunft.", bn:"নবায়নযোগ্য শক্তি হলো ভবিষ্যৎ।", en:"Renewable energy is the future.", speed:"normal" },
      { de:"Wir müssen nachhaltig leben.", bn:"আমাদের টেকসইভাবে জীবনযাপন করতে হবে।", en:"We have to live sustainably.", speed:"normal" },
      { de:"Die nächsten Generationen zählen auf uns.", bn:"আগামী প্রজন্ম আমাদের উপর নির্ভর করছে।", en:"Future generations are counting on us.", speed:"slow" },
    ]
  },
  {
    id:"s-b1-04", level:"B1", title:"Ein Vorstellungsgespräch",
    bn:"চাকরির ইন্টারভিউ", en:"A job interview",
    icon:"💼", xp:80,
    sentences:[
      { de:"Guten Morgen, ich bin Ahmad. Ich habe einen Termin.", bn:"শুভ সকাল, আমি Ahmad। আমার অ্যাপয়েন্টমেন্ট আছে।", en:"Good morning, I'm Ahmad. I have an appointment.", speed:"normal" },
      { de:"Bitte nehmen Sie Platz.", bn:"দয়া করে বসুন।", en:"Please take a seat.", speed:"normal" },
      { de:"Erzählen Sie uns etwas über sich.", bn:"আমাদের নিজের সম্পর্কে কিছু বলুন।", en:"Tell us a bit about yourself.", speed:"normal" },
      { de:"Ich habe fünf Jahre Erfahrung in diesem Bereich.", bn:"এই ক্ষেত্রে আমার পাঁচ বছরের অভিজ্ঞতা আছে।", en:"I have five years of experience in this field.", speed:"slow" },
      { de:"Ich bin sehr teamfähig und zuverlässig.", bn:"আমি দলগতভাবে কাজ করতে পারি এবং নির্ভরযোগ্য।", en:"I work well in a team and am reliable.", speed:"slow" },
      { de:"Warum möchten Sie bei uns arbeiten?", bn:"কেন আপনি আমাদের সাথে কাজ করতে চান?", en:"Why do you want to work with us?", speed:"normal" },
      { de:"Ihr Unternehmen hat einen ausgezeichneten Ruf.", bn:"আপনার প্রতিষ্ঠানের চমৎকার সুনাম আছে।", en:"Your company has an excellent reputation.", speed:"slow" },
      { de:"Wir melden uns bei Ihnen in einer Woche.", bn:"আমরা এক সপ্তাহের মধ্যে আপনাকে জানাবো।", en:"We'll get back to you within a week.", speed:"slow" },
    ]
  },
  {
    id:"s-b2-01", level:"B2", title:"Gesellschaftliche Themen",
    bn:"সামাজিক বিষয় নিয়ে আলোচনা", en:"Social issues",
    icon:"🏛️", xp:100,
    sentences:[
      { de:"Die Digitalisierung verändert unsere Gesellschaft grundlegend.", bn:"ডিজিটালাইজেশন আমাদের সমাজকে মূলগতভাবে বদলে দিচ্ছে।", en:"Digitalization is fundamentally changing our society.", speed:"slow" },
      { de:"Einerseits bietet sie enorme Chancen.", bn:"একদিকে এটি বিশাল সুযোগ প্রদান করে।", en:"On one hand it offers enormous opportunities.", speed:"normal" },
      { de:"Andererseits birgt sie auch erhebliche Risiken.", bn:"অন্যদিকে এটি উল্লেখযোগ্য ঝুঁকিও বহন করে।", en:"On the other hand it also carries significant risks.", speed:"slow" },
      { de:"Datenschutz ist in diesem Zusammenhang besonders wichtig.", bn:"এই প্রসঙ্গে ডেটা সুরক্ষা বিশেষভাবে গুরুত্বপূর্ণ।", en:"Data protection is especially important in this context.", speed:"slow" },
      { de:"Wir müssen den technologischen Wandel aktiv gestalten.", bn:"আমাদের প্রযুক্তিগত পরিবর্তনকে সক্রিয়ভাবে গড়ে তুলতে হবে।", en:"We need to actively shape technological change.", speed:"slow" },
      { de:"Bildung spielt dabei eine entscheidende Rolle.", bn:"এক্ষেত্রে শিক্ষা একটি গুরুত্বপূর্ণ ভূমিকা পালন করে।", en:"Education plays a decisive role in this.", speed:"slow" },
      { de:"Internationale Zusammenarbeit ist unerlässlich.", bn:"আন্তর্জাতিক সহযোগিতা অপরিহার্য।", en:"International cooperation is essential.", speed:"normal" },
      { de:"Gemeinsam können wir diese Herausforderungen meistern.", bn:"একসাথে আমরা এই চ্যালেঞ্জগুলো জয় করতে পারব।", en:"Together we can master these challenges.", speed:"slow" },
    ]
  },
  {
    id:"s-b2-02", level:"B2", title:"Wirtschaft und Arbeitswelt",
    bn:"অর্থনীতি ও কর্মজগৎ", en:"Economy and the world of work",
    icon:"💹", xp:100,
    sentences:[
      { de:"Die Globalisierung hat die Arbeitswelt tiefgreifend verändert.", bn:"বিশ্বায়ন কর্মজগৎকে গভীরভাবে পরিবর্তন করেছে।", en:"Globalization has profoundly changed the world of work.", speed:"slow" },
      { de:"Remote Work ist heute weit verbreitet.", bn:"আজকাল দূরবর্তী কাজ ব্যাপকভাবে প্রচলিত।", en:"Remote work is widespread today.", speed:"normal" },
      { de:"Unternehmen suchen zunehmend digital kompetente Mitarbeiter.", bn:"প্রতিষ্ঠানগুলো ক্রমশ ডিজিটাল দক্ষ কর্মীদের খুঁজছে।", en:"Companies increasingly seek digitally skilled employees.", speed:"slow" },
      { de:"Lebenslanges Lernen wird immer wichtiger.", bn:"আজীবন শেখা ক্রমশ গুরুত্বপূর্ণ হয়ে উঠছে।", en:"Lifelong learning is becoming ever more important.", speed:"slow" },
      { de:"Flexible Arbeitszeiten fördern die Work-Life-Balance.", bn:"নমনীয় কর্মঘণ্টা কর্ম-জীবন ভারসাম্য বাড়ায়।", en:"Flexible working hours promote work-life balance.", speed:"slow" },
      { de:"Nachhaltigkeit spielt auch in der Wirtschaft eine Rolle.", bn:"অর্থনীতিতেও টেকসইতা ভূমিকা রাখে।", en:"Sustainability also plays a role in the economy.", speed:"slow" },
      { de:"Innovationen treiben den wirtschaftlichen Fortschritt an.", bn:"উদ্ভাবন অর্থনৈতিক অগ্রগতিকে এগিয়ে নেয়।", en:"Innovation drives economic progress.", speed:"slow" },
      { de:"Der Mensch steht im Mittelpunkt jeder wirtschaftlichen Aktivität.", bn:"মানুষ প্রতিটি অর্থনৈতিক কার্যকলাপের কেন্দ্রে আছে।", en:"People are at the center of every economic activity.", speed:"slow" },
    ]
  },
  {
    id:"s-c1-01", level:"C1", title:"Akademischer Vortrag",
    bn:"একাডেমিক বক্তৃতা", en:"An academic lecture",
    icon:"🎓", xp:150,
    sentences:[
      { de:"Das Thema meines heutigen Vortrags ist die künstliche Intelligenz.", bn:"আজকের আমার বক্তৃতার বিষয় হলো কৃত্রিম বুদ্ধিমত্তা।", en:"The topic of today's lecture is artificial intelligence.", speed:"slow" },
      { de:"In den letzten Jahrzehnten hat sich dieses Feld rasant entwickelt.", bn:"গত কয়েক দশকে এই ক্ষেত্রটি দ্রুত বিকশিত হয়েছে।", en:"In recent decades this field has developed rapidly.", speed:"slow" },
      { de:"Zunächst möchte ich einen Überblick geben.", bn:"প্রথমে আমি একটি সারসংক্ষেপ দিতে চাই।", en:"First I would like to give an overview.", speed:"normal" },
      { de:"Anschließend werde ich auf die ethischen Implikationen eingehen.", bn:"এরপর আমি নৈতিক প্রভাবগুলো নিয়ে আলোচনা করব।", en:"Then I will address the ethical implications.", speed:"slow" },
      { de:"Es lassen sich drei Hauptpunkte unterscheiden.", bn:"তিনটি মূল বিষয় আলাদা করা যায়।", en:"Three main points can be distinguished.", speed:"normal" },
      { de:"Wie die Studie von Müller et al. zeigt...", bn:"মুলার এবং অন্যান্যদের গবেষণা যেমন দেখায়...", en:"As the study by Müller et al. shows...", speed:"slow" },
      { de:"Zusammenfassend lässt sich sagen, dass...", bn:"সংক্ষেপে বলা যায় যে...", en:"In summary, one can say that...", speed:"normal" },
      { de:"Ich freue mich auf Ihre Fragen und Anregungen.", bn:"আমি আপনাদের প্রশ্ন ও পরামর্শের অপেক্ষায় আছি।", en:"I look forward to your questions and suggestions.", speed:"slow" },
    ]
  },
  {
    id:"s-c1-02", level:"C1", title:"Philosophische Debatte",
    bn:"দার্শনিক বিতর্ক", en:"A philosophical debate",
    icon:"🧠", xp:150,
    sentences:[
      { de:"Die Frage nach dem Wesen des Menschen ist so alt wie die Philosophie selbst.", bn:"মানুষের সত্তা সম্পর্কে প্রশ্নটি দর্শনের মতোই পুরনো।", en:"The question of human nature is as old as philosophy itself.", speed:"slow" },
      { de:"Kant argumentierte, dass die Vernunft der Mensch vom Tier unterscheidet.", bn:"কান্ট যুক্তি দিয়েছিলেন যে বুদ্ধি মানুষকে পশু থেকে আলাদা করে।", en:"Kant argued that reason distinguishes humans from animals.", speed:"slow" },
      { de:"Diese Ansicht ist jedoch nicht unumstritten.", bn:"তবে এই দৃষ্টিভঙ্গি বিতর্কমুক্ত নয়।", en:"This view, however, is not uncontested.", speed:"normal" },
      { de:"Ich würde dem entgegenhalten, dass...", bn:"আমি এর বিপরীতে বলব যে...", en:"I would counter that...", speed:"normal" },
      { de:"Das führt uns zur zentralen Frage der Autonomie.", bn:"এটি আমাদের স্বায়ত্তশাসনের কেন্দ্রীয় প্রশ্নে নিয়ে যায়।", en:"This brings us to the central question of autonomy.", speed:"slow" },
      { de:"Hierbei müssen wir zwischen Freiheit und Determinismus unterscheiden.", bn:"এখানে আমাদের স্বাধীনতা ও নিয়তিবাদের মধ্যে পার্থক্য করতে হবে।", en:"Here we must distinguish between freedom and determinism.", speed:"slow" },
      { de:"Letztendlich bleibt diese Frage offen.", bn:"শেষপর্যন্ত এই প্রশ্নটি উন্মুক্ত থাকে।", en:"Ultimately this question remains open.", speed:"normal" },
      { de:"Was meinen Sie dazu?", bn:"আপনি এ বিষয়ে কী মনে করেন?", en:"What do you think about it?", speed:"normal" },
    ]
  },
  {
    id:"s-c2-01", level:"C2", title:"Rhetorische Meisterschaft",
    bn:"বাগ্মিতার দক্ষতা", en:"Rhetorical mastery",
    icon:"💎", xp:200,
    sentences:[
      { de:"Meine sehr verehrten Damen und Herren,", bn:"সম্মানিত ভদ্রমহিলা ও ভদ্রলোকগণ,", en:"Distinguished ladies and gentlemen,", speed:"slow" },
      { de:"ich stehe heute vor Ihnen, um über ein Thema zu sprechen, das uns alle betrifft.", bn:"আমি আজ আপনাদের সামনে এমন একটি বিষয়ে কথা বলতে এসেছি যা আমাদের সবাইকে স্পর্শ করে।", en:"I stand before you today to speak about a topic that concerns us all.", speed:"slow" },
      { de:"Lassen Sie mich mit einer provokanten These beginnen.", bn:"আমাকে একটি উস্কানিমূলক থিসিস দিয়ে শুরু করতে দিন।", en:"Let me begin with a provocative thesis.", speed:"slow" },
      { de:"Es wäre ein Trugschluss zu glauben, dass...", bn:"এটি মনে করা একটি ভুল ধারণা হবে যে...", en:"It would be a fallacy to believe that...", speed:"slow" },
      { de:"Wenn wir ehrlich miteinander sind, müssen wir zugeben...", bn:"যদি আমরা পরস্পরের সাথে সৎ হই তাহলে স্বীকার করতে হবে...", en:"If we're honest with one another, we must admit...", speed:"slow" },
      { de:"Die Geschichte lehrt uns, dass Wandel unvermeidlich ist.", bn:"ইতিহাস আমাদের শেখায় যে পরিবর্তন অনিবার্য।", en:"History teaches us that change is inevitable.", speed:"slow" },
      { de:"Ich appelliere daher an Ihre Vernunft und Ihr Gewissen.", bn:"তাই আমি আপনাদের যুক্তিবোধ ও বিবেকের কাছে আহ্বান জানাই।", en:"I therefore appeal to your reason and your conscience.", speed:"slow" },
      { de:"Gemeinsam können wir eine bessere Zukunft gestalten.", bn:"একসাথে আমরা একটি উন্নত ভবিষ্যৎ গড়তে পারি।", en:"Together we can shape a better future.", speed:"slow" },
    ]
  },
  {
    id:"s-a1-05", level:"A1", title:"Zahlen & Uhrzeit",
    bn:"সংখ্যা ও সময়", en:"Numbers & time",
    icon:"🕐", xp:40,
    sentences:[
      { de:"Wie spät ist es bitte?", bn:"দয়া করে এখন কটা বাজে?", en:"What time is it, please?", speed:"normal" },
      { de:"Es ist halb drei.", bn:"সাড়ে দুইটা বাজে।", en:"It's half past two.", speed:"normal" },
      { de:"Der Zug fährt um zwanzig Uhr ab.", bn:"ট্রেন রাত আটটায় ছাড়বে।", en:"The train departs at eight PM.", speed:"slow" },
      { de:"Ich stehe jeden Morgen um sechs auf.", bn:"আমি প্রতিদিন সকাল ছয়টায় উঠি।", en:"I get up at six every morning.", speed:"slow" },
      { de:"Das kostet drei Euro fünfzig.", bn:"এটার দাম তিন ইউরো পঞ্চাশ।", en:"That costs three euros fifty.", speed:"normal" },
      { de:"Ich habe hundert Euro dabei.", bn:"আমার কাছে একশো ইউরো আছে।", en:"I have a hundred euros with me.", speed:"normal" },
      { de:"Wir treffen uns um vier Uhr.", bn:"আমরা চারটায় দেখা করব।", en:"We're meeting at four o'clock.", speed:"normal" },
      { de:"Das Geschäft öffnet um neun Uhr.", bn:"দোকানটি নয়টায় খোলে।", en:"The store opens at nine o'clock.", speed:"slow" },
    ]
  },
  {
    id:"s-a1-06", level:"A1", title:"Farben & Kleidung",
    bn:"রঙ ও পোশাক", en:"Colors & clothing",
    icon:"👕", xp:40,
    sentences:[
      { de:"Welche Farbe hat dein Auto?", bn:"তোমার গাড়ির রঙ কী?", en:"What color is your car?", speed:"normal" },
      { de:"Mein Auto ist blau.", bn:"আমার গাড়ি নীল।", en:"My car is blue.", speed:"normal" },
      { de:"Ich trage heute ein rotes Hemd.", bn:"আজ আমি একটি লাল শার্ট পরেছি।", en:"Today I'm wearing a red shirt.", speed:"slow" },
      { de:"Die Hose ist zu klein für mich.", bn:"প্যান্টটি আমার জন্য ছোট।", en:"The pants are too small for me.", speed:"normal" },
      { de:"Haben Sie das auch in Grün?", bn:"এটা কি সবুজ রঙেও আছে?", en:"Do you have this in green too?", speed:"normal" },
      { de:"Ich möchte eine schwarze Jacke.", bn:"আমি একটি কালো জ্যাকেট চাই।", en:"I'd like a black jacket.", speed:"normal" },
      { de:"Das Kleid ist sehr schön.", bn:"পোশাকটি খুব সুন্দর।", en:"The dress is very pretty.", speed:"normal" },
      { de:"Welche Größe brauchen Sie?", bn:"আপনার কোন সাইজ দরকার?", en:"What size do you need?", speed:"normal" },
    ]
  },
  {
    id:"s-a1-07", level:"A1", title:"Essen & Trinken bestellen",
    bn:"খাবার ও পানীয় অর্ডার করা", en:"Ordering food & drinks",
    icon:"🍽️", xp:40,
    sentences:[
      { de:"Was empfehlen Sie heute?", bn:"আজ আপনি কী recommend করবেন?", en:"What do you recommend today?", speed:"normal" },
      { de:"Ich nehme die Tomatensuppe.", bn:"আমি টমেটো স্যুপ নেব।", en:"I'll have the tomato soup.", speed:"normal" },
      { de:"Und als Hauptgericht?", bn:"এবং মূল খাবার হিসেবে?", en:"And for the main course?", speed:"normal" },
      { de:"Ich möchte das Schnitzel bitte.", bn:"আমি Schnitzel নিতে চাই দয়া করে।", en:"I'd like the schnitzel, please.", speed:"normal" },
      { de:"Möchten Sie etwas trinken?", bn:"আপনি কিছু পান করতে চান?", en:"Would you like something to drink?", speed:"normal" },
      { de:"Ein Glas Wasser, bitte.", bn:"এক গ্লাস পানি, দয়া করে।", en:"A glass of water, please.", speed:"normal" },
      { de:"Schmeckt es Ihnen?", bn:"আপনার কি ভালো লাগছে?", en:"Do you like it?", speed:"normal" },
      { de:"Ja, es ist sehr lecker!", bn:"হ্যাঁ, এটা খুব সুস্বাদু!", en:"Yes, it's delicious!", speed:"normal" },
    ]
  },
  {
    id:"s-a1-08", level:"A1", title:"Begrüßung & Vorstellung formal",
    bn:"আনুষ্ঠানিক পরিচয়", en:"Formal greeting & introduction",
    icon:"🤝", xp:40,
    sentences:[
      { de:"Guten Tag, darf ich mich vorstellen?", bn:"শুভ দিন, আমি কি নিজেকে পরিচয় করিয়ে দিতে পারি?", en:"Good day, may I introduce myself?", speed:"slow" },
      { de:"Mein Name ist Ahmad Rahman.", bn:"আমার নাম Ahmad Rahman।", en:"My name is Ahmad Rahman.", speed:"normal" },
      { de:"Ich komme aus Bangladesch.", bn:"আমি বাংলাদেশ থেকে এসেছি।", en:"I come from Bangladesh.", speed:"normal" },
      { de:"Ich bin von Beruf Ingenieur.", bn:"আমি পেশায় প্রকৌশলী।", en:"I am an engineer by profession.", speed:"normal" },
      { de:"Sehr angenehm, Sie kennenzulernen.", bn:"আপনার সাথে পরিচিত হতে পেরে খুব ভালো লাগলো।", en:"Very pleased to meet you.", speed:"slow" },
      { de:"Wie lange sind Sie schon hier?", bn:"আপনি কতদিন ধরে এখানে আছেন?", en:"How long have you been here?", speed:"slow" },
      { de:"Ich bin seit drei Monaten hier.", bn:"আমি তিন মাস ধরে এখানে আছি।", en:"I've been here for three months.", speed:"slow" },
      { de:"Haben Sie eine Visitenkarte?", bn:"আপনার কি ভিজিটিং কার্ড আছে?", en:"Do you have a business card?", speed:"normal" },
    ]
  },
  {
    id:"s-a2-05", level:"A2", title:"Telefonieren",
    bn:"ফোনে কথা বলা", en:"Making a phone call",
    icon:"📞", xp:60,
    sentences:[
      { de:"Guten Tag, hier ist Ahmad Rahman.", bn:"শুভ দিন, এখানে Ahmad Rahman বলছি।", en:"Good day, this is Ahmad Rahman.", speed:"normal" },
      { de:"Kann ich bitte mit Herrn Müller sprechen?", bn:"আমি কি মিস্টার মুলারের সাথে কথা বলতে পারি?", en:"Could I please speak with Mr. Müller?", speed:"slow" },
      { de:"Einen Moment bitte, ich verbinde Sie.", bn:"একটু অপেক্ষা করুন, আমি connect করছি।", en:"One moment please, I'll connect you.", speed:"slow" },
      { de:"Es tut mir leid, er ist gerade nicht da.", bn:"দুঃখিত, তিনি এখন নেই।", en:"I'm sorry, he's not here right now.", speed:"slow" },
      { de:"Kann ich eine Nachricht hinterlassen?", bn:"আমি কি একটি বার্তা রাখতে পারি?", en:"Can I leave a message?", speed:"slow" },
      { de:"Bitte richten Sie ihm aus, dass ich angerufen habe.", bn:"দয়া করে তাকে বলুন যে আমি ফোন করেছিলাম।", en:"Please tell him that I called.", speed:"slow" },
      { de:"Meine Nummer ist 0176 12345678.", bn:"আমার নম্বর হলো 0176 12345678।", en:"My number is 0176 12345678.", speed:"slow" },
      { de:"Vielen Dank und auf Wiederhören!", bn:"অনেক ধন্যবাদ এবং বিদায়!", en:"Thank you very much, and goodbye!", speed:"normal" },
    ]
  },
  {
    id:"s-a2-06", level:"A2", title:"Wohnung beschreiben",
    bn:"বাড়ি বর্ণনা করা", en:"Describing an apartment",
    icon:"🏠", xp:60,
    sentences:[
      { de:"Meine Wohnung ist nicht sehr groß.", bn:"আমার অ্যাপার্টমেন্ট খুব বড় নয়।", en:"My apartment isn't very big.", speed:"normal" },
      { de:"Sie hat drei Zimmer.", bn:"এতে তিনটি ঘর আছে।", en:"It has three rooms.", speed:"normal" },
      { de:"Es gibt ein Wohnzimmer, ein Schlafzimmer und eine Küche.", bn:"একটি বসার ঘর, একটি শোয়ার ঘর ও একটি রান্নাঘর আছে।", en:"There's a living room, a bedroom, and a kitchen.", speed:"slow" },
      { de:"Das Badezimmer ist klein aber sauber.", bn:"বাথরুমটি ছোট কিন্তু পরিষ্কার।", en:"The bathroom is small but clean.", speed:"slow" },
      { de:"Ich wohne im dritten Stock.", bn:"আমি তৃতীয় তলায় থাকি।", en:"I live on the third floor.", speed:"normal" },
      { de:"Von meinem Fenster aus sehe ich den Park.", bn:"আমার জানালা থেকে পার্ক দেখা যায়।", en:"From my window I can see the park.", speed:"slow" },
      { de:"Die Miete beträgt sechshundert Euro.", bn:"ভাড়া ছয়শো ইউরো।", en:"The rent is six hundred euros.", speed:"slow" },
      { de:"Ich bin sehr zufrieden mit meiner Wohnung.", bn:"আমি আমার অ্যাপার্টমেন্ট নিয়ে খুব সন্তুষ্ট।", en:"I'm very happy with my apartment.", speed:"slow" },
    ]
  },
  {
    id:"s-a2-07", level:"A2", title:"Einen Termin vereinbaren",
    bn:"অ্যাপয়েন্টমেন্ট নেওয়া", en:"Making an appointment",
    icon:"📅", xp:60,
    sentences:[
      { de:"Ich würde gern einen Termin machen.", bn:"আমি একটি অ্যাপয়েন্টমেন্ট নিতে চাই।", en:"I'd like to make an appointment.", speed:"slow" },
      { de:"Wann passt es Ihnen am besten?", bn:"আপনার জন্য কখন সবচেয়ে সুবিধাজনক?", en:"When works best for you?", speed:"slow" },
      { de:"Wäre Dienstag um zehn Uhr möglich?", bn:"মঙ্গলবার দশটায় কি সম্ভব?", en:"Would Tuesday at ten o'clock be possible?", speed:"slow" },
      { de:"Ja, das passt mir gut.", bn:"হ্যাঁ, এটা আমার জন্য ভালো।", en:"Yes, that works well for me.", speed:"normal" },
      { de:"Unter welchem Namen soll ich Sie eintragen?", bn:"কোন নামে লিখব আপনাকে?", en:"Under what name should I put you down?", speed:"slow" },
      { de:"Ahmad Rahman bitte.", bn:"Ahmad Rahman দয়া করে।", en:"Ahmad Rahman, please.", speed:"normal" },
      { de:"Können Sie mir die Adresse schicken?", bn:"আপনি কি আমাকে ঠিকানা পাঠাতে পারবেন?", en:"Could you send me the address?", speed:"slow" },
      { de:"Natürlich, bis Dienstag dann!", bn:"অবশ্যই, তাহলে মঙ্গলবার পর্যন্ত!", en:"Of course, see you Tuesday then!", speed:"normal" },
    ]
  },
  {
    id:"s-a2-08", level:"A2", title:"Im Supermarkt",
    bn:"সুপারমার্কেটে", en:"At the supermarket",
    icon:"🛒", xp:60,
    sentences:[
      { de:"Entschuldigung, wo finde ich die Milch?", bn:"মাফ করবেন, দুধ কোথায় পাব?", en:"Excuse me, where can I find the milk?", speed:"normal" },
      { de:"Die Milch ist in der Kühltheke hinten links.", bn:"দুধ পেছনে বাঁদিকের ফ্রিজে আছে।", en:"The milk is in the fridge section, back left.", speed:"slow" },
      { de:"Haben Sie frisches Brot?", bn:"আপনাদের কাছে তাজা রুটি আছে?", en:"Do you have fresh bread?", speed:"normal" },
      { de:"Das Brot kommt morgen früh.", bn:"রুটি আগামীকাল সকালে আসবে।", en:"The bread arrives tomorrow morning.", speed:"normal" },
      { de:"Was kostet das Kilo Tomaten?", bn:"এক কেজি টমেটোর দাম কত?", en:"How much is a kilo of tomatoes?", speed:"normal" },
      { de:"Zwei Euro neunzig das Kilo.", bn:"কেজিতে দুই ইউরো নব্বই।", en:"Two euros ninety a kilo.", speed:"normal" },
      { de:"Ich nehme zwei Kilo bitte.", bn:"আমি দুই কেজি নেব দয়া করে।", en:"I'll take two kilos, please.", speed:"normal" },
      { de:"Möchten Sie eine Tüte?", bn:"আপনি কি ব্যাগ নিতে চান?", en:"Would you like a bag?", speed:"normal" },
    ]
  },
  {
    id:"s-b1-05", level:"B1", title:"Eine Reise planen",
    bn:"ভ্রমণ পরিকল্পনা করা", en:"Planning a trip",
    icon:"✈️", xp:80,
    sentences:[
      { de:"Ich möchte im Sommer nach Deutschland reisen.", bn:"আমি গ্রীষ্মে জার্মানিতে যেতে চাই।", en:"I want to travel to Germany in the summer.", speed:"slow" },
      { de:"Welche Städte würdest du empfehlen?", bn:"তুমি কোন শহরগুলো recommend করবে?", en:"Which cities would you recommend?", speed:"slow" },
      { de:"Berlin ist auf jeden Fall sehenswert.", bn:"বার্লিন অবশ্যই দেখার মতো।", en:"Berlin is definitely worth seeing.", speed:"slow" },
      { de:"Außerdem solltest du München besuchen.", bn:"তাছাড়া তোমার মিউনিখ পরিদর্শন করা উচিত।", en:"You should also visit Munich.", speed:"slow" },
      { de:"Wie lange dauert die Reise mit dem Zug?", bn:"ট্রেনে ভ্রমণে কতক্ষণ লাগে?", en:"How long does the trip take by train?", speed:"slow" },
      { de:"Von Hamburg nach München etwa sechs Stunden.", bn:"হামবুর্গ থেকে মিউনিখ প্রায় ছয় ঘণ্টা।", en:"About six hours from Hamburg to Munich.", speed:"slow" },
      { de:"Soll ich ein Hotel oder eine Pension buchen?", bn:"হোটেল নাকি গেস্টহাউস বুক করব?", en:"Should I book a hotel or a guesthouse?", speed:"slow" },
      { de:"Das kommt auf dein Budget an.", bn:"এটা তোমার বাজেটের উপর নির্ভর করে।", en:"That depends on your budget.", speed:"slow" },
    ]
  },
  {
    id:"s-b1-06", level:"B1", title:"Über Gesundheit sprechen",
    bn:"স্বাস্থ্য নিয়ে কথা বলা", en:"Talking about health",
    icon:"💪", xp:80,
    sentences:[
      { de:"Wie bleibst du eigentlich so fit?", bn:"তুমি আসলে এত ফিট কীভাবে থাকো?", en:"How do you actually stay so fit?", speed:"normal" },
      { de:"Ich versuche, dreimal pro Woche Sport zu machen.", bn:"আমি সপ্তাহে তিনবার ব্যায়াম করার চেষ্টা করি।", en:"I try to exercise three times a week.", speed:"slow" },
      { de:"Außerdem ernähre ich mich gesund.", bn:"তাছাড়া আমি স্বাস্থ্যকর খাবার খাই।", en:"I also eat healthily.", speed:"slow" },
      { de:"Ich esse viel Obst und Gemüse.", bn:"আমি অনেক ফল ও সবজি খাই।", en:"I eat a lot of fruit and vegetables.", speed:"normal" },
      { de:"Wie viel Wasser trinkst du täglich?", bn:"তুমি প্রতিদিন কতটুকু পানি পান করো?", en:"How much water do you drink daily?", speed:"slow" },
      { de:"Mindestens zwei Liter.", bn:"কমপক্ষে দুই লিটার।", en:"At least two liters.", speed:"normal" },
      { de:"Schlaf ist auch sehr wichtig.", bn:"ঘুমও অনেক গুরুত্বপূর্ণ।", en:"Sleep is also very important.", speed:"normal" },
      { de:"Ich schlafe etwa acht Stunden pro Nacht.", bn:"আমি রাতে প্রায় আট ঘণ্টা ঘুমাই।", en:"I sleep about eight hours a night.", speed:"slow" },
    ]
  },
  {
    id:"s-b1-07", level:"B1", title:"Probleme lösen",
    bn:"সমস্যা সমাধান করা", en:"Solving problems",
    icon:"🔧", xp:80,
    sentences:[
      { de:"Ich habe ein Problem mit meinem Computer.", bn:"আমার কম্পিউটারে একটি সমস্যা আছে।", en:"I have a problem with my computer.", speed:"normal" },
      { de:"Was genau ist das Problem?", bn:"সমস্যাটা ঠিক কী?", en:"What exactly is the problem?", speed:"normal" },
      { de:"Er startet nicht mehr richtig.", bn:"এটা আর সঠিকভাবে চালু হচ্ছে না।", en:"It doesn't start up properly anymore.", speed:"slow" },
      { de:"Haben Sie schon versucht, ihn neu zu starten?", bn:"আপনি কি restart করার চেষ্টা করেছেন?", en:"Have you already tried restarting it?", speed:"slow" },
      { de:"Ja, aber das hat nicht geholfen.", bn:"হ্যাঁ, কিন্তু কাজ হয়নি।", en:"Yes, but that didn't help.", speed:"normal" },
      { de:"Dann müssen wir das System überprüfen.", bn:"তাহলে আমাদের সিস্টেম পরীক্ষা করতে হবে।", en:"Then we need to check the system.", speed:"slow" },
      { de:"Wie lange wird die Reparatur dauern?", bn:"মেরামতে কতক্ষণ লাগবে?", en:"How long will the repair take?", speed:"slow" },
      { de:"Voraussichtlich zwei bis drei Stunden.", bn:"সম্ভবত দুই থেকে তিন ঘণ্টা।", en:"Probably two to three hours.", speed:"slow" },
    ]
  },
  {
    id:"s-b1-08", level:"B1", title:"Kulturelle Unterschiede",
    bn:"সাংস্কৃতিক পার্থক্য", en:"Cultural differences",
    icon:"🌍", xp:80,
    sentences:[
      { de:"Was fällt dir in Deutschland am meisten auf?", bn:"জার্মানিতে তোমার সবচেয়ে বেশি কী চোখে পড়ে?", en:"What stands out to you most in Germany?", speed:"slow" },
      { de:"Die Menschen sind sehr pünktlich hier.", bn:"এখানে মানুষ খুব সময়মতো চলে।", en:"People here are very punctual.", speed:"slow" },
      { de:"In meiner Heimat ist man etwas flexibler.", bn:"আমার দেশে মানুষ একটু বেশি নমনীয়।", en:"In my home country people are a bit more flexible.", speed:"slow" },
      { de:"Das verstehe ich gut.", bn:"আমি এটা ভালো বুঝি।", en:"I understand that well.", speed:"normal" },
      { de:"Vermisst du manchmal deine Heimat?", bn:"তুমি কি কখনো তোমার দেশ মিস করো?", en:"Do you sometimes miss your home country?", speed:"slow" },
      { de:"Ja, besonders das Essen und die Familie.", bn:"হ্যাঁ, বিশেষত খাবার ও পরিবারকে।", en:"Yes, especially the food and family.", speed:"slow" },
      { de:"Das ist ganz normal.", bn:"এটা সম্পূর্ণ স্বাভাবিক।", en:"That's completely normal.", speed:"normal" },
      { de:"Mit der Zeit gewöhnt man sich daran.", bn:"সময়ের সাথে সাথে মানিয়ে নেওয়া যায়।", en:"You get used to it over time.", speed:"slow" },
    ]
  },
  {
    id:"s-b2-03", level:"B2", title:"Berufliche Verhandlung",
    bn:"পেশাদার আলোচনা", en:"A business negotiation",
    icon:"💼", xp:100,
    sentences:[
      { de:"Wir sind hier, um die Konditionen des Vertrags zu besprechen.", bn:"আমরা এখানে চুক্তির শর্তাবলী নিয়ে আলোচনা করতে এসেছি।", en:"We're here to discuss the terms of the contract.", speed:"slow" },
      { de:"Unser Angebot ist aus unserer Sicht sehr fair.", bn:"আমাদের দৃষ্টিতে আমাদের প্রস্তাব খুব ন্যায্য।", en:"Our offer is very fair from our point of view.", speed:"slow" },
      { de:"Ich sehe das etwas anders.", bn:"আমি এটা একটু ভিন্নভাবে দেখি।", en:"I see it a bit differently.", speed:"normal" },
      { de:"Könnten Sie uns etwas entgegenkommen?", bn:"আপনি কি আমাদের একটু ছাড় দিতে পারবেন?", en:"Could you meet us halfway on something?", speed:"slow" },
      { de:"Wir könnten über den Preis reden.", bn:"আমরা দাম নিয়ে কথা বলতে পারি।", en:"We could talk about the price.", speed:"slow" },
      { de:"Das wäre eine gute Basis für weitere Gespräche.", bn:"এটা আরও আলোচনার জন্য একটি ভালো ভিত্তি হবে।", en:"That would be a good basis for further discussion.", speed:"slow" },
      { de:"Lassen Sie uns einen Kompromiss finden.", bn:"চলুন একটি আপোষ খুঁজে বের করি।", en:"Let's find a compromise.", speed:"slow" },
      { de:"Ich denke, wir können uns einigen.", bn:"আমি মনে করি আমরা একমত হতে পারব।", en:"I think we can come to an agreement.", speed:"slow" },
    ]
  },
  {
    id:"s-b2-04", level:"B2", title:"Bildung & Karriere",
    bn:"শিক্ষা ও ক্যারিয়ার", en:"Education & career",
    icon:"🎓", xp:100,
    sentences:[
      { de:"Welchen Bildungsweg haben Sie eingeschlagen?", bn:"আপনি কোন শিক্ষার পথ বেছে নিয়েছেন?", en:"What educational path did you take?", speed:"slow" },
      { de:"Ich habe Wirtschaftsinformatik studiert.", bn:"আমি ব্যবসায়িক তথ্যবিজ্ঞান পড়েছি।", en:"I studied business informatics.", speed:"slow" },
      { de:"Nach dem Studium habe ich bei einem Startup angefangen.", bn:"পড়াশোনার পর আমি একটি স্টার্টআপে শুরু করেছি।", en:"After my studies I started at a startup.", speed:"slow" },
      { de:"Welche Fähigkeiten sind in Ihrem Beruf besonders wichtig?", bn:"আপনার পেশায় কোন দক্ষতাগুলো বিশেষভাবে গুরুত্বপূর্ণ?", en:"What skills are especially important in your profession?", speed:"slow" },
      { de:"Analytisches Denken und Teamarbeit sind entscheidend.", bn:"বিশ্লেষণাত্মক চিন্তা ও দলগত কাজ নির্ধারক।", en:"Analytical thinking and teamwork are crucial.", speed:"slow" },
      { de:"Bilden Sie sich regelmäßig weiter?", bn:"আপনি কি নিয়মিত নিজেকে উন্নত করেন?", en:"Do you continue your education regularly?", speed:"slow" },
      { de:"Ja, ich mache Online-Kurse und besuche Konferenzen.", bn:"হ্যাঁ, আমি অনলাইন কোর্স করি ও সম্মেলনে যাই।", en:"Yes, I take online courses and attend conferences.", speed:"slow" },
      { de:"Lebenslanges Lernen ist für mich selbstverständlich.", bn:"আজীবন শেখা আমার কাছে স্বাভাবিক।", en:"Lifelong learning is second nature to me.", speed:"slow" },
    ]
  },
  {
    id:"s-c1-03", level:"C1", title:"Kritische Medienanalyse",
    bn:"সমালোচনামূলক মিডিয়া বিশ্লেষণ", en:"Critical media analysis",
    icon:"📰", xp:150,
    sentences:[
      { de:"Medien spielen eine zentrale Rolle bei der Meinungsbildung.", bn:"মতামত গঠনে মিডিয়া কেন্দ্রীয় ভূমিকা পালন করে।", en:"Media play a central role in shaping opinion.", speed:"slow" },
      { de:"Allerdings ist eine kritische Medienkompetenz unerlässlich.", bn:"তবে সমালোচনামূলক মিডিয়া দক্ষতা অপরিহার্য।", en:"However, critical media literacy is essential.", speed:"slow" },
      { de:"Nicht alle Informationen sind gleich zuverlässig.", bn:"সব তথ্য সমানভাবে নির্ভরযোগ্য নয়।", en:"Not all information is equally reliable.", speed:"slow" },
      { de:"Man sollte stets die Quellen überprüfen.", bn:"সর্বদা উৎস যাচাই করা উচিত।", en:"One should always check the sources.", speed:"slow" },
      { de:"Fake News sind ein ernsthaftes gesellschaftliches Problem.", bn:"ভুয়া সংবাদ একটি গুরুতর সামাজিক সমস্যা।", en:"Fake news is a serious social problem.", speed:"slow" },
      { de:"Soziale Medien verstärken oft bestehende Vorurteile.", bn:"সামাজিক মিডিয়া প্রায়ই বিদ্যমান পক্ষপাত শক্তিশালী করে।", en:"Social media often reinforces existing biases.", speed:"slow" },
      { de:"Eine pluralistische Medienlandschaft ist demokratisch wichtig.", bn:"বহুত্ববাদী মিডিয়া পরিবেশ গণতান্ত্রিকভাবে গুরুত্বপূর্ণ।", en:"A pluralistic media landscape is democratically important.", speed:"slow" },
      { de:"Bildung ist der beste Schutz gegen Desinformation.", bn:"শিক্ষা হলো তথ্যবিকৃতির বিরুদ্ধে সেরা সুরক্ষা।", en:"Education is the best protection against disinformation.", speed:"slow" },
    ]
  },
  {
    id:"s-c1-04", level:"C1", title:"Interkulturelle Kommunikation",
    bn:"আন্তঃসাংস্কৃতিক যোগাযোগ", en:"Intercultural communication",
    icon:"🌐", xp:150,
    sentences:[
      { de:"Interkulturelle Kompetenz wird in der globalisierten Welt immer wichtiger.", bn:"বিশ্বায়নের যুগে আন্তঃসাংস্কৃতিক দক্ষতা ক্রমশ গুরুত্বপূর্ণ হচ্ছে।", en:"Intercultural competence is becoming increasingly important in a globalized world.", speed:"slow" },
      { de:"Missverständnisse entstehen oft durch kulturelle Unterschiede.", bn:"ভুল বোঝাবুঝি প্রায়ই সাংস্কৃতিক পার্থক্যের কারণে হয়।", en:"Misunderstandings often arise from cultural differences.", speed:"slow" },
      { de:"Empathie und Offenheit sind dabei entscheidend.", bn:"সহানুভূতি ও উন্মুক্ততা এক্ষেত্রে নির্ধারক।", en:"Empathy and openness are crucial here.", speed:"slow" },
      { de:"Man sollte keine kulturellen Stereotypen annehmen.", bn:"সাংস্কৃতিক স্টেরিওটাইপ গ্রহণ করা উচিত নয়।", en:"One should not adopt cultural stereotypes.", speed:"slow" },
      { de:"Aktives Zuhören fördert das gegenseitige Verständnis.", bn:"সক্রিয় শোনা পারস্পরিক বোঝাপড়া বাড়ায়।", en:"Active listening promotes mutual understanding.", speed:"slow" },
      { de:"Kulturelle Vielfalt bereichert uns alle.", bn:"সাংস্কৃতিক বৈচিত্র্য আমাদের সবাইকে সমৃদ্ধ করে।", en:"Cultural diversity enriches us all.", speed:"slow" },
      { de:"Es ist wichtig, Vorurteile aktiv zu hinterfragen.", bn:"সক্রিয়ভাবে পক্ষপাত প্রশ্ন করা গুরুত্বপূর্ণ।", en:"It's important to actively question prejudices.", speed:"slow" },
      { de:"Dialog ist der Schlüssel zur interkulturellen Verständigung.", bn:"সংলাপ হলো আন্তঃসাংস্কৃতিক বোঝাপড়ার চাবিকাঠি।", en:"Dialogue is the key to intercultural understanding.", speed:"slow" },
    ]
  },
  {
    id:"s-c2-02", level:"C2", title:"Wissenschaftliche Argumentation",
    bn:"বৈজ্ঞানিক যুক্তিতর্ক", en:"Scientific argumentation",
    icon:"🔬", xp:200,
    sentences:[
      { de:"Die vorliegenden empirischen Daten lassen folgende Schlussfolgerungen zu:", bn:"উপস্থিত অভিজ্ঞতামূলক ডেটা নিম্নলিখিত সিদ্ধান্তের অনুমতি দেয়:", en:"The available empirical data allow for the following conclusions:", speed:"slow" },
      { de:"Erstens zeigt sich eine signifikante Korrelation zwischen den Variablen.", bn:"প্রথমত, চলকগুলোর মধ্যে একটি উল্লেখযোগ্য সম্পর্ক দেখা যায়।", en:"First, a significant correlation between the variables is evident.", speed:"slow" },
      { de:"Allerdings impliziert Korrelation keine Kausalität.", bn:"তবে পারস্পরিক সম্পর্ক কার্যকারণ বোঝায় না।", en:"However, correlation does not imply causation.", speed:"slow" },
      { de:"Weitere Forschung ist erforderlich, um die Hypothese zu validieren.", bn:"অনুকল্প যাচাই করতে আরও গবেষণা প্রয়োজন।", en:"Further research is needed to validate the hypothesis.", speed:"slow" },
      { de:"Die Methodik dieser Studie unterliegt gewissen Einschränkungen.", bn:"এই গবেষণার পদ্ধতি নির্দিষ্ট সীমাবদ্ধতার অধীনে।", en:"The methodology of this study is subject to certain limitations.", speed:"slow" },
      { de:"Dennoch liefert sie wertvolle Erkenntnisse für das Forschungsfeld.", bn:"তবুও এটি গবেষণাক্ষেত্রের জন্য মূল্যবান অন্তর্দৃষ্টি প্রদান করে।", en:"Nevertheless, it provides valuable insights for the research field.", speed:"slow" },
      { de:"Zukünftige Studien sollten diese Limitationen berücksichtigen.", bn:"ভবিষ্যৎ গবেষণাগুলো এই সীমাবদ্ধতাগুলো বিবেচনা করা উচিত।", en:"Future studies should take these limitations into account.", speed:"slow" },
      { de:"Ich danke Ihnen für Ihre aufmerksame Zuhörerschaft.", bn:"আপনাদের মনোযোগী শ্রবণের জন্য ধন্যবাদ।", en:"I thank you for your attentive audience.", speed:"slow" },
    ]
  },
  {
    id:"s-c2-03", level:"C2", title:"Literarische Analyse",
    bn:"সাহিত্য বিশ্লেষণ", en:"Literary analysis",
    icon:"📚", xp:200,
    sentences:[
      { de:"Goethes Faust gilt als eines der bedeutendsten Werke der deutschen Literatur.", bn:"গেটের ফাউস্ট জার্মান সাহিত্যের অন্যতম গুরুত্বপূর্ণ রচনা হিসেবে বিবেচিত।", en:"Goethe's Faust is considered one of the most significant works of German literature.", speed:"slow" },
      { de:"Das Werk thematisiert den Konflikt zwischen Wissen und Erfahrung.", bn:"রচনাটি জ্ঞান ও অভিজ্ঞতার মধ্যে দ্বন্দ্বকে বিষয়বস্তু করে।", en:"The work addresses the conflict between knowledge and experience.", speed:"slow" },
      { de:"Der Protagonist verkörpert den modernen, strebsamen Menschen.", bn:"নায়ক আধুনিক, উচ্চাকাঙ্ক্ষী মানুষকে মূর্ত করে তোলেন।", en:"The protagonist embodies the modern, striving human being.", speed:"slow" },
      { de:"Durch symbolische Sprache wird dies meisterhaft ausgedrückt.", bn:"প্রতীকী ভাষার মাধ্যমে এটি অসাধারণভাবে প্রকাশ করা হয়েছে।", en:"This is masterfully expressed through symbolic language.", speed:"slow" },
      { de:"Die Tragödie spiegelt universelle menschliche Fragen wider.", bn:"ট্র্যাজেডিটি সার্বজনীন মানবিক প্রশ্নগুলো প্রতিফলিত করে।", en:"The tragedy reflects universal human questions.", speed:"slow" },
      { de:"Diese zeitlose Relevanz macht das Werk bis heute bedeutsam.", bn:"এই চিরন্তন প্রাসঙ্গিকতা রচনাটিকে আজও গুরুত্বপূর্ণ করে তোলে।", en:"This timeless relevance makes the work significant to this day.", speed:"slow" },
      { de:"Eine fundierte Analyse erfordert Kenntnisse des historischen Kontexts.", bn:"একটি গভীর বিশ্লেষণের জন্য ঐতিহাসিক প্রেক্ষাপটের জ্ঞান প্রয়োজন।", en:"A well-founded analysis requires knowledge of the historical context.", speed:"slow" },
      { de:"Die Forschung zu diesem Werk ist bis heute lebendig und vielfältig.", bn:"এই রচনা সম্পর্কে গবেষণা আজও জীবন্ত ও বৈচিত্র্যময়।", en:"Research on this work remains lively and diverse to this day.", speed:"slow" },
    ]
  },
];

export const SHADOWING_TIPS = [
  { icon:"👂", tip:"প্রথমে পুরো sentence শুনুন, তারপর repeat করুন।", en:"First listen to the whole sentence, then repeat it." },
  { icon:"🔄", tip:"একই sentence ৩-৫ বার repeat করুন যতক্ষণ না comfortable লাগে।", en:"Repeat the same sentence 3-5 times until it feels comfortable." },
  { icon:"📱", tip:"Record করুন এবং native speaker-এর সাথে তুলনা করুন।", en:"Record yourself and compare with the native speaker." },
  { icon:"🎯", tip:"শুধু উচ্চারণ নয়, rhythm ও intonation-ও copy করুন।", en:"Copy not just the pronunciation, but the rhythm and intonation too." },
  { icon:"⏱️", tip:"Slow mode দিয়ে শুরু করুন, তারপর normal speed-এ যান।", en:"Start with slow mode, then move to normal speed." },
  { icon:"📝", tip:"কঠিন sounds-এর উপর focus করুন।", en:"Focus on the difficult sounds." },
];
