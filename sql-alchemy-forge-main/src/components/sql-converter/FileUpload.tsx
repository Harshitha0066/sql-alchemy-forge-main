import { Upload, FileType, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface FileUploadProps {
  files: File[];
  onFileChange: (files: File[]) => void;
  isAnimated: boolean;
}

export const FileUpload = ({ files, onFileChange, isAnimated }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onFileChange(newFiles);
      
      toast.success(`${newFiles.length} file(s) selected`, {
        description: newFiles.map(file => file.name).join(', '),
        duration: 3000,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        file => file.name.endsWith('.sql') || file.name.endsWith('.txt')
      );
      
      if (newFiles.length === 0) {
        toast.error("Please upload only .sql or .txt files");
        return;
      }
      
      onFileChange(newFiles);
      toast.success(`${newFiles.length} file(s) selected`, {
        description: newFiles.map(file => file.name).join(', '),
        duration: 3000,
      });
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFileChange(newFiles);
    toast.info("File removed");
  };

  return (
    <Card className={`p-6 border dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-500 ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FileType className="h-5 w-5 mr-2 text-indigo-500" />
        Upload Files
      </h2>
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 
          ${isDragging ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10' : 'hover:border-primary border-gray-300 dark:border-gray-600'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".sql,.txt"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          multiple
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center gap-3 group transition-all duration-300"
        >
          <div className="relative">
            <Upload className={`h-12 w-12 transition-all duration-300 ${isDragging ? 'text-purple-500 scale-110' : 'text-muted-foreground group-hover:text-blue-500'}`} />
            <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-blue-400 dark:bg-blue-600 -z-10"></div>
          </div>
          <span className="font-medium text-lg">Drop files here or click to browse</span>
          <span className="text-sm text-muted-foreground flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Supported formats: .sql, .txt
          </span>
        </label>
      </div>
      {files.length > 0 && (
        <div className="mt-4 animate-fade-in">
          <p className="text-sm text-muted-foreground flex items-center">
            <FileType className="h-4 w-4 mr-1 text-blue-500" />
            {files.length} file(s) selected
          </p>
          <div className="mt-2 max-h-[150px] overflow-auto border rounded-md p-2 bg-muted/30 dark:bg-gray-800/50">
            {files.map((file, index) => (
              <div key={index} className="py-2 px-3 mb-1 rounded-md odd:bg-muted/50 dark:odd:bg-gray-700/30 flex items-center justify-between group hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <div className="flex items-center overflow-hidden">
                  <div className="w-2 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500 mr-2"></div>
                  <span className="truncate">{file.name}</span>
                </div>
                <button 
                  onClick={() => removeFile(index)} 
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
