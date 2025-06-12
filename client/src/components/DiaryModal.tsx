import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveDiaryEntry } from "../lib/localStorage";
import { MOOD_EMOJIS, MoodType } from "../types";
import { useToast } from "@/hooks/use-toast";

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function DiaryModal({ isOpen, onClose, onSaved }: DiaryModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<MoodType | "">("");
  const { toast } = useToast();

  const handleSave = () => {
    if (!title || !content || !selectedMood) {
      toast({
        title: "Error",
        description: "Please fill in all fields and select a mood.",
        variant: "destructive",
      });
      return;
    }

    saveDiaryEntry({
      title,
      content,
      mood: selectedMood,
      date: new Date().toISOString(),
    });

    toast({
      title: "Success",
      description: "Diary entry saved successfully!",
    });

    setTitle("");
    setContent("");
    setSelectedMood("");
    onSaved();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Write Diary Entry</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="entry-title">Title</Label>
            <Input
              id="entry-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entry title..."
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>How are you feeling?</Label>
            <div className="flex space-x-2 mt-2">
              {Object.entries(MOOD_EMOJIS).map(([mood, emoji]) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood as MoodType)}
                  className={`mood-emoji text-2xl p-2 rounded-lg hover:bg-gray-100 transition-all ${
                    selectedMood === mood ? 'selected bg-mental-primary/20' : ''
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="entry-content">Your thoughts</Label>
            <Textarea
              id="entry-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="What's on your mind today? How did your studies go? Any challenges or victories to share?"
              className="mt-1 resize-none"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-mental-primary hover:bg-mental-primary/90">
              Save Entry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
