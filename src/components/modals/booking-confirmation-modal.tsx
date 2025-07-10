import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check, Phone } from "lucide-react";
import { useLocation } from "wouter";

interface BookingConfirmationModalProps {
  quote: {
    id: number;
    guard: {
      user: { fullName: string };
      profileImage: string;
      rating: string;
    };
    price: string;
  };
  onClose: () => void;
  onConfirm?: () => void;
}

export default function BookingConfirmationModal({ quote, onClose, onConfirm }: BookingConfirmationModalProps) {
  const [, setLocation] = useLocation();

  const handleContinue = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
      setLocation("/client/dashboard");
    }
  };

  const handleCall = () => {
    // محاكاة الاتصال
    window.open("tel:+966501234567");
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-md mx-auto">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">تم قبول العرض!</h3>
          <p className="text-gray-600 mb-6">سيصلك الحارس في الوقت المحدد</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-3">
              <img 
                src={quote.guard.profileImage} 
                alt="حارس الأمن" 
                className="w-12 h-12 rounded-full object-cover ml-3"
              />
              <div>
                <p className="font-bold">{quote.guard.user.fullName}</p>
                <p className="text-gray-600 text-sm">حارس أمن معتمد</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{quote.price} ريال</p>
              <p className="text-gray-600 text-sm">لمدة 4 ساعات</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleContinue}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold h-auto"
            >
              متابعة الطلب
            </Button>
            
            <Button 
              onClick={handleCall}
              variant="outline"
              className="w-full text-gray-600 py-2 border border-gray-300 rounded-lg font-semibold h-auto"
            >
              <Phone className="ml-2 w-4 h-4" />
              الاتصال بالحارس
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
