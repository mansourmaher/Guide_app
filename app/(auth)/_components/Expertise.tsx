import {
  Compass,
  Award,
  Users,
  PlusCircle,
  Trash2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ExpertiseInformationSchema } from "@/schemas";
import { Form, FormMessage } from "@/components/ui/form";
import {
  CertificationSchema,
  ExpertiseInformationSchemas,
  PreferredGuestSchema,
} from "@/types";
type SelectedGuest =
  | {
      name: string;
      icon: string;
      description: string;
    }
  | undefined;

type Certification = {
  name: string;
  description: string;
  organisation: string;
  date: string;
};

interface Props {
  expertiseInformation: ExpertiseInformationSchemas;
  id: string;
}

function Expertise({ expertiseInformation, id }: Props) {
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>(
    expertiseInformation.expertise || []
  );
  const [selectedGuest, setSelectedGuest] = useState<PreferredGuestSchema[]>(
    expertiseInformation.guestPreferences || []
  );

  const [certificationList, setCertificationList] = useState<
    CertificationSchema[]
  >(expertiseInformation.certifications || []);

  const [certificationName, setCertificationName] = useState<string>("");
  const [organisation, setOrganisation] = useState<string>("");
  const [issueDate, setIssueDate] = useState<string>("");
  const [certDescription, setCertDescription] = useState<string>("");
  const [certFile, setCertFile] = useState<File | null>(null);
  const [certification, setCertification] = useState<Certification>({
    name: certificationName,
    description: certDescription,
    organisation: organisation,
    date: issueDate,
  } as Certification);
  const [erreurCode, setErreurCode] = useState(0);

  const expertise = [
    {
      name: "History",
      icon: "🏛️",
      description: "Explore historical sites, ancient ruins, and museums.",
    },
    {
      name: "Food",
      icon: "🍽️",
      description:
        "Experience local cuisine, food tastings, and street food tours.",
    },
    {
      name: "Adventure",
      icon: "⛰️",
      description: "Hiking, extreme sports, and thrilling outdoor experiences.",
    },
    {
      name: "Culture",
      icon: "🎭",
      description: "Traditional performances, festivals, and local customs.",
    },
    {
      name: "Nature",
      icon: "🌿",
      description: "Eco-tourism, wildlife, and breathtaking landscapes.",
    },
    {
      name: "Photography",
      icon: "📸",
      description:
        "Scenic locations and best times for capturing great photos.",
    },
    {
      name: "Architecture",
      icon: "🏗️",
      description: "Admire historic and modern architectural wonders.",
    },
    {
      name: "Local Experience",
      icon: "🧑‍🤝‍🧑",
      description: "Engage with local communities and traditions.",
    },
    {
      name: "Shopping",
      icon: "🛍️",
      description:
        "Visit local markets, boutique stores, and shopping districts.",
    },
    {
      name: "Spirituality",
      icon: "🛕",
      description: "Discover temples, monasteries, and spiritual retreats.",
    },
    {
      name: "Wellness",
      icon: "🧘",
      description: "Yoga, meditation, and relaxation experiences.",
    },
    {
      name: "Wildlife",
      icon: "🐾",
      description: "Safaris, birdwatching, and marine life explorations.",
    },
    {
      name: "Music & Entertainment",
      icon: "🎶",
      description: "Live concerts, street performances, and cultural music.",
    },
    {
      name: "Nightlife",
      icon: "🌙",
      description: "Bars, clubs, and city nightlife experiences.",
    },
    {
      name: "Sports & Outdoor",
      icon: "⚽",
      description: "Water sports, skiing, and adventure activities.",
    },
  ];

  const guestPreferences = [
    {
      name: "Families with Children",
      icon: "👨‍👩‍👧‍👦",
      description: "Kid-friendly tours, engaging storytelling",
    },
    {
      name: "Solo Travelers",
      icon: "🧳",
      description: "Personalized experiences, safety-focused",
    },
    {
      name: "Couples",
      icon: "💑",
      description: "Romantic destinations, private tours",
    },
    {
      name: "Senior Travelers",
      icon: "👵👴",
      description: "Slow-paced, accessible routes",
    },
    {
      name: "Adventure Seekers",
      icon: "⛰️",
      description: "Hiking, extreme sports, outdoor experiences",
    },
    {
      name: "History Enthusiasts",
      icon: "🏛️",
      description: "Museums, historical landmarks, deep storytelling",
    },
    {
      name: "Food Lovers",
      icon: "🍽️",
      description: "Food tastings, local markets, cooking classes",
    },
    {
      name: "Photographers",
      icon: "📸",
      description: "Scenic locations, best times for light",
    },
    {
      name: "Cultural Explorers",
      icon: "🎭",
      description: "Festivals, traditions, immersive activities",
    },
    {
      name: "Luxury Travelers",
      icon: "🏨",
      description: "High-end services, premium experiences",
    },
  ];

  const toggleExpertise = (exp: string) => {
    if (selectedExpertise.includes(exp)) {
      setSelectedExpertise(selectedExpertise.filter((e) => e !== exp));
    } else {
      setSelectedExpertise([...selectedExpertise, exp]);
      form.setValue("expertise", [...selectedExpertise, exp]);
    }
  };
  const toggleGuest = (guest: string) => {
    const selected = guestPreferences.find((g) => g.name === guest);

    if (!selected) return;
    if (isAlreadyGuestIncluded(selected)) {
      removeGuest(selected);
    } else {
      setSelectedGuest([...selectedGuest, selected]);
      form.setValue("guestPreferences", [
        ...selectedGuest,
        selected,
      ] as unknown as string[]);
    }
  };
  const isAlreadyGuestIncluded = (guest: SelectedGuest) => {
    return selectedGuest?.some((g) => g?.name === guest?.name);
  };
  const removeGuest = (guest: SelectedGuest) => {
    setSelectedGuest(selectedGuest.filter((g) => g?.name !== guest?.name));
  };
  const form = useForm<z.infer<typeof ExpertiseInformationSchema>>({
    resolver: zodResolver(ExpertiseInformationSchema),
    defaultValues: {
      expertise: [],
      certifications: [],
      guestPreferences: [],
    },
  });
  const handelSubmit = (data: z.infer<typeof ExpertiseInformationSchema>) => {
    console.log(data);
  };
  const handelAddCetification = () => {
    console.log(certification);
    setErreurCode(0);
    if (certification.name.length < 1) {
      setErreurCode(1);
      return;
    }
    if (certification.date.length < 1) {
      setErreurCode(2);
      return;
    }
    if (certification.organisation.length < 1) {
      setErreurCode(3);
      return;
    }
    if (certificationList.includes(certification)) {
      return;
    } else {
      setCertificationList([...certificationList, certification]);
      setCertDescription("");
      setCertificationName("");
      setOrganisation("");
      setIssueDate("");
      setCertification({
        name: "",
        date: "",
        organisation: "",
        description: "",
      });
      form.setValue("certifications", [
        ...certificationList,
        certification,
      ] as unknown as string[]);
    }
  };
  const handleDeleteCertification = (index: number) => {
    setCertificationList((prevList) => prevList.filter((_, i) => i !== index));
  };
  const submitdata = async () => {
    console.log(certificationList);
    console.log(selectedGuest);
    console.log(selectedExpertise);
    form.setValue("certifications", certificationList as unknown as string[]);
    form.setValue("guestPreferences", selectedGuest as unknown as string[]);
    form.setValue("expertise", selectedExpertise as unknown as string[]);
    try {
      const response = await fetch(
        `http://localhost:4000/users/${id}`,

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            certifications: certificationList,
            preferredGuests: selectedGuest,
            experiences: selectedExpertise,
          }),
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        form.reset();
      }
      console.log("Profile updated successfully");
    } catch (e) {
      console.log(e);
    }
  };
  if (form.formState.errors.certifications)
    console.log(form.formState.errors.certifications.message);
  if (form.formState.errors.guestPreferences) {
    console.log(form.formState.errors.guestPreferences.message);
  }
  if (form.formState.errors.expertise) {
    console.log(form.formState.errors.expertise.message);
  }

  return (
    <div>
      <Form {...form}>
        <form>
          <Card className="mt-4">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Award className="mr-2 h-5 w-5 text-blue-600" />
                Certifications & Credentials
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-3">
                  {certificationList.map((cert, index) => (
                    <div key={index} className="relative group">
                      <div className="flex flex-col md:flex-row md:items-center p-4 border rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-blue-700 mr-2" />
                            <h4 className="font-medium text-blue-900">
                              {cert.name}
                            </h4>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center mt-1 text-sm text-blue-700">
                            <span>{cert.description}</span>
                            <span className="hidden md:block mx-2">•</span>
                            <span>Issued: {cert.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center mt-2 md:mt-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-blue-700 hover:text-blue-900 hover:bg-blue-200"
                          >
                            <span className="sr-only">Edit</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-pencil"
                            >
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            </svg>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCertification(index)}
                            type="button"
                            className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-100"
                          >
                            <span className="sr-only">Delete</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-trash-2"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                      <div className="absolute -left-1 top-0 bottom-0 w-1 bg-blue-600 rounded-l-lg"></div>
                    </div>
                  ))}
                </div>

                <div className="border border-dashed rounded-lg p-5 bg-gray-50">
                  <h4 className="text-md font-medium mb-3 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 text-blue-600"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v8" />
                      <path d="M8 12h8" />
                    </svg>
                    Add New Certification
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="certification">Certification Name</Label>
                      <Input
                        id="certification"
                        placeholder="e.g. Licensed Tour Guide"
                        value={certificationName}
                        onChange={(e) => {
                          setCertificationName(e.target.value);
                          setCertification({
                            ...certification,
                            name: e.target.value,
                          });
                        }}
                      />
                      {erreurCode === 1 && (
                        <FormMessage>
                          Certification name is required
                        </FormMessage>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="issuer">Issuing Organization</Label>
                      <Input
                        id="issuer"
                        placeholder="e.g. Tourism Board of Barcelona"
                        value={organisation}
                        onChange={(e) => {
                          setOrganisation(e.target.value);
                          setCertification({
                            ...certification,
                            organisation: e.target.value,
                          });
                        }}
                      />
                      {erreurCode === 3 && (
                        <FormMessage>
                          Issuing organization is required
                        </FormMessage>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="issue-date">Issue Date</Label>
                      <Input
                        id="issue-date"
                        placeholder="e.g. 2022"
                        value={issueDate}
                        onChange={(e) => {
                          setIssueDate(e.target.value);
                          setCertification({
                            ...certification,
                            date: e.target.value,
                          });
                        }}
                      />
                      {erreurCode === 2 && (
                        <FormMessage>Issue date is required</FormMessage>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cert-description">
                      Description (optional)
                    </Label>
                    <Textarea
                      id="cert-description"
                      placeholder="Briefly describe what this certification entails..."
                      className="min-h-[80px]"
                      value={certDescription}
                      onChange={(e) => {
                        setCertDescription(e.target.value);
                        setCertification({
                          ...certification,
                          description: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1">
                      <Label htmlFor="cert-file" className="cursor-pointer">
                        <div className="flex items-center text-sm text-blue-700 hover:text-blue-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                            <path d="M12 18v-6" />
                            <path d="m9 15 3 3 3-3" />
                          </svg>
                          Attach certificate (PDF, JPG)
                        </div>
                        <Input id="cert-file" type="file" className="hidden" />
                      </Label>
                    </div>

                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      variant="primary"
                      type="button"
                      onClick={() => handelAddCetification()}
                    >
                      Add Certification
                    </Button>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-600 mt-0.5 mr-3"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-amber-800">
                      Verification Increases Trust
                    </h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Uploading certificates allows us to verify your
                      credentials, which adds a verification badge to your
                      profile and increases booking rates by up to 30%.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-4">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-600" />
                  Guest Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guestPreferences.map((guest) => (
                    <div
                      key={guest.name}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        isAlreadyGuestIncluded(guest) ? "bg-blue-100" : ""
                      }`}
                      onClick={() => toggleGuest(guest.name)}
                    >
                      <span className="text-xl mr-2">{guest.icon}</span>
                      <div>
                        <h4 className="font-medium">{guest.name}</h4>
                        <p className="text-sm text-gray-600">
                          {guest.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <FormMessage>
                  {form.formState.errors.guestPreferences?.message}
                </FormMessage>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Compass className="mr-2 h-5 w-5 text-blue-600" />
                Your Areas of Expertise
              </h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {expertise.map((exp) => (
                  <Badge
                    key={exp.name}
                    variant={
                      selectedExpertise.includes(exp.name)
                        ? "default"
                        : "outline"
                    }
                    className={`cursor-pointer p-2 ${
                      selectedExpertise.includes(exp.name)
                        ? "bg-blue-50 hover:bg-blue-100 transition-colors text-black"
                        : ""
                    }`}
                    onClick={() => toggleExpertise(exp.name)}
                  >
                    <span className="text-xl">{exp.icon}</span>
                    <span className="ml-2">{exp.name}</span>
                  </Badge>
                ))}
                <FormMessage>
                  {form.formState.errors.expertise?.message}
                </FormMessage>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end p-4">
            <Button
              variant="primary"
              className=" mt-4"
              type="button"
              onClick={() => submitdata()}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Expertise;
