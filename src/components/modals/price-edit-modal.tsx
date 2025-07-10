
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


interface PriceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrice: string;
  guard: any;
}

export default function PriceEditModal({ isOpen, onClose, currentPrice, guard }: PriceEditModalProps) {
  const [newPrice, setNewPrice] = useState("");
  const [justification, setJustification] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPrice || !justification.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال السعر الجديد والمبررات",
        variant: "destructive",
      });
      return;
    }

    const priceValue = parseFloat(newPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال سعر صحيح",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم إرسال طلب تعديل السعر",
      description: `تم إرسال طلب تعديل السعر إلى ${guard?.name}. سيتم إشعارك عند الرد.`,
    });
    
    setNewPrice("");
    setJustification("");
    onClose();
  };

  const quickJustifications = [
    "تغيير في نطاق العمل المطلوب",
    "إضافة مهام أمنية إضافية",
    "تقليل ساعات العمل",
    "تعديل في المعدات المطلوبة",
    "ظروف استثنائية في الموقع"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>تعديل السعر</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 space-y-4">
          <div className="text-center">
            <img 
              src="/images/male_1751872460287.png" 
              alt={guard?.name}
              className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-gray-200"
              style={{ objectFit: 'cover' }}
            />
            <h4 className="font-bold">{guard?.name}</h4>
            <p className="text-gray-600 text-sm">طلب تعديل السعر</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* السعر الحالي */}
            <div>
              <Label className="block text-gray-700 font-semibold mb-2">
                السعر الحالي
              </Label>
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <DollarSign className="w-5 h-5 text-gray-500 ml-2" />
                <span className="font-semibold text-gray-700">{currentPrice}</span>
              </div>
            </div>

            {/* السعر الجديد */}
            <div>
              <Label htmlFor="newPrice" className="block text-gray-700 font-semibold mb-2">
                السعر الجديد المطلوب
              </Label>
              <div className="relative">
                <Input
                  id="newPrice"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="0"
                  className="w-full p-3 border border-gray-300 rounded-lg pl-16"
                  min="0"
                  step="0.01"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <span className="text-sm">ريال</span>
                </div>
              </div>
            </div>

            {/* المبررات السريعة */}
            <div>
              <Label className="block text-gray-700 font-semibold mb-2">
                مبررات التعديل (اختياري)
              </Label>
              <div className="grid grid-cols-1 gap-2 mb-3">
                {quickJustifications.map((reason, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-right justify-start h-auto py-2"
                    onClick={() => setJustification(reason)}
                  >
                    {reason}
                  </Button>
                ))}
              </div>
            </div>

            {/* مبررات مخصصة */}
            <div>
              <Label htmlFor="justification" className="block text-gray-700 font-semibold mb-2">
                مبررات إضافية
              </Label>
              <Textarea
                id="justification"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="اشرح سبب طلب تعديل السعر..."
                className="h-24"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                سيتم إرسال هذه المبررات إلى حارس الأمن مع طلب التعديل
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                إلغاء
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-primary text-white"
              >
                إرسال طلب التعديل
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
