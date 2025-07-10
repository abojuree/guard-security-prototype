import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  userType: text("user_type").notNull(), // 'client', 'guard', 'admin'
  fullName: text("full_name"),
  phone: text("phone"),
  email: text("email"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const guards = pgTable("guards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  nationalId: text("national_id"),
  experience: text("experience"),
  specializations: jsonb("specializations"),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  totalJobs: integer("total_jobs").default(0),
  profileImage: text("profile_image"),
  isVerified: boolean("is_verified").default(false),
  isAvailable: boolean("is_available").default(false),
  documents: jsonb("documents"),
});

export const serviceRequests = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => users.id),
  serviceType: text("service_type").notNull(),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  duration: text("duration").notNull(),
  status: text("status").default("pending"), // 'pending', 'active', 'completed', 'cancelled'
  notes: text("notes"),
  guardGender: text("guard_gender"), // 'male', 'female'
  jobDescription: text("job_description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").references(() => serviceRequests.id),
  guardId: integer("guard_id").references(() => guards.id),
  price: decimal("price", { precision: 8, scale: 2 }).notNull(),
  notes: text("notes"),
  status: text("status").default("pending"), // 'pending', 'accepted', 'rejected'
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").references(() => serviceRequests.id),
  guardId: integer("guard_id").references(() => guards.id),
  clientId: integer("client_id").references(() => users.id),
  quoteId: integer("quote_id").references(() => quotes.id),
  status: text("status").default("confirmed"), // 'confirmed', 'in_progress', 'completed', 'cancelled'
  totalAmount: decimal("total_amount", { precision: 8, scale: 2 }).notNull(),
  platformFee: decimal("platform_fee", { precision: 8, scale: 2 }).notNull(),
  guardAmount: decimal("guard_amount", { precision: 8, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").references(() => bookings.id),
  guardId: integer("guard_id").references(() => guards.id),
  type: text("type").notNull(), // 'emergency', 'daily', 'incident'
  description: text("description").notNull(),
  images: jsonb("images"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  userType: true,
  fullName: true,
  phone: true,
  email: true,
});

export const insertGuardSchema = createInsertSchema(guards).pick({
  userId: true,
  nationalId: true,
  experience: true,
  specializations: true,
});

export const insertServiceRequestSchema = createInsertSchema(serviceRequests).pick({
  clientId: true,
  serviceType: true,
  location: true,
  date: true,
  duration: true,
  notes: true,
  guardGender: true,
  jobDescription: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).pick({
  requestId: true,
  guardId: true,
  price: true,
  notes: true,
});

export const insertReportSchema = createInsertSchema(reports).pick({
  bookingId: true,
  guardId: true,
  type: true,
  description: true,
  images: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertGuard = z.infer<typeof insertGuardSchema>;
export type Guard = typeof guards.$inferSelect;
export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;
export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
