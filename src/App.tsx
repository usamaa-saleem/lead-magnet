import React, { useState, useRef, useEffect } from 'react';
import { 
  Brain, 
  Bot, 
  LineChart, 
  Workflow, 
  MessageSquare, 
  ArrowDown, 
  Linkedin,
  ChevronRight,
  CheckCircle,
  X
} from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [animateCount, setAnimateCount] = useState(false);
  const [counts, setCounts] = useState({
    tasks: 0,
    engagement: 0,
    content: 0,
    decisions: 0
  });
  
  const contactRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Animated counter effect
  useEffect(() => {
    if (animateCount) {
      const interval = setInterval(() => {
        setCounts(prev => ({
          tasks: prev.tasks >= 50 ? 50 : prev.tasks + 1,
          engagement: prev.engagement >= 24 ? 24 : prev.engagement + 1,
          content: prev.content >= 10 ? 10 : prev.content + 1,
          decisions: prev.decisions >= 85 ? 85 : prev.decisions + 1
        }));
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [animateCount]);
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          
          if (entry.target.id === 'stats-section') {
            setAnimateCount(true);
          }
        }
      });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section[id], header[id]');
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email) {
      setFormError(true);
      setTimeout(() => setFormError(false), 3000);
      return;
    }
    
    // In a real implementation, you would send this data to a server
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        business: '',
        message: ''
      });
    }, 5000);
  };
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Floating Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-gray-800 shadow-lg hidden md:block">
        <ul className="flex space-x-8">
          <li>
          <button 
            onClick={() => {
              const section = document.getElementById('hero-section');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`text-sm font-medium transition-colors ${activeSection === 'hero-section' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection(expertiseRef)}
              className={`text-sm font-medium transition-colors ${activeSection === 'expertise-section' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
            >
              Expertise
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection(helpRef)}
              className={`text-sm font-medium transition-colors ${activeSection === 'help-section' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
            >
              Solutions
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection(testimonialsRef)}
              className={`text-sm font-medium transition-colors ${activeSection === 'testimonials-section' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
            >
              Testimonials
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all"
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
      
      {/* Floating CTA Button (Mobile) */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button 
          onClick={() => scrollToSection(contactRef)}
          className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white shadow-lg hover:shadow-blue-500/50 transition-all animate-pulse"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>

      {/* Hero Section */}
      <header id="hero-section" className="min-h-screen flex flex-col items-center justify-center relative px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')] bg-cover bg-center opacity-10"></div>
          
          {/* Animated particles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl text-center z-10">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient">
              AI-Powered Growth for Your Business
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto">
              Helping founders, executives, and AI teams streamline operations, automate workflows, and scale smarter with AI.
            </p>
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold text-lg transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center mx-auto group"
            >
              Let's Talk AI 🚀
              <ArrowDown className="ml-2 h-5 w-5 group-hover:animate-bounce" />
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <ArrowDown className="h-8 w-8 text-blue-400" />
        </div>
      </header>

      {/* Expertise Section */}
      <section id="expertise-section" ref={expertiseRef} className="py-20 px-4 bg-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/5 rounded-full"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center animate-fadeIn">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient">
              Areas of Expertise
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-blue-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-all">
                <Workflow className="h-8 w-8 text-blue-400 group-hover:animate-spin-slow" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">AI-driven Workflow Automation</h3>
              <p className="text-gray-400">Streamline operations by automating repetitive tasks with intelligent AI systems that learn and adapt to your business needs.</p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-xl hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-purple-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-all">
                <Bot className="h-8 w-8 text-purple-400 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">AI Sales & Voice Agents</h3>
              <p className="text-gray-400">Deploy intelligent conversational agents that qualify leads, answer questions, and drive sales 24/7 without human intervention.</p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-blue-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-all">
                <Brain className="h-8 w-8 text-blue-400 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Generative AI for Content</h3>
              <p className="text-gray-400">Leverage cutting-edge AI to create compelling marketing content, product descriptions, and communications at scale.</p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-xl hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-purple-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-all">
                <LineChart className="h-8 w-8 text-purple-400 group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">AI-powered Business Insights</h3>
              <p className="text-gray-400">Transform raw data into actionable intelligence with AI systems that predict trends and optimize decision-making processes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" ref={statsRef} className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-800">
              <div className="text-4xl font-bold text-blue-400 mb-2">{counts.tasks}%</div>
              <p className="text-gray-400 text-sm">Reduction in Manual Tasks</p>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-800">
              <div className="text-4xl font-bold text-purple-400 mb-2">{counts.engagement}/7</div>
              <p className="text-gray-400 text-sm">Customer Engagement</p>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-800">
              <div className="text-4xl font-bold text-blue-400 mb-2">{counts.content}x</div>
              <p className="text-gray-400 text-sm">Content Production</p>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-800">
              <div className="text-4xl font-bold text-purple-400 mb-2">{counts.decisions}%</div>
              <p className="text-gray-400 text-sm">Data-Driven Decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* How I Help Section */}
      <section id="help-section" ref={helpRef} className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-1/4 h-1/4 bg-purple-500/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center animate-fadeIn">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient">
              How I Help Businesses
            </span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <p className="text-lg mb-6 text-gray-300">
                My AI solutions are designed to drive efficiency, cut operational costs, and increase scalability for businesses of all sizes. By implementing custom AI strategies, my clients typically see:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <div className="bg-blue-500/20 p-2 rounded-full mr-4 mt-1 group-hover:bg-blue-500/40 transition-all">
                    <ChevronRight className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-gray-300"><span className="font-bold text-blue-400">30-50% reduction</span> in manual task workload</p>
                </li>
                <li className="flex items-start group">
                  <div className="bg-purple-500/20 p-2 rounded-full mr-4 mt-1 group-hover:bg-purple-500/40 transition-all">
                    <ChevronRight className="h-4 w-4 text-purple-400" />
                  </div>
                  <p className="text-gray-300"><span className="font-bold text-purple-400">24/7 customer engagement</span> through AI agents</p>
                </li>
                <li className="flex items-start group">
                  <div className="bg-blue-500/20 p-2 rounded-full mr-4 mt-1 group-hover:bg-blue-500/40 transition-all">
                    <ChevronRight className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-gray-300"><span className="font-bold text-blue-400">10x content production</span> with maintained quality</p>
                </li>
                <li className="flex items-start group">
                  <div className="bg-purple-500/20 p-2 rounded-full mr-4 mt-1 group-hover:bg-purple-500/40 transition-all">
                    <ChevronRight className="h-4 w-4 text-purple-400" />
                  </div>
                  <p className="text-gray-300"><span className="font-bold text-purple-400">Data-driven decisions</span> backed by predictive AI</p>
                </li>
              </ul>
              
              <div className="mt-8">
                <button 
                  onClick={() => scrollToSection(contactRef)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-bold transition-all hover:shadow-lg hover:shadow-blue-500/30 group"
                >
                  Get These Results
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 transform transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 animate-slideInRight">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Case Study: TechNova Solutions</h3>
              <p className="text-gray-300 mb-6">
                TechNova was struggling with customer support response times, averaging 24+ hours per ticket. By implementing my custom AI support agent:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-1 rounded-full mr-3 mt-1">
                    <ChevronRight className="h-3 w-3 text-green-400" />
                  </div>
                  <p className="text-gray-400">Response time reduced to under 5 minutes</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-1 rounded-full mr-3 mt-1">
                    <ChevronRight className="h-3 w-3 text-green-400" />
                  </div>
                  <p className="text-gray-400">85% of tickets resolved without human intervention</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-1 rounded-full mr-3 mt-1">
                    <ChevronRight className="h-3 w-3 text-green-400" />
                  </div>
                  <p className="text-gray-400">Customer satisfaction increased by 42%</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-500/20 p-1 rounded-full mr-3 mt-1">
                    <ChevronRight className="h-3 w-3 text-green-400" />
                  </div>
                  <p className="text-gray-400">Support team refocused on high-value activities</p>
                </li>
              </ul>
              <p className="text-gray-400 italic">
                "Muhammad's AI solution transformed our customer support from a bottleneck to a competitive advantage." - Sarah Chen, CTO
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials-section" ref={testimonialsRef} className="py-16 px-4 bg-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-500/5 rounded-full"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center animate-fadeIn">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient">
              Trusted By
            </span>
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <img src="https://www.photosoft.ai/_next/static/media/footerlogo.c92ec702.svg" alt="Company logo" className="h-8 md:h-20 grayscale hover:grayscale-0 transition-all" />
            <img src="https://www.typicl.ai/_next/image?url=%2Fimg%2Ffooter_logo.png&w=256&q=75" alt="Company logo" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all" />
            <img src="https://www.graana.com/home-page-images/GraanaLogo.svg" alt="Company logo" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all" />
            <img src="https://i.ibb.co/hJcMWgRt/Captura-de-pantalla-2025-01-26-a-las-10-16-50-removebg-preview.png" alt="Company logo" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all" />
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 transform transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
              <p className="text-gray-300 mb-4">
                "Muhammad's AI implementation cut our content production time by 70% while maintaining our brand voice perfectly. It's a game-changer!" 
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-400 font-bold">JD</span>
                </div>
                <div>
                  <p className="font-bold">James Donovan</p>
                  <p className="text-sm text-gray-400">Marketing Director, Elevate Digital</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 transform transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
              <p className="text-gray-300 mb-4">
                "The AI sales agent Muhammad built for us generates consistent leads even outside business hours. It's like having our best salesperson working 24/7."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-400 font-bold">RL</span>
                </div>
                <div>
                  <p className="font-bold">Rebecca Liu</p>
                  <p className="text-sm text-gray-400">Sales VP, GrowthForce</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 transform transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
              <p className="text-gray-300 mb-4">
                "Muhammad's AI workflow automation saved our team 20+ hours per week on data processing. The ROI was evident within the first month."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-400 font-bold">MJ</span>
                </div>
                <div>
                  <p className="font-bold">Michael Johnson</p>
                  <p className="text-sm text-gray-400">Operations Manager, TechFlow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-section" ref={contactRef} className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-0 w-1/4 h-1/4 bg-blue-500/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-purple-500/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="animate-pulse-slow">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient">
                Let's Build AI-Driven Success Together
              </span>
            </h2>
            <p className="text-xl text-center text-gray-300 mb-12 max-w-2xl mx-auto">
              Drop your email below, and let's explore how AI can revolutionize your business.
            </p>
          </div>
          
          <div className="relative">
            {/* Success message */}
            {formSubmitted && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/95 rounded-xl z-20 animate-fadeIn">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-300">Your message has been received. I'll get back to you shortly.</p>
                </div>
              </div>
            )}
            
            {/* Error message */}
            {formError && (
              <div className="absolute top-4 left-0 right-0 bg-red-500/20 text-red-300 p-4 rounded-lg z-20 animate-shake">
                <div className="flex items-center">
                  <X className="h-5 w-5 mr-2" />
                  <p>Please fill out all required fields.</p>
                </div>
              </div>
            )}
            
            <form 
              action="https://formsubmit.co/usama.saleem@genaxai.com" 
              method="POST"
              className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Prevent spam bots */}
              <input type="hidden" name="_captcha" value="false" />
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                    placeholder="Your name"
                  />
                </div>
            
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            
              <div className="mb-6 group">
                <label htmlFor="business" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                  Business Name
                </label>
                <input
                  type="text"
                  id="business"
                  name="business"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                  placeholder="Your company"
                />
              </div>
            
              <div className="mb-8 group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                  placeholder="Tell me about your AI needs or challenges"
                ></textarea>
              </div>
            
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-bold text-lg transition-all hover:shadow-lg hover:shadow-blue-500/30 relative overflow-hidden group"
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            
              <p className="text-center text-gray-500 text-sm mt-4">
                Your information is secure and will never be shared with third parties.
              </p>
            </form>
          </div>
          
          <div className="mt-12 flex justify-center space-x-6">
            <a href="https://www.linkedin.com/in/usamaasaleem/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110 transition-transform">
              <Linkedin className="h-8 w-8" />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient">
              Ready to Scale with AI?
            </span>
          </h2>
          <button 
            onClick={() => scrollToSection(contactRef)}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold text-lg transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center mx-auto group animate-pulse-slow"
          >
            Let's Talk AI
            <MessageSquare className="ml-2 h-5 w-5 group-hover:animate-bounce" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              {/* <Brain className="h-6 w-6 text-blue-400 mr-2" /> */}
              {/* <span className="font-bold text-lg"></span> */}
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
