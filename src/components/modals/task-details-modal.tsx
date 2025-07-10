import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Calendar, DollarSign, User, FileText, Shield, AlertTriangle } from "lucide-react";
import { formatDateToArabic } from "@/lib/utils";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskData?: {
    id: number;
    type: string;
    client: string;
    location: string;
    date: string;
    time: string;
    duration: string;
    description: string;
    agreedPrice: string;
    clientInstructions: string;
    equipment: string[];
    emergencyContact: string;
    status: string;
  };
}

export default function TaskDetailsModal({ isOpen, onClose, taskData }: TaskDetailsModalProps) {
  // Default data for demo
  const defaultTask = {
    id: 1,
    type: "حارس بوابة",
    client: "أحمد",
    location: "مركز الملك عبدالله المالي - البوابة الرئيسية",
    date: "2024-01-15",
    time: "08:00",
    duration: "8 ساعات",
    description: "مراقبة البوابة الرئيسية وتسجيل دخول وخروج الزوار",
    agreedPrice: "1200 ريال",
    clientInstructions: "التأكد من هوية جميع الزوار وتسجيل بياناتهم في النظام. منع دخول أي شخص بدون تصريح مسبق. التواصل مع الأمن الداخلي في حالة وجود أي مشاكل.",
    equipment: ["جهاز لاسلكي", "كاميرا مراقبة", "سجل الزوار"],
    emergencyContact: "+966501234567",
    status: "جاري التنفيذ"
  };

  const task = taskData || defaultTask;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "جاري التنفيذ":
        return "bg-blue-100 text-blue-800";
      case "مؤكد":
        return "bg-green-100 text-green-800";
      case "مكتمل":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">تفاصيل المهمة</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Task Header */}
          <Card className="border-secondary/20 bg-secondary/5">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-secondary">{task.type}</h3>
                  <p className="text-sm text-gray-600">رقم المهمة: #{task.id}</p>
                </div>
                <Badge className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-gray-500 ml-2" />
                  <div>
                    <p className="text-xs text-gray-500">العميل</p>
                    <p className="font-semibold">{task.client}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-green-600 ml-2" />
                  <div>
                    <p className="text-xs text-gray-500">السعر المتفق عليه</p>
                    <p className="font-semibold text-green-600">{task.agreedPrice}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time and Location */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">الوقت والموقع</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 ml-2" />
                  <div>
                    <p className="text-sm text-gray-500">التاريخ</p>
                    <p className="font-medium">{formatDateToArabic(task.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-500 ml-2" />
                  <div>
                    <p className="text-sm text-gray-500">الوقت والمدة</p>
                    <p className="font-medium">{task.time} - {task.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-gray-500 ml-2 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">الموقع</p>
                    <p className="font-medium">{task.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Description */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">وصف المهمة</h4>
              <p className="text-gray-700 leading-relaxed">{task.description}</p>
            </CardContent>
          </Card>

          {/* Client Instructions */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 ml-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-orange-800">تعليمات العميل</h4>
                  <p className="text-sm text-orange-700 leading-relaxed">{task.clientInstructions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">المعدات المطلوبة</h4>
              <div className="flex flex-wrap gap-2">
                {task.equipment.map((item, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Shield className="w-3 h-3 ml-1" />
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 text-red-800">رقم الطوارئ</h4>
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-red-600 ml-2" />
                <a href={`tel:${task.emergencyContact}`} className="text-red-700 font-medium hover:underline">
                  {task.emergencyContact}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="pt-4">
            <Button onClick={onClose} className="w-full">
              إغلاق
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}