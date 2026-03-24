import { NextResponse } from "next/server";

import { getExistingJobOfferUIDs } from "@/app/_lib/job-offers";

export async function POST(request: Request) {
  const data = (await request.json().catch(() => null)) as
    | { uids?: unknown }
    | null;

  const uids = Array.isArray(data?.uids)
    ? data.uids.filter((uid): uid is string => typeof uid === "string" && uid.trim().length > 0)
    : [];

  const validUIDs = await getExistingJobOfferUIDs(uids);

  return NextResponse.json({ validUIDs });
}
