import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TourCardProps {
  title: string;
  image: string;
  price: number;
  dateRange: string;
  rating: number;
  joinedCount: number;
}

export default function TourCard({
  title,
  image,
  price,
  dateRange,
  rating,
  joinedCount,
}: TourCardProps) {
  return (
    <Card className="w-full overflow-hidden">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4 bg-[#FF7849] text-white px-4 py-2 rounded-full font-semibold">
          ${price}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{title}</h2>

          <div className="flex items-center gap-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-gray-600">{dateRange}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xl font-semibold">{rating}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, index) => (
                <Avatar key={index} className="border-2 border-white w-8 h-8">
                  <AvatarImage
                    src={`/placeholder.svg?height=32&width=32`}
                    alt={`Person ${index + 1}`}
                  />
                </Avatar>
              ))}
            </div>
            <span className="text-gray-600">{joinedCount} Person Joined</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
