"use client";
import {
  Card,
  CardContent,
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
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import OffreTags from "./tags";
import { cn } from "@/lib/utils";
import React from "react";

// Define props interface
interface OffreSeconaryDeatilsProps {
  onSecondaryDetailsChange: (data: any) => void;
  initialValues?: {
    price?: number;
    number_of_places?: number;
    category?: string;
    tags?: string[];
    startDate?: Date;
    endDate?: Date;
  };
}

const schema = z.object({
  price: z.number().min(0, { message: "Price must be greater than 0" }),
  number_of_places: z
    .number()
    .min(0, { message: "Number of places must be greater than 0" }),
  category: z.string().min(1, { message: "Please select a category" }),
  tags: z.array(z.string()),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
});

function OffreSeconaryDeatils({ 
  onSecondaryDetailsChange,
  initialValues 
}: OffreSeconaryDeatilsProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      price: initialValues?.price || 0,
      number_of_places: initialValues?.number_of_places || 0,
      category: initialValues?.category || "",
      tags: initialValues?.tags || [],
      startDate: initialValues?.startDate || new Date(),
      endDate: initialValues?.endDate || new Date(),
    },
  });

  // Watch all fields and call onSecondaryDetailsChange when they change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onSecondaryDetailsChange(value);
    });
    return () => subscription.unsubscribe();
  }, [form, onSecondaryDetailsChange]);

  const onTagsAdd = (tag: string) => {
    const currentTags = form.getValues("tags");
    form.setValue("tags", [...currentTags, tag]);
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
          <form className="space-y-4">
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const startDate = form.getValues("startDate");
                            return date < (startDate || new Date());
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                          value={field.value}
                          onChange={(e) => {
                            const value = e.target.valueAsNumber || 0;
                            field.onChange(value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
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
                      Places Available
                    </FormLabel>
                    <FormControl>
                      <div className="relative px-2">
                        <span className="absolute left-4 top-2.5">
                          <Users size={16} />
                        </span>
                        <Input
                          id="number_of_places"
                          type="number"
                          className="pl-7"
                          placeholder="Number of places"
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            const value = e.target.valueAsNumber || 0;
                            field.onChange(value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Historical & Cultural Tours">
                            Historical & Cultural Tours
                          </SelectItem>
                          <SelectItem value="Food & Culinary Tours">
                            Food & Culinary Tours
                          </SelectItem>
                          <SelectItem value="Adventure & Outdoor Tours">
                            Adventure & Outdoor Tours
                          </SelectItem>
                          <SelectItem value="Wildlife & Nature Tours">
                            Wildlife & Nature Tours
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />

            <OffreTags
              onTagsAdd={onTagsAdd}
              initialTags={form.watch("tags")}
              updateSecondaryDetails={() => {
                form.setValue("tags", form.getValues("tags"));
              }}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default OffreSeconaryDeatils;