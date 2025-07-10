
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Clock, MapPin, User, Shield } from "lucide-react";

export default function RequestSummary() {
  const { requestId } = useParams<{ requestId: string }>();

  // بيانات وهمية للطلب
  const request = {
    id: requestId,
    serviceType: "حارس شخصي",
    location: "مركز الملك عبدالله المالي، الرياض",
    date: "01/08/2025",
    time: "09:00 صباحاً",
    duration: "4 ساعات",
    status: "تم الإرسال",
    requestNumber: `REQ-${requestId || '001'}`,
    estimatedQuotes: 5,
    guardGender: "male",
    jobDescription: "مرافقة شخصية هامة VIP"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center mb-4">
          <Link href="/client/dashboard">
            <Button variant="ghost" size="sm" className="ml-4 text-gray-600">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <h3 className="text-xl font-bold">ملخص الطلب</h3>
        </div>
      </div>

      <div className="p-6">
        {/* Success Message */}
        <Card className="bg-green-50 border-green-200 mb-6">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-green-800 mb-2">
              تم إرسال طلبك بنجاح!
            </h4>
            <p className="text-green-700 mb-4">
              سيتم إرسال عروض الأسعار من حراس الأمن المؤهلين قريباً
            </p>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              رقم الطلب: {request.requestNumber}
            </Badge>
          </CardContent>
        </Card>

        {/* Request Details */}
        <Card className="bg-white mb-6">
          <CardContent className="p-6">
            <h5 className="text-lg font-bold mb-4">تفاصيل الطلب</h5>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-primary ml-3" />
                <div>
                  <p className="text-sm text-gray-600">نوع الخدمة</p>
                  <p className="font-semibold">{request.serviceType}</p>
                  {request.jobDescription && (
                    <p className="text-sm text-gray-600 font-medium">{request.jobDescription}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-primary ml-3" />
                <div>
                  <p className="text-sm text-gray-600">الموقع</p>
                  <p className="font-semibold">{request.location}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 text-primary ml-3" />
                <div>
                  <p className="text-sm text-gray-600">التاريخ والوقت</p>
                  <p className="font-semibold">{request.date} - {request.time}</p>
                </div>
              </div>

              <div className="flex items-center">
                <User className="w-5 h-5 text-primary ml-3" />
                <div>
                  <p className="text-sm text-gray-600">المدة المطلوبة</p>
                  <p className="font-semibold">{request.duration}</p>
                </div>
              </div>

              <div className="flex items-center">
                <User className="w-5 h-5 text-primary ml-3" />
                <div>
                  <p className="text-sm text-gray-600">حارس الأمن المطلوب</p>
                  <p className="font-semibold">{request.guardGender === "female" ? "حارسة أمن إمرأة" : "حارس أمن رجل"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Update */}
        <Card className="bg-blue-50 border-blue-200 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h6 className="font-bold text-blue-800">حالة الطلب</h6>
                <p className="text-blue-700">جاري البحث عن حراس الأمن المناسبين</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {request.status}
              </Badge>
            </div>
            <div className="mt-4 flex items-center text-blue-700">
              <Clock className="w-4 h-4 ml-2" />
              <span className="text-sm">متوقع وصول {request.estimatedQuotes} عروض خلال 30 دقيقة</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href={`/client/quotes/${requestId}?gender=${request.guardGender}`}>
            <Button className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg h-auto">
              تصفح عروض حراس الأمن
            </Button>
          </Link>
          
          <Link href="/client/dashboard">
            <Button 
              variant="outline" 
              className="w-full py-4 rounded-xl font-semibold text-lg h-auto"
            >
              العودة للرئيسية
            </Button>
          </Link>
        </div>

        {/* Information Card */}
        <Card className="bg-gray-50 border-gray-200 mt-6">
          <CardContent className="p-6">
            <h6 className="font-bold text-gray-800 mb-3">معلومات مهمة</h6>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-primary ml-2">•</span>
                <span>سيتم إشعارك فور وصول عروض الأسعار</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary ml-2">•</span>
                <span>يمكنك مراجعة تفاصيل كل حارس أمن قبل الاختيار</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary ml-2">•</span>
                <span>جميع حراس الأمن مؤهلين ومراجعين من قبل الإدارة</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
