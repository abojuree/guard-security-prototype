// بيانات وهمية للعرض التوضيحي - منصة حارس الأمن

export const mockUsers = {
  admin: {
    id: 1,
    username: "admin",
    userType: "admin",
    fullName: "مدير النظام",
    phone: "0501234567",
    email: "admin@haris.sa",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  client1: {
    id: 2,
    username: "client1",
    userType: "client",
    fullName: "أحمد السعد",
    phone: "0509876543",
    email: "ahmed@example.com",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  guard1: {
    id: 3,
    username: "guard1",
    userType: "guard",
    fullName: "خالد الأحمد",
    phone: "0551234567",
    email: "khalid@example.com",
    isActive: true,
    createdAt: new Date().toISOString()
  },
  guard2: {
    id: 4,
    username: "guard2",
    userType: "guard",
    fullName: "محمد السعد",
    phone: "0552345678",
    email: "mohammed@example.com",
    isActive: true,
    createdAt: new Date().toISOString()
  }
};

export const mockGuards = [
  {
    id: 1,
    userId: 3,
    fullName: "خالد الأحمد",
    phone: "0551234567",
    email: "khalid@example.com",
    experience: 5,
    specializations: ["أمن شخصي", "حراسة بوابات"],
    rating: 4.8,
    completedJobs: 150,
    isAvailable: true,
    profileImage: "/images/male_1751872460287.png",
    gender: "male",
    license: "LIC-2020-001",
    certifications: ["شهادة أمن شخصي", "شهادة إسعافات أولية"],
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    userId: 4,
    fullName: "محمد السعد",
    phone: "0552345678",
    email: "mohammed@example.com",
    experience: 3,
    specializations: ["أمن فعاليات", "حراسة ليلية"],
    rating: 4.6,
    completedJobs: 89,
    isAvailable: true,
    profileImage: "/images/male_1751872460287.png",
    gender: "male",
    license: "LIC-2021-002",
    certifications: ["شهادة أمن فعاليات"],
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    userId: 5,
    fullName: "نورا العتيبي",
    phone: "0553456789",
    email: "nora@example.com",
    experience: 4,
    specializations: ["أمن نسائي", "حراسة شخصية"],
    rating: 4.9,
    completedJobs: 120,
    isAvailable: false,
    profileImage: "/images/female_1751872460286.png",
    gender: "female",
    license: "LIC-2020-003",
    certifications: ["شهادة أمن نسائي", "شهادة حراسة VIP"],
    createdAt: new Date().toISOString()
  }
];

export const mockServiceRequests = [
  {
    id: 1,
    clientId: 2,
    serviceType: "personal",
    title: "حراسة شخصية - اجتماع عمل",
    description: "أحتاج حارس أمن للمرافقة في اجتماع عمل مهم",
    location: "مركز الملك عبدالله المالي، الرياض",
    date: "2025-07-15",
    startTime: "09:00",
    endTime: "17:00",
    duration: 8,
    requirements: ["خبرة في الأمن الشخصي", "مظهر مهني"],
    budget: 1200,
    status: "pending",
    urgency: "normal",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    clientId: 2,
    serviceType: "event",
    title: "أمن فعالية - حفل زفاف",
    description: "حفل زفاف يحتاج تأمين شامل للمكان والضيوف",
    location: "قاعة الياسمين، الرياض",
    date: "2025-07-20",
    startTime: "17:00",
    endTime: "02:00",
    duration: 9,
    requirements: ["خبرة في الفعاليات", "فريق من 3 حراس"],
    budget: 2500,
    status: "active",
    urgency: "high",
    createdAt: new Date().toISOString()
  }
];

export const mockQuotes = [
  {
    id: 1,
    requestId: 1,
    guardId: 1,
    price: 1000,
    description: "أستطيع تقديم خدمة حراسة شخصية احترافية",
    estimatedDuration: 8,
    availability: "متاح فوراً",
    status: "pending",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    requestId: 1,
    guardId: 2,
    price: 1100,
    description: "خدمة حراسة شخصية مع خبرة في القطاع التجاري",
    estimatedDuration: 8,
    availability: "متاح",
    status: "pending",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    requestId: 2,
    guardId: 3,
    price: 2200,
    description: "فريق أمن متخصص في الفعاليات الاجتماعية",
    estimatedDuration: 9,
    availability: "متاح للتاريخ المحدد",
    status: "accepted",
    createdAt: new Date().toISOString()
  }
];

export const mockBookings = [
  {
    id: 1,
    requestId: 2,
    guardId: 3,
    clientId: 2,
    quoteId: 3,
    status: "confirmed",
    startTime: "2025-07-20T17:00:00Z",
    endTime: "2025-07-21T02:00:00Z",
    totalPrice: 2200,
    paymentStatus: "paid",
    createdAt: new Date().toISOString()
  }
];

export const mockReports = [
  {
    id: 1,
    bookingId: 1,
    guardId: 3,
    title: "تقرير أمن الفعالية",
    description: "تم تأمين الفعالية بنجاح دون أي حوادث",
    incidentCount: 0,
    recommendations: "تم العمل بشكل احترافي",
    status: "completed",
    createdAt: new Date().toISOString()
  }
];

// وظائف مساعدة للبيانات الوهمية
export const getMockUserByCredentials = (username: string, password: string) => {
  // كلمات مرور ثابتة للعرض التوضيحي
  const credentials: Record<string, string> = {
    admin: "admin123",
    client1: "client123", 
    guard1: "guard123",
    guard2: "guard123"
  };
  
  if (credentials[username] === password) {
    return mockUsers[username as keyof typeof mockUsers];
  }
  return null;
};

export const getMockGuardByUserId = (userId: number) => {
  return mockGuards.find(guard => guard.userId === userId);
};

export const getMockAvailableGuards = () => {
  return mockGuards.filter(guard => guard.isAvailable);
};

export const getMockServiceRequestsByClient = (clientId: number) => {
  return mockServiceRequests.filter(request => request.clientId === clientId);
};

export const getMockQuotesByRequest = (requestId: number) => {
  return mockQuotes.filter(quote => quote.requestId === requestId);
};

export const getMockBookingsByClient = (clientId: number) => {
  return mockBookings.filter(booking => booking.clientId === clientId);
};