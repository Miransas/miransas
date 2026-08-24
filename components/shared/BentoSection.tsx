"use client"
import { motion } from "framer-motion";
import { ProductMock } from "./product-mock";

const items = [
  {
    tag: "Your front door",
    title: "A community homepage that sells itself.",
    body: "Customize your hero with a static color or an animated gradient. Add a headline, a description, and member avatars. Your overview is the first thing a visitor sees — make it yours.",
    aside: "First impressions that convert.",
    visual: "overview" as const,
  },
  {
    tag: "Friendly competition",
    title: "A leaderboard your members actually check.",
    body: "Rankings based on posts, completions, and activity — surfaced automatically. Gives your most engaged members a reason to stay and quieter ones a reason to show up.",
    aside: "Engagement that compounds over time.",
    visual: "board" as const,
  },
  {
    tag: "Courses",
    title: "Build your course the way you teach.",
    body: "Structure content into chapters and lessons, in any order. Add your material, hit publish, and members start learning — inside the community they already live in.",
    aside: "Courses that feel like yours, not a template.",
    visual: "course" as const,
  },
];

function Leaderboard() {
  const rows = [
    ["1", "Maya Chen", "Coach", "2,840"],
    ["2", "Jordan Hale", "Member", "2,410"],
    ["3", "Priya Shah", "Member", "1,980"],
    ["4", "Chris Adeyemi", "Member", "1,640"],
  ];
  return (
    <div className="relative h-full min-h-[280px] overflow-hidden rounded-[20px]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 10%, #2a3338 0%, #8b5a52 100%)",
        }}
      />
      <div className="relative m-5 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md">
        <div className="mb-3 flex gap-2 text-[11px] text-white/55">
          {["7 days", "30 days", "All time"].map((label, i) => (
            <span
              key={label}
              className={`rounded-full px-2 py-0.5 ${i === 2 ? "bg-white/15 text-white" : ""}`}
            >
              {label}
            </span>
          ))}
        </div>
        {rows.map((row) => (
          <div
            key={row[1]}
            className="flex items-center justify-between border-t border-white/8 py-2 text-[13px]"
          >
            <span className="w-6 text-white/40">{row[0]}</span>
            <span className="flex-1 text-[#fff3f0]">{row[1]}</span>
            <span className="text-white/40">{row[2]}</span>
            <span className="w-12 text-right text-[#c9f8fa]">{row[3]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Bento() {
  return (
    <section id="what-you-get" className="bg-black px-6 pb-28">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">What you get</p>
        <h2 className="mt-5 max-w-2xl text-3xl tracking-[-0.04em] text-[#fff3f0] md:text-5xl">
          Set it up once. Run it your way.
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/60">
          Fora is built so you spend time with your community, not configuring
          it. From your first setting to your hundredth member, the platform
          stays out of the way.
        </p>

        <div className="mt-14 space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="grid overflow-hidden rounded-[28px] border border-white/8 bg-[#0d0d0d] md:grid-cols-2"
            >
              <div
                className={`p-8 md:p-12 ${index === 1 ? "md:order-2" : ""}`}
              >
                <p className="eyebrow">{item.tag}</p>
                <h3 className="mt-4 text-2xl tracking-tight text-[#fff3f0] md:text-[32px] md:leading-10">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/60">{item.body}</p>
                <p className="mt-8 text-sm text-white/40">{item.aside}</p>
              </div>
              <div className="min-h-[280px] p-4 md:p-6">
                {item.visual === "board" ? (
                  <Leaderboard />
                ) : item.visual === "overview" ? (
                  <div className="h-full overflow-hidden rounded-[20px] border border-white/10">
                    <ProductMock compact />
                  </div>
                ) : (
                  <div className="flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-[20px] border border-white/10 bg-[#141414] p-6">
                    <p className="text-xs text-white/40">Chapter 03</p>
                    <p className="mt-2 text-lg text-[#fff3f0]">
                      Progressive overload fundamentals
                    </p>
                    <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-2/3 bg-[#17c9b6]" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}