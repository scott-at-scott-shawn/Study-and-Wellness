import { Home, Book, Lightbulb, Heart, Calendar, X } from "lucide-react";

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const navigationItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard', color: 'text-study-primary' },
  { id: 'study-materials', icon: Book, label: 'Study Materials', color: 'text-study-secondary' },
  { id: 'study-tips', icon: Lightbulb, label: 'Study Tips', color: 'text-study-accent' },
  { id: 'mental-health', icon: Heart, label: 'Mental Health', color: 'text-mental-primary' },
  { id: 'calendar', icon: Calendar, label: 'Calendar', color: 'text-neutral-text' },
];

export default function Sidebar({ currentSection, onSectionChange, isMobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-study-primary">StudyWell</h1>
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={onMobileClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map(({ id, icon: Icon, label, color }) => (
            <button
              key={id}
              onClick={() => {
                onSectionChange(id);
                onMobileClose();
              }}
              className={`
                sidebar-item w-full flex items-center px-4 py-2 text-sm font-medium text-left rounded-lg transition-all
                ${currentSection === id 
                  ? 'active bg-study-primary bg-opacity-15 text-gray-900 border-l-4 border-study-primary' 
                  : 'text-gray-600 hover:bg-study-primary hover:bg-opacity-10'
                }
              `}
            >
              <Icon className={`mr-3 w-5 h-5 ${currentSection === id ? 'text-study-primary' : color}`} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
