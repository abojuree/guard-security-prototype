import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface CancelRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
  onConfirm?: () => void;
}

export default function CancelRequestModal({ isOpen, onClose, request, onConfirm }: CancelRequestModalProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-red-800">تأكيد إلغاء الطلب</DialogTitle>
        </DialogHeader>
        
        <div className="py-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            هل أنت متأكد من إلغاء الطلب؟
          </h3>
          
          <p className="text-gray-600 mb-6">
            سيتم إلغاء طلب {request?.type} في {request?.location} نهائياً ولن تتمكن من استعادته.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            نعم، قم بإلغاء الطلب
          </Button>
          <Button 
            onClick={onClose}
            variant="outline"
            className="border-gray-300"
          >
            العودة للطلب
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}