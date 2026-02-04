import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "./components/theme-provider";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SolutionsPage from "./pages/SolutionsPage";
import WorksPage from "./pages/WorksPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoadingProvider from "./components/loading-provide";
import { Toaster } from "sonner";
import TermsAndConditions from "./pages/TermsPage";
import PrivacyPolicy from "./pages/PrivacyPage";
import Layout from "./components/shared/layout";
import "@/App.css";

const App = () => {
  return (
    <>
      <Helmet>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B3Z5X0ZL4B"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B3Z5X0ZL4B');
            `,
          }}
        />
      </Helmet>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <LoadingProvider companyName="Ctrl Bits">
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/portfolio" element={<WorksPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Toaster richColors />
          </Layout>
        </LoadingProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
