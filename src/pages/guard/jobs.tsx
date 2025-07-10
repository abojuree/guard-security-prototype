import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, MapPin, Clock, Star, DollarSign, Calendar, User, FileText, TriangleAlert, UserMinus, Users, Mic } from "lucide-react";
import { formatDateToArabic, formatTimeToArabic } from "@/lib/utils";
import BottomNav from "@/components/ui/bottom-nav";
import TaskDetailsModal from "@/components/modals/task-details-modal";
import TaskLocationModal from "@/components/modals/task-location-modal";
import GuardEmergencyReportModal from "@/components/modals/guard-emergency-report-modal";
import WithdrawalRequestModal from "@/components/modals/withdrawal-request-modal";
import SiteHandoverModal from "@/components/modals/site-handover-modal";
import VoiceChatModal from "@/components/modals/voice-chat-modal";


export default function GuardJobs() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showTaskLocation, setShowTaskLocation] = useState(false);
  const [showEmergencyReport, setShowEmergencyReport] = useState(false);
  const [showWithdrawalRequest, setShowWithdrawalRequest] = useState(false);
  const [showSiteHandover, setShowSiteHandover] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);

  // المهام النشطة
  const activeJobs = [
    {
      id: 1,
      type: "حارس بوابة",
      client: "أحمد",
      location: "مركز الملك عبدالله المالي",
      date: "2024-01-15",
      time: "14:00",
      duration: "4 ساعات",
      status: "جاري العمل",
      payment: "800 ريال",
      description: "مراقبة بوابة رئيسية",
      startTime: "منذ ساعة"
    },
    {
      id: 2,
      type: "حراسة فعالية",
      client: "شركة الأعمال المتقدمة",
      location: "فندق الريتز كارلتون",
      date: "2024-01-16",
      time: "18:00",
      duration: "6 ساعات",
      status: "مؤكد",
      payment: "1200 ريال",
      description: "مؤتمر أعمال دولي",
      startTime: "غداً"
    }
  ];

  // المهام المكتملة
  const completedJobs = [
    {
      id: 3,
      type: "حراسة موقع",
      client: "سارة",
      location: "مستشفى المملكة",
      date: "2024-01-10",
      time: "08:00",
      duration: "8 ساعات",
      status: "مكتمل",
      payment: "1500 ريال",
      description: "مراقبة أنظمة أمن",
      completedAt: "منذ 5 أيام",
      clientRating: 5,
      clientFeedback: "أداء ممتاز وموثوق"
    },
    {
      id: 4,
      type: "حارس بوابة",
      client: "عبدالله",
      location: "قاعة الملك فهد",
      date: "2024-01-05",
      time: "16:00",
      duration: "12 ساعة",
      status: "مكتمل",
      payment: "2400 ريال",
      description: "حراسة مؤتمر أو فعالية",
      completedAt: "منذ 10 أيام",
      clientRating: 4,
      clientFeedback: "خدمة جيدة ومهنية"
    }
  ];

  const handleShowDetails = (job: any) => {
    setSelectedJob(job);
    setShowTaskDetails(true);
  };

  const handleShowLocation = (job: any) => {
    setSelectedJob(job);
    setShowTaskLocation(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "جديد":
        return "bg-blue-100 text-blue-800";
      case "جاري العمل":
        return "bg-green-100 text-green-800";
      case "مؤكد":
        return "bg-yellow-100 text-yellow-800";
      case "ملغي":
        return "bg-red-100 text-red-800";
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "جاري التنفيذ":
        return "bg-blue-100 text-blue-800";
      case "مؤكد - غداً":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const JobCard = ({ job, isActive = false, showRating = false }: { job: any, isActive?: boolean, showRating?: boolean }) => (
    <Card className="bg-white rounded-xl custom-shadow mb-4" dir="rtl">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="font-semibold">{job.type}</p>
            <p className="text-gray-600 text-sm">{job.description}</p>
            <p className="text-gray-600 text-sm" style={{ direction: 'ltr' }}>{formatDateToArabic(job.date)} - {job.time}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(job.status)}`}>
            {job.status}
          </span>
        </div>



        <div className="flex items-center mb-3">
          <MapPin className="w-4 h-4 text-gray-400 ml-2" />
          <span className="text-sm text-gray-600">{job.location}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-400 ml-2" />
            <span className="text-sm text-gray-600">{job.duration}</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-bold text-green-600">{job.payment}</span>
          </div>
        </div>

        {/* Client Rating for completed jobs */}
        {job.clientRating && showRating && (
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 ml-2">تم تقييمك من قبل أحد العملاء:</span>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < job.clientRating ? 'fill-current' : ''}`} />
                  ))}
                </div>
              </div>
            </div>
            {job.clientFeedback && (
              <p className="text-sm text-gray-600 mt-2 italic">"{job.clientFeedback}"</p>
            )}
          </div>
        )}

        {isActive && job.status === "جاري العمل" && job.type === "حارس بوابة" && (
          <div className="border-t pt-3 mt-3">
            <div className="space-y-3">
              {/* First Row */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setShowEmergencyReport(true)}
                  variant="destructive"
                  className="bg-red-100 text-red-800 py-3 rounded-lg font-semibold hover:bg-red-200 h-auto"
                >
                  <TriangleAlert className="ml-2 w-4 h-4" />
                  بلاغ طارئ
                </Button>
                <Button
                  onClick={() => setShowWithdrawalRequest(true)}
                  variant="outline"
                  className="bg-orange-100 text-orange-800 border-orange-300 py-3 rounded-lg font-semibold hover:bg-orange-200 h-auto"
                >
                  <UserMinus className="ml-2 w-4 h-4" />
                  طلب انسحاب
                </Button>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setShowSiteHandover(true)}
                  variant="outline"
                  className="bg-blue-100 text-blue-800 border-blue-300 py-3 rounded-lg font-semibold hover:bg-blue-200 h-auto"
                >
                  <Users className="ml-2 w-4 h-4" />
                  تسليم موقع
                </Button>
                <Button
                  onClick={() => handleShowDetails(job)}
                  variant="outline"
                  className="bg-gray-100 text-gray-800 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 h-auto"
                >
                  <FileText className="ml-2 w-4 h-4" />
                  تفاصيل المهمة
                </Button>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleShowLocation(job)}
                  variant="outline"
                  className="bg-green-100 text-green-800 border-green-300 py-3 rounded-lg font-semibold hover:bg-green-200 h-auto"
                >
                  <MapPin className="ml-2 w-4 h-4" />
                  موقع المهمة
                </Button>
                <Button
                  onClick={() => {
                    setSelectedJob(job);
                    setShowVoiceChat(true);
                  }}
                  variant="outline"
                  className="bg-purple-100 text-purple-800 border-purple-300 py-3 rounded-lg font-semibold hover:bg-purple-200 h-auto"
                >
                  <Mic className="ml-2 w-4 h-4" />
                  صوتي
                </Button>
              </div>
            </div>
          </div>
        )}

        {isActive && (job.status !== "جاري العمل" || job.type !== "حارس بوابة") && (
          <div className="border-t pt-3 mt-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleShowLocation(job)}
                variant="outline"
                className="bg-gray-100 text-gray-800 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 h-auto"
              >
                <MapPin className="ml-2 w-4 h-4" />
                الموقع
              </Button>
              <Button
                onClick={() => handleShowDetails(job)}
                variant="outline"
                className="bg-gray-100 text-gray-800 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 h-auto"
              >
                <FileText className="ml-2 w-4 h-4" />
                التفاصيل
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-6 custom-shadow">
        <div className="flex items-center mb-4">
          <Link href="/guard/dashboard">
            <Button variant="ghost" size="sm" className="ml-4 text-gray-600">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <h3 className="text-xl font-bold">مهامي</h3>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active">المهام النشطة ({activeJobs.length})</TabsTrigger>
            <TabsTrigger value="completed">المكتملة ({completedJobs.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            {activeJobs.length > 0 ? (
              activeJobs.map((job) => (
                <JobCard key={job.id} job={job} isActive />
              ))
            ) : (
              <Card className="bg-white p-8 text-center">
                <CardContent className="p-0">
                  <div className="text-gray-400 mb-4">
                    <Clock className="w-12 h-12 mx-auto mb-2" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">لا توجد مهام نشطة</h4>
                  <p className="text-gray-500 mb-4">لا توجد مهام مؤكدة حالياً</p>
                  <Link href="/guard/requests">
                    <Button className="bg-secondary text-white">
                      استعراض الطلبات المتاحة
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedJobs.length > 0 ? (
              completedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <Card className="bg-white p-8 text-center">
                <CardContent className="p-0">
                  <div className="text-gray-400 mb-4">
                    <Star className="w-12 h-12 mx-auto mb-2" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">لا توجد مهام مكتملة</h4>
                  <p className="text-gray-500">ستظهر مهامك المكتملة هنا</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav activeTab="jobs" userType="guard" />

      {/* Task Details Modal */}
      {showTaskDetails && selectedJob && (
        <TaskDetailsModal
          isOpen={showTaskDetails}
          onClose={() => setShowTaskDetails(false)}
          jobId={selectedJob.id}
        />
      )}

      {/* Task Location Modal */}
      {showTaskLocation && selectedJob && (
        <TaskLocationModal
          isOpen={showTaskLocation}
          onClose={() => setShowTaskLocation(false)}
          jobId={selectedJob.id}
        />
      )}

      {/* Emergency Report Modal */}
      {showEmergencyReport && (
        <GuardEmergencyReportModal
          isOpen={showEmergencyReport}
          onClose={() => setShowEmergencyReport(false)}
          jobId={selectedJob?.id}
        />
      )}

      {/* Withdrawal Request Modal */}
      {showWithdrawalRequest && (
        <WithdrawalRequestModal
          isOpen={showWithdrawalRequest}
          onClose={() => setShowWithdrawalRequest(false)}
          jobId={selectedJob?.id}
        />
      )}

      {/* Site Handover Modal */}
      {showSiteHandover && (
        <SiteHandoverModal
          isOpen={showSiteHandover}
          onClose={() => setShowSiteHandover(false)}
          jobId={selectedJob?.id}
        />
      )}

      {/* Voice Chat Modal */}
      {showVoiceChat && (
        <VoiceChatModal
          isOpen={showVoiceChat}
          onClose={() => setShowVoiceChat(false)}
          jobId={selectedJob?.id}
        />
      )}
    </div>
  );
}