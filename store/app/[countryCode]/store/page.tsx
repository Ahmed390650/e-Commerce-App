import StoreTempalte from "@/modules/store/templates";
import React from "react";
type StoreProps = { params: Promise<{ countryCode: string }> };
const page = async ({ params }: StoreProps) => {
  const { countryCode } = await params;
  return <StoreTempalte countryCode={countryCode} />;
};

export default page;
