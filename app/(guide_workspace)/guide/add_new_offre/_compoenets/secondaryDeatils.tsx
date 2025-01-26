"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag, Users } from "lucide-react";
import OffreTags from "./tags";
import { table } from "console";

function OffreSeconaryDeatils({ onSecondaryDetailsChange }: any) {
  const updateSecondaryDetails = () => {
    const data = form.getValues();
    onSecondaryDetailsChange(data);
  };
  const schema = z.object({
    price: z.number().min(0, { message: "Price must be greater than 0" }),
    number_of_places: z
      .number()
      .min(0, { message: "Number of places must be greater than 0" }),
    category: z.string().min(1, { message: "Please select a category" }),
    tags: z.array(z.string()),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      price: 0,
      number_of_places: 0,
      category: "",
      tags: [],
    },
  });

  const onsubmit = async (values: z.infer<typeof schema>) => {};
  const onTagsAdd = (Tag: string) => {
    form.setValue("tags", [...form.getValues("tags"), Tag]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Offer Details
        </CardTitle>
        <p className="text-sm text-gray-500">
          Provide details about the offer to attract more tourists.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="space-y-4"
            onChange={updateSecondaryDetails}
          >
            {/* Price Field */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="price">Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5">$</span>
                        <Input
                          id="price"
                          type="number"
                          className="pl-7"
                          placeholder="99.99"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.price?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="number_of_places"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="number_of_places">
                      Place Available
                    </FormLabel>
                    <FormControl>
                      <div className="relative px-2 ">
                        <span className="absolute left-4 top-2.5">
                          <Users size={16} />
                        </span>
                        <Input
                          id="price"
                          type="number"
                          className="pl-7"
                          placeholder="Number of places"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.number_of_places?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <Separator />

            {/* Difficulty Level Field */}

            {/* Category Field */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        // defaultValue={courseDetail?.category!}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="programming">
                            Programming
                          </SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.category?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <Separator />

            {/* Certificate Field */}
            <OffreTags onTagsAdd={onTagsAdd} updateSecondaryDetails={updateSecondaryDetails} />
          </form>
        </Form>
      </CardContent>
      {/* <CardFooter>
        <Button
          className="ml-auto"
          variant="primary"
          size="sm"
          onClick={form.handleSubmit(onsubmit)}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter> */}
    </Card>
  );
}

export default OffreSeconaryDeatils;
