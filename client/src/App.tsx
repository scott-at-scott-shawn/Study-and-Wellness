import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import StudyMaterials from "./pages/StudyMaterials";
import StudyTips from "./pages/StudyTips";
import MentalHealth from "./pages/MentalHealth";
import Calendar from "./pages/Calendar";

function App() {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard onShowSection={setCurrentSection} />;
      case 'study-materials':
        return <StudyMaterials />;
      case 'study-tips':
        return <StudyTips />;
      case 'mental-health':
        return <MentalHealth />;
      case 'calendar':
        return <Calendar />;
      default:
        return <Dashboard onShowSection={setCurrentSection} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection}
        >
          {renderCurrentSection()}
        </Layout>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
