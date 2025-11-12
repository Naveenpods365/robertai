import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Farm schema
export const farms = pgTable("farms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  acreage: real("acreage").notNull(),
  mapImage: text("map_image"),
});

export const insertFarmSchema = createInsertSchema(farms).omit({ id: true });
export type InsertFarm = z.infer<typeof insertFarmSchema>;
export type Farm = typeof farms.$inferSelect;

// Crop schema
export const crops = pgTable("crops", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  farmId: varchar("farm_id").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(), // Fruits, Grains, Vegetables
  maturity: integer("maturity").notNull(), // 0-100
  status: text("status").notNull(), // Growing, Ripening, Matured
  acreage: real("acreage").notNull(),
});

export const insertCropSchema = createInsertSchema(crops).omit({ id: true });
export type InsertCrop = z.infer<typeof insertCropSchema>;
export type Crop = typeof crops.$inferSelect;

// Lease schema
export const leases = pgTable("leases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  farmId: varchar("farm_id").notNull(),
  startYear: integer("start_year").notNull(),
  endYear: integer("end_year").notNull(),
  rentDue: real("rent_due").notNull(),
  status: text("status").notNull(), // Active, Pending, Expired
});

export const insertLeaseSchema = createInsertSchema(leases).omit({ id: true });
export type InsertLease = z.infer<typeof insertLeaseSchema>;
export type Lease = typeof leases.$inferSelect;

// Weather schema
export const weather = pgTable("weather", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  location: text("location").notNull(),
  temperature: real("temperature").notNull(),
  condition: text("condition").notNull(), // Sunny, Cloudy, Rainy, etc.
  humidity: real("humidity").notNull(),
  rainForecast: integer("rain_forecast").notNull(), // days
  lastUpdated: timestamp("last_updated").notNull(),
});

export type Weather = typeof weather.$inferSelect;

// Notification schema
export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message").notNull(),
  type: text("type").notNull(), // info, warning, success
  read: integer("read").notNull().default(0), // 0 or 1
  createdAt: timestamp("created_at").notNull(),
});

export type Notification = typeof notifications.$inferSelect;

// Stats interfaces (no table, computed from data)
export interface FarmStats {
  farmId: string;
  temperature: number;
  moisture: number;
  ph: number;
  rainForecast: number;
}

export interface CropPerformance {
  category: string;
  percentage: number;
  crops: {
    name: string;
    maturity: number;
    status: string;
  }[];
}

export interface DashboardMetrics {
  totalAcreage: number;
  cropYield: number;
  leaseTermRemaining: number;
  activeLoans: number;
}

export interface YieldData {
  month: string;
  yield: number;
  rainfall: number;
}

export interface LandUseData {
  category: string;
  percentage: number;
  acreage: number;
}

export interface ProfitData {
  month: string;
  profit: number;
}

export interface LoanEligibility {
  eligible: boolean;
  amount: number;
  reason: string;
}
