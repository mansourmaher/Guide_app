"use client";
import React, { useEffect } from "react";
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

// _id
// 679febc8ed2283ecb4f4652f
// titre
// "phpto"
// description
// "<p>difvjoidf</p>"
// prix
// 45

// location
// Array (2)
// categorie
// "programming"
// dateDisponible
// 2025-02-02T22:02:55.757+00:00
// etat
// "ACTIVE"
// nombrePersonnesMax
// 45
// nombrePersonneCurrent
// 0
// startDate
// 2025-02-02T22:02:55.757+00:00
// endDate
// 2025-02-09T23:00:00.000+00:00

// photos
// Array (1)
// createdAt
// 2025-02-02T22:03:52.142+00:00
// updatedAt
// 2025-02-02T22:03:52.142+00:00

// follow the same structure as the above example
interface Offer {
  id: string;
  titre: string;
  description: string;
  prix: number;
  location: string;
  category: string;
  startDate: string;
  status: string;
  nombrePersonnesMax: number;
  rating: number;
}

function Offers() {
  const [offers, setOffers] = React.useState([] as Offer[]);
  useEffect(() => {
    AxiosInstance.get("/offres")
      .then((res) => {
        setOffers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Tour Offers</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Input placeholder="Search offers..." className="w-64" />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Select>
          <option value="all">All Offers</option>
          <option value="active">Active</option>
          <option value="upcoming">Upcoming</option>
          <option value="draft">Draft</option>
        </Select>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-card mb-4 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{offer.titre}</h2>

                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {new Date(offer.startDate).toDateString()}
                  </span>
                </div>
              </div>
              <Badge
                variant={
                  offer.status === "Active"
                    ? "default"
                    : offer.status === "Upcoming"
                    ? "secondary"
                    : "outline"
                }
              >
                {offer.status}
              </Badge>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                  <span className="font-semibold">{offer.prix}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-blue-500 mr-1" />
                  <span>{offer.nombrePersonnesMax}</span>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="text-primary">
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default Offers;
