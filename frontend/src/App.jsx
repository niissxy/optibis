import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ProtectedRoute from '@/components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { WorkspaceProvider } from '@/lib/evolis/WorkspaceContext';
import EvolisLayout from '@/components/evolis/EvolisLayout';
import Home from '@/pages/Home';
import Layanan from '@/pages/Layanan';
import Paket from '@/pages/Paket';
import Tentang from '@/pages/Tentang';
import DigitalAsset from '@/pages/DigitalAsset';
import WebsiteService from '@/pages/WebsiteService';
import DigitalGrowthTeam from '@/pages/DigitalGrowthTeam';
import PackageDetail from '@/pages/PackageDetail';
import ServiceDetail from '@/pages/ServiceDetail';
import PortofolioPage from '@/pages/PortofolioPage';
import PortfolioDetail from '@/pages/PortfolioDetail';
import ToolsPortfolio from '@/pages/ToolsPortfolio';
import SolutionLibrary from '@/pages/SolutionLibrary';
import SolutionLibraryDetail from '@/pages/SolutionLibraryDetail';
import MarketingKit from '@/pages/MarketingKit';
import Insight from '@/pages/Insight';
import EvolisOverview from '@/pages/evolis/EvolisOverview';
import EvolisBusinessDNA from '@/pages/evolis/EvolisBusinessDNA';
import EvolisProducts from '@/pages/evolis/EvolisProducts';
import EvolisAudiences from '@/pages/evolis/EvolisAudiences';
import EvolisObjectives from '@/pages/evolis/EvolisObjectives';
import EvolisCampaigns from '@/pages/evolis/EvolisCampaigns';
import EvolisAssets from '@/pages/evolis/EvolisAssets';
import EvolisPublishing from '@/pages/evolis/EvolisPublishing';
import EvolisLeads from '@/pages/evolis/EvolisLeads';
import EvolisPipeline from '@/pages/evolis/EvolisPipeline';
import EvolisAnalytics from '@/pages/evolis/EvolisAnalytics';
import EvolisRecommendations from '@/pages/evolis/EvolisRecommendations';
import EvolisAutomation from '@/pages/evolis/EvolisAutomation';
import EvolisGovernance from '@/pages/evolis/EvolisGovernance';
import EvolisBrief from '@/pages/evolis/EvolisBrief';
import EvolisSettings from '@/pages/evolis/EvolisSettings';
import ViralogPortal from '@/pages/viralog/ViralogPortal';
import ViralogDetail from '@/pages/viralog/ViralogDetail';
import ViralogCategory from '@/pages/viralog/ViralogCategory';
import ViralogSearch from '@/pages/viralog/ViralogSearch';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/lib/LanguageContext';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/layanan" element={<Layanan />} />
      <Route path="/paket" element={<Paket />} />
      <Route path="/tentang" element={<Tentang />} />
      <Route path="/digital-asset" element={<DigitalAsset />} />
      <Route path="/website" element={<WebsiteService />} />
      <Route path="/digital-growth-team" element={<DigitalGrowthTeam />} />
      <Route path="/paket/:pillarSlug/:packageSlug" element={<PackageDetail />} />
      <Route path="/layanan/:pillarSlug/:serviceSlug" element={<ServiceDetail />} />
      <Route path="/portofolio" element={<PortofolioPage />} />
      <Route path="/portofolio/:slug" element={<PortfolioDetail />} />
      <Route path="/tools" element={<ToolsPortfolio />} />
      <Route path="/solution-library" element={<SolutionLibrary />} />
      <Route path="/solution-library/:slug" element={<SolutionLibraryDetail />} />
      <Route path="/marketing-kit" element={<MarketingKit />} />
      <Route path="/insight" element={<Insight />} />
      <Route path="/content" element={<ViralogPortal />} />
      <Route path="/content/:slug" element={<ViralogDetail />} />
      <Route path="/trending" element={<ViralogPortal />} />
      <Route path="/short-video" element={<ViralogPortal />} />
      <Route path="/video" element={<ViralogPortal />} />
      <Route path="/kategori/:slug" element={<ViralogCategory />} />
      <Route path="/tag/:slug" element={<ViralogCategory />} />
      <Route path="/author/:slug" element={<ViralogCategory />} />
      <Route path="/search" element={<ViralogSearch />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<WorkspaceProvider><EvolisLayout /></WorkspaceProvider>}>
          <Route path="/app" element={<EvolisOverview />} />
          <Route path="/app/business-dna" element={<EvolisBusinessDNA />} />
          <Route path="/app/products" element={<EvolisProducts />} />
          <Route path="/app/audiences" element={<EvolisAudiences />} />
          <Route path="/app/objectives" element={<EvolisObjectives />} />
          <Route path="/app/campaigns" element={<EvolisCampaigns />} />
          <Route path="/app/assets" element={<EvolisAssets />} />
          <Route path="/app/publishing" element={<EvolisPublishing />} />
          <Route path="/app/leads" element={<EvolisLeads />} />
          <Route path="/app/pipeline" element={<EvolisPipeline />} />
          <Route path="/app/analytics" element={<EvolisAnalytics />} />
          <Route path="/app/recommendations" element={<EvolisRecommendations />} />
          <Route path="/app/automation" element={<EvolisAutomation />} />
          <Route path="/app/governance" element={<EvolisGovernance />} />
          <Route path="/app/brief" element={<EvolisBrief />} />
          <Route path="/app/settings" element={<EvolisSettings />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="optibis-theme">
      <LanguageProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClientInstance}>
            <Router>
              <ScrollToTop />
              <AuthenticatedApp />
            </Router>
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
