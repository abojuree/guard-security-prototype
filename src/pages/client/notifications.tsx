
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Clock, AlertTriangle, MessageSquare, Settings, CheckCheck } from "lucide-react";
import BottomNav from "@/components/ui/bottom-nav";

export default function ClientNotifications() {
  const [filter, setFilter] = useState("all");

  // بيانات الإشعارات الافتراضية
  const notifications = [
    {
      id: 1,
      type: "guard_arrival",
      title: "وصول حارس الأمن للموقع",
      message: "وصل خالد الأحمد إلى الموقع المحدد",
      time: "منذ 5 دقائق",
      isRead: false,
      guardName: "خالد الأحمد",
      location: "مركز الملك عبدالله المالي",
      icon: MapPin,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 2,
      type: "shift_start",
      title: "بداية فترة عمل حارس الأمن",
      message: "بدأ محمد العتيبي فترة العمل",
      time: "منذ 30 دقيقة",
      isRead: false,
      guardName: "محمد العتيبي",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 3,
      type: "shift_end",
      title: "نهاية فترة عمل حارس الأمن",
      message: "انتهى سعد الشهري من فترة العمل بنجاح",
      time: "منذ ساعتين",
      isRead: true,
      guardName: "سعد الشهري",
      icon: Clock,
      color: "text-gray-600",
      bgColor: "bg-gray-50"
    },
    {
      id: 4,
      type: "guard_exit",
      title: "خروج حارس الأمن من الموقع",
      message: "غادر فهد القحطاني الموقع المحدد",
      time: "منذ 3 ساعات",
      isRead: true,
      guardName: "فهد القحطاني",
      location: "مجمع الأعمال التجاري",
      icon: MapPin,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: 5,
      type: "emergency",
      title: "حالة طارئة لدى أحد حراس الأمن",
      message: "أبلغ ناصر الدوسري عن حالة طارئة تتطلب تدخل فوري",
      time: "أمس",
      isRead: false,
      guardName: "ناصر الدوسري",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      urgent: true
    },
    {
      id: 6,
      type: "guard_message",
      title: "رسالة من حارس الأمن",
      message: "أرسل عبدالله الزهراني رسالة: 'تم إنجاز المهام المطلوبة بنجاح'",
      time: "أمس",
      isRead: true,
      guardName: "عبدالله الزهراني",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 7,
      type: "admin_message",
      title: "رسالة من إدارة التطبيق",
      message: "تحديث جديد متاح الآن! يحتوي على تحسينات في الأمان والأداء",
      time: "منذ يومين",
      isRead: true,
      icon: Settings,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  const filterOptions = [
    { value: "all", label: "الكل", count: notifications.length },
    { value: "unread", label: "غير مقروءة", count: notifications.filter(n => !n.isRead).length },
    { value: "emergency", label: "طارئة", count: notifications.filter(n => n.urgent).length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "emergency") return notification.urgent;
    return true;
  });

  const markAllAsRead = () => {
    // هنا يمكن إضافة منطق تحديث الحالة
    console.log("تم وضع علامة قراءة على جميع الإشعارات");
  };

  const getNotificationIcon = (notification: any) => {
    const IconComponent = notification.icon;
    return (
      <div className={`w-10 h-10 rounded-full ${notification.bgColor} flex items-center justify-center`}>
        <IconComponent className={`w-5 h-5 ${notification.color}`} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link href="/client/dashboard">
              <Button variant="ghost" size="sm" className="ml-4 text-gray-600">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <h3 className="text-xl font-bold">الإشعارات</h3>
          </div>
          <Button
            onClick={markAllAsRead}
            variant="ghost"
            size="sm"
            className="text-primary"
          >
            <CheckCheck className="w-4 h-4 ml-1" />
            وضع علامة قراءة على الكل
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => setFilter(option.value)}
              variant={filter === option.value ? "default" : "outline"}
              size="sm"
              className={`h-8 ${
                filter === option.value 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              {option.label}
              {option.count > 0 && (
                <Badge variant="secondary" className="mr-2 h-5 px-2 text-xs">
                  {option.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-6">
        {filteredNotifications.length === 0 ? (
          <Card className="bg-white text-center p-8">
            <CardContent className="p-0">
              <div className="text-gray-400 mb-4">
                <MessageSquare className="w-16 h-16 mx-auto" />
              </div>
              <h4 className="text-lg font-semibold text-gray-600 mb-2">لا توجد إشعارات</h4>
              <p className="text-gray-500">ستظهر هنا جميع الإشعارات الخاصة بك</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id}
                className={`bg-white custom-shadow cursor-pointer hover:shadow-md transition-shadow ${
                  !notification.isRead ? 'border-l-4 border-l-primary' : ''
                } ${notification.urgent ? 'ring-2 ring-red-200' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification)}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className={`font-semibold text-sm ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                          {notification.urgent && (
                            <Badge variant="destructive" className="mr-2 text-xs">
                              طارئ
                            </Badge>
                          )}
                        </h4>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {notification.time}
                        </span>
                      </div>
                      
                      <p className={`text-sm mb-2 ${
                        !notification.isRead ? 'text-gray-800' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>
                      
                      {(notification.guardName || notification.location) && (
                        <div className="flex flex-wrap gap-2 text-xs">
                          {notification.guardName && (
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {notification.guardName}
                            </span>
                          )}
                          {notification.location && (
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              📍 {notification.location}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav activeTab="notifications" userType="client" />
    </div>
  );
}
