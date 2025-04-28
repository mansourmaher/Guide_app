import React from "react";
import AddNewOffre from "./_compoenets/addnewoffre";
import { withSubscriptionProtection } from "@/lib/withSubscriptionProtection";

function page() {
  return <AddNewOffre />;
}

export default withSubscriptionProtection(page);
