import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Phone } from "lucide-react";


interface TrackingModalProps {
  guard: {
    name: string;
    image: string;
  };
  onClose: () => void;
}

export default function TrackingModal({ guard, onClose }: TrackingModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>تتبع الحارس</DialogTitle>
        </DialogHeader>
        
        <div className="p-4">
          {/* Mock map area */}
          <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mb-2 mx-auto" />
              <p className="text-gray-600">خريطة تتبع الموقع</p>
              <p className="text-sm text-gray-500">المسافة: 1.2 كم • الوصول خلال 8 دقائق</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/images/male_1751872460287.png" 
                alt="حارس الأمن" 
                className="w-10 h-10 rounded-full object-cover ml-3 border-2 border-gray-200"
                style={{ objectFit: 'cover' }}
              />
              <div>
                <p className="font-semibold">{guard.name}</p>
                <p className="text-gray-600 text-sm">في الطريق إليك</p>
              </div>
            </div>
            <Button className="bg-primary text-white px-4 py-2 rounded-lg h-auto">
              <Phone className="ml-2 w-4 h-4" />
              اتصال
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
