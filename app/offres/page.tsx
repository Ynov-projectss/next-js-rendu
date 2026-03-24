import { redirect } from "next/navigation";
import { BriefcaseBusiness } from "lucide-react";

import { getJobOffers, getPaginatedJobOffers } from "@/app/_lib/job-offers";
import { OffersSection } from "@/components/offers/OffersSection";
import {
  mapJobOfferToOfferPreview,
  type OfferPreview,
} from "@/components/offers/offerPreview";
import { TechnologyTagList } from "@/components/offers/TechnologyTagList";
import { Pagination } from "@/components/ui/Pagination";
import { SectionTitle } from "@/components/ui/SectionTitle";

const OFFERS_PAGE_SIZE = 3;

function getTechnologyTags(offers: OfferPreview[]) {
  const seen = new Map<string, OfferPreview["technologies"][number]>();

  for (const offer of offers) {
    for (const technology of offer.technologies) {
      seen.set(technology.uid, technology);
    }
  }

  return [...seen.values()];
}

function getCurrentPage(page: string | undefined) {
  const pageNumber = Number(page);

  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    return 1;
  }

  return pageNumber;
}

type OffersPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function OffersPage({ searchParams }: OffersPageProps) {
  const { page } = await searchParams;
  const currentPage = getCurrentPage(page);

  const [paginatedOffers, allOffers] = await Promise.all([
    getPaginatedJobOffers(currentPage, OFFERS_PAGE_SIZE),
    getJobOffers(),
  ]);

  if (paginatedOffers.total_pages > 0 && currentPage > paginatedOffers.total_pages) {
    redirect(
      paginatedOffers.total_pages === 1
        ? "/offres"
        : `/offres?page=${paginatedOffers.total_pages}`,
    );
  }

  const offerPreviews = paginatedOffers.results.map(mapJobOfferToOfferPreview);
  const technologies = getTechnologyTags(allOffers.map(mapJobOfferToOfferPreview));

  return (
    <main className="mx-auto flex w-full flex-1 flex-col px-6 py-10 md:px-12 md:py-12">
      <SectionTitle
        title="Offres d'emploi"
        as="h1"
        rightContent={
          <div className="inline-flex items-center gap-2 text-sm font-medium text-[#2175D9]">
            <BriefcaseBusiness className="h-4 w-4" strokeWidth={1.8} />
            <span>{paginatedOffers.total_results_size} offres</span>
          </div>
        }
      />

      <div className="mt-4">
        <TechnologyTagList technologies={technologies} />
      </div>

      <div className="mt-9">
        <OffersSection offers={offerPreviews} />
      </div>

      <Pagination
        pathname="/offres"
        currentPage={paginatedOffers.page}
        totalPages={paginatedOffers.total_pages}
      />
    </main>
  );
}
