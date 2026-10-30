
"use client";

import ScrollReveal from "../ScrollReveal";

const ScrollText = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505] px-6 py-28 sm:py-36">
      <div className="mx-auto flex min-h-[320px] max-w-4xl items-center justify-center text-center">

        <div className="w-full text-[clamp(1.7rem,4vw,3.25rem)] font-medium leading-[1.35] tracking-[-0.035em] text-white">
          <ScrollReveal
            highlightColor="#A3B18A"
            mode="scrub"
            splitBy="words"
            effect="fade"
            stagger={0.025}
            duration={0.65}
            smoothing={0.12}
            baseOpacity={0.18}
            baseRotation={0}
            baseOffset={0}
            enableBlur={false}
            blurStrength={4}
            wordAnimationEnd="bottom top"
          >
            A voice is more than sound. It carries identity, emotion, and intent. At Miransas, we&#39;re building the tools and infrastructure that let developers bring voice experiences into their products.
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default ScrollText;
