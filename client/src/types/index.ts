export interface LocalStorageReminder {
  id: string;
  title: string;
  time: string;
  category: string;
  completed: boolean;
  date: string;
}

export interface LocalStorageDiaryEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  date: string;
  timestamp: number;
}

export interface LocalStorageMoodEntry {
  id: string;
  mood: string;
  date: string;
  timestamp: number;
}

export interface LocalStorageStudyMaterial {
  id: string;
  title: string;
  type: string;
  url?: string;
  category: string;
  dateAdded: string;
}

export type MoodType = 'great' | 'good' | 'okay' | 'down' | 'stressed';

export const MOOD_EMOJIS: Record<MoodType, string> = {
  great: '😊',
  good: '🙂',
  okay: '😐',
  down: '😔',
  stressed: '😰'
};
