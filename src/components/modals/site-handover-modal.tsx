import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Users, User, Clock, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SiteHandoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId?: number;
}

export default function SiteHandoverModal({ isOpen, onClose, jobId }: SiteHandoverModalProps) {
  const [handoverType, setHandoverType] = useState(""); // "guard" or "client"
  const [guardName, setGuardName] = useState("");
  const [guardPhone, setGuardPhone] = useState("");
  const [duration, setDuration] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!handoverType) {
      toast({
        title: "مطلوب نوع التسليم",
        description: "يُرجى اختيار نوع التسليم",
        variant: "destructive",
      });
      return;
    }

    if (handoverType === "guard" && (!guardName.trim() || !guardPhone.trim())) {
      toast({
        title: "بيانات مطلوبة",
        description: "يُرجى إدخال اسم الحارس ورقم الهاتف",
        variant: "destructive",
      });
      return;
    }

    if (!duration) {
      toast({
        title: "مطلوب مدة التسليم",
        description: "يُرجى تحديد مدة التسليم المتوقعة",
        variant: "destructive",
      });
      return;
    }

    if (!reason.trim()) {
      toast({
        title: "مطلوب سبب التسليم",
        description: "يُرجى كتابة سبب طلب تسليم الموقع",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تم إرسال طلب التسليم",
        description: "سيتم مراجعة طلبك من قبل العميل وإشعارك بالقرار",
      });
      
      onClose();
      // Reset form
      setHandoverType("");
      setGuardName("");
      setGuardPhone("");
      setDuration("");
      setReason("");
      setNotes("");
    } catch (error) {
      toast({
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ أثناء إرسال طلب التسليم، يُرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">طلب تسليم الموقع</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Info Alert */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 ml-2 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">معلومات مهمة:</p>
                  <p>طلب تسليم الموقع يتطلب موافقة العميل. سيتم إشعارك بالقرار عبر التطبيق.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Handover Type Selection */}
          <div className="space-y-3">
            <Label>نوع التسليم *</Label>
            <RadioGroup value={handoverType} onValueChange={setHandoverType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="guard" id="guard" />
                <Label htmlFor="guard" className="flex items-center cursor-pointer">
                  <Users className="w-4 h-4 ml-2" />
                  تسليم لحارس أمن آخر
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="client" />
                <Label htmlFor="client" className="flex items-center cursor-pointer">
                  <User className="w-4 h-4 ml-2" />
                  تسليم للعميل مباشرة
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Guard Details (if handover to guard) */}
          {handoverType === "guard" && (
            <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-700">بيانات الحارس البديل</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="guardName">اسم الحارس *</Label>
                  <Input
                    id="guardName"
                    placeholder="اسم الحارس البديل"
                    value={guardName}
                    onChange={(e) => setGuardName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="guardPhone">رقم الهاتف *</Label>
                  <Input
                    id="guardPhone"
                    placeholder="رقم هاتف الحارس البديل"
                    value={guardPhone}
                    onChange={(e) => setGuardPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">مدة التسليم المتوقعة *</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="اختر مدة التسليم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30min">30 دقيقة</SelectItem>
                <SelectItem value="1hour">ساعة واحدة</SelectItem>
                <SelectItem value="2hours">ساعتان</SelectItem>
                <SelectItem value="4hours">4 ساعات</SelectItem>
                <SelectItem value="8hours">8 ساعات</SelectItem>
                <SelectItem value="12hours">12 ساعة</SelectItem>
                <SelectItem value="24hours">24 ساعة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">سبب طلب التسليم *</Label>
            <Textarea
              id="reason"
              placeholder="اكتب سبب طلب تسليم الموقع..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
            <Textarea
              id="notes"
              placeholder="أي ملاحظات أو تعليمات للحارس البديل أو العميل..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? "جارٍ الإرسال..." : "إرسال طلب التسليم"}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              إلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}