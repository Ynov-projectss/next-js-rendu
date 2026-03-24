import type { Metadata } from "next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { ChevronLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";

import {
  formatStartDate,
  getJobOfferByUID,
  getJobOfferUIDs,
  getOfferTechnologies,
} from "@/app/_lib/job-offers";
import { OfferApplicationForm } from "@/components/offers/OfferApplicationForm";
import { SaveOfferButton } from "@/components/offers/SaveOfferButton";
import { mapJobOfferToOfferPreview } from "@/components/offers/offerPreview";
import { TechnologyTagList } from "@/components/offers/TechnologyTagList";
import { SectionTitle } from "@/components/ui/SectionTitle";

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
      description: `Consulte l'offre ${offer.data.title} et ses technologies associees.`,
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

  const technologies = getOfferTechnologies(offer);
  const offerPreview = mapJobOfferToOfferPreview(offer);

  return (
    <main className="mx-auto flex w-full flex-1 flex-col px-6 py-10 md:px-12 md:py-12">
      <Link
        href="/offres"
        className="mb-8 inline-flex items-center gap-2 self-start bg-[#2175D9] px-3 py-2 text-xs font-medium text-white"
      >
        <ChevronLeft className="h-3 w-3" strokeWidth={2} />
        <span>Voir toutes les offres</span>
      </Link>

      <SectionTitle
        title={offer.data.title ?? "Offre"}
        as="h1"
        rightContent={
          <SaveOfferButton
            offer={offerPreview}
            className="inline-flex items-center justify-center pb-1 text-[#0F1941]"
          />
        }
      />

      <div className="mt-4 max-w-5xl space-y-4">
        <p className="flex items-center gap-2 text-sm font-medium text-[#2175D9]">
          <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
          <span>{formatStartDate(offer.data.start_date)}</span>
        </p>

        <TechnologyTagList technologies={technologies} clickable={false} />
      </div>

      <div className="mt-10 max-w-5xl text-sm leading-7 text-[#1E1B18]">
        <PrismicRichText
          field={offer.data.description}
          components={{
            paragraph: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
          }}
        />
      </div>

      <div className="max-w-5xl">
        <OfferApplicationForm offerUid={offer.uid ?? offer.id} />
      </div>
    </main>
  );
}
