import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ShieldQuestion, DoorOpen, MapPin } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAppStore } from "@/hooks/use-app-store";

export default function NewRequest() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { currentUser } = useAppStore();

  const [formData, setFormData] = useState({
    serviceType: "personal",
    location: "",
    date: "",
    time: "",
    period: "AM",
    duration: "1:00",
    notes: "",
    equipment: [] as string[],
    skills: [] as string[],
    guardGender: "male",
    jobDescription: "",
  });

  // CSS styles for English number display
  const englishInputStyles = {
    direction: "ltr",
    textAlign: "left",
    fontVariantNumeric: "lining-nums",
    unicodeBidi: "bidi-override",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const createRequestMutation = useMutation({
    mutationFn: async (requestData: any) => {
      console.log("إرسال الطلب (محاكاة):", requestData);
      
      // محاكاة تأخير الشبكة للعرض التوضيحي
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // إرجاع بيانات وهمية للعرض التوضيحي
      return {
        success: true,
        message: "تم إرسال الطلب بنجاح",
        request: {
          id: Math.floor(Math.random() * 1000) + 1, // معرف عشوائي للعرض
          ...requestData
        }
      };
    },
    onSuccess: (data) => {
      console.log("نجح إرسال الطلب (محاكاة) - البيانات المستلمة:", data);
      
      // استخراج معرف الطلب من البيانات الوهمية
      const requestId = data?.request?.id || Math.floor(Math.random() * 1000) + 1;
      
      console.log("معرف الطلب المستخرج:", requestId);
      
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم إرسال عروض الأسعار قريباً",
      });
      
      // الانتقال إلى صفحة ملخص الطلب
      setLocation(`/client/request-summary/${requestId}`);
    },
    onError: (error: any) => {
      console.error("خطأ في إرسال الطلب (محاكاة):", error);
      
      toast({
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ في النظام، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("بيانات النموذج:", formData);

    // التحقق من الحقول المطلوبة
    if (
      !formData.serviceType ||
      !formData.location ||
      !formData.date ||
      !formData.time ||
      !formData.duration ||
      !formData.jobDescription
    ) {
      const missingFields: string[] = [];
      if (!formData.serviceType) missingFields.push("نوع الخدمة");
      if (!formData.location) missingFields.push("الموقع");
      if (!formData.date) missingFields.push("التاريخ");
      if (!formData.time) missingFields.push("الوقت");
      if (!formData.duration) missingFields.push("المدة");
      if (!formData.jobDescription) missingFields.push("وصف العمل");

      toast({
        title: "خطأ في البيانات",
        description: `يرجى ملء الحقول التالية: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    // التحقق من صحة التاريخ
    if (formData.date.length !== 10 || !formData.date.includes("/")) {
      toast({
        title: "خطأ في التاريخ",
        description: "يرجى إدخال تاريخ صحيح بالتنسيق DD/MM/YYYY",
        variant: "destructive",
      });
      return;
    }

    // التحقق من صحة الوقت
    if (formData.time.length < 4 || !formData.time.includes(":")) {
      toast({
        title: "خطأ في الوقت",
        description: "يرجى إدخال وقت صحيح بالتنسيق HH:mm",
        variant: "destructive",
      });
      return;
    }

    try {
      // تحويل التاريخ من DD/MM/YYYY إلى تاريخ صالح
      const [day, month, year] = formData.date.split("/");
      
      if (!day || !month || !year || year.length !== 4) {
        throw new Error("تنسيق التاريخ غير صحيح");
      }

      const dateString = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      
      // التحقق من صحة التاريخ
      const dateObj = new Date(`${dateString}T${formData.time}:00`);
      if (isNaN(dateObj.getTime())) {
        throw new Error("التاريخ أو الوقت غير صحيح");
      }

      const requestData = {
        clientId: currentUser?.id || 2,
        serviceType: formData.serviceType,
        location: formData.location,
        date: dateObj,
        duration: formData.duration,
        notes: formData.notes,
        guardGender: formData.guardGender,
        jobDescription: formData.jobDescription,
        equipment: formData.equipment,
        skills: formData.skills,
        clientName: currentUser?.fullName || "أحمد محمد السعدي"
      };

      console.log("البيانات المرسلة للخادم:", requestData);

      // حفظ جنس حارس الأمن في localStorage للوصول إليه في صفحة العروض
      localStorage.setItem("lastRequestGender", formData.guardGender);

      createRequestMutation.mutate(requestData);
    } catch (error: any) {
      console.error("خطأ في معالجة البيانات:", error);
      toast({
        title: "خطأ في البيانات",
        description: error.message || "حدث خطأ في معالجة البيانات",
        variant: "destructive",
      });
    }
  };

  const serviceTypes = [
    { value: "personal", label: "حارس شخصي", icon: ShieldQuestion },
    { value: "gate", label: "حارس موقع", icon: DoorOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center mb-4">
          <Link href="/client/dashboard">
            <Button variant="ghost" size="sm" className="ml-4 text-gray-600">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <h3 className="text-xl font-bold">طلب خدمة جديدة</h3>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type */}
          <div>
            <Label className="block text-gray-700 font-semibold mb-3">
              نوع الخدمة
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {serviceTypes.map((service) => (
                <Card
                  key={service.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.serviceType === service.value
                      ? "border-2 border-primary bg-blue-50"
                      : "border-2 border-gray-300 bg-white"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, serviceType: service.value })
                  }
                >
                  <CardContent className="p-6 text-center">
                    <service.icon
                      className={`w-10 h-10 mb-3 mx-auto ${
                        formData.serviceType === service.value
                          ? "text-primary"
                          : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`font-bold text-base ${
                        formData.serviceType === service.value
                          ? "text-primary"
                          : "text-gray-800"
                      }`}
                    >
                      {service.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Guard Gender */}
          <div>
            <Label className="block text-gray-700 font-semibold mb-3">
              جنس حارس الأمن
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${
                  formData.guardGender === "male"
                    ? "border-2 border-primary bg-blue-50"
                    : "border-2 border-gray-300 bg-white"
                }`}
                onClick={() =>
                  setFormData({ ...formData, guardGender: "male" })
                }
              >
                <CardContent className="p-6 text-center">
                  <img
                    src="/images/male_1751872460287.png"
                    alt="حارس أمن رجل"
                    className="w-10 h-10 mb-3 mx-auto object-contain"
                  />
                  <p
                    className={`font-bold text-base ${
                      formData.guardGender === "male"
                        ? "text-primary"
                        : "text-gray-800"
                    }`}
                  >
                    حارس أمن رجل
                  </p>
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${
                  formData.guardGender === "female"
                    ? "border-2 border-primary bg-blue-50"
                    : "border-2 border-gray-300 bg-white"
                }`}
                onClick={() =>
                  setFormData({ ...formData, guardGender: "female" })
                }
              >
                <CardContent className="p-6 text-center">
                  <img
                    src="/images/female_1751872460286.png"
                    alt="حارسة أمن إمرأة"
                    className="w-10 h-10 mb-3 mx-auto object-contain"
                  />
                  <p
                    className={`font-bold text-base ${
                      formData.guardGender === "female"
                        ? "text-primary"
                        : "text-gray-800"
                    }`}
                  >
                    حارسة أمن إمرأة
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <Label
              htmlFor="jobDescription"
              className="block text-gray-700 font-semibold mb-2"
            >
              وصف العمل المطلوب
            </Label>
            <Textarea
              id="jobDescription"
              value={formData.jobDescription || ""}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setFormData({ ...formData, jobDescription: e.target.value });
                }
              }}
              placeholder="وصف مختصر للعمل المطلوب (100 حرف كحد أقصى)"
              className="w-full p-4 border border-gray-300 rounded-xl h-20"
              dir="rtl"
              maxLength={100}
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-400">
                {formData.jobDescription?.length || 0}/100
              </span>
            </div>
            <div className="mt-3 text-sm text-gray-500" dir="rtl">
              <p className="font-medium mb-2">أمثلة على الأعمال المطلوبة:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <p>• نقطة تفتيش بوابات</p>
                <p>• مراقبة أنظمة أمن</p>
                <p>• مرافقة شخصية هامة VIP</p>
                <p>• تنظيم دخول المدعوين</p>
                <p>• حراسة مؤتمر أو فعالية</p>
                <p>• مراقبة منطقة محددة</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <Label
              htmlFor="location"
              className="block text-gray-700 font-semibold mb-2"
            >
              الموقع
            </Label>
            <div className="relative">
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="اختر الموقع من الخريطة"
                className="w-full p-4 border border-gray-300 rounded-xl"
                style={{
                  direction: "rtl",
                }}
                lang="ar"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary"
              >
                <MapPin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="date"
                className="block text-gray-700 font-semibold mb-2"
              >
                التاريخ
              </Label>
              <Input
                id="date"
                type="text"
                value={formData.date || ""}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // إزالة كل شيء عدا الأرقام

                  // تطبيق تنسيق DD/MM/YYYY
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + "/" + value.slice(2);
                  }
                  if (value.length >= 5) {
                    value = value.slice(0, 5) + "/" + value.slice(5, 9);
                  }

                  setFormData({ ...formData, date: value });
                  console.log("اختيار التاريخ:", value);
                }}
                className="w-full p-4 border border-gray-300 rounded-xl"
                style={englishInputStyles}
                placeholder="DD/MM/YYYY"
                maxLength="10"
              />
            </div>

            <div>
              <Label
                htmlFor="time"
                className="block text-gray-700 font-semibold mb-2"
              >
                وقت بداية العمل
              </Label>

              <div className="flex gap-2">
                {/* حقل الوقت */}
                <div className="flex-1">
                  <Input
                    id="time"
                    type="text"
                    value={formData.time}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^\d:]/g, "");
                      if (value.length === 2 && !value.includes(":")) {
                        value = value + ":";
                      }
                      if (value.length <= 5) {
                        const [hours, minutes] = value.split(":");
                        if (
                          hours &&
                          (parseInt(hours) > 12 || parseInt(hours) < 0)
                        )
                          return;
                        if (minutes && parseInt(minutes) > 59) return;
                        setFormData({ ...formData, time: value });
                      }
                    }}
                    placeholder="HH:mm"
                    className="w-full p-4 border border-gray-300 rounded-xl"
                    style={englishInputStyles}
                    maxLength="5"
                  />
                </div>

                {/* أزرار الصباح والمساء */}
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, period: "AM" })}
                    className={`w-12 h-10 rounded-xl border-2 font-bold transition-all flex items-center justify-center ${
                      formData.period === "AM"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 bg-white text-gray-600"
                    }`}
                  >
                    ص
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, period: "PM" })}
                    className={`w-12 h-10 rounded-xl border-2 font-bold transition-all flex items-center justify-center ${
                      formData.period === "PM"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 bg-white text-gray-600"
                    }`}
                  >
                    م
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <Label className="block text-gray-700 font-semibold mb-2">
              المدة
            </Label>
            
            <div className="grid grid-cols-2 gap-4">
              {/* عداد الساعات */}
              <div>
                <Label className="block text-gray-600 text-sm mb-2">الساعات</Label>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      const currentHours = parseInt(formData.duration?.split(':')[0] || '0');
                      if (currentHours > 0) {
                        const minutes = formData.duration?.split(':')[1] || '00';
                        setFormData({ ...formData, duration: `${currentHours - 1}:${minutes}` });
                      }
                    }}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-colors"
                  >
                    -
                  </button>
                  <div className="flex-1 h-12 flex items-center justify-center bg-white text-lg font-semibold">
                    {formData.duration?.split(':')[0] || '0'}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentHours = parseInt(formData.duration?.split(':')[0] || '0');
                      if (currentHours < 24) {
                        const minutes = formData.duration?.split(':')[1] || '00';
                        setFormData({ ...formData, duration: `${currentHours + 1}:${minutes}` });
                      }
                    }}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* عداد الدقائق */}
              <div>
                <Label className="block text-gray-600 text-sm mb-2">الدقائق</Label>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      const hours = formData.duration?.split(':')[0] || '0';
                      const currentMinutes = parseInt(formData.duration?.split(':')[1] || '0');
                      if (currentMinutes >= 15) {
                        setFormData({ ...formData, duration: `${hours}:${(currentMinutes - 15).toString().padStart(2, '0')}` });
                      }
                    }}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-colors"
                  >
                    -
                  </button>
                  <div className="flex-1 h-12 flex items-center justify-center bg-white text-lg font-semibold">
                    {formData.duration?.split(':')[1] || '00'}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const hours = formData.duration?.split(':')[0] || '0';
                      const currentMinutes = parseInt(formData.duration?.split(':')[1] || '0');
                      if (currentMinutes < 45) {
                        setFormData({ ...formData, duration: `${hours}:${(currentMinutes + 15).toString().padStart(2, '0')}` });
                      }
                    }}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Equipment and Skills */}
          <div className="grid grid-cols-2 gap-6 relative">
            {/* معدات الأمن المطلوبة */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <Label className="text-gray-700 font-bold text-lg">
                  معدات الأمن المطلوبة
                </Label>
              </div>
              
              <div className="space-y-2">
                {[
                  "أجهزة الاتصال اللاسلكي (هوكي توكي)",
                  "قناع وجه",
                  "معدات الإطفاء ومجموعات الإسعافات الأولية",
                  "عصا حارس الأمن",
                  "صفارات حارس الأمن",
                  "مصابيح الحراسة الأمنية",
                  "أجهزة كشف المعادن اليدوية",
                  "مرآة تفتيش السيارات",
                ].map((equipment) => (
                  <div
                    key={equipment}
                    className="flex items-center space-x-2 space-x-reverse"
                  >
                    <Checkbox
                      id={equipment}
                      checked={formData.equipment.includes(equipment)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            equipment: [...formData.equipment, equipment],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            equipment: formData.equipment.filter(
                              (item) => item !== equipment,
                            ),
                          });
                        }
                      }}
                    />
                    <Label
                      htmlFor={equipment}
                      className="text-sm text-gray-700"
                    >
                      {equipment}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* خط فاصل عمودي */}
            <div className="absolute left-1/2 top-0 w-px bg-gray-300 h-full transform -translate-x-1/2 hidden md:block"></div>

            {/* المهارات المطلوبة */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <Label className="text-gray-700 font-bold text-lg">
                  المهارات المطلوبة
                </Label>
              </div>
              <div className="space-y-2">
                {[
                  "القراءة والكتابة",
                  "اللغة الانجليزية",
                  "اسعافات أولية",
                  "التواصل الفعال وحسن التعامل مع الجمهور",
                  "مهارة التفاوض",
                  "لياقة بدنية عالية",
                  "المعرفة بالإجراءات الأمنية",
                  "حل المشكلات",
                  "إدارة الحشود",
                  "الدفاع عن النفس",
                  "التعامل مع الشخصيات الهامة VIP",
                  "مهارة الملاحظة والتفتيش",
                  "المعرفة بإجراءات الإخلاء",
                  "التعامل مع المعدات الخطرة",
                  "إدارة المخاطر",
                  "أنظمة المراقبة الذكية",
                  "الإستجابة للإنذارات التكنولوجية",
                  "التعامل مع المعلومات الحساسة",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center space-x-2 space-x-reverse"
                  >
                    <Checkbox
                      id={skill}
                      checked={formData.equipment.includes(skill)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            equipment: [...formData.equipment, skill],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            equipment: formData.equipment.filter(
                              (item) => item !== skill,
                            ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={skill} className="text-sm text-gray-700">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <Label
              htmlFor="notes"
              className="block text-gray-700 font-semibold mb-2"
            >
              ملاحظات إضافية
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="أي متطلبات خاصة أو تفاصيل إضافية"
              className="w-full p-4 border border-gray-300 rounded-xl h-24"
              dir="rtl"
            />
          </div>

          <Button
            type="submit"
            disabled={createRequestMutation.isPending}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg h-auto"
          >
            {createRequestMutation.isPending
              ? "جاري الإرسال..."
              : "طلب عروض الأسعار"}
          </Button>
        </form>
      </div>
    </div>
  );
}
