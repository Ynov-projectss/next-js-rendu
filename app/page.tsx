import { asText, type Content } from "@prismicio/client";
import Image from "next/image";

import {
  formatStartDate,
  getJobOffers,
  getOfferTechnologyNames,
} from "@/app/_lib/job-offers";
import {
  OffersSection,
  type HomeOffer,
} from "@/components/offers/OffersSection";
import { SectionTitle } from "@/components/ui/SectionTitle";

const HOMEPAGE_OFFERS_LIMIT = 20;
const HOMEPAGE_INITIAL_VISIBLE_OFFERS = 6;

function mapOfferForHome(offer: Content.JobOfferDocument): HomeOffer {
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

export default async function Home() {
  const offers = await getJobOffers(HOMEPAGE_OFFERS_LIMIT);
  const homeOffers = offers.map(mapOfferForHome);

  return (
    <main className="mx-auto flex w-full flex-1 flex-col pb-12">
      <section>
        <div className="relative h-[220px] w-full overflow-hidden md:h-[360px]">
          <Image
            src="/images/home-hero.jpg"
            alt="Bureau"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="px-6 py-10 md:px-12 md:py-12">
        <SectionTitle title="Nos dernieres opportunites" as="h1" />

        <div className="mt-9">
          <OffersSection
            offers={homeOffers}
            initialVisibleCount={HOMEPAGE_INITIAL_VISIBLE_OFFERS}
          />
        </div>
      </section>
    </main>
  );
}
