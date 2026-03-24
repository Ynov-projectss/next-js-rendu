"use client";

import { BriefcaseBusiness } from "lucide-react";

import { OffersSection } from "@/components/offers/OffersSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useSavedOffersStore } from "@/stores/saved-offers-store";

export default function SavedOffersPage() {
  const savedOffers = useSavedOffersStore((state) => state.savedOffers);

  return (
    <main className="mx-auto flex w-full flex-1 flex-col px-6 py-10 md:px-12 md:py-12">
      <SectionTitle
        title="Offres enregistrees"
        as="h1"
        rightContent={
          <div className="inline-flex items-center gap-2 text-sm font-medium text-[#2175D9]">
            <BriefcaseBusiness className="h-4 w-4" strokeWidth={1.8} />
            <span>{savedOffers.length} offres</span>
          </div>
        }
      />

      <div className="mt-9">
        {savedOffers.length > 0 ? (
          <OffersSection offers={savedOffers} />
        ) : (
          <p className="text-sm text-[#1E1B18]">
            Aucune offre enregistree pour le moment.
          </p>
        )}
      </div>
    </main>
  );
}
