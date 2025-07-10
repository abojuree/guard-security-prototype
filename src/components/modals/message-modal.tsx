import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  guard: any;
}

export default function MessageModal({ isOpen, onClose, guard }: MessageModalProps) {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const quickMessages = [
    "يرجى التأكد من الوصول في الوقت المحدد",
    "هل يمكنك إرسال تحديث عن الوضع الحالي؟",
    "شكراً لك على الخدمة المميزة",
    "يرجى التواصل عند الوصول"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى كتابة رسالة قبل الإرسال",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم إرسال الرسالة",
      description: `تم إرسال رسالتك إلى ${guard?.name}`,
    });

    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>إرسال رسالة</DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="flex items-center mb-4">
            <img 
              src="/images/male_1751872460287.png" 
              alt={guard?.name}
              className="w-10 h-10 rounded-full object-cover ml-3"
              style={{ objectFit: 'cover' }}
            />
            <div>
              <p className="font-semibold">{guard?.name}</p>
              <p className="text-gray-600 text-sm">حارس شخصي</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              رسائل سريعة
            </label>
            <div className="space-y-2">
              {quickMessages.map((quickMsg, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-right justify-start h-auto py-2"
                  onClick={() => setMessage(quickMsg)}
                >
                  <MessageSquare className="w-4 h-4 ml-2" />
                  {quickMsg}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              أو اكتب رسالة مخصصة
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="h-24"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button 
              onClick={handleSendMessage}
              className="flex-1 bg-primary text-white"
            >
              <Send className="w-4 h-4 ml-2" />
              إرسال
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}