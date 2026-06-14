/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useEffect, useRef } from "react";
import * as THREE from 'three';
import { motion } from "framer-motion";
import {
  FileCode, FileText, CheckCircle2,
  Terminal, Database,
  ArrowRight
} from "lucide-react";

// ============================================================================
// 1. NEON BUTTON (Renk Döngüsüne Bağlı)
// ============================================================================
const NeonButton = ({ children }: { children: React.ReactNode }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="group relative flex items-center gap-2 rounded-full cycle-bg px-6 py-3 text-sm font-bold text-white transition-shadow"
  >
    {children}
    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  </motion.button>
);

// ============================================================================
// 2. KOD EDİTÖRÜ MOCKUP
// ============================================================================
const CodeMockup = () => {
  const lines = [
    { num: 1, content: "use miransas::core::{Reactor, Tunnel};", color: "text-purple-400" },
    { num: 2, content: "use binboi::agent::Config;", color: "text-sky-400" },
    { num: 3, content: "// Initialize high-performance node", color: "text-slate-500" },
    { num: 4, content: "let config = Config::new(\".env\");", color: "text-amber-400" },
    { num: 5, content: "pub async fn start_core() -> Result<()> {", color: "text-purple-400" },
    { num: 6, content: "    let mut reactor = Reactor::init(config);", color: "text-blue-300" },
    { num: 7, content: "    reactor.ignite().await", color: "cycle-text" }, // Bu satır parlayacak
    { num: 8, content: "}", color: "text-purple-400" },
  ];

  return (
    <div className="relative h-full w-full rounded-2xl border border-white/10 bg-black/60 p-6 font-mono text-[13px] leading-relaxed backdrop-blur-xl shadow-2xl">
      {/* Editör İç Parlaması (Renk Döngülü) */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full cycle-bg blur-[80px] opacity-20 pointer-events-none" />

      {lines.map((line) => (
        <div key={line.num} className="flex gap-4">
          <span className="w-4 text-slate-700">{line.num}</span>
          <span className={line.color}>{line.content}</span>
        </div>
      ))}

      {/* Cursor Animasyonu */}
      <motion.div
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-[54px] mt-1 h-4 w-1.5 cycle-bg"
      />
    </div>
  );
};

// ============================================================================
// CONFIGURATION & THEME
// ============================================================================
const ROSE = "#f43f5e";
const LIME = "#9eff00";
const BELT_SPEED = 1.5;
const CORE_PULSE_DURATION = BELT_SPEED * 2;
const FILES = [
  { label: "INDEX.TSX", color: "text-sky-400", icon: FileCode },
  { label: "AUTH.RS", color: "text-rose-400", icon: FileText },
  { label: "CONFIG.ENV", color: "text-amber-400", icon: Terminal },
  { label: "DATA.DB", color: "text-purple-400", icon: Database },
];

// ============================================================================
// 3. LASER FLOW BACKGROUND (WebGL / Shader Güncellendi: Renk Döngüsü)
// ============================================================================
type LaserFlowProps = {
  className?: string;
  style?: React.CSSProperties;
  wispDensity?: number;
  dpr?: number;
  mouseSmoothTime?: number;
  mouseTiltStrength?: number;
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  flowSpeed?: number;
  verticalSizing?: number;
  horizontalSizing?: number;
  fogIntensity?: number;
  fogScale?: number;
  wispSpeed?: number;
  wispIntensity?: number;
  flowStrength?: number;
  decay?: number;
  falloffStart?: number;
  fogFallSpeed?: number;
};

const VERT = `
precision highp float;
attribute vec3 position;
void main(){
  gl_Position = vec4(position, 1.0);
}
`;

const FRAG = `
#ifdef GL_ES
#extension GL_OES_standard_derivatives : enable
#endif
precision highp float;
precision mediump int;

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform float uWispDensity;
uniform float uTiltScale;
uniform float uFlowTime;
uniform float uFogTime;
uniform float uBeamXFrac;
uniform float uBeamYFrac;
uniform float uFlowSpeed;
uniform float uVLenFactor;
uniform float uHLenFactor;
uniform float uFogIntensity;
uniform float uFogScale;
uniform float uWSpeed;
uniform float uWIntensity;
uniform float uFlowStrength;
uniform float uDecay;
uniform float uFalloffStart;
uniform float uFogFallSpeed;
uniform float uFade;

#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define EPS 1e-6
#define EDGE_SOFT (DT_LOCAL*4.0)
#define DT_LOCAL 0.0038
#define TAP_RADIUS 6
#define R_H 150.0
#define R_V 150.0
#define FLARE_HEIGHT 16.0
#define FLARE_AMOUNT 8.0
#define FLARE_EXP 2.0
#define TOP_FADE_START 0.1
#define TOP_FADE_EXP 1.0
#define FLOW_PERIOD 0.5
#define FLOW_SHARPNESS 1.5

#define W_BASE_X 1.5
#define W_LAYER_GAP 0.25
#define W_LANES 10
#define W_SIDE_DECAY 0.5
#define W_HALF 0.01
#define W_AA 0.15
#define W_CELL 20.0
#define W_SEG_MIN 0.01
#define W_SEG_MAX 0.55
#define W_CURVE_AMOUNT 15.0
#define W_CURVE_RANGE (FLARE_HEIGHT - 3.0)
#define W_BOTTOM_EXP 10.0

#define FOG_ON 1
#define FOG_CONTRAST 1.2
#define FOG_OCTAVES 5
#define FOG_BOTTOM_BIAS 0.8
#define FOG_TILT_TO_MOUSE 0.05
#define FOG_TILT_MAX_X 0.35
#define FOG_TILT_SHAPE 1.5
#define FOG_BEAM_MIN 0.0
#define FOG_BEAM_MAX 0.75
#define FOG_MASK_GAMMA 0.5
#define FOG_EXPAND_SHAPE 12.2
#define FOG_EDGE_MIX 0.5

#define HFOG_EDGE_START 0.20
#define HFOG_EDGE_END 0.98
#define HFOG_EDGE_GAMMA 1.4
#define HFOG_Y_RADIUS 25.0
#define HFOG_Y_SOFT 60.0

#define EDGE_X0 0.22
#define EDGE_X1 0.995
#define EDGE_X_GAMMA 1.25
#define EDGE_LUMA_T0 0.0
#define EDGE_LUMA_T1 2.0
#define DITHER_STRENGTH 1.0

float g(float x){return x<=0.00031308?12.92*x:1.055*pow(x,1.0/2.4)-0.055;}
float bs(vec2 p,vec2 q,float powr){
    float d=distance(p,q),f=powr*uFalloffStart,r=(f*f)/(d*d+EPS);
    return powr*min(1.0,r);
}
float bsa(vec2 p,vec2 q,float powr,vec2 s){
    vec2 d=p-q; float dd=(d.x*d.x)/(s.x*s.x)+(d.y*d.y)/(s.y*s.y),f=powr*uFalloffStart,r=(f*f)/(dd+EPS);
    return powr*min(1.0,r);
}
float tri01(float x){float f=fract(x);return 1.0-abs(f*2.0-1.0);}
float tauWf(float t,float tmin,float tmax){float a=smoothstep(tmin,tmin+EDGE_SOFT,t),b=1.0-smoothstep(tmax-EDGE_SOFT,tmax,t);return max(0.0,a*b);} 
float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+34.123);return fract(p.x*p.y);}
float vnoise(vec2 p){
    vec2 i=floor(p),f=fract(p);
    float a=h21(i),b=h21(i+vec2(1,0)),c=h21(i+vec2(0,1)),d=h21(i+vec2(1,1));
    vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm2(vec2 p){
    float v=0.0,amp=0.6; mat2 m=mat2(0.86,0.5,-0.5,0.86);
    for(int i=0;i<FOG_OCTAVES;++i){v+=amp*vnoise(p); p=m*p*2.03+17.1; amp*=0.52;}
    return v;
}
float rGate(float x,float l){float a=smoothstep(0.0,W_AA,x),b=1.0-smoothstep(l,l+W_AA,x);return max(0.0,a*b);}
float flareY(float y){float t=clamp(1.0-(clamp(y,0.0,FLARE_HEIGHT)/max(FLARE_HEIGHT,EPS)),0.0,1.0);return pow(t,FLARE_EXP);}

float vWisps(vec2 uv,float topF){
    float y=uv.y,yf=(y+uFlowTime*uWSpeed)/W_CELL;
    float dRaw=clamp(uWispDensity,0.0,2.0),d=dRaw<=0.0?1.0:dRaw;
    float lanesF=floor(float(W_LANES)*min(d,1.0)+0.5); 
    int lanes=int(max(1.0,lanesF));
    float sp=min(d,1.0),ep=max(d-1.0,0.0);
    float fm=flareY(max(y,0.0)),rm=clamp(1.0-(y/max(W_CURVE_RANGE,EPS)),0.0,1.0),cm=fm*rm;
    const float G=0.05; float xS=1.0+(FLARE_AMOUNT*W_CURVE_AMOUNT*G)*cm;
    float sPix=clamp(y/R_V,0.0,1.0),bGain=pow(1.0-sPix,W_BOTTOM_EXP),sum=0.0;
    for(int s=0;s<2;++s){
        float sgn=s==0?-1.0:1.0;
        for(int i=0;i<W_LANES;++i){
            if(i>=lanes) break;
            float off=W_BASE_X+float(i)*W_LAYER_GAP,xc=sgn*(off*xS);
            float dx=abs(uv.x-xc),lat=1.0-smoothstep(W_HALF,W_HALF+W_AA,dx),amp=exp(-off*W_SIDE_DECAY);
            float seed=h21(vec2(off,sgn*17.0)),yf2=yf+seed*7.0,ci=floor(yf2),fy=fract(yf2);
            float seg=mix(W_SEG_MIN,W_SEG_MAX,h21(vec2(ci,off*2.3)));
            float spR=h21(vec2(ci,off+sgn*31.0)),seg1=rGate(fy,seg)*step(spR,sp);
            if(ep>0.0){float spR2=h21(vec2(ci*3.1+7.0,off*5.3+sgn*13.0)); float f2=fract(fy+0.5); seg1+=rGate(f2,seg*0.9)*step(spR2,ep);}
            sum+=amp*lat*seg1;
        }
    }
    float span=smoothstep(-3.0,0.0,y)*(1.0-smoothstep(R_V-6.0,R_V,y));
    return uWIntensity*sum*topF*bGain*span;
}

void mainImage(out vec4 fc,in vec2 frag){
    vec2 C=iResolution.xy*.5; float invW=1.0/max(C.x,1.0);
    vec2 sc=(512.0/iResolution.xy)*.4;
    vec2 uv=(frag-C)*sc,off=vec2(uBeamXFrac*iResolution.x*sc.x,uBeamYFrac*iResolution.y*sc.y);
    vec2 uvc = uv - off;
    float a=0.0,b=0.0;
    float basePhase=1.5*PI+uDecay*.5; float tauMin=basePhase-uDecay; float tauMax=basePhase;
    float cx=clamp(uvc.x/(R_H*uHLenFactor),-1.0,1.0),tH=clamp(TWO_PI-acos(cx),tauMin,tauMax);
    for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){
        float tu=tH+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;
        float spd=max(abs(sin(tu)),0.02),u=clamp((basePhase-tu)/max(uDecay,EPS),0.0,1.0),env=pow(1.0-abs(u*2.0-1.0),0.8);
        vec2 p=vec2((R_H*uHLenFactor)*cos(tu),0.0);
        a+=wt*bs(uvc,p,env*spd);
    }
    float yPix=uvc.y,cy=clamp(-yPix/(R_V*uVLenFactor),-1.0,1.0),tV=clamp(TWO_PI-acos(cy),tauMin,tauMax);
    for(int k=-TAP_RADIUS;k<=TAP_RADIUS;++k){
        float tu=tV+float(k)*DT_LOCAL,wt=tauWf(tu,tauMin,tauMax); if(wt<=0.0) continue;
        float yb=(-R_V)*cos(tu),s=clamp(yb/R_V,0.0,1.0),spd=max(abs(sin(tu)),0.02);
        float env=pow(1.0-s,0.6)*spd;
        float cap=1.0-smoothstep(TOP_FADE_START,1.0,s); cap=pow(cap,TOP_FADE_EXP); env*=cap;
        float ph=s/max(FLOW_PERIOD,EPS)+uFlowTime*uFlowSpeed;
        float fl=pow(tri01(ph),FLOW_SHARPNESS);
        env*=mix(1.0-uFlowStrength,1.0,fl);
        float yp=(-R_V*uVLenFactor)*cos(tu),m=pow(smoothstep(FLARE_HEIGHT,0.0,yp),FLARE_EXP),wx=1.0+FLARE_AMOUNT*m;
        vec2 sig=vec2(wx,1.0),p=vec2(0.0,yp);
        float mask=step(0.0,yp);
        b+=wt*bsa(uvc,p,mask*env,sig);
    }
    float sPix=clamp(yPix/R_V,0.0,1.0),topA=pow(1.0-smoothstep(TOP_FADE_START,1.0,sPix),TOP_FADE_EXP);
    float L=a+b*topA;
    float w=vWisps(vec2(uvc.x,yPix),topA);
    float fog=0.0;
#if FOG_ON
    vec2 fuv=uvc*uFogScale;
    float mAct=step(1.0,length(iMouse.xy)),nx=((iMouse.x-C.x)*invW)*mAct;
    float ax = abs(nx);
    float stMag = mix(ax, pow(ax, FOG_TILT_SHAPE), 0.35);
    float st = sign(nx) * stMag * uTiltScale;
    st = clamp(st, -FOG_TILT_MAX_X, FOG_TILT_MAX_X);
    vec2 dir=normalize(vec2(st,1.0));
    fuv+=uFogTime*uFogFallSpeed*dir;
    vec2 prp=vec2(-dir.y,dir.x);
    fuv+=prp*(0.08*sin(dot(uvc,prp)*0.08+uFogTime*0.9));
    float n=fbm2(fuv+vec2(fbm2(fuv+vec2(7.3,2.1)),fbm2(fuv+vec2(-3.7,5.9)))*0.6);
    n=pow(clamp(n,0.0,1.0),FOG_CONTRAST);
    float pixW = 1.0 / max(iResolution.y, 1.0);
#ifdef GL_OES_standard_derivatives
    float wL = max(fwidth(L), pixW);
#else
    float wL = pixW;
#endif
    float m0=pow(smoothstep(FOG_BEAM_MIN - wL, FOG_BEAM_MAX + wL, L),FOG_MASK_GAMMA);
    float bm=1.0-pow(1.0-m0,FOG_EXPAND_SHAPE); bm=mix(bm*m0,bm,FOG_EDGE_MIX);
    float yP=1.0-smoothstep(HFOG_Y_RADIUS,HFOG_Y_RADIUS+HFOG_Y_SOFT,abs(yPix));
    float nxF=abs((frag.x-C.x)*invW),hE=1.0-smoothstep(HFOG_EDGE_START,HFOG_EDGE_END,nxF); hE=pow(clamp(hE,0.0,1.0),HFOG_EDGE_GAMMA);
    float hW=mix(1.0,hE,clamp(yP,0.0,1.0));
    float bBias=mix(1.0,1.0-sPix,FOG_BOTTOM_BIAS);
    float browserFogIntensity = uFogIntensity;
    browserFogIntensity *= 1.8;
    float radialFade = 1.0 - smoothstep(0.0, 0.7, length(uvc) / 120.0);
    float safariFog = n * browserFogIntensity * bBias * bm * hW * radialFade;
    fog = safariFog;
#endif
    float LF=L+fog;
    float dith=(h21(frag)-0.5)*(DITHER_STRENGTH/255.0);
    float tone=g(LF+w);
    
    // ======================================================
    // RENK DÖNGÜSÜ (ROSE -> LIME -> CYAN -> ROSE)
    // CSS Keyframe'deki 6 saniyelik döngüye donanımsal olarak senkron!
    // ======================================================
    float cycleT = iTime * 0.5; // Hız ayarı
    float phase = mod(cycleT, 3.0);
    vec3 c1 = vec3(0.957, 0.247, 0.369); // Rose #f43f5e
    vec3 c2 = vec3(0.620, 1.000, 0.000); // Lime #9eff00
    vec3 c3 = vec3(0.024, 0.714, 0.831); // Cyan #06b6d4
    vec3 uC;
    
    if(phase < 1.0) uC = mix(c1, c2, smoothstep(0.0, 1.0, phase));
    else if(phase < 2.0) uC = mix(c2, c3, smoothstep(0.0, 1.0, phase - 1.0));
    else uC = mix(c3, c1, smoothstep(0.0, 1.0, phase - 2.0));

    vec3 col=tone*uC+dith;
    
    float alpha=clamp(g(L+w*0.6)+dith*0.6,0.0,1.0);
    float nxE=abs((frag.x-C.x)*invW),xF=pow(clamp(1.0-smoothstep(EDGE_X0,EDGE_X1,nxE),0.0,1.0),EDGE_X_GAMMA);
    float scene=LF+max(0.0,w)*0.5,hi=smoothstep(EDGE_LUMA_T0,EDGE_LUMA_T1,scene);
    float eM=mix(xF,1.0,hi);
    col*=eM; alpha*=eM;
    col*=uFade; alpha*=uFade;
    fc=vec4(col,alpha);
}

void main(){
  vec4 fc;
  mainImage(fc, gl_FragCoord.xy);
  gl_FragColor = fc;
}
`;

const LaserFlow: React.FC<LaserFlowProps> = ({
  className,
  style,
  wispDensity = 1,
  dpr,
  mouseSmoothTime = 0.0,
  mouseTiltStrength = 0.01,
  horizontalBeamOffset = 0.1,
  verticalBeamOffset = 0.0,
  flowSpeed = 0.35,
  verticalSizing = 2.0,
  horizontalSizing = 0.5,
  fogIntensity = 0.45,
  fogScale = 0.3,
  wispSpeed = 15.0,
  wispIntensity = 5.0,
  flowStrength = 0.25,
  decay = 1.1,
  falloffStart = 1.2,
  fogFallSpeed = 0.6
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const uniformsRef = useRef<any>(null);
  const hasFadedRef = useRef(false);
  const rectRef = useRef<DOMRect | null>(null);
  const baseDprRef = useRef<number>(1);
  const currentDprRef = useRef<number>(1);
  const lastSizeRef = useRef({ width: 0, height: 0, dpr: 0 });
  const fpsSamplesRef = useRef<number[]>([]);
  const lastFpsCheckRef = useRef<number>(typeof performance !== 'undefined' ? performance.now() : 0);
  const emaDtRef = useRef<number>(16.7);
  const pausedRef = useRef<boolean>(false);
  const inViewRef = useRef<boolean>(true);

  const mouseSmoothTimeRef = useRef(mouseSmoothTime);
  useEffect(() => { mouseSmoothTimeRef.current = mouseSmoothTime; }, [mouseSmoothTime]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mount = mountRef.current!;
    const renderer = new THREE.WebGLRenderer({
      antialias: false, alpha: false, depth: false, stencil: false,
      powerPreference: 'high-performance', premultipliedAlpha: false,
      preserveDrawingBuffer: false, failIfMajorPerformanceCaveat: false, logarithmicDepthBuffer: false
    });
    rendererRef.current = renderer;

    baseDprRef.current = Math.min(dpr ?? (window.devicePixelRatio || 1), 2);
    currentDprRef.current = baseDprRef.current;

    renderer.setPixelRatio(currentDprRef.current);
    renderer.shadowMap.enabled = false;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 1);
    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(1, 1, 1) },
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
      uWispDensity: { value: wispDensity },
      uTiltScale: { value: mouseTiltStrength },
      uFlowTime: { value: 0 },
      uFogTime: { value: 0 },
      uBeamXFrac: { value: horizontalBeamOffset },
      uBeamYFrac: { value: verticalBeamOffset },
      uFlowSpeed: { value: flowSpeed },
      uVLenFactor: { value: verticalSizing },
      uHLenFactor: { value: horizontalSizing },
      uFogIntensity: { value: fogIntensity },
      uFogScale: { value: fogScale },
      uWSpeed: { value: wispSpeed },
      uWIntensity: { value: wispIntensity },
      uFlowStrength: { value: flowStrength },
      uDecay: { value: decay },
      uFalloffStart: { value: falloffStart },
      uFogFallSpeed: { value: fogFallSpeed },
      uFade: { value: hasFadedRef.current ? 1 : 0 }
    };
    uniformsRef.current = uniforms;

    const material = new THREE.RawShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms,
      transparent: false, depthTest: false, depthWrite: false, blending: THREE.NormalBlending
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const clock = new THREE.Clock();
    let prevTime = 0;
    let fade = hasFadedRef.current ? 1 : 0;

    const mouseTarget = new THREE.Vector2(0, 0);
    const mouseSmooth = new THREE.Vector2(0, 0);

    const setSizeNow = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      const pr = currentDprRef.current;
      const last = lastSizeRef.current;
      if (Math.abs(w - last.width) < 0.5 && Math.abs(h - last.height) < 0.5 && Math.abs(pr - last.dpr) < 0.01) return;

      lastSizeRef.current = { width: w, height: h, dpr: pr };
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h, false);
      uniforms.iResolution.value.set(w * pr, h * pr, pr);
      rectRef.current = canvas.getBoundingClientRect();
      if (!pausedRef.current) renderer.render(scene, camera);
    };

    let resizeRaf = 0;
    const scheduleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(setSizeNow);
    };

    setSizeNow();
    const ro = new ResizeObserver(scheduleResize);
    ro.observe(mount);

    const io = new IntersectionObserver(entries => { inViewRef.current = entries[0]?.isIntersecting ?? true; }, { root: null, threshold: 0 });
    io.observe(mount);

    const onVis = () => { pausedRef.current = document.hidden; };
    document.addEventListener('visibilitychange', onVis, { passive: true });

    const updateMouse = (clientX: number, clientY: number) => {
      const rect = rectRef.current;
      if (!rect) return;
      const ratio = currentDprRef.current;
      mouseTarget.set((clientX - rect.left) * ratio, (rect.height * ratio) - ((clientY - rect.top) * ratio));
    };
    const onMove = (ev: PointerEvent | MouseEvent) => updateMouse(ev.clientX, ev.clientY);
    const onLeave = () => mouseTarget.set(0, 0);

    canvas.addEventListener('pointermove', onMove as any, { passive: true });
    canvas.addEventListener('pointerdown', onMove as any, { passive: true });
    canvas.addEventListener('pointerenter', onMove as any, { passive: true });
    canvas.addEventListener('pointerleave', onLeave as any, { passive: true });

    const onCtxLost = (e: Event) => { e.preventDefault(); pausedRef.current = true; };
    const onCtxRestored = () => { pausedRef.current = false; scheduleResize(); };
    canvas.addEventListener('webglcontextlost', onCtxLost, false);
    canvas.addEventListener('webglcontextrestored', onCtxRestored, false);

    let raf = 0;
    let lastDprChange = 0;

    const adjustDprIfNeeded = (now: number) => {
      if (now - lastFpsCheckRef.current < 750) return;
      const samples = fpsSamplesRef.current;
      if (samples.length === 0) { lastFpsCheckRef.current = now; return; }

      const avgFps = samples.reduce((a, b) => a + b, 0) / samples.length;
      let next = currentDprRef.current;
      const base = baseDprRef.current;

      if (avgFps < 50) next = Math.max(0.6, Math.min(base, currentDprRef.current * 0.85));
      else if (avgFps > 58 && currentDprRef.current < base) next = Math.max(0.6, Math.min(base, currentDprRef.current * 1.1));

      if (Math.abs(next - currentDprRef.current) > 0.01 && now - lastDprChange > 2000) {
        currentDprRef.current = next;
        lastDprChange = now;
        setSizeNow();
      }

      fpsSamplesRef.current = [];
      lastFpsCheckRef.current = now;
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (pausedRef.current || !inViewRef.current) return;

      const t = clock.getElapsedTime();
      const dt = Math.max(0, t - prevTime);
      prevTime = t;

      emaDtRef.current = emaDtRef.current * 0.9 + (dt * 1000) * 0.1;
      fpsSamplesRef.current.push(1000 / Math.max(1, emaDtRef.current));

      uniforms.iTime.value = t;
      const cdt = Math.min(0.033, Math.max(0.001, dt));
      (uniforms.uFlowTime.value as number) += cdt;
      (uniforms.uFogTime.value as number) += cdt;

      if (!hasFadedRef.current) {
        fade = Math.min(1, fade + cdt / 1.0);
        uniforms.uFade.value = fade;
        if (fade >= 1) hasFadedRef.current = true;
      }

      const tau = Math.max(1e-3, mouseSmoothTimeRef.current);
      mouseSmooth.lerp(mouseTarget, 1 - Math.exp(-cdt / tau));
      uniforms.iMouse.value.set(mouseSmooth.x, mouseSmooth.y, 0, 0);

      renderer.render(scene, camera);
      adjustDprIfNeeded(performance.now());
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('pointermove', onMove as any);
      canvas.removeEventListener('pointerdown', onMove as any);
      canvas.removeEventListener('pointerenter', onMove as any);
      canvas.removeEventListener('pointerleave', onLeave as any);
      canvas.removeEventListener('webglcontextlost', onCtxLost);
      canvas.removeEventListener('webglcontextrestored', onCtxRestored);
      scene.clear(); geometry.dispose(); material.dispose(); renderer.dispose();
      renderer.forceContextLoss();
      if (mount.contains(canvas)) mount.removeChild(canvas);
    };
  }, [dpr]);

  useEffect(() => {
    const uniforms = uniformsRef.current;
    if (!uniforms) return;
    uniforms.uWispDensity.value = wispDensity;
    uniforms.uTiltScale.value = mouseTiltStrength;
    uniforms.uBeamXFrac.value = horizontalBeamOffset;
    uniforms.uBeamYFrac.value = verticalBeamOffset;
    uniforms.uFlowSpeed.value = flowSpeed;
    uniforms.uVLenFactor.value = verticalSizing;
    uniforms.uHLenFactor.value = horizontalSizing;
    uniforms.uFogIntensity.value = fogIntensity;
    uniforms.uFogScale.value = fogScale;
    uniforms.uWSpeed.value = wispSpeed;
    uniforms.uWIntensity.value = wispIntensity;
    uniforms.uFlowStrength.value = flowStrength;
    uniforms.uDecay.value = decay;
    uniforms.uFalloffStart.value = falloffStart;
    uniforms.uFogFallSpeed.value = fogFallSpeed;
  }, [wispDensity, mouseTiltStrength, horizontalBeamOffset, verticalBeamOffset, flowSpeed, verticalSizing, horizontalSizing, fogIntensity, fogScale, wispSpeed, wispIntensity, flowStrength, decay, falloffStart, fogFallSpeed]);

  return <div ref={mountRef} className={`w-full h-full relative ${className || ''}`} style={style} />;
};


