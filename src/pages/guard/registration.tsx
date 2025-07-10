import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Upload, Camera, Clock, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TermsOfServiceModal from "@/components/modals/terms-of-service-modal";



export default function GuardRegistration() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    phone: "",
    age: "",
    experience: "",
    gender: "",
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [requestNumber, setRequestNumber] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gender) {
      toast({
        title: "يجب تحديد الجنس",
        description: "يرجى تحديد الجنس للمتابعة",
        variant: "destructive"
      });
      return;
    }
    
    if (!hasAcceptedTerms) {
      toast({
        title: "يجب الموافقة على الشروط",
        description: "يرجى قراءة والموافقة على الاتفاقية وشروط الاستخدام للمتابعة",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // محاكاة تقديم الطلب وإنشاء رقم طلب
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRequestNumber = `REQ-${Date.now().toString().slice(-6)}`;
      setRequestNumber(generatedRequestNumber);
      setShowConfirmationModal(true);
    }, 2000);
  };

  const handleTermsAccepted = () => {
    setHasAcceptedTerms(true);
    setShowTermsModal(false);
  };

  const copyRequestNumber = () => {
    navigator.clipboard.writeText(requestNumber);
    toast({
      title: "تم النسخ",
      description: "تم نسخ رقم الطلب بنجاح",
    });
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
    setLocation("/");
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">جاري إرسال الطلب...</h2>
          <p className="text-gray-600">يرجى الانتظار</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center mb-4">
          <Link href="/guard/login">
            <Button variant="ghost" size="sm" className="ml-4 text-gray-600">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <h3 className="text-xl font-bold">تسجيل حارس أمن جديد</h3>
        </div>
        <p className="text-gray-600">املأ البيانات المطلوبة للانضمام كحارس أمن</p>
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
                <Label htmlFor="age" className="block text-gray-700 font-semibold mb-2">
                  العمر
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="يجب أن يكون 18 سنة فأكثر"
                  min="18"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <Label className="block text-gray-700 font-semibold mb-3">الجنس</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.gender === "male" 
                        ? 'border-2 border-primary bg-blue-50' 
                        : 'border-2 border-gray-300 bg-white'
                    }`}
                    onClick={() => setFormData({ ...formData, gender: "male" })}
                  >
                    <CardContent className="p-6 text-center">
                      <img 
                        src="/images/male_1751872460287.png" 
                        alt="حارس أمن رجل"
                        className="w-10 h-10 mb-3 mx-auto object-contain"
                      />
                      <p className={`font-bold text-base ${
                        formData.gender === "male" ? 'text-primary' : 'text-gray-800'
                      }`}>
                        رجل
                      </p>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.gender === "female" 
                        ? 'border-2 border-primary bg-blue-50' 
                        : 'border-2 border-gray-300 bg-white'
                    }`}
                    onClick={() => setFormData({ ...formData, gender: "female" })}
                  >
                    <CardContent className="p-6 text-center">
                      <img 
                        src="/images/female_1751872460286.png" 
                        alt="حارسة أمن إمرأة"
                        className="w-10 h-10 mb-3 mx-auto object-contain"
                      />
                      <p className={`font-bold text-base ${
                        formData.gender === "female" ? 'text-primary' : 'text-gray-800'
                      }`}>
                        إمرأة
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Qualifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800">المؤهلات والخبرة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="experience" className="block text-gray-700 font-semibold mb-2">
                  سنوات الخبرة
                </Label>
                <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                  <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg">
                    <SelectValue placeholder="اختر سنوات الخبرة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">أقل من سنة</SelectItem>
                    <SelectItem value="1">1-2 سنة</SelectItem>
                    <SelectItem value="3">3-5 سنوات</SelectItem>
                    <SelectItem value="5">أكثر من 5 سنوات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              

            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800">الوثائق المطلوبة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="block text-gray-700 font-semibold mb-2">صورة الهوية الوطنية</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2 mx-auto" />
                  <p className="text-gray-600">اضغط لرفع صورة الهوية</p>
                  <Button type="button" variant="outline" size="sm" className="mt-2">
                    اختيار ملف
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="block text-gray-700 font-semibold mb-2">شهادة حسن السيرة والسلوك</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2 mx-auto" />
                  <p className="text-gray-600">اضغط لرفع الشهادة</p>
                  <Button type="button" variant="outline" size="sm" className="mt-2">
                    اختيار ملف
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="block text-gray-700 font-semibold mb-2">صورة شخصية</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="w-8 h-8 text-gray-400 mb-2 mx-auto" />
                  <p className="text-gray-600">اضغط لرفع صورة شخصية</p>
                  <Button type="button" variant="outline" size="sm" className="mt-2">
                    اختيار ملف
                  </Button>
                </div>
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
            className="w-full bg-secondary text-white py-4 rounded-xl font-semibold text-lg h-auto disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            إرسال طلب التسجيل
          </Button>
        </form>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmationModal} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="w-11/12 max-w-md mx-auto rounded-xl" dir="rtl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold text-gray-800 mb-4">
              تم استلام طلبك
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-600 text-lg mb-6">
                سيتم التواصل معك قريباً لاستكمال إجراءات التسجيل
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">رقم الطلب</p>
                  <p className="text-lg font-bold text-gray-800">{requestNumber}</p>
                </div>
                <Button
                  onClick={copyRequestNumber}
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
              className="w-full bg-secondary text-white py-3 rounded-lg font-semibold"
            >
              إغلاق
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Modal */}
      <TermsOfServiceModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        userType="guard"
        onAccept={handleTermsAccepted}
        showAcceptButton={true}
      />
    </div>
  );
}
