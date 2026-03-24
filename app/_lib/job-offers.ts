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

export async function getExistingJobOfferUIDs(uids: string[]) {
  if (uids.length === 0) {
    return [];
  }

  const requestedUIDs = new Set(uids);
  const availableUIDs = await getJobOfferUIDs();

  return availableUIDs.filter((uid) => requestedUIDs.has(uid));
}

export async function getTechnologyByUID(uid: string) {
  const client = createClient();

  return client.getByUID("technology", uid);
}

export async function getTechnologyUIDs() {
  const client = createClient();
  const technologies = await client.getAllByType("technology");

  return technologies
    .map((technology) => technology.uid)
    .filter((uid): uid is string => Boolean(uid));
}

export function getOfferTechnologies(offer: Content.JobOfferDocument) {
  return offer.data.technologies
    .map((item) => item.technology)
    .filter(isFilled.contentRelationship)
    .map((technology) => ({
      uid: technology.uid ?? technology.id,
      name: technology.data?.name ?? "Technologie",
    }));
}

export function getOfferTechnologyNames(offer: Content.JobOfferDocument) {
  return getOfferTechnologies(offer).map((technology) => technology.name);
}

export function getOfferAdminEmails(offer: Content.JobOfferDocument) {
  return offer.data.admin_emails
    .map((item) => item.email?.trim())
    .filter((email): email is string => Boolean(email));
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
