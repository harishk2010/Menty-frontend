"use client";

import { useEffect, useState } from "react";
import { 
  Calendar, 
  Award, 
  Users, 
  Book, 
  Clock, 
  CheckCircle, 
  Lightbulb, 
  Target,
  Heart,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
type VisibilityState = {
  [key: string]: boolean;
};

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState<VisibilityState>({
    mission: false,
    vision: false,
    values: false,
    team: false,
    journey: false
  });

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "-50px"
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = ["mission", "vision", "values", "team", "journey"];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Core team members
  const teamMembers = [
    {
      name: "Harish K",
      role: "Founder & CEO",
      image: "/harishProfImage.jpg",
      bio: "With over 15 years in education technology, Harish founded this platform with a vision to make expert-led learning accessible to everyone."
    },
    {
      name: "Vignesh S",
      role: "Chief Learning Officer",
      image: "/vigneshProfImage.jpg",
      bio: "Former education director with experience in curriculum development and instructional design across multiple disciplines."
    },
    {
      name: "Abin Babu",
      role: "Head of Mentorship",
      image: "/AbinProfImage.jpg",
      bio: "Passionate about connecting learners with industry experts to provide personalized guidance and career support."
    },
    {
      name: "Logesh C",
      role: "Chief Technology Officer",
      image: "/LogeshProfImage.jpg",
      bio: "Tech innovator with expertise in creating scalable learning platforms focused on user experience and accessibility."
    }
  ];

  // Core values
  const values = [
    {
      icon: <Lightbulb className="w-6 h-6 text-purple-600" />,
      title: "Innovation",
      description: "Constantly evolving our approach to learning and mentorship"
    },
    {
      icon: <Target className="w-6 h-6 text-purple-600" />,
      title: "Excellence",
      description: "Committed to the highest standards in education and support"
    },
    {
      icon: <Heart className="w-6 h-6 text-purple-600" />,
      title: "Empathy",
      description: "Understanding and addressing the unique needs of every learner"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      title: "Accessibility",
      description: "Making quality education available to everyone, everywhere"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-purple-900 opacity-50"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            About Our Learning Platform
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl mb-8"
          >
            Empowering individuals through quality education and personalized mentorship
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex space-x-4"
          >
            <a href="#mission" className="bg-white text-purple-700 hover:bg-gray-100 transition-colors py-3 px-6 rounded-md font-medium">
              Our Mission
            </a>
            <a href="#team" className="bg-purple-600 hover:bg-purple-700 transition-colors py-3 px-6 rounded-md font-medium">
              Meet Our Team
            </a>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "10,000+", label: "Students Taught", icon: <Users className="h-8 w-8 text-purple-500 mb-3" /> },
              { value: "500+", label: "Courses Created", icon: <Book className="h-8 w-8 text-purple-500 mb-3" /> },
              { value: "100+", label: "Expert Mentors", icon: <Award className="h-8 w-8 text-purple-500 mb-3" /> },
              { value: "5+ Years", label: "Of Excellence", icon: <Clock className="h-8 w-8 text-purple-500 mb-3" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-extrabold text-purple-600">{stat.value}</div>
                <div className="mt-2 text-base font-medium text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Our Story</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">The Journey So Far</p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              From humble beginnings to transforming education through technology and human connection
            </p>
          </div>
          
          <div className="prose prose-lg max-w-4xl mx-auto text-gray-500">
            <p>
              Founded in 2019, our learning platform began with a simple yet powerful vision: to democratize access to quality education and expert mentorship for learners worldwide. What started as a small collection of online courses has evolved into a comprehensive educational ecosystem that serves thousands of students across the globe.
            </p>
            <p>
              Our founder, Harish , experienced firsthand the transformative power of personalized mentorship during her own career journey. Recognizing that such guidance remained inaccessible to many, she assembled a team of passionate educators and technologists to bridge this gap.
            </p>
            <p>
              Over the years, we've expanded beyond course delivery to create a truly holistic learning experience. Our platform now combines expertly crafted courses with personalized mentorship, vibrant learning communities, and practical skill development opportunities.
            </p>
            <p>
              Today, we're proud to have helped thousands of learners acquire new skills, advance their careers, and achieve their personal and professional goals. Our community continues to grow, united by a shared belief in the power of education to transform lives.
            </p>
          </div>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div 
              id="mission" 
              className={`transition-opacity on-hover:shadow-lg shadow-purple-500  duration-1000 ${isVisible.mission ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="h-full bg-purple-50 p-8 rounded-xl border border-purple-100  ">
                <div className="flex justify-center mb-6 on-hover:shadow-md shadow-purple-500">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Target className="h-10 w-10 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Our Mission</h3>
                <p className="text-gray-600 mb-4">
                  Our mission is to empower individuals worldwide through accessible, high-quality education and personalized mentorship. We strive to:
                </p>
                <ul className="space-y-3 text-black">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Provide affordable access to expert-led courses across diverse disciplines</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Connect learners with industry professionals for personalized guidance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Foster supportive learning communities that encourage collaboration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Bridge the gap between theoretical knowledge and practical application</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Vision */}
            <div 
              id="vision" 
              className={`transition-opacity duration-1000 ${isVisible.vision ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="h-full bg-indigo-50 p-8 rounded-xl border border-indigo-100 on-hover:shadow-md shadow-purple-500">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-indigo-100 rounded-full">
                    <Lightbulb className="h-10 w-10 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Our Vision</h3>
                <p className="text-gray-600 mb-4">
                  We envision a world where quality education and mentorship are accessible to everyone, regardless of geographical or economic barriers. We aspire to:
                </p>
                <ul className="space-y-3 text-black">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Become the leading platform for integrated learning and mentorship worldwide</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Pioneer innovative approaches to online education that maximize learning outcomes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Create opportunities for lifelong learning across all career stages</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Build diverse communities where knowledge sharing transcends traditional boundaries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div id="values" className={`py-16 bg-gray-50 transition-opacity duration-1000 ${isVisible.values ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Our Values</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">What We Stand For</p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our core values guide everything we do, from course creation to mentorship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-50 rounded-full">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div id="team" className={`py-16 bg-white transition-opacity duration-1000 ${isVisible.team ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Meet the Visionaries</p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              A passionate team dedicated to transforming education through innovation and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full mb-6 overflow-hidden rounded-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{member.name}</h3>
                <p className="text-purple-600 text-center mb-4">{member.role}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

  
      {/* Call to Action Section */}
      <div className="py-16 bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="max-w-2xl mx-auto text-xl mb-8">
            Join thousands of learners worldwide and take the next step toward achieving your goals
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/courses" className="bg-white text-purple-700 hover:bg-gray-100 transition-colors py-3 px-6 rounded-md font-medium">
              Explore Courses
            </Link>
            <Link href="/mentors" className="bg-purple-600 hover:bg-purple-700 transition-colors py-3 px-6 rounded-md font-medium">
              Find a Mentor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}