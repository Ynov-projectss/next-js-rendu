import { asText, type Content } from "@prismicio/client";

import {
  formatStartDate,
  getOfferTechnologyNames,
} from "@/app/_lib/job-offers";

export type OfferPreview = {
  id: string;
  href: string;
  title: string;
  startDate: string;
  technologies: string[];
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
    technologies: getOfferTechnologyNames(offer),
    description: asText(offer.data.description).slice(0, 140).trim(),
  };
}
