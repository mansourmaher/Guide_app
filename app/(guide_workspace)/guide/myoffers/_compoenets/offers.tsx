"use client";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  Filter,
  Calendar,
  DollarSign,
  Users,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AxiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import DeleteOffer from "./deleteOffer";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCookies } from "next-client-cookies";

interface Offer {
  _id: string;
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
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const router = useRouter();
  const cokkies=useCookies()
  const token = cokkies.get("token");
  const id = cokkies.get("id");

  useEffect(() => {
    const fetchOffers = async () => {
  
      try {
        const res = await fetch(`http://localhost:4000/offres/byGuide/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch offers");
        }
        const data = await res.json();
        setOffers(data);
        setFilteredOffers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOffers();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/guide/offer/${id}`);
  };

  const handleDelete = async (id: string) => {
    console.log("Deleting offer", id);
    const res = await AxiosInstance.delete(`/offres/${id}`);
    console.log(res);
    if (res.status === 201) {
      setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== id));
      toast.success("Offer deleted successfully");
    }

    setActiveOfferId(null);
  };

  const handleViewRegistration = (id: string) => {
    router.push(`/guide/registration/${id}`);
  };

  const handleFilterOffers = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      setFilteredOffers(offers); // Reset to original list when input is empty
      return;
    }

    const filtered = offers.filter((offer) =>
      offer.titre.toLowerCase().includes(value)
    );

    setFilteredOffers(filtered);
  };

  return (
    <div className="container mx-auto py-6 mt-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">My Tour Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search offers..."
                className="w-64"
                onChange={handleFilterOffers}
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <select className="bg-background border rounded-md px-3 py-2 text-sm">
              <option value="all">All Offers</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            {filteredOffers.map((offer) => (
              <div
                key={offer._id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors mb-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {offer.titre}
                    </h2>

                    <div className="flex items-center text-muted-foreground space-x-4">
                      <div className="flex items-center">
                        {" "}
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {new Date(offer.startDate).toDateString()}
                        </span>
                      </div>

                      <div className="flex gap-6">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4  mr-1 text-green-500" />
                          <span className="">{offer.prix} per person</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-blue-500 mr-1" />
                        <span>{offer.nombrePersonnesMax} max persons</span>
                      </div>
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
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary"
                      onClick={() => handleViewRegistration(offer._id)}
                    >
                      View Registration
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>

                    <div className="relative">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "rounded-full transition-all duration-200",
                              activeOfferId === offer._id
                                ? "opacity-100"
                                : "opacity-70 hover:opacity-100"
                            )}
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 p-2">
                          <DropdownMenuItem
                            className="flex items-center gap-2 cursor-pointer py-2"
                            onClick={() => handleEdit(offer._id)}
                          >
                            <Pencil className="h-4 w-4 text-blue-500" />
                            <span>Edit Offer</span>
                          </DropdownMenuItem>
                          <DeleteOffer
                            onDelete={() => handleDelete(offer._id)}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default Offers;
