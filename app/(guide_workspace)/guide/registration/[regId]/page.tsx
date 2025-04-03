"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Check,
  X,
  Clock,
  Ban,
  Loader2,
  NotepadTextDashed,
  AlertCircle,
} from "lucide-react";
import AxiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Status = "ONGOING" | "CANCEL " | "ACCEPT ";

interface Registration {
  _id: string;
  touristId: {
    fullName: string;
    email: string;
  };
  createdAt: string;
  status: Status;
  numberOfPersons: number;
}

function Page({ params }: { params: { regId: string } }) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [offerDetails, setOfferDetails] = useState<{
    titre: string;
    prix: number;
    startDate: string;
    nombrePersonnesMax: number;
    nombrePersonneCurrent: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [existedRegistation, setExistedRegistation] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get(`/reservations/byOffer/${params.regId}`)
      .then((res) => {
        setRegistrations(res.data);
        if (res.data.length === 0) {
          setLoading(false);
        }
        if (res.data.length > 0) {
          setExistedRegistation(true);
          setOfferDetails(res.data[0].offerId);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [params]);

  // const handleStatusChange = (id: string, newStatus: Status) => {
  //   setRegistrations(
  //     registrations.map((reg) =>
  //       reg._id === id ? { ...reg, status: newStatus } : reg
  //     )
  //   );
  // };

  const getStatusBadge = (status: Status) => {
    const statusConfig = {
      ONGOING: { class: "bg-yellow-100 text-yellow-800", icon: Clock },
      ACCEPT: { class: "bg-green-100 text-green-800", icon: Check },
      CANCEL: { class: "bg-red-100 text-red-800", icon: X },
    };
    // @ts-ignore
    const StatusIcon = statusConfig[status].icon;

    return (
      <Badge
        variant="outline"
        // @ts-ignore
        className={`${statusConfig[status].class} flex items-center gap-1`}
      >
        <StatusIcon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1) === "ACCEPT"
          ? "Accepted"
          : status.charAt(0).toUpperCase() + status.slice(1) === "CANCEL"
          ? "Declined"
          : "Pending"}
      </Badge>
    );
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
      </div>
    );
  }
  if (!existedRegistation) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <AlertCircle className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-700 mt-4">
          "No data available"
        </h2>
        <p className="text-gray-500 mt-2">
          Try refreshing or check back later.
        </p>
      </div>
    );
  }
  const handelAccept = async (id: string) => {
    try {
      const res = await AxiosInstance.put(`/reservations/status/${id}`, {
        status: "ACCEPT",
      });
      if (res.status === 201) {
        toast.success("Reservation accepted successfully");
      }
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };
  const HandelDecline = async (id: string) => {
    try {
      const res = await AxiosInstance.put(`/reservations/status/${id}`, {
        status: "CANCEL",
      });
      if (res.status === 201) {
        toast.success("Reservation declined successfully");
      }
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto py-6 mt-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Registrations for the event "{offerDetails?.titre}"
          </CardTitle>
          {offerDetails && (
            <div className="text-sm text-muted-foreground">
              {new Date(offerDetails.startDate).toDateString()} •{" "}
              {offerDetails.nombrePersonneCurrent} available places • $
              {offerDetails.prix} per person
            </div>
          )}
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[450px] pr-4">
            <div className="space-y-4">
              {registrations.map((registration) => (
                <div
                  key={registration._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {registration.touristId.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {registration.touristId.fullName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(registration.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {registration.numberOfPersons} persons
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {registration.status === "ONGOING" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handelAccept(registration._id)}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => HandelDecline(registration._id)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Decline
                          </Button>
                        </>
                      )}
                      {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {registration.status !== "ONGOING" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(registration._id, "ONGOING")
                              }
                            >
                              <Clock className="w-4 h-4 mr-2" />
                              Mark as Pending
                            </DropdownMenuItem>
                          )}
                          {registration.status !== "ONGOING" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(registration._id, "ONGOING")
                              }
                              className="text-green-600"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Accept Registration
                            </DropdownMenuItem>
                          )}
                          {registration.status !== "ONGOING" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(registration._id, "ONGOING")
                              }
                              className="text-red-600"
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              Cancel Registration
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu> */}
                    </div>
                    {getStatusBadge(registration.status)}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
