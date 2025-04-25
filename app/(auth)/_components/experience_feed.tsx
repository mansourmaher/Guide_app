"use client"

import { useState } from "react"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Clock,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Sample data - in a real app, this would come from your API
const sampleExperiences = [
  {
    id: "1",
    guideId: "guide1",
    guideName: "Maria Lopez",
    guideAvatar: "/placeholder.svg?height=40&width=40",
    guideTitle: "Local Expert & Historian",
    title: "Hidden Gems of Barcelona",
    description:
      "Discover the secret spots and local favorites that most tourists never see. We'll explore narrow medieval streets, visit artisan workshops, and enjoy authentic tapas at my favorite local spots.",
    postedAt: "2 days ago",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    likes: 124,
    comments: 18,
    shares: 7,
    bookmarks: 32,
    location: "Barcelona, Spain",
    duration: "3 hours",
    groupSize: "Max 8 people",
    rating: 4.9,
    reviewCount: 87,
    tags: ["History", "Food", "Walking"],
  },
  {
    id: "2",
    guideId: "guide2",
    guideName: "Ahmed Hassan",
    guideAvatar: "/placeholder.svg?height=40&width=40",
    guideTitle: "Adventure Guide & Photographer",
    title: "Desert Safari & Stargazing Experience",
    description:
      "Join me for an unforgettable journey into the desert. We'll ride camels at sunset, enjoy a traditional Bedouin dinner, and stargaze under the clearest night skies you've ever seen.",
    postedAt: "5 hours ago",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    likes: 256,
    comments: 42,
    shares: 19,
    bookmarks: 78,
    location: "Sahara Desert, Morocco",
    duration: "Full day (12 hours)",
    groupSize: "Max 10 people",
    rating: 4.8,
    reviewCount: 124,
    tags: ["Adventure", "Nature", "Photography"],
  },
  {
    id: "3",
    guideId: "guide3",
    guideName: "Yuki Tanaka",
    guideAvatar: "/placeholder.svg?height=40&width=40",
    guideTitle: "Culinary Expert & Food Historian",
    title: "Tokyo Street Food Adventure",
    description:
      "Explore the vibrant street food scene of Tokyo with a local food expert. We'll visit hidden food stalls, try unique Japanese delicacies, and learn about the rich culinary history of each dish.",
    postedAt: "1 day ago",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    likes: 189,
    comments: 27,
    shares: 14,
    bookmarks: 56,
    location: "Tokyo, Japan",
    duration: "4 hours",
    groupSize: "Max 6 people",
    rating: 5.0,
    reviewCount: 93,
    tags: ["Food", "Culture", "Walking"],
  },
]

type Experience = (typeof sampleExperiences)[0]

export default function ExperienceFeed() {
  const [activeTab, setActiveTab] = useState("trending")

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <Tabs defaultValue="trending" className="w-full mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Discover Experiences</h2>
          <TabsList>
            <TabsTrigger value="trending" onClick={() => setActiveTab("trending")}>
              Trending
            </TabsTrigger>
            <TabsTrigger value="newest" onClick={() => setActiveTab("newest")}>
              Newest
            </TabsTrigger>
            <TabsTrigger value="following" onClick={() => setActiveTab("following")}>
              Following
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="trending" className="space-y-6">
          {sampleExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </TabsContent>

        <TabsContent value="newest" className="space-y-6">
          {/* In a real app, you would filter or sort differently here */}
          {sampleExperiences
            .slice()
            .reverse()
            .map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
        </TabsContent>

        <TabsContent value="following" className="space-y-6">
          {/* In a real app, this would show only experiences from guides the user follows */}
          <div className="text-center py-8">
            <p className="text-muted-foreground">Follow guides to see their experiences here</p>
            <Button variant="outline" className="mt-4">
              Discover guides to follow
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ExperienceCard({ experience }: { experience: Experience }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(experience.likes)
  const [bookmarkCount, setBookmarkCount] = useState(experience.bookmarks)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === experience.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? experience.images.length - 1 : prev - 1))
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    setBookmarkCount((prev) => (isBookmarked ? prev - 1 : prev + 1))
  }

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/10">
              <AvatarImage src={experience.guideAvatar || "/placeholder.svg"} alt={experience.guideName} />
              <AvatarFallback>{experience.guideName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{experience.guideName}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <span>{experience.guideTitle}</span>
                <span>•</span>
                <span>{experience.postedAt}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative aspect-video bg-muted">
          <img
            src={experience.images[currentImageIndex] || "/placeholder.svg"}
            alt={`${experience.title} - image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {experience.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full h-8 w-8"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full h-8 w-8"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {experience.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      idx === currentImageIndex ? "w-6 bg-primary" : "w-1.5 bg-background/80",
                    )}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute top-2 right-2 flex gap-1">
            {experience.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-background/80 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-3">{experience.description}</p>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="flex items-center gap-1 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="truncate">{experience.location}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span>{experience.groupSize}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium ml-1">{experience.rating}</span>
            </div>
            <span className="text-muted-foreground">({experience.reviewCount} reviews)</span>
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="p-2">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-9 px-2 gap-1" onClick={toggleLike}>
              <Heart className={cn("h-5 w-5", isLiked && "fill-red-500 text-red-500")} />
              <span>{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-9 px-2 gap-1">
              <MessageCircle className="h-5 w-5" />
              <span>{experience.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-9 px-2 gap-1">
              <Share2 className="h-5 w-5" />
              <span>{experience.shares}</span>
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="h-9 px-2 gap-1" onClick={toggleBookmark}>
            <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-primary text-primary")} />
            <span>{bookmarkCount}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
