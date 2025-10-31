import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ orderNumber: string; session_id: string }>;
}) => {
  const { orderNumber, session_id } = await searchParams;
  console.log(orderNumber, session_id);
  return <div>page</div>;
};

export default page;
