import { 
  users, guards, serviceRequests, quotes, bookings, reports,
  type User, type InsertUser, type Guard, type InsertGuard, 
  type ServiceRequest, type InsertServiceRequest, type Quote, type InsertQuote,
  type Report, type InsertReport, type Booking
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Guard operations
  getGuard(id: number): Promise<Guard | undefined>;
  getGuardByUserId(userId: number): Promise<Guard | undefined>;
  createGuard(guard: InsertGuard): Promise<Guard>;
  updateGuardStatus(guardId: number, isAvailable: boolean): Promise<void>;
  getAvailableGuards(): Promise<Guard[]>;

  // Service request operations
  createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest>;
  getServiceRequestsByClient(clientId: number): Promise<ServiceRequest[]>;
  getActiveServiceRequests(): Promise<ServiceRequest[]>;

  // Quote operations
  createQuote(quote: InsertQuote): Promise<Quote>;
  getQuotesByRequest(requestId: number): Promise<Quote[]>;
  getQuotesByGuard(guardId: number): Promise<Quote[]>;

  // Booking operations
  getBookingsByClient(clientId: number): Promise<Booking[]>;
  getBookingsByGuard(guardId: number): Promise<Booking[]>;
  getActiveBookings(): Promise<Booking[]>;

  // Report operations
  createReport(report: InsertReport): Promise<Report>;
  getReportsByBooking(bookingId: number): Promise<Report[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private guards: Map<number, Guard>;
  private serviceRequests: Map<number, ServiceRequest>;
  private quotes: Map<number, Quote>;
  private bookings: Map<number, Booking>;
  private reports: Map<number, Report>;
  private currentUserId: number;
  private currentGuardId: number;
  private currentRequestId: number;
  private currentQuoteId: number;
  private currentBookingId: number;
  private currentReportId: number;

  constructor() {
    this.users = new Map();
    this.guards = new Map();
    this.serviceRequests = new Map();
    this.quotes = new Map();
    this.bookings = new Map();
    this.reports = new Map();
    this.currentUserId = 1;
    this.currentGuardId = 1;
    this.currentRequestId = 1;
    this.currentQuoteId = 1;
    this.currentBookingId = 1;
    this.currentReportId = 1;

    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create default admin user
    const adminUser: User = {
      id: this.currentUserId++,
      username: "admin",
      password: "admin123",
      userType: "admin",
      fullName: "مدير النظام",
      phone: "0501234567",
      email: "admin@haris.sa",
      isActive: true,
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Create default client
    const clientUser: User = {
      id: this.currentUserId++,
      username: "client1",
      password: "client123",
      userType: "client",
      fullName: "أحمد السعد",
      phone: "0509876543",
      email: "ahmed@example.com",
      isActive: true,
      createdAt: new Date(),
    };
    this.users.set(clientUser.id, clientUser);

    // Create default guards
    const guardUsers = [
      {
        id: this.currentUserId++,
        username: "guard1",
        password: "guard123",
        userType: "guard" as const,
        fullName: "خالد الأحمد",
        phone: "0551234567",
        email: "khalid@example.com",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentUserId++,
        username: "guard2", 
        password: "guard123",
        userType: "guard" as const,
        fullName: "محمد السعد",
        phone: "0552345678",
        email: "mohammed@example.com",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentUserId++,
        username: "guard3",
        password: "guard123", 
        userType: "guard" as const,
        fullName: "عبدالله القحطاني",
        phone: "0553456789",
        email: "abdullah@example.com",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentUserId++,
        username: "guard4",
        password: "guard123",
        userType: "guard" as const,
        fullName: "فاطمة الزهراني",
        phone: "0554567890",
        email: "fatima@example.com",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentUserId++,
        username: "guard5",
        password: "guard123",
        userType: "guard" as const,
        fullName: "نورا العتيبي",
        phone: "0555678901",
        email: "nora@example.com",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: this.currentUserId++,
        username: "guard6",
        password: "guard123",
        userType: "guard" as const,
        fullName: "سارة المطيري",
        phone: "0556789012",
        email: "sarah@example.com",
        isActive: true,
        createdAt: new Date(),
      }
    ];

    guardUsers.forEach(user => this.users.set(user.id, user));

    // Create guard profiles
    const guardProfiles = [
      {
        id: this.currentGuardId++,
        userId: 3,
        nationalId: "1234567890",
        experience: "5",
        specializations: ["personal", "events"],
        rating: "4.9",
        totalJobs: 127,
        profileImage: "/assets/male_1751872460287.png",
        isVerified: true,
        isAvailable: true,
        documents: { idCard: "id1.jpg", certificate: "cert1.jpg" }
      },
      {
        id: this.currentGuardId++,
        userId: 4,
        nationalId: "1234567891",
        experience: "8",
        specializations: ["events", "site"],
        rating: "4.7",
        totalJobs: 89,
        profileImage: "/assets/male_1751872460287.png",
        isVerified: true,
        isAvailable: true,
        documents: { idCard: "id2.jpg", certificate: "cert2.jpg" }
      },
      {
        id: this.currentGuardId++,
        userId: 5,
        nationalId: "1234567892",
        experience: "3",
        specializations: ["personal", "gate"],
        rating: "4.8",
        totalJobs: 45,
        profileImage: "/assets/male_1751872460287.png",
        isVerified: true,
        isAvailable: true,
        documents: { idCard: "id3.jpg", certificate: "cert3.jpg" }
      },
      {
        id: this.currentGuardId++,
        userId: 6,
        nationalId: "1234567893",
        experience: "6",
        specializations: ["events", "residential"],
        rating: "4.9",
        totalJobs: 98,
        profileImage: "/images/guards/female-guard.svg",
        isVerified: true,
        isAvailable: true,
        documents: { idCard: "id4.jpg", certificate: "cert4.jpg" },
        gender: "female"
      },
      {
        id: this.currentGuardId++,
        userId: 7,
        nationalId: "1234567894",
        experience: "4",
        specializations: ["events", "residential"],
        rating: "4.7",
        totalJobs: 67,
        profileImage: "/images/guards/female-guard.svg",
        isVerified: true,
        isAvailable: true,
        documents: { idCard: "id5.jpg", certificate: "cert5.jpg" },
        gender: "female"
      },
      {
        id: this.currentGuardId++,
        userId: 8,
        nationalId: "1234567895",
        experience: "5",
        specializations: ["residential", "personal"],
        rating: "4.8",
        totalJobs: 78,
        profileImage: "/images/guards/female-guard.svg",
        isVerified: true,
        isAvailable: true,
        documents: { idCard: "id6.jpg", certificate: "cert6.jpg" },
        gender: "female"
      }
    ];

    guardProfiles.forEach(guard => this.guards.set(guard.id, guard));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      id, 
      username: insertUser.username,
      password: insertUser.password,
      userType: insertUser.userType,
      fullName: insertUser.fullName || null,
      phone: insertUser.phone || null,
      email: insertUser.email || null,
      isActive: true,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getGuard(id: number): Promise<Guard | undefined> {
    return this.guards.get(id);
  }

  async getGuardByUserId(userId: number): Promise<Guard | undefined> {
    return Array.from(this.guards.values()).find(guard => guard.userId === userId);
  }

  async createGuard(insertGuard: InsertGuard): Promise<Guard> {
    const id = this.currentGuardId++;
    const guard: Guard = {
      id,
      userId: insertGuard.userId || null,
      nationalId: insertGuard.nationalId || null,
      experience: insertGuard.experience || null,
      specializations: insertGuard.specializations || null,
      rating: "0.0",
      totalJobs: 0,
      profileImage: null,
      isVerified: false,
      isAvailable: false,
      documents: null,
    };
    this.guards.set(id, guard);
    return guard;
  }

  async updateGuardStatus(guardId: number, isAvailable: boolean): Promise<void> {
    const guard = this.guards.get(guardId);
    if (guard) {
      guard.isAvailable = isAvailable;
      this.guards.set(guardId, guard);
    }
  }

  async getAvailableGuards(): Promise<Guard[]> {
    return Array.from(this.guards.values()).filter(guard => 
      guard.isVerified && guard.isAvailable
    );
  }

  async createServiceRequest(insertRequest: InsertServiceRequest): Promise<ServiceRequest> {
    const id = this.currentRequestId++;
    const request: ServiceRequest = {
      id,
      clientId: insertRequest.clientId,
      serviceType: insertRequest.serviceType,
      location: insertRequest.location,
      date: insertRequest.date,
      duration: insertRequest.duration,
      notes: insertRequest.notes || null,
      guardGender: insertRequest.guardGender || null,
      jobDescription: insertRequest.jobDescription || null,
      status: "pending",
      createdAt: new Date(),
    };
    this.serviceRequests.set(id, request);
    return request;
  }

  async getServiceRequestsByClient(clientId: number): Promise<ServiceRequest[]> {
    return Array.from(this.serviceRequests.values()).filter(request => 
      request.clientId === clientId
    );
  }

  async getActiveServiceRequests(): Promise<ServiceRequest[]> {
    return Array.from(this.serviceRequests.values()).filter(request => 
      request.status === "pending"
    );
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentQuoteId++;
    const quote: Quote = {
      ...insertQuote,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async getQuotesByRequest(requestId: number): Promise<Quote[]> {
    return Array.from(this.quotes.values()).filter(quote => 
      quote.requestId === requestId
    );
  }

  async getQuotesByGuard(guardId: number): Promise<Quote[]> {
    return Array.from(this.quotes.values()).filter(quote => 
      quote.guardId === guardId
    );
  }

  async getBookingsByClient(clientId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => 
      booking.clientId === clientId
    );
  }

  async getBookingsByGuard(guardId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => 
      booking.guardId === guardId
    );
  }

  async getActiveBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => 
      booking.status === "in_progress"
    );
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = this.currentReportId++;
    const report: Report = {
      ...insertReport,
      id,
      createdAt: new Date(),
    };
    this.reports.set(id, report);
    return report;
  }

  async getReportsByBooking(bookingId: number): Promise<Report[]> {
    return Array.from(this.reports.values()).filter(report => 
      report.bookingId === bookingId
    );
  }
}

export const storage = new MemStorage();