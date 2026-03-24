import Link from "next/link";
import { Monitor } from "lucide-react";

export function HeaderBrand() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3"
    >
      <Monitor className="h-5 w-5" strokeWidth={1.8} />
      <span className="text-2xl font-semibold">DEV</span>
    </Link>
  );
}
