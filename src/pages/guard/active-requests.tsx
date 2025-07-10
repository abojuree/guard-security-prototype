import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, MapPin, DollarSign, User, Phone, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/ui/bottom-nav";
import QuoteFormModal from "@/components/modals/quote-form-modal";

export default function ActiveRequests() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const { toast } = useToast();

  // بيانات وهمية للطلبات المتاحة
  const availableRequests = [
    {
      id: 1,
      serviceType: "حارس شخصي",
      location: "مركز الملك عبدالله المالي",
      date: "2024-01-15",
      time: "14:00",
      duration: "4 ساعات",
      client: {
        name: "أحمد",
        rating: "4.8",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      },
      budget: "600-800 ريال",
      priority: "عالية",
      description: "حراسة شخصية لفعالية تجارية مهمة",
      jobDescription: "مرافقة شخصية هامة VIP",
      requirements: ["خبرة 3+ سنوات", "شهادة أمنية", "لباقة في التعامل"],
      distance: "2.5 كم",
      postedTime: "منذ 15 دقيقة",
      quotesCount: 3,
      guardGender: "male"
    },
    {
      id: 2,
      serviceType: "حارس بوابة",
      location: "شركة التقنيات المتطورة",
      date: "2024-01-16",
      time: "08:00",
      duration: "8 ساعات",
      client: {
        name: "شركة التقنيات",
        rating: "4.9",
        avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      },
      budget: "400-600 ريال",
      priority: "متوسطة",
      description: "حراسة بوابة مكتب تجاري",
      jobDescription: "نقطة تفتيش بوابات",
      requirements: ["انضباط في المواعيد", "خبرة بوابات", "مظهر جيد"],
      distance: "5.1 كم",
      postedTime: "منذ 45 دقيقة",
      quotesCount: 7,
      guardGender: "male"
    },
    {
      id: 3,
      serviceType: "حراسة مناسبة",
      location: "قاعة الأفراح الملكية",
      date: "2024-01-17",
      time: "19:00",
      duration: "6 ساعات",
      client: {
        name: "منظم المناسبات الذهبي",
        rating: "4.7",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
      },
      budget: "800-1200 ريال",
      priority: "عالية",
      description: "حراسة حفل زفاف لـ 200 ضيف",
      jobDescription: "تنظيم دخول المدعوين",
      requirements: ["خبرة مناسبات", "لباس رسمي", "مهارات تواصل"],
      distance: "8.3 كم",
      postedTime: "منذ ساعة",
      quotesCount: 12,
      guardGender: "female"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "عالية":
        return "bg-red-100 text-red-800";
      case "متوسطة":
        return "bg-yellow-100 text-yellow-800";
      case "منخفضة":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSendQuote = (request: any) => {
    setSelectedRequest(request);
    setShowQuoteModal(true);
  };

  const handleQuoteSubmitted = () => {
    toast({
      title: "تم إرسال العرض بنجاح",
      description: "سيتم إشعارك عند رد العميل",
    });
    setShowQuoteModal(false);
  };

  const RequestCard = ({ request }: { request: any }) => (
    <Card className="bg-white rounded-xl custom-shadow mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-lg">{request.serviceType}</h4>
              <Badge className={getPriorityColor(request.priority)}>
                {request.priority}
              </Badge>
            </div>
            {request.jobDescription && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 font-medium">{request.jobDescription}</p>
              </div>
            )}
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 ml-2" />
              <span className="text-sm">{request.location}</span>
              <span className="text-xs text-gray-400 mr-2">({request.distance})</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <Clock className="w-4 h-4 ml-2" />
              <span className="text-sm">{request.date} - {request.time} ({request.duration})</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <DollarSign className="w-4 h-4 ml-2" />
              <span className="text-sm font-semibold text-green-600">{request.budget}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-3">
              <User className="w-4 h-4 ml-2" />
              <span className="text-sm">{request.guardGender === "female" ? "مطلوب حارسة أمن إمرأة" : "مطلوب حارس أمن رجل"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <img 
            src={request.client.avatar} 
            alt={request.client.name}
            className="w-10 h-10 rounded-full object-cover ml-3"
          />
          <div className="flex-1">
            <div className="flex items-center">
              <h5 className="font-semibold text-sm ml-2">{request.client.name}</h5>
              <div className="flex items-center text-yellow-400 text-xs">
                <span>⭐</span>
                <span className="text-gray-600 mr-1">({request.client.rating})</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {request.quotesCount} عروض أسعار مرسلة
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {request.postedTime}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-3">{request.description}</p>
          <div className="mb-3">
            <h6 className="text-sm font-semibold text-gray-700 mb-2">المتطلبات:</h6>
            <div className="flex flex-wrap gap-2">
              {request.requirements.map((req: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-primary border-primary"
          >
            <Phone className="w-4 h-4 ml-2" />
            اتصال
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-primary border-primary"
          >
            <MessageSquare className="w-4 h-4 ml-2" />
            رسالة
          </Button>
          <Button 
            onClick={() => handleSendQuote(request)}
            className="flex-1 bg-primary text-white hover:bg-primary/90"
          >
            إرسال عرض
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center mb-4">
          <Link href="/guard/dashboard">
            <Button variant="ghost" size="sm" className="ml-4 text-gray-600">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <h3 className="text-xl font-bold">الطلبات المتاحة</h3>
        </div>
        <p className="text-gray-600">{availableRequests.length} طلبات متاحة في منطقتك</p>
      </div>

      <div className="p-6">
        {/* Filter Pills */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button variant="default" size="sm" className="bg-primary text-white flex-shrink-0">
            الكل ({availableRequests.length})
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0">
            حارس شخصي (1)
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0">
            حارس بوابة (1)
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0">
            مناسبات (1)
          </Button>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {availableRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <Button variant="outline" className="text-primary border-primary">
            عرض المزيد من الطلبات
          </Button>
        </div>
      </div>

      <BottomNav activeTab="requests" userType="guard" />
      
      {showQuoteModal && selectedRequest && (
        <QuoteFormModal
          request={selectedRequest}
          onClose={() => setShowQuoteModal(false)}
          onSubmit={handleQuoteSubmitted}
        />
      )}
    </div>
  );
}