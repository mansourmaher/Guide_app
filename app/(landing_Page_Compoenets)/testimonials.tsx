"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Globe, MapPin, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah & Mark",
    role: "Adventure Travelers",
    feedback:
      "Our trekking guide in Nepal was incredible! He showed us hidden trails and local villages we would never have found on our own. The cultural insights made this trip unforgettable.",
    img: "",
    rating: 5,
    icon: <Compass className="h-4 w-4 text-blue-500" />,
  },
  {
    name: "James",
    role: "Solo Explorer",
    feedback:
      "The food tour in Bangkok was a game-changer. Our guide took us to authentic street vendors and explained every dish's history. Best culinary experience of my life!",
    img: "",
    rating: 5,
    icon: <MapPin className="h-4 w-4 text-blue-500" />,
  },
  {
    name: "The Rodriguez Family",
    role: "Family Vacationers",
    feedback:
      "Our guide in Rome made history come alive for our kids. The private Colosseum tour was worth every penny - no queues and personalized stories!",
    img: "",
    rating: 5,
    icon: <Globe className="h-4 w-4 text-blue-500" />,
  },
  {
    name: "Emma",
    role: "Cultural Explorer",
    feedback:
      "The artisan workshops in Kyoto were magical. Learning traditional crafts directly from masters gave me such appreciation for Japanese culture.",
    img: "",
    rating: 4,
    icon: <MapPin className="h-4 w-4 text-blue-500" />,
  },
  {
    name: "David & Priya",
    role: "Honeymooners",
    feedback:
      "Our private boat tour in Santorini at sunset was the most romantic experience. The captain knew all the best secluded spots for swimming and photos!",
    img: "",
    rating: 5,
    icon: <Globe className="h-4 w-4 text-blue-500" />,
  },
];

function Testimonials() {
  const containerRef = useRef(null);

  return (
    <section className="mx-auto   overflow-hidden">
      <div className="px-4 md:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
            Traveler Stories
          </Badge>
          <h2 className="text-4xl font-bold text-slate-800">
            Adventures Loved Worldwide
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Real experiences from travelers who explored with our local guides.
          </p>
        </div>

        <div className="relative">
          <motion.div
            ref={containerRef}
            className="flex gap-6"
            initial={{ x: 0 }}
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {[...testimonials, ...testimonials].map((item, idx) => (
              <div
                key={idx}
                className="min-w-[300px] md:min-w-[400px] snap-center"
              >
                <Card className="h-full p-6 shadow-md border border-slate-100 transition-all hover:shadow-xl bg-white rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden relative">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover rounded-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <p className="text-sm text-slate-500">{item.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= item.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">{`"${item.feedback}"`}</p>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
