"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Calendar1,
  Globe2Icon,
  ImageIcon,
  LucideIcon,
  Plus,
  UserIcon,
  X,
} from "lucide-react";

import { SetupAccountSchemaType, setupAccountSchema } from "@/schemas";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import filiers from "@/data/filiers";
import Select from "react-select";
import { FileUpload } from "./file-upload";

interface StepsType {
  id: string;
  name: string;
  fields?: (keyof SetupAccountSchemaType)[];
  icon?: LucideIcon;
}

const steps: StepsType[] = [
  {
    id: "Step 1",
    name: "Fundamental Details",
    fields: ["name", "birthdate", "email", "occupation", "bio"],
    icon: UserIcon,
  },

  {
    id: "Step 2",
    name: "Personal Picture",
    fields: ["image"],
    icon: ImageIcon,
  },
];

export function SetUpAccountForm() {
  const user = null;
  const [previousStep, setPreviousStep] = React.useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const delta = currentStep - previousStep;
  const initialDate = user?.data?.user?.DateOfBirth
    ? new Date(user?.data?.user.DateOfBirth)
    : new Date();
  const initailFilier = user?.data?.user?.filier
    ? user?.data?.user?.filier
    : "";
  const initailImageUrl = user?.data?.user?.image
    ? user?.data?.user?.image
    : "";
  const initialeAbout = user?.data?.user?.about ? user?.data?.user?.about : "";
  const initialFilier = user?.data?.user?.filier || "";

  const initialeOrigin = user?.data?.user?.origin || {
    id: "",
    userId: "",
    value: "",
    label: "",
    flag: "",
    region: "",
    lalng: [0, 0],
  };

  const [initailFilierValue, setInitailFilierValue] =
    useState<string>(initailFilier);
  const initialSubtitle = user?.data?.user?.subtitle
    ? user?.data?.user?.subtitle
    : "";
  const initialPatients = user?.data?.user?.patients
    ? user?.data?.user?.patients
    : [];
  const initialLinkin = user?.data?.user?.linkedin
    ? user?.data?.user?.linkedin
    : "";
  const initialgithub = user?.data?.user?.github
    ? user?.data?.user?.github
    : "";
  const initialtwitter = user?.data?.user?.twitter
    ? user?.data?.user?.twitter
    : "";

  const [date, setDate] = useState<Date>(initialDate);
  const [optionSelected, setOptionSelected] = useState<string>(initailFilier);
  const [about, setAbout] = useState<string>(initialeAbout);
  const [imageUrl, setImageUrl] = useState<string>(initailImageUrl);
  const [isloading, setIsloading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [patient, setPatient] = useState<string>("");
  const [patiants, setPatiants] = useState<string[]>(initialPatients);
  const [subtitle, setSubtitle] = useState<string>(initialSubtitle);
  const [linkedin, setLinkedin] = useState<string>(initialLinkin);
  const [github, setGithub] = useState<string>(initialgithub);
  const [twitter, setTwitter] = useState<string>(initialtwitter);

  const filierOptions = filiers;

  const setUpAccountForm = useForm<SetupAccountSchemaType>({
    resolver: zodResolver(setupAccountSchema),
    defaultValues: {
      name: user?.data?.user?.name || "",
      birthdate: initialDate,
      email: user?.data?.user?.email || "",
      bio: user?.data?.user?.about || "",

      image: imageUrl,

      patients: patiants,
      linkedin: linkedin,
      github: github,
      twitter: twitter,
    },
  });

  const setCustomValue = (id: keyof SetupAccountSchemaType, value: any) => {
    setUpAccountForm.setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const processForm = async (data: SetupAccountSchemaType) => {
    if (currentStep === steps.length - 1) {
      await handelSubmit();
    } else {
      await next();
    }
  };

  type FieldName = keyof SetupAccountSchemaType;

  const next = async () => {
    setPreviousStep(currentStep);
    setCurrentStep((step) => step + 1);
  };

  const previous = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const country = setUpAccountForm.watch("country");

  const onpatientPuch = async (data: any) => {
    await setPatiants((prev) => {
      const updatedOptions = [...prev, data];

      setPatient("");

      return updatedOptions;
    });
  };
  const router = useRouter();
  const handelSubmit = async () => {
    setIsloading(true);
    const data = {
      date: setUpAccountForm.watch("birthdate"),
      optionSelected: optionSelected as string,
      imageUrl: imageUrl as string,

      about: setUpAccountForm.watch("bio"),
      subtitle: subtitle as string,
      patients: patiants as string[],
      linkedin: linkedin as string,
      github: github as string,
      twitter: twitter as string,
    };
    // await FillInformation(data)
    //   .then((res) => {
    //     if (res.success) {
    //       toast.success("Profile Information Added Successfully");
    //     } else {
    //       toast.error("Error Adding Profile Information");
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error("Error Adding Profile Information");
    //   })
    //   .then(() => {
    //     setIsFinished(true);
    //     setIsloading(false);
    //   });
  };

  return (
    <section className=" flex flex-col justify-between px-56 pt-20">
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4  border-blue-400  py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-muted-foreground transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full items-center border-l-4 border-blue-400 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-400 transition-colors group-hover:bg-primary/80">
                    {step.icon && (
                      <step.icon className="h-4 w-4 text-white bg-blue-400" />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col md:ml-4">
                    <span className="text-sm font-medium text-primary transition-colors">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-muted-foreground transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <Form {...setUpAccountForm}>
        <form
          className="py-12"
          onSubmit={setUpAccountForm.handleSubmit(processForm)}
        >
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-base font-semibold leading-7 text-foreground">
                Fundamental Details
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Provide your personal details in order to complete your account
                setup.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <FormField
                    control={setUpAccountForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-1 sm:col-span-3">
                  <FormField
                    control={setUpAccountForm.control}
                    name="birthdate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Birthdate</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="birthdate"
                                variant={"outline"}
                                className={cn(
                                  "text-left font-normal border-muted border",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  <span>
                                    {format(
                                      new Date(field.value),
                                      "dd MMMM yyyy"
                                    )}
                                  </span>
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <Calendar1 className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0 "
                              align="start"
                            >
                              <Calendar
                                captionLayout="dropdown-buttons"
                                fromYear={1900}
                                toYear={new Date().getFullYear()}
                                mode="single"
                                selected={field.value}
                                onSelect={(date) =>
                                  setCustomValue("birthdate", date)
                                }
                                defaultMonth={new Date("2000-01-01")}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-3">
                  <FormField
                    control={setUpAccountForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-2 sm:col-span-3">
                  <Label>Field of Work </Label>
                  <Select
                    options={filierOptions}
                    placeholder="Select your filier"
                    className="border-none border"
                    value={
                      filierOptions.find(
                        (option) => option.value === initailFilierValue
                      ) || null
                    }
                    onChange={(value) => {
                      setInitailFilierValue(value?.value as string);
                      setOptionSelected(value?.value as string);
                    }}
                    formatOptionLabel={(option) => {
                      return (
                        <div>
                          <div>{option.option}</div>
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="sm:col-span-3">
                  <div className="flex flex-col gap-6">
                    <div className="items-center justify-center gap-x-3">
                      <Label>Subtitle</Label>
                      <Input
                        placeholder="You subtitle"
                        onChange={(e) => setSubtitle(e.target.value)}
                        value={subtitle}
                      />
                      <div className="">
                        <span className="text-xs text-gray-500">
                          Add professionnel headline like "Software Engineer"
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-x-3">
                        <div className="flex-1 items-center">
                          <Label>Skills</Label>
                          <Input
                            placeholder=""
                            value={patient}
                            onChange={(e) => setPatient(e.target.value)}
                          />
                        </div>
                        <button
                          onClick={() => onpatientPuch(patient)}
                          disabled={patient === ""}
                          className="ml-4 mt-6 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center "
                        >
                          <Plus className="w-6 h-6 " />
                        </button>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">
                          Add your expertise to help recruiters find you
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    {patiants && (
                      <div className="grid grid-cols-4 gap-x-2 gap-y-2">
                        {patiants.map((option, index) => {
                          if (option === null) return null;
                          return (
                            <Badge
                              variant="outline"
                              className="mt-2 p-1 relative"
                              key={index}
                            >
                              {option}
                              <X
                                onClick={() => {
                                  setPatiants((prev) => {
                                    const updatedOptions = prev.filter(
                                      (opt) => opt !== option
                                    );

                                    return updatedOptions;
                                  });
                                }}
                                size="18"
                                className=" cursor-pointer absolute top-0 right-0"
                              ></X>
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <div className="flex flex-col gap-6">
                    <div className="items-center justify-center gap-x-3">
                      <Label>
                        Linkidin{" "}
                        <span className="text-gray-500">(optional)</span>
                      </Label>
                      <Input
                        placeholder=""
                        onChange={(e) => setLinkedin(e.target.value)}
                        value={linkedin}
                      />
                      <div className="">
                        <span className="text-xs text-gray-500">
                          Help recruiters find you by adding your LinkedIn
                          profile
                        </span>
                      </div>
                    </div>
                    <div className="items-center justify-center gap-x-3">
                      <Label>
                        Github <span className="text-gray-500">(optional)</span>
                      </Label>
                      <Input
                        placeholder=""
                        onChange={(e) => setGithub(e.target.value)}
                        value={github}
                      />
                      <div className="">
                        <span className="text-xs text-gray-500">
                          Share your projects by adding your GitHub profile
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <FormField
                    control={setUpAccountForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-base font-semibold leading-7 text-foreground">
                Personal Picture
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Provide your personal picture in order to complete your account
                setup.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <FormField
                    control={setUpAccountForm.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <FileUpload
                            endpoint="profileImage"
                            onChange={(url) => {
                              if (url) {
                                setImageUrl(url);
                                setIsloading(false);
                                setIsFinished(true);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {imageUrl && (
                    <div className="mt-4 flex justify-center mx-auto">
                      <Image
                        src={imageUrl}
                        alt="profile"
                        className="rounded-full"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </Form>

      <div className="">
        <div className="flex justify-between">
          <Button
            variant={"outline"}
            onClick={previous}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handelSubmit}
              disabled={isloading}
              variant={"outline"}
            >
              Save
            </Button>
          ) : (
            <Button
              variant={"outline"}
              onClick={next}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
