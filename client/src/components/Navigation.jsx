import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Calendar, 
  Phone, 
  BookOpen, 
  MapPin,
  Bell,
  Home,
  Leaf,
  Flower,
  TreePine,
  User,
  Settings,
  LogOut,
  UserPlus,
  LogIn,
  ChevronDown,
  Heart,
  Star,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// FIXED: Import with correct path
import webLogo from '/src/assets/images/web_logo.jpg';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(user);

  

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Panchakarma', href: '/#therapies', icon: BookOpen },
    { name: 'Find Nearest Centre', href: '/centres', icon: MapPin },
    { name: 'Ancient Knowledge Hub', href: '/ancient-knowledge', icon: BookOpen }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-200/50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center"
          >
            {/* Rectangle Logo Container */}
            <div className="relative group mb-2">
              <div className="w-40 h-14 backdrop-blur-sm overflow-hidden">
                <img 
                  src={webLogo}
                  alt="AyurSutra Logo"
                  className="w-full h-full object-contain rounded-lg"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(251, 146, 60, 0.3))'
                  }}
                  onError={(e) => {
                    console.error('Logo failed to load');
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
            
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors font-medium group relative"
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{item.name}</span>
                {/* FIXED: Proper badge alignment */}
                {item.showBadge && item.badgeCount > 0 && (
                  <div className="absolute -top-2 -right-3 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5">
                    {item.badgeCount}
                  </div>
                )}
              </motion.a>
            ))}
          </div>

          {/* Right Section - Auth Buttons + Profile */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isLoggedIn ? (
              /* NOT LOGGED IN STATE */
              <>
                {/* Profile Icon - ALWAYS VISIBLE */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative group"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-orange-100 rounded-full border-2 border-orange-200/50 hover:border-orange-400/50 transition-all duration-200"
                    onClick={() => window.location.href = '/profile'}
                  >
                    <User className="w-5 h-5 text-orange-600" />
                  </Button>
                  
                  {/* Hover Tooltip */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    My Profile
                  </div>
                </motion.div>

                {/* Login Button */}
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 border border-orange-200/50 hover:border-orange-400/50 transition-all duration-200"
                  onClick={() => window.location.href = '/login'}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>

                {/* Register Button */}
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={() => window.location.href = '/register'}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Button>
              </>
            ) : (
              /* LOGGED IN STATE */
              <>
                {/* Book Now Button */}
                <Button 
                  onClick={() => window.location.href = '/booking'}
                  variant="outline" 
                  className="border-orange-300 text-orange-700 hover:bg-orange-50 transition-all duration-200 mr-4"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
                
                {/* Profile Dropdown with FIXED notification badge */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-12 w-12 rounded-full border-2 border-orange-200 hover:border-orange-400 transition-all duration-200">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt="Profile" />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-400 text-white font-bold">
                          U
                        </AvatarFallback>
                      </Avatar>
                      {/* FIXED: Notification Dot - properly positioned */}
                      <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-xs text-white font-bold leading-none">3</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 mt-2" align="end">
                    <DropdownMenuLabel className="font-semibold text-orange-700 pb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-400 text-white text-sm">
                            U
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Welcome User</p>
                          <p className="text-sm text-gray-500 font-normal">Wellness Journey</p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem 
                      onClick={() => window.location.href = '/profile'}
                      className="cursor-pointer hover:bg-orange-50 py-3"
                    >
                      <User className="mr-3 h-4 w-4" />
                      <div>
                        <p className="font-medium">My Profile</p>
                        <p className="text-xs text-gray-500">Manage account settings</p>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => window.location.href = '/notifications'}
                      className="cursor-pointer hover:bg-orange-50 py-3"
                    >
                      <Bell className="mr-3 h-4 w-4" />
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <p className="font-medium">Notifications</p>
                          <p className="text-xs text-gray-500">Latest updates</p>
                        </div>
                        {/* FIXED: Properly aligned badge */}
                        <div className="min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5">
                          3
                        </div>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => window.location.href = '/booking'}
                      className="cursor-pointer hover:bg-orange-50 py-3"
                    >
                      <Calendar className="mr-3 h-4 w-4" />
                      <div>
                        <p className="font-medium">My Bookings</p>
                        <p className="text-xs text-gray-500">Appointments & treatments</p>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => window.location.href = '/ancient-knowledge'}
                      className="cursor-pointer hover:bg-orange-50 py-3"
                    >
                      <BookOpen className="mr-3 h-4 w-4" />
                      <div>
                        <p className="font-medium">Knowledge Hub</p>
                        <p className="text-xs text-gray-500">Ancient wisdom</p>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem className="cursor-pointer hover:bg-orange-50 py-3">
                      <Settings className="mr-3 h-4 w-4" />
                      <div>
                        <p className="font-medium">Settings</p>
                        <p className="text-xs text-gray-500">Preferences & privacy</p>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem 
                      onClick={() => setIsLoggedIn(false)}
                      className="cursor-pointer hover:bg-red-50 text-red-600 py-3"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <div>
                        <p className="font-medium">Log out</p>
                        <p className="text-xs text-red-400">Sign out safely</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors border border-orange-200/50 hover:border-orange-400/50"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden py-6 border-t border-orange-200"
          >
            <div className="flex flex-col space-y-4">
              {/* Mobile Profile Section */}
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200/50">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {isLoggedIn ? 'Welcome Back!' : 'Welcome to AyurSutra'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isLoggedIn ? 'Manage your wellness journey' : 'Begin your wellness journey'}
                  </p>
                </div>
                {isLoggedIn && (
                  <div className="min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5">
                    3
                  </div>
                )}
              </div>

              {/* Navigation Items */}
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between text-gray-700 hover:text-orange-600 transition-colors font-medium py-3 px-4 rounded-lg hover:bg-orange-50 border border-transparent hover:border-orange-200/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {item.showBadge && item.badgeCount > 0 && (
                    <div className="min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5">
                      {item.badgeCount}
                    </div>
                  )}
                </motion.a>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3 pt-6 border-t border-orange-200">
                {!isLoggedIn ? (
                  <>
                    <Button 
                      onClick={() => window.location.href = '/login'}
                      variant="outline" 
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 justify-start"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login to Your Account
                    </Button>
                    <Button 
                      onClick={() => window.location.href = '/register'}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 justify-start"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create New Account
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={() => window.location.href = '/booking'}
                      variant="outline" 
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 justify-start"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => window.location.href = '/profile'}
                      className="justify-start hover:bg-orange-50"
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => setIsLoggedIn(false)}
                      className="justify-start text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Quick Actions */}
              <div className="pt-4 border-t border-orange-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Quick Actions</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="justify-start text-sm"
                    onClick={() => window.location.href = '/centres'}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Find Centres
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="justify-start text-sm"
                    onClick={() => window.location.href = 'tel:+919876543210'}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
