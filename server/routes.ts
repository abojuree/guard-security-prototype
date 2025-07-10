import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertGuardSchema, insertServiceRequestSchema, insertQuoteSchema, insertReportSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User authentication routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "بيانات الدخول غير صحيحة" });
      }

      // Get guard profile if user is a guard
      let guardProfile = null;
      if (user.userType === 'guard') {
        guardProfile = await storage.getGuardByUserId(user.id);
      }

      res.json({ 
        user: { ...user, password: undefined },
        guard: guardProfile
      });
    } catch (error) {
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  });

  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "اسم المستخدم موجود بالفعل" });
      }

      const user = await storage.createUser(userData);
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(400).json({ message: "بيانات غير صحيحة" });
    }
  });

  // Guard routes
  app.post('/api/guards/register', async (req, res) => {
    try {
      const guardData = insertGuardSchema.parse(req.body);
      const guard = await storage.createGuard(guardData);
      res.json({ guard });
    } catch (error) {
      res.status(400).json({ message: "بيانات غير صحيحة" });
    }
  });

  app.get('/api/guards/available', async (req, res) => {
    try {
      const guards = await storage.getAvailableGuards();
      const guardsWithUsers = await Promise.all(
        guards.map(async (guard) => {
          const user = await storage.getUser(guard.userId!);
          return { ...guard, user };
        })
      );
      res.json(guardsWithUsers);
    } catch (error) {
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  });

  app.patch('/api/guards/:id/status', async (req, res) => {
    try {
      const guardId = parseInt(req.params.id);
      const { isAvailable } = req.body;
      await storage.updateGuardStatus(guardId, isAvailable);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  });

  // Service request routes
  app.post('/api/service-requests', async (req, res) => {
    try {
      // تحويل التاريخ إلى Date object إذا كان string
      if (req.body.date && typeof req.body.date === 'string') {
        req.body.date = new Date(req.body.date);
      }
      
      const requestData = insertServiceRequestSchema.parse(req.body);
      const request = await storage.createServiceRequest(requestData);
      res.json({ request });
    } catch (error) {
      res.status(400).json({ message: "بيانات غير صحيحة" });
    }
  });

  app.get('/api/service-requests/client/:clientId', async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const requests = await storage.getServiceRequestsByClient(clientId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  });

  app.get('/api/service-requests/active', async (req, res) => {
    try {
      const requests = await storage.getActiveServiceRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  });

  // Quote routes
  app.post('/api/quotes', async (req, res) => {
    try {
      const quoteData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(quoteData);
      res.json({ quote });
    } catch (error) {
      res.status(400).json({ message: "بيانات غير صحيحة" });
    }
  });

  app.get('/api/quotes/request/:requestId', async (req, res) => {
    try {
      const requestId = parseInt(req.params.requestId);
      const quotes = await storage.getQuotesByRequest(requestId);
      
      const quotesWithGuards = await Promise.all(
        quotes.map(async (quote) => {
          const guard = await storage.getGuard(quote.guardId!);
          const user = guard ? await storage.getUser(guard.userId!) : null;
          return { ...quote, guard: { ...guard, user } };
        })
      );
      
      res.json(quotesWithGuards);
    } catch (error) {
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  });

  app.get('/api/quotes/guard/:guardId', async (req, res) => {
    try {
      const guardId = parseInt(req.params.guardId);
      const quotes = await storage.getQuotesByGuard(guardId);
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  });

  // Booking routes
  app.get('/api/bookings/client/:clientId', async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const bookings = await storage.getBookingsByClient(clientId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  });

  app.get('/api/bookings/guard/:guardId', async (req, res) => {
    try {
      const guardId = parseInt(req.params.guardId);
      const bookings = await storage.getBookingsByGuard(guardId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  });

  app.get('/api/bookings/active', async (req, res) => {
    try {
      const bookings = await storage.getActiveBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  });

  // Report routes
  app.post('/api/reports', async (req, res) => {
    try {
      const reportData = insertReportSchema.parse(req.body);
      const report = await storage.createReport(reportData);
      res.json({ report });
    } catch (error) {
      res.status(400).json({ message: "بيانات غير صحيحة" });
    }
  });

  app.get('/api/reports/booking/:bookingId', async (req, res) => {
    try {
      const bookingId = parseInt(req.params.bookingId);
      const reports = await storage.getReportsByBooking(bookingId);
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "خطأ في الخادم" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
