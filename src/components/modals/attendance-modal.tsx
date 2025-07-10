import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin } from "lucide-react";


interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  guard: any;
}

export default function AttendanceModal({ isOpen, onClose, guard }: AttendanceModalProps) {
  const attendanceData = [
    {
      date: "اليوم",
      checkIn: "08:00 ص",
      checkOut: "جاري العمل",
      location: "مركز الملك عبدالله المالي",
      status: "نشط",
      duration: "4 ساعات"
    },
    {
      date: "أمس",
      checkIn: "02:00 م",
      checkOut: "06:00 م",
      location: "مركز الملك عبدالله المالي",
      status: "مكتمل",
      duration: "4 ساعات"
    },
    {
      date: "30/01/2025",
      checkIn: "10:00 ص",
      checkOut: "06:00 م",
      location: "مركز الملك عبدالله المالي",
      status: "مكتمل",
      duration: "8 ساعات"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle>جدول الحضور والتواجد</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <div className="mb-4 text-center">
            <img 
              src="/images/male_1751872460287.png" 
              alt={guard?.name}
              className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-gray-200"
              style={{ objectFit: 'cover' }}
            />
            <h4 className="font-bold">{guard?.name}</h4>
            <p className="text-gray-600 text-sm">حارس شخصي</p>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {attendanceData.map((record, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-sm">{record.date}</p>
                    <div className="flex items-center text-gray-600 text-xs">
                      <MapPin className="w-3 h-3 ml-1" />
                      <span>{record.location}</span>
                    </div>
                  </div>
                  <Badge className={
                    record.status === "نشط" 
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }>
                    {record.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-600 ml-1" />
                    <span>دخول: {record.checkIn}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 text-orange-600 ml-1" />
                    <span>خروج: {record.checkOut}</span>
                  </div>
                  <div className="text-gray-600">
                    المدة: {record.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button 
              onClick={onClose}
              className="w-full bg-primary text-white"
            >
              إغلاق
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}