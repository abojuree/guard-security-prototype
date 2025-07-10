import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, X, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GuardEmergencyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId?: number;
}

export default function GuardEmergencyReportModal({ isOpen, onClose, jobId }: GuardEmergencyReportModalProps) {
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();

  const emergencyTypes = [
    "حادثة أمنية طارئة",
    "طلب تعزيزات أمنية",
    "مشكلة تقنية في المعدات",
    "حالة طبية طارئة",
    "خلل في نظام الأمان",
    "تهديد أمني محتمل",
    "إخلاء المسؤولية",
    "طلب تدخل إدارة",
    "أخرى"
  ];

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

    toast({
      title: "تم إرسال البلاغ الطارئ",
      description: "سيتم إشعار العميل والإدارة فوراً",
    });
    
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center justify-center text-red-600">
            <AlertTriangle className="w-6 h-6 ml-2" />
            بلاغ طارئ من حارس الأمن
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <p className="text-red-800 text-sm font-semibold">
              هذا البلاغ سيتم إرساله فوراً للعميل والإدارة
            </p>
          </div>

          <div>
            <Label htmlFor="reportType" className="text-right block mb-2 font-semibold">
              نوع البلاغ الطارئ *
            </Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع البلاغ الطارئ" />
              </SelectTrigger>
              <SelectContent>
                {emergencyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-right block mb-2 font-semibold">
              وصف المشكلة أو الحادثة *
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب تفاصيل المشكلة أو الحادثة بوضوح..."
              className="min-h-24 text-right"
              maxLength={500}
            />
            <div className="text-left text-xs text-gray-500 mt-1">
              {description.length}/500
            </div>
          </div>

          <div>
            <Label className="text-right block mb-2 font-semibold">
              إرفاق صور (اختياري)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">اضغط لإرفاق صور</p>
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 w-6 h-6 p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              إرسال البلاغ الطارئ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}