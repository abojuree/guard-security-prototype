import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Clock, DollarSign, LogOut, ShieldQuestion, DoorOpen, Calendar } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "إجمالي العملاء",
      value: "1,234",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-blue-100"
    },
    {
      title: "حراس الأمن",
      value: "456",
      icon: Shield,
      color: "text-secondary",
      bgColor: "bg-green-100"
    },
    {
      title: "الطلبات النشطة",
      value: "89",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "الإيرادات الشهرية",
      value: "89,250 ريال",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const recentOrders = [
    {
      id: 1,
      type: "حارس شخصي",
      client: "أحمد السعد",
      status: "مكتمل",
      statusColor: "green",
      icon: ShieldQuestion
    },
    {
      id: 2,
      type: "حارس بوابة",
      client: "سارة محمد",
      status: "جاري",
      statusColor: "blue",
      icon: DoorOpen
    },
    {
      id: 3,
      type: "حراسة مناسبة",
      client: "قصر الأفراح",
      status: "قيد المراجعة",
      statusColor: "yellow",
      icon: Calendar
    }
  ];

  const guardApplications = [
    {
      id: 1,
      name: "عبدالرحمن الغامدي",
      experience: "5 سنوات خبرة",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 2,
      name: "فيصل الشهري",
      experience: "3 سنوات خبرة",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 3,
      name: "محمد القرني",
      experience: "7 سنوات خبرة",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-white p-6 custom-shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">لوحة التحكم الإدارية</h2>
            <p className="text-gray-600">منصة حارس</p>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm" className="bg-gray-100 p-2 rounded-lg">
              <LogOut className="w-4 h-4 text-gray-600" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-6">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white custom-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`${stat.color} text-xl w-6 h-6`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="bg-white custom-shadow">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-lg font-bold">الطلبات الأخيرة</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 ${
                        order.statusColor === 'green' ? 'bg-primary' : 
                        order.statusColor === 'blue' ? 'bg-secondary' : 'bg-yellow-500'
                      } rounded-full flex items-center justify-center ml-3`}>
                        <order.icon className="text-white text-sm w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{order.type}</p>
                        <p className="text-gray-600 text-xs">{order.client}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.statusColor === 'green' ? 'bg-green-100 text-green-800' :
                      order.statusColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guard Applications */}
          <Card className="bg-white custom-shadow">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-lg font-bold">طلبات التسجيل</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {guardApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <img 
                        src="/images/male_1751872460287.png" 
                        alt="مقدم الطلب" 
                        className="w-8 h-8 rounded-full object-cover ml-3"
                      />
                      <div>
                        <p className="font-semibold text-sm">{application.name}</p>
                        <p className="text-gray-600 text-xs">{application.experience}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-100 text-green-800 hover:bg-green-200 px-2 py-1 text-xs h-auto">
                        قبول
                      </Button>
                      <Button size="sm" variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 px-2 py-1 text-xs h-auto">
                        رفض
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
