import { asText, type Content } from "@prismicio/client";

import {
  formatStartDate,
  getOfferTechnologies,
} from "@/app/_lib/job-offers";

export type OfferPreview = {
  id: string;
  href: string;
  title: string;
  startDate: string;
  technologies: {
    uid: string;
    name: string;
  }[];
  description: string;
};

export function mapJobOfferToOfferPreview(
  offer: Content.JobOfferDocument,
): OfferPreview {
  const uid = offer.uid ?? offer.id;

  return {
    id: offer.id,
    href: `/offres/${uid}`,
    title: offer.data.title ?? "Offre sans titre",
    startDate: formatStartDate(offer.data.start_date),
    technologies: getOfferTechnologies(offer),
    description: asText(offer.data.description).slice(0, 140).trim(),
  };
}
