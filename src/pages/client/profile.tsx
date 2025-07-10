import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Edit, Phone, Mail, MapPin, Star, Shield, LogOut, Bell, HelpCircle, FileText } from "lucide-react";
import { useAppStore } from "@/hooks/use-app-store";
import BottomNav from "@/components/ui/bottom-nav";
import TermsOfServiceModal from "@/components/modals/terms-of-service-modal";
// Use the image from public/images directory

export default function ClientProfile() {
  const { currentUser, logout } = useAppStore();
  const [, setLocation] = useLocation();
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleLogout = () => {
    logout();
    // العودة إلى صفحة تسجيل الدخول الرئيسية
    setLocation("/");
  };

  // بيانات وهمية للإحصائيات
  const userStats = {
    totalOrders: 15,
    completedOrders: 12,
    avgRating: 4.8,
    totalSpent: "18,500 ريال"
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center mb-4">
          <Link href="/client/dashboard">
            <Button variant="ghost" size="sm" className="ml-4 text-gray-600">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <h3 className="text-xl font-bold">الملف الشخصي</h3>
        </div>
      </div>

      <div className="p-6">
        {/* Profile Header */}
        <Card className="bg-white rounded-xl custom-shadow mb-6">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <img 
                src="/images/client-saudi.png" 
                alt="صورة العميل" 
                className="w-16 h-16 rounded-full object-cover ml-4 border-2 border-gray-200"
                style={{ 
                  objectFit: 'cover',
                  maxWidth: '64px',
                  maxHeight: '64px',
                  width: '64px',
                  height: '64px'
                }}
              />
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-1">{currentUser?.fullName || "أحمد محمد"}</h4>
                <p className="text-gray-600 mb-2">عميل مميز</p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                  <span className="text-sm text-gray-600">تقييم العميل: {userStats.avgRating}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white rounded-xl custom-shadow mb-6">
          <CardContent className="p-6">
            <h5 className="font-bold text-lg mb-4">معلومات الاتصال</h5>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 ml-3" />
                <div>
                  <p className="font-semibold">رقم الجوال</p>
                  <p className="text-gray-600">+966501234567</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 ml-3" />
                <div>
                  <p className="font-semibold">البريد الإلكتروني</p>
                  <p className="text-gray-600">ahmed@example.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 ml-3" />
                <div>
                  <p className="font-semibold">العنوان</p>
                  <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="bg-white rounded-xl custom-shadow mb-6">
          <CardContent className="p-6">
            <h5 className="font-bold text-lg mb-4">إحصائياتي</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{userStats.totalOrders}</div>
                <div className="text-sm text-gray-600">إجمالي الطلبات</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">{userStats.completedOrders}</div>
                <div className="text-sm text-gray-600">طلبات مكتملة</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 mb-1">{userStats.avgRating}</div>
                <div className="text-sm text-gray-600">متوسط التقييم</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">{userStats.totalSpent}</div>
                <div className="text-sm text-gray-600">إجمالي الإنفاق</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="bg-white rounded-xl custom-shadow mb-6">
          <CardContent className="p-6">
            <h5 className="font-bold text-lg mb-4">إعدادات الحساب</h5>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <Shield className="w-5 h-5 ml-3 text-gray-400" />
                <div className="text-right flex-1">
                  <p className="font-semibold">الأمان والخصوصية</p>
                  <p className="text-sm text-gray-600">تغيير كلمة المرور وإعدادات الأمان</p>
                </div>
              </Button>

              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <Bell className="w-5 h-5 ml-3 text-gray-400" />
                <div className="text-right flex-1">
                  <p className="font-semibold">الإشعارات</p>
                  <p className="text-sm text-gray-600">إدارة إشعارات التطبيق</p>
                </div>
              </Button>

              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <HelpCircle className="w-5 h-5 ml-3 text-gray-400" />
                <div className="text-right flex-1">
                  <p className="font-semibold">المساعدة والدعم</p>
                  <p className="text-sm text-gray-600">الأسئلة الشائعة ومركز المساعدة</p>
                </div>
              </Button>

              <Button 
                onClick={() => setShowTermsModal(true)}
                variant="ghost" 
                className="w-full justify-start p-0 h-auto"
              >
                <FileText className="w-5 h-5 ml-3 text-gray-400" />
                <div className="text-right flex-1">
                  <p className="font-semibold">الاتفاقية وشروط الاستخدام</p>
                  <p className="text-sm text-gray-600">مراجعة بنود الاتفاقية والشروط</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button 
          onClick={handleLogout}
          variant="outline" 
          className="w-full border-red-300 text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 ml-2" />
          تسجيل الخروج
        </Button>
      </div>

      <BottomNav activeTab="profile" userType="client" />

      {/* Terms of Service Modal */}
      <TermsOfServiceModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        userType="client"
        showAcceptButton={false}
      />
    </div>
  );
}