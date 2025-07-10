import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAppStore } from "@/hooks/use-app-store";

export default function ClientLogin() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState("");
  const { toast } = useToast();
  const { setCurrentUser } = useAppStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً ${data.user.fullName}`,
      });
      setLocation("/client/dashboard");
    },
    onError: () => {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "تحقق من رقم الجوال وكلمة المرور",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم الجوال",
        variant: "destructive",
      });
      return;
    }

    // استخدام بيانات المستخدم الافتراضي للتجربة
    loginMutation.mutate({
      username: "client1",
      password: "client123"
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6 text-gray-600">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 border-2 border-gray-200">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">تسجيل الدخول</h2>
          <p className="text-gray-600">أدخل رقم جوالك للمتابعة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
              رقم الجوال
            </Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05xxxxxxxx"
                className="w-full p-4 border border-gray-300 rounded-xl text-right"
                dir="rtl"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <span className="text-sm">+966</span>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loginMutation.isPending}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg h-auto"
          >
            {loginMutation.isPending ? "جاري الدخول..." : "إرسال رمز التحقق"}
          </Button>

          <div className="text-center">
            <Link href="/client/registration">
              <Button type="button" variant="link" className="text-primary font-semibold">
                ليس لديك حساب؟ سجل الآن
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}