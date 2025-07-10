import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CancelScheduledOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onConfirm?: () => void;
}

export default function CancelScheduledOrderModal({ isOpen, onClose, order, onConfirm }: CancelScheduledOrderModalProps) {
  const [isAgreed, setIsAgreed] = useState(false);
  const { toast } = useToast();

  const handleConfirm = () => {
    if (!isAgreed) {
      toast({
        title: "يرجى الموافقة على الشروط",
        description: "يجب الموافقة على شروط الإلغاء للمتابعة",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم إلغاء الطلب",
      description: "تم إلغاء طلبك وسيتم خصم 20% من المبلغ كرسوم إلغاء",
    });

    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const cancelFee = order?.price ? Math.round(parseFloat(order.price.replace(/[^\d.]/g, '')) * 0.2) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-md mx-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center justify-center text-red-600">
            <AlertTriangle className="w-6 h-6 ml-2" />
            تحذير إلغاء الطلب
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 ml-3" />
              <div className="text-right">
                <h4 className="font-semibold text-red-800 mb-2">شروط إلغاء الطلب</h4>
                <p className="text-red-700 text-sm leading-relaxed">
                  عند إلغاء الطلب خلال 24 ساعة قبل بدء العمل، سيتم خصم <span className="font-bold">20%</span> من مبلغ العرض كرسوم إلغاء.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">تفاصيل الطلب:</h5>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">نوع الخدمة:</span> {order?.type}</p>
              <p><span className="font-medium">المبلغ الأصلي:</span> {order?.price}</p>
              <p><span className="font-medium">رسوم الإلغاء (20%):</span> {cancelFee} ريال</p>
              <p><span className="font-medium">المبلغ المسترد:</span> {order?.price ? (parseFloat(order.price.replace(/[^\d.]/g, '')) - cancelFee) : 0} ريال</p>
            </div>
          </div>

          <div className="flex items-start space-x-2 space-x-reverse">
            <Checkbox
              id="agree"
              checked={isAgreed}
              onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
            />
            <label htmlFor="agree" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
              أوافق على شروط الإلغاء وأدرك أنه سيتم خصم 20% من مبلغ العرض كرسوم إلغاء
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              onClick={onClose}
              variant="outline" 
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!isAgreed}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              تأكيد الإلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}