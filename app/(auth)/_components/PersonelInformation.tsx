import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Languages, MapPin, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { PersonelInformationSchema } from "@/schemas";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { Form, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PersonelInformationType } from "@/types";
import AxiosInstance from "@/lib/axiosInstance";

interface PersonelInformationProps {
  personelInformation: PersonelInformationType;
}

function PersonelInformation({
  personelInformation,
}: PersonelInformationProps) {
  console.log("personelInformation", personelInformation);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    personelInformation.spokenLanguages || []
  );

  useEffect(() => {
    form.reset({
      fullName: personelInformation.name,
      nickname: personelInformation.nikname || "",
      email: personelInformation.email,
      phoneNumber: personelInformation.phoneNumber || "",
      languages: personelInformation.spokenLanguages || [],
      location: personelInformation.location || "",
      about: personelInformation.about || "",
    });
    setSelectedLanguages(personelInformation.spokenLanguages || []);
  }, [personelInformation]);

  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
      form.setValue(
        "languages",
        selectedLanguages.filter((l) => l !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
      form.setValue("languages", [...selectedLanguages, language]);
    }
  };

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Chinese",
    "Arabic",
  ];
  // add emoji to the language name like this one i dont want GB AND US i want like this 🎭

  const form = useForm<z.infer<typeof PersonelInformationSchema>>({
    resolver: zodResolver(PersonelInformationSchema),
    defaultValues: {
      fullName: personelInformation.name,
      nickname: personelInformation.nikname || "",
      email: personelInformation.email,
      phoneNumber: personelInformation.phoneNumber || "",
      languages: selectedLanguages,
      location: personelInformation.location || "",
      about: personelInformation.about || "",
    },
  });
  const onSubmit = async (data: z.infer<typeof PersonelInformationSchema>) => {
    console.log("data", data);
    try {
      const response = await fetch(
        `http://localhost:4000/users/${personelInformation._id}`,

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            ...data,
            spokenLanguages: selectedLanguages,
            accountSettet: true,
          }),
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        form.reset();
        setSelectedLanguages(data.languages);
      }
      console.log("Profile updated successfully");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "fullName",
                  label: "Full Name",
                  placeholder: "Your full name",
                },
                {
                  name: "nickname",
                  label: "Nickname (shown to travelers)",
                  placeholder: "How you want to be called",
                },
                {
                  name: "email",
                  label: "Email Address",
                  placeholder: "your.email@example.com",
                  type: "email",
                },
                {
                  name: "phoneNumber",
                  label: "Phone Number",
                  placeholder: "+1 (555) 123-4567",
                },
              ].map(({ name, label, placeholder, type = "text" }) => (
                <div key={name} className="space-y-2">
                  <Label htmlFor={name}>{label}</Label>
                  <Input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    // {/* @ts-ignore */}

                    // @ts-ignore
                    {...form.register(name)}
                  />
                  <FormMessage>
                    {/* @ts-ignore */}
                    {form.formState.errors[name]?.message}
                  </FormMessage>
                </div>
              ))}

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    className="pl-10"
                    placeholder="City, Country"
                    {...form.register("location")}
                  />
                </div>
                <FormMessage>
                  {form.formState.errors.location?.message}
                </FormMessage>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="about">About Me</Label>
                <Textarea
                  id="about"
                  placeholder="Tell travelers about yourself..."
                  className="min-h-[120px]"
                  {...form.register("about")}
                />
                <p className="text-xs text-gray-500">
                  This will be displayed on your public profile
                </p>
                <FormMessage>
                  {form.formState.errors.about?.message}
                </FormMessage>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Languages className="mr-2 h-5 w-5 text-blue-600" />
              Languages You Speak
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {languages.map((language) => (
                <Badge
                  key={language}
                  variant={
                    selectedLanguages.includes(language) ? "default" : "outline"
                  }
                  className={`cursor-pointer ${
                    selectedLanguages.includes(language)
                      ? "bg-blue-600 hover:bg-blue-700"
                      : ""
                  }`}
                  onClick={() => toggleLanguage(language)}
                >
                  {language}
                </Badge>
              ))}
            </div>
            <FormMessage>
              {form.formState.errors.languages?.message}
            </FormMessage>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4 p-6">
            <Button
              type="submit"
              className="col-span-2 mt-4"
              variant={"primary"}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default PersonelInformation;
