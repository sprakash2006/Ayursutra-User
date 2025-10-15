import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  Mail, 
  Phone,
  Sparkles,
  Heart,
  Shield,
  ArrowRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AyurSutraLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  });

  // Mock background image URL - you can replace with your actual image
  const ayurvedaLoginBg = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmailLogin = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const res = await fetch("https://ayursutra-user-backend.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await res.json();
      setIsLoading(false);
  
      if (res.ok) {
        // Save session
        sessionStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/profile";
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };
  

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-3 h-3 bg-orange-300/30 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2,
      }}
    />
  ));

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${ayurvedaLoginBg})`,
        }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-amber-800/30 to-red-900/40"></div>
      
      {/* Floating Elements */}
      {floatingElements}
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            {/* Top Floral Decoration */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6 flex justify-center"
            >
            </motion.div>
            
            {/* Logo & Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-2xl mt-20">
                <span className="bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-300 bg-clip-text text-transparent">AyurSutra</span></h1>
            </motion.div>

            {/* Sanskrit Welcome */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-8"
            >
              <p className="text-[15px] text-white">"सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः"</p>
            </motion.div>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-white/90 font-medium text-[1.2rem]">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                      <Input
                        type="email" 
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-12 h-14 bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-2xl backdrop-blur-sm focus:border-orange-400 focus:ring-orange-400 text-[1.1rem]"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-white/90 font-medium text-[1.2rem]">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-12 pr-12 h-14 bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-2xl backdrop-blur-sm focus:border-orange-400 focus:ring-orange-400 text-[1.1rem]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-300 hover:text-orange-200 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <Button
                    onClick={handleEmailLogin}
                    disabled={isLoading}
                    className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                        />
                        Signing In...
                      </div>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-3" />
                        Enter Sacred Space
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>


                {/* Additional Options */}
                <div>
                  {/* Forgot Password */}
                  <button 
                    onClick={() => alert('Password recovery coming soon!')}
                    className="w-full text-center text-orange-300 hover:text-orange-200 transition-colors font-medium text-[1rem] mt-4"
                  >
                    Forgot your sacred password?
                  </button>

                  {/* Sign Up */}
                  <div className="text-center">
                    <span className="text-white/70 text-lg">New Here? </span>
                    <button 
                      onClick={() => alert('Registration coming soon!')}
                      className="text-orange-300 hover:text-orange-200 transition-colors font-semibold text-[1rem]"
                    >
                      Begin your journey
                    </button>
                  </div>
                </div>

            
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Sanskrit Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-8"
          >
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center mt-6"
          >
            <button 
              onClick={() => window.location.href = '/'}
              className="text-orange-300 hover:text-orange-200 transition-colors font-medium text-lg underline"
            >
              ← Return to AyurSutra Home
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-8 h-8 text-orange-300" />
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 right-10 opacity-30">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-10 h-10 text-yellow-300" />
        </motion.div>
      </div>

      <div className="absolute top-1/4 right-20 opacity-20">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-6 h-6 text-red-300" />
        </motion.div>
      </div>

      <div className="absolute bottom-1/4 left-20 opacity-20">
        <motion.div
          animate={{ 
            x: [0, 10, 0],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-7 h-7 text-blue-300" />
        </motion.div>
      </div>
    </div>
  );
};

export default AyurSutraLogin;