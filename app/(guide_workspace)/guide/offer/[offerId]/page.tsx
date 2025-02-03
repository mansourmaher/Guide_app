import React from "react";

function page({ params }: { params: { offerId: string } }) {
  return <div className="mt-16">page {params.offerId}</div>;
}

export default page;
