"use client";
import React, { useState } from "react";
import OffreDetails from "./offredetails";
import OffreSeconaryDeatils from "./secondaryDeatils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import AxiosInstance from "@/lib/axiosInstance";
import { CountrySelect } from "./country-select";

import { CountrySelectValue } from "./country-select";
import { motion } from "framer-motion";
import { LocateFixed, MoveLeft, Save } from "lucide-react";
import OfferDates from "./offerDates";

export interface Latlng {
  lat: number;
  lng: number;
}
interface StepsType {
  id: string;
  name: string;
}
const steps: StepsType[] = [
  {
    id: "Step 1",
    name: "Fundamental Details",
  },
  {
    id: "Step 2",
    name: "Geographic Coordinates",
  },
];

function AddNewOffre() {
  const [offerDetails, setOfferDetails] = useState({});
  const [offerSecondaryDetails, setOfferSecondaryDetails] = useState({});
  const [latlng, setLatlng] = useState<Latlng>({ lat: 0, lng: 0 });

  const [previousStep, setPreviousStep] = React.useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const delta = currentStep - previousStep;

  const handelSubmit = async () => {
    console.log(offerDetails);
    console.log(offerSecondaryDetails);
    console.log(latlng);

    const res = await AxiosInstance.post("/offres", {
      // @ts-ignore
      titre: offerDetails.title,
      description:
        // @ts-ignore
        offerDetails.description,

      // @ts-ignore
      prix: offerSecondaryDetails.price,

      // @ts-ignore
      categorie: offerSecondaryDetails.category,
      // @ts-ignore

      dateDisponible: offerSecondaryDetails.startDate,
      // @ts-ignore

      startDate: offerSecondaryDetails.startDate,
      // @ts-ignore

      endDate: offerSecondaryDetails.endDate,
      // @ts-ignore
      nombrePersonnesMax: offerSecondaryDetails.number_of_places,
      nombrePersonneCurrent: 0,
      etat: "ACTIVE",
      location: [latlng.lat, latlng.lng],
      // @ts-ignore

      photos: offerDetails.imagesUrls,
    });
    console.log(res);
  };
  return (
    <div className="container mx-auto py-6 space-y-8 mt-16">
      {currentStep === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="col-span-2"
          >
            <OffreDetails onDetailsChange={setOfferDetails} />
          </motion.div>

          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="col-span-1"
          >
            <div className="flex flex-col space-y-2">
              <OffreSeconaryDeatils
                onSecondaryDetailsChange={setOfferSecondaryDetails}
              />
              <div className="flex flex-row justify-between gap-5">
                <Button
                  onClick={handelSubmit}
                  variant={"primary"}
                  className="w-full"
                >
                  <span className="flex flex-row items-center gap-2">
                    <Save size={24} className="text-white" />
                    <span className="hidden md:inline ">Save the offer</span>
                  </span>
                </Button>
                <Button onClick={() => setCurrentStep(1)} variant={"secondary"}>
                  <span className="flex flex-row items-center gap-2">
                    <LocateFixed size={24} className="" />
                    <span className="hidden md:inline ">
                      Geographic Coordinates
                    </span>
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {currentStep === 1 && (
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="col-span-2"
            >
              <CountrySelect
                onChange={(value) =>
                  setLatlng({ lat: value[0], lng: value[1] })
                }
                value={latlng}
              />
            </motion.div>
          </div>
          <div className="flex flex-row justify-between gap-5 pt-6">
            <Button onClick={() => setCurrentStep(0)} variant={"secondary"}>
              <span className="flex flex-row items-center gap-2">
                <MoveLeft size={24} className="" />
                <span className="">Back</span>
              </span>
            </Button>
            <Button onClick={handelSubmit} variant={"primary"}>
              <span className="flex flex-row items-center gap-2">
                <Save size={24} className="text-white" />
                <span className="">Save the offer</span>
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNewOffre;
