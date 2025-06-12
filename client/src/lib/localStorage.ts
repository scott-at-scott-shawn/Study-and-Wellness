import { 
  LocalStorageReminder, 
  LocalStorageDiaryEntry, 
  LocalStorageMoodEntry, 
  LocalStorageStudyMaterial 
} from '../types';

const STORAGE_KEYS = {
  REMINDERS: 'studyReminders',
  DIARY_ENTRIES: 'diaryEntries',
  MOOD_HISTORY: 'moodHistory',
  STUDY_MATERIALS: 'studyMaterials'
} as const;

// Reminders
export const getReminders = (): LocalStorageReminder[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.REMINDERS);
  return stored ? JSON.parse(stored) : [];
};

export const saveReminder = (reminder: Omit<LocalStorageReminder, 'id'>): LocalStorageReminder => {
  const reminders = getReminders();
  const newReminder: LocalStorageReminder = {
    ...reminder,
    id: Date.now().toString()
  };
  reminders.push(newReminder);
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  return newReminder;
};

export const updateReminder = (id: string, updates: Partial<LocalStorageReminder>): void => {
  const reminders = getReminders();
  const index = reminders.findIndex(r => r.id === id);
  if (index !== -1) {
    reminders[index] = { ...reminders[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  }
};

export const deleteReminder = (id: string): void => {
  const reminders = getReminders();
  const filtered = reminders.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(filtered));
};

// Diary Entries
export const getDiaryEntries = (): LocalStorageDiaryEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.DIARY_ENTRIES);
  return stored ? JSON.parse(stored) : [];
};

export const saveDiaryEntry = (entry: Omit<LocalStorageDiaryEntry, 'id' | 'timestamp'>): LocalStorageDiaryEntry => {
  const entries = getDiaryEntries();
  const newEntry: LocalStorageDiaryEntry = {
    ...entry,
    id: Date.now().toString(),
    timestamp: Date.now()
  };
  entries.unshift(newEntry); // Add to beginning for latest first
  localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(entries));
  return newEntry;
};

export const deleteDiaryEntry = (id: string): void => {
  const entries = getDiaryEntries();
  const filtered = entries.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.DIARY_ENTRIES, JSON.stringify(filtered));
};

export const searchDiaryEntries = (query: string): LocalStorageDiaryEntry[] => {
  const entries = getDiaryEntries();
  const lowerQuery = query.toLowerCase();
  return entries.filter(entry => 
    entry.title.toLowerCase().includes(lowerQuery) ||
    entry.content.toLowerCase().includes(lowerQuery)
  );
};

// Mood Entries
export const getMoodEntries = (): LocalStorageMoodEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.MOOD_HISTORY);
  return stored ? JSON.parse(stored) : [];
};

export const saveMoodEntry = (mood: string): LocalStorageMoodEntry => {
  const entries = getMoodEntries();
  const newEntry: LocalStorageMoodEntry = {
    id: Date.now().toString(),
    mood,
    date: new Date().toISOString(),
    timestamp: Date.now()
  };
  entries.unshift(newEntry);
  localStorage.setItem(STORAGE_KEYS.MOOD_HISTORY, JSON.stringify(entries));
  return newEntry;
};

// Study Materials
export const getStudyMaterials = (): LocalStorageStudyMaterial[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.STUDY_MATERIALS);
  return stored ? JSON.parse(stored) : [];
};

export const saveStudyMaterial = (material: Omit<LocalStorageStudyMaterial, 'id' | 'dateAdded'>): LocalStorageStudyMaterial => {
  const materials = getStudyMaterials();
  const newMaterial: LocalStorageStudyMaterial = {
    ...material,
    id: Date.now().toString(),
    dateAdded: new Date().toISOString()
  };
  materials.push(newMaterial);
  localStorage.setItem(STORAGE_KEYS.STUDY_MATERIALS, JSON.stringify(materials));
  return newMaterial;
};

export const deleteStudyMaterial = (id: string): void => {
  const materials = getStudyMaterials();
  const filtered = materials.filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.STUDY_MATERIALS, JSON.stringify(filtered));
};

export const searchStudyMaterials = (query: string): LocalStorageStudyMaterial[] => {
  const materials = getStudyMaterials();
  const lowerQuery = query.toLowerCase();
  return materials.filter(material => 
    material.title.toLowerCase().includes(lowerQuery) ||
    material.category.toLowerCase().includes(lowerQuery)
  );
};

// Export diary entries as JSON
export const exportDiaryEntries = (): void => {
  const entries = getDiaryEntries();
  if (entries.length === 0) {
    alert('No diary entries to export.');
    return;
  }
  
  const dataStr = JSON.stringify(entries, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'my-diary-entries.json';
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};