// ============================================================================
// 4. ISOMETRIC COMPONENTS
// ============================================================================
function BeltLaserFlow({ isInput, color }: { isInput: boolean; color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden rounded-2xl">
      <motion.div
        animate={{ x: isInput ? ["-100%", "300%"] : ["300%", "-100%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear", repeatDelay: 0.3 }}
        className="absolute top-1/2 w-48 h-[3px] -translate-y-1/2 cycle-bg"
        style={{ boxShadow: `0 0 25px currentColor, 0 0 50px currentColor` }}
      />
    </div>
  );
}

function DataCard({ delay, color, label, Icon, isOutput = false }: { delay: number; color: string; label: string; Icon: any; isOutput?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -300, scale: 0.6 }}
      animate={{ opacity: [0, 1, 1, 0], x: [-300, 300], scale: [0.6, 1, 1, 0.6] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: -delay, times: [0, 0.15, 0.85, 1] }}
      className="absolute top-1/2 left-1/2 -ml-10 -mt-12 w-20 h-24 z-30"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-black/80 blur-xl transform translateZ(-5px) scale-110" />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1e2233] to-[#050608] border border-white/10 rounded-xl flex flex-col items-center justify-center p-3 gap-2"
        style={{ transform: "translateZ(20px)", boxShadow: "0 10px 25px rgba(0,0,0,0.6)" }}
      >
        {isOutput ? (
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full border border-white/20 cycle-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 cycle-bg animate-ping opacity-30" />
              <CheckCircle2 className="w-6 h-6 cycle-text relative z-10" strokeWidth={3} />
            </div>
            <span className="text-[7px] font-mono font-black tracking-widest uppercase cycle-text text-glow-lime">DONE</span>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute w-[200%] h-[2px] bg-white/20 -rotate-45 animate-[spin_3s_linear_infinite]" />
              <Icon className={`w-6 h-6 cycle-text relative z-10`} strokeWidth={2} />
            </div>
            <span className={`text-[8px] font-mono font-black cycle-text tracking-tighter uppercase`}>{label}</span>
          </>
        )}
      </div>
    </motion.div>
  );
}

