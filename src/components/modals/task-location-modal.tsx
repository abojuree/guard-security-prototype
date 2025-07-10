import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

interface TaskLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location?: {
    name: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export default function TaskLocationModal({ isOpen, onClose, location }: TaskLocationModalProps) {
  // Default location for demo
  const defaultLocation = {
    name: "مركز الملك عبدالله المالي",
    address: "طريق الملك فهد، الرياض 12211، المملكة العربية السعودية",
    coordinates: {
      lat: 24.7136,
      lng: 46.6753
    }
  };

  const taskLocation = location || defaultLocation;

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${taskLocation.coordinates.lat},${taskLocation.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const openInAppleMaps = () => {
    const url = `http://maps.apple.com/?daddr=${taskLocation.coordinates.lat},${taskLocation.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">موقع المهمة</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Location Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-red-600 mt-1 ml-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">{taskLocation.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{taskLocation.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Container */}
          <Card>
            <CardContent className="p-0">
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Static map placeholder with marker */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-sm text-gray-600">موقع المهمة</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {taskLocation.coordinates.lat.toFixed(4)}, {taskLocation.coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  {/* Mock map grid */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="border-b border-gray-400" style={{ height: '12.5%' }} />
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="border-r border-gray-400 absolute top-0 bottom-0" style={{ width: '12.5%', left: `${i * 12.5}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="space-y-3">
            <Button
              onClick={openInGoogleMaps}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Navigation className="w-4 h-4 ml-2" />
              الوصول عبر خرائط جوجل
              <ExternalLink className="w-4 h-4 mr-2" />
            </Button>
            
            <Button
              onClick={openInAppleMaps}
              variant="outline"
              className="w-full"
            >
              <Navigation className="w-4 h-4 ml-2" />
              الوصول عبر خرائط آبل
              <ExternalLink className="w-4 h-4 mr-2" />
            </Button>
          </div>

          {/* Additional Info */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">نصائح للوصول:</p>
                <ul className="space-y-1 text-xs">
                  <li>• تأكد من وصولك قبل موعد البدء بـ 15 دقيقة</li>
                  <li>• احتفظ بنسخة من تفاصيل الموقع في حالة ضعف الإنترنت</li>
                  <li>• تواصل مع العميل في حالة صعوبة العثور على الموقع</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="pt-4">
            <Button onClick={onClose} variant="outline" className="w-full">
              إغلاق
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}