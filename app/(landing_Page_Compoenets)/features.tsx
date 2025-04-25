"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, MapPin, Smile, Globe, Headset } from "lucide-react";

const features = [
  {
    title: "Local Experts",
    description:
      "Guides with deep knowledge of hidden gems and cultural insights",
    icon: <MapPin className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Verified Guides",
    description: "Background-checked professionals for your safety",
    icon: <ShieldCheck className="h-5 w-5" />,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Flexible Trips",
    description: "Customizable itineraries based on your preferences",
    icon: <Globe className="h-5 w-5" />,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "24/7 Support",
    description: "Assistance whenever you need it, day or night",
    icon: <Headset className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Authentic Experiences",
    description: "Engage with local culture and communities",
    icon: <Smile className="h-5 w-5" />,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Eco-Friendly Options",
    description: "Sustainable travel choices for a greener planet",
    icon: <Globe className="h-5 w-5" />,
    color: "bg-teal-100 text-teal-600",
  },
  {
    title: "Easy Booking",
    description: "Simple and secure booking process",
    icon: <Globe className="h-5 w-5" />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Local Cuisine",
    description: "Taste authentic dishes with local guides",
    icon: <Globe className="h-5 w-5" />,
    color: "bg-red-100 text-red-600",
  },
];

function Features() {
  return (
    <section className="py-16 md:py-16">
      <div className=" px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-600 hover:bg-blue-200">
            <Smile className="h-4 w-4 mr-2" />
            Why Travelers Love Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unforgettable Travel Experiences
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by adventurers worldwide for authentic local guidance
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-8 border border-gray-100 hover:shadow-md transition-all">
                <div
                  className={`w-14 h-14 rounded-lg ${feature.color} flex items-center justify-center mb-5`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
      </div>
    </section>
  );
}

export default Features;
