// Mock data for the Haris security app prototype
// This file contains sample data for demonstration purposes

export interface MockUser {
  id: number;
  username: string;
  fullName: string;
  phone: string;
  email: string;
  userType: 'client' | 'guard' | 'admin';
}

export interface MockGuard {
  id: number;
  userId: number;
  nationalId: string;
  experience: string;
  specializations: string[];
  rating: string;
  totalJobs: number;
  profileImage: string;
  isVerified: boolean;
  isAvailable: boolean;
}

export interface MockServiceRequest {
  id: number;
  clientId: number;
  serviceType: string;
  location: string;
  date: string;
  duration: string;
  status: "مكتمل" | "جاري التنفيذ" | "تم قبول العرض (على الموعد)" | "بانتظار عروض حراس الأمن" | "ملغي";
  notes?: string;
  guardGender?: "male" | "female";
  jobDescription?: string;
}

export interface MockQuote {
  id: number;
  requestId: number;
  guardId: number;
  price: string;
  notes: string;
  status: string;
  arrivalTime: string;
  badge: string;
  available?: boolean;
}

// Mock Users
export const mockUsers: MockUser[] = [
  {
    id: 1,
    username: "admin",
    fullName: "مدير النظام",
    phone: "0501234567",
    email: "admin@haris.sa",
    userType: "admin"
  },
  {
    id: 2,
    username: "client1",
    fullName: "أحمد السعد",
    phone: "0509876543",
    email: "ahmed@example.com",
    userType: "client"
  },
  {
    id: 3,
    username: "guard1",
    fullName: "خالد الأحمد",
    phone: "0551234567",
    email: "khalid@example.com",
    userType: "guard"
  },
  {
    id: 4,
    username: "guard2",
    fullName: "محمد السعد",
    phone: "0552345678",
    email: "mohammed@example.com",
    userType: "guard"
  },
  {
    id: 5,
    username: "guard3",
    fullName: "عبدالله القحطاني",
    phone: "0553456789",
    email: "abdullah@example.com",
    userType: "guard"
  },
  {
    id: 6,
    username: "guard4",
    fullName: "فاطمة الزهراني",
    phone: "0554567890",
    email: "fatima@example.com",
    userType: "guard"
  },
  {
    id: 7,
    username: "guard5",
    fullName: "نورا العتيبي",
    phone: "0555678901",
    email: "nora@example.com",
    userType: "guard"
  },
  {
    id: 8,
    username: "guard6",
    fullName: "سارة المطيري",
    phone: "0556789012",
    email: "sarah@example.com",
    userType: "guard"
  }
];

// Mock Guards
export const mockGuards: MockGuard[] = [
  {
    id: 1,
    userId: 3,
    nationalId: "1234567890",
    experience: "5",
    specializations: ["personal", "events"],
    rating: "4.9",
    totalJobs: 127,
    profileImage: "/assets/male_1751872460287.png",
    isVerified: true,
    isAvailable: true
  },
  {
    id: 2,
    userId: 4,
    nationalId: "1234567891",
    experience: "8",
    specializations: ["events", "site"],
    rating: "4.7",
    totalJobs: 89,
    profileImage: "/assets/male_1751872460287.png",
    isVerified: true,
    isAvailable: true
  },
  {
    id: 3,
    userId: 5,
    nationalId: "1234567892",
    experience: "3",
    specializations: ["personal", "gate"],
    rating: "4.8",
    totalJobs: 45,
    profileImage: "/assets/male_1751872460287.png",
    isVerified: true,
    isAvailable: true
  },
  {
    id: 4,
    userId: 6,
    nationalId: "1234567893",
    experience: "6",
    specializations: ["events", "residential"],
    rating: "4.9",
    totalJobs: 98,
    profileImage: "/assets/female_1751872460286.png",
    isVerified: true,
    isAvailable: true
  },
  {
    id: 5,
    userId: 7,
    nationalId: "1234567894",
    experience: "4",
    specializations: ["events", "residential"],
    rating: "4.7",
    totalJobs: 67,
    profileImage: "/assets/female_1751872460286.png",
    isVerified: true,
    isAvailable: true
  },
  {
    id: 6,
    userId: 8,
    nationalId: "1234567895",
    experience: "5",
    specializations: ["residential", "personal"],
    rating: "4.8",
    totalJobs: 78,
    profileImage: "/images/guards/female-guard.svg",
    isVerified: true,
    isAvailable: true
  }
];

// Mock Service Requests
export const mockServiceRequests: MockServiceRequest[] = [
  {
    id: 1,
    clientId: 2,
    serviceType: "personal",
    location: "مركز الملك عبدالله المالي",
    date: "2024-01-15T14:00:00",
    duration: "4",
    status: "pending",
    notes: "حارس شخصي لاجتماع مهم",
    guardGender: "male",
    jobDescription: "مرافقة شخصية هامة VIP"
  },
  {
    id: 2,
    clientId: 2,
    serviceType: "events",
    location: "قصر الأفراح الذهبي",
    date: "2024-01-16T18:00:00",
    duration: "8",
    status: "active",
    notes: "حفل زفاف نسائي",
    guardGender: "female",
    jobDescription: "تنظيم دخول المدعوين فقط"
  },
  {
    id: 3,
    clientId: 2,
    serviceType: "residential",
    location: "مجمع سكني راقي",
    date: "2024-01-17T10:00:00",
    duration: "6",
    status: "completed",
    notes: "حراسة مناسبة خاصة",
    guardGender: "female",
    jobDescription: "مراقبة منطقة محددة"
  }
];

