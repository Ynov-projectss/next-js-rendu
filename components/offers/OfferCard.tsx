import Link from "next/link";
import { CalendarDays, CodeXml } from "lucide-react";

import type { OfferPreview } from "@/components/offers/offerPreview";
import { SaveOfferButton } from "@/components/offers/SaveOfferButton";

type OfferCardProps = {
  offer: OfferPreview;
};

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <article className="relative cursor-pointer bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={offer.href}
        aria-label={`Voir l'offre ${offer.title}`}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      <div className="relative z-20 pointer-events-none">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-[#0F1941]">{offer.title}</h3>
          <SaveOfferButton
            offer={offer}
            className="pointer-events-auto relative z-30 inline-flex items-center justify-center text-[#0F1941]"
          />
        </div>

        <div className="mt-4 space-y-2 text-sm text-[#2D7BF4]">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
            <span>{offer.startDate}</span>
          </p>
          <p className="flex items-start gap-2">
            <CodeXml className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} />
            <span>{offer.technologies.map((technology) => technology.name).join(", ")}</span>
          </p>
        </div>

        <p className="mt-5 text-sm leading-6 text-[#1E1B18]">{offer.description}</p>
      </div>
    </article>
  );
}
