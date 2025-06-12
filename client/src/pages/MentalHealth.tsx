import { useState, useEffect } from "react";
import { Download, Plus, Search, Leaf, Brain, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDiaryEntries, getMoodEntries, searchDiaryEntries, exportDiaryEntries } from "../lib/localStorage";
import { MOOD_EMOJIS, LocalStorageDiaryEntry, LocalStorageMoodEntry } from "../types";
import DiaryModal from "../components/DiaryModal";
import { format } from "date-fns";

export default function MentalHealth() {
  const [diaryEntries, setDiaryEntries] = useState<LocalStorageDiaryEntry[]>([]);
  const [moodEntries, setMoodEntries] = useState<LocalStorageMoodEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = searchDiaryEntries(searchQuery);
      setDiaryEntries(filtered);
    } else {
      setDiaryEntries(getDiaryEntries());
    }
  }, [searchQuery]);

  const loadData = () => {
    setDiaryEntries(getDiaryEntries());
    setMoodEntries(getMoodEntries());
  };

  const getWeekMoods = () => {
    const lastWeek = moodEntries.slice(0, 7);
    const days = ['Today', 'Yesterday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday', 'Saturday'];
    
    return days.map((day, index) => ({
      day,
      mood: lastWeek[index] ? MOOD_EMOJIS[lastWeek[index].mood as keyof typeof MOOD_EMOJIS] : '😐'
    }));
  };

  const getMoodInsights = () => {
    if (moodEntries.length === 0) return { mostCommon: 'No data', trend: 'No data', bestDay: 'No data' };
    
    const moodCounts = moodEntries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostCommon = Object.entries(moodCounts).sort(([,a], [,b]) => b - a)[0];
    
    return {
      mostCommon: mostCommon ? `${mostCommon[0]} (${Math.round((mostCommon[1] / moodEntries.length) * 100)}%)` : 'No data',
      trend: 'Positive trend',
      bestDay: 'Weekends'
    };
  };

  const mentalHealthResources = [
    {
      title: 'Breathing Exercises',
      description: '5-minute guided breathing sessions',
      icon: Leaf,
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      buttonColor: 'text-indigo-600 hover:text-indigo-800'
    },
    {
      title: 'Mindfulness',
      description: 'Daily mindfulness practices',
      icon: Brain,
      color: 'bg-teal-50',
      iconColor: 'text-teal-600',
      buttonColor: 'text-teal-600 hover:text-teal-800'
    },
    {
      title: 'Self-Care Tips',
      description: 'Daily self-care reminders',
      icon: Heart,
      color: 'bg-pink-50',
      iconColor: 'text-pink-600',
      buttonColor: 'text-pink-600 hover:text-pink-800'
    }
  ];

  const stressManagementTips = {
    quickRelief: [
      'Take 5 deep breaths',
      'Step outside for fresh air',
      'Listen to calming music',
      'Practice gratitude'
    ],
    warningSigns: [
      'Difficulty concentrating',
      'Feeling overwhelmed',
      'Physical tension',
      'Irritability'
    ]
  };

  const weekMoods = getWeekMoods();
  const insights = getMoodInsights();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Mental Health & Wellbeing</h3>
        <Button onClick={exportDiaryEntries} className="bg-mental-primary hover:bg-mental-primary/90">
          <Download className="mr-2 h-4 w-4" />
          Export Diary
        </Button>
      </div>

      {/* Mood Tracker */}
      <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-2xl p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-4">Mood Tracker</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-900 mb-3">This Week's Mood</h5>
            <div className="space-y-2">
              {weekMoods.map(({ day, mood }, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{day}</span>
                  <span className="text-2xl">{mood}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Mood Insights</h5>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Most common: {insights.mostCommon}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Trending: {insights.trend}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Best day: {insights.bestDay}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diary Entries */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Diary Entries</h4>
            <Button onClick={() => setIsDiaryModalOpen(true)} className="bg-mental-primary hover:bg-mental-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </div>
          
          {/* Search Diary */}
          <div className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search diary entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-4">
            {diaryEntries.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No diary entries yet</h3>
                <p className="text-gray-500 mb-4">Start journaling to track your thoughts and feelings.</p>
                <Button onClick={() => setIsDiaryModalOpen(true)} className="bg-mental-primary hover:bg-mental-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Write Your First Entry
                </Button>
              </div>
            ) : (
              diaryEntries.map((entry) => {
                const moodColor = {
                  'great': 'border-mental-primary bg-purple-50',
                  'good': 'border-blue-400 bg-blue-50',
                  'okay': 'border-gray-400 bg-gray-50',
                  'down': 'border-amber-400 bg-amber-50',
                  'stressed': 'border-red-400 bg-red-50'
                }[entry.mood] || 'border-gray-400 bg-gray-50';

                return (
                  <div key={entry.id} className={`p-4 rounded-lg border-l-4 ${moodColor}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{entry.title}</h5>
                      <span className="text-sm text-gray-500">
                        {format(new Date(entry.date), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2 line-clamp-3">{entry.content}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-4">Mood: {MOOD_EMOJIS[entry.mood as keyof typeof MOOD_EMOJIS]}</span>
                      <span>{Math.ceil(entry.content.split(' ').length / 200)} min read</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mental Health Resources */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Mental Health Resources</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentalHealthResources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <div key={index} className={`p-4 ${resource.color} rounded-lg text-center`}>
                  <IconComponent className={`${resource.iconColor} text-2xl mb-2 mx-auto`} />
                  <h5 className="font-medium text-gray-900 mb-1">{resource.title}</h5>
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  <button className={`text-sm font-medium ${resource.buttonColor}`}>
                    Start Session
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stress Management */}
      <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Stress Management</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Quick Stress Relief</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              {stressManagementTips.quickRelief.map((tip, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Signs You Need a Break</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              {stressManagementTips.warningSigns.map((sign, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  {sign}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <DiaryModal 
        isOpen={isDiaryModalOpen}
        onClose={() => setIsDiaryModalOpen(false)}
        onSaved={loadData}
      />
    </div>
  );
}
