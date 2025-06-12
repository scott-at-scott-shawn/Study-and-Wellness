import { Home, Book, Lightbulb, Heart, Calendar } from "lucide-react";

interface MobileNavProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'study-materials', icon: Book, label: 'Materials' },
  { id: 'study-tips', icon: Lightbulb, label: 'Tips' },
  { id: 'mental-health', icon: Heart, label: 'Health' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
];

export default function MobileNav({ currentSection, onSectionChange }: MobileNavProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
      <div className="flex justify-around">
        {navigationItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id)}
            className={`flex flex-col items-center py-2 transition-colors ${
              currentSection === id ? 'text-study-primary' : 'text-gray-500'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
