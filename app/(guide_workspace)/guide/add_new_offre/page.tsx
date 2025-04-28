import React from "react";
import AddNewOffre from "./_compoenets/addnewoffre";
import { withSubscriptionProtection } from "@/lib/withSubscriptionProtection";

const page = () => {
  return <AddNewOffre />;
};

export default withSubscriptionProtection(page);
