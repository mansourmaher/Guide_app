import Offers from "./_compoenets/offers";
import { withSubscriptionProtection } from "@/lib/withSubscriptionProtection";

const GuideDashboard=()=> {
  return <Offers />;
}
export default withSubscriptionProtection(GuideDashboard);
