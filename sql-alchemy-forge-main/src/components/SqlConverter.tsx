import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Header } from './sql-converter/Header';
import { Title } from './sql-converter/Title';
import { FileUpload } from './sql-converter/FileUpload';
import { ConversionOutput } from './sql-converter/ConversionOutput';
import { ProgressIndicator } from './sql-converter/ProgressIndicator';
import { ConvertButton } from './sql-converter/ConvertButton';
import { useTheme } from 'next-themes';

const SqlConverter = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState<{ name: string; content: string }[]>([]);
  const [isAnimated, setIsAnimated] = useState(false);
  const [progress, setProgress] = useState(0);
  const [conversionTime, setConversionTime] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Ensure hydration is complete before rendering theme-dependent UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error("Please select files to convert first");
      return;
    }
  
    setIsConverting(true);
    setConvertedFiles([]);
    setProgress(0);
    setConversionTime(0);
  
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
  
    // Start progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + Math.random() * 10 + 5, 100); // Increment progress randomly
      });
    }, 500); // Update every 500ms
  
    // Start time tracking
    const timeInterval = setInterval(() => {
      setConversionTime(prev => prev + 0.5); // Increment time every 500ms
    }, 500);
  
    try {
      const response = await fetch('http://localhost:5000/convert-multiple', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Conversion failed');
      }
  
      const result = await response.json();
      setConvertedFiles(result.files); // Assuming the backend returns an array of { name, content }
  
      toast.success("Conversion completed successfully!");
    } catch (error) {
      toast.error("Error during conversion: " + error.message);
    } finally {
      clearInterval(progressInterval);
      clearInterval(timeInterval);
      setIsConverting(false);
      setProgress(100); // Ensure progress is set to 100% at the end
    }
  };

  if (!mounted) {
    return null; // Avoid rendering until client-side hydration is complete
  }

  return (
    <div className={`min-h-screen bg-background transition-colors duration-500 text-foreground ${theme}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="hidden dark:block absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0tNCAwSDJ2LTRoMzB2NHptMCA0aC0ydjRoMnYtNHptLTQgMEgydjRoMzB2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-6xl mx-auto p-6">
        <Header />
        <Title isAnimated={isAnimated} />
        
        <div className="grid md:grid-cols-2 gap-6">
          <FileUpload 
            files={files}
            onFileChange={setFiles}
            isAnimated={isAnimated}
          />
          <ConversionOutput 
            convertedFiles={convertedFiles}
            isAnimated={isAnimated} 
          />
        </div>

        <ProgressIndicator 
          isConverting={isConverting} 
          progress={progress} 
          conversionTime={conversionTime} 
        />

        <ConvertButton 
          isConverting={isConverting}
          disabled={isConverting || files.length === 0}
          onClick={handleConvert}
          isAnimated={isAnimated}
        />
        
        <div className="text-center mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-muted-foreground">
            Sybase to Oracle SQL Converter • Transform your database scripts with advanced precision
          </p>
        </div>
      </div>
    </div>
  );
};

export default SqlConverter;