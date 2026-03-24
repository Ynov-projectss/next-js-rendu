import Link from "next/link";
import Image from "next/image";

import { getJobOffers } from "@/app/_lib/job-offers";
import { OffersSection } from "@/components/offers/OffersSection";
import { mapJobOfferToOfferPreview } from "@/components/offers/offerPreview";
import { SectionTitle } from "@/components/ui/SectionTitle";

const HOMEPAGE_INITIAL_VISIBLE_OFFERS = 6;

export default async function Home() {
  const homeOffers = (await getJobOffers(HOMEPAGE_INITIAL_VISIBLE_OFFERS)).map(mapJobOfferToOfferPreview);

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
          <OffersSection offers={homeOffers} />
        </div>

        <div className="mt-9 flex justify-center">
          <Link
            href="/offres"
            className="bg-[#2175D9] px-4 py-2 text-sm font-medium text-white"
          >
            Voir toutes les offres
          </Link>
        </div>
      </section>
    </main>
  );
}
