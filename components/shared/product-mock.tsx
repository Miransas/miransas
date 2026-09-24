'use client';

import { useEffect, useRef, useState } from 'react';

type Point = {
  x: number;
  y: number;
};

type EyeProps = {
  side: 'left' | 'right';
  offset: Point;
  blink: boolean;
  wink: boolean;
};

function RobotEye({
  side,
  offset,
  blink,
  wink,
}: EyeProps) {
  const isRight = side === 'right';
  const isWink = isRight && wink;
  const closed = blink || isWink;

  return (
    <div
      className="pointer-events-none absolute z-20"
      style={{
        top: '40.8%',
        left: isRight ? undefined : '34.6%',
        right: isRight ? '34.6%' : undefined,
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        willChange: 'transform',
      }}
    >
      {/* =========================================
          SOFT OUTER GLOW
      ========================================== */}
      <div
        className={`
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2

          w-[68px]
          h-[94px]

          rounded-full

          bg-[#72b8ff]/30
          blur-[20px]

          transition-all
          duration-100
          ease-out

          ${
            closed
              ? 'scale-y-[0.05] opacity-0'
              : 'scale-y-100 opacity-100'
          }
        `}
      />

      {/* =========================================
          SECONDARY BLUE BLOOM
      ========================================== */}
      <div
        className={`
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2

          w-[50px]
          h-[78px]

          rounded-full

          bg-[#b9ddff]/30
          blur-[12px]

          transition-all
          duration-100
          ease-out

          ${
            closed
              ? 'scale-y-[0.05] opacity-0'
              : 'scale-y-100 opacity-100'
          }
        `}
      />

      {/* =========================================
          MAIN EYE
      ========================================== */}
      <div
        className={`
          relative

          w-[30px]
          h-[58px]

          md:w-[34px]
          md:h-[64px]

          rounded-[50%]

          overflow-hidden

          transition-transform
          duration-100
          ease-out

          ${
            closed
              ? 'scale-y-[0.055] scale-x-[1.12]'
              : 'scale-y-100 scale-x-100'
          }
        `}
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 43%,
              #ffffff 0%,
              #ffffff 15%,
              #f5fbff 28%,
              #e0f1ff 42%,
              #b9dcff 57%,
              #82baff 72%,
              rgba(111,174,255,0.45) 84%,
              rgba(111,174,255,0) 100%
            )
          `,

          boxShadow: `
            0 0 7px rgba(255,255,255,0.95),
            0 0 15px rgba(194,226,255,0.95),
            0 0 28px rgba(110,180,255,0.55),
            0 0 42px rgba(80,150,255,0.22)
          `,
        }}
      >
        {/* =========================================
            SOFT INNER CORE
        ========================================== */}
        <div
          className="
            absolute
            left-1/2
            top-1/2

            -translate-x-1/2
            -translate-y-1/2

            w-[17px]
            h-[39px]

            rounded-full

            bg-white

            blur-[2.5px]

            opacity-95
          "
        />

        {/* =========================================
            HOT WHITE CENTER
        ========================================== */}
        <div
          className="
            absolute
            left-1/2
            top-1/2

            -translate-x-1/2
            -translate-y-1/2

            w-[10px]
            h-[27px]

            rounded-full

            bg-white

            blur-[2px]

            opacity-100
          "
        />

        {/* =========================================
            TOP GLASS HIGHLIGHT
        ========================================== */}
        <div
          className="
            absolute
            left-[7px]
            top-[8px]

            w-[6px]
            h-[14px]

            rounded-full

            bg-white

            blur-[2px]

            opacity-75
          "
        />

        {/* =========================================
            LOWER SOFT REFLECTION
        ========================================== */}
        <div
          className="
            absolute
            bottom-[7px]
            left-1/2

            -translate-x-1/2

            w-[11px]
            h-[12px]

            rounded-full

            bg-[#d9edff]

            blur-[5px]

            opacity-60
          "
        />
      </div>

      {/* =========================================
          TOP EYELID
      ========================================== */}
      <div
        className={`
          absolute

          -top-[8px]
          -left-[8px]
          -right-[8px]

          h-[38px]

          rounded-b-[50%]

          bg-[#050505]

          origin-top

          transition-transform
          duration-100
          ease-in-out

          ${
            closed
              ? 'scale-y-100'
              : 'scale-y-0'
          }
        `}
      />

      {/* =========================================
          BOTTOM EYELID
      ========================================== */}
      <div
        className={`
          absolute

          -bottom-[8px]
          -left-[8px]
          -right-[8px]

          h-[18px]

          rounded-t-[50%]

          bg-[#050505]

          origin-bottom

          transition-transform
          duration-100
          ease-in-out

          ${
            closed
              ? 'scale-y-100'
              : 'scale-y-0'
          }
        `}
      />
    </div>
  );
}

export default function RobotEyes() {
  const containerRef = useRef<HTMLDivElement>(null);

  const targetRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  const currentRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  const animationFrameRef =
    useRef<number | null>(null);

  const blinkTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const blinkSecondTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const winkTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const winkEndTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const [eyeOffset, setEyeOffset] =
    useState<Point>({
      x: 0,
      y: 0,
    });

  const [blink, setBlink] =
    useState(false);

  const [wink, setWink] =
    useState(false);

  /*
   * ==========================================
   * MOUSE FOLLOW
   * ==========================================
   */
  useEffect(() => {
    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const container =
        containerRef.current;

      if (!container) return;

      const rect =
        container.getBoundingClientRect();

      const centerX =
        rect.left + rect.width / 2;

      const centerY =
        rect.top + rect.height * 0.41;

      const dx =
        event.clientX - centerX;

      const dy =
        event.clientY - centerY;

      const distance = Math.min(
        Math.hypot(dx, dy),
        500
      );

      if (distance === 0) {
        targetRef.current = {
          x: 0,
          y: 0,
        };

        return;
      }

      const angle =
        Math.atan2(dy, dx);

      const strength =
        distance / 500;

      /*
       * Çok küçük hareket.
       * Robotun yüzü bozulmadan
       * mouse'u takip eder.
       */
      const maxMove = 6;

      targetRef.current = {
        x:
          Math.cos(angle) *
          strength *
          maxMove,

        y:
          Math.sin(angle) *
          strength *
          maxMove,
      };
    };

    window.addEventListener(
      'mousemove',
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);

  /*
   * ==========================================
   * SMOOTH EYE MOVEMENT
   * ==========================================
   */
  useEffect(() => {
    const animate = () => {
      const current =
        currentRef.current;

      const target =
        targetRef.current;

      current.x +=
        (target.x - current.x) * 0.12;

      current.y +=
        (target.y - current.y) * 0.12;

      setEyeOffset({
        x: current.x,
        y: current.y,
      });

      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    animationFrameRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (
        animationFrameRef.current !== null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, []);

  /*
   * ==========================================
   * RANDOM BLINK
   * ==========================================
   */
  useEffect(() => {
    const scheduleBlink = () => {
      const delay =
        2800 +
        Math.random() * 4200;

      blinkTimeoutRef.current =
        setTimeout(() => {
          setBlink(true);

          /*
           * Normal blink
           */
          setTimeout(() => {
            setBlink(false);

            /*
             * Sometimes double blink
             */
            if (Math.random() > 0.72) {
              blinkSecondTimeoutRef.current =
                setTimeout(() => {
                  setBlink(true);

                  blinkSecondTimeoutRef.current =
                    setTimeout(() => {
                      setBlink(false);
                      scheduleBlink();
                    }, 85);
                }, 110);
            } else {
              scheduleBlink();
            }
          }, 95 + Math.random() * 55);
        }, delay);
    };

    scheduleBlink();

    return () => {
      if (
        blinkTimeoutRef.current
      ) {
        clearTimeout(
          blinkTimeoutRef.current
        );
      }

      if (
        blinkSecondTimeoutRef.current
      ) {
        clearTimeout(
          blinkSecondTimeoutRef.current
        );
      }
    };
  }, []);

  /*
   * ==========================================
   * RANDOM WINK
   * ==========================================
   */
  useEffect(() => {
    const scheduleWink = () => {
      const delay =
        10000 +
        Math.random() * 14000;

      winkTimeoutRef.current =
        setTimeout(() => {
          setWink(true);

          winkEndTimeoutRef.current =
            setTimeout(() => {
              setWink(false);
              scheduleWink();
            }, 180 + Math.random() * 100);
        }, delay);
    };

    scheduleWink();

    return () => {
      if (
        winkTimeoutRef.current
      ) {
        clearTimeout(
          winkTimeoutRef.current
        );
      }

      if (
        winkEndTimeoutRef.current
      ) {
        clearTimeout(
          winkEndTimeoutRef.current
        );
      }
    };
  }, []);

  /*
   * ==========================================
   * ROBOT
   * ==========================================
   */
  return (
    <div
      ref={containerRef}
      className="
        relative

        w-[400px]
        h-[400px]

        md:w-[480px]
        md:h-[480px]

        mx-auto

        flex
        items-center
        justify-center
      "
    >
      {/* ======================================
          ROBOT BODY
      ======================================= */}
      <img
        src="https://res.cloudinary.com/dwdk20m6q/image/upload/v1790282774/Firefly_RemoveBackground_mre4pp.png"
        alt="Miransas AI Robot"
        draggable={false}
        className="
          pointer-events-none
          select-none

          w-full
          h-full

          object-contain

          drop-shadow-[0_22px_45px_rgba(0,0,0,0.14)]
        "
      />

      {/* ======================================
          LEFT EYE
      ======================================= */}
      <RobotEye
        side="left"
        offset={eyeOffset}
        blink={blink}
        wink={wink}
      />

      {/* ======================================
          RIGHT EYE
      ======================================= */}
      <RobotEye
        side="right"
        offset={eyeOffset}
        blink={blink}
        wink={wink}
      />
    </div>
  );
}