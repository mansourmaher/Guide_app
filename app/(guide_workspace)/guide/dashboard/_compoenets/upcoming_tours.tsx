"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, MoreHorizontal, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function UpcomingTours() {
  const [view, setView] = useState("list")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Tours</CardTitle>
            <CardDescription>Your scheduled tours for the next 2 weeks</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={view === "list" ? "secondary" : "ghost"} size="sm" onClick={() => setView("list")}>
              List
            </Button>
            <Button variant={view === "calendar" ? "secondary" : "ghost"} size="sm" onClick={() => setView("calendar")}>
              Calendar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TourCard
            title="Kyoto Cultural Tour"
            date="May 15, 2023"
            time="9:00 AM - 5:00 PM"
            location="Kyoto, Japan"
            clients={8}
            status="confirmed"
            image="/placeholder.svg?height=60&width=60"
          />

          <TourCard
            title="Tokyo City Exploration"
            date="May 18, 2023"
            time="10:00 AM - 6:00 PM"
            location="Tokyo, Japan"
            clients={12}
            status="confirmed"
            image="/placeholder.svg?height=60&width=60"
          />

          <TourCard
            title="Mount Fuji Hike"
            date="May 22, 2023"
            time="7:00 AM - 4:00 PM"
            location="Mount Fuji, Japan"
            clients={6}
            status="pending"
            image="/placeholder.svg?height=60&width=60"
          />

          <TourCard
            title="Osaka Food Tour"
            date="May 25, 2023"
            time="11:00 AM - 3:00 PM"
            location="Osaka, Japan"
            clients={10}
            status="confirmed"
            image="/placeholder.svg?height=60&width=60"
          />
        </div>
      </CardContent>
    </Card>
  )
}

function TourCard({ title, date, time, location, clients, status, image }:any) {
  return (
    <div className="flex items-center p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="mr-4">
        <Avatar className="h-14 w-14 rounded-md">
          <AvatarImage src={image || "/placeholder.svg"} alt={title} className="object-cover" />
          <AvatarFallback className="rounded-md">{title.substring(0, 2)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{title}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>{date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>{clients} clients</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={status === "confirmed" ? "default" : "outline"}>
              {status === "confirmed" ? "Confirmed" : "Pending"}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Tour</DropdownMenuItem>
                <DropdownMenuItem>Contact Clients</DropdownMenuItem>
                <DropdownMenuItem>Cancel Tour</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
