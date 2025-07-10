import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Star, Clock, MapPin, Phone, AlertTriangle, FileText, Calendar, Upload, MessageSquare, Mic } from "lucide-react";
import { formatDateToArabic, formatTimeToArabic } from "@/lib/utils";
import BottomNav from "@/components/ui/bottom-nav";
import ComprehensiveReportModal from "@/components/modals/comprehensive-report-modal";
import CancelScheduledOrderModal from "@/components/modals/cancel-scheduled-order-modal";
import RequestDetailsModal from "@/components/modals/request-details-modal";
import AttendanceModal from "@/components/modals/attendance-modal";
import FileUploadModal from "@/components/modals/file-upload-modal";
import MessageModal from "@/components/modals/message-modal";
import VoiceChatModal from "@/components/modals/voice-chat-modal";
import RatingModal from "@/components/modals/rating-modal";
import EditRequestModal from "@/components/modals/edit-request-modal";
import GuardQuotesModal from "@/components/modals/guard-quotes-modal";
import CancelRequestModal from "@/components/modals/cancel-request-modal";
import TrackingModal from "@/components/modals/tracking-modal";


export default function OrderHistory() {
  const [, setLocation] = useLocation();
  const [showComprehensiveReport, setShowComprehensiveReport] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [showCancelScheduledOrder, setShowCancelScheduledOrder] = useState(false);
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showEditRequest, setShowEditRequest] = useState(false);
  const [showGuardQuotes, setShowGuardQuotes] = useState(false);
  const [showCancelRequest, setShowCancelRequest] = useState(false);
  const [showTracking, setShowTracking] = useState(false);

  // التحقق من localStorage للتوجيه تلقائياً إلى عروض الأسعار
  useEffect(() => {
    const shouldNavigateToQuotes = localStorage.getItem('shouldNavigateToQuotes');
    if (shouldNavigateToQuotes === 'true') {
      localStorage.removeItem('shouldNavigateToQuotes');
      setTimeout(() => {
        setLocation('/client/quotes-list');
      }, 100);
    }
  }, [setLocation]);

  const handleReportClick = (order: any) => {
    setSelectedOrder(order);
    setShowComprehensiveReport(true);
  };

  // بيانات وهمية للطلبات
  const originalActiveOrders = [
    {
      id: 1,
      type: "حارس شخصي",
      date: "2024-01-15",
      time: "14:00",
      duration: "4 ساعات",
      location: "مول الرياض",
      status: "جاري التنفيذ",
      jobDescription: "مرافقة شخصية هامة VIP",
      guard: {
        name: "خالد الأحمد",
        image: "/images/male_1751872460287.png",
        phone: "+966501234567",
        rating: "4.9"
      },
      price: "800 ريال",
      startTime: "منذ ساعة"
    },
    {
      id: 2,
      type: "حارس موقع",
      date: "2024-01-16",
      time: "08:00",
      duration: "8 ساعات",
      location: "شركة الأعمال المتقدمة",
      status: "تم قبول العرض (على الموعد)",
      jobDescription: "نقطة تفتيش بوابات",
      guard: {
        name: "أحمد السعد",
        image: "/images/male_1751872460287.png",
        phone: "+966502345678",
        rating: "4.7"
      },
      price: "1200 ريال",
      startTime: "غداً"
    },
    {
      id: 3,
      type: "حارس موقع",
      date: "2024-01-17",
      time: "16:00",
      duration: "8 ساعات",
      location: "قصر آسيا للاحتفالات",
      status: "جاري التنفيذ",
      jobDescription: "تنظيم دخول المدعوين",
      guardGender: "female",
      guard: {
        name: "نورا العتيبي",
        image: "/images/female_1751872460286.png",
        phone: "+966503456789",
        rating: "4.8"
      },
      price: "1600 ريال",
      startTime: "منذ 30 دقيقة"
    },
    {
      id: 4,
      type: "حارس فعاليات",
      date: "2024-01-18",
      time: "10:00",
      duration: "6 ساعات",
      location: "فندق الريتز كارلتون",
      status: "بانتظار عروض حراس الأمن",
      jobDescription: "مؤتمر أعمال دولي",
      guard: null,
      price: "",
      startTime: "بعد غد"
    }
  ];

  const completedOrders = [
    {
      id: 3,
      type: "حارس شخصي",
      date: "2024-01-10",
      time: "10:00",
      duration: "6 ساعات",
      location: "مستشفى المملكة",
      status: "مكتمل",
      jobDescription: "مراقبة أنظمة أمن",
      guard: {
        name: "محمد الغامدي",
        image: "/images/male_1751872460287.png",
        phone: "+966503456789",
        rating: "4.8"
      },
      price: "1500 ريال",
      completedAt: "منذ 5 أيام"
    },
    {
      id: 4,
      type: "حارس موقع",
      date: "2024-01-05",
      time: "18:00",
      duration: "12 ساعة",
      location: "قاعة الملك فهد",
      status: "مكتمل",
      jobDescription: "حراسة مؤتمر أو فعالية",
      guard: {
        name: "عبدالله الحربي",
        image: "/images/male_1751872460287.png",
        phone: "+966504567890",
        rating: "4.6"
      },
      price: "2400 ريال",
      completedAt: "منذ 10 أيام",
      customerRating: 4
    },
    {
      id: 5,
      type: "حارس شخصي",
      date: "2024-01-12",
      time: "15:00",
      duration: "4 ساعات",
      location: "فعالية خاصة - قاعة الملك فيصل",
      status: "ملغي",
      jobDescription: "حراسة فعالية خاصة",
      guard: {
        name: "سالم العتيبي",
        image: "/images/male_1751872460287.png",
        phone: "+966505678901",
        rating: "4.6"
      },
      price: "1000 ريال",
      originalPrice: "1250 ريال",
      cancellationFee: "250 ريال",
      refundAmount: "1000 ريال",
      cancelledAt: "منذ 3 أيام",
      cancellationReason: "تم الإلغاء بناءً على طلب العميل"
    }
  ];

  // ترتيب الطلبات النشطة بحيث تظهر الطلبات في انتظار العروض في المقدمة
  const activeOrders = [...originalActiveOrders].sort((a, b) => {
    // إذا كان الطلب الأول في انتظار عروض والثاني ليس كذلك، ضع الأول في المقدمة
    if (a.status === "بانتظار عروض حراس الأمن" && b.status !== "بانتظار عروض حراس الأمن") {
      return -1;
    }
    // إذا كان الطلب الثاني في انتظار عروض والأول ليس كذلك، ضع الثاني في المقدمة
    if (b.status === "بانتظار عروض حراس الأمن" && a.status !== "بانتظار عروض حراس الأمن") {
      return 1;
    }
    // إذا كان كلاهما بنفس النوع، حافظ على الترتيب الأصلي
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "جاري التنفيذ":
        return "bg-blue-100 text-blue-800";
      case "تم قبول العرض (على الموعد)":
        return "bg-purple-100 text-purple-800";
      case "بانتظار عروض حراس الأمن":
        return "bg-yellow-100 text-yellow-800";
      case "ملغي":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReport = (bookingId: number) => {
    setSelectedBookingId(bookingId);
    setShowComprehensiveReport(true);
  };

  const handleOpenModal = (modalType: string, order: any) => {
    setSelectedOrder(order);
    switch (modalType) {
      case 'details':
        setShowRequestDetails(true);
        break;
      case 'attendance':
        setShowAttendance(true);
        break;
      case 'upload':
        setShowFileUpload(true);
        break;
      case 'message':
        setShowMessage(true);
        break;
      case 'voice':
        setShowVoiceChat(true);
        break;
      case 'rating':
        setShowRating(true);
        break;
      case 'edit':
        setShowEditRequest(true);
        break;
      case 'quotes':
        // التوجه إلى عروض الأسعار مباشرة (لأننا نحن في صفحة طلباتي)
        localStorage.setItem('lastRequestGender', order.guard?.gender || 'male');
        setLocation('/client/quotes-list');
        break;
      case 'cancel':
        setShowCancelRequest(true);
        break;
      case 'tracking':
        setShowTracking(true);
        break;
      case 'cancelScheduled':
        setShowCancelScheduledOrder(true);
        break;
    }
  };

  const OrderCard = ({ order, isActive = false }: { order: any, isActive?: boolean }) => (
    <Card className={isActive ? "bg-white rounded-xl custom-shadow status-active mb-4" : "bg-white rounded-xl custom-shadow mb-4"} dir="rtl">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="font-semibold">{order.type}</p>
            {order.jobDescription && (
              <p className="text-gray-600 text-sm font-medium">{order.jobDescription}</p>
            )}
            <p className="text-gray-600 text-sm">{formatDateToArabic(order.date)} - {order.time}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>

        {order.guard ? (
          <div className="flex items-center mb-3">
            <img 
              src={order.guard.image} 
              alt={order.guard.name}
              className="w-8 h-8 rounded-full object-cover ml-3 border-2 border-gray-200"
              style={{ 
                objectFit: 'cover',
                maxWidth: '32px',
                maxHeight: '32px',
                width: '32px',
                height: '32px'
              }}
            />
            <div className="flex-1">
              <p className="font-semibold text-sm">{order.guard.name}</p>
              <div className="flex items-center">
                <div className="flex text-yellow-400 text-xs">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <span className="text-gray-600 text-xs mr-2">({order.guard.rating})</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{order.price}</div>
            </div>
          </div>
        ) : order.status !== "ملغي" ? (
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 ml-3 flex items-center justify-center">
              <Clock className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-600">في انتظار تخصيص حارس</p>
              <p className="text-xs text-gray-500">سيتم تخصيص حارس قريباً</p>
            </div>
            {order.price && (
              <div className="text-right">
                <div className="text-lg font-bold text-orange-600">{order.price}</div>
              </div>
            )}
          </div>
        ) : null}

        {isActive ? (
          <>
            {/* الأزرار الرئيسية */}
            {order.status === "بانتظار عروض حراس الأمن" ? (
              // أزرار خاصة للطلبات في انتظار العروض
              <div className="space-y-2">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold h-auto"
                  onClick={() => handleOpenModal('edit', order)}
                >
                  تعديل الطلب
                </Button>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-semibold h-auto"
                  onClick={() => handleOpenModal('quotes', order)}
                >
                  مشاهدة عروض حراس الأمن
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 py-2 rounded-lg text-sm font-semibold h-auto"
                  onClick={() => handleOpenModal('cancel', order)}
                >
                  إلغاء الطلب
                </Button>
              </div>
            ) : order.guard && order.status !== "ملغي" ? (
              // أزرار الطلبات النشطة مع حارس أمن
              <>
                <div className="flex gap-2 mb-3">
                  <Button className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-semibold h-auto">
                    <Phone className="ml-2 w-4 h-4" />
                    اتصال
                  </Button>
                  {order.status === "تم قبول العرض (على الموعد)" ? (
                    <Button 
                      variant="secondary"
                      className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg text-xs font-medium h-auto"
                      onClick={() => handleOpenModal('cancelScheduled', order)}
                    >
                      <AlertTriangle className="ml-2 w-3 h-3" />
                      إلغاء الطلب
                    </Button>
                  ) : (
                    <Button 
                      variant="secondary"
                      className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg text-sm font-semibold h-auto"
                      onClick={() => handleOpenModal('tracking', order)}
                    >
                      <MapPin className="ml-2 w-4 h-4" />
                      تتبع
                    </Button>
                  )}
                </div>

                {/* الإجراءات السريعة */}
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs py-1 h-auto flex flex-col items-center gap-1"
                    onClick={() => handleOpenModal('details', order)}
                  >
                    <FileText className="w-3 h-3" />
                    التفاصيل
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs py-1 h-auto flex flex-col items-center gap-1"
                    onClick={() => handleOpenModal('attendance', order)}
                  >
                    <Calendar className="w-3 h-3" />
                    الحضور
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs py-1 h-auto flex flex-col items-center gap-1"
                    onClick={() => handleOpenModal('upload', order)}
                  >
                    <Upload className="w-3 h-3" />
                    إرفاق
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs py-1 h-auto flex flex-col items-center gap-1"
                    onClick={() => handleOpenModal('message', order)}
                  >
                    <MessageSquare className="w-3 h-3" />
                    رسالة
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs py-1 h-auto flex flex-col items-center gap-1"
                    onClick={() => handleOpenModal('voice', order)}
                  >
                    <Mic className="w-3 h-3" />
                    صوتي
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs py-1 h-auto flex flex-col items-center gap-1"
                    onClick={() => handleOpenModal('rating', order)}
                  >
                    <Star className="w-3 h-3" />
                    تقييم
                  </Button>
                </div>
              </>
            ) : order.status === "ملغي" ? (
              // طلب ملغي
              <>
                <div className="flex gap-2 mb-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-red-50 text-red-600 border-red-200 py-2 rounded-lg text-sm font-semibold h-auto"
                    disabled
                  >
                    <AlertTriangle className="ml-2 w-4 h-4" />
                    طلب ملغي
                  </Button>
                </div>
                
                {/* معلومات الإلغاء المالية */}
                {order.originalPrice && order.cancellationFee && order.refundAmount && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">تفاصيل الإلغاء</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">السعر الأصلي:</span>
                        <span className="font-medium">{order.originalPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">رسوم الإلغاء (20%):</span>
                        <span className="font-medium text-red-600">-{order.cancellationFee}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-1 mt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-semibold">المبلغ المسترد:</span>
                          <span className="font-bold text-green-600">{order.refundAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </>
        ) : order.status === "مكتمل" ? (
          <>
            {/* الطلبات المكتملة */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 text-gray-600">
                إعادة طلب
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-blue-600 border-blue-300"
                onClick={() => handleReportClick(order)}
              >
                <FileText className="w-4 h-4 ml-2" />
                تقرير حارس الأمن
              </Button>
            </div>

            {order.customerRating ? (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">تقييمك للخدمة:</span>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < order.customerRating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold h-auto"
                  onClick={() => handleOpenModal('rating', order)}
                >
                  <Star className="w-4 h-4 ml-2" />
                  قيّم حارس الأمن
                </Button>
              </div>
            )}
          </>
        ) : null}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center mb-4">
          <Link href="/client/dashboard">
            <Button variant="ghost" size="sm" className="ml-4 text-gray-600">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <h3 className="text-xl font-bold">طلباتي</h3>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active">الطلبات النشطة ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">المكتملة ({completedOrders.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => (
                <OrderCard key={order.id} order={order} isActive={true} />
              ))
            ) : (
              <Card className="bg-white p-8 text-center">
                <CardContent className="p-0">
                  <div className="text-gray-400 mb-4">
                    <Clock className="w-12 h-12 mx-auto mb-2" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">لا توجد طلبات نشطة</h4>
                  <p className="text-gray-500 mb-4">لم تقم بإنشاء أي طلبات نشطة حالياً</p>
                  <Link href="/client/new-request">
                    <Button className="bg-primary text-white">
                      إنشاء طلب جديد
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {completedOrders.length > 0 ? (
              completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} isActive={false} />
              ))
            ) : (
              <Card className="bg-white p-8 text-center">
                <CardContent className="p-0">
                  <div className="text-gray-400 mb-4">
                    <Clock className="w-12 h-12 mx-auto mb-2" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">لا توجد طلبات مكتملة</h4>
                  <p className="text-gray-500">لم تقم بإكمال أي طلبات حتى الآن</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav activeTab="orders" userType="client" />
      
      {showComprehensiveReport && selectedOrder && (
        <ComprehensiveReportModal
          isOpen={showComprehensiveReport}
          order={selectedOrder}
          onClose={() => setShowComprehensiveReport(false)}
        />
      )}

      {showRequestDetails && selectedOrder && (
        <RequestDetailsModal
          isOpen={showRequestDetails}
          request={selectedOrder}
          onClose={() => setShowRequestDetails(false)}
        />
      )}

      {showAttendance && selectedOrder && (
        <AttendanceModal
          isOpen={showAttendance}
          guard={selectedOrder.guard}
          onClose={() => setShowAttendance(false)}
        />
      )}

      {showFileUpload && (
        <FileUploadModal
          isOpen={showFileUpload}
          onClose={() => setShowFileUpload(false)}
        />
      )}

      {showMessage && selectedOrder && (
        <MessageModal
          isOpen={showMessage}
          guard={selectedOrder.guard}
          onClose={() => setShowMessage(false)}
        />
      )}

      {showVoiceChat && selectedOrder && (
        <VoiceChatModal
          isOpen={showVoiceChat}
          guard={selectedOrder.guard}
          onClose={() => setShowVoiceChat(false)}
        />
      )}

      {showRating && selectedOrder && (
        <RatingModal
          isOpen={showRating}
          guard={selectedOrder.guard}
          onClose={() => setShowRating(false)}
        />
      )}

      {showEditRequest && selectedOrder && (
        <EditRequestModal 
          isOpen={showEditRequest}
          request={selectedOrder}
          onClose={() => setShowEditRequest(false)}
          onSave={(updatedRequest) => {
            console.log('Updated request:', updatedRequest);
          }}
        />
      )}

      {showGuardQuotes && selectedOrder && (
        <GuardQuotesModal 
          isOpen={showGuardQuotes}
          request={selectedOrder}
          onClose={() => setShowGuardQuotes(false)}
        />
      )}

      {showCancelRequest && selectedOrder && (
        <CancelRequestModal 
          isOpen={showCancelRequest}
          request={selectedOrder}
          onClose={() => setShowCancelRequest(false)}
          onConfirm={() => {
            console.log('Request canceled:', selectedOrder);
          }}
        />
      )}

      {showTracking && selectedOrder && (
        <TrackingModal 
          guard={selectedOrder.guard}
          onClose={() => setShowTracking(false)}
        />
      )}

      {showCancelScheduledOrder && selectedOrder && (
        <CancelScheduledOrderModal
          isOpen={showCancelScheduledOrder}
          onClose={() => setShowCancelScheduledOrder(false)}
          order={selectedOrder}
          onConfirm={() => {
            setShowCancelScheduledOrder(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
}