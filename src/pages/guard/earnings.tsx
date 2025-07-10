import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, DollarSign, TrendingUp, Calendar, Download, Eye } from "lucide-react";
import BottomNav from "@/components/ui/bottom-nav";

export default function GuardEarnings() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // بيانات وهمية للأرباح
  const earningsStats = {
    today: "245 ريال",
    thisWeek: "1,680 ريال", 
    thisMonth: "6,240 ريال",
    totalEarnings: "28,450 ريال",
    pendingPayment: "340 ريال",
    completedJobs: 42,
    avgJobRate: "148 ريال"
  };

  const monthlyEarnings = [
    {
      id: 1,
      jobType: "حارس شخصي",
      client: "أحمد",
      date: "2024-01-14",
      duration: "4 ساعات",
      amount: "600 ريال",
      status: "مكتمل",
      rating: 5
    },
    {
      id: 2,
      jobType: "حراسة مناسبة",
      client: "قاعة الأفراح الذهبية",
      date: "2024-01-12",
      duration: "6 ساعات", 
      amount: "900 ريال",
      status: "مكتمل",
      rating: 5
    },
    {
      id: 3,
      jobType: "حارس بوابة",
      client: "شركة التقنيات",
      date: "2024-01-10",
      duration: "8 ساعات",
      amount: "480 ريال",
      status: "مكتمل",
      rating: 4
    },
    {
      id: 4,
      jobType: "حارس شخصي",
      client: "محمد",
      date: "2024-01-08",
      duration: "3 ساعات",
      amount: "450 ريال",
      status: "قيد المراجعة",
      rating: null
    }
  ];

  const weeklyChart = [
    { day: "السبت", amount: 320 },
    { day: "الأحد", amount: 280 },
    { day: "الاثنين", amount: 420 },
    { day: "الثلاثاء", amount: 150 },
    { day: "الأربعاء", amount: 380 },
    { day: "الخميس", amount: 200 },
    { day: "الجمعة", amount: 450 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "قيد المراجعة":
        return "bg-yellow-100 text-yellow-800";
      case "في الانتظار":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const EarningCard = ({ earning }: { earning: any }) => (
    <Card className="bg-white rounded-xl custom-shadow mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-lg">{earning.jobType}</h4>
              <Badge className={getStatusColor(earning.status)}>
                {earning.status}
              </Badge>
            </div>
            <p className="text-gray-600 mb-1">{earning.client}</p>
            <p className="text-sm text-gray-500">{earning.date} • {earning.duration}</p>
          </div>
          <div className="text-left">
            <div className="text-xl font-bold text-green-600 mb-1">{earning.amount}</div>
            {earning.rating && (
              <div className="flex items-center text-yellow-400 text-sm">
                {Array.from({ length: earning.rating }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-gray-600">
            <Eye className="w-4 h-4 ml-2" />
            التفاصيل
          </Button>
          {earning.status === "مكتمل" && (
            <Button variant="outline" size="sm" className="flex-1 text-primary border-primary">
              <Download className="w-4 h-4 ml-2" />
              فاتورة
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center mb-4">
          <Link href="/guard/profile">
            <Button variant="ghost" size="sm" className="ml-4 text-gray-600">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <h3 className="text-xl font-bold">أرباحي</h3>
        </div>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">{earningsStats.thisMonth}</div>
              <div className="text-sm opacity-90">أرباح هذا الشهر</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">{earningsStats.completedJobs}</div>
              <div className="text-sm opacity-90">مهمة مكتملة</div>
            </CardContent>
          </Card>
        </div>

        {/* Period Stats */}
        <Card className="bg-white rounded-xl custom-shadow mb-6">
          <CardContent className="p-6">
            <h5 className="font-bold text-lg mb-4">إحصائيات الأرباح</h5>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800 mb-1">{earningsStats.today}</div>
                <div className="text-sm text-gray-600">اليوم</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800 mb-1">{earningsStats.thisWeek}</div>
                <div className="text-sm text-gray-600">هذا الأسبوع</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800 mb-1">{earningsStats.avgJobRate}</div>
                <div className="text-sm text-gray-600">متوسط المهمة</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Chart */}
        <Card className="bg-white rounded-xl custom-shadow mb-6">
          <CardContent className="p-6">
            <h5 className="font-bold text-lg mb-4">أرباح الأسبوع</h5>
            <div className="flex items-end justify-between h-32 mb-2">
              {weeklyChart.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="bg-primary rounded-t w-8 mb-2"
                    style={{ height: `${(day.amount / 500) * 100}%` }}
                  ></div>
                  <div className="text-xs text-gray-600 transform -rotate-45 origin-center">
                    {day.day}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-500">
              إجمالي الأسبوع: {earningsStats.thisWeek}
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card className="bg-white rounded-xl custom-shadow mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-bold text-lg">حالة الدفع</h5>
              <Button variant="outline" size="sm" className="text-primary border-primary">
                سحب الأرباح
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg text-center">
                <div className="text-xl font-bold text-yellow-600 mb-1">{earningsStats.pendingPayment}</div>
                <div className="text-sm text-yellow-700">في الانتظار</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-xl font-bold text-green-600 mb-1">{earningsStats.totalEarnings}</div>
                <div className="text-sm text-green-700">إجمالي الأرباح</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Earnings */}
        <Card className="bg-white rounded-xl custom-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-bold text-lg">الأرباح الأخيرة</h5>
              <Button variant="ghost" size="sm" className="text-primary">
                <Calendar className="w-4 h-4 ml-2" />
                فلترة
              </Button>
            </div>
            
            <div className="space-y-4">
              {monthlyEarnings.slice(0, 3).map((earning) => (
                <div key={earning.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h6 className="font-semibold mb-1">{earning.jobType}</h6>
                    <p className="text-sm text-gray-600">{earning.client}</p>
                    <p className="text-xs text-gray-500">{earning.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{earning.amount}</div>
                    <Badge className={getStatusColor(earning.status)} variant="secondary">
                      {earning.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="outline" className="text-primary border-primary">
                عرض جميع الأرباح
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav activeTab="earnings" userType="guard" />
    </div>
  );
}