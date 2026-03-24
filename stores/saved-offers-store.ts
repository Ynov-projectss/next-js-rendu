"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { OfferPreview } from "@/components/offers/offerPreview";

type SavedOffersState = {
  savedOffers: OfferPreview[];
  hasHydrated: boolean;
  setSavedOffers: (offers: OfferPreview[]) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  toggleSavedOffer: (offer: OfferPreview) => void;
};

export const useSavedOffersStore = create<SavedOffersState>()(
  persist(
    (set) => ({
      savedOffers: [],
      hasHydrated: false,
      setSavedOffers: (offers) => set({ savedOffers: offers }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      toggleSavedOffer: (offer) =>
        set((state) => {
          const isSaved = state.savedOffers.some(
            (savedOffer) => savedOffer.uid === offer.uid,
          );

          return {
            savedOffers: isSaved
              ? state.savedOffers.filter((savedOffer) => savedOffer.uid !== offer.uid)
              : [...state.savedOffers, offer],
          };
        }),
    }),
    {
      name: "saved-offers",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ savedOffers: state.savedOffers }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
