
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Plus, Clock, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";


interface RatingEntry {
  id: number;
  timestamp: string;
  note: string;
  rating?: number;
  type: "positive" | "negative" | "neutral";
}

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  guard: any;
}

export default function RatingModal({ isOpen, onClose, guard }: RatingModalProps) {
  const [finalRating, setFinalRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState<"positive" | "negative" | "neutral">("neutral");
  const [showAddNote, setShowAddNote] = useState(false);
  const { toast } = useToast();

  // ملاحظات تجريبية
  const [ratingEntries, setRatingEntries] = useState<RatingEntry[]>([
    {
      id: 1,
      timestamp: "2025-01-06 10:30",
      note: "وصل في الوقت المحدد وبدأ العمل فوراً",
      type: "positive"
    },
    {
      id: 2,
      timestamp: "2025-01-06 14:15",
      note: "كان يقظاً ومتنبهاً خلال فترة الغداء",
      type: "positive"
    },
    {
      id: 3,
      timestamp: "2025-01-06 16:45",
      note: "تعامل بمهنية مع زائر مشكوك فيه",
      type: "positive"
    }
  ]);

  const ratingLabels = {
    1: "ضعيف",
    2: "مقبول", 
    3: "جيد",
    4: "ممتاز",
    5: "رائع"
  };

  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى كتابة الملاحظة قبل الإضافة",
        variant: "destructive",
      });
      return;
    }

    const newEntry: RatingEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString('ar-SA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      note: newNote,
      type: noteType
    };

    setRatingEntries([...ratingEntries, newEntry]);
    setNewNote("");
    setShowAddNote(false);
    
    toast({
      title: "تمت إضافة الملاحظة",
      description: "تم حفظ ملاحظتك بنجاح",
    });
  };

  const handleDeleteNote = (id: number) => {
    setRatingEntries(ratingEntries.filter(entry => entry.id !== id));
    toast({
      title: "تم حذف الملاحظة",
      description: "تم حذف الملاحظة بنجاح",
    });
  };

  const handleSubmitFinalRating = () => {
    if (finalRating === 0) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار تقييم نهائي قبل الإرسال",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تم إرسال التقييم النهائي",
      description: `شكراً لك على تقييم ${guard?.name}`,
    });
    
    onClose();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "positive":
        return "border-green-200 bg-green-50";
      case "negative":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>سجل التقييم</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 space-y-4">
          <div className="text-center">
            <img 
              src="/images/male_1751872460287.png" 
              alt={guard?.name}
              className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-gray-200"
              style={{ objectFit: 'cover' }}
            />
            <h4 className="font-bold">{guard?.name}</h4>
            <p className="text-gray-600 text-sm">سجل الملاحظات والتقييم</p>
          </div>

          {/* إضافة ملاحظة جديدة */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-semibold">ملاحظات الأداء</h5>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddNote(!showAddNote)}
              >
                <Plus className="w-4 h-4 ml-1" />
                إضافة ملاحظة
              </Button>
            </div>

            {showAddNote && (
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button
                        variant={noteType === "positive" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNoteType("positive")}
                        className={noteType === "positive" ? "bg-green-600" : ""}
                      >
                        إيجابي
                      </Button>
                      <Button
                        variant={noteType === "negative" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNoteType("negative")}
                        className={noteType === "negative" ? "bg-red-600" : ""}
                      >
                        سلبي
                      </Button>
                      <Button
                        variant={noteType === "neutral" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNoteType("neutral")}
                      >
                        عام
                      </Button>
                    </div>
                    
                    <Textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="اكتب ملاحظتك حول أداء حارس الأمن..."
                      className="h-20"
                    />
                    
                    <div className="flex gap-2">
                      <Button onClick={handleAddNote} size="sm" className="flex-1">
                        حفظ الملاحظة
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowAddNote(false)}
                      >
                        إلغاء
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* عرض الملاحظات المحفوظة */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {ratingEntries.map((entry) => (
              <Card key={entry.id} className={`${getTypeColor(entry.type)} border`}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Clock className={`w-4 h-4 ml-2 ${getTypeIcon(entry.type)}`} />
                      <span className="text-xs text-gray-600">{entry.timestamp}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(entry.id)}
                      className="h-6 w-6 p-0 hover:bg-red-100"
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </Button>
                  </div>
                  <p className="text-sm">{entry.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* التقييم النهائي */}
          <div className="border-t pt-4">
            <h5 className="font-semibold mb-3">التقييم النهائي</h5>
            <div className="text-center">
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFinalRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || finalRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {(hoveredRating || finalRating) > 0 && (
                <p className="text-sm text-gray-600">
                  {ratingLabels[hoveredRating || finalRating as keyof typeof ratingLabels]}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              إغلاق
            </Button>
            <Button 
              onClick={handleSubmitFinalRating}
              className="flex-1 bg-primary text-white flex flex-col justify-center"
              disabled={finalRating === 0}
            >
              <span className="text-sm leading-none">إرسال التقييم</span>
              <span className="text-xs opacity-70 leading-none"> عند اكتمال المهمة فقط</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
