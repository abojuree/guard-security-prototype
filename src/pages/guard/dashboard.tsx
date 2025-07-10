import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  TriangleAlert,
  Check,
  Shield,
  LogOut,
  UserMinus,
  Users,
  FileText,
  MapPin,
} from "lucide-react";
import { useAppStore } from "@/hooks/use-app-store";
import { useLocation } from "wouter";
import BottomNav from "@/components/ui/bottom-nav";
import QuoteFormModal from "@/components/modals/quote-form-modal";
import GuardEmergencyReportModal from "@/components/modals/guard-emergency-report-modal";
import WithdrawalRequestModal from "@/components/modals/withdrawal-request-modal";
import SiteHandoverModal from "@/components/modals/site-handover-modal";
import TaskDetailsModal from "@/components/modals/task-details-modal";
import TaskLocationModal from "@/components/modals/task-location-modal";

export default function GuardDashboard() {
  const { currentUser, currentGuard, logout } = useAppStore();
  const [, setLocation] = useLocation();
  const [isAvailable, setIsAvailable] = useState(true);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showEmergencyReport, setShowEmergencyReport] = useState(false);
  const [showWithdrawalRequest, setShowWithdrawalRequest] = useState(false);
  const [showSiteHandover, setShowSiteHandover] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showTaskLocation, setShowTaskLocation] = useState(false);

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const stats = {
    rating: currentGuard?.rating || "4.9",
    totalJobs: currentGuard?.totalJobs || 127,
    earnings: "2,350",
  };

  const newRequest = {
    id: 1,
    type: "حارس شخصي",
    time: "اليوم - 2:00 م",
    location: "مركز الملك عبدالله المالي",
    duration: "4 ساعات",
    client: "أحمد",
  };

  const activeJob = {
    type: "حارس بوابة",
    duration: "بدأت منذ ساعتين",
    location: "فندق الريتز كارلتون",
  };

  const recentEarnings = [
    { service: "حارس شخصي", date: "أمس - 4 ساعات", amount: "+297 ريال" },
    {
      service: "حراسة فعالية",
      date: "الأسبوع الماضي - 8 ساعات",
      amount: "+612 ريال",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6 custom-shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              مرحباً {currentUser?.fullName || "خالد"}
            </h3>
            <p className="text-gray-600">جاهز لتلقي الطلبات؟</p>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="ml-3 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
            </Button>
            <div className="ml-4 flex flex-col items-center">
              <Switch
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
                className="data-[state=checked]:bg-secondary"
              />
              <p
                className={`text-xs mt-1 ${isAvailable ? "text-secondary" : "text-gray-500"}`}
              >
                {isAvailable ? "متاح" : "غير متاح"}
              </p>
            </div>
            <img
              src="/images/male_1751872460287.png"
              alt="حارس الأمن"
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white p-4 text-center custom-shadow">
            <CardContent className="p-0">
              <p className="text-2xl font-bold text-primary">{stats.rating}</p>
              <p className="text-gray-600 text-sm">التقييم</p>
            </CardContent>
          </Card>
          <Card className="bg-white p-4 text-center custom-shadow">
            <CardContent className="p-0">
              <p className="text-2xl font-bold text-secondary">
                {stats.totalJobs}
              </p>
              <p className="text-gray-600 text-sm">الطلبات</p>
            </CardContent>
          </Card>
          <Card className="bg-white p-4 text-center custom-shadow">
            <CardContent className="p-0">
              <p className="text-2xl font-bold text-yellow-600">
                {stats.earnings}
              </p>
              <p className="text-gray-600 text-sm">ريال</p>
            </CardContent>
          </Card>
        </div>

        {/* New Requests */}
        <div className="mb-6">
          <h4 className="text-lg font-bold mb-4">طلبات جديدة</h4>

          <Card className="bg-white rounded-xl custom-shadow border-r-4 border-blue-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ml-3">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold">{newRequest.type}</p>
                      <p className="text-gray-600 text-sm">{newRequest.time}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-3 space-y-1">
                    <p>📍 {newRequest.location}</p>
                    <p>⏰ {newRequest.duration}</p>
                    <p>👤 {newRequest.client}</p>
                  </div>
                </div>

                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                  جديد
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold h-auto"
                >
                  تجاهل/اخفاء
                </Button>
                <Button
                  onClick={() => setShowQuoteForm(true)}
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold h-auto"
                >
                  إرسال عرض
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Jobs */}
        <div className="mb-6">
          <h4 className="text-lg font-bold mb-4">المهام النشطة</h4>

          <Card className="bg-white rounded-xl custom-shadow status-active">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-bold">{activeJob.type}</p>
                  <p className="text-gray-600 text-sm">{activeJob.duration}</p>
                  <p className="text-gray-600 text-sm">{activeJob.location}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  جاري العمل
                </span>
              </div>

              {/* Gate Security Specific Buttons */}
              {activeJob.type === "حارس بوابة" ? (
                <div className="space-y-3">
                  {/* First Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => setShowEmergencyReport(true)}
                      variant="destructive"
                      className="bg-red-100 text-red-800 py-3 rounded-lg font-semibold hover:bg-red-200 h-auto"
                    >
                      <TriangleAlert className="ml-2 w-4 h-4" />
                      بلاغ طارئ
                    </Button>
                    <Button
                      onClick={() => setShowWithdrawalRequest(true)}
                      variant="outline"
                      className="bg-orange-100 text-orange-800 border-orange-300 py-3 rounded-lg font-semibold hover:bg-orange-200 h-auto"
                    >
                      <UserMinus className="ml-2 w-4 h-4" />
                      طلب انسحاب
                    </Button>
                  </div>

                  {/* Second Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => setShowSiteHandover(true)}
                      variant="outline"
                      className="bg-blue-100 text-blue-800 border-blue-300 py-3 rounded-lg font-semibold hover:bg-blue-200 h-auto"
                    >
                      <Users className="ml-2 w-4 h-4" />
                      تسليم موقع
                    </Button>
                    <Button
                      onClick={() => setShowTaskDetails(true)}
                      variant="outline"
                      className="bg-gray-100 text-gray-800 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 h-auto"
                    >
                      <FileText className="ml-2 w-4 h-4" />
                      تفاصيل المهمة
                    </Button>
                  </div>

                  {/* Third Row */}
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => setShowTaskLocation(true)}
                      variant="outline"
                      className="bg-green-100 text-green-800 border-green-300 py-3 rounded-lg font-semibold hover:bg-green-200 h-auto"
                    >
                      <MapPin className="ml-2 w-4 h-4" />
                      موقع المهمة
                    </Button>
                  </div>
                </div>
              ) : (
                /* Default buttons for other job types */
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowEmergencyReport(true)}
                    variant="destructive"
                    className="flex-1 bg-yellow-100 text-yellow-800 py-3 rounded-lg font-semibold hover:bg-yellow-200 h-auto"
                  >
                    <TriangleAlert className="ml-2 w-4 h-4" />
                    بلاغ طارئ
                  </Button>
                  <Button className="flex-1 bg-secondary text-white py-3 rounded-lg font-semibold h-auto">
                    <Check className="ml-2 w-4 h-4" />
                    إنهاء المهمة
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Earnings */}
        <div>
          <h4 className="text-lg font-bold mb-4">الأرباح الأخيرة</h4>

          <div className="space-y-3">
            {recentEarnings.map((earning, index) => (
              <Card key={index} className="bg-white rounded-xl custom-shadow">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{earning.service}</p>
                    <p className="text-gray-600 text-sm">{earning.date}</p>
                  </div>
                  <span className="text-secondary font-bold">
                    {earning.amount}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeTab="home" userType="guard" />

      {showQuoteForm && (
        <QuoteFormModal onClose={() => setShowQuoteForm(false)} />
      )}

      {showEmergencyReport && (
        <GuardEmergencyReportModal
          isOpen={showEmergencyReport}
          onClose={() => setShowEmergencyReport(false)}
        />
      )}

      {showWithdrawalRequest && (
        <WithdrawalRequestModal
          isOpen={showWithdrawalRequest}
          onClose={() => setShowWithdrawalRequest(false)}
          jobId={1}
        />
      )}

      {showSiteHandover && (
        <SiteHandoverModal
          isOpen={showSiteHandover}
          onClose={() => setShowSiteHandover(false)}
          jobId={1}
        />
      )}

      {showTaskDetails && (
        <TaskDetailsModal
          isOpen={showTaskDetails}
          onClose={() => setShowTaskDetails(false)}
        />
      )}

      {showTaskLocation && (
        <TaskLocationModal
          isOpen={showTaskLocation}
          onClose={() => setShowTaskLocation(false)}
        />
      )}
    </div>
  );
}
