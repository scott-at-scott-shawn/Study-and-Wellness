import { Clock, Brain, Target, GraduationCap, ExternalLink, Video, Headphones, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudyTips() {
  const tipCategories = [
    {
      id: 'time-management',
      title: 'Time Management',
      icon: Clock,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      tips: [
        {
          title: 'Priority Matrix',
          description: 'Categorize tasks by urgency and importance to focus on what matters most.'
        },
        {
          title: 'Time Blocking',
          description: 'Allocate specific time slots for different subjects or activities.'
        },
        {
          title: 'Batch Similar Tasks',
          description: 'Group similar activities together to minimize context switching.'
        }
      ]
    },
    {
      id: 'memory-techniques',
      title: 'Memory Techniques',
      icon: Brain,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      tips: [
        {
          title: 'Spaced Repetition',
          description: 'Review material at increasing intervals to strengthen long-term memory.'
        },
        {
          title: 'Memory Palace',
          description: 'Associate information with familiar locations to create vivid mental maps.'
        },
        {
          title: 'Acronyms & Mnemonics',
          description: 'Create memorable phrases or abbreviations for complex information.'
        }
      ]
    },
    {
      id: 'focus-concentration',
      title: 'Focus & Concentration',
      icon: Target,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      tips: [
        {
          title: 'Eliminate Distractions',
          description: 'Create a dedicated study space free from noise and interruptions.'
        },
        {
          title: 'Active Learning',
          description: 'Engage with material through questions, discussions, and practice.'
        },
        {
          title: 'Mindfulness Break',
          description: 'Take short meditation breaks to reset your focus and reduce stress.'
        }
      ]
    },
    {
      id: 'exam-preparation',
      title: 'Exam Preparation',
      icon: GraduationCap,
      color: 'bg-red-100',
      iconColor: 'text-red-600',
      tips: [
        {
          title: 'Practice Tests',
          description: 'Simulate exam conditions with timed practice sessions.'
        },
        {
          title: 'Study Groups',
          description: 'Collaborate with peers to discuss concepts and share insights.'
        },
        {
          title: 'Review Schedule',
          description: 'Create a structured review plan leading up to the exam date.'
        }
      ]
    }
  ];

  const quickResources = [
    {
      title: 'Study Planner Template',
      description: 'Downloadable PDF',
      icon: ExternalLink,
      link: '#'
    },
    {
      title: 'Study Techniques Videos',
      description: 'YouTube Playlist',
      icon: Video,
      link: '#'
    },
    {
      title: 'Study Skills Podcast',
      description: 'Weekly Episodes',
      icon: Headphones,
      link: '#'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Study Tips & Advice</h3>
        <Button className="bg-study-accent hover:bg-study-accent/90">
          <Bookmark className="mr-2 h-4 w-4" />
          Save Favorites
        </Button>
      </div>

      {/* Featured Tip */}
      <div className="bg-gradient-to-r from-study-accent to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-xl font-bold mb-2">💡 Tip of the Day</h4>
            <p className="text-amber-100 mb-4">
              Use the Pomodoro Technique: Study for 25 minutes, then take a 5-minute break. 
              This helps maintain focus and prevents burnout.
            </p>
            <Button className="bg-white/20 text-white hover:bg-white/30">
              Try It Now
            </Button>
          </div>
          <div className="text-6xl opacity-20 ml-4">⏰</div>
        </div>
      </div>

      {/* Study Tips Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tipCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card key={category.id}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mr-3`}>
                    <IconComponent className={`${category.iconColor} text-xl`} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{category.title}</h4>
                </div>
                <div className="space-y-3">
                  {category.tips.map((tip, index) => (
                    <div key={index} className={`p-3 ${category.color.replace('100', '50')} rounded-lg`}>
                      <h5 className="font-medium text-gray-900 mb-1">{tip.title}</h5>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Resources */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Resources</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickResources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <a
                  key={index}
                  href={resource.link}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <IconComponent className="text-study-primary mr-3 h-5 w-5" />
                  <div>
                    <div className="font-medium text-gray-900">{resource.title}</div>
                    <div className="text-sm text-gray-500">{resource.description}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
