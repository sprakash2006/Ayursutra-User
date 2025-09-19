import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Navigation as NavigationIcon,
  Search,
  Filter,
  Users,
  Award,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';

const Centres = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  const centres = [
    {
      id: 1,
      name: 'AyurSutra Mumbai Centre',
      address: 'Andheri West, Mumbai, Maharashtra 400053',
      phone: '+91 98765 43210',
      email: 'mumbai@ayursutra.com',
      rating: 4.9,
      reviews: 245,
      specialties: ['Panchakarma', 'Ayurvedic Consultation', 'Herbal Medicine'],
      doctors: 8,
      established: '2010',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      name: 'AyurSutra Pune Centre',
      address: 'Koregaon Park, Pune, Maharashtra 411001',
      phone: '+91 98765 43211',
      email: 'pune@ayursutra.com',
      rating: 4.8,
      reviews: 189,
      specialties: ['Panchakarma', 'Women Health', 'Stress Management'],
      doctors: 6,
      established: '2012',
      timings: 'Mon-Sat: 9:00 AM - 6:00 PM',
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      name: 'AyurSutra Delhi Centre',
      address: 'Greater Kailash, New Delhi, Delhi 110048',
      phone: '+91 98765 43212',
      email: 'delhi@ayursutra.com',
      rating: 4.9,
      reviews: 312,
      specialties: ['Traditional Ayurveda', 'Panchakarma', 'Joint Care'],
      doctors: 10,
      established: '2008',
      timings: 'Mon-Sat: 8:00 AM - 8:00 PM',
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      name: 'AyurSutra Bangalore Centre',
      address: 'Jayanagar, Bangalore, Karnataka 560011',
      phone: '+91 98765 43213',
      email: 'bangalore@ayursutra.com',
      rating: 4.7,
      reviews: 156,
      specialties: ['Panchakarma', 'Skin Care', 'Digestive Health'],
      doctors: 7,
      established: '2015',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      image: '/api/placeholder/400/250'
    },
    {
      id: 5,
      name: 'AyurSutra Chennai Centre',
      address: 'T. Nagar, Chennai, Tamil Nadu 600017',
      phone: '+91 98765 43214',
      email: 'chennai@ayursutra.com',
      rating: 4.8,
      reviews: 203,
      specialties: ['Panchakarma', 'Respiratory Care', 'Immunity'],
      doctors: 9,
      established: '2013',
      timings: 'Mon-Sat: 9:00 AM - 6:30 PM',
      image: '/api/placeholder/400/250'
    },
    {
      id: 6,
      name: 'AyurSutra Ahmedabad Centre',
      address: 'Vastrapur, Ahmedabad, Gujarat 380015',
      phone: '+91 98765 43215',
      email: 'ahmedabad@ayursutra.com',
      rating: 4.6,
      reviews: 134,
      specialties: ['Panchakarma', 'Weight Management', 'Heart Care'],
      doctors: 5,
      established: '2016',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      image: '/api/placeholder/400/250'
    }
  ];

  const cities = ['all', 'Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Chennai', 'Ahmedabad'];

  const filteredCentres = centres.filter(centre => {
    const matchesSearch = centre.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
                         centre.name.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesCity = selectedCity === 'all' || centre.address.includes(selectedCity);
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Find <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">AyurSutra</span> Centres
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover authentic Ayurvedic healing centers near you, staffed with certified practitioners 
              and equipped with traditional treatment facilities
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by city or location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-12 px-4 border border-gray-300 rounded-md text-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">6+</div>
              <div className="text-gray-600">Centres</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">45+</div>
              <div className="text-gray-600">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">10K+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </motion.div>

          {/* Centres Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCentres.map((centre, index) => (
              <motion.div
                key={centre.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 to-yellow-100 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                        <Heart className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-800">
                        Est. {centre.established}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-gray-800 mb-2">{centre.name}</CardTitle>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{centre.rating}</span>
                          <span className="text-gray-500">({centre.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600 text-sm leading-relaxed">{centre.address}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <a href={`tel:${centre.phone}`} className="text-gray-600 hover:text-orange-600 transition-colors">
                        {centre.phone}
                      </a>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <p className="text-gray-600 text-sm">{centre.timings}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-500" />
                      <p className="text-gray-600 text-sm">{centre.doctors} Expert Doctors</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {centre.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-orange-300 text-orange-700">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="flex-1 border-orange-300 text-orange-700 hover:bg-orange-50"
                      >
                        <NavigationIcon className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                      <Button 
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        onClick={() => window.location.href = '/booking'}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredCentres.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No centres found matching your search criteria.</p>
              <Button 
                onClick={() => {
                  setSearchLocation('');
                  setSelectedCity('all');
                }}
                className="mt-4 bg-gradient-to-r from-orange-500 to-red-500"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Centres;
