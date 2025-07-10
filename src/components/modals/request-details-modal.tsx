import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, MapPin, Clock, User, FileText, DollarSign, Settings, Edit3 } from "lucide-react";
import { useState } from "react";
import PriceEditModal from "./price-edit-modal";


interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
}

export default function RequestDetailsModal({ isOpen, onClose, request }: RequestDetailsModalProps) {
  const [showPriceEdit, setShowPriceEdit] = useState(false);

  // بيانات تجريبية للطلب
  const requestDetails = {
    id: request?.id || 1,
    type: request?.type || "حارس شخصي",
    status: request?.status || "جاري التنفيذ",
    time: request?.time || "اليوم - 8:00 صباحاً",
    duration: "8 ساعات",
    location: "مركز الملك عبدالله المالي",
    guardGender: request?.guardGender || "male",
    guard: request?.guard || {
      name: "خالد الأحمد",
      image: "/images/male_1751872460287.png"
    },
    agreedPrice: "1,200 ريال",
    clientNotes: "يرجى التركيز على مداخل المبنى الرئيسية والتأكد من هويات الزوار. نتوقع زيارة عدد كبير من العملاء اليوم.",
    requestedEquipment: [
      "أجهزة الاتصال اللاسلكي (هوكي توكي)",
      "مصابيح الحراسة الأمنية",
      "أجهزة كشف المعادن اليدوية",
      "مرآة تفتيش السيارات"
    ]
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-11/12 max-w-md mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب</DialogTitle>
          </DialogHeader>

          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-lg">{requestDetails.type}</h4>
              <Badge className="bg-green-100 text-green-800">
                {requestDetails.status}
              </Badge>
            </div>

            <div className="space-y-4">
              {/* معلومات أساسية */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-primary ml-3" />
                  <div>
                    <p className="text-sm text-gray-600">نوع الخدمة</p>
                    <p className="font-semibold">{requestDetails.type}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary ml-3" />
                  <div>
                    <p className="text-sm text-gray-600">وقت الخدمة</p>
                    <p className="font-semibold">{requestDetails.time}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary ml-3" />
                  <div>
                    <p className="text-sm text-gray-600">مدة العمل</p>
                    <p className="font-semibold">{requestDetails.duration}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-primary ml-3" />
                  <div>
                    <p className="text-sm text-gray-600">الموقع</p>
                    <p className="font-semibold">{requestDetails.location}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <User className="w-5 h-5 text-primary ml-3" />
                  <div>
                    <p className="text-sm text-gray-600">حارس الأمن المطلوب</p>
                    <p className="font-semibold">{requestDetails.guardGender === "female" ? "حارسة أمن إمرأة" : "حارس أمن رجل"}</p>
                    <img 
                      src={requestDetails.guard.image} 
                      alt={requestDetails.guard.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-gray-200"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-primary ml-3" />
                  <div>
                    <p className="text-sm text-gray-600">رقم الطلب</p>
                    <p className="font-semibold">REQ-{requestDetails.id.toString().padStart(3, '0')}</p>
                  </div>
                </div>
              </div>

              {/* السعر المتفق عليه */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-primary ml-3" />
                    <div>
                      <p className="text-sm text-gray-600">السعر المتفق عليه</p>
                      <p className="font-bold text-lg text-green-600">{requestDetails.agreedPrice}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPriceEdit(true)}
                    className="text-primary"
                  >
                    <Edit3 className="w-4 h-4 ml-1" />
                    تعديل السعر
                  </Button>
                </div>
              </div>

              {/* الأدوات المطلوبة */}
              <div className="border-t pt-4">
                <div className="flex items-center mb-3">
                  <Settings className="w-5 h-5 text-primary ml-3" />
                  <p className="font-semibold">الأدوات المطلوبة</p>
                </div>
                <div className="space-y-2">
                  {requestDetails.requestedEquipment.map((equipment, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full ml-3"></div>
                      <p className="text-sm text-gray-700">{equipment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ملاحظات العميل */}
              <div className="border-t pt-4">
                <div className="flex items-center mb-3">
                  <FileText className="w-5 h-5 text-primary ml-3" />
                  <p className="font-semibold">ملاحظات العميل</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{requestDetails.clientNotes}</p>
                </div>
              </div>
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

      {showPriceEdit && (
        <PriceEditModal
          isOpen={showPriceEdit}
          onClose={() => setShowPriceEdit(false)}
          currentPrice={requestDetails.agreedPrice}
          guard={requestDetails.guard}
        />
      )}
    </>
  );
}