"use client";

import { useActionState } from "react";

import { initialApplyToOfferState } from "@/app/offres/[uid]/action-state";
import { applyToOffer } from "@/app/offres/[uid]/actions";

type OfferApplicationFormProps = {
  offerUid: string;
};

export function OfferApplicationForm({
  offerUid,
}: OfferApplicationFormProps) {
  const [state, formAction, pending] = useActionState(
    applyToOffer,
    initialApplyToOfferState,
  );

  return (
    <div className="mt-12">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="offerUid" value={offerUid} />
        <textarea
          name="comment"
          rows={5}
          required
          placeholder="Postuler a cette offre ..."
          className="min-h-40 w-full border border-[#2175D9] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#2175D9]"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={pending}
            className="bg-[#2175D9] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {pending ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </form>

      {state.status === "success" ? (
        <p className="mt-10 max-w-3xl text-2xl font-medium leading-tight text-[#2175D9]">
          {state.message}
        </p>
      ) : null}

      {state.status === "error" ? (
        <p className="mt-6 text-sm font-medium text-red-600">{state.message}</p>
      ) : null}
    </div>
  );
}
