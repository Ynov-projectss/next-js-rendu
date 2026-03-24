import type { Metadata } from "next";
import Link from "next/link";
import { BriefcaseBusiness, ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

import {
  getJobOffers,
  getOfferTechnologies,
  getTechnologyByUID,
  getTechnologyUIDs,
} from "@/app/_lib/job-offers";
import { OffersSection } from "@/components/offers/OffersSection";
import { mapJobOfferToOfferPreview } from "@/components/offers/offerPreview";
import { SectionTitle } from "@/components/ui/SectionTitle";

type TechnologyPageProps = {
  params: Promise<{ uid: string }>;
};

export async function generateStaticParams() {
  const uids = await getTechnologyUIDs();

  return uids.map((uid) => ({ uid }));
}

export async function generateMetadata({
  params,
}: TechnologyPageProps): Promise<Metadata> {
  const { uid } = await params;

  try {
    const technology = await getTechnologyByUID(uid);

    return {
      title: `${technology.data.name} | Offres d'emploi`,
    };
  } catch {
    return {
      title: "Technologie introuvable | Offres d'emploi",
    };
  }
}

export default async function TechnologyPage({ params }: TechnologyPageProps) {
  const { uid } = await params;

  let technology;

  try {
    technology = await getTechnologyByUID(uid);
  } catch {
    notFound();
  }

  const offers = await getJobOffers();
  const filteredOffers = offers.filter((offer) =>
    getOfferTechnologies(offer).some((technologyItem) => technologyItem.uid === uid),
  );
  const offerPreviews = filteredOffers.map(mapJobOfferToOfferPreview);

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
        title={technology.data.name ?? "Technologie"}
        as="h1"
        rightContent={
          <div className="inline-flex items-center gap-2 text-sm font-medium text-[#2175D9]">
            <BriefcaseBusiness className="h-4 w-4" strokeWidth={1.8} />
            <span>{offerPreviews.length} offres</span>
          </div>
        }
      />

      <div className="mt-9">
        <OffersSection offers={offerPreviews} />
      </div>
    </main>
  );
}
