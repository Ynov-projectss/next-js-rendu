"use server";

import {
  getJobOfferByUID,
  getOfferAdminEmails,
} from "@/app/_lib/job-offers";
import type { ApplyToOfferState } from "@/app/offres/[uid]/action-state";

export async function applyToOffer(
  _previousState: ApplyToOfferState,
  formData: FormData,
): Promise<ApplyToOfferState> {
  const offerUid = formData.get("offerUid")?.toString().trim();
  const comment = formData.get("comment")?.toString().trim();

  if (!offerUid) {
    return {
      status: "error",
      message: "Offre introuvable.",
    };
  }

  if (!comment) {
    return {
      status: "error",
      message: "Merci de saisir un message avant d'envoyer.",
    };
  }

  try {
    const offer = await getJobOfferByUID(offerUid);
    const adminEmails = getOfferAdminEmails(offer);

    if (adminEmails.length === 0) {
      return {
        status: "error",
        message: "Aucune adresse email admin n'est configuree pour cette offre.",
      };
    }

    // Simule l'envoi: on valide juste que l'offre reference bien ses emails admins.
    void adminEmails;
    void comment;

    return {
      status: "success",
      message:
        "Merci d'avoir postule a cette offre, nous reviendrons vers vous tres prochainement!",
    };
  } catch {
    return {
      status: "error",
      message: "Impossible de traiter votre candidature pour le moment.",
    };
  }
}
