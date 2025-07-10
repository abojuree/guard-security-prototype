import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Check } from "lucide-react";



interface GuardQuotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
}

// Mock data for guard quotes
const mockQuotes = [
  {
    id: 1,
    guard: {
      name: "خالد الأحمد",
      image: "/images/male_1751872460287.png",
      rating: "4.9"
    },
    price: "800 ريال",

  },
  {
    id: 2,
    guard: {
      name: "محمد",
      image: "/images/male_1751872460287.png",
      rating: "4.7"
    },
    price: "750 ريال",

  },
  {
    id: 3,
    guard: {
      name: "نورا",
      image: "/images/female_1751872460286.png",
      rating: "4.8"
    },
    price: "820 ريال",

  }
];

export default function GuardQuotesModal({ isOpen, onClose, request }: GuardQuotesModalProps) {
  const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
  const [selectedGuard, setSelectedGuard] = useState<any>(null);

  const handleAcceptQuote = (quote: any) => {
    setSelectedGuard(quote.guard);
    setShowAcceptConfirmation(true);
    
    // Auto close after 15 seconds
    setTimeout(() => {
      setShowAcceptConfirmation(false);
      onClose();
    }, 15000);
  };

  if (showAcceptConfirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md mx-4" dir="rtl">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">تم قبول العرض!</h3>
            <p className="text-gray-600 mb-4">
              تم قبول عرض حارس الأمن <span className="font-semibold">{selectedGuard?.name}</span>
            </p>
            <p className="text-sm text-gray-500">سيتم إغلاق هذه النافذة تلقائياً خلال 15 ثانية</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl mx-4 max-h-[80vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">عروض حراس الأمن</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-4">
            {mockQuotes.map((quote) => (
              <div key={quote.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-4">
                  {/* Guard Image and Name */}
                  <div className="flex flex-col items-center min-w-0 flex-1">
                    <img 
                      src={quote.guard.image} 
                      alt={quote.guard.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 mb-2"
                      style={{ 
                        objectFit: 'cover',
                        maxWidth: '48px',
                        maxHeight: '48px',
                        width: '48px',
                        height: '48px'
                      }}
                    />
                    <p className="font-semibold text-sm text-center">{quote.guard.name}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex flex-col items-center min-w-0 flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-sm">{quote.guard.rating}</span>
                    </div>
                    <div className="flex text-yellow-400 text-xs">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col items-center min-w-0 flex-1">
                    <p className="text-lg font-bold text-primary">{quote.price}</p>
                    <p className="text-xs text-gray-500">مبلغ العرض</p>
                  </div>

                  {/* Action */}
                  <div className="flex flex-col items-center min-w-0 flex-1">
                    <Button 
                      onClick={() => handleAcceptQuote(quote)}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 h-auto"
                    >
                      قبول العرض
                    </Button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button onClick={onClose} variant="outline" className="px-8">
            إغلاق
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}