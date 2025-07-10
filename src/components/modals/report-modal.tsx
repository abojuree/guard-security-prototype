import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ReportModalProps {
  onClose: () => void;
  bookingId?: number;
}

export default function ReportModal({ onClose, bookingId }: ReportModalProps) {
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();

  const reportMutation = useMutation({
    mutationFn: async (reportData: any) => {
      const response = await apiRequest("POST", "/api/reports", reportData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم إرسال البلاغ بنجاح",
        description: "سيتم مراجعة البلاغ من قبل الإدارة",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "خطأ في إرسال البلاغ",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportType || !description) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const reportData = {
      bookingId: bookingId || 1,
      guardId: 1,
      type: reportType,
      description,
      images: images.length > 0 ? images : null,
    };

    reportMutation.mutate(reportData);
  };

  const handleImageUpload = () => {
    // محاكاة رفع الصور
    toast({
      title: "تم رفع الصورة",
      description: "تم إضافة الصورة للبلاغ",
    });
    setImages([...images, "mock-image-url.jpg"]);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-md mx-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-bold text-accent">بلاغ طارئ</DialogTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="reportType" className="block text-gray-700 font-semibold mb-2">
                نوع البلاغ
              </Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg">
                  <SelectValue placeholder="اختر نوع البلاغ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">حالة طارئة</SelectItem>
                  <SelectItem value="security">مشكلة أمنية</SelectItem>
                  <SelectItem value="support">طلب دعم</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                تفاصيل البلاغ
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اكتب تفاصيل الحادث أو المشكلة"
                className="w-full p-3 border border-gray-300 rounded-lg h-24"
                dir="rtl"
                required
              />
            </div>
            
            <div>
              <Label className="block text-gray-700 font-semibold mb-2">
                إرفاق صور (اختياري)
              </Label>
              <div 
                onClick={handleImageUpload}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <Camera className="w-8 h-8 text-gray-400 mb-2 mx-auto" />
                <p className="text-gray-600 text-sm">اضغط لإرفاق صور</p>
                {images.length > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    تم رفع {images.length} صورة
                  </p>
                )}
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={reportMutation.isPending}
              className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 h-auto"
            >
              {reportMutation.isPending ? "جاري الإرسال..." : "إرسال البلاغ"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
