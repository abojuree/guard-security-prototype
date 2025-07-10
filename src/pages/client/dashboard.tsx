import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, History, Phone, MapPin, FileText, Calendar, Upload, MessageSquare, Mic, Star, Clock, ArrowRight, AlertTriangle } from "lucide-react";
import { useAppStore } from "@/hooks/use-app-store";
import BottomNav from "@/components/ui/bottom-nav";
import TrackingModal from "@/components/modals/tracking-modal";
// Use the image from public/images directory
import RequestDetailsModal from "@/components/modals/request-details-modal";
import AttendanceModal from "@/components/modals/attendance-modal";
import FileUploadModal from "@/components/modals/file-upload-modal";
import MessageModal from "@/components/modals/message-modal";
import VoiceChatModal from "@/components/modals/voice-chat-modal";
import RatingModal from "@/components/modals/rating-modal";
import EditRequestModal from "@/components/modals/edit-request-modal";
import GuardQuotesModal from "@/components/modals/guard-quotes-modal";
import CancelRequestModal from "@/components/modals/cancel-request-modal";
import CancelScheduledOrderModal from "@/components/modals/cancel-scheduled-order-modal";
import ComprehensiveReportModal from "@/components/modals/comprehensive-report-modal";
import { useState } from "react";

import { formatDateToArabic, formatTimeToArabic } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ClientDashboard() {
  const { currentUser } = useAppStore();
  const [, setLocation] = useLocation();
  const [showTracking, setShowTracking] = useState(false);
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
  const [showCancelScheduledOrder, setShowCancelScheduledOrder] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // بيانات الطلبات النشطة مأخوذة من صفحة طلباتي
  const activeOrders = [
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
    }
  ];

  // بيانات الطلبات المكتملة التي تحتاج تقييم
  const completedOrders = [
    {
      id: 5,
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
      id: 6,
      type: "حارس موقع",
      date: "2024-01-08",
      time: "08:00",
      duration: "8 ساعات",
      location: "مركز التجارة العالمي",
      status: "مكتمل",
      jobDescription: "حراسة بوابة رئيسية",
      guard: {
        name: "عبدالله التميمي",
        image: "/images/male_1751872460287.png",
        phone: "+966504567890",
        rating: "4.9"
      },
      price: "1200 ريال",
      completedAt: "منذ أسبوع"
    }
  ];

  // ترتيب المهام حسب الأولوية (بانتظار عروض أولاً، ثم النشطة، ثم المكتملة)
  const waitingForQuotes = activeOrders.filter(order => order.status === "بانتظار عروض حراس الأمن");
  const otherActiveOrders = activeOrders.filter(order => order.status !== "بانتظار عروض حراس الأمن");
  const allTasks = [...waitingForQuotes, ...otherActiveOrders, ...completedOrders];

  // طباعة البيانات للتحقق
  console.log('Active Orders:', activeOrders.length);
  console.log('Completed Orders:', completedOrders.length);
  console.log('All Tasks:', allTasks.length, allTasks);

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
      default:
        return "bg-gray-100 text-gray-800";
    }
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
      case 'tracking':
        setShowTracking(true);
        break;
      case 'edit':
        setShowEditRequest(true);
        break;
      case 'quotes':
        // التوجه إلى صفحة طلباتي ثم عروض الأسعار
        localStorage.setItem('lastRequestGender', order.guard?.gender || 'male');
        localStorage.setItem('shouldNavigateToQuotes', 'true');
        setLocation('/client/orders');
        break;
      case 'cancel':
        setShowCancelRequest(true);
        break;
      case 'cancelScheduled':
        setShowCancelScheduledOrder(true);
        break;
      case 'report':
        setShowReport(true);
        break;
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6 custom-shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">مرحباً {currentUser?.fullName || "أحمد"}</h3>
            <p className="text-gray-600">ما نوع الخدمة التي تحتاجها؟</p>
          </div>
          <img 
            src="/images/client-saudi.png" 
            alt="صورة العميل" 
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
            style={{ 
              objectFit: 'cover',
              maxWidth: '40px',
              maxHeight: '40px',
              width: '40px',
              height: '40px'
            }}
          />
        </div>
      </div>

      <div className="p-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link href="/client/new-request">
            <Card className="bg-primary text-white p-6 text-center custom-shadow cursor-pointer hover:opacity-90 transition-opacity">
              <CardContent className="p-0">
                <Plus className="w-8 h-8 mb-2 mx-auto" />
                <p className="font-semibold">طلب جديد</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/client/orders">
            <Card className="bg-white text-gray-800 p-6 text-center custom-shadow cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <History className="w-8 h-8 mb-2 text-primary mx-auto" />
                <p className="font-semibold">طلباتي</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* المهام */}
        <div className="mb-6">
          <h4 className="text-lg font-bold mb-4">المهام ({allTasks.length})</h4>

          {allTasks.length > 0 ? (
            allTasks.map((order) => (
              <Card key={order.id} className={`bg-white rounded-xl custom-shadow mb-4 ${order.status === "مكتمل" ? "" : "status-active"}`} dir="rtl">
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
                  ) : (
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
                  )}

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
                  ) : order.guard && order.status !== "مكتمل" ? (
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
                  ) : order.status === "مكتمل" ? (
                    // طلب مكتمل يحتاج تقييم
                    <>
                      <div className="flex gap-2 mb-3">
                        <Button variant="outline" size="sm" className="flex-1 text-gray-600">
                          إعادة طلب
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-blue-600 border-blue-300"
                          onClick={() => handleOpenModal('report', order)}
                        >
                          <FileText className="w-4 h-4 ml-2" />
                          تقرير حارس الأمن
                        </Button>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold h-auto"
                          onClick={() => handleOpenModal('rating', order)}
                        >
                          <Star className="w-4 h-4 ml-2" />
                          قيّم حارس الأمن
                        </Button>
                      </div>
                    </>
                  ) : null}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-white p-8 text-center">
              <CardContent className="p-0">
                <div className="text-gray-400 mb-4">
                  <Clock className="w-12 h-12 mx-auto mb-2" />
                </div>
                <h4 className="text-lg font-semibold text-gray-600 mb-2">لا توجد مهام</h4>
                <p className="text-gray-500 mb-4">لم تقم بإنشاء أي مهام حالياً</p>
                <Link href="/client/new-request">
                  <Button className="bg-primary text-white">
                    إنشاء طلب جديد
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>


      </div>

      <BottomNav activeTab="home" userType="client" />

      {showTracking && selectedOrder && (
        <TrackingModal 
          guard={selectedOrder.guard}
          onClose={() => setShowTracking(false)}
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
            // Handle save logic here
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
            // Handle cancel logic here
            console.log('Request canceled:', selectedOrder);
          }}
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

      {showReport && selectedOrder && (
        <ComprehensiveReportModal
          isOpen={showReport}
          onClose={() => setShowReport(false)}
          order={selectedOrder}
        />
      )}
    </div>
  );
}