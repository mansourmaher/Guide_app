"use client";

import { Camera, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OfferHistorySchema } from "@/schemas";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import UploadImagesForOffers from "@/app/(guide_workspace)/guide/add_new_offre/_compoenets/UploadImages";
import { useState } from "react";
import { Post } from "@/types";
import ExperienceFeed from "./experience_feed";

interface Props {
  id: string;
  initialPosts?: Post[];
}

function Offers({ id, initialPosts }: Props) {
  const form = useForm<z.infer<typeof OfferHistorySchema>>({
    resolver: zodResolver(OfferHistorySchema),
    defaultValues: {
      title: "",
      content: "",
      images: [],
    },
  });

  const [images, setImages] = useState<string[]>([]);

  console.log("initialPosts", initialPosts);

  const onSubmit = async (values: z.infer<typeof OfferHistorySchema>) => {
    const formData = {
      ...values,
      images: images,
    };
    const updatedPosts = initialPosts
      ? [...initialPosts, formData]
      : [formData];
    console.log("Submitted Offer Data:", updatedPosts);
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
            posts: updatedPosts,
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

  const handleImageChange = (newImages: string[]) => {
    setImages(newImages);
    form.setValue("images", newImages);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-blue-600" />
                Tour Experience Details
              </h3>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="tourTitle">Experience Title</Label>
                      <Input
                        id="tourTitle"
                        placeholder="e.g. Hidden Gems of Barcelona"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="description">
                        Experience Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what travelers will experience on your tour..."
                        className="min-h-[120px]"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Experience Photos */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Camera className="mr-2 h-5 w-5 text-blue-600" />
                Experience Photos
              </h3>

              <UploadImagesForOffers
                initialImageUrl={[]}
                onImageChange={handleImageChange}
              />

              {/* Optional: Placeholder UI */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((item) => (
                  <div
                    key={item}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <img
                      src={item}
                      alt="Uploaded"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Add photos that showcase your experience. High-quality images
                attract more bookings.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="mt-4" variant="primary">
              <Sparkles className="mr-2 h-4 w-4" />
              Save Experience
            </Button>
          </div>
        </form>
      </Form>
      <ExperienceFeed />
    </div>
  );
}

export default Offers;
