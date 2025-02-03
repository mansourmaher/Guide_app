import {
  ChevronRight,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Star,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import AxiosInstance from "@/lib/axiosInstance";
import Offers from "./_compoenets/offers";

export default function GuideDashboard() {
  return <Offers />;
}
