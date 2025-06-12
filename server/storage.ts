import { 
  users, 
  studyMaterials,
  reminders,
  diaryEntries,
  moodEntries,
  type User, 
  type InsertUser,
  type StudyMaterial,
  type InsertStudyMaterial,
  type Reminder,
  type InsertReminder,
  type DiaryEntry,
  type InsertDiaryEntry,
  type MoodEntry,
  type InsertMoodEntry
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getStudyMaterials(userId: number): Promise<StudyMaterial[]>;
  createStudyMaterial(material: InsertStudyMaterial & { userId: number }): Promise<StudyMaterial>;
  deleteStudyMaterial(id: number): Promise<void>;
  
  getReminders(userId: number): Promise<Reminder[]>;
  createReminder(reminder: InsertReminder & { userId: number }): Promise<Reminder>;
  updateReminder(id: number, updates: Partial<Reminder>): Promise<Reminder>;
  deleteReminder(id: number): Promise<void>;
  
  getDiaryEntries(userId: number): Promise<DiaryEntry[]>;
  createDiaryEntry(entry: InsertDiaryEntry & { userId: number }): Promise<DiaryEntry>;
  deleteDiaryEntry(id: number): Promise<void>;
  
  getMoodEntries(userId: number): Promise<MoodEntry[]>;
  createMoodEntry(entry: InsertMoodEntry & { userId: number }): Promise<MoodEntry>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private studyMaterials: Map<number, StudyMaterial>;
  private reminders: Map<number, Reminder>;
  private diaryEntries: Map<number, DiaryEntry>;
  private moodEntries: Map<number, MoodEntry>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.studyMaterials = new Map();
    this.reminders = new Map();
    this.diaryEntries = new Map();
    this.moodEntries = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getStudyMaterials(userId: number): Promise<StudyMaterial[]> {
    return Array.from(this.studyMaterials.values()).filter(
      (material) => material.userId === userId
    );
  }

  async createStudyMaterial(material: InsertStudyMaterial & { userId: number }): Promise<StudyMaterial> {
    const id = this.currentId++;
    const newMaterial: StudyMaterial = { 
      ...material, 
      id, 
      createdAt: new Date() 
    };
    this.studyMaterials.set(id, newMaterial);
    return newMaterial;
  }

  async deleteStudyMaterial(id: number): Promise<void> {
    this.studyMaterials.delete(id);
  }

  async getReminders(userId: number): Promise<Reminder[]> {
    return Array.from(this.reminders.values()).filter(
      (reminder) => reminder.userId === userId
    );
  }

  async createReminder(reminder: InsertReminder & { userId: number }): Promise<Reminder> {
    const id = this.currentId++;
    const newReminder: Reminder = { 
      ...reminder, 
      id, 
      completed: false,
      createdAt: new Date() 
    };
    this.reminders.set(id, newReminder);
    return newReminder;
  }

  async updateReminder(id: number, updates: Partial<Reminder>): Promise<Reminder> {
    const reminder = this.reminders.get(id);
    if (!reminder) {
      throw new Error("Reminder not found");
    }
    const updatedReminder = { ...reminder, ...updates };
    this.reminders.set(id, updatedReminder);
    return updatedReminder;
  }

  async deleteReminder(id: number): Promise<void> {
    this.reminders.delete(id);
  }

  async getDiaryEntries(userId: number): Promise<DiaryEntry[]> {
    return Array.from(this.diaryEntries.values()).filter(
      (entry) => entry.userId === userId
    );
  }

  async createDiaryEntry(entry: InsertDiaryEntry & { userId: number }): Promise<DiaryEntry> {
    const id = this.currentId++;
    const newEntry: DiaryEntry = { 
      ...entry, 
      id, 
      createdAt: new Date() 
    };
    this.diaryEntries.set(id, newEntry);
    return newEntry;
  }

  async deleteDiaryEntry(id: number): Promise<void> {
    this.diaryEntries.delete(id);
  }

  async getMoodEntries(userId: number): Promise<MoodEntry[]> {
    return Array.from(this.moodEntries.values()).filter(
      (entry) => entry.userId === userId
    );
  }

  async createMoodEntry(entry: InsertMoodEntry & { userId: number }): Promise<MoodEntry> {
    const id = this.currentId++;
    const newEntry: MoodEntry = { 
      ...entry, 
      id, 
      createdAt: new Date() 
    };
    this.moodEntries.set(id, newEntry);
    return newEntry;
  }
}

export const storage = new MemStorage();
