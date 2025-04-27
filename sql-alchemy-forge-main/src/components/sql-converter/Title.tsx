import { Database, ArrowRight } from 'lucide-react';

interface TitleProps {
  isAnimated: boolean;
}

export const Title = ({ isAnimated }: TitleProps) => {
  const fadeInClass = isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4';

  return (
    <div className={`text-center mb-12 mt-8 transition-all duration-700 ease-out ${fadeInClass}`}>
      <div className="flex justify-center items-center mb-4 space-x-3">
        <Database className="h-10 w-10 text-blue-500 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
          Sybase ➔ Oracle SQL Converter
        </h1>
        <ArrowRight className="h-10 w-10 text-green-500 animate-bounce" />
      </div>
      <div className="relative">
        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
          Transform your Sybase SQL files into Oracle SQL format with ease and precision
          <span className="inline-block ml-2 animate-spin text-yellow-500">✨</span>
        </p>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-70"></div>
      </div>
    </div>
  );
};
