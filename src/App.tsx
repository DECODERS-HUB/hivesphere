import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import Discover from "./pages/Discover";
import Register from "./pages/auth/Register";
import SignIn from "./pages/auth/SignIn";
import BrandDashboard from "./pages/dashboards/BrandDashboard";
import InfluencerDashboard from "./pages/dashboards/InfluencerDashboard";
import BrandCampaigns from "./pages/dashboards/brand/BrandCampaigns";
import BrandDiscovery from "./pages/dashboards/brand/BrandDiscovery";
import BrandAnalytics from "./pages/dashboards/brand/BrandAnalytics";
import BrandProfile from "./pages/dashboards/brand/BrandProfile";
import InfluencerCampaigns from "./pages/dashboards/influencer/InfluencerCampaigns";
import InfluencerEarnings from "./pages/dashboards/influencer/InfluencerEarnings";
import InfluencerMessages from "./pages/dashboards/influencer/InfluencerMessages";
import InfluencerProfile from "./pages/dashboards/influencer/InfluencerProfile";
import NewCampaign from "./pages/campaigns/NewCampaign";
import Messages from "./pages/Messages";
import Feed from "./pages/Feed";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Header /><Index /></>} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard/brand" element={<BrandDashboard />} />
          <Route path="/dashboard/brand/campaigns" element={<BrandCampaigns />} />
          <Route path="/dashboard/brand/discovery" element={<BrandDiscovery />} />
          <Route path="/dashboard/brand/analytics" element={<BrandAnalytics />} />
          <Route path="/dashboard/brand/profile" element={<BrandProfile />} />
          <Route path="/dashboard/influencer" element={<InfluencerDashboard />} />
          <Route path="/dashboard/influencer/campaigns" element={<InfluencerCampaigns />} />
          <Route path="/dashboard/influencer/earnings" element={<InfluencerEarnings />} />
          <Route path="/dashboard/influencer/messages" element={<InfluencerMessages />} />
          <Route path="/dashboard/influencer/profile" element={<InfluencerProfile />} />
          <Route path="/campaigns/new" element={<NewCampaign />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
