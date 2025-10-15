import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Clock, 
  Users, 
  CheckCircle, 
  Calendar, 
  Leaf, 
  Heart,
  Shield,
  Award,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  BookOpen,
  Scroll,
  Sparkles,
  MessageSquare,
  Send,
  Droplets,
  Wind,
  Flame,
  Mountain,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from '@/components/Navigation';
import TherapyDetailModal from '@/components/TherapyDetailModal';

// Import all images from assets - YOUR CORRECT PATHS
import ayurvedaHeroBg from '@/assets/images/ayurveda-hero-bg.jpg';
import floralBorder from '@/assets/images/floral.png';
import webLogo from '@/assets/images/web_logo.png';
import vamanaTherapy from '@/assets/images/vamana-therapy.png';
import virechanaTherapy from '@/assets/images/virechana-therapy.png';
import bastiTherapy from '@/assets/images/basti-therapy.png';
import nasyaTherapy from '@/assets/images/nasya-therapy.png';
import raktamokshanaTherapy from '@/assets/images/raktamokshana-therapy.png';

const Index = () => {
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  // Navigate to Ancient Knowledge page
  const navigateToAncientKnowledge = () => {
    window.location.href = '/ancient-knowledge';
  };

  // Phone call handler
  const handleCallConsultation = (therapyName) => {
    const phoneNumber = '+919876543210';
    window.location.href = `tel:${phoneNumber}`;
    console.log(`📞 Call consultation requested for ${therapyName}`);
  };

  // Book now handler
  const handleBookNow = (therapy) => {
    window.location.href = '/booking';
    console.log(`📅 Book now clicked for ${therapy.name}`);
  };

  // Complete Five Panchakarma Therapies
  const therapies = [
    {
      id: 1,
      name: "Vamana",
      sanskrit: "वमन कर्म",
      image: vamanaTherapy,
      duration: "7-14 days",
      difficulty: "Intensive",
      effectiveness: 95,
      category: "Emetic Therapy",
      color: "blue",
      icon: Leaf,
      description: "प्राणायाम स्वच्छता कफदोषनाशन। Therapeutic vomiting to eliminate Kapha dosha and toxins from the upper body through systematic purification.",
      benefits: [
        "Eliminates excess Kapha dosha systematically",
        "Treats respiratory disorders like asthma",
        "Reduces obesity and metabolic disorders", 
        "Improves digestive fire (Agni)",
        "Clears mental fog and enhances clarity",
        "Treats chronic skin diseases naturally"
      ],
      process: [
        "Preparatory phase (Purvakarma) - Oil massage and steam for 3-7 days",
        "Deepana-Pachana - Digestive enhancement with herbal medicines",
        "Snehana - Internal oleation with medicated ghee",
        "Main Vamana procedure - Therapeutic vomiting under supervision",
        "Post-therapy care (Paschatkarma) - Diet progression & lifestyle guidance"
      ],
      precautions: [
        "Contraindicated during pregnancy and menstruation",
        "Avoid in severe heart conditions",
        "Not suitable in extreme weakness",
        "Children below 12 years should avoid",
        "Not recommended during acute infections"
      ],
      indications: [
        "Bronchial asthma and allergic rhinitis",
        "Chronic sinusitis and nasal polyps", 
        "Obesity and metabolic syndrome",
        "Psoriasis and chronic skin conditions",
        "Migraine and tension headaches",
        "Depression and anxiety disorders"
      ]
    },
    {
      id: 2,
      name: "Virechana",
      sanskrit: "विरेचन कर्म", 
      image: virechanaTherapy,
      duration: "7-21 days",
      difficulty: "Moderate",
      effectiveness: 92,
      category: "Purgation Therapy",
      color: "amber",
      icon: Flame,
      description: "पित्त दोष निर्हारण विशुद्धि कर्म। Therapeutic purgation to eliminate Pitta dosha and purify the liver, gallbladder, and digestive system.",
      benefits: [
        "Complete Pitta dosha elimination",
        "Liver and gallbladder detoxification", 
        "Treats inflammatory conditions naturally",
        "Improves skin radiance and complexion",
        "Regulates metabolism and digestion",
        "Balances hormonal disorders effectively"
      ],
      process: [
        "Pre-treatment Deepana-Pachana for 3-5 days",
        "Snehana with medicated ghee for 3-7 days",
        "Swedana (Steam therapy) for body preparation", 
        "Main Virechana with herbal purgatives like Trivrit",
        "Post-treatment dietary regulation and monitoring"
      ],
      precautions: [
        "Avoid during pregnancy and heavy menstruation",
        "Not suitable for severe dehydration",
        "Contraindicated in chronic diarrhea",
        "Avoid in extreme weakness or debility",
        "Not recommended during fever"
      ],
      indications: [
        "Chronic constipation and IBS",
        "Liver disorders and hepatitis",
        "Skin diseases like eczema and acne", 
        "Hyperacidity and gastritis",
        "Diabetes and metabolic disorders",
        "Chronic inflammatory conditions"
      ]
    },
    {
      id: 3,
      name: "Basti",
      sanskrit: "बस्ति कर्म",
      image: bastiTherapy,
      duration: "8-30 days", 
      difficulty: "Comprehensive",
      effectiveness: 97,
      category: "Enema Therapy",
      color: "emerald",
      icon: Droplets,
      description: "वात दोष शमन चिकित्सा। The king of Panchakarma therapies for Vata elimination through medicated enemas, treating neurological disorders.",
      benefits: [
        "Complete Vata dosha pacification",
        "Neurological disorder treatment",
        "Strengthens bones and muscle tissue",
        "Improves reproductive health naturally", 
        "Enhances immunity and vital energy",
        "Treats chronic joint disorders"
      ],
      process: [
        "Comprehensive dosha assessment and planning",
        "Preparatory Snehana and Swedana for 3-7 days",
        "Karma Basti - 16 sessions of medicated enemas",
        "Kala Basti - 30-day protocol for chronic conditions",
        "Yoga Basti - 8-day wellness and prevention protocol"
      ],
      precautions: [
        "Strictly contraindicated during pregnancy",
        "Not suitable in severe diarrhea or colitis", 
        "Avoid in rectal bleeding or fissures",
        "Should not be done during fever",
        "Not recommended in severe weakness"
      ],
      indications: [
        "Arthritis and degenerative joint disease",
        "Sciatica and chronic lower back pain",
        "Paralysis and neurological conditions",
        "Infertility and reproductive disorders",
        "Chronic constipation and gas problems", 
        "Osteoporosis and bone weakness"
      ]
    },
    {
      id: 4,
      name: "Nasya", 
      sanskrit: "नस्य कर्म",
      image: nasyaTherapy,
      duration: "7-21 days",
      difficulty: "Gentle",
      effectiveness: 89,
      category: "Nasal Therapy",
      color: "indigo",
      icon: Wind,
      description: "शिर ग्रीवा चिकित्सा प्रक्रिया। Nasal administration of medicines directly affecting the brain, head and neck region through specialized techniques.",
      benefits: [
        "Treats all disorders above the shoulders",
        "Improves brain function and memory power",
        "Relieves stress and mental anxiety",
        "Treats sinusitis and respiratory allergies", 
        "Improves voice quality and clarity",
        "Enhances all five sensory organs"
      ],
      process: [
        "Preliminary nasal passage examination",
        "Face and neck massage with medicated oils",
        "Steam inhalation to open nasal channels",
        "Administration of specific Nasya medicines",
        "Post-treatment care with warm water gargling"
      ],
      precautions: [
        "Avoid immediately after meals or water",
        "Not suitable during acute cold or fever",
        "Contraindicated in nasal polyps or tumors",
        "Should be avoided during pregnancy", 
        "Not recommended in respiratory infections"
      ],
      indications: [
        "Chronic sinusitis and nasal congestion",
        "Migraine and cluster headaches",
        "Memory loss and concentration issues",
        "Stress, anxiety and depression",
        "Hair loss and premature graying",
        "Sleep disorders and chronic insomnia"
      ]
    },
    {
      id: 5,
      name: "Raktamokshana",
      sanskrit: "रक्तमोक्षण कर्म",
      image: raktamokshanaTherapy,
      duration: "1-7 days",
      difficulty: "Specialized",
      effectiveness: 91, 
      category: "Blood Purification",
      color: "red",
      icon: Mountain,
      description: "रक्त शुद्धि चिकित्सा पद्धति। Sacred blood purification therapy using leeches, cupping and specialized techniques to eliminate blood-borne toxins.",
      benefits: [
        "Complete blood purification and detox",
        "Treats blood-related disorders naturally",
        "Reduces inflammation and swelling",
        "Improves skin health and natural glow", 
        "Treats localized infections effectively",
        "Balances blood pressure naturally"
      ],
      process: [
        "Comprehensive blood examination and assessment",
        "Selection of appropriate purification method",
        "Preparation of treatment site with antiseptics",
        "Controlled blood extraction under supervision",
        "Post-treatment wound care and dietary guidance"
      ],
      precautions: [
        "Only by qualified Ayurvedic physicians",
        "Contraindicated in anemia and blood disorders", 
        "Not suitable during pregnancy/menstruation",
        "Avoid in bleeding tendency patients",
        "Should not be done in severe weakness"
      ],
      indications: [
        "Chronic skin diseases and eczema",
        "Varicose veins and blood circulation issues",
        "Gout and inflammatory arthritis", 
        "Chronic headaches and hypertension",
        "Localized swelling and abscesses",
        "Blood-related disorders as supportive therapy"
      ]
    }
  ];

  // Modal Functions with debug logging
  const openTherapyModal = (therapy, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('🔥 Opening therapy modal for:', therapy.name);
    console.log('🔥 Modal state before:', { isModalOpen, selectedTherapy });
    setSelectedTherapy(therapy);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    console.log('🔥 Modal state after:', { isModalOpen: true, selectedTherapy: therapy });
  };

  const closeModal = () => {
    console.log('🔥 Closing modal');
    setIsModalOpen(false);
    setSelectedTherapy(null);
    document.body.style.overflow = 'unset';
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const stats = [
    { number: "5,000+", label: "Ancient Treatments", icon: Users },
    { number: "3,000+", label: "Years of Wisdom", icon: Award }, 
    { number: "98%", label: "Success Rate", icon: CheckCircle },
    { number: "25+", label: "Master Vaidyas", icon: Heart }
  ];

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "The ancient Panchakarma wisdom at AyurSutra transformed my understanding of health. The systematic approach healed my chronic digestive issues completely.",
      therapy: "Virechana",
      date: "2 months ago"
    },
    {
      name: "Rajesh Patel", 
      location: "Ahmedabad, Gujarat",
      rating: 5,
      text: "After years of arthritis pain, the sacred Basti therapy gave me a new life. The Vaidyas here truly understand the ancient science.",
      therapy: "Basti",
      date: "3 months ago"
    },
    {
      name: "Anita Desai",
      location: "Pune, Maharashtra", 
      rating: 5,
      text: "The Nasya treatment for my chronic sinusitis was remarkably effective. Ancient techniques with modern precision - truly authentic healing.",
      therapy: "Nasya",
      date: "1 month ago"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Background */}
      <section 
        className="pt-24 pb-16 px-4 relative overflow-hidden min-h-screen flex items-center"
        style={{
          backgroundImage: `url(${ayurvedaHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl mx-auto"
          >
            {/* AyurSutra Title with Floral Borders */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              {/* Top Floral Border */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-12 flex justify-center"
              >
                <img 
                  src={floralBorder}
                  alt="Floral Border" 
                  className="h-16 md:h-20 lg:h-24 max-w-4xl w-full object-contain opacity-90 drop-shadow-lg"
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                  }}
                />
              </motion.div>
              
              {/* Main Title */}
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 drop-shadow-2xl tracking-wide"
              >
                <span className="bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                  AyurSutra
                </span>
              </motion.h1>
              
              {/* Sanskrit Title with Decorative Lines */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center justify-center mb-8"
              >
                <div className="hidden md:block w-24 h-px bg-gradient-to-r from-transparent via-orange-400 to-orange-300"></div>
                <span className="text-3xl md:text-4xl lg:text-5xl text-orange-200 font-semibold font-serif mx-6 px-4">
                  आयुरसूत्र
                </span>
                <div className="hidden md:block w-24 h-px bg-gradient-to-l from-transparent via-orange-400 to-orange-300"></div>
              </motion.div>
              
              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-light mb-12 tracking-wide"
              >
                Ancient Ayurveda for Modern Wellness
              </motion.p>
              
              {/* Bottom Floral Border (Flipped) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex justify-center transform rotate-180"
              >
                <img 
                  src={floralBorder}
                  alt="Floral Border" 
                  className="h-16 md:h-20 lg:h-24 max-w-4xl w-full object-contain opacity-90 drop-shadow-lg"
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Sanskrit Shlok Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 p-12 md:p-16 mb-16 shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <Scroll className="w-10 h-10 text-orange-300 mr-4" />
                  <span className="text-orange-200 font-semibold text-2xl">Sacred Ancient Verse</span>
                </div>
                
                <div className="text-center mb-10">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.6 }}
                    className="text-4xl md:text-5xl font-serif text-white mb-8 leading-relaxed"
                  >
                    "समदोषः समाग्निश्च समधातु मलक्रियः।<br />
                    प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते॥"
                  </motion.p>
                  <div className="w-32 h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 mx-auto mb-8"></div>
                  <p className="text-xl md:text-2xl text-orange-100 leading-relaxed font-light">
                    "One who has balanced doshas, proper digestive fire, balanced tissues and waste elimination,<br />
                    with a cheerful soul, senses and mind - such a person is called healthy."
                  </p>
                  <p className="text-lg text-white/70 mt-6 italic">- Sushruta Samhita</p>
                </div>

                <div className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  This ancient verse defines perfect health through the lens of Panchakarma - the five sacred purification therapies 
                  that restore balance to doshas, ignite digestive fire, and harmonize the body's natural processes for complete wellness.
                </div>
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-5xl md:text-7xl text-white mb-12 leading-tight font-light drop-shadow-xl"
            >
              Discover the Ancient Science of
              <br />
              <span className="font-bold bg-gradient-to-r from-orange-300 via-yellow-300 to-red-300 bg-clip-text text-transparent">
                Panchakarma Engineering
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-xl md:text-2xl text-white/90 mb-16 max-w-5xl mx-auto leading-relaxed font-light drop-shadow-lg"
            >
              Unveil the systematic engineering of wellness through 3,000-year-old Ayurvedic purification science. 
              Master the precise art of detoxification, rejuvenation, and consciousness elevation through 
              time-tested Panchakarma protocols designed by ancient physician-engineers.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8"
            >
              <Button 
                onClick={() => window.location.href = '/booking'}
                size="lg" 
                className="px-16 py-8 text-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 group shadow-2xl border-0 rounded-2xl"
              >
                <BookOpen className="mr-4 w-8 h-8" />
                Explore Ancient Wisdom
                <ChevronRight className="ml-4 w-8 h-8 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={navigateToAncientKnowledge}
                className="px-16 py-8 text-2xl border-2 border-white/80 text-white bg-white/15 hover:bg-white/25 backdrop-blur-md group rounded-2xl transition-all duration-300 shadow-xl"
              >
                <Sparkles className="mr-4 w-8 h-8" />
                Learn the Science
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-100 to-yellow-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-3">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Sacred Panchakarma Therapies Section */}
      <section id="therapies" className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
              The Five Sacred <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Panchakarma</span> Sciences
            </h2>
            <div className="text-3xl text-orange-600 mb-8 font-serif">
              पञ्चकर्म चिकित्सा विज्ञान
            </div>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Five systematic purification engineering processes designed by ancient Ayurvedic masters 
              to eliminate toxins, restore balance, and activate the body's natural healing intelligence.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {therapies.map((therapy, index) => {
              const IconComponent = therapy.icon;
              return (
                <motion.div
                  key={therapy.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card 
                    className={`overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 ${
                      therapy.color === 'emerald' ? 'hover:border-emerald-300' : 
                      therapy.color === 'amber' ? 'hover:border-amber-300' :
                      therapy.color === 'blue' ? 'hover:border-blue-300' :
                      therapy.color === 'indigo' ? 'hover:border-indigo-300' :
                      'hover:border-red-300'
                    } rounded-3xl h-full flex flex-col`}
                  >
                    
                    <div className={`aspect-[4/3] relative overflow-hidden cursor-pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('🔥 Card image clicked for:', therapy.name);
                        openTherapyModal(therapy, e);
                      }}
                    >
                      <img 
                        src={therapy.image}
                        alt={therapy.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          console.error('Image failed to load:', therapy.image);
                          e.target.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        therapy.color === 'emerald' ? 'from-emerald-900/70 via-emerald-800/40 to-transparent' :
                        therapy.color === 'amber' ? 'from-amber-900/70 via-amber-800/40 to-transparent' :
                        therapy.color === 'blue' ? 'from-blue-900/70 via-blue-800/40 to-transparent' :
                        therapy.color === 'indigo' ? 'from-indigo-900/70 via-indigo-800/40 to-transparent' :
                        'from-red-900/70 via-red-800/40 to-transparent'
                      }`}></div>
                      
                      <div className="absolute top-6 left-6">
                        <div className={`w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ${
                          therapy.color === 'emerald' ? 'border-emerald-200' :
                          therapy.color === 'amber' ? 'border-amber-200' :
                          therapy.color === 'blue' ? 'border-blue-200' :
                          therapy.color === 'indigo' ? 'border-indigo-200' :
                          'border-red-200'
                        } border-2`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      <div className="absolute top-6 right-6">
                        <Badge variant="secondary" className="bg-white/90 text-gray-800 font-semibold">
                          {therapy.category}
                        </Badge>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {therapy.name}
                        </h3>
                        <p className="text-xl text-white/90 font-medium mb-3">{therapy.sanskrit}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-white font-semibold">{therapy.effectiveness}%</span>
                          </div>
                          <div className="flex items-center space-x-2 text-white/80">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">{therapy.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-8 flex-1 flex flex-col">
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed flex-1">
                        {therapy.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <Badge variant="outline" className={`${
                          therapy.color === 'emerald' ? 'border-emerald-300 text-emerald-700' :
                          therapy.color === 'amber' ? 'border-amber-300 text-amber-700' :
                          therapy.color === 'blue' ? 'border-blue-300 text-blue-700' :
                          therapy.color === 'indigo' ? 'border-indigo-300 text-indigo-700' :
                          'border-red-300 text-red-700'
                        } font-semibold`}>
                          {therapy.difficulty}
                        </Badge>
                      </div>

                      {/* Action Buttons Section */}
                      <div className="space-y-3">
                        {/* Learn Science Button */}
                        <Button 
                          variant="outline"
                          className="w-full border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group/btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('🔥 Learn Science button clicked for:', therapy.name);
                            console.log('🔥 Therapy object:', therapy);
                            openTherapyModal(therapy, e);
                          }}
                        >
                          <BookOpen className="w-4 h-4 mr-2 group-hover/btn:text-orange-600" />
                          <span className="group-hover/btn:text-orange-600">Learn the Science</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>

                        {/* Action Buttons Row */}
                        <div className="flex space-x-3">
                          {/* Call Expert Button */}
                          <Button
                            variant="outline"
                            className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCallConsultation(therapy.name);
                            }}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call Expert
                          </Button>

                          {/* Book Now Button */}
                          <Button
                            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookNow(therapy);
                            }}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <img 
                  src={webLogo}
                  alt="AyurSutra Logo"
                  className="w-16 h-16 object-contain rounded-2xl"
                />
                <div>
                  <span className="text-4xl font-bold">
                    Ayur<span className="text-orange-500">Sutra</span>
                  </span>
                  <p className="text-orange-300 text-lg">आयुरसूत्र</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
                Authentic Panchakarma science center dedicated to preserving ancient healing wisdom. 
                Experience the systematic engineering of wellness through classical Ayurvedic protocols.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-orange-500">Ancient Sciences</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-orange-400 transition-colors text-lg">About Ancient Wisdom</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors text-lg">Panchakarma Sciences</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors text-lg">Master Consultation</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors text-lg">Our Vaidyas</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-orange-500">Connect</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-orange-400" />
                  <span className="text-lg">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-orange-400" />
                  <span className="text-lg">wisdom@ayursutra.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-orange-400" />
                  <span className="text-lg">Mumbai, Maharashtra</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p className="text-lg">&copy; 2025 AyurSutra - Ancient Ayurvedic Sciences. All wisdom preserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedTherapy && (
          <TherapyDetailModal 
            therapy={selectedTherapy}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
