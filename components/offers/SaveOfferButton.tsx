"use client";

import { Bookmark } from "lucide-react";

import type { OfferPreview } from "@/components/offers/offerPreview";
import { useSavedOffersStore } from "@/stores/saved-offers-store";

type SaveOfferButtonProps = {
  offer: OfferPreview;
  className?: string;
};

export function SaveOfferButton({
  offer,
  className,
}: SaveOfferButtonProps) {
  const hasHydrated = useSavedOffersStore((state) => state.hasHydrated);
  const isSaved = useSavedOffersStore((state) =>
    state.savedOffers.some((savedOffer) => savedOffer.uid === offer.uid),
  );
  const toggleSavedOffer = useSavedOffersStore((state) => state.toggleSavedOffer);
  const showSavedState = hasHydrated && isSaved;

  return (
    <button
      type="button"
      aria-label={showSavedState ? "Retirer des offres enregistrees" : "Enregistrer l'offre"}
      title={showSavedState ? "Retirer des offres enregistrees" : "Enregistrer l'offre"}
      onClick={() => toggleSavedOffer(offer)}
      className={className ?? "inline-flex items-center justify-center text-[#0F1941]"}
    >
      <Bookmark
        className="h-4 w-4"
        strokeWidth={1.8}
        fill={showSavedState ? "currentColor" : "none"}
      />
    </button>
  );
}
