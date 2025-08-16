import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Heart, Users, TrendingUp, Instagram, Mail } from "lucide-react";
import { useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const BrandDiscovery = () => {
  useEffect(() => {
    document.title = "Creator Discovery — HiveSphere";
  }, []);

  const mockInfluencers = [
    {
      id: 1,
      name: "Jane Doe",
      handle: "@janedoe",
      avatar: "/placeholder.svg",
      niche: "Fashion & Lifestyle",
      location: "Lagos, Nigeria",
      followers: "12.5K",
      engagement: "6.2%",
      rating: 4.8,
      minRate: "₦25,000",
      verified: true,
      platforms: ["instagram", "youtube"]
    },
    {
      id: 2,
      name: "Tech Reviewer NG",
      handle: "@techreviewer_ng",
      avatar: "/placeholder.svg",
      niche: "Technology",
      location: "Abuja, Nigeria",
      followers: "45.2K",
      engagement: "4.8%",
      rating: 4.9,
      minRate: "₦75,000",
      verified: true,
      platforms: ["youtube", "instagram"]
    },
    {
      id: 3,
      name: "Foodie Adventures",
      handle: "@foodieadventures",
      avatar: "/placeholder.svg",
      niche: "Food & Travel",
      location: "Port Harcourt, Nigeria",
      followers: "8.9K",
      engagement: "7.1%",
      rating: 4.6,
      minRate: "₦15,000",
      verified: false,
      platforms: ["instagram"]
    }
  ];

  return (
    <DashboardLayout userRole="brand">
      <main className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Creator Discovery</h1>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search creators by name, niche, or location..." 
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Fashion
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Technology
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Food & Lifestyle
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Travel
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Beauty
          </Badge>
        </div>

        {/* Creator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockInfluencers.map((influencer) => (
            <Card key={influencer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={influencer.avatar} alt={influencer.name} />
                    <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{influencer.name}</h3>
                      {influencer.verified && (
                        <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {influencer.niche}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{influencer.location}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{influencer.followers}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>{influencer.engagement}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-3 w-3 rounded-full ${
                          i < Math.floor(influencer.rating) 
                            ? 'bg-yellow-400' 
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {influencer.rating}
                    </span>
                  </div>
                  <div className="text-sm font-medium">
                    {influencer.minRate}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {influencer.platforms.includes("instagram") && (
                    <Instagram className="h-4 w-4 text-muted-foreground" />
                  )}
                  {influencer.platforms.includes("youtube") && (
                    <div className="h-4 w-4 bg-red-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                      Y
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Invite
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline">Load More Creators</Button>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default BrandDiscovery;