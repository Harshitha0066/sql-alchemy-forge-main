import { Progress } from '@/components/ui/progress';
import { Gauge, Database, Cpu } from 'lucide-react';

interface ProgressIndicatorProps {
  isConverting: boolean;
  progress: number;
  conversionTime: number;
}

export const ProgressIndicator = ({ isConverting, progress, conversionTime }: ProgressIndicatorProps) => {
  if (!isConverting) return null;

  return (
    <div className="mt-8 animate-fade-in px-2 py-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl shadow-inner">
      <div className="flex flex-col md:flex-row justify-between items-center mb-3">
        <div className="flex items-center">
          <div className="relative mr-3">
            <Cpu className="h-5 w-5 text-indigo-500 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full opacity-70 animate-ping"></div>
          </div>
          <span className="text-sm font-medium text-foreground bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Converting SQL Syntax
          </span>
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <span className="flex items-center text-sm text-muted-foreground font-mono px-2 py-1 rounded bg-muted/40 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700">
            <Gauge className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
            {progress.toFixed(0)}%
          </span>
          <span className="flex items-center text-sm text-muted-foreground font-mono px-2 py-1 rounded bg-muted/40 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700">
            <Database className="h-3.5 w-3.5 mr-1.5 text-emerald-500" />
            {conversionTime.toFixed(1)}s
          </span>
        </div>
      </div>
      
      <div className="relative">
        <Progress 
          value={progress} 
          className="h-3 bg-gray-100 dark:bg-gray-800 transition-all duration-300 overflow-hidden"
        />
        <div 
          className="h-1 absolute bottom-0 left-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-sm" 
          style={{ width: `${progress}%`, opacity: 0.7 }}
        ></div>
      </div>
      
      <div className="w-full h-8 relative mt-2 overflow-hidden">
        <div className="absolute inset-0 flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className="h-full flex-1 bg-blue-500/5 dark:bg-blue-500/10"
              style={{ 
                opacity: i / 10 + 0.05,
                transform: `scaleY(${i % 2 ? 0.7 : 1})`,
                animationDelay: `${i * 0.1}s`
              }}
            >
            </div>
          ))}
        </div>
        <div 
          className="absolute bottom-0 left-0 h-full bg-gradient-to-r from-blue-500/20 to-purple-500/30 backdrop-blur-sm transition-all duration-300"
          style={{ width: `${progress}%` }}
        >
          <div className="w-full h-full flex justify-end items-center">
            <div className="h-3 w-3 rounded-full bg-blue-500 mr-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
