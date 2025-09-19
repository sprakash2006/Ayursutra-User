import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Scroll, 
  Leaf, 
  Star, 
  Clock, 
  User, 
  Search,
  Filter,
  ArrowRight,
  Heart,
  Brain,
  Shield,
  Flower,
  Mountain,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from '@/components/Navigation';

// Import assets
import ayurvedaHeroBg from '@/assets/images/ayurveda-hero-bg.jpg';
import floralBorder from '@/assets/images/floral.png';

const AncientKnowledge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const knowledgeArticles = [
    {
      id: 1,
      title: 'The Science Behind Panchakarma Detoxification',
      sanskrit: 'पञ्चकर्म विज्ञान',
      category: 'panchakarma',
      author: 'Dr. Rajesh Vaidya',
      readTime: '12 min read',
      publishDate: '2025-09-15',
      excerpt: 'Explore the profound scientific principles underlying the five sacred purification therapies and their systematic approach to cellular detoxification.',
      tags: ['Detox', 'Science', 'Traditional Medicine'],
      difficulty: 'Intermediate',
      icon: Leaf,
      color: 'green',
      featured: true
    },
    {
      id: 2,
      title: 'Understanding Doshas: The Foundation of Ayurvedic Medicine',
      sanskrit: 'त्रिदोष सिद्धांत',
      category: 'fundamentals',
      author: 'Dr. Meera Patel',
      readTime: '8 min read',
      publishDate: '2025-09-12',
      excerpt: 'Discover how Vata, Pitta, and Kapha doshas govern all physiological and psychological functions in the human body.',
      tags: ['Doshas', 'Vata', 'Pitta', 'Kapha'],
      difficulty: 'Beginner',
      icon: Heart,
      color: 'red',
      featured: true
    },
    {
      id: 3,
      title: 'Ancient Pulse Diagnosis Techniques',
      sanskrit: 'नाड़ी परीक्षा',
      category: 'diagnosis',
      author: 'Dr. Amit Kumar',
      readTime: '15 min read',
      publishDate: '2025-09-10',
      excerpt: 'Master the art of Nadi Pariksha - the sophisticated pulse diagnosis technique that reveals deep insights about health.',
      tags: ['Diagnosis', 'Pulse', 'Traditional Skills'],
      difficulty: 'Advanced',
      icon: Brain,
      color: 'blue',
      featured: false
    },
    {
      id: 4,
      title: 'Herbal Medicine Preparation Methods',
      sanskrit: 'औषध निर्माण',
      category: 'herbs',
      author: 'Dr. Sunita Singh',
      readTime: '10 min read',
      publishDate: '2025-09-08',
      excerpt: 'Learn traditional methods of preparing Ayurvedic medicines, from simple decoctions to complex compound formulations.',
      tags: ['Herbs', 'Medicine', 'Preparation'],
      difficulty: 'Intermediate',
      icon: Flower,
      color: 'purple',
      featured: false
    },
    {
      id: 5,
      title: 'Seasonal Living According to Ayurveda',
      sanskrit: 'ऋतुचर्या',
      category: 'lifestyle',
      author: 'Dr. Priya Sharma',
      readTime: '6 min read',
      publishDate: '2025-09-05',
      excerpt: 'Align your daily routine with natural cycles through Ritucharya - the ancient practice of seasonal living.',
      tags: ['Seasons', 'Lifestyle', 'Routine'],
      difficulty: 'Beginner',
      icon: Sun,
      color: 'yellow',
      featured: false
    },
    {
      id: 6,
      title: 'Meditation and Mind-Body Connection',
      sanskrit: 'ध्यान योग',
      category: 'wellness',
      author: 'Dr. Krishna Murthy',
      readTime: '9 min read',
      publishDate: '2025-09-03',
      excerpt: 'Explore how ancient meditation practices strengthen the connection between consciousness and physical health.',
      tags: ['Meditation', 'Mind-Body', 'Consciousness'],
      difficulty: 'Intermediate',
      icon: Mountain,
      color: 'indigo',
      featured: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Topics', count: knowledgeArticles.length },
    { value: 'panchakarma', label: 'Panchakarma', count: knowledgeArticles.filter(a => a.category === 'panchakarma').length },
    { value: 'fundamentals', label: 'Fundamentals', count: knowledgeArticles.filter(a => a.category === 'fundamentals').length },
    { value: 'diagnosis', label: 'Diagnosis', count: knowledgeArticles.filter(a => a.category === 'diagnosis').length },
    { value: 'herbs', label: 'Herbal Medicine', count: knowledgeArticles.filter(a => a.category === 'herbs').length },
    { value: 'lifestyle', label: 'Lifestyle', count: knowledgeArticles.filter(a => a.category === 'lifestyle').length },
    { value: 'wellness', label: 'Wellness', count: knowledgeArticles.filter(a => a.category === 'wellness').length }
  ];

  const filteredArticles = knowledgeArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = knowledgeArticles.filter(article => article.featured);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="pt-24 pb-16 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${ayurvedaHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            {/* Floral Border */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 flex justify-center"
            >
              <img 
                src={floralBorder}
                alt="Floral Border" 
                className="h-12 md:h-16 lg:h-20 max-w-3xl w-full object-contain opacity-90 drop-shadow-lg"
              />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ancient Knowledge
              <span className="block bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
                Hub
              </span>
            </h1>
            <div className="text-2xl md:text-3xl text-orange-200 font-semibold font-serif mb-8">
              प्राचीन ज्ञान केंद्र
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              Discover thousands of years of accumulated wisdom in Ayurvedic science, 
              preserved and transmitted through generations of master practitioners
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <Input
                placeholder="Search ancient wisdom, techniques, herbs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/90 backdrop-blur-sm border-white/50"
              />
            </div>

            {/* Bottom Floral Border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex justify-center transform rotate-180"
            >
              <img 
                src={floralBorder}
                alt="Floral Border" 
                className="h-12 md:h-16 lg:h-20 max-w-3xl w-full object-contain opacity-90 drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Featured Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Featured <span className="text-orange-600">Wisdom</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => {
                const IconComponent = article.icon;
                return (
                  <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className={`h-2 bg-gradient-to-r ${
                      article.color === 'green' ? 'from-green-400 to-green-600' :
                      article.color === 'red' ? 'from-red-400 to-red-600' :
                      'from-blue-400 to-blue-600'
                    }`}></div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`p-2 rounded-full ${
                              article.color === 'green' ? 'bg-green-100' :
                              article.color === 'red' ? 'bg-red-100' :
                              'bg-blue-100'
                            }`}>
                              <IconComponent className={`w-6 h-6 ${
                                article.color === 'green' ? 'text-green-600' :
                                article.color === 'red' ? 'text-red-600' :
                                'text-blue-600'
                              }`} />
                            </div>
                            <Badge className={`${getDifficultyColor(article.difficulty)}`}>
                              {article.difficulty}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl text-gray-800 mb-2">
                            {article.title}
                          </CardTitle>
                          <p className="text-orange-600 font-medium text-lg mb-3">
                            {article.sanskrit}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Filter className="w-5 h-5 mr-2" />
                  Explore Knowledge by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      className={selectedCategory === category.value ? 
                        'bg-gradient-to-r from-orange-500 to-red-500' : 
                        'hover:bg-orange-50'
                      }
                    >
                      {category.label}
                      <Badge 
                        variant="secondary" 
                        className="ml-2 px-2 py-0 text-xs"
                      >
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => {
              const IconComponent = article.icon;
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-full ${
                          article.color === 'green' ? 'bg-green-100' :
                          article.color === 'red' ? 'bg-red-100' :
                          article.color === 'blue' ? 'bg-blue-100' :
                          article.color === 'purple' ? 'bg-purple-100' :
                          article.color === 'yellow' ? 'bg-yellow-100' :
                          'bg-indigo-100'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            article.color === 'green' ? 'text-green-600' :
                            article.color === 'red' ? 'text-red-600' :
                            article.color === 'blue' ? 'text-blue-600' :
                            article.color === 'purple' ? 'text-purple-600' :
                            article.color === 'yellow' ? 'text-yellow-600' :
                            'text-indigo-600'
                          }`} />
                        </div>
                        <Badge className={`${getDifficultyColor(article.difficulty)}`}>
                          {article.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-gray-800 mb-2">
                        {article.title}
                      </CardTitle>
                      <p className="text-orange-600 font-medium">
                        {article.sanskrit}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-gray-600 mb-4 leading-relaxed flex-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{article.author}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 2).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {article.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{article.tags.length - 2} more
                          </Badge>
                        )}
                      </div>
                      <Button variant="outline" className="w-full hover:bg-orange-50">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500"
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

export default AncientKnowledge;
