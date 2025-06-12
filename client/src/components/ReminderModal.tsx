import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveReminder } from "../lib/localStorage";
import { useToast } from "@/hooks/use-toast";

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function ReminderModal({ isOpen, onClose, onSaved }: ReminderModalProps) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    if (!title || !time || !category) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    saveReminder({
      title,
      time,
      category,
      completed: false,
      date: new Date().toISOString(),
    });

    toast({
      title: "Success",
      description: "Reminder saved successfully!",
    });

    setTitle("");
    setTime("");
    setCategory("");
    onSaved();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add Reminder</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Study reminder title..."
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="study-session">Study Session</SelectItem>
                <SelectItem value="assignment-due">Assignment Due</SelectItem>
                <SelectItem value="exam-prep">Exam Preparation</SelectItem>
                <SelectItem value="mental-health">Mental Health Check</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-study-primary hover:bg-study-primary/90">
              Save Reminder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
