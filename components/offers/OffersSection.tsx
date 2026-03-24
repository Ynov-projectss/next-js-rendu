import { OfferCard } from "@/components/offers/OfferCard";
import type { OfferPreview } from "@/components/offers/offerPreview";

type OffersSectionProps = {
  offers: OfferPreview[];
};

export function OffersSection({ offers }: OffersSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {offers.map((offer) => (
        <OfferCard key={offer.uid} offer={offer} />
      ))}
    </div>
  );
}
