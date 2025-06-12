import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week');

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const isCurrentMonth = currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
    
    const days = [];
    
    // Previous month's trailing days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${daysInPrevMonth - i}`} className="aspect-square p-2 text-center text-sm text-gray-400">
          {daysInPrevMonth - i}
        </div>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === today.getDate();
      const hasEvent = [1, 2, 5, 7, 9, 12, 15, 18, 19, 20, 22].includes(day); // Mock events
      
      days.push(
        <div
          key={day}
          className={`aspect-square p-2 text-center text-sm cursor-pointer transition-colors relative
            ${isToday 
              ? 'bg-study-primary text-white rounded-lg' 
              : 'text-gray-900 hover:bg-gray-100 rounded-lg'
            }`}
        >
          {day}
          {hasEvent && (
            <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full
              ${isToday ? 'bg-white' : 'bg-study-primary'}
            `} />
          )}
        </div>
      );
    }
    
    return days;
  };

  const todaySchedule = [
    {
      time: '2:00 PM',
      title: 'Math Study Session',
      description: 'Review Chapter 5 - Calculus',
      category: 'study',
      color: 'border-study-primary bg-blue-50'
    },
    {
      time: '4:30 PM',
      title: 'History Essay',
      description: 'Submit final draft',
      category: 'task',
      color: 'border-study-secondary bg-green-50'
    },
    {
      time: '8:00 PM',
      title: 'Evening Reflection',
      description: 'Diary entry and mood check',
      category: 'wellbeing',
      color: 'border-mental-primary bg-purple-50'
    }
  ];

  const getCategoryTag = (category: string) => {
    switch (category) {
      case 'study': return { label: 'Study', className: 'bg-study-primary text-white' };
      case 'task': return { label: 'Task', className: 'bg-study-secondary text-white' };
      case 'wellbeing': return { label: 'Wellbeing', className: 'bg-mental-primary text-white' };
      default: return { label: 'Event', className: 'bg-gray-500 text-white' };
    }
  };

  const legend = [
    { label: 'Study Sessions', color: 'bg-study-primary' },
    { label: 'Completed Tasks', color: 'bg-study-secondary' },
    { label: 'Reminders', color: 'bg-study-accent' },
    { label: 'Diary Entries', color: 'bg-mental-primary' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Calendar View</h3>
        <div className="flex items-center space-x-2">
          <Button 
            variant={viewMode === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('month')}
          >
            Month
          </Button>
          <Button 
            variant={viewMode === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('week')}
            className="bg-study-primary hover:bg-study-primary/90"
          >
            Week
          </Button>
          <Button 
            variant={viewMode === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('day')}
          >
            Day
          </Button>
        </div>
      </div>

      {/* Calendar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h4>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                onClick={goToToday}
                className="bg-study-primary hover:bg-study-primary/90"
              >
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarGrid()}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Legend */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {legend.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 ${item.color} rounded-full mr-2`} />
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h4>
          <div className="space-y-3">
            {todaySchedule.map((event, index) => {
              const tag = getCategoryTag(event.category);
              return (
                <div key={index} className={`flex items-center p-3 rounded-lg border-l-4 ${event.color}`}>
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="text-sm font-medium text-gray-900">{event.time}</div>
                  </div>
                  <div className="flex-1 ml-3">
                    <h5 className="font-medium text-gray-900">{event.title}</h5>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`text-xs px-2 py-1 rounded-full ${tag.className}`}>
                      {tag.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