// Mock Quotes
export const mockQuotes: MockQuote[] = [
  {
    id: 1,
    requestId: 1,
    guardId: 1,
    price: "350",
    notes: "خبرة 5 سنوات في الحراسة الشخصية • مدرب على الإسعافات الأولية",
    status: "pending",
    arrivalTime: "15 دقيقة",
    badge: "مرخص ومؤمن"
  },
  {
    id: 2,
    requestId: 1,
    guardId: 2,
    price: "320",
    notes: "خبرة 8 سنوات • متخصص في حراسة الفعاليات • يتحدث الإنجليزية",
    status: "pending",
    arrivalTime: "20 دقيقة",
    badge: "حارس معتمد"
  },
  {
    id: 3,
    requestId: 1,
    guardId: 3,
    price: "300",
    notes: "خبرة 3 سنوات • متاح فوراً • تدريب عسكري سابق",
    status: "pending",
    arrivalTime: "10 دقائق",
    badge: "متاح الآن",
    available: true
  },
  {
    id: 4,
    requestId: 2,
    guardId: 4,
    price: "380",
    notes: "خبرة 6 سنوات • خدمات حراسة لقصور الأفراح والمناسبات النسائية • مدربة على البروتوكولات الخاصة",
    status: "pending",
    arrivalTime: "25 دقيقة",
    badge: "حارسة معتمدة"
  },
  {
    id: 5,
    requestId: 2,
    guardId: 5,
    price: "340",
    notes: "خبرة 4 سنوات • خدمات الحراسة المنزلية والمناسبات العائلية • متاحة على مدار الساعة",
    status: "pending",
    arrivalTime: "30 دقيقة",
    badge: "متخصصة منازل"
  },
  {
    id: 6,
    requestId: 3,
    guardId: 6,
    price: "400",
    notes: "خبرة 5 سنوات • خدمات حراسة VIP للسيدات • تدريب أمني متقدم • سرية تامة",
    status: "pending",
    arrivalTime: "20 دقيقة",
    badge: "حارسة VIP"
  }
];

// Service types
export const serviceTypes = [
  { id: "personal", name: "حارس شخصي", icon: "user-shield" },
  { id: "gate", name: "حارس بوابة", icon: "door-open" },
  { id: "events", name: "حراسة مناسبات", icon: "calendar" },
  { id: "site", name: "حراسة موقع", icon: "building" }
];

// Admin statistics
export const adminStats = {
  totalClients: 1234,
  totalGuards: 456,
  activeOrders: 89,
  monthlyRevenue: "89,250"
};

// Recent orders for admin
export const recentOrders = [
  {
    id: 1,
    type: "حارس شخصي",
    client: "أحمد السعد",
    status: "مكتمل",
    statusColor: "green"
  },
  {
    id: 2,
    type: "حراسة قصر أفراح",
    client: "قاعة الأميرات",
    status: "جاري",
    statusColor: "blue"
  },
  {
    id: 3,
    type: "حراسة منزلية",
    client: "فاطمة الأحمد",
    status: "قيد المراجعة",
    statusColor: "yellow"
  },
  {
    id: 4,
    type: "حراسة مناسبة نسائية",
    client: "قصر الفرح الملكي",
    status: "مكتمل",
    statusColor: "green"
  }
];

// Guard applications for admin
export const guardApplications = [
  {
    id: 1,
    name: "عبدالرحمن الغامدي",
    experience: "5 سنوات خبرة",
    image: "/images/guards/male-guard.svg"
  },
  {
    id: 2,
    name: "فاطمة الزهراني",
    experience: "6 سنوات خبرة - خدمت في قصور الأفراح",
    image: "/images/guards/female-guard.svg"
  },
  {
    id: 3,
    name: "نورا العتيبي",
    experience: "4 سنوات خبرة - خدمت في الحراسة المنزلية",
    image: "/images/guards/female-guard.svg"
  },
  {
    id: 4,
    name: "محمد القرني",
    experience: "7 سنوات خبرة",
    image: "/images/guards/guard-3.svg"
  }
];

// Function to get mock data with user relationships
export const getMockQuotesWithGuards = (requestId: number) => {
  return mockQuotes
    .filter(quote => quote.requestId === requestId)
    .map(quote => {
      const guard = mockGuards.find(g => g.id === quote.guardId);
      const user = mockUsers.find(u => u.id === guard?.userId);
      return {
        ...quote,
        guard: {
          ...guard,
          user
        }
      };
    });
};

export const getMockGuardByUserId = (userId: number) => {
  return mockGuards.find(guard => guard.userId === userId);
};

export const getMockUserByUsername = (username: string) => {
  return mockUsers.find(user => user.username === username);
};