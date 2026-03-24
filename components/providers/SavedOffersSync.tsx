"use client";

import { useEffect } from "react";

import { useSavedOffersStore } from "@/stores/saved-offers-store";

export function SavedOffersSync() {
  const hasHydrated = useSavedOffersStore((state) => state.hasHydrated);
  const setSavedOffers = useSavedOffersStore((state) => state.setSavedOffers);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const savedOffers = useSavedOffersStore.getState().savedOffers;

    if (savedOffers.length === 0) {
      return;
    }

    let isCancelled = false;

    async function validateSavedOffers() {
      try {
        const response = await fetch("/api/saved-offers/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uids: savedOffers.map((offer) => offer.uid),
          }),
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { validUIDs: string[] };
        const validUIDs = new Set(data.validUIDs);
        const validSavedOffers = savedOffers.filter((offer) =>
          validUIDs.has(offer.uid),
        );

        if (
          validSavedOffers.length === savedOffers.length &&
          validSavedOffers.every((offer, index) => offer.uid === savedOffers[index]?.uid)
        ) {
          return;
        }

        if (!isCancelled) {
          setSavedOffers(validSavedOffers);
        }
      } catch {
        return;
      }
    }

    void validateSavedOffers();

    return () => {
      isCancelled = true;
    };
  }, [hasHydrated, setSavedOffers]);

  return null;
}
