import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Clock, AlertTriangle, MessageSquare, Settings, CheckCheck, DollarSign, Star } from "lucide-react";
import BottomNav from "@/components/ui/bottom-nav";

export default function GuardNotifications() {
  const [filter, setFilter] = useState("all");

  // بيانات الإشعارات الافتراضية لحراس الأمن
  const notifications = [
    {
      id: 1,
      type: "new_job",
      title: "طلب عمل جديد",
      message: "طلب جديد لحراسة فعالية في مركز الملك عبدالله المالي",
      time: "منذ 5 دقائق",
      isRead: false,
      clientName: "أحمد",
      location: "مركز الملك عبدالله المالي",
      icon: MapPin,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      type: "job_accepted",
      title: "تم قبول عرضك",
      message: "تم قبول عرضك للعمل مع العميل سارة",
      time: "منذ 30 دقيقة",
      isRead: false,
      clientName: "سارة",
      icon: CheckCheck,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      type: "payment_received",
      title: "تم استلام الدفعة",
      message: "تم إيداع 1500 ريال في حسابك عن المهمة المكتملة",
      time: "منذ ساعتين",
      isRead: true,
      amount: "1500 ريال",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 4,
      type: "shift_reminder",
      title: "تذكير بموعد العمل",
      message: "يبدأ عملك في فندق الريتز كارلتون خلال ساعة واحدة",
      time: "منذ 3 ساعات",
      isRead: true,
      location: "فندق الريتز كارلتون",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: 5,
      type: "client_message",
      title: "رسالة من العميل",
      message: "أرسل لك عبدالله رسالة: 'أشكرك على الخدمة الممتازة'",
      time: "أمس",
      isRead: false,
      clientName: "عبدالله",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 6,
      type: "rating_received",
      title: "تقييم جديد",
      message: "قيمك أحد العملاء بـ 5 نجوم مع تعليق إيجابي",
      time: "أمس",
      isRead: true,
      clientName: "أحمد",
      rating: 5,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    // Logic to mark all notifications as read
    console.log("Marking all notifications as read");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link href="/guard/dashboard">
              <Button variant="ghost" size="sm" className="ml-4 text-gray-600">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <h3 className="text-xl font-bold">الإشعارات</h3>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              <CheckCheck className="w-4 h-4 ml-1" />
              قراءة الكل
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="text-xs"
          >
            الكل ({notifications.length})
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
            className="text-xs"
          >
            غير مقروءة ({unreadCount})
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`bg-white rounded-xl custom-shadow transition-all ${
                !notification.isRead ? 'border-r-4 border-r-secondary' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full ${notification.bgColor} ml-3 flex-shrink-0`}>
                    <notification.icon className={`w-5 h-5 ${notification.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm">{notification.title}</h4>
                      <div className="flex items-center">
                        {!notification.isRead && (
                          <Badge variant="secondary" className="bg-secondary text-white text-xs ml-2">
                            جديد
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                    
                    {/* Additional info based on notification type */}
                    {notification.clientName && notification.type !== "rating_received" && (
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <span>العميل: {notification.clientName}</span>
                      </div>
                    )}
                    
                    {notification.location && (
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <MapPin className="w-3 h-3 ml-1" />
                        <span>{notification.location}</span>
                      </div>
                    )}
                    
                    {notification.amount && (
                      <div className="flex items-center text-xs font-semibold text-green-600 mb-1">
                        <DollarSign className="w-3 h-3 ml-1" />
                        <span>{notification.amount}</span>
                      </div>
                    )}
                    
                    {notification.rating && (
                      <div className="flex items-center text-xs text-yellow-600 mb-1">
                        <div className="flex ml-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < notification.rating ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                        <span>({notification.rating}/5)</span>
                      </div>
                    )}

                    {/* Action buttons for specific notification types */}
                    {notification.type === "new_job" && (
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="bg-secondary text-white text-xs h-auto py-1">
                          عرض التفاصيل
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs h-auto py-1">
                          تقديم عرض
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-white p-8 text-center">
            <CardContent className="p-0">
              <div className="text-gray-400 mb-4">
                <Settings className="w-12 h-12 mx-auto mb-2" />
              </div>
              <h4 className="text-lg font-semibold text-gray-600 mb-2">لا توجد إشعارات</h4>
              <p className="text-gray-500">ستظهر إشعاراتك هنا عند توفرها</p>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav activeTab="notifications" userType="guard" />
    </div>
  );
}