import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function ShinyButton({
  label,
  href,
  isRose = false,
}: {
  label: string
  href: string
  isRose?: boolean
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90 ${
        isRose ? "bg-rose-300" : "bg-[#8CFF2E]"
      }`}
    >
      {label}
      <ArrowUpRight className="size-4" />
    </Link>
  )
}
