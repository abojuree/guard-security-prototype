import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import ClientLogin from "@/pages/client/login";
import ClientRegistration from "@/pages/client/registration";
import ClientDashboard from "@/pages/client/dashboard";
import NewRequest from "@/pages/client/new-request";
import QuotesList from "@/pages/client/quotes-list";
import RequestSummary from "@/pages/client/request-summary";
import OrderHistory from "@/pages/client/order-history";
import ClientProfile from "@/pages/client/profile";
import ClientNotifications from "@/pages/client/notifications";
import GuardLogin from "@/pages/guard/login";
import GuardDashboard from "@/pages/guard/dashboard";
import GuardRegistration from "@/pages/guard/registration";
import ActiveRequests from "@/pages/guard/active-requests";
import GuardJobs from "@/pages/guard/jobs";
import GuardProfile from "@/pages/guard/profile";
import GuardNotifications from "@/pages/guard/notifications";
import GuardEarnings from "@/pages/guard/earnings";
import AdminDashboard from "@/pages/admin/dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/client/login" component={ClientLogin} />
      <Route path="/client/registration" component={ClientRegistration} />
      <Route path="/client/dashboard" component={ClientDashboard} />
      <Route path="/client/new-request" component={NewRequest} />
      <Route path="/client/request-summary/:requestId" component={RequestSummary} />
      <Route path="/client/quotes/:requestId" component={QuotesList} />
      <Route path="/client/quotes-list" component={QuotesList} />
      <Route path="/client/orders" component={OrderHistory} />
      <Route path="/client/notifications" component={ClientNotifications} />
      <Route path="/client/profile" component={ClientProfile} />
      <Route path="/guard/login" component={GuardLogin} />
      <Route path="/guard/dashboard" component={GuardDashboard} />
      <Route path="/guard/register" component={GuardRegistration} />
      <Route path="/guard/requests" component={ActiveRequests} />
      <Route path="/guard/jobs" component={GuardJobs} />
      <Route path="/guard/notifications" component={GuardNotifications} />
      <Route path="/guard/profile" component={GuardProfile} />
      <Route path="/guard/earnings" component={GuardEarnings} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 direction-rtl">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
