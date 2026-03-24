"use client";

import { create } from "zustand";

import type { OfferPreview } from "@/components/offers/offerPreview";

type SavedOffersState = {
  savedOffers: OfferPreview[];
  addSavedOffer: (offer: OfferPreview) => void;
  removeSavedOffer: (offerId: string) => void;
  toggleSavedOffer: (offer: OfferPreview) => void;
  isSavedOffer: (offerId: string) => boolean;
};

export const useSavedOffersStore = create<SavedOffersState>((set, get) => ({
  savedOffers: [],
  addSavedOffer: (offer) =>
    set((state) => ({
      savedOffers: state.savedOffers.some(
        (savedOffer) => savedOffer.id === offer.id,
      )
        ? state.savedOffers
        : [...state.savedOffers, offer],
    })),
  removeSavedOffer: (offerId) =>
    set((state) => ({
      savedOffers: state.savedOffers.filter((offer) => offer.id !== offerId),
    })),
  toggleSavedOffer: (offer) => {
    const { isSavedOffer, addSavedOffer, removeSavedOffer } = get();

    if (isSavedOffer(offer.id)) {
      removeSavedOffer(offer.id);
      return;
    }

    addSavedOffer(offer);
  },
  isSavedOffer: (offerId) =>
    get().savedOffers.some((offer) => offer.id === offerId),
}));
