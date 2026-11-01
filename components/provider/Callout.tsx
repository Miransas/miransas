import type { ReactNode } from "react";

type CalloutProps = {
  type?: "info" | "warning";
  children: ReactNode;
};

export function Callout({ type = "info", children }: CalloutProps) {
  const styles =
    type === "warning"
      ? "border-amber-500/40 bg-amber-500/10"
      : "border-blue-500/40 bg-blue-500/10";

  return (
    <div className={`my-6 rounded-lg border-l-4 p-4 text-sm ${styles}`}>
      {children}
    </div>
  );
}