function Conveyor({ x, y, rotation, isInput = true }: { x: number; y: number; rotation: number; isInput?: boolean }) {
  const items = useMemo(() => Array.from({ length: 4 }).map((_, i) => ({ id: i, delay: i * 2, file: FILES[i % FILES.length] })), []);

  return (
    <div
      className="absolute w-[400px] h-24 -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y, transform: `rotate(${rotation}deg)`, transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-x-0 top-0 bottom-0 bg-[#0d1017] border-x-8 border-slate-900 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,1)]" />
        <div
          className="absolute inset-0 opacity-30 bg-[length:32px_100%]"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0, transparent 24px, #000 24px, #000 32px)", animation: `belt-flow 1.5s linear infinite ${isInput ? '' : 'reverse'}` }}
        />
        {/* Bantların Zemin Parlaması da Renk Değiştirir */}
        <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 blur-3xl opacity-20 cycle-bg" />
        <BeltLaserFlow isInput={isInput} color={ROSE} />
      </div>
      {items.map((item) => <DataCard key={item.id} delay={item.delay} color={item.file.color} label={item.file.label} Icon={item.file.icon} isOutput={!isInput} />)}
    </div>
  );
}

// ============================================================================
// 5. MAIN APP COMPONENT
// ============================================================================
export default function MiransasHero() {
  return (
    <div className="relative min-h-screen bg-[#020203] text-white overflow-hidden flex flex-col items-center justify-center font-sans tracking-tight selection:bg-rose-500 selection:text-white">

      {/* ====================================================================== */}
      {/* SİHİRLİ CSS KEYFRAMES: WebGL GLSL ile 6 saniyede senkronize döngü      */}
      {/* ====================================================================== */}
      <style>{`
        @keyframes belt-flow { from { background-position: 0 0; } to { background-position: 32px 0; } }
        .perspective-view { perspective: 3500px; }
        .isometric-layer { transform: rotateX(60deg) rotateZ(-45deg); transform-style: preserve-3d; }
        
        @keyframes cycle-bg {
          0%, 100% { background-color: #f43f5e; box-shadow: 0 0 30px rgba(244,63,94,0.4); }
          33% { background-color: #9eff00; box-shadow: 0 0 30px rgba(158,255,0,0.4); }
          66% { background-color: #06b6d4; box-shadow: 0 0 30px rgba(6,182,212,0.4); }
        }
        @keyframes cycle-text {
          0%, 100% { color: #f43f5e; text-shadow: 0 0 20px rgba(244,63,94,0.4); }
          33% { color: #9eff00; text-shadow: 0 0 20px rgba(158,255,0,0.4); }
          66% { color: #06b6d4; text-shadow: 0 0 20px rgba(6,182,212,0.4); }
        }
        @keyframes cycle-border {
          0%, 100% { border-color: #f43f5e; }
          33% { border-color: #9eff00; }
          66% { border-color: #06b6d4; }
        }
        
        .cycle-bg { animation: cycle-bg 6s infinite ease-in-out; }
        .cycle-text { animation: cycle-text 6s infinite ease-in-out; }
        .cycle-border { animation: cycle-border 6s infinite ease-in-out; }
      `}</style>

      {/* ====================================================== */}
      {/* THE NEW WEBGL LASER FLOW BACKGROUND ENTEGRASYONU       */}
      {/* ====================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LaserFlow
          wispIntensity={8.0}
          fogIntensity={0.6}
          flowSpeed={0.5}
          verticalBeamOffset={-0.2}
          horizontalBeamOffset={0.0}
        />
      </div>

      {/* ============================================================== */}
      {/* HERO TEXT & CALL TO ACTION                                     */}
      {/* ============================================================== */}
      <div className="relative z-[100] w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 md:absolute md:top-28 md:left-12 md:max-w-xl md:px-0 md:pt-0 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full cycle-bg opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full cycle-bg" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.4em] sm:tracking-[0.5em] uppercase font-bold border bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm cycle-text cycle-border">
            MIRANSAS_ACTIVE v4.0
          </span>
        </div>

        <h1 className="mt-2 text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white drop-shadow-2xl">
          Miransas{" "}
          <span className="cycle-text font-black block sm:inline">
            Core Logic
          </span>
        </h1>

        <div className="flex flex-col gap-2 border-l-2 cycle-border pl-5 py-1 mt-6 mb-8 sm:mb-12">
          <span className="text-sm md:text-base font-mono font-bold text-white tracking-wide uppercase">
            Isometric Factory Simulation
          </span>
          <span className="text-xs font-mono text-white/40 tracking-[0.1em] uppercase">
            Nightmares Engineered.
          </span>
        </div>

        <div className="flex items-center gap-5 pointer-events-auto">
          <NeonButton>Explore</NeonButton>
        </div>
      </div>

      {/* 3D SCENE */}
      <div className="relative perspective-view w-full h-[50vh] sm:h-[60vh] flex items-center justify-center pointer-events-none z-10 mt-8 md:mt-12 overflow-hidden">
        <div className="relative isometric-layer w-[1000px] h-[1000px] flex items-center justify-center scale-50 sm:scale-75 md:scale-100 origin-center">

          <Conveyor x={230} y={500} rotation={0} isInput={true} />
          <Conveyor x={500} y={230} rotation={90} isInput={true} />
          <Conveyor x={770} y={500} rotation={0} isInput={false} />
          <Conveyor x={500} y={770} rotation={90} isInput={false} />

          {/* CENTRAL CORE CUBE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 z-50" style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}>

            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c26] to-[#050608] border-2 border-white/10 rounded-[3.8rem] shadow-[0_60px_120px_rgba(0,0,0,1)]" style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute inset-0 border-[3px] border-white/5 rounded-[3.8rem] pointer-events-none" />
              <div className="absolute inset-10 border-2 border-slate-800/40 rounded-[2.8rem] shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-4 border border-white/5 rounded-[2.4rem] opacity-20" />
              </div>

              {/* TOP FACE */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-[#1a0509] to-[#0a0003] border-2 cycle-border rounded-[4rem] flex flex-col items-center justify-center overflow-hidden" style={{ transform: "translateZ(120px)", transformStyle: "preserve-3d" }}>
                <div className="absolute top-0 left-0 w-full h-[2px] cycle-bg opacity-50" />

                <div className="w-40 h-40 rounded-full border-[10px] border-[#1a0509] bg-gradient-to-b from-[#0a0003] to-black flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,1)] relative">
                  {/* Renk Döngülü Lazer Enerji Parlaması */}
                  <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full cycle-bg blur-[20px] pointer-events-none opacity-20" />

                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-black/50 via-gray-900 to-[#050002] flex items-center justify-center border cycle-border relative overflow-hidden">
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-2 border border-dashed cycle-border rounded-full opacity-40" />

                    <img src="/logo/logo.png" alt="Miransas Logo" className="bg-gradient-to-br from-black/50 via-gray-900 to-[#050002]" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-2" />
                  </div>
                </div>

                <div className="mt-4 flex flex-col items-center gap-1 relative z-10">
                  <span className="font-mono text-md tracking-[0.5em] uppercase font-bold cycle-text">Miransas</span>
                  <div className="w-24 h-[1px] cycle-bg opacity-40" />
                </div>
              </div>

              {/* TUNNEL PORTS */}
              {[
                { rot: 0 }, { rot: 90 }, { rot: 180 }, { rot: 270 },
              ].map((port, i) => (
                <div key={i} className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2" style={{ transform: `rotateY(90deg) rotateX(${port.rot}deg) translateZ(135px)`, transformStyle: "preserve-3d" }}>
                  <div className="absolute inset-0 rounded-full bg-[#2a2d3e] border border-black shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_-5px_15px_rgba(255,255,255,0.1)] flex items-center justify-center">
                    <div className="absolute inset-[6%] rounded-full bg-[#151722] shadow-[inset_0_20px_40px_rgba(0,0,0,1)] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-[5%] rounded-full border-[4px] cycle-border opacity-50" />
                      <div className="absolute inset-[15%] rounded-full bg-[#0d0f17] shadow-[inset_0_20px_30px_rgba(0,0,0,1)]" />
                      <div className="absolute inset-[28%] rounded-full bg-[#05060a] shadow-[inset_0_25px_40px_rgba(0,0,0,1)]" />
                      <div className="absolute inset-[40%] rounded-full bg-black shadow-[inset_0_30px_50px_rgba(0,0,0,1)] flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full blur-[15px] opacity-40 animate-pulse cycle-bg" />
                        <motion.div animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-4 h-4 rounded-full bg-white blur-[1px] relative z-20 cycle-bg opacity-80" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DEVASA VOLUMETRIK REAKTÖR IŞIĞI (SÜREKLİ RENK DEĞİŞTİRİR) */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: CORE_PULSE_DURATION, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] blur-[100px] rounded-full pointer-events-none cycle-bg"
            />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM CARD                                                    */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full max-w-5xl px-4 sm:px-6 pb-12 pt-32 sm:pt-48 md:pt-[44rem]">

        {/* Lazerin tam karta vurduğu yerdeki Devasa Işık Patlaması */}
        <div className="absolute top-0 left-1/2 h-32 w-72 -translate-x-1/2 rounded-full blur-[50px] pointer-events-none cycle-bg opacity-30" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="relative grid grid-cols-1 overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem] border-x border-b border-white/5 bg-[#05060a]/80 backdrop-blur-xl md:grid-cols-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)] pt-2 cycle-border border-t-2"
        >
          <motion.div
            animate={{ width: ["20%", "80%", "20%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 h-[3px] -translate-x-1/2 cycle-bg"
          />

          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-16 relative z-10">
            <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Miransas{" "}
              <span className="cycle-text block sm:inline">Core Architecture</span>
            </h2>
            <p className="mb-8 sm:mb-10 text-sm sm:text-base text-[#8b949e] leading-relaxed max-w-2xl">
              Powering the next generation of <span className="text-orange-400">high-performance</span> tools.
              From self-hosted tunneling solutions to advanced <span className="text-blue-400 font-mono">Rust-based</span> engines,
              the Miransas ecosystem gives you full control, speed, and absolute efficiency.
            </p>
            <div className="w-fit">
              <NeonButton>Explore Ecosystem</NeonButton>
            </div>
          </div>

          <div className="relative min-h-[320px] sm:min-h-[400px] p-4 sm:p-8 lg:p-12">
            <div className="absolute inset-0 cycle-bg opacity-5 blur-[100px] pointer-events-none" />
            <CodeMockup />
          </div>
        </motion.div>
      </div>

    </div>
  );
}