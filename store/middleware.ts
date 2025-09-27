import { clerkMiddleware } from "@clerk/nextjs/server";
import { HttpTypes } from "@medusajs/types";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL;
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us";

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
};

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache;

  if (!BACKEND_URL) {
    throw new Error("Missing MEDUSA_BACKEND_URL");
  }

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: { "x-publishable-api-key": PUBLISHABLE_API_KEY! },
      next: { revalidate: 3600, tags: [`regions-${cacheId}`] },
    }).then(async (response) => {
      const json = await response.json();
      if (!response.ok) throw new Error(json.message);
      return json;
    });

    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2 ?? "", region);
      });
    });
    regionMapCache.regionMapUpdated = Date.now();
  }

  return regionMapCache.regionMap;
}

async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion>
) {
  let countryCode;

  const vercelCountryCode = request.headers
    .get("x-vercel-ip-country")
    ?.toLowerCase();
  const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase();

  if (urlCountryCode && regionMap.has(urlCountryCode)) {
    countryCode = urlCountryCode;
  } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
    countryCode = vercelCountryCode;
  } else if (regionMap.has(DEFAULT_REGION)) {
    countryCode = DEFAULT_REGION;
  } else if (regionMap.keys().next().value) {
    countryCode = regionMap.keys().next().value;
  }

  return countryCode;
}

export default async function middleware(req) {
  // Run your Medusa region logic here after Clerk auth
  let response = NextResponse.next();
  const path = req.nextUrl.pathname;

  let cacheIdCookie = req.cookies.get("_medusa_cache_id");
  let cacheId = cacheIdCookie?.value || crypto.randomUUID();

  const regionMap = await getRegionMap(cacheId);

  const countryCode = regionMap && (await getCountryCode(req, regionMap));
  const urlHasCountryCode =
    countryCode && req.nextUrl.pathname.split("/")[1].includes(countryCode);

  if (urlHasCountryCode && cacheIdCookie) {
    return response;
  }

  if (urlHasCountryCode && !cacheIdCookie) {
    response.cookies.set("_medusa_cache_id", cacheId, { maxAge: 60 * 60 * 24 });
    return response;
  }

  if (req.nextUrl.pathname.includes(".")) {
    return response;
  }

  if (!urlHasCountryCode && countryCode) {
    const redirectPath =
      req.nextUrl.pathname === "/" ? "" : req.nextUrl.pathname;
    const queryString = req.nextUrl.search ? req.nextUrl.search : "";
    const redirectUrl = `${req.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`;
    response = NextResponse.redirect(redirectUrl, 307);
  }

  return response;
}
// export default clerkMiddleware(async (auth, req) => {
//   // Run your Medusa region logic here after Clerk auth
//   let response = NextResponse.next();
//   const path = req.nextUrl.pathname;

//   let cacheIdCookie = req.cookies.get("_medusa_cache_id");
//   let cacheId = cacheIdCookie?.value || crypto.randomUUID();

//   const regionMap = await getRegionMap(cacheId);

//   const countryCode = regionMap && (await getCountryCode(req, regionMap));
//   const urlHasCountryCode =
//     countryCode && req.nextUrl.pathname.split("/")[1].includes(countryCode);

//   if (urlHasCountryCode && cacheIdCookie) {
//     return response;
//   }

//   if (urlHasCountryCode && !cacheIdCookie) {
//     response.cookies.set("_medusa_cache_id", cacheId, { maxAge: 60 * 60 * 24 });
//     return response;
//   }

//   if (req.nextUrl.pathname.includes(".")) {
//     return response;
//   }

//   if (!urlHasCountryCode && countryCode) {
//     const redirectPath =
//       req.nextUrl.pathname === "/" ? "" : req.nextUrl.pathname;
//     const queryString = req.nextUrl.search ? req.nextUrl.search : "";
//     const redirectUrl = `${req.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`;
//     response = NextResponse.redirect(redirectUrl, 307);
//   }

//   return response;
// });

export const config = {
  matcher: [
    // Same as Clerk’s defaults + Medusa’s adjustments
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
