import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertStudyMaterialSchema,
  insertReminderSchema,
  insertDiaryEntrySchema,
  insertMoodEntrySchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // For this app, we'll use a simple user system where userId = 1 for demo purposes
  const defaultUserId = 1;

  // Study Materials routes
  app.get("/api/study-materials", async (req, res) => {
    try {
      const materials = await storage.getStudyMaterials(defaultUserId);
      res.json(materials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch study materials" });
    }
  });

  app.post("/api/study-materials", async (req, res) => {
    try {
      const materialData = insertStudyMaterialSchema.parse(req.body);
      const material = await storage.createStudyMaterial({
        ...materialData,
        userId: defaultUserId
      });
      res.status(201).json(material);
    } catch (error) {
      res.status(400).json({ message: "Invalid study material data" });
    }
  });

  app.delete("/api/study-materials/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteStudyMaterial(id);
      res.status(200).json({ message: "Study material deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete study material" });
    }
  });

  // Reminders routes
  app.get("/api/reminders", async (req, res) => {
    try {
      const reminders = await storage.getReminders(defaultUserId);
      res.json(reminders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reminders" });
    }
  });

  app.post("/api/reminders", async (req, res) => {
    try {
      const reminderData = insertReminderSchema.parse(req.body);
      const reminder = await storage.createReminder({
        ...reminderData,
        userId: defaultUserId
      });
      res.status(201).json(reminder);
    } catch (error) {
      res.status(400).json({ message: "Invalid reminder data" });
    }
  });

  app.patch("/api/reminders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const reminder = await storage.updateReminder(id, req.body);
      res.json(reminder);
    } catch (error) {
      res.status(500).json({ message: "Failed to update reminder" });
    }
  });

  app.delete("/api/reminders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteReminder(id);
      res.status(200).json({ message: "Reminder deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete reminder" });
    }
  });

  // Diary entries routes
  app.get("/api/diary-entries", async (req, res) => {
    try {
      const entries = await storage.getDiaryEntries(defaultUserId);
      res.json(entries.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()));
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch diary entries" });
    }
  });

  app.post("/api/diary-entries", async (req, res) => {
    try {
      const entryData = insertDiaryEntrySchema.parse(req.body);
      const entry = await storage.createDiaryEntry({
        ...entryData,
        userId: defaultUserId
      });
      res.status(201).json(entry);
    } catch (error) {
      res.status(400).json({ message: "Invalid diary entry data" });
    }
  });

  app.delete("/api/diary-entries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteDiaryEntry(id);
      res.status(200).json({ message: "Diary entry deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete diary entry" });
    }
  });

  // Mood entries routes
  app.get("/api/mood-entries", async (req, res) => {
    try {
      const entries = await storage.getMoodEntries(defaultUserId);
      res.json(entries.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()));
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mood entries" });
    }
  });

  app.post("/api/mood-entries", async (req, res) => {
    try {
      const entryData = insertMoodEntrySchema.parse(req.body);
      const entry = await storage.createMoodEntry({
        ...entryData,
        userId: defaultUserId
      });
      res.status(201).json(entry);
    } catch (error) {
      res.status(400).json({ message: "Invalid mood entry data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
