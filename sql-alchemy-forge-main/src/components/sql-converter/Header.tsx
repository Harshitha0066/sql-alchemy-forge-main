import { LogOut, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const Header = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    toast.success("Signed out successfully");
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center mr-4">
          
    
        </div>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-amber-500 opacity-0 group-hover:opacity-100 rounded-md blur-sm group-hover:blur-md transition duration-300"></div>
          <Button 
            variant="outline" 
            size="sm"
            className="relative text-muted-foreground hover:text-foreground transition-colors rounded-md border-red-200 dark:border-red-900/30 group-hover:border-transparent bg-background"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2 group-hover:text-red-500 transition-colors" /> 
            <span className="group-hover:text-red-500 transition-colors">Sign out</span>
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <ThemeToggle />
      </div>
    </header>
  );
};
