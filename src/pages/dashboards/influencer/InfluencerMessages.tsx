import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Clock, Paperclip } from "lucide-react";
import { useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const InfluencerMessages = () => {
  useEffect(() => {
    document.title = "Messages — HiveSphere";
  }, []);

  const mockMessages = [
    {
      id: 1,
      brand: "Fashion Nova",
      avatar: "/placeholder.svg",
      lastMessage: "Great work on the campaign! When can you deliver the final posts?",
      time: "2 hours ago",
      unread: true,
      campaign: "Summer Fashion Collection",
      hasAttachment: false
    },
    {
      id: 2,
      brand: "TechCorp Nigeria",
      avatar: "/placeholder.svg",
      lastMessage: "Thanks for the proposal. We'd like to move forward with the collaboration.",
      time: "1 day ago",
      unread: false,
      campaign: "Tech Product Launch",
      hasAttachment: true
    },
    {
      id: 3,
      brand: "Food Paradise",
      avatar: "/placeholder.svg",
      lastMessage: "Hi! We love your content and would like to discuss a partnership.",
      time: "3 days ago",
      unread: false,
      campaign: "New Opportunity",
      hasAttachment: false
    }
  ];

  return (
    <DashboardLayout userRole="influencer">
      <main className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Messages</h1>
          <Badge variant="secondary">
            {mockMessages.filter(m => m.unread).length} unread
          </Badge>
        </div>

        <div className="space-y-3">
          {mockMessages.map((message) => (
            <Card 
              key={message.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                message.unread ? 'border-primary/50 bg-primary/5' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={message.avatar} alt={message.brand} />
                    <AvatarFallback>{message.brand.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold ${message.unread ? 'text-primary' : ''}`}>
                          {message.brand}
                        </h3>
                        {message.unread && (
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {message.hasAttachment && (
                          <Paperclip className="h-3 w-3" />
                        )}
                        <Clock className="h-3 w-3" />
                        <span>{message.time}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      Campaign: {message.campaign}
                    </p>
                    
                    <p className={`text-sm line-clamp-2 ${
                      message.unread ? 'font-medium' : 'text-muted-foreground'
                    }`}>
                      {message.lastMessage}
                    </p>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                      <Button size="sm" variant="ghost">
                        View Campaign
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockMessages.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
              <p className="text-muted-foreground mb-4">
                Start applying to campaigns to receive messages from brands
              </p>
              <Button>Browse Campaigns</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </DashboardLayout>
  );
};

export default InfluencerMessages;