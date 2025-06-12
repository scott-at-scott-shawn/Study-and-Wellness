import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { Bell, User } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export default function Layout({ children, currentSection, onSectionChange }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionTitles = {
    dashboard: 'Dashboard',
    'study-materials': 'Study Materials',
    'study-tips': 'Study Tips',
    'mental-health': 'Mental Health',
    calendar: 'Calendar'
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-bg">
      <Sidebar 
        currentSection={currentSection} 
        onSectionChange={onSectionChange}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-3 text-gray-500 hover:text-gray-700"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {sectionTitles[currentSection as keyof typeof sectionTitles] || 'StudyWell'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-study-primary transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse-gentle"></span>
              </button>
              <div className="w-8 h-8 bg-study-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>

      <MobileNav currentSection={currentSection} onSectionChange={onSectionChange} />
    </div>
  );
}
