import { Route, Routes } from "react-router-dom";
import FooterSection from "./components/footer";
import { ThemeProvider } from "./components/theme-provider";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import HeroHeader from "./components/hero9-header";
import ContactPage from "./pages/ContactPage";
import SolutionsPage from "./pages/SolutionsPage";
import WorksPage from "./pages/WorksPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import LoadingProvider from "./components/loading-provide";
import { Toaster } from "sonner";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <LoadingProvider companyName="ctrl bits">
        <HeroHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Toaster richColors />
      </LoadingProvider>
      <FooterSection />
    </ThemeProvider>
  );
};

export default App;
