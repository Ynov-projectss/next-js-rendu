import { BriefcaseBusiness } from "lucide-react";

import { getJobOffers } from "@/app/_lib/job-offers";
import { OffersSection } from "@/components/offers/OffersSection";
import {
  mapJobOfferToOfferPreview,
  type OfferPreview,
} from "@/components/offers/offerPreview";
import { TechnologyTagList } from "@/components/offers/TechnologyTagList";
import { SectionTitle } from "@/components/ui/SectionTitle";

function getTechnologyTags(offers: OfferPreview[]) {
  const seen = new Map<string, OfferPreview["technologies"][number]>();

  for (const offer of offers) {
    for (const technology of offer.technologies) {
      seen.set(technology.uid, technology);
    }
  }

  return [...seen.values()];
}

export default async function OffersPage() {
  const offers = await getJobOffers();
  const offerPreviews = offers.map(mapJobOfferToOfferPreview);
  const technologies = getTechnologyTags(offerPreviews);

  return (
    <main className="mx-auto flex w-full flex-1 flex-col px-6 py-10 md:px-12 md:py-12">
      <SectionTitle
        title="Offres d'emploi"
        as="h1"
        rightContent={
          <div className="inline-flex items-center gap-2 text-sm font-medium text-[#2175D9]">
            <BriefcaseBusiness className="h-4 w-4" strokeWidth={1.8} />
            <span>{offerPreviews.length} offres</span>
          </div>
        }
      />

      <div className="mt-4">
        <TechnologyTagList technologies={technologies} />
      </div>

      <div className="mt-9">
        <OffersSection offers={offerPreviews} />
      </div>
    </main>
  );
}
