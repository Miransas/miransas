export function AnimatedBadge({
  text,
  color = "green",
}: {
  text: string
  color?: "green" | "purple" | "blue"
}) {
  const colorClass = {
    green: "border-[#8CFF2E]/30 bg-[#8CFF2E]/10 text-[#8CFF2E]",
    purple: "border-purple-400/30 bg-purple-400/10 text-purple-300",
    blue: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  }[color]

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${colorClass}`}>
      {text}
    </span>
  )
}
