import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Discover from "./pages/Discover";
import SignupInfluencer from "./pages/auth/SignupInfluencer";
import SignupBrand from "./pages/auth/SignupBrand";
import Register from "./pages/auth/Register";
import SignIn from "./pages/auth/SignIn";
import BrandDashboard from "./pages/dashboards/BrandDashboard";
import InfluencerDashboard from "./pages/dashboards/InfluencerDashboard";
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
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup-influencer" element={<SignupInfluencer />} />
          <Route path="/signup-brand" element={<SignupBrand />} />
          <Route path="/dashboard/brand" element={<BrandDashboard />} />
          <Route path="/dashboard/influencer" element={<InfluencerDashboard />} />
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
