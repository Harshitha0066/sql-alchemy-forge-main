import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { UserCircle2, Lock, Mail, ArrowRight, Database } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, user } = useAuth();

  // If already logged in, redirect to home page
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Logged in successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="hidden dark:block absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0tNCAwSDJ2LTRoMzB2NHptMCA0aC0ydjRoMnYtNHptLTQgMEgydjRoMzB2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>

      <div className="w-full max-w-md space-y-8 z-10">
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Database className="h-10 w-10 text-blue-500 mr-3 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Sybase to Oracle
            </h1>
          </div>
          <p className="text-muted-foreground text-lg mt-2">Access your SQL conversion toolkit</p>
        </div>

        <Card className="border border-border/40 shadow-2xl transition-all duration-300 hover:shadow-blue-500/5 backdrop-blur-sm bg-background/80">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <UserCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>Enter your credentials to continue</CardDescription>
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
                    className="pl-3 transition-all focus:border-blue-500 focus:ring-blue-500/50"
                  />
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-md opacity-0 transition-opacity duration-300" style={{ opacity: email ? 0.7 : 0 }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center text-sm font-medium">
                  <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
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
                    className="pl-3 transition-all focus:border-blue-500 focus:ring-blue-500/50"
                  />
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-md opacity-0 transition-opacity duration-300" style={{ opacity: password ? 0.7 : 0 }}></div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative w-full group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md opacity-50 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>
                <Button 
                  type="submit" 
                  className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium group-hover:shadow-lg transition-all" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Log in
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-medium hover:underline transition-colors">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
