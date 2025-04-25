"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ClientOverview() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Client Overview</CardTitle>
            <CardDescription>Manage your tour clients</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search clients..."
                className="pl-8 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="sm">Add Client</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming Tours</TabsTrigger>
            <TabsTrigger value="all">All Clients</TabsTrigger>
            <TabsTrigger value="vip">VIP Clients</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ClientCard
                name="Emma Thompson"
                email="emma@example.com"
                tour="Kyoto Cultural Tour"
                date="May 15"
                preferences={["Photography", "History", "Local Food"]}
                image="/placeholder.svg?height=40&width=40"
              />

              <ClientCard
                name="James Wilson"
                email="james@example.com"
                tour="Kyoto Cultural Tour"
                date="May 15"
                preferences={["Architecture", "Shopping"]}
                image="/placeholder.svg?height=40&width=40"
              />

              <ClientCard
                name="Sophia Chen"
                email="sophia@example.com"
                tour="Tokyo City Exploration"
                date="May 18"
                preferences={["Technology", "Anime", "Street Food"]}
                image="/placeholder.svg?height=40&width=40"
                vip={true}
              />

              <ClientCard
                name="Michael Brown"
                email="michael@example.com"
                tour="Tokyo City Exploration"
                date="May 18"
                preferences={["History", "Photography"]}
                image="/placeholder.svg?height=40&width=40"
              />

              <ClientCard
                name="Olivia Martinez"
                email="olivia@example.com"
                tour="Mount Fuji Hike"
                date="May 22"
                preferences={["Hiking", "Nature", "Adventure"]}
                image="/placeholder.svg?height=40&width=40"
                vip={true}
              />

              <ClientCard
                name="Daniel Kim"
                email="daniel@example.com"
                tour="Mount Fuji Hike"
                date="May 22"
                preferences={["Photography", "Hiking"]}
                image="/placeholder.svg?height=40&width=40"
              />
            </div>
          </TabsContent>

          <TabsContent value="all" className="m-0">
            <div className="text-center py-8 text-muted-foreground">
              Switch to the "Upcoming Tours" tab to see clients
            </div>
          </TabsContent>

          <TabsContent value="vip" className="m-0">
            <div className="text-center py-8 text-muted-foreground">
              Switch to the "Upcoming Tours" tab to see clients
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ClientCard({ name, email, tour, date, preferences, image, vip = false }:any) {
  return (
    <div className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={image || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium flex items-center">
              {name}
              {vip && (
                <span className="ml-2 px-1.5 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500 rounded">
                  VIP
                </span>
              )}
            </h4>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          Contact
        </Button>
      </div>

      <div className="text-sm">
        <p className="flex justify-between">
          <span className="text-muted-foreground">Tour:</span>
          <span className="font-medium">{tour}</span>
        </p>
        <p className="flex justify-between mt-1">
          <span className="text-muted-foreground">Date:</span>
          <span>{date}</span>
        </p>
      </div>

      <div className="mt-3">
        <p className="text-xs text-muted-foreground mb-1.5">Preferences:</p>
        <div className="flex flex-wrap gap-1">
          {preferences.map((pref:any, index:any) => (
            <span key={index} className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800">
              {pref}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
