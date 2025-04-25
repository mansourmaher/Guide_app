"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Heart, Star, MapPin, Globe, Compass } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import travel from "@/images/travel.jpg";

const trips = [
  {
    id: 1,
    name: "Cultural Immersion Tour",
    category: "adventure",
    price: 1299.99,
    rating: 4.8,
    image: travel,
    isNew: true,
  },
  {
    id: 2,
    name: "Historical City Walk",
    category: "culture",
    price: 899.99,
    rating: 4.9,
    image: travel,
    isNew: false,
  },
  {
    id: 3,
    name: "Mountain Trekking",
    category: "adventure",
    price: 1599.99,
    rating: 4.7,
    image: travel,
    isNew: true,
  },
  {
    id: 4,
    name: "Food & Market Tour",
    category: "food",
    price: 599.99,
    rating: 4.6,
    image: travel,
    isNew: false,
  },
  {
    id: 5,
    name: "Coastal Explorer",
    category: "nature",
    price: 1099.99,
    rating: 4.8,
    image: travel,
    isNew: true,
  },
  {
    id: 6,
    name: "Local Artisan Experience",
    category: "culture",
    price: 749.99,
    rating: 4.5,
    image: travel,
    isNew: false,
  },
];

function TripsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Trips", icon: <Globe className="h-4 w-4 mr-2" /> },
    { id: "adventure", name: "Adventure", icon: <Compass className="h-4 w-4 mr-2" /> },
    { id: "culture", name: "Culture", icon: <MapPin className="h-4 w-4 mr-2" /> },
    { id: "food", name: "Food", icon: <Heart className="h-4 w-4 mr-2" /> },
    { id: "nature", name: "Nature", icon: <Star className="h-4 w-4 mr-2" /> },
  ];

  const filteredTrips =
    activeCategory === "all"
      ? trips
      : trips.filter((trip) => trip.category === activeCategory);

  return (
    <section className="py-16 mt-[-100px] px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-center my-12 md:my-16 px-4 relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white/80 rounded-full"></div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-transparent bg-clip-text mb-4 inline-block relative"
            >
              Unforgettable Travel Experiences
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover authentic adventures with our local expert guides
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`rounded-full px-6 py-2 transition-all ${
                activeCategory === category.id
                  ? "bg-blue-600 hover:bg-blue-700 shadow-md"
                  : "hover:bg-blue-50 border-blue-200 text-blue-600"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button
                    className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
                    size="sm"
                    variant="default"
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-9 w-9 rounded-full shadow-sm hover:bg-white"
                  >
                    <Heart className="h-4 w-4 text-blue-600" />
                  </Button>
                  {trip.isNew && (
                    <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">
                      New
                    </Badge>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {trip.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {trip.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="font-bold text-lg text-gray-900">
                      $
                      {trip.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                      <span className="text-sm font-normal text-gray-500"> /person</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {trip.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            variant="outline"
            className="rounded-full px-8 py-5 border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            View All Trips
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default TripsSection;