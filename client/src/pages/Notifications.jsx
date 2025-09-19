import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Calendar, 
  Heart, 
  User, 
  Clock, 
  CheckCircle, 
  X,
  Filter,
  Settings,
  AlertCircle,
  Info,
  Gift,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from '@/components/Navigation';

const Notifications = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Appointment Reminder',
      message: 'Your Vamana therapy consultation with Dr. Rajesh Vaidya is scheduled for tomorrow at 10:00 AM.',
      time: '2 hours ago',
      read: false,
      priority: 'high',
      icon: Calendar,
      color: 'blue'
    },
    {
      id: 2,
      type: 'treatment',
      title: 'Treatment Progress Update',
      message: 'Day 5 of your Basti therapy is complete. Your progress report is ready for review.',
      time: '4 hours ago',
      read: false,
      priority: 'medium',
      icon: Heart,
      color: 'green'
    },
    {
      id: 3,
      type: 'system',
      title: 'Profile Update Required',
      message: 'Please update your emergency contact information in your profile settings.',
      time: '1 day ago',
      read: true,
      priority: 'medium',
      icon: User,
      color: 'orange'
    },
    {
      id: 4,
      type: 'promotion',
      title: 'Special Offer: 20% Off Panchakarma Package',
      message: 'Limited time offer on our complete Panchakarma wellness package. Book before September 30th.',
      time: '2 days ago',
      read: false,
      priority: 'low',
      icon: Gift,
      color: 'purple'
    },
    {
      id: 5,
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Your Virechana therapy session with Dr. Meera Patel has been confirmed for October 2nd.',
      time: '3 days ago',
      read: true,
      priority: 'high',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 6,
      type: 'system',
      title: 'Treatment Feedback Request',
      message: 'How was your recent Nasya therapy experience? Share your feedback to help us improve.',
      time: '5 days ago',
      read: true,
      priority: 'low',
      icon: Star,
      color: 'yellow'
    },
    {
      id: 7,
      type: 'alert',
      title: 'Pre-treatment Guidelines',
      message: 'Important dietary restrictions to follow 3 days before your Panchakarma treatment begins.',
      time: '1 week ago',
      read: false,
      priority: 'high',
      icon: AlertCircle,
      color: 'red'
    },
    {
      id: 8,
      type: 'info',
      title: 'New Ayurvedic Article Published',
      message: 'Read our latest article: "Understanding the Science Behind Panchakarma Detoxification"',
      time: '1 week ago',
      read: true,
      priority: 'low',
      icon: Info,
      color: 'blue'
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications.length },
    { value: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { value: 'appointment', label: 'Appointments', count: notifications.filter(n => n.type === 'appointment').length },
    { value: 'treatment', label: 'Treatment', count: notifications.filter(n => n.type === 'treatment').length },
    { value: 'high', label: 'High Priority', count: notifications.filter(n => n.priority === 'high').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    switch (selectedFilter) {
      case 'unread':
        return !notification.read;
      case 'appointment':
        return notification.type === 'appointment';
      case 'treatment':
        return notification.type === 'treatment';
      case 'high':
        return notification.priority === 'high';
      default:
        return true;
    }
  });

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-300';
      case 'medium': return 'bg-yellow-100 border-yellow-300';
      case 'low': return 'bg-green-100 border-green-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const getIconColor = (color, read) => {
    const baseColors = {
      blue: read ? 'text-blue-400' : 'text-blue-600',
      green: read ? 'text-green-400' : 'text-green-600',
      orange: read ? 'text-orange-400' : 'text-orange-600',
      purple: read ? 'text-purple-400' : 'text-purple-600',
      yellow: read ? 'text-yellow-400' : 'text-yellow-600',
      red: read ? 'text-red-400' : 'text-red-600'
    };
    return baseColors[color] || 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <Bell className="w-10 h-10 mr-4 text-orange-600" />
              Notifications
            </h1>
            <p className="text-lg text-gray-600">
              Stay updated with your appointments, treatments, and important announcements
            </p>
          </motion.div>

          {/* Notification Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <CardTitle className="text-xl text-gray-800">Manage Notifications</CardTitle>
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={markAllAsRead}
                      variant="outline"
                      size="sm"
                      className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark All Read
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => (
                    <Button
                      key={filter.value}
                      onClick={() => setSelectedFilter(filter.value)}
                      variant={selectedFilter === filter.value ? "default" : "outline"}
                      size="sm"
                      className={selectedFilter === filter.value ? 
                        'bg-gradient-to-r from-orange-500 to-red-500' : 
                        'hover:bg-orange-50'
                      }
                    >
                      {filter.label}
                      {filter.count > 0 && (
                        <Badge 
                          variant="secondary" 
                          className="ml-2 px-2 py-0 text-xs"
                        >
                          {filter.count}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredNotifications.map((notification, index) => {
                const IconComponent = notification.icon;
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card 
                      className={`transition-all duration-300 hover:shadow-md ${
                        !notification.read 
                          ? 'ring-2 ring-orange-200 bg-white' 
                          : 'bg-gray-50'
                      } ${getPriorityColor(notification.priority)}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Icon */}
                          <div className={`p-3 rounded-full ${
                            !notification.read ? 'bg-white shadow-sm' : 'bg-gray-200'
                          }`}>
                            <IconComponent 
                              className={`w-6 h-6 ${getIconColor(notification.color, notification.read)}`} 
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className={`text-lg font-semibold ${
                                  !notification.read ? 'text-gray-900' : 'text-gray-600'
                                } mb-1`}>
                                  {notification.title}
                                  {!notification.read && (
                                    <div className="inline-block w-2 h-2 bg-orange-500 rounded-full ml-2"></div>
                                  )}
                                </h3>
                                <p className={`${
                                  !notification.read ? 'text-gray-700' : 'text-gray-500'
                                } leading-relaxed mb-3`}>
                                  {notification.message}
                                </p>
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <Clock className="w-4 h-4" />
                                    <span>{notification.time}</span>
                                  </div>
                                  <Badge 
                                    variant="outline"
                                    className={`text-xs ${
                                      notification.priority === 'high' ? 'border-red-300 text-red-700' :
                                      notification.priority === 'medium' ? 'border-yellow-300 text-yellow-700' :
                                      'border-green-300 text-green-700'
                                    }`}
                                  >
                                    {notification.priority} priority
                                  </Badge>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center space-x-2 ml-4">
                                {!notification.read && (
                                  <Button
                                    onClick={() => markAsRead(notification.id)}
                                    variant="outline"
                                    size="sm"
                                    className="border-green-300 text-green-700 hover:bg-green-50"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Mark Read
                                  </Button>
                                )}
                                <Button
                                  onClick={() => deleteNotification(notification.id)}
                                  variant="outline"
                                  size="sm"
                                  className="border-red-300 text-red-700 hover:bg-red-50"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No notifications found
              </h3>
              <p className="text-gray-500 mb-6">
                {selectedFilter === 'all' 
                  ? "You're all caught up! No new notifications."
                  : `No ${selectedFilter} notifications at this time.`
                }
              </p>
              <Button 
                onClick={() => setSelectedFilter('all')}
                className="bg-gradient-to-r from-orange-500 to-red-500"
              >
                View All Notifications
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
