import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Timer } from "lucide-react";

interface EditRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
  onSave?: (updatedRequest: any) => void;
}

export default function EditRequestModal({ isOpen, onClose, request, onSave }: EditRequestModalProps) {
  const [location, setLocation] = useState(request?.location || "");
  const [date, setDate] = useState(request?.date || "");
  const [time, setTime] = useState(request?.time || "");
  const [duration, setDuration] = useState(request?.duration || "");

  const handleSave = () => {
    const updatedRequest = {
      ...request,
      location,
      date,
      time,
      duration
    };
    
    if (onSave) {
      onSave(updatedRequest);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">تعديل الطلب</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              الموقع
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="أدخل الموقع"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              التاريخ
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              وقت بداية العمل
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              المدة
            </Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="مثال: 4 ساعات"
              className="text-right"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} className="flex-1 bg-primary text-white">
            حفظ التعديلات
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1">
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}