import type { 
  Farm, InsertFarm, Crop, InsertCrop, Lease, InsertLease, Weather, Notification,
  FarmStats, CropPerformance, DashboardMetrics, YieldData, LandUseData, ProfitData, LoanEligibility
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Farms
  getFarms(): Promise<Farm[]>;
  getFarm(id: string): Promise<Farm | undefined>;
  createFarm(farm: InsertFarm): Promise<Farm>;
  
  // Crops
  getCrops(): Promise<Crop[]>;
  getCropsByFarm(farmId: string): Promise<Crop[]>;
  createCrop(crop: InsertCrop): Promise<Crop>;
  
  // Leases
  getLeases(): Promise<Lease[]>;
  getLease(id: string): Promise<Lease | undefined>;
  createLease(lease: InsertLease): Promise<Lease>;
  
  // Weather
  getWeather(): Promise<Weather>;
  
  // Notifications
  getNotifications(): Promise<Notification[]>;
  
  // Dashboard data
  getDashboardMetrics(): Promise<DashboardMetrics>;
  getFarmStats(): Promise<FarmStats>;
  getCropPerformance(): Promise<CropPerformance[]>;
  getYieldData(): Promise<YieldData[]>;
  getLandUseData(): Promise<LandUseData[]>;
  getProfitData(): Promise<ProfitData[]>;
  getLoanEligibility(): Promise<LoanEligibility>;
}

export class MemStorage implements IStorage {
  private farms: Map<string, Farm>;
  private crops: Map<string, Crop>;
  private leases: Map<string, Lease>;
  private weather: Weather;
  private notifications: Notification[];

  constructor() {
    this.farms = new Map();
    this.crops = new Map();
    this.leases = new Map();
    this.notifications = [];
    this.weather = {
      id: 'default-weather',
      location: 'Saskatchewan',
      temperature: 22.5,
      condition: 'Sunny',
      humidity: 65,
      rainForecast: 2,
      lastUpdated: new Date()
    };
    
    // Initialize with realistic Saskatchewan farm data
    this.initializeDummyData();
  }

