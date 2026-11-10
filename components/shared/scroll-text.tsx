'use client';

import ScrollReveal from '../ScrollReveal';

const ScrollText = () => {
  return (
    <section className="bg-background relative w-full overflow-hidden px-6 py-28 sm:py-36">
      <div className="mx-auto flex min-h-[320px] max-w-4xl items-center justify-center text-center">
        <div className="text-foreground w-full text-[clamp(1.7rem,4vw,3.25rem)] leading-[1.35] font-medium tracking-[-0.035em]">
          <ScrollReveal highlightColor="var(--foreground)" mode="scrub" splitBy="words" effect="fade" stagger={0.025} duration={0.65} smoothing={0.12} baseOpacity={0.55} baseRotation={0} baseOffset={0} enableBlur={false} blurStrength={4} wordAnimationEnd="bottom center">
            A voice is more than sound. It carries identity, emotion, and intent. At Miransas, we&#39;re building the tools and infrastructure that let developers bring voice experiences into their products.
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ScrollText;
