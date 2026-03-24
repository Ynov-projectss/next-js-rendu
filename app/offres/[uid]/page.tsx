import type { Metadata } from "next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatStartDate,
  getJobOfferByUID,
  getJobOfferUIDs,
  getOfferTechnologyNames,
} from "@/app/_lib/job-offers";

type JobOfferPageProps = {
  params: Promise<{ uid: string }>;
};

export async function generateStaticParams() {
  const uids = await getJobOfferUIDs();

  return uids.map((uid) => ({ uid }));
}

export async function generateMetadata({
  params,
}: JobOfferPageProps): Promise<Metadata> {
  const { uid } = await params;

  try {
    const offer = await getJobOfferByUID(uid);

    return {
      title: `${offer.data.title} | Offres d'emploi`,
      description: `Consulte l'offre ${offer.data.title} et ses technologies associées.`,
    };
  } catch {
    return {
      title: "Offre introuvable | Offres d'emploi",
    };
  }
}

export default async function JobOfferPage({ params }: JobOfferPageProps) {
  const { uid } = await params;

  let offer;

  try {
    offer = await getJobOfferByUID(uid);
  } catch {
    notFound();
  }

  const technologies = getOfferTechnologyNames(offer);

  return (
    <main>
      Todo
    </main>
  );
}