  private initializeDummyData() {
    // Create farms
    const farm1: Farm = {
      id: "RM-125",
      name: "Prairie View Farm",
      location: "Saskatchewan, RM of Biggar",
      acreage: 2400,
      mapImage: "/farm-map-1.jpg"
    };
    
    const farm2: Farm = {
      id: "RM-233",
      name: "Golden Harvest Fields",
      location: "Saskatchewan, RM of Moose Jaw",
      acreage: 3200,
      mapImage: "/farm-map-2.jpg"
    };
    
    const farm3: Farm = {
      id: "RM-401",
      name: "Northstar Farmland",
      location: "Saskatchewan, RM of Saskatoon",
      acreage: 1800,
      mapImage: "/farm-map-3.jpg"
    };

    this.farms.set(farm1.id, farm1);
    this.farms.set(farm2.id, farm2);
    this.farms.set(farm3.id, farm3);

    // Create crops
    const crops: Crop[] = [
      // Farm 1 crops
      { id: randomUUID(), farmId: "RM-125", name: "Spring Wheat", category: "Grains", maturity: 95, status: "Matured", acreage: 1200 },
      { id: randomUUID(), farmId: "RM-125", name: "Canola", category: "Grains", maturity: 88, status: "Ripening", acreage: 800 },
      { id: randomUUID(), farmId: "RM-125", name: "Field Peas", category: "Vegetables", maturity: 72, status: "Ripening", acreage: 400 },
      
      // Farm 2 crops
      { id: randomUUID(), farmId: "RM-233", name: "Barley", category: "Grains", maturity: 70, status: "Ripening", acreage: 1500 },
      { id: randomUUID(), farmId: "RM-233", name: "Winter Wheat", category: "Grains", maturity: 92, status: "Matured", acreage: 1200 },
      { id: randomUUID(), farmId: "RM-233", name: "Lentils", category: "Vegetables", maturity: 65, status: "Ripening", acreage: 500 },
      
      // Farm 3 crops
      { id: randomUUID(), farmId: "RM-401", name: "Oats", category: "Grains", maturity: 40, status: "Growing", acreage: 900 },
      { id: randomUUID(), farmId: "RM-401", name: "Strawberries", category: "Fruits", maturity: 55, status: "Growing", acreage: 300 },
      { id: randomUUID(), farmId: "RM-401", name: "Blueberries", category: "Fruits", maturity: 48, status: "Growing", acreage: 600 },
    ];

    crops.forEach(crop => this.crops.set(crop.id, crop));

    // Create leases
    const lease1: Lease = {
      id: randomUUID(),
      farmId: "RM-125",
      startYear: 2024,
      endYear: 2027,
      rentDue: 1850,
      status: "Active",
    };
    
    const lease2: Lease = {
      id: randomUUID(),
      farmId: "RM-233",
      startYear: 2025,
      endYear: 2028,
      rentDue: 2100,
      status: "Active",
    };

    this.leases.set(lease1.id, lease1);
    this.leases.set(lease2.id, lease2);

    // Weather data
    this.weather = {
      id: randomUUID(),
      location: "Saskatchewan",
      temperature: 28,
      condition: "Sunny",
      humidity: 65,
      rainForecast: 3,
      lastUpdated: new Date(),
    };

    // Notifications
    this.notifications = [
      {
        id: randomUUID(),
        message: "Wheat crop on RM-125 has reached 95% maturity",
        type: "success",
        read: 0,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        message: "Rain forecasted for Thursday - plan field work accordingly",
        type: "warning",
        read: 0,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        message: "You're pre-approved for $12,000 CAD credit",
        type: "info",
        read: 0,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    ];
  }

  async getFarms(): Promise<Farm[]> {
    return Array.from(this.farms.values());
  }

  async getFarm(id: string): Promise<Farm | undefined> {
    return this.farms.get(id);
  }

  async createFarm(insertFarm: InsertFarm): Promise<Farm> {
    const id = `RM-${Math.floor(Math.random() * 900 + 100)}`;
    const farm: Farm = { 
      ...insertFarm, 
      id,
      mapImage: insertFarm.mapImage || null // Ensure mapImage is either a string or null
    };
    this.farms.set(id, farm);
    return farm;
  }

  async getCrops(): Promise<Crop[]> {
    return Array.from(this.crops.values());
  }

  async getCropsByFarm(farmId: string): Promise<Crop[]> {
    return Array.from(this.crops.values()).filter(crop => crop.farmId === farmId);
  }

  async createCrop(insertCrop: InsertCrop): Promise<Crop> {
    const id = randomUUID();
    const crop: Crop = { ...insertCrop, id };
    this.crops.set(id, crop);
    return crop;
  }

  async getLeases(): Promise<Lease[]> {
    return Array.from(this.leases.values());
  }

  async getLease(id: string): Promise<Lease | undefined> {
    return this.leases.get(id);
  }

  async createLease(insertLease: InsertLease): Promise<Lease> {
    const id = randomUUID();
    const lease: Lease = { ...insertLease, id };
    this.leases.set(id, lease);
    return lease;
  }

  async getWeather(): Promise<Weather> {
    return this.weather;
  }

  async getNotifications(): Promise<Notification[]> {
    return this.notifications;
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const farms = await this.getFarms();
    const leases = await this.getLeases();
    
    const totalAcreage = farms.reduce((sum, farm) => sum + farm.acreage, 0);
    const activeLease = leases.find(l => l.status === "Active");
    const leaseTermRemaining = activeLease ? activeLease.endYear - new Date().getFullYear() : 0;
    
    return {
      totalAcreage,
      cropYield: 8450,
      leaseTermRemaining,
      activeLoans: 2,
    };
  }

  async getFarmStats(): Promise<FarmStats> {
    return {
      farmId: "RM-125",
      temperature: 28,
      moisture: 34,
      ph: 7.3,
      rainForecast: 3,
    };
  }

  async getCropPerformance(): Promise<CropPerformance[]> {
    const crops = await this.getCrops();
    
    const grainCrops = crops.filter(c => c.category === "Grains");
    const fruitCrops = crops.filter(c => c.category === "Fruits");
    const vegCrops = crops.filter(c => c.category === "Vegetables");
    
    const totalCrops = crops.length;
    
    return [
      {
        category: "Grains",
        percentage: Math.round((grainCrops.length / totalCrops) * 100),
        crops: grainCrops.map(c => ({ name: c.name, maturity: c.maturity, status: c.status })),
      },
      {
        category: "Fruits",
        percentage: Math.round((fruitCrops.length / totalCrops) * 100),
        crops: fruitCrops.map(c => ({ name: c.name, maturity: c.maturity, status: c.status })),
      },
      {
        category: "Vegetables",
        percentage: Math.round((vegCrops.length / totalCrops) * 100),
        crops: vegCrops.map(c => ({ name: c.name, maturity: c.maturity, status: c.status })),
      },
    ];
  }

  async getYieldData(): Promise<YieldData[]> {
    return [
      { month: "Jan", yield: 120, rainfall: 45 },
      { month: "Feb", yield: 150, rainfall: 52 },
      { month: "Mar", yield: 180, rainfall: 68 },
      { month: "Apr", yield: 220, rainfall: 85 },
      { month: "May", yield: 280, rainfall: 92 },
      { month: "Jun", yield: 340, rainfall: 78 },
      { month: "Jul", yield: 380, rainfall: 65 },
      { month: "Aug", yield: 420, rainfall: 58 },
      { month: "Sep", yield: 390, rainfall: 72 },
      { month: "Oct", yield: 350, rainfall: 88 },
    ];
  }

  async getLandUseData(): Promise<LandUseData[]> {
    const crops = await this.getCrops();
    const categoryMap = new Map<string, number>();
    
    crops.forEach(crop => {
      const current = categoryMap.get(crop.category) || 0;
      categoryMap.set(crop.category, current + crop.acreage);
    });
    
    const total = Array.from(categoryMap.values()).reduce((sum, val) => sum + val, 0);
    
    return Array.from(categoryMap.entries()).map(([category, acreage]) => ({
      category,
      percentage: Math.round((acreage / total) * 100),
      acreage,
    }));
  }

  async getProfitData(): Promise<ProfitData[]> {
    return [
      { month: "Jan", profit: 12500 },
      { month: "Feb", profit: 15200 },
      { month: "Mar", profit: 18900 },
      { month: "Apr", profit: 22400 },
      { month: "May", profit: 28600 },
      { month: "Jun", profit: 31200 },
      { month: "Jul", profit: 34800 },
      { month: "Aug", profit: 38500 },
      { month: "Sep", profit: 35200 },
      { month: "Oct", profit: 31800 },
    ];
  }

  async getLoanEligibility(): Promise<LoanEligibility> {
    return {
      eligible: true,
      amount: 12000,
      reason: "You're eligible for CAD $12,000 loan using stored receipts.",
    };
  }
}

export const storage = new MemStorage();
