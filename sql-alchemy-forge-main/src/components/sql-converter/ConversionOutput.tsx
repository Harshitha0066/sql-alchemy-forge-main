import { FileDown, ArrowRight, FileText, Code, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useState } from 'react';

interface ConvertedFile {
  name: string;
  content: string;
}

interface ConversionOutputProps {
  convertedFiles: ConvertedFile[];
  isAnimated: boolean;
}

export const ConversionOutput = ({ convertedFiles, isAnimated }: ConversionOutputProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<ConvertedFile | null>(null);

  const handleDownload = (file: ConvertedFile) => {
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name || 'converted_output.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("File downloaded successfully!");
  };

  const copyToClipboard = (file: ConvertedFile, index: number) => {
    navigator.clipboard.writeText(file.content);
    setCopiedIndex(index);
    toast.success("Content copied to clipboard!");
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const previewFile = (file: ConvertedFile) => {
    setSelectedFile(file);
  };

  return (
    <Card className={`p-6 border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
      <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center">
        <Code className="h-5 w-5 mr-2 text-emerald-500" />
        Converted Output
      </h2>
      
      {convertedFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground rounded-lg p-3 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg z-0"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center mb-4">
              <ArrowRight className="h-8 w-8 text-blue-500 dark:text-blue-400 animate-pulse" />
            </div>
            <p className="text-center">
              No Files Converted Yet<br/>
              <span className="text-xs opacity-70">Convert your SQL files to see results here</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {selectedFile ? (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-1 text-blue-500" />
                  {selectedFile.name}
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedFile(null)}
                  className="text-xs"
                >
                  Back to list
                </Button>
              </div>
              <div className="max-h-[300px] overflow-auto rounded-md bg-muted p-3 font-mono text-sm relative">
                <div className="absolute right-2 top-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 bg-muted-foreground/10 hover:bg-muted-foreground/20"
                    onClick={() => copyToClipboard(selectedFile, -1)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="whitespace-pre-wrap break-all">{selectedFile.content}</pre>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 animate-fade-in">
              {convertedFiles.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between border border-border rounded-lg p-3 hover:bg-muted/40 dark:hover:bg-gray-800/40 transition-colors group"
                >
                  <div 
                    className="flex items-center cursor-pointer flex-1 mr-2" 
                    onClick={() => previewFile(file)}
                  >
                    <div className="relative">
                      <FileText className="h-6 w-6 mr-2 text-blue-500 group-hover:scale-110 transition-transform" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full opacity-70 animate-pulse"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.content.length} characters • Click to preview
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(file, index)}
                      className="bg-muted/30 border-muted hover:bg-muted transition-colors"
                    >
                      {copiedIndex === index ? (
                        <Check className="mr-1 h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="mr-1 h-4 w-4" />
                      )}
                      {copiedIndex === index ? 'Copied' : 'Copy'}
                    </Button>
                    <Button 
                      onClick={() => handleDownload(file)}
                      className="bg-green-600 hover:bg-green-700 transition-colors text-white"
                      size="sm"
                    >
                      <FileDown className="mr-1 h-4 w-4" /> Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};