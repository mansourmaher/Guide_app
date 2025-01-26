"use client";
import React, { useState } from "react";
import OffreDetails from "./offredetails";
import OffreSeconaryDeatils from "./secondaryDeatils";
import { Button } from "@/components/ui/button";
import axios from "axios";

function AddNewOffre() {
  const [offerDetails, setOfferDetails] = useState({});
  const [offerSecondaryDetails, setOfferSecondaryDetails] = useState({});

  const handleSaveOffer = () => {
    console.log("Offer Details:", offerDetails);
    console.log("Secondary Details:", offerSecondaryDetails);
    axios.post("http://::1:4000/offres", {
      ...offerDetails,
      ...offerSecondaryDetails,
    });
  };

  const handelSubmit = async () => {
    const res = await axios.post("http://localhost:4000/offres", {
      // @ts-ignore
      titre: offerDetails.title,
      // @ts-ignore

      description: offerDetails.description,
      // @ts-ignore

      photos: offerDetails.imagesUrls,
      prix: 150,
      duree: "3 days",
      categorie: "Tourism",
      dateDisponible: "2025-02-01",
      startDate: "2025-02-05",
      endDate: "2025-02-07",
      nombrePersonnesMax: 20,
      etat: "active",
    });
    console.log(res);
  };
  return (
    <div className="container mx-auto py-6 space-y-8 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div className="col-span-2">
          <OffreDetails onDetailsChange={setOfferDetails} />
        </div>

        <div className="col-span-1">
          <div className="flex flex-col space-y-2">
            <OffreSeconaryDeatils
              onSecondaryDetailsChange={setOfferSecondaryDetails}
            />
            <Button
              onClick={handelSubmit}
              variant={"primary"}
              className="w-full"
            >
              Save Offer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewOffre;
