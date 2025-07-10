import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, User, CheckCircle, Star, Lock } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="gradient-bg min-h-screen flex flex-col relative"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.75), rgba(59, 130, 246, 0.75)), url('/security-guards.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <div className="text-white">
            <h1 className="text-2xl font-bold">حارس</h1>
            <p className="text-blue-100 text-sm">منصة الحراسة الأمنية</p>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center">
              ع
            </div>
          </Button>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 text-center text-white">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <Shield className="w-16 h-16 mb-4 text-blue-200 mx-auto" />
              <h2 className="text-3xl font-bold mb-4">خدمات حراسة أمنية موثوقة</h2>
              <p className="text-blue-100 text-lg mb-8">احصل على أفضل خدمات الحراسة من حراس مؤهلين ومرخصين</p>
            </div>
            
            {/* User Type Selection */}
            <div className="space-y-4">
              <Link href="/client/login">
                <Button 
                  className="w-full bg-white text-primary py-4 px-6 rounded-xl font-semibold text-lg custom-shadow hover:bg-gray-50 transition-colors h-auto"
                >
                  <User className="ml-3 w-5 h-5" />
                  اطلب حراسة امنية (عميل)
                </Button>
              </Link>
              
              <Link href="/guard/login">
                <Button 
                  variant="outline"
                  className="w-full bg-transparent border-2 border-white text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary transition-colors h-auto"
                >
                  <Shield className="ml-3 w-5 h-5" />
                  دخول حراس الأمن (حارس أمن)
                </Button>
              </Link>
            </div>
            
            {/* Features */}
            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
              <div>
                <CheckCircle className="w-8 h-8 text-green-300 mb-2 mx-auto" />
                <p className="text-sm text-blue-100">مرخص رسمياً</p>
              </div>
              <div>
                <Star className="w-8 h-8 text-yellow-300 mb-2 mx-auto" />
                <p className="text-sm text-blue-100">خدمة مميزة</p>
              </div>
              <div>
                <Lock className="w-8 h-8 text-green-300 mb-2 mx-auto" />
                <p className="text-sm text-blue-100">دفع آمن</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Admin Access */}
        <div className="absolute bottom-2 left-2 right-2">
          <Link href="/admin/dashboard">
            <div className="admin-secret text-white text-xs text-center">إدارة النظام</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
