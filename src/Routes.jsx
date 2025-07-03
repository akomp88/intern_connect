import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Dashboard from "pages/dashboard";
import ActivityFeed from "pages/activity-feed";
import ConnectionHub from "pages/connection-hub";
import QuestionBoard from "pages/question-board";
import ProgramItinerary from "pages/program-itinerary";
import AmbassadorPortal from "pages/ambassador-portal";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter basename="/intern_connect">
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/activity-feed" element={<ActivityFeed />} />
        <Route path="/connection-hub" element={<ConnectionHub />} />
        <Route path="/question-board" element={<QuestionBoard />} />
        <Route path="/program-itinerary" element={<ProgramItinerary />} />
        <Route path="/ambassador-portal" element={<AmbassadorPortal />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;