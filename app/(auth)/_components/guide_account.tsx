"use client";

import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonelInformation from "./PersonelInformation";
import Expertise from "./Expertise";
import Offers from "./Offers";
import Profile_Photo from "./Profile_Photo";
import {
  ExpertiseInformationSchemas,
  PersonelInformationType,
  UserModelType,
} from "@/types";

interface GuideProfileSetupProps {
  user: UserModelType;
}

export default function GuideProfileSetup({ user }: GuideProfileSetupProps) {
  const [activeTab, setActiveTab] = useState("personal");

  const [expertiseInformation, setExpertiseInformation] = useState(
    {} as ExpertiseInformationSchemas
  );
  const [personelInformation, setPersonelInformation] =
    useState<PersonelInformationType>({} as PersonelInformationType);
  useEffect(() => {
    setPersonelInformation({
      _id: user._id!,
      name: user.fullName,
      nikname: user.nickname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      location: user.location,
      about: user.about,
      spokenLanguages: user.languages,
    });
    setExpertiseInformation({
      expertise: user.experiences || [],
      certifications: user.certifications || [],
      guestPreferences: user.preferredGuests || [],
    });
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Profile_Photo
          initialImageUrl={user.profileImage}
          id={personelInformation._id}
        />

        <div className="pt-16 pb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Your Guide Profile
          </h1>
          <p className="text-gray-500 mt-2">
            Share your expertise and attract travelers to your unique
            experiences
          </p>
        </div>

        <Tabs
          defaultValue="personal"
          className="mb-12"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-4 w-full max-w-xl">
              <TabsTrigger
                value="personal"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Personal
              </TabsTrigger>
              <TabsTrigger
                value="expertise"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Expertise
              </TabsTrigger>
              <TabsTrigger
                value="offerings"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Offerings
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="personal" className="space-y-6">
            <PersonelInformation personelInformation={personelInformation} />
          </TabsContent>

          <TabsContent value="expertise" className="space-y-6">
            <Expertise
              expertiseInformation={expertiseInformation}
              id={personelInformation._id}
            />
          </TabsContent>

          <TabsContent value="offerings" className="space-y-6">
            <Offers id={personelInformation._id} initialPosts={user.posts} />
          </TabsContent>

          {/* <TabsContent value="preview" className="space-y-6">
            <Card className="overflow-hidden">
              <div className="h-48 bg-blue-600 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50"
                  style={{
                    backgroundImage: `url('/placeholder.svg?height=400&width=1200')`,
                  }}
                />
              </div>

              <CardContent className="pt-6 relative">
                <div className="absolute -top-16 left-6 rounded-full border-4 border-white bg-white shadow-lg">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="pt-12">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">Your Name</h2>
                      <div className="flex items-center text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>Barcelona, Spain</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-1" />
                      <span className="font-medium">New Guide</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedLanguages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium text-lg">About Me</h3>
                    <p className="text-gray-600 mt-2">
                      Your bio will appear here. Share your story, background,
                      and passion for guiding to connect with potential
                      travelers.
                    </p>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium text-lg">My Expertise</h3>
                    <div className="flex flex-wrap gap-2 mt-2"></div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-medium text-lg">Featured Experience</h3>
                    <div className="mt-2 border rounded-lg overflow-hidden">
                      <div className="h-48 bg-gray-100 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <Camera className="h-12 w-12" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium">
                          Hidden Gems of Barcelona
                        </h4>
                        <div className="flex items-center text-gray-500 mt-1 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>3 hours</span>
                          <span className="mx-2">•</span>
                          <Users className="h-4 w-4 mr-1" />
                          <span>Up to 10 people</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          Experience description will appear here...
                        </div>
                        <div className="mt-3 font-medium">
                          $49.99 per person
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md text-center">
                      <p className="text-yellow-800">
                        This is a preview of how travelers will see your
                        profile. Complete all sections for the best results.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Publish Profile
              </Button>
            </div>
          </TabsContent> */}
        </Tabs>

        {/* <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => {
              const tabs = ["personal", "expertise", "offerings", "preview"];
              const currentIndex = tabs.indexOf(activeTab);
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1]);
              }
            }}
          >
            Back
          </Button>

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              const tabs = ["personal", "expertise", "offerings", "preview"];
              const currentIndex = tabs.indexOf(activeTab);
              if (currentIndex < tabs.length - 1) {
                setActiveTab(tabs[currentIndex + 1]);
              }
            }}
          >
            {activeTab === "preview" ? "Save Profile" : "Continue"}
          </Button>
        </div> */}
      </div>
    </div>
  );
}
