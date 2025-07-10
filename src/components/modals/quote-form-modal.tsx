import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, User, Briefcase, Shield, FileText, Star } from "lucide-react";

interface QuoteFormModalProps {
  onClose: () => void;
  request?: any;
  onSubmit?: () => void;
}

export default function QuoteFormModal({ onClose, request, onSubmit }: QuoteFormModalProps) {
  const [price, setPrice] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!price) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال السعر المطلوب",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم إرسال العرض بنجاح",
      description: "سيتم إشعار العميل بعرضك",
    });
    
    onClose();
  };

  // بيانات افتراضية للطلب في حالة عدم وجود بيانات
  const defaultRequest = {
    jobDescription: "حراسة فعالية خاصة",
    serviceType: "حارس شخصي",
    location: "فعالية خاصة - قاعة الملك فيصل",
    date: "2024-01-12",
    time: "15:00",
    duration: "4 ساعات",
    equipment: ["أجهزة الاتصال اللاسلكي (هوكي توكي)", "معدات الإطفاء ومجموعات الإسعافات الأولية", "مصابيح الحراسة الأمنية"],
    skills: ["التواصل الفعال وحسن التعامل مع الجمهور", "إدارة الحشود", "اسعافات أولية"],
    notes: "فعالية خاصة تتطلب حارس محترف مع خبرة في التعامل مع الضيوف المهمين",
    clientName: "أحمد",
    clientRating: 4.5
  };

  const requestData = request || defaultRequest;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-5xl mx-auto max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إرسال عرض سعر</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 space-y-6">
          {/* تفاصيل الطلب */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 ml-2" />
              تفاصيل الطلب
            </h3>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              {/* العمود الأول */}
              <div className="space-y-3">
                {/* وصف العمل المطلوب */}
                <div className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">وصف العمل المطلوب:</p>
                    <p className="font-medium text-sm break-words">{requestData.jobDescription}</p>
                  </div>
                </div>

                {/* نوع الخدمة */}
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">نوع الخدمة:</p>
                    <p className="font-medium text-sm">{requestData.serviceType}</p>
                  </div>
                </div>

                {/* الموقع */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">الموقع:</p>
                    <p className="font-medium text-sm break-words">{requestData.location}</p>
                  </div>
                </div>

                {/* التاريخ والوقت */}
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">التاريخ ووقت بداية العمل:</p>
                    <p className="font-medium text-sm">{requestData.date} - {requestData.time}</p>
                  </div>
                </div>

                {/* المدة */}
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">المدة:</p>
                    <p className="font-medium text-sm">{requestData.duration}</p>
                  </div>
                </div>
              </div>

              {/* العمود الثاني */}
              <div className="space-y-3">
                {/* اسم العميل */}
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">اسم العميل:</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{requestData.clientName}</p>
                      {requestData.clientRating && (
                        <div className="flex items-center gap-1">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= Math.floor(requestData.clientRating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : star <= requestData.clientRating
                                    ? 'fill-yellow-200 text-yellow-400'
                                    : 'fill-gray-200 text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">({requestData.clientRating})</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* معدات الأمن المطلوبة */}
                {requestData.equipment && requestData.equipment.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600">معدات الأمن المطلوبة:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {requestData.equipment.map((item: string, index: number) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* المهارات المطلوبة */}
                {requestData.skills && requestData.skills.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600">المهارات المطلوبة:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {requestData.skills.map((skill: string, index: number) => (
                          <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ملاحظات إضافية - عمود كامل */}
            {requestData.notes && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">ملاحظات إضافية:</p>
                    <p className="font-medium text-sm break-words">{requestData.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* قسم إرسال العرض */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">إرسال عرض السعر</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
                  السعر المطلوب
                </Label>
                <div className="relative">
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="350"
                    className="w-full p-3 border border-gray-300 rounded-lg text-right pr-16"
                    dir="rtl"
                    required
                  />
                  <span className="absolute right-3 top-3 text-gray-500">ريال</span>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-secondary text-white py-3 rounded-lg font-semibold h-auto">
                إرسال العرض
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
