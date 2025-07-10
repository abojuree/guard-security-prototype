import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Download, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  User, 
  Star,
  MessageSquare,
  Camera,
  Shield,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ComprehensiveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export default function ComprehensiveReportModal({ isOpen, onClose, order }: ComprehensiveReportModalProps) {
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const { toast } = useToast();

  const reportData = {
    orderInfo: {
      id: order?.id || "#12345",
      type: order?.type || "حارس شخصي",
      status: "مكتمل",
      requestDate: "2025-01-06",
      serviceDate: "2025-01-07",
      location: "مركز الملك عبدالله المالي",
      duration: "4 ساعات",
      jobDescription: "حراسة شخصية لاجتماع مهم مع عملاء"
    },
    guard: {
      name: "خالد الأحمد",
      id: "G001",
      experience: "5 سنوات",
      specializations: ["حراسة شخصية", "حراسة فعاليات"],
      profileImage: "/attached_assets/male_1751872460287.png"
    },
    timeline: [
      { time: "14:00", event: "وصول حارس الأمن إلى الموقع", type: "arrival" },
      { time: "14:05", event: "بدء الخدمة الأمنية", type: "start" },
      { time: "16:30", event: "تقرير دوري - كل شيء طبيعي", type: "report" },
      { time: "18:00", event: "انتهاء الخدمة بنجاح", type: "complete" }
    ],
    ratings: [
      { criterion: "الانضباط والالتزام", rating: 5 },
      { criterion: "المظهر المهني", rating: 5 },
      { criterion: "التعامل المهني", rating: 4 },
      { criterion: "فعالية الحراسة", rating: 5 }
    ],
    finalRating: 4.8,
    communications: [
      { time: "14:10", from: "العميل", message: "تأكد من مراقبة المداخل الجانبية" },
      { time: "14:12", from: "الحارس", message: "تم التنفيذ، جميع المداخل تحت المراقبة" },
      { time: "16:35", from: "الحارس", message: "تقرير دوري: الوضع مستقر" }
    ],
    emergencyReports: [
      { time: "15:45", type: "تنبيه أمني", description: "ملاحظة شخص مشبوه، تم التعامل معه بنجاح" }
    ],
    documents: [
      { name: "صورة بداية الخدمة", type: "image" },
      { name: "تقرير نهاية الخدمة", type: "document" }
    ]
  };

  const handleDownloadPDF = () => {
    toast({
      title: "جاري تحضير التقرير",
      description: "سيتم تحميل ملف PDF خلال لحظات",
    });
    
    // هنا يمكن إضافة منطق تحميل PDF فعلي
    setTimeout(() => {
      toast({
        title: "تم تحميل التقرير",
        description: "تم حفظ التقرير الشامل بصيغة PDF",
      });
    }, 2000);
  };

  const handleFileComplaint = () => {
    setShowComplaintForm(true);
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "arrival": return <MapPin className="w-4 h-4 text-blue-600" />;
      case "start": return <Shield className="w-4 h-4 text-green-600" />;
      case "report": return <FileText className="w-4 h-4 text-orange-600" />;
      case "complete": return <Clock className="w-4 h-4 text-purple-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (showComplaintForm) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-11/12 max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-right flex items-center justify-center text-red-600">
              <AlertTriangle className="w-6 h-6 ml-2" />
              تقديم شكوى على حارس الأمن
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-4 space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <p className="text-red-800 text-sm">
                ستتم مراجعة الشكوى من قبل الإدارة خلال 24 ساعة
              </p>
            </div>
            
            <div>
              <label className="block text-right mb-2 font-semibold">سبب الشكوى</label>
              <select className="w-full border rounded-lg p-3 text-right">
                <option>عدم الالتزام بالمواعيد</option>
                <option>سوء التعامل</option>
                <option>عدم اتباع التعليمات</option>
                <option>إهمال في العمل</option>
                <option>أخرى</option>
              </select>
            </div>
            
            <div>
              <label className="block text-right mb-2 font-semibold">تفاصيل الشكوى</label>
              <textarea 
                className="w-full border rounded-lg p-3 text-right h-24"
                placeholder="اكتب تفاصيل الشكوى..."
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowComplaintForm(false)}
              >
                إلغاء
              </Button>
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  toast({
                    title: "تم تقديم الشكوى",
                    description: "ستتم مراجعتها من قبل الإدارة",
                  });
                  onClose();
                }}
              >
                تقديم الشكوى
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-4xl mx-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-6 h-6 ml-2" />
              تقرير حارس الأمن الشامل
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleDownloadPDF}
                className="flex items-center"
              >
                <Download className="w-4 h-4 ml-1" />
                PDF تحميل
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleFileComplaint}
                className="flex items-center"
              >
                <AlertTriangle className="w-4 h-4 ml-1" />
                تقديم شكوى
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] p-4">
          <div className="space-y-6">
            {/* معلومات الطلب */}
            <Card>
              <CardHeader>
                <h3 className="font-bold text-lg">معلومات الطلب</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">رقم الطلب</p>
                    <p className="font-semibold">{reportData.orderInfo.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">نوع الخدمة</p>
                    <p className="font-semibold">{reportData.orderInfo.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">تاريخ الطلب</p>
                    <p className="font-semibold">{reportData.orderInfo.requestDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">تاريخ الخدمة</p>
                    <p className="font-semibold">{reportData.orderInfo.serviceDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">الموقع</p>
                    <p className="font-semibold">{reportData.orderInfo.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">المدة</p>
                    <p className="font-semibold">{reportData.orderInfo.duration}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">وصف العمل</p>
                  <p className="font-semibold">{reportData.orderInfo.jobDescription}</p>
                </div>
              </CardContent>
            </Card>

            {/* معلومات حارس الأمن */}
            <Card>
              <CardHeader>
                <h3 className="font-bold text-lg">معلومات حارس الأمن</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <img 
                    src="/images/male_1751872460287.png"
                    alt={reportData.guard.name}
                    className="w-16 h-16 rounded-full object-cover ml-4"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{reportData.guard.name}</h4>
                    <p className="text-gray-600">رقم الحارس: {reportData.guard.id}</p>
                    <p className="text-gray-600">الخبرة: {reportData.guard.experience}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">التخصصات</p>
                  <div className="flex gap-2">
                    {reportData.guard.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary">{spec}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* الجدول الزمني */}
            <Card>
              <CardHeader>
                <h3 className="font-bold text-lg">الجدول الزمني للخدمة</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData.timeline.map((event, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="ml-3">
                        {getTimelineIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{event.event}</p>
                        <p className="text-sm text-gray-600">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* التقييمات */}
            <Card>
              <CardHeader>
                <h3 className="font-bold text-lg">تقييم الأداء</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportData.ratings.map((rating, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{rating.criterion}</span>
                    <div className="flex">{renderStars(rating.rating)}</div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">التقييم النهائي</span>
                  <div className="flex items-center">
                    <span className="font-bold text-lg ml-2">{reportData.finalRating}</span>
                    <div className="flex">{renderStars(Math.round(reportData.finalRating))}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* المحادثات */}
            <Card>
              <CardHeader>
                <h3 className="font-bold text-lg">سجل المحادثات</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData.communications.map((msg, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm">{msg.from}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* البلاغات الطارئة */}
            <Card>
              <CardHeader>
                <h3 className="font-bold text-lg">البلاغات الطارئة</h3>
              </CardHeader>
              <CardContent>
                {reportData.emergencyReports.length > 0 ? (
                  <div className="space-y-3">
                    {reportData.emergencyReports.map((report, index) => (
                      <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-sm text-yellow-800">{report.type}</span>
                          <span className="text-xs text-yellow-600">{report.time}</span>
                        </div>
                        <p className="text-sm text-yellow-800">{report.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">لا توجد بلاغات طارئة</p>
                )}
              </CardContent>
            </Card>

            {/* المستندات المرفقة */}
            <Card>
              <CardHeader>
                <h3 className="font-bold text-lg">المستندات المرفقة</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {reportData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center p-2 border rounded-lg">
                      <div className="ml-3">
                        {doc.type === "image" ? (
                          <Camera className="w-5 h-5 text-blue-600" />
                        ) : (
                          <FileText className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <span className="flex-1">{doc.name}</span>
                      <Button size="sm" variant="outline">عرض</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        {/* أزرار العمليات */}
        <div className="flex justify-center gap-4 pt-4 border-t">
          <Button
            onClick={handleDownloadPDF}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="w-4 h-4 ml-1" />
            تحميل التقرير PDF
          </Button>
          <Button
            onClick={handleFileComplaint}
            variant="destructive"
            className="flex items-center"
          >
            <AlertTriangle className="w-4 h-4 ml-1" />
            تقديم شكوى
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}