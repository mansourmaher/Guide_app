"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import UploadImagesForOffers from "./UploadImages";
import { Editor } from "@/components/app_compoenets/editor";

// Define props interface
interface OffreDetailsProps {
  onDetailsChange: (data: any) => void;
  initialValues?: {
    title?: string;
    description?: string;
    imagesUrls?: string[];
  };
}

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

function OffreDetails({ onDetailsChange, initialValues }: OffreDetailsProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      imagesUrls: initialValues?.imagesUrls || [],
    },
  });

  // Watch all fields and call onDetailsChange when they change
  const watchAllFields = form.watch();
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onDetailsChange(value);
    });
    return () => subscription.unsubscribe();
  }, [form, onDetailsChange]);

  const onImageChange = (imagesUrl: string[]) => {
    form.setValue("imagesUrls", imagesUrl);
  };

  const { isSubmitting, isValid } = form.formState;

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
          <form className="space-y-6">
            <div className="space-y-4">
              <FormLabel htmlFor="title" className="font-medium text-gray-700">
                Offer Title
              </FormLabel>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
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
                )}
              />
            </div>

            <div className="space-y-4">
              <FormLabel htmlFor="description" className="font-medium text-gray-700">
                Offer Description
              </FormLabel>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    {!form.formState.errors.description?.message && (
                      <FormDescription>
                        Include all relevant details to help users make a decision.
                      </FormDescription>
                    )}
                    <FormMessage>
                      {form.formState.errors.description?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <div className="mt-6">
          <UploadImagesForOffers
            initialImageUrl={form.watch("imagesUrls")}
            onImageChange={onImageChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default OffreDetails;