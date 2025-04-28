import React from "react";
import EditOffer from "../_compoenets/EditOffer";
import { withSubscriptionProtection } from "@/lib/withSubscriptionProtection";

function page({ params }: { params: { offerId: string } }) {
  return (
    <div className="mt-16">
      <EditOffer offerId={params.offerId} />
    </div>
  );
}

export default withSubscriptionProtection(page);
