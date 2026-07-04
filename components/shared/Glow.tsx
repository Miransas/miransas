export default function Glow() {
  return (
    <>
      <div className="absolute left-1/2 top-20 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-[180px]" />

      <div className="absolute bottom-[-300px] left-1/2 h-[900px] w-[1400px] -translate-x-1/2 rounded-full border border-orange-400/30" />

      <div className="absolute bottom-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px]" />
    </>
  );
}