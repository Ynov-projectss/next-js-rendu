import { isFilled, type Content } from "@prismicio/client";

import { createClient } from "@/prismicio";

export async function getJobOffers(limit?: number) {
  const client = createClient();

  if (limit) {
    const response = await client.getByType("job_offer", {
      orderings: [{ field: "my.job_offer.start_date", direction: "desc" }],
      pageSize: limit,
    });

    return response.results;
  }

  return client.getAllByType("job_offer", {
    orderings: [{ field: "my.job_offer.start_date", direction: "desc" }],
  });
}

export async function getJobOfferByUID(uid: string) {
  const client = createClient();

  return client.getByUID("job_offer", uid);
}

export async function getJobOfferUIDs() {
  const offers = await getJobOffers();

  return offers
    .map((offer) => offer.uid)
    .filter((uid): uid is string => Boolean(uid));
}

export function getOfferTechnologyNames(offer: Content.JobOfferDocument) {
  return offer.data.technologies
    .map((item) => item.technology)
    .filter(isFilled.contentRelationship)
    .map((technology) => technology.data?.name ?? "Technologie");
}

export function formatStartDate(date: string | null) {
  if (!date) {
    return "Date non renseignee";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}
