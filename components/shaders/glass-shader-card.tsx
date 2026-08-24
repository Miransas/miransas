import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec3 u_a;
uniform vec3 u_b;
uniform vec3 u_c;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = (uv * 2.0 - 1.0);
  p.x *= u_res.x / max(u_res.y, 1.0);
  float t = u_time * 0.08;
  float n = fbm(p * 1.6 + vec2(t, -t * 0.6));
  float n2 = fbm(p * 3.2 - vec2(t * 0.7, t * 0.4));
  float caustic = smoothstep(0.28, 0.78, n * 0.55 + n2 * 0.45);
  vec3 col = mix(u_a, u_b, n);
  col = mix(col, u_c, caustic * 0.62);
  float vig = 1.0 - dot(p * 0.42, p * 0.42);
  col *= 0.42 + 0.58 * vig;
  gl_FragColor = vec4(col, 1.0);
}
`;

export type ShaderTone = "navy" | "coral" | "cream";

const TONES: Record<ShaderTone, { a: number[]; b: number[]; c: number[] }> = {
  navy: {
    a: [0.027, 0.102, 0.18],
    b: [0.071, 0.188, 0.278],
    c: [0.957, 0.635, 0.478],
  },
  coral: {
    a: [0.12, 0.04, 0.03],
    b: [0.89, 0.416, 0.243],
    c: [1.0, 0.953, 0.941],
  },
  cream: {
    a: [0.039, 0.039, 0.039],
    b: [0.18, 0.145, 0.1],
    c: [0.957, 0.635, 0.478],
  },
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function GlassShaderCard({
  tone,
  kicker,
  title,
  body,
  className,
}: {
  tone: ShaderTone;
  kicker: string;
  title: string;
  body: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uA = gl.getUniformLocation(prog, "u_a");
    const uB = gl.getUniformLocation(prog, "u_b");
    const uC = gl.getUniformLocation(prog, "u_c");
    const toneVals = TONES[tone];
    gl.uniform3fv(uA, toneVals.a);
    gl.uniform3fv(uB, toneVals.b);
    gl.uniform3fv(uC, toneVals.c);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const W = Math.max(1, Math.floor(w * dpr));
      const H = Math.max(1, Math.floor(h * dpr));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
        gl.viewport(0, 0, W, H);
      }
      gl.uniform2f(uRes, W, H);
    };

    const draw = (now: number) => {
      resize();
      gl.uniform1f(uTime, reduce ? 1.8 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(performance.now());

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduce) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "80px" },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [tone]);

  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[280px] flex-col overflow-hidden rounded-[22px] p-6 md:min-h-[300px] md:p-7",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-void/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,243,240,0.16)_0%,rgba(255,243,240,0.02)_42%,rgba(10,10,10,0.18)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[22px] shadow-[inset_0_1px_0_0_rgba(255,243,240,0.32),inset_0_0_0_1px_rgba(255,243,240,0.14)]"
      />
      <div className="relative z-10 flex h-full flex-col rounded-[14px] border border-cream/12 bg-cream/[0.07] p-5 backdrop-blur-2xl md:p-6">
        <p className="font-mono text-[11px] tracking-wide text-coral-2">
          {kicker}
        </p>
        <h3 className="mt-4 font-display text-xl tracking-[-0.03em] text-cream md:text-2xl">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-cream/70">
          {body}
        </p>
      </div>
    </article>
  );
}