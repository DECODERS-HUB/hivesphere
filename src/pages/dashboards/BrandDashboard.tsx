import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Bell, DollarSign, Users, TrendingUp, Calendar, Eye, MessageCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const BrandDashboard = () => {
  useEffect(()=>{document.title = "Brand Dashboard — HiveSphere"},[]);

  const mockActiveCampaigns = [
    {
      id: 1,
      title: "Summer Fashion Collection",
      applicants: 12,
      budget: "₦200,000",
      deadline: "5 days left",
      status: "active"
    },
    {
      id: 2,
      title: "Tech Product Launch",
      applicants: 8,
      budget: "₦150,000",
      deadline: "10 days left",
      status: "active"
    }
  ];

  const mockPendingApplications = [
    {
      id: 1,
      influencer: "Jane Doe",
      campaign: "Summer Fashion Collection",
      avatar: "/placeholder.svg",
      followers: "12.5K",
      engagement: "6.2%",
      time: "2 hours ago"
    },
    {
      id: 2,
      influencer: "Tech Reviewer NG",
      campaign: "Tech Product Launch",
      avatar: "/placeholder.svg",
      followers: "45.2K",
      engagement: "4.8%",
      time: "5 hours ago"
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      message: "New application received for Summer Fashion Collection",
      time: "1 hour ago",
      type: "application"
    },
    {
      id: 2,
      message: "Campaign 'Tech Product Launch' is performing well",
      time: "3 hours ago",
      type: "performance"
    },
    {
      id: 3,
      message: "Payment processed for completed campaign",
      time: "1 day ago",
      type: "payment"
    }
  ];

  return (
    <DashboardLayout userRole="brand">
      <main className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Welcome back!</h1>
          <Link to="/campaigns/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Launch New Campaign
            </Button>
          </Link>
        </div>

        {/* Budget Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦350,000</div>
              <p className="text-xs text-muted-foreground">Across 2 campaigns</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-green-600">+1 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20</div>
              <p className="text-xs text-muted-foreground">12 new today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Performance</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-green-600">Above target</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Campaigns */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Campaigns</CardTitle>
                <Link to="/dashboard/brand/campaigns">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockActiveCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {campaign.applicants} applicants
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {campaign.budget}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {campaign.deadline}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Messages
                    </Button>
                  </div>
                </div>
              ))}
              {mockActiveCampaigns.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No active campaigns</p>
                  <Link to="/campaigns/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Campaign
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <Badge variant="secondary">{mockNotifications.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockNotifications.map((notification) => (
                <div key={notification.id} className="p-3 border rounded-lg">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Pending Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Influencer Applications</CardTitle>
              <Badge variant="secondary">{mockPendingApplications.length} pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPendingApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={application.avatar} alt={application.influencer} />
                      <AvatarFallback>{application.influencer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{application.influencer}</h3>
                      <p className="text-sm text-muted-foreground">{application.campaign}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                        <span>{application.followers} followers</span>
                        <span>{application.engagement} engagement</span>
                        <span>{application.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Review</Button>
                    <Button size="sm" variant="outline">View Profile</Button>
                  </div>
                </div>
              ))}
              {mockPendingApplications.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pending applications</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
};

export default BrandDashboard;
