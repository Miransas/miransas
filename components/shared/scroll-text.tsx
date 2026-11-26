'use client';

import ScrollReveal from '../ScrollReveal';

const ScrollText = () => {
  return (
    <section className="surface-page relative w-full overflow-hidden px-6 py-24 sm:py-32">
      <div className="mx-auto flex min-h-[320px] max-w-4xl items-center justify-center text-center">
        <div className="text-heading w-full text-2xl leading-[1.3] font-semibold tracking-[-0.025em] sm:text-4xl lg:text-5xl">
          <ScrollReveal
            mode="enter"
            splitBy="lines"
            effect="fade"
            stagger={0.025}
            duration={0.65}
            baseOpacity={0.7}
            baseRotation={0}
            baseOffset={0}
            enableBlur={false}
          >
            A voice is more than sound. It carries identity, emotion, and intent. At Miransas, we&#39;re building the tools and infrastructure that let developers bring voice experiences into their products.
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ScrollText;
