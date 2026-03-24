"use client";

import { useState } from "react";

import { OfferCard } from "@/components/offers/OfferCard";

export type HomeOffer = {
  id: string;
  href: string;
  title: string;
  startDate: string;
  technologies: string[];
  description: string;
};

type OffersSectionProps = {
  offers: HomeOffer[];
  initialVisibleCount?: number;
};

export function OffersSection({
  offers,
  initialVisibleCount = offers.length,
}: OffersSectionProps) {
  const visibleCount = Math.min(initialVisibleCount, offers.length);
  const [showAll, setShowAll] = useState(false);
  const visibleOffers = showAll ? offers : offers.slice(0, visibleCount);
  const canShowMore = offers.length > visibleCount && !showAll;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      {canShowMore ? (
        <div className="mt-9 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="bg-[#2175D9] px-4 py-2 text-sm font-medium text-white"
          >
            Afficher plus
          </button>
        </div>
      ) : null}
    </>
  );
}
