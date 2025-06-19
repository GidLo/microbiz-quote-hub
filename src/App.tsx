
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import CoveragePage from "./pages/CoveragePage";
import ContractorsAllRisk from "./pages/coverage/ContractorsAllRisk";
import PublicLiability from "./pages/coverage/PublicLiability";
import EventLiability from "./pages/coverage/EventLiability";
import QuotePage from "./pages/QuotePage";
import LoginPage from "./pages/LoginPage";
import CustomerPortal from "./pages/CustomerPortal";
import PolicyDetails from "./pages/PolicyDetails";
import UploadSchedulePage from "./pages/UploadSchedulePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Coverage Pages */}
              <Route path="/coverage/:type" element={<CoveragePage />} />
              <Route path="/coverage/contractors-all-risk" element={<ContractorsAllRisk />} />
              <Route path="/coverage/public-liability" element={<PublicLiability />} />
              <Route path="/coverage/event-liability" element={<EventLiability />} />
              
              {/* Quote Journey */}
              <Route path="/quote" element={<QuotePage />} />
              <Route path="/upload-schedule" element={<UploadSchedulePage />} />
              
              {/* Auth Pages */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Protected Routes */}
              <Route path="/customer-portal" element={
                <ProtectedRoute>
                  <CustomerPortal />
                </ProtectedRoute>
              } />
              <Route path="/policy/:id" element={
                <ProtectedRoute>
                  <PolicyDetails />
                </ProtectedRoute>
              } />
              
              {/* Catch-all for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
