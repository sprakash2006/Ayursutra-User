import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [therapies, setTherapies] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  useEffect(() => {
    const fetchTherapies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/addBookings/getTherapy");
        if (!response.ok) throw new Error("Failed to fetch therapies");
        const data = await response.json();
        setTherapies(data);
      } catch (error) {
        console.error("Error fetching therapies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTherapies();
  }, []);

  useEffect(() => {
    const fetchTherapies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/addBookings/getDoctors");
        if (!response.ok) throw new Error("Failed to fetch therapies");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching Doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTherapies();
  }, []);




  // Booking.js
const handleSubmit = async () => {
  const patientData = JSON.parse(sessionStorage.getItem('user'));
  if (!patientData) return alert("Please login first!");

  // Convert selectedTime to HH:MM:SS
  const [hourPart, minutePart, period] = selectedTime.split(/[: ]/);
  let hours = parseInt(hourPart);
  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  const formattedTime = `${hours.toString().padStart(2,'0')}:${minutePart}:00`;

  const response = await fetch('http://localhost:5000/api/addBookings/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patient_id: patientData.id,
      therapy_id: selectedTherapy.id,
      Doctor_id: selectedDoctor.id,
      date: selectedDate,
      time: formattedTime
    })
  });

  const data = await response.json();
  if (response.ok) {
    alert("Booking confirmed!");
    navigate("/profile");
  }
  else alert("Failed: " + data.error);
};




  if (loading) {
    return <div className="text-center pt-24">Loading therapies...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Book Your <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Panchakarma</span> Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Begin your path to wellness with authentic Ayurvedic treatments from certified practitioners
            </p>
          </motion.div>

          {/* STEP INDICATOR */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <ArrowRight className={`w-5 h-5 mx-2 ${
                      currentStep > step ? 'text-orange-500' : 'text-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: THERAPY SELECTION */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Choose Your Therapy</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapies.map((therapy) => (
                  <Card 
                    key={therapy.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedTherapy?.id === therapy.id ? 'ring-2 ring-orange-500 shadow-lg' : ''
                    }`}
                    onClick={() => setSelectedTherapy(therapy)}
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl text-orange-700">{therapy.name}</CardTitle>
                      <p className="text-orange-600 font-medium">{therapy.sanskrit}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{therapy.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Duration:</span>
                          <Badge variant="outline">{therapy.duration}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Investment:</span>
                          <span className="font-semibold text-green-600">{therapy.cost}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">Key Benefits:</p>
                        {therapy.benefits?.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-sm text-gray-600">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button 
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedTherapy}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  Continue to Doctor Selection
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DOCTOR SELECTION */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Select Your Doctor</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doc) => (
                  <Card 
                    key={doc.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedDoctor?.id === doc.id ? 'ring-2 ring-orange-500 shadow-lg' : ''
                    }`}
                    onClick={() => setSelectedDoctor(doc)}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl text-orange-700">{doc.name}</CardTitle>
                      <p className="text-orange-600">{doc.specialization}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-2">{doc.experience} experience</p>
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-semibold">{doc.rating}</span>
                      </div>
                      <p className="text-sm text-gray-500">Location: {doc.location}</p>
                      <p className="text-sm text-gray-500">Languages: {doc.languages.join(', ')}</p>
                      <p className="text-sm text-gray-700 mt-2 font-semibold">Consultation Fees: {doc.fees}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8 flex justify-center space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep(3)}
                  disabled={!selectedDoctor}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  Continue to Schedule
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: DATE & TIME SELECTION */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Choose Date & Time</h2>
              <div className="flex flex-col items-center space-y-6">
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border rounded-lg px-4 py-2"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={selectedTime === time ? "bg-orange-500 text-white" : ""}
                      onClick={() => setSelectedTime(time)}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="text-center mt-8 flex justify-center space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  Review & Confirm
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONFIRMATION */}
          {currentStep === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Confirm Your Booking</h2>
              <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4">
                <p className="text-lg"><strong>Therapy:</strong> {selectedTherapy?.name}</p>
                <p className="text-lg"><strong>Doctor:</strong> {selectedDoctor?.name}</p>
                <p className="text-lg"><strong>Date:</strong> {selectedDate}</p>
                <p className="text-lg"><strong>Time:</strong> {selectedTime}</p>
              </div>
              <div className="mt-8 flex justify-center space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(3)}
                >
                  Back
                </Button>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  onClick={() => handleSubmit()}
                >
                  Confirm Booking
                  <CheckCircle className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
