import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

interface ConvertButtonProps {
  isConverting: boolean;
  disabled: boolean;
  onClick: () => void;
  isAnimated: boolean;
}

export const ConvertButton = ({ isConverting, disabled, onClick, isAnimated }: ConvertButtonProps) => {
  return (
    <div className={`mt-10 text-center transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="relative inline-block group">
        {/* Primary glow effect */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 opacity-80 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
        
        {/* Secondary expanded glow */}
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-70 transition-all duration-500 -z-20 group-hover:blur-[2px]"></div>
        
        {/* Moving highlight effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden -z-10">
          <div className="absolute w-1/2 h-[500%] top-0 -left-[100%] bg-white/20 rotate-[35deg] group-hover:translate-x-[300%] transition-all duration-1000 ease-in-out"></div>
        </div>
        
        <Button 
          onClick={onClick}
          disabled={disabled}
          size="lg"
          className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-600 dark:to-indigo-800 text-white font-medium px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-102 disabled:opacity-50 disabled:pointer-events-none rounded-full border-0 ring-1 ring-white/10 group-hover:ring-white/30"
        >
          {isConverting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5 text-yellow-300 animate-pulse" />
              Convert Sybase to Oracle
            </>
          )}
        </Button>
      </div>
      {!isConverting && !disabled && (
        <p className="mt-3 text-xs text-muted-foreground opacity-80 animate-bounce">
          Ready to transform your SQL syntax
        </p>
      )}
    </div>
  );
};
