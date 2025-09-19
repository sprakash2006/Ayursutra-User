import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Heart,
  MapPin,
  Phone,
  Mail,
  Edit3,
  BookOpen,
  Clock,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const userId = user?.id;

  // Fetch patient details
  useEffect(() => {
    if (!userId) {
      setError("No user found. Please login.");
      setLoading(false);
      return;
    }

    const fetchPatient = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/patient/${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch patient data");

        setUserProfile({
          name: data.name || "Unknown",
          email: data.email || "",
          phone: data.contact || "",
          location: data.address || "",
          joinDate: data.joinDate || "Unknown",
          preferences: Array.isArray(data.preferences) ? data.preferences : []
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [userId]);

  // Save updated profile
  const handleSaveChanges = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/patient/updatePatient/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userProfile.name,
          email: userProfile.email,
          contact: userProfile.phone,
          address: userProfile.location,
          preferences: userProfile.preferences
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      // Ensure preferences is always an array
      setUserProfile({
        name: data.name || userProfile.name,
        email: data.email || userProfile.email,
        phone: data.contact || userProfile.phone,
        location: data.address || userProfile.location,
        joinDate: data.joinDate || userProfile.joinDate,
        preferences: Array.isArray(data.preferences) ? data.preferences : userProfile.preferences
      });

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error updating profile: " + err.message);
    }
  };

  // Hardcoded demo data
  const upcomingAppointments = [
    {
      id: 1,
      therapy: "Vamana Therapy Consultation",
      date: "2025-09-25",
      time: "10:00 AM",
      doctor: "Dr. Rajesh Vaidya",
      location: "AyurSutra Centre - Mumbai",
      status: "Confirmed"
    },
    {
      id: 2,
      therapy: "Virechana Treatment",
      date: "2025-10-02",
      time: "2:00 PM",
      doctor: "Dr. Meera Patel",
      location: "AyurSutra Centre - Pune",
      status: "Pending"
    }
  ];

  const treatmentHistory = [
    {
      id: 1,
      therapy: "Basti Therapy",
      date: "2025-08-15",
      duration: "14 days",
      doctor: "Dr. Amit Kumar",
      result: "Excellent",
      rating: 5
    },
    {
      id: 2,
      therapy: "Nasya Treatment",
      date: "2025-07-10",
      duration: "7 days",
      doctor: "Dr. Sunita Singh",
      result: "Very Good",
      rating: 4
    }
  ];

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!userProfile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Profile Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h1 className="text-3xl font-bold mb-2">{userProfile.name}</h1>
                    <p className="text-orange-100 text-lg mb-2">{userProfile.email}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <MapPin className="w-3 h-3 mr-1" />
                        {userProfile.location}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Calendar className="w-3 h-3 mr-1" />
                        Member since {userProfile.joinDate}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    className="bg-white/10 border-white/50 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Information */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-700">
                      <User className="w-5 h-5 mr-2" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <Input
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                          placeholder="Full Name"
                        />
                        <Input
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                          placeholder="Email"
                        />
                        <Input
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                          placeholder="Phone"
                        />
                        <Input
                          value={userProfile.location}
                          onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}
                          placeholder="Location"
                        />
                        <Button
                          onClick={handleSaveChanges}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        >
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{userProfile.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{userProfile.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{userProfile.location}</span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Therapy Preferences */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <Heart className="w-5 h-5 mr-2" />
                      Therapy Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(userProfile.preferences) &&
                        userProfile.preferences.map((pref, index) => (
                          <Badge key={index} variant="outline" className="border-green-300 text-green-700">
                            {pref}
                          </Badge>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Appointments */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-700">
                      <Calendar className="w-5 h-5 mr-2" />
                      Upcoming Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                            <div>
                              <h3 className="font-semibold text-lg">{appointment.therapy}</h3>
                              <p className="text-gray-600">with {appointment.doctor}</p>
                              <p className="text-sm text-gray-500">
                                <MapPin className="w-3 h-3 inline mr-1" />
                                {appointment.location}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span>
                                  {appointment.date} at {appointment.time}
                                </span>
                              </div>
                              <Badge
                                variant={appointment.status === "Confirmed" ? "default" : "outline"}
                                className={appointment.status === "Confirmed" ? "bg-green-500" : "border-yellow-500 text-yellow-700"}
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Treatment History */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-700">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Treatment History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {treatmentHistory.map((treatment) => (
                        <div key={treatment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                            <div>
                              <h3 className="font-semibold text-lg">{treatment.therapy}</h3>
                              <p className="text-gray-600">with {treatment.doctor}</p>
                              <p className="text-sm text-gray-500">Duration: {treatment.duration}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500 mb-2">{treatment.date}</p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="border-green-300 text-green-700">
                                  {treatment.result}
                                </Badge>
                                <div className="flex items-center">
                                  {[...Array(treatment.rating)].map((_, i) => (
                                    <CheckCircle key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
