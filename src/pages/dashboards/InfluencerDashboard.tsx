import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, DollarSign, Eye, MessageCircle, Clock, Star, Users, Zap } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const InfluencerDashboard = () => {
  useEffect(()=>{document.title = "Influencer Dashboard — HiveSphere"},[]);

  const mockActiveCampaigns = [
    {
      id: 1,
      title: "Summer Fashion Collection",
      brand: "Fashion Nova",
      avatar: "/placeholder.svg",
      budget: "₦50,000",
      deadline: "5 days left",
      status: "active",
      progress: 75,
      deliverables: "2 Posts + 3 Stories"
    },
    {
      id: 2,
      title: "Tech Product Review",
      brand: "TechCorp Nigeria",
      avatar: "/placeholder.svg",
      budget: "₦30,000",
      deadline: "3 days left",
      status: "pending_submission",
      progress: 90,
      deliverables: "1 Video Review"
    }
  ];

  const mockPendingInvites = [
    {
      id: 1,
      title: "Food Paradise Campaign",
      brand: "Food Paradise",
      avatar: "/placeholder.svg",
      budget: "₦40,000",
      deadline: "Apply by Dec 20",
      match: 92,
      deliverables: "3 Posts + 5 Stories"
    },
    {
      id: 2,
      title: "Fitness Challenge",
      brand: "FitLife Nigeria",
      avatar: "/placeholder.svg",
      budget: "₦25,000",
      deadline: "Apply by Dec 18",
      match: 87,
      deliverables: "1 Post + 2 Reels"
    }
  ];

  return (
    <DashboardLayout userRole="influencer">
      <main className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Welcome back, Jane!</h1>
            <p className="text-muted-foreground">Ready to grow your influence?</p>
          </div>
          <Link to="/dashboard/influencer/campaigns">
            <Button>
              <Eye className="h-4 w-4 mr-2" />
              Browse Campaigns
            </Button>
          </Link>
        </div>

        {/* Engagement Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month's Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₦80,000</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +25% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125K</div>
              <p className="text-xs text-green-600">+12% this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">Campaign completion</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Campaigns */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Campaigns</CardTitle>
                <Link to="/dashboard/influencer/campaigns">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockActiveCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={campaign.avatar} alt={campaign.brand} />
                      <AvatarFallback>{campaign.brand.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{campaign.title}</h3>
                      <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                    </div>
                    <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                      {campaign.status === "active" ? "Active" : "Pending"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      {campaign.budget}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {campaign.deadline}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all" 
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      {campaign.status === "active" ? "View Details" : "Submit Content"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {mockActiveCampaigns.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No active campaigns</p>
                  <Link to="/dashboard/influencer/campaigns">
                    <Button>Browse Available Campaigns</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pending Invites */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-600" />
                  Pending Invites
                </CardTitle>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  {mockPendingInvites.length} new
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Perfect matches for your profile</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockPendingInvites.map((invite) => (
                <div key={invite.id} className="p-4 bg-background border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={invite.avatar} alt={invite.brand} />
                      <AvatarFallback>{invite.brand.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{invite.title}</h3>
                      <p className="text-sm text-muted-foreground">{invite.brand}</p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {invite.match}% match
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      {invite.budget}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {invite.deadline}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{invite.deliverables}</p>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">Apply Now</Button>
                    <Button size="sm" variant="outline">Details</Button>
                  </div>
                </div>
              ))}
              
              {mockPendingInvites.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No pending invites</p>
                  <p className="text-sm text-muted-foreground">Complete your profile to get more invites</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">Grow your influence with these actions</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Update Portfolio</h3>
                <p className="text-sm text-muted-foreground mb-3">Add recent work to attract brands</p>
                <Link to="/dashboard/influencer/profile">
                  <Button size="sm" variant="outline">Update Now</Button>
                </Link>
              </div>
              
              <div className="p-4 border rounded-lg text-center">
                <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Browse Campaigns</h3>
                <p className="text-sm text-muted-foreground mb-3">Find campaigns that match your niche</p>
                <Link to="/dashboard/influencer/campaigns">
                  <Button size="sm" variant="outline">Browse Now</Button>
                </Link>
              </div>
              
              <div className="p-4 border rounded-lg text-center">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Check Messages</h3>
                <p className="text-sm text-muted-foreground mb-3">Respond to brand inquiries</p>
                <Link to="/dashboard/influencer/messages">
                  <Button size="sm" variant="outline">View Messages</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
};

export default InfluencerDashboard;
