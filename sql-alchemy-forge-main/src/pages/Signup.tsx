import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { UserPlus, Lock, Mail, ArrowRight, Database, KeyRound, CheckCircle2 } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp, user } = useAuth();

  // If already logged in, redirect to home page
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await signUp(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Please check your email to confirm your registration.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during signup");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-300 dark:bg-green-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="hidden dark:block absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0tNCAwSDJ2LTRoMzB2NHptMCA0aC0ydjRoMnYtNHptLTQgMEgydjRoMzB2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>

      <div className="w-full max-w-md space-y-8 z-10">
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Database className="h-10 w-10 text-indigo-500 mr-3 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Sybase to Oracle
            </h1>
          </div>
          <p className="text-muted-foreground text-lg mt-2">Create your account to get started</p>
        </div>

        <Card className="border border-border/40 shadow-2xl transition-all duration-300 hover:shadow-indigo-500/5 backdrop-blur-sm bg-background/80">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <UserPlus className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>Sign up to unlock SQL conversion tools</CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center text-sm font-medium">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-3 transition-all focus:border-indigo-500 focus:ring-indigo-500/50"
                  />
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-l-md opacity-0 transition-opacity duration-300" style={{ opacity: email ? 0.7 : 0 }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center text-sm font-medium">
                  <KeyRound className="h-4 w-4 mr-2 text-muted-foreground" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-3 transition-all focus:border-indigo-500 focus:ring-indigo-500/50"
                  />
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-l-md opacity-0 transition-opacity duration-300" style={{ opacity: password ? 0.7 : 0 }}></div>
                </div>
                {password && (
                  <div className="text-xs flex items-center mt-1 text-muted-foreground">
                    <div className={`w-2 h-2 rounded-full mr-1 ${password.length >= 6 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    Must be at least 6 characters
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center text-sm font-medium">
                  <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-3 transition-all focus:border-indigo-500 focus:ring-indigo-500/50"
                  />
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-l-md opacity-0 transition-opacity duration-300" style={{ opacity: confirmPassword ? 0.7 : 0 }}></div>
                  
                  {password && confirmPassword && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {password === confirmPassword ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 text-red-500 flex items-center justify-center text-xs">✗</div>
                      )}
                    </div>
                  )}
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative w-full group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-md opacity-50 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>
                <Button 
                  type="submit" 
                  className="relative w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium group-hover:shadow-lg transition-all" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Create account
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-500 hover:text-indigo-700 font-medium hover:underline transition-colors">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
