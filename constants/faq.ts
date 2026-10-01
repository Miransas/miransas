export const groups = {
  General: [
    {
      id: "01",
      q: "What exactly does Miransas build?",
      a:
        "Yüksek performanslı yazılım sistemleri: bağımsız oyunlar (Project Sad), güvenli altyapı (Binboi) ve algoritmik motorlar (Rust Chess Engine). Her proje performans ve uzun vadeli sürdürülebilirlik gözetilerek geliştirilir.",
    },
    {
      id: "02",
      q: "Do I need technical knowledge to work with you?",
      a:
        "Hiç gerekmez. İster teknik bir kurucu ister işletme sahibi olun, vizyonunuzu çalışan sistemlere dönüştürürüz. Jargon yok, gereksiz karmaşıklık yok; yalnızca açık iletişim ve yayınlanan kod var.",
    },
    {
      id: "03",
      q: "Can you integrate with our existing stack?",
      a:
        "Kesinlikle. Modern API'ler, webhook'lar, gRPC ve özel protokollerle sorunsuz entegrasyonlar konusunda uzmanız. Go, Rust ve Next.js yığınınızla akıcı biçimde çalışırız.",
    },
    {
      id: "04",
      q: "How does the engagement process work?",
      a:
        "1. Keşif: Probleminizi derinlemesine anlarız. 2. Tasarım: Wireframe ve mimari. 3. Geliştirme: Haftalık demolarla yinelemeli çalışma. 4. Yayın: İzlemeli üretim kurulumu. Sürpriz yok, kapsam kayması yok.",
    },
    {
      id: "05",
      q: "Do you provide ongoing support?",
      a:
        "Evet. Yayından sonra sizi yarı yolda bırakmayız. Tüm planlarda destek süresi bulunur; ürününüz ölçeklenirken sürekli iyileştirme, güvenlik yamaları ve özellik geliştirme için devamlı destek anlaşmaları sunarız.",
    },
    {
      id: "06",
      q: "Are you really a solo studio?",
      a:
        "Evet. Miransas bilinçli olarak tek kişilik bir yapıdır. Projenizi geliştiren mühendisle doğrudan iletişim kurarsınız; devir, müşteri yöneticisi veya bürokrasi yoktur.",
    },
  ],
  "Community & Features": [
    {
      q: "Can members access courses and chat with one login?",
      a: "Yes. Courses, events, discussions, and the member directory all live in the same branded space under one login.",
    },
    {
      q: "Do you support live events?",
      a: "You can publish events, collect RSVPs, and keep recaps next to the rest of the community — without a second calendar tool.",
    },
  ],
  "Privacy & Access": [
    {
      q: "Will members see Fora's branding?",
      a: "No. They sign up and sign in inside your branded space. They never see Fora's name.",
    },
    {
      q: "Can I use my own domain?",
      a: "Starter includes a Fora subdomain. Pro and Enterprise include a custom domain you own.",
    },
  ],
} as const;
