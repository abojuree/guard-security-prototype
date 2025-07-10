import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, User, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TermsOfServiceModal from "@/components/modals/terms-of-service-modal";

export default function ClientRegistration() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    phone: "",
    email: "",
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasAcceptedTerms) {
      toast({
        title: "يجب الموافقة على الشروط",
        description: "يرجى قراءة والموافقة على الاتفاقية وشروط الاستخدام للمتابعة",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // محاكاة إنشاء الحساب
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedAccountNumber = `CLI-${Date.now().toString().slice(-6)}`;
      setAccountNumber(generatedAccountNumber);
      setShowConfirmationModal(true);
    }, 2000);
  };

  const handleTermsAccepted = () => {
    setHasAcceptedTerms(true);
    setShowTermsModal(false);
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber);
    toast({
      title: "تم النسخ",
      description: "تم نسخ رقم الحساب بنجاح",
    });
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
    setLocation("/client/login");
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">جاري إنشاء حسابك...</h2>
          <p className="text-gray-600">يرجى الانتظار</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center mb-4">
          <Link href="/client/login">
            <Button variant="ghost" size="sm" className="ml-4 text-gray-600">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <h3 className="text-xl font-bold">إنشاء حساب عميل جديد</h3>
        </div>
        <p className="text-gray-600">املأ البيانات المطلوبة لإنشاء حساب عميل</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800">البيانات الشخصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">
                  الاسم الكامل
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="أدخل اسمك الكامل"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  dir="rtl"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="nationalId" className="block text-gray-700 font-semibold mb-2">
                  رقم الهوية
                </Label>
                <Input
                  id="nationalId"
                  value={formData.nationalId}
                  onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                  placeholder="رقم الهوية الوطنية"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  dir="rtl"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                  رقم الجوال
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="05xxxxxxxx"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  dir="rtl"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  البريد الإلكتروني (اختياري)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  dir="ltr"
                />
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <Checkbox
                    id="accept-terms"
                    checked={hasAcceptedTerms}
                    onCheckedChange={setHasAcceptedTerms}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="accept-terms" className="text-sm text-gray-700 cursor-pointer">
                      قرأت ووافقت على{" "}
                      <button
                        type="button"
                        onClick={() => setShowTermsModal(true)}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        الاتفاقية وشروط الاستخدام
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            type="submit" 
            disabled={!hasAcceptedTerms}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg h-auto disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            إنشاء الحساب
          </Button>
        </form>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmationModal} onOpenChange={setShowConfirmationModal}>
        <DialogContent className="w-11/12 max-w-md mx-auto rounded-xl" dir="rtl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold text-gray-800 mb-4">
              تم إنشاء حسابك بنجاح
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-600 text-lg mb-6">
                يمكنك الآن تسجيل الدخول واستخدام خدمات التطبيق
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">رقم الحساب</p>
                  <p className="text-lg font-bold text-gray-800">{accountNumber}</p>
                </div>
                <Button
                  onClick={copyAccountNumber}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  نسخ
                </Button>
              </div>
            </div>

            <Button
              onClick={handleCloseModal}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold"
            >
              الانتقال لتسجيل الدخول
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Modal */}
      <TermsOfServiceModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        userType="client"
        onAccept={handleTermsAccepted}
        showAcceptButton={true}
      />
    </div>
  );
}