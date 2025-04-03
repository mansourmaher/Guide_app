"use client";
import { Button } from "@/components/ui/button";
import AxiosInstance from "@/lib/axiosInstance";

import { motion } from "framer-motion";
import { Edit, LocateFixed, MoveLeft, Save } from "lucide-react";

import React, { useEffect, useState } from "react";
import EditOfferDetail from "./EditOfferDetail";
import EditoFerSecondaryDeatils from "./EditOfeerSecondaryDeatils";
import { CountrySelect } from "../../add_new_offre/_compoenets/country-select";
import { toast } from "sonner";

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

interface EditOfferProps {
  offerId: string;
}

function EditOffer({ offerId }: EditOfferProps) {
  const [offerDetails, setOfferDetails] = useState({
    title: "",
    description: "",
    imagesUrls: [],
  });

  const [offerSecondaryDetails, setOfferSecondaryDetails] = useState({
    price: 0,
    number_of_places: 0,
    category: "",
    tags: [],
    startDate: new Date(),
    endDate: new Date(),
  });

  const [latlng, setLatlng] = useState<Latlng>({ lat: 0, lng: 0 });
  useEffect(() => {
    const fetchSpecificOffer = async () => {
      try {
        const res = await AxiosInstance.get(`/offres/${offerId}`);
  
        // setOfferDetails((prev) => ({
        //   ...prev,
        //   title: res.data.titre,
        //   description: res.data.description,
        //   imagesUrls: res.data.photos,
        // }));
  
        setOfferSecondaryDetails((prev) => ({
          ...prev,
          price: res.data.prix,
          number_of_places: res.data.nombrePersonnesMax,
          category: res.data.categorie,
          tags: res.data.tags,
          startDate: res.data.startDate,
          endDate: res.data.endDate,
        }));
  
        setLatlng((prev) => ({
          ...prev,
          lat: res.data.location[0],
          lng: res.data.location[1],
        }));
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchSpecificOffer();
  }, [offerId]); 
  

  const [previousStep, setPreviousStep] = React.useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const delta = currentStep - previousStep;

  const handelSubmit = async () => {
    const res = await AxiosInstance.put(`/offres`, {
      _id: offerId,
      titre: offerDetails.title,
      description: offerDetails.description,
      prix: offerSecondaryDetails.price,
      categorie: offerSecondaryDetails.category,
      dateDisponible: offerSecondaryDetails.startDate,
      startDate: offerSecondaryDetails.startDate,
      endDate: offerSecondaryDetails.endDate,
      nombrePersonnesMax: offerSecondaryDetails.number_of_places,
      nombrePersonneCurrent: 0,
      etat: "ACTIVE",
      location: [latlng.lat, latlng.lng],
      photos: offerDetails.imagesUrls,
    });
    if (res.status === 201) {
      toast.success("Offer updated successfully");
    } else {
      toast.error("An error occured while updating the offer");
    }
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
            <EditOfferDetail
              onDetailsChange={setOfferDetails}
              initialDetails={offerDetails}
            />
          </motion.div>

          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="col-span-1"
          >
            <div className="flex flex-col space-y-2">
              <EditoFerSecondaryDeatils
                onSecondaryDetailsChange={setOfferSecondaryDetails}
                initialValue={offerSecondaryDetails}
              />
              <div className="flex flex-row justify-between gap-5">
                <Button
                  variant={"primary"}
                  className="w-full"
                  onClick={handelSubmit}
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
            <Button variant={"primary"}>
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

export default EditOffer;
