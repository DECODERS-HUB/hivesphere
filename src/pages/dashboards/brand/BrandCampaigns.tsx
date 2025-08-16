import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, CalendarDays, Users, DollarSign } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

const BrandCampaigns = () => {
  useEffect(() => {
    document.title = "Campaigns — HiveSphere";
  }, []);

  const mockCampaigns = [
    {
      id: 1,
      title: "Summer Fashion Collection",
      status: "active",
      budget: "₦200,000",
      applicants: 12,
      deadline: "5 days left",
      deliverables: "2 Posts + 3 Stories",
      description: "Promote our new summer collection targeting young professionals."
    },
    {
      id: 2,
      title: "Tech Product Launch",
      status: "draft",
      budget: "₦150,000",
      applicants: 0,
      deadline: "Not published",
      deliverables: "1 Video Review",
      description: "Unboxing and review of our latest smartphone model."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "draft": return "bg-gray-100 text-gray-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout userRole="brand">
      <main className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">My Campaigns</h1>
          <Link to="/campaigns/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{campaign.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {campaign.description}
                      </p>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{campaign.budget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{campaign.applicants} applicants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{campaign.deadline}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Deliverables:</p>
                    <p className="text-sm font-medium">{campaign.deliverables}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    {campaign.status === "active" && (
                      <Button size="sm" variant="outline">
                        View Applicants
                      </Button>
                    )}
                    {campaign.status === "draft" && (
                      <Button size="sm" variant="outline">
                        Publish
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No active campaigns found.</p>
            </div>
          </TabsContent>

          <TabsContent value="draft">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No draft campaigns found.</p>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No completed campaigns found.</p>
            </div>
          </TabsContent>

          <TabsContent value="paused">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No paused campaigns found.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </DashboardLayout>
  );
};

export default BrandCampaigns;