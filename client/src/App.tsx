import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LearningPath from "./pages/LearningPath";
import CourseDetail from "./pages/CourseDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import Certifications from "./pages/Certifications";
import Dashboard from "./pages/Dashboard";
import Updates from "./pages/Updates";
import Curiosities from "./pages/Curiosities";
import Library from "./pages/Library";
import Videos from "./pages/Videos";
import Specializations from "./pages/Specializations";
import InteractiveCertifications from "./pages/InteractiveCertifications";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import SavedExplanationsReview from "./pages/SavedExplanationsReview";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import PageTransitionLoader from "./components/PageTransitionLoader";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/learning-path"} component={LearningPath} />
      <Route path={"/course/:phase/:module"} component={CourseDetail} />
      <Route path={"/projects"} component={Projects} />
      <Route path={"/project/:id"} component={ProjectDetail} />
      <Route path={"/careers"} component={Careers} />
      <Route path={"/career/:id"} component={CareerDetail} />
      <Route path={"/certifications"} component={Certifications} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/updates"} component={Updates} />
      <Route path={"/curiosities"} component={Curiosities} />
      <Route path={"/library"} component={Library} />
      <Route path={"/videos"} component={Videos} />
      <Route path={"/specializations"} component={Specializations} />
      <Route path={"/interactive-certifications"} component={InteractiveCertifications} />
      <Route path={"/profile/public"} component={PublicProfile} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/saved-explanations"} component={SavedExplanationsReview} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navigation />
            <main className="flex-1 relative">
              <PageTransitionLoader />
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
