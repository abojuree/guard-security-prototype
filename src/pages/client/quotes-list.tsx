import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, MapPin, Clock } from "lucide-react";
import { formatDateToArabic } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import BookingConfirmationModal from "@/components/modals/booking-confirmation-modal";
import BottomNav from "@/components/ui/bottom-nav";



export default function QuotesList() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);

  // دالة لتحويل الوقت من نظام 24 ساعة إلى 12 ساعة
  const convertTo12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'مساءً' : 'صباحاً';
    const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // الحصول على جنس حارس الأمن المطلوب من الطلب
  // يجب الحصول على هذه القيمة من البيانات المرسلة مع الطلب
  const urlParams = new URLSearchParams(window.location.search);
  const requestGender = urlParams.get('gender') || localStorage.getItem('lastRequestGender') || "male";

  // بيانات وهمية لتفاصيل الطلب (في التطبيق الحقيقي ستأتي من الخادم)
  const requestDetails = {
    serviceType: "حارس شخصي",
    duration: "4 ساعات", 
    date: "اليوم",
    time: convertTo12Hour("14:00"), // تحويل من 14:00 إلى 2:00 مساءً
    location: "مول الرياض - الدور الأول",
    gender: requestGender === 'male' ? 'ذكر' : 'أنثى',
    description: "مرافقة شخصية هامة VIP",
    equipment: ["جهاز اتصال لاسلكي", "بدلة رسمية"],
    skills: ["مهارات قتالية", "خبرة في الحماية الشخصية"]
  };

  // جميع عروض الأسعار (قبل التصفية)
  const allQuotes = [
    {
      id: 1,
      guard: {
        user: { fullName: "خالد الأحمد" },
        profileImage: "/images/male_1751872460287.png",
        rating: "4.9",
        experience: "5 سنوات",
        totalJobs: 150,
        specializations: [],
        isVerified: true,
        city: "الرياض",
        gender: "male"
      },
      price: "200",
      dailyRate: "200 ريال",
      totalPrice: "800 ريال",
      duration: "4 ساعات",
      arrivalTime: "30 دقيقة",
      status: "pending",
      available: true
    },
    {
      id: 2,
      guard: {
        user: { fullName: "أحمد السعد" },
        profileImage: "/images/male_1751872460287.png",
        rating: "4.7",
        experience: "3 سنوات",
        totalJobs: 89,
        specializations: [],
        isVerified: true,
        city: "جدة",
        gender: "male"
      },
      price: "180",
      dailyRate: "180 ريال",
      totalPrice: "720 ريال",
      duration: "4 ساعات",
      arrivalTime: "45 دقيقة",

      status: "pending",
      available: true
    },
    {
      id: 3,
      guard: {
        user: { fullName: "فاطمة الزهراني" },
        profileImage: "/images/female_1751872460286.png",
        rating: "4.9",
        experience: "6 سنوات",
        totalJobs: 180,
        specializations: [],
        isVerified: true,
        city: "الرياض",
        gender: "female"
      },
      price: "250",
      dailyRate: "250 ريال",
      totalPrice: "1000 ريال",
      duration: "4 ساعات",
      arrivalTime: "20 دقيقة",

      status: "pending",
      available: true
    },
    {
      id: 4,
      guard: {
        user: { fullName: "نورا العتيبي" },
        profileImage: "/images/female_1751872460286.png",
        rating: "4.7",
        experience: "4 سنوات",
        totalJobs: 120,
        specializations: [],
        isVerified: true,
        city: "جدة",
        gender: "female"
      },
      price: "220",
      dailyRate: "220 ريال",
      totalPrice: "880 ريال",
      duration: "4 ساعات",
      arrivalTime: "35 دقيقة",

      status: "pending",
      available: true
    },
    {
      id: 5,
      guard: {
        user: { fullName: "محمد الغامدي" },
        profileImage: "/images/male_1751872460287.png",
        rating: "4.8",
        experience: "7 سنوات",
        totalJobs: 210,
        specializations: [],
        isVerified: true,
        city: "الدمام",
        gender: "male"
      },
      price: "300",
      dailyRate: "300 ريال",
      totalPrice: "1200 ريال",
      duration: "4 ساعات",
      arrivalTime: "40 دقيقة",

      status: "pending",
      available: true
    }
  ];

  // تصفية العروض حسب جنس حارس الأمن المطلوب
  const quotes = allQuotes.filter(quote => quote.guard.gender === requestGender);

  const handleSelectQuote = (quote: any) => {
    setSelectedQuote(quote);
    setShowBookingModal(true);
  };

  const handleBookingConfirm = () => {
    toast({
      title: "تم إرسال المهمة لحارس الأمن",
      description: "يظهر لك الآن رقم حارس الأمن قم بالتواصل معه وتأكيد المهمة",
    });
    setShowBookingModal(false);
    setLocation("/client/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center mb-4">
          <Link href="/client/orders">
            <Button variant="ghost" size="sm" className="ml-4 text-gray-600">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <h3 className="text-xl font-bold">عروض الأسعار</h3>
        </div>
        <p className="text-gray-600">تم العثور على {quotes.length} عروض متاحة</p>
      </div>

      {/* ملخص تفاصيل الطلب */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 mx-4 mt-4 rounded-xl p-4 custom-shadow">
        <div className="flex items-center mb-3">
          <div className="w-2 h-8 bg-primary rounded-full ml-3"></div>
          <h4 className="text-lg font-bold text-gray-800">تفاصيل الطلب</h4>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 ml-2">نوع الخدمة:</span>
              <span className="text-gray-600">{requestDetails.serviceType}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 ml-2">المدة:</span>
              <span className="text-gray-600">{requestDetails.duration}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 ml-2">الجنس:</span>
              <span className="text-gray-600">{requestDetails.gender}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 ml-2">التاريخ:</span>
              <span className="text-gray-600">{requestDetails.date}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 ml-2">الوقت:</span>
              <span className="text-gray-600">{requestDetails.time}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 ml-2">الموقع:</span>
              <span className="text-gray-600">{requestDetails.location}</span>
            </div>
          </div>
        </div>
        {requestDetails.description && (
          <div className="mt-3 pt-3 border-t border-blue-200">
            <div className="flex items-start">
              <span className="font-semibold text-gray-700 ml-2">الوصف:</span>
              <span className="text-gray-600">{requestDetails.description}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {quotes.map((quote) => (
            <Card key={quote.id} className="bg-white rounded-xl custom-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={quote.guard.profileImage} 
                    alt={quote.guard.user.fullName}
                    className="w-16 h-16 rounded-full object-cover ml-4 border-2 border-gray-200"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-1 flex-wrap gap-2">
                      <h4 className="font-bold text-lg truncate max-w-[200px] sm:max-w-none">{quote.guard.user.fullName}</h4>
                      {quote.guard.isVerified && (
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-100 text-green-800 flex-shrink-0 text-xs">
                          موثق
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 ml-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(parseFloat(quote.guard.rating)) ? 'fill-current' : 'stroke-current fill-none'}`} />
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm">({quote.guard.rating})</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <span className="ml-4">{quote.guard.experience} خبرة</span>
                      <span className="ml-4">{quote.guard.totalJobs} مهمة</span>
                      <span>• {quote.guard.city}</span>
                    </div>
                  </div>
                </div>



                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center text-gray-600 min-w-0">
                    <Clock className="w-4 h-4 ml-2 flex-shrink-0" />
                    <span className="text-sm truncate" style={{ direction: 'ltr' }}>وقت الوصول: {quote.arrivalTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600 flex-shrink-0">
                    <MapPin className="w-4 h-4 ml-2" />
                    <span className="text-sm">قريب من موقعك</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                      <span className="text-xl font-bold text-primary ml-2">{quote.dailyRate}</span>
                      <span className="text-gray-600 text-sm">لكل ساعة</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-green-600 ml-2">{quote.totalPrice}</span>
                      <span className="text-gray-600 text-sm">المجموع ({quote.duration})</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      onClick={() => handleSelectQuote(quote)}
                      className="bg-primary text-white px-6 w-full"
                    >
                      اختيار العرض
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <p className="text-blue-800 font-semibold mb-2">لم تجد العرض المناسب؟</p>
              <Button variant="outline" className="text-blue-600 border-blue-600">
                طلب عروض إضافية
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {showBookingModal && selectedQuote && (
        <BookingConfirmationModal
          quote={selectedQuote}
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleBookingConfirm}
        />
      )}

      <BottomNav activeTab="orders" userType="client" />
    </div>
  );
}