import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAppStore } from "@/hooks/use-app-store";

export default function GuardLogin() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState("");
  const { toast } = useToast();
  const { setCurrentUser, setCurrentGuard } = useAppStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentUser(data.user);
      if (data.guard) {
        setCurrentGuard(data.guard);
      }
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً ${data.user.fullName}`,
      });
      setLocation("/guard/dashboard");
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
    
    // استخدام بيانات الحارس الافتراضي للتجربة
    loginMutation.mutate({
      username: "guard1",
      password: "guard123"
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
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">حارس الأمن</h2>
          <p className="text-gray-600">سجل دخولك للبدء في تلقي الطلبات</p>
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
            className="w-full bg-secondary text-white py-4 rounded-xl font-semibold text-lg h-auto"
          >
            {loginMutation.isPending ? "جاري الدخول..." : "تسجيل الدخول"}
          </Button>
          
          <div className="text-center">
            <Link href="/guard/register">
              <Button type="button" variant="link" className="text-secondary font-semibold">
                ليس لديك حساب؟ سجل كحارس أمن
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
