import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


interface VoiceChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId?: number;
}

export default function VoiceChatModal({ isOpen, onClose, jobId }: VoiceChatModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const { toast } = useToast();

  // بيانات العميل المأخوذة من المهمة
  const clientData = {
    name: "أحمد",
    avatar: "/images/client-saudi.png",
    type: "عميل"
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "بدء التحدث المباشر",
      description: "انقر مع الاستمرار وتحدث",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    toast({
      title: "انتهى التحدث المباشر",
      description: `تم إنهاء التحدث المباشر مع العميل ${clientData.name}`,
    });
  };

  const handleVoiceCall = () => {
    toast({
      title: "بدء المكالمة الصوتية",
      description: `جاري الاتصال بالعميل ${clientData.name}...`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>التواصل الصوتي مع العميل</DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-6">
          <div className="text-center">
            <img 
              src={clientData.avatar}
              alt={clientData.name}
              className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-gray-200"
              style={{ objectFit: 'cover' }}
            />
            <h4 className="font-bold text-lg">العميل: {clientData.name}</h4>
          </div>

          {/* PTT Recording */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              انقر مع الاستمرار وتحدث
            </p>

            <div className="relative">
              <Button
                onMouseDown={handleStartRecording}
                onMouseUp={handleStopRecording}
                onTouchStart={handleStartRecording}
                onTouchEnd={handleStopRecording}
                className={`w-20 h-20 rounded-full ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </Button>

              {isRecording && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center text-green-600 text-sm">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse ml-1"></div>
                    متصل...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Voice Call Option */}
          <div className="border-t pt-4">
            <Button 
              onClick={handleVoiceCall}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
            >
              <Phone className="w-5 h-5 ml-2" />
              مكالمة صوتية مباشرة
            </Button>
          </div>

          <Button 
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            إغلاق
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}