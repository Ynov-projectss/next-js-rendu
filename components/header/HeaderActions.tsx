import Link from "next/link";
import { Bookmark, LogOut } from "lucide-react";

const PINNED_OFFERS_COUNT = 3;

export function HeaderActions() {
  return (
    <div className="flex items-center gap-1 text-white">
      <Link
        href="/"
        aria-label="Voir les offres epinglees"
        title="Voir les offres epinglees"
        className="inline-flex h-10 min-w-10 items-center justify-center text-white"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <span>{PINNED_OFFERS_COUNT}</span>
          <Bookmark className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </span>
      </Link>
      <Link
        href="/"
        aria-label="Se deconnecter"
        title="Se deconnecter"
        className="inline-flex h-10 min-w-10 items-center justify-center text-white"
      >
        <LogOut className="h-5 w-5" strokeWidth={1.8} />
      </Link>
    </div>
  );
}
