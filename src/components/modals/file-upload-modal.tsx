
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Image, FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FileUploadModal({ isOpen, onClose }: FileUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار ملف للرفع",
        variant: "destructive",
      });
      return;
    }

    // محاكاة رفع الملف
    toast({
      title: "تم رفع الملف بنجاح",
      description: `تم إرسال ${selectedFile.name} إلى حارس الأمن`,
    });
    
    setSelectedFile(null);
    setDescription("");
    onClose();
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return <Image className="w-8 h-8 text-blue-600" />;
    } else if (['pdf'].includes(extension || '')) {
      return <FileText className="w-8 h-8 text-red-600" />;
    } else if (['xlsx', 'xls', 'csv'].includes(extension || '')) {
      return <FileSpreadsheet className="w-8 h-8 text-green-600" />;
    }
    
    return <FileText className="w-8 h-8 text-gray-600" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>إرفاق ملف</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              اختر الملف
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm mb-2">
                اسحب الملف هنا أو انقر للاختيار
              </p>
              <Input
                type="file"
                onChange={handleFileSelect}
                accept=".jpg,.jpeg,.png,.pdf,.xlsx,.xls,.csv"
                className="hidden"
                id="file-input"
              />
              <label 
                htmlFor="file-input"
                className="cursor-pointer text-primary text-sm underline"
              >
                تصفح الملفات
              </label>
            </div>
          </div>

          {selectedFile && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center">
                {getFileIcon(selectedFile.name)}
                <div className="mr-3 flex-1">
                  <p className="font-semibold text-sm">{selectedFile.name}</p>
                  <p className="text-gray-600 text-xs">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              وصف الملف (اختياري)
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أضف وصفاً للملف..."
              className="h-20"
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
              onClick={handleUpload}
              className="flex-1 bg-primary text-white"
              disabled={!selectedFile}
            >
              إرسال
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
