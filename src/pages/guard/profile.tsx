import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Edit, Phone, Mail, MapPin, Star, Shield, LogOut, Bell, HelpCircle, Award, FileText } from "lucide-react";
import { useAppStore } from "@/hooks/use-app-store";
import BottomNav from "@/components/ui/bottom-nav";
import TermsOfServiceModal from "@/components/modals/terms-of-service-modal";


export default function GuardProfile() {
  const { currentUser, currentGuard, logout } = useAppStore();
  const [, setLocation] = useLocation();
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleLogout = () => {
    logout();
    // العودة إلى صفحة تسجيل الدخول الرئيسية
    setLocation("/");
  };

  // بيانات وهمية للإحصائيات
  const guardStats = {
    totalJobs: currentGuard?.totalJobs || 127,
    rating: currentGuard?.rating || "4.9",
    experience: currentGuard?.experience || "5",
    totalEarnings: "45,250 ريال"
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center mb-4">
          <Link href="/guard/dashboard">
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
                src="/images/male_1751872460287.png" 
                alt="صورة حارس الأمن" 
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
                <h4 className="text-xl font-bold mb-1">{currentUser?.fullName || "خالد الأحمد"}</h4>
                <p className="text-gray-600 mb-2">حارس أمن مؤهل</p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                  <span className="text-sm text-gray-600">تقييم: {guardStats.rating}</span>
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
                  <p className="text-gray-600">khalid@example.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 ml-3" />
                <div>
                  <p className="font-semibold">المنطقة</p>
                  <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Statistics */}
        <Card className="bg-white rounded-xl custom-shadow mb-6">
          <CardContent className="p-6">
            <h5 className="font-bold text-lg mb-4">إحصائياتي المهنية</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-secondary mb-1">{guardStats.totalJobs}</div>
                <div className="text-sm text-gray-600">إجمالي المهام</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 mb-1">{guardStats.rating}</div>
                <div className="text-sm text-gray-600">متوسط التقييم</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">{guardStats.experience}</div>
                <div className="text-sm text-gray-600">سنوات الخبرة</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">{guardStats.totalEarnings}</div>
                <div className="text-sm text-gray-600">إجمالي الأرباح</div>
              </div>
            </div>
          </CardContent>
        </Card>

        

        {/* Financial Operations */}
        <Card className="bg-white rounded-xl custom-shadow mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-bold text-lg">العمليات المالية</h5>
              <Button variant="outline" size="sm" className="text-primary border-primary">
                تغيير الحساب البنكي
              </Button>
            </div>
            
            {/* Current Bank Account */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">البنك الأهلي التجاري</p>
                  <p className="text-sm text-gray-600">**** **** **** 1234</p>
                  <p className="text-xs text-gray-500">آخر تحديث: منذ 3 أيام</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
              </div>
            </div>

            {/* Financial Status Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600 mb-1">2,340 ريال</div>
                <div className="text-xs text-blue-700">قادمة</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600 mb-1">45,250 ريال</div>
                <div className="text-xs text-green-700">تم إيداعها</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600 mb-1">680 ريال</div>
                <div className="text-xs text-yellow-700">معلقة</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600 mb-1">150 ريال</div>
                <div className="text-xs text-red-700">ملغية</div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/guard/earnings">
                <Button variant="outline" className="text-primary border-primary">
                  عرض تفاصيل العمليات المالية
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Customer Reviews */}
        <Card className="bg-white rounded-xl custom-shadow mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-bold text-lg">تقييمات العملاء</h5>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                <span className="text-sm text-gray-600">{guardStats.rating} من 5</span>
              </div>
            </div>

            {/* Overall Rating Stats */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              <div className="text-center">
                <div className="text-sm font-bold">5⭐</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="text-xs text-gray-600">85%</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold">4⭐</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
                <div className="text-xs text-gray-600">12%</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold">3⭐</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '2%' }}></div>
                </div>
                <div className="text-xs text-gray-600">2%</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold">2⭐</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '1%' }}></div>
                </div>
                <div className="text-xs text-gray-600">1%</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold">1⭐</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="text-xs text-gray-600">0%</div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="space-y-3">
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="text-yellow-400 text-sm ml-2">⭐⭐⭐⭐⭐</div>
                    <span className="text-sm font-semibold">عميل م*** أ***</span>
                  </div>
                  <span className="text-xs text-gray-500">منذ يومين</span>
                </div>
                <p className="text-sm text-gray-700">"أداء ممتاز وحرفية عالية في التعامل، موقع ***دي"</p>
              </div>
              
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="text-yellow-400 text-sm ml-2">⭐⭐⭐⭐⭐</div>
                    <span className="text-sm font-semibold">عميل أ*** س***</span>
                  </div>
                  <span className="text-xs text-gray-500">منذ أسبوع</span>
                </div>
                <p className="text-sm text-gray-700">"حارس أمن موثوق ومتفاني، موقع ***اض"</p>
              </div>

              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="text-yellow-400 text-sm ml-2">⭐⭐⭐⭐</div>
                    <span className="text-sm font-semibold">عميل م*** ع***</span>
                  </div>
                  <span className="text-xs text-gray-500">منذ أسبوعين</span>
                </div>
                <p className="text-sm text-gray-700">"التزام بالمواعيد وأداء جيد، موقع ***دة"</p>
              </div>
            </div>

            <div className="text-center mt-4">
              <Button variant="outline" className="text-primary border-primary">
                عرض جميع التقييمات (127 تقييم)
              </Button>
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
                <Award className="w-5 h-5 ml-3 text-gray-400" />
                <div className="text-right flex-1">
                  <p className="font-semibold">الشهادات والوثائق</p>
                  <p className="text-sm text-gray-600">إدارة الشهادات المهنية والوثائق</p>
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
                  <p className="font-semibold">الاتفاقية وشروط التسجيل</p>
                  <p className="text-sm text-gray-600">مراجعة بنود الاتفاقية وشروط العمل</p>
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

      <BottomNav activeTab="profile" userType="guard" />

      {/* Terms of Service Modal */}
      <TermsOfServiceModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        userType="guard"
        showAcceptButton={false}
      />
    </div>
  );
}