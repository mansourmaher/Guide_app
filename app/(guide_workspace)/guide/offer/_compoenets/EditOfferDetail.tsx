"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Editor } from "@/components/app_compoenets/editor";
import { Textarea } from "@/components/ui/textarea";
import UploadImagesForOffers from "../../add_new_offre/_compoenets/UploadImages";

interface EditOfferDetailProps {
  onDetailsChange: (details: any) => void;
  initialDetails:{
    title: string;
    description: string;
    imagesUrls: string[];
  }
}

function EditOfferDetail({
  onDetailsChange,
  initialDetails,
}: EditOfferDetailProps) {
  console.log("initialDetails:", initialDetails);
  const [isLoading, setIsLoading] = useState(false);
  const updateDetails = () => {
    const data = form.getValues();
    console.log("Data:", data);
    onDetailsChange(data);
  };

  const schema = z.object({
    title: z
      .string()
      .min(1, { message: "Please provide a valid title" })
      .max(50, { message: "Title is too long" }),
    description: z
      .string()
      .min(1, { message: "Please provide a valid description" })
      .max(500, { message: "Description is too long" }),
    imagesUrls: z.array(z.string()),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialDetails.title ,
      description: initialDetails.description ,
      imagesUrls: initialDetails.imagesUrls ,
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onImageChange = (imagesUrl: string[]) => {
    form.setValue("imagesUrls", imagesUrl);
    updateDetails();
  };
  useEffect(() => {
    form.reset({
      title: initialDetails.title,
      description: initialDetails.description,
      imagesUrls: initialDetails.imagesUrls || [],
    });
  }, [initialDetails, form]);

  return (
    <Card className="shadow-lg rounded-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Create a New Offer
        </CardTitle>
        <p className="text-sm text-gray-500">
          Provide details about the offer to attract more tourists.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={() => {}}
            className="space-y-6"
            onChange={updateDetails}
          >
            <div className="space-y-4">
              <FormLabel htmlFor="title" className="font-medium text-gray-700">
                Offer Title
              </FormLabel>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. Paris City Tour"
                          disabled={isSubmitting}
                          className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      {!form.formState.errors.title?.message && (
                        <FormDescription>
                          A catchy title will grab attention.
                        </FormDescription>
                      )}
                      <FormMessage>
                        {form.formState.errors.title?.message}
                      </FormMessage>
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="space-y-4">
              <FormLabel
                htmlFor="description"
                className="font-medium text-gray-700"
              >
                Offer Description
              </FormLabel>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Editor
                          {...field}
                          value={field.value} // Bind the value
                          onChange={(newValue) => {
                            form.setValue("description", newValue);
                            updateDetails();
                          }} // Update on change
                        />
                        {/* <Textarea
                          {...field}
                          placeholder="Provide a detailed description of the offer..."
                          disabled={isSubmitting}
                          className=" "
                        /> */}
                      </FormControl>
                      {!form.formState.errors.description?.message && (
                        <FormDescription>
                          Include all relevant details to help users make a
                          decision.
                        </FormDescription>
                      )}
                      <FormMessage>
                        {form.formState.errors.description?.message}
                      </FormMessage>
                    </FormItem>
                  );
                }}
              />
            </div>
          </form>
        </Form>

        <div className="mt-6">
          <UploadImagesForOffers
            initialImageUrl={form.getValues("imagesUrls")}
            onImageChange={onImageChange}
          />
        </div>
      </CardContent>
      {/* <CardFooter>
        <Button
          className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          variant={"primary"}
          size={"sm"}
          disabled={!isValid || isSubmitting || isLoading}
        >
          {isLoading ? "Saving..." : "Save Offer"}
        </Button>
      </CardFooter> */}
    </Card>
  );
}

export default EditOfferDetail;
