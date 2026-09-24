"use client";

import {
  ArrowUpRight,
  Check,
  Clock3,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "success";

export default function ContactPage() {
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setStatus("sending");

    /*
     * Burada daha sonra gerçek API endpoint'ine
     * bağlayabilirsin.
     */
    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    setStatus("success");
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#020203] text-white"
    >
      {/* =====================================================
          ATMOSPHERE
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* rose */}

        <div
          className="absolute left-[-120px] top-[15%] h-[420px] w-[420px] rounded-full bg-rose-400/[0.045] blur-[140px]"
        />

        {/* purple */}

        <div
          className="absolute right-[-150px] top-[12%] h-[500px] w-[500px] rounded-full bg-purple-400/[0.05] blur-[150px]"
        />

        {/* lime */}

        <div
          className="absolute left-1/2 bottom-[-180px] h-[400px] w-[620px] -translate-x-1/2 rounded-full bg-lime-300/[0.018] blur-[150px]"
        />

        {/* dark vignette */}

        <div
          className="absolute inset-0 bg-[radial-gradient( circle_at_center, transparent_0%, rgba(0,0,0,0.08)_45%, rgba(0,0,0,0.5)_100% )]"
        />
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="relative z-10">
        <div
          className="mx-auto max-w-7xl px-6 pb-24 pt-28 sm:pb-32 sm:pt-36 lg:px-8 lg:pt-40"
        >
          <div
            className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
          >
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.75,
                ease: "easeOut",
              }}
              className="lg:sticky lg:top-32"
            >
              {/* eyebrow */}

              <div
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/45 backdrop-blur-xl"
              >
                <Sparkles size={11} />
                Let's talk
              </div>

              {/* heading */}

              <h1
                className="mt-7 max-w-xl text-[44px] leading-[0.98] tracking-[-0.055em] text-[#fff3f0] sm:text-[54px] md:text-[64px] lg:text-[70px]"
              >
                Let's build
                <br />
                something
                <span className="text-white/45">
                  {" "}
                  intelligent.
                </span>
              </h1>

              {/* body */}

              <p
                className="mt-7 max-w-lg text-[15px] leading-7 text-white/50 sm:text-base"
              >
                Tell us what you're building, what you
                need, and where you want to take it.
                Whether you're exploring an idea or
                already shipping, we'd love to hear
                about it.
              </p>

              {/* availability */}

              <div
                className="mt-10 max-w-md rounded-[24px] border border-white/[0.08] bg-white/[0.018] p-5 backdrop-blur-xl"
              >
                <div
                  className="flex items-start justify-between gap-6"
                >
                  <div>
                    <span
                      className="text-[9px] uppercase tracking-[0.22em] text-white/25"
                    >
                      Miransas
                    </span>

                    <h2
                      className="mt-2 text-sm font-medium text-white/80"
                    >
                      Available for new projects
                    </h2>
                  </div>

                  <div
                    className="flex items-center gap-2 rounded-full border border-lime-300/10 bg-lime-300/[0.04] px-2.5 py-1"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_10px_rgba(181,255,54,.8)]"
                    />

                    <span
                      className="text-[10px] text-white/45"
                    >
                      Online
                    </span>
                  </div>
                </div>

                <div
                  className="mt-5 grid grid-cols-2 gap-3"
                >
                  <div
                    className="rounded-2xl border border-white/[0.07] bg-black/[0.18] p-3"
                  >
                    <Clock3
                      size={14}
                      className="text-white/30"
                    />

                    <p
                      className="mt-3 text-[9px] uppercase tracking-[0.16em] text-white/25"
                    >
                      Response
                    </p>

                    <p
                      className="mt-1 text-xs text-white/65"
                    >
                      Within 1 day
                    </p>
                  </div>

                  <div
                    className="rounded-2xl border border-white/[0.07] bg-black/[0.18] p-3"
                  >
                    <MessageCircle
                      size={14}
                      className="text-white/30"
                    />

                    <p
                      className="mt-3 text-[9px] uppercase tracking-[0.16em] text-white/25"
                    >
                      Projects
                    </p>

                    <p
                      className="mt-1 text-xs text-white/65"
                    >
                      AI & automation
                    </p>
                  </div>
                </div>
              </div>

              {/* direct contact */}

              <a
                href="mailto:hello@miransas.com"
                className="mt-6 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/80"
              >
                <Mail size={15} />

                hello@miransas.com

                <ArrowUpRight size={14} />
              </a>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.12,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="relative"
            >
              {/* ambient glow */}

              <div
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-purple-400/[0.07] blur-[90px]"
              />

              <div
                className="relative overflow-hidden rounded-[32px] border border-white/[0.10] bg-[#080809]/65 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
              >
                {/* top line */}

                <div
                  className="flex items-center justify-between border-b border-white/[0.07] pb-5"
                >
                  <div>
                    <p
                      className="text-[9px] uppercase tracking-[0.22em] text-white/25"
                    >
                      Contact form
                    </p>

                    <p
                      className="mt-1 text-sm text-white/70"
                    >
                      Start a conversation
                    </p>
                  </div>

                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]"
                  >
                    <Send
                      size={15}
                      className="text-rose-500"
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {status !== "success" ? (
                    <motion.form
                      key="form"
                      initial={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                      }}
                      onSubmit={handleSubmit}
                      className="mt-7 space-y-5"
                    >
                      {/* name */}

                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-white/30"
                        >
                          Name
                        </label>

                        <div
                          className="flex items-center gap-3 rounded-2xl border border-white/[0.09] bg-black/[0.20] px-4 transition focus-within:border-white/[0.18]"
                        >
                          <User
                            size={15}
                            className="text-white/25"
                          />

                          <input
                            id="name"
                            name="name"
                            required
                            type="text"
                            placeholder="Your name"
                            className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      {/* email */}

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-white/30"
                        >
                          Email
                        </label>

                        <div
                          className="flex items-center gap-3 rounded-2xl border border-white/[0.09] bg-black/[0.20] px-4 transition focus-within:border-white/[0.18]"
                        >
                          <Mail
                            size={15}
                            className="text-white/25"
                          />

                          <input
                            id="email"
                            name="email"
                            required
                            type="email"
                            placeholder="you@company.com"
                            className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/20 border-none"
                          />
                        </div>
                      </div>

                      {/* company */}

                      <div>
                        <label
                          htmlFor="company"
                          className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-white/30"
                        >
                          Company
                        </label>

                        <input
                          id="company"
                          name="company"
                          type="text"
                          placeholder="Company name"
                          className="w-full rounded-2xl border border-white/[0.09] bg-black/[0.20] px-4 py-4 text-sm text-white outline-none transition focus:border-white/[0.18] placeholder:text-white/20"
                        />
                      </div>

                      {/* message */}

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-white/30"
                        >
                          Project
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          required
                          value={message}
                          onChange={(event) =>
                            setMessage(event.target.value)
                          }
                          rows={6}
                          placeholder="Tell us a little about what you're building..."
                          className="w-full resize-none rounded-2xl border border-white/[0.09] bg-black/[0.20] px-4 py-4 text-sm leading-6 text-white outline-none transition focus:border-white/[0.18] placeholder:text-white/20"
                        />

                        <div className="mt-2 flex justify-end">
                          <span
                            className="text-[9px] text-white/20"
                          >
                            {message.length} / 1000
                          </span>
                        </div>
                      </div>

                      {/* submit */}

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/20 bg-[#EFEFEF] px-5 py-4 text-sm font-medium text-[#080808] transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <span className="relative z-10">
                          {status === "sending"
                            ? "Sending..."
                            : "Send message"}
                        </span>

                        {status === "sending" ? (
                          <motion.span
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="relative z-10"
                          >
                            <Sparkles size={15} />
                          </motion.span>
                        ) : (
                          <ArrowUpRight
                            size={16}
                            className="relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.45,
                      }}
                      className="flex min-h-[520px] flex-col items-center justify-center text-center"
                    >
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-full border border-lime-300/10 bg-lime-300/[0.06] text-lime-200 shadow-[0_0_35px_rgba(181,255,54,0.08)]"
                      >
                        <Check size={27} />
                      </div>

                      <h3
                        className="mt-7 text-2xl font-medium tracking-[-0.035em] text-white/90"
                      >
                        Message received.
                      </h3>

                      <p
                        className="mt-3 max-w-sm text-sm leading-7 text-white/40"
                      >
                        Thanks for reaching out.
                        We'll get back to you as soon
                        as possible.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setStatus("idle");
                          setMessage("");
                        }}
                        className="mt-7 text-xs text-white/40 underline underline-offset-4 transition hover:text-white/70"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <section className="relative z-10 border-t border-white/[0.06]">
        <div
          className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between lg:px-8"
        >
          <span>
            Miransas 
          </span>

          <span>
            Built for people building what's next.
          </span>
        </div>
      </section>
    </main>
  );
}