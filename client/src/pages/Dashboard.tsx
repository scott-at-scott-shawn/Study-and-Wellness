import { useState, useEffect } from "react";
import { Play, Plus, Smile, Edit, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getReminders, updateReminder, getMoodEntries, saveMoodEntry } from "../lib/localStorage";
import { MOOD_EMOJIS, MoodType, LocalStorageReminder } from "../types";
import ReminderModal from "../components/ReminderModal";
import DiaryModal from "../components/DiaryModal";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  onShowSection: (section: string) => void;
}

export default function Dashboard({ onShowSection }: DashboardProps) {
  const [reminders, setReminders] = useState<LocalStorageReminder[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodType | "">("");
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = () => {
    const storedReminders = getReminders();
    const today = new Date().toDateString();
    const todayReminders = storedReminders.filter(r => 
      new Date(r.date).toDateString() === today
    );
    setReminders(todayReminders);
  };

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today.",
        variant: "destructive",
      });
      return;
    }

    saveMoodEntry(selectedMood);
    toast({
      title: "Mood saved!",
      description: "Keep tracking your emotional wellness.",
    });
    setSelectedMood("");
  };

  const handleReminderToggle = (id: string, completed: boolean) => {
    updateReminder(id, { completed });
    loadReminders();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'study-session': return 'border-study-primary bg-blue-50';
      case 'assignment-due': return 'border-study-secondary bg-green-50';
      case 'exam-prep': return 'border-study-accent bg-amber-50';
      case 'mental-health': return 'border-mental-primary bg-purple-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study-session': return 'text-study-primary';
      case 'assignment-due': return 'text-study-secondary';
      case 'exam-prep': return 'text-study-accent';
      case 'mental-health': return 'text-mental-primary';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-study-primary to-purple-600 rounded-2xl p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Good day! 🌟</h3>
        <p className="text-blue-100 mb-4">Ready to tackle your study goals today?</p>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-blue-100">Study Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">7</div>
            <div className="text-sm text-blue-100">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm text-blue-100">Weekly Goal</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="study-card cursor-pointer hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Play className="text-study-primary text-xl" />
              <span className="text-xs bg-study-primary/10 text-study-primary px-2 py-1 rounded-full">Quick</span>
            </div>
            <h4 className="font-medium text-gray-900">Start Study Session</h4>
            <p className="text-sm text-gray-500 mt-1">Begin focused study time</p>
          </CardContent>
        </Card>

        <Card className="study-card cursor-pointer hover:shadow-md transition-all" onClick={() => setIsReminderModalOpen(true)}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Plus className="text-study-secondary text-xl" />
              <span className="text-xs bg-study-secondary/10 text-study-secondary px-2 py-1 rounded-full">New</span>
            </div>
            <h4 className="font-medium text-gray-900">Add Reminder</h4>
            <p className="text-sm text-gray-500 mt-1">Set study reminders</p>
          </CardContent>
        </Card>

        <Card className="study-card cursor-pointer hover:shadow-md transition-all" onClick={() => onShowSection('mental-health')}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Smile className="text-mental-primary text-xl" />
              <span className="text-xs bg-mental-primary/10 text-mental-primary px-2 py-1 rounded-full">Mood</span>
            </div>
            <h4 className="font-medium text-gray-900">Mood Check-in</h4>
            <p className="text-sm text-gray-500 mt-1">Track your feelings</p>
          </CardContent>
        </Card>

        <Card className="study-card cursor-pointer hover:shadow-md transition-all" onClick={() => setIsDiaryModalOpen(true)}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Edit className="text-study-accent text-xl" />
              <span className="text-xs bg-study-accent/10 text-study-accent px-2 py-1 rounded-full">Write</span>
            </div>
            <h4 className="font-medium text-gray-900">Diary Entry</h4>
            <p className="text-sm text-gray-500 mt-1">Reflect on your day</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Reminders */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Reminders</h3>
            <Button 
              variant="ghost" 
              onClick={() => setIsReminderModalOpen(true)}
              className="text-study-primary hover:text-study-primary/80"
            >
              + Add New
            </Button>
          </div>
          <div className="space-y-3">
            {reminders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No reminders for today. Add one to get started!</p>
            ) : (
              reminders.map((reminder) => (
                <div key={reminder.id} className={`flex items-center p-3 rounded-lg border-l-4 ${getCategoryColor(reminder.category)}`}>
                  <input 
                    type="checkbox" 
                    checked={reminder.completed}
                    onChange={(e) => handleReminderToggle(reminder.id, e.target.checked)}
                    className="mr-3 h-4 w-4 text-study-primary rounded focus:ring-study-primary"
                  />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${reminder.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {reminder.title}
                    </p>
                    <p className="text-xs text-gray-500">Due: {reminder.time}</p>
                  </div>
                  <Clock className={`text-sm ${getCategoryIcon(reminder.category)}`} />
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mental Health Quick Check */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How are you feeling today?</h3>
        <div className="flex justify-center space-x-4 mb-4">
          {Object.entries(MOOD_EMOJIS).map(([mood, emoji]) => (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood as MoodType)}
              className={`mood-emoji text-4xl transition-all ${
                selectedMood === mood ? 'selected' : ''
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3">Your mood affects your learning. Let's track it together.</p>
          <Button 
            onClick={handleSaveMood}
            className="bg-mental-primary hover:bg-mental-primary/90 text-white"
          >
            Save Mood
          </Button>
        </div>
      </div>

      <ReminderModal 
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        onSaved={loadReminders}
      />

      <DiaryModal 
        isOpen={isDiaryModalOpen}
        onClose={() => setIsDiaryModalOpen(false)}
        onSaved={() => {}}
      />
    </div>
  );
}
