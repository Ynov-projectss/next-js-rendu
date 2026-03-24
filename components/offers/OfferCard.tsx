import { Bookmark, CalendarDays, CodeXml } from "lucide-react";

import type { HomeOffer } from "@/components/offers/OffersSection";

type OfferCardProps = {
  offer: HomeOffer;
};

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <article className="bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-[#0F1941]">{offer.title}</h3>
        <Bookmark className="mt-1 h-4 w-4 text-[#0F1941]" strokeWidth={1.8} />
      </div>

      <div className="mt-4 space-y-2 text-sm text-[#2D7BF4]">
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
          <span>{offer.startDate}</span>
        </p>
        <p className="flex items-start gap-2">
          <CodeXml className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} />
          <span>{offer.technologies.join(", ")}</span>
        </p>
      </div>

      <p className="mt-5 text-sm leading-6 text-[#1E1B18]">{offer.description}</p>
    </article>
  );
}
