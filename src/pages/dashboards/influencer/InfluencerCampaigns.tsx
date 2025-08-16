import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, DollarSign, Eye } from "lucide-react";
import { useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const InfluencerCampaigns = () => {
  useEffect(() => {
    document.title = "Campaigns — HiveSphere";
  }, []);

  const mockCampaigns = [
    {
      id: 1,
      title: "Summer Fashion Collection",
      brand: "Fashion Nova",
      budget: "₦50,000",
      deadline: "5 days left",
      status: "applied",
      deliverables: "2 Posts + 3 Stories"
    },
    {
      id: 2,
      title: "Tech Product Launch",
      brand: "TechCorp Nigeria",
      budget: "₦75,000",
      deadline: "3 days left",
      status: "active",
      deliverables: "1 Video Review"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-yellow-100 text-yellow-800";
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout userRole="influencer">
      <main className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">My Campaigns</h1>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Browse Open
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{campaign.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{campaign.brand}</p>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{campaign.budget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{campaign.deadline}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Deliverables:</p>
                    <p className="text-sm font-medium">{campaign.deliverables}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      {campaign.status === "applied" ? "View Application" : "View Details"}
                    </Button>
                    {campaign.status === "active" && (
                      <Button size="sm" variant="outline">Submit Content</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="applied">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No applied campaigns found.</p>
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No active campaigns found.</p>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No completed campaigns found.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </DashboardLayout>
  );
};

export default InfluencerCampaigns;