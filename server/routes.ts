import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFarmSchema, insertCropSchema, insertLeaseSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Farms
  app.get("/api/farms", async (_req, res) => {
    const farms = await storage.getFarms();
    res.json(farms);
  });

  app.get("/api/farms/:id", async (req, res) => {
    const farm = await storage.getFarm(req.params.id);
    if (!farm) {
      return res.status(404).json({ error: "Farm not found" });
    }
    res.json(farm);
  });

  app.post("/api/farms", async (req, res) => {
    try {
      const validatedData = insertFarmSchema.parse(req.body);
      const farm = await storage.createFarm(validatedData);
      res.status(201).json(farm);
    } catch (error) {
      res.status(400).json({ error: "Invalid farm data" });
    }
  });

  // Crops
  app.get("/api/crops", async (_req, res) => {
    const crops = await storage.getCrops();
    res.json(crops);
  });

  app.get("/api/crops/farm/:farmId", async (req, res) => {
    const crops = await storage.getCropsByFarm(req.params.farmId);
    res.json(crops);
  });

  app.post("/api/crops", async (req, res) => {
    try {
      const validatedData = insertCropSchema.parse(req.body);
      const crop = await storage.createCrop(validatedData);
      res.status(201).json(crop);
    } catch (error) {
      res.status(400).json({ error: "Invalid crop data" });
    }
  });

  // Leases
  app.get("/api/leases", async (_req, res) => {
    const leases = await storage.getLeases();
    res.json(leases);
  });

  app.get("/api/leases/:id", async (req, res) => {
    const lease = await storage.getLease(req.params.id);
    if (!lease) {
      return res.status(404).json({ error: "Lease not found" });
    }
    res.json(lease);
  });

  app.post("/api/leases", async (req, res) => {
    try {
      const validatedData = insertLeaseSchema.parse(req.body);
      const lease = await storage.createLease(validatedData);
      res.status(201).json(lease);
    } catch (error) {
      res.status(400).json({ error: "Invalid lease data" });
    }
  });

  // Weather
  app.get("/api/weather", async (_req, res) => {
    const weather = await storage.getWeather();
    res.json(weather);
  });

  // Notifications
  app.get("/api/notifications", async (_req, res) => {
    const notifications = await storage.getNotifications();
    res.json(notifications);
  });

  // Dashboard endpoints
  app.get("/api/dashboard/metrics", async (_req, res) => {
    const metrics = await storage.getDashboardMetrics();
    res.json(metrics);
  });

  app.get("/api/dashboard/farm-stats", async (_req, res) => {
    const stats = await storage.getFarmStats();
    res.json(stats);
  });

  app.get("/api/dashboard/crop-performance", async (_req, res) => {
    const performance = await storage.getCropPerformance();
    res.json(performance);
  });

  app.get("/api/dashboard/yield-data", async (_req, res) => {
    const yieldData = await storage.getYieldData();
    res.json(yieldData);
  });

  app.get("/api/dashboard/land-use", async (_req, res) => {
    const landUse = await storage.getLandUseData();
    res.json(landUse);
  });

  app.get("/api/dashboard/profit-data", async (_req, res) => {
    const profitData = await storage.getProfitData();
    res.json(profitData);
  });

  app.get("/api/dashboard/loan-eligibility", async (_req, res) => {
    const eligibility = await storage.getLoanEligibility();
    res.json(eligibility);
  });

  const httpServer = createServer(app);
  return httpServer;
}
