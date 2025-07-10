import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Image, AlertTriangle, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface WithdrawalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId?: number;
}

export default function WithdrawalRequestModal({ isOpen, onClose, jobId }: WithdrawalRequestModalProps) {
  const [reason, setReason] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type (PDF or image)
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        setAttachedFile(file);
      } else {
        toast({
          title: "نوع ملف غير مدعوم",
          description: "يُرجى اختيار صورة أو ملف PDF فقط",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast({
        title: "مطلوب سبب الانسحاب",
        description: "يُرجى كتابة سبب طلب الانسحاب",
        variant: "destructive",
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        title: "مطلوب الموافقة على الشروط",
        description: "يُرجى الموافقة على شروط طلب الانسحاب",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تم إرسال طلب الانسحاب",
        description: "سيتم مراجعة طلبك من قبل العميل وإشعارك بالقرار",
      });
      
      onClose();
      setReason("");
      setAttachedFile(null);
      setAgreedToTerms(false);
    } catch (error) {
      toast({
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ أثناء إرسال طلب الانسحاب، يُرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">طلب الانسحاب من المهمة</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Warning Alert */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 ml-2 flex-shrink-0" />
                <div className="text-sm text-orange-800">
                  <p className="font-semibold mb-1">تنبيه مهم:</p>
                  
                  <p>طلب الانسحاب من المهمة يتطلب موافقة العميل. في حالة الموافقة، ستتنازل عن مستحقاتك المالية لهذه المهمة.</p>
                  <p className="mt-2 font-semibold mb-1">يترتب على انسحاب حارس الأمن إيقاف حسابه مؤقتاً ولا يمكنه إرسال عروض لعملاء آخرين.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reason Input */}
          <div className="space-y-2">
            <Label htmlFor="reason">سبب طلب الانسحاب *</Label>
            <Textarea
              id="reason"
              placeholder="اكتب سبب طلب الانسحاب من المهمة..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>إرفاق ملف (اختياري)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {attachedFile ? (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {attachedFile.type.startsWith('image/') ? (
                      <Image className="w-5 h-5 text-blue-600 ml-2" />
                    ) : (
                      <FileText className="w-5 h-5 text-red-600 ml-2" />
                    )}
                    <span className="text-sm text-gray-700">{attachedFile.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="h-auto p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">اختر صورة أو ملف PDF</p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                      <span>تحديد ملف</span>
                    </Button>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Terms Agreement */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={setAgreedToTerms}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-red-800 cursor-pointer">
                  <span className="font-semibold">أتعهد وأوافق على الآتي:</span>
                  <br />
                  أنا أطلب الانسحاب من هذه المهمة بإرادتي الحرة وأتنازل عن جميع مستحقاتي المالية المتعلقة بهذه المهمة في حالة موافقة العميل على طلب الانسحاب.
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
            >
              {isSubmitting ? "جارٍ الإرسال..." : "إرسال طلب الانسحاب"}
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