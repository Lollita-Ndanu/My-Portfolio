import clsx from "clsx";

export default function GlassPanel({ children, className = "" }) {
  return <div className={clsx("glass-card rounded-[1.75rem]", className)}>{children}</div>;
}
