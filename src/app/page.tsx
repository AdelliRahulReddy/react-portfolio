'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink, Menu, X, ArrowUp, Sparkles, Zap, Bot, Lightbulb, Target, Rocket, Code, Brain, Smartphone, Globe, Star, Users, Award, Calendar, Clock, TrendingUp } from 'lucide-react'
import Head from 'next/head'

// Enhanced animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -60, scale: 0.95 }
}

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const floatingAnimation = {
  y: [0, -20, 0],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
}

export default function AuthenticPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particlesEnabled, setParticlesEnabled] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const { scrollYProgress } = useScroll()
  
  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Performance optimization
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection && connection.effectiveType === '2g') {
        setParticlesEnabled(false)
      }
    }
  }, [])

  // Enhanced scroll detection with navigation state
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
      setShowScrollTop(window.scrollY > 1000)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Enhanced intersection observer
  useEffect(() => {
    const sections = ['home', 'about', 'journey', 'approach', 'projects', 'vision', 'contact']
    const observers = sections.map(section => {
      const element = document.getElementById(section)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section)
            history.replaceState(null, '', `#${section}`)
          }
        },
        { threshold: 0.6, rootMargin: '-10% 0px -10% 0px' }
      )
      observer.observe(element)
      return observer
    })

    return () => observers.forEach(observer => observer?.disconnect())
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>Adelli Rahul Reddy - AI-Powered Builder & Creative Problem Solver | Portfolio</title>
        <meta name="description" content="AI-native developer and creative problem solver. I build advanced websites, apps, and automations using AI tools, logic, and innovative thinking. Based in Hyderabad, India." />
        <meta name="keywords" content="AI Developer, AI-Powered Builder, Creative Problem Solver, ChatGPT Developer, AI Automation, Innovation, Hyderabad" />
        <meta name="author" content="Adelli Rahul Reddy" />
        <meta property="og:title" content="Adelli Rahul Reddy - AI-Powered Builder & Creative Problem Solver" />
        <meta property="og:description" content="Creative AI-native builder who transforms ideas into reality using AI tools, logic, and innovative thinking." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-x-hidden">
        {/* Optimized Particle Background */}
        {particlesEnabled && <OptimizedParticleBackground />}
        
        {/* Custom Cursor - Desktop Only */}
        <motion.div
          className="fixed w-6 h-6 bg-blue-400/30 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
          }}
        />

        {/* Enhanced Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Fixed Navigation with Proper Spacing */}
        <motion.nav 
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${
            isScrolled ? 'top-2 scale-95' : 'top-4'
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className={`bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20 shadow-2xl ${
              isScrolled ? 'bg-white/15' : ''
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-6">
              <motion.div 
                className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Rahul.
              </motion.div>

              {/* Enhanced Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-4">
                {[
                  { id: 'home', label: 'Home', icon: '🏠' },
                  { id: 'about', label: 'About', icon: '🤖' },
                  { id: 'journey', label: 'Journey', icon: '🚀' },
                  { id: 'approach', label: 'My Approach', icon: '💡' },
                  { id: 'projects', label: 'Projects', icon: '⚡' },
                  { id: 'vision', label: 'Vision', icon: '🎯' },
                  { id: 'contact', label: 'Contact', icon: '📬' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all relative overflow-hidden ${
                      activeSection === item.id 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg' 
                        : 'hover:text-blue-400 hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-1.5 text-xs">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"
                        layoutId="activeTab"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button 
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>

          {/* Enhanced Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="lg:hidden mt-4 bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl"
              >
                {[
                  { id: 'home', label: 'Home', icon: '🏠' },
                  { id: 'about', label: 'About', icon: '🤖' },
                  { id: 'journey', label: 'Journey', icon: '🚀' },
                  { id: 'approach', label: 'My Approach', icon: '💡' },
                  { id: 'projects', label: 'Projects', icon: '⚡' },
                  { id: 'vision', label: 'Vision', icon: '🎯' },
                  { id: 'contact', label: 'Contact', icon: '📬' }
                ].map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* COMPLETE HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-32 sm:pt-20 relative overflow-hidden">
          {/* Advanced Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
              animate={floatingAnimation}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
              animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
            />
            <motion.div
              className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl"
              animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
            />
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
            <motion.div 
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Fixed Badge Position - Now Below Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 text-sm backdrop-blur-sm">
                  <Bot size={16} className="text-blue-400" />
                  <span className="text-sm">Available for AI-powered projects</span>
                </span>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <motion.span 
                  className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Adelli Rahul Reddy
                </motion.span>
              </motion.h1>

              <motion.div 
                className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 h-12 sm:h-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <AdvancedTypewriter 
                  texts={[
                    "AI-Powered Builder 🤖", 
                    "Creative Problem Solver 💡", 
                    "Logic-Driven Innovator 🚀", 
                    "Future Developer 💻"
                  ]} 
                />
              </motion.div>

              <motion.p 
                className="text-base sm:text-lg text-gray-400 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                My journey started with <strong className="text-blue-400">no technical background</strong> in 2018. Through 
                <strong className="text-purple-400"> analytical thinking developed at HCLTech</strong> and 
                <strong className="text-pink-400"> design concepts from BITS Pilani</strong>, I discovered my passion for building solutions using 
                <strong className="text-cyan-400"> AI tools, logical reasoning, and creative problem-solving</strong>.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                variants={stagger}
              >
                <motion.button 
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold flex items-center justify-center gap-3 shadow-xl hover:shadow-blue-500/25 relative overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  variants={fadeInUp}
                >
                  <Download size={18} className="group-hover:animate-bounce" />
                  <span className="text-sm sm:text-base">My AI Journey Story</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"
                  />
                </motion.button>

                <motion.button 
                  onClick={() => scrollToSection('projects')}
                  className="group border-2 border-white/20 hover:border-blue-400/50 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  variants={fadeInUp}
                >
                  <ExternalLink size={18} className="group-hover:animate-pulse" />
                  <span className="text-sm sm:text-base">View AI-Built Projects</span>
                </motion.button>
              </motion.div>

              {/* Enhanced Achievement Stats */}
              <motion.div
                className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8 mt-12 pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {[
                  { number: "15+", label: "AI-Built Projects", color: "blue" },
                  { number: "6 Months", label: "AI Journey", color: "purple" },
                  { number: "∞", label: "Learning Mode", color: "pink" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className={`text-xl sm:text-2xl font-bold text-${stat.color}-400`}>{stat.number}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Ultra-Enhanced 3D Profile Section */}
            <motion.div 
              className="relative order-1 lg:order-2 flex justify-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                {/* Advanced Animated Rings */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <motion.div 
                  className="absolute inset-4 rounded-full border-2 border-purple-400/30"
                  animate={{ 
                    rotate: -360,
                    scale: [1, 0.9, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
                  }}
                />
                <motion.div 
                  className="absolute inset-8 rounded-full border-2 border-pink-400/30"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }
                  }}
                />
                
                {/* Enhanced Floating AI Tools - Responsive Positioning */}
                <motion.div
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
                  animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-white font-bold text-xs sm:text-sm">GPT</span>
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg"
                  animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-white font-bold text-xs">Gemini</span>
                </motion.div>
                <motion.div
                  className="absolute top-1/2 -left-6 sm:-left-8 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ x: [0, -5, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Lightbulb size={14} className="text-white" />
                </motion.div>
                <motion.div
                  className="absolute top-1/4 -right-6 sm:-right-8 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ x: [0, 5, 0], y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap size={14} className="text-white" />
                </motion.div>
                
                {/* Enhanced Profile Image */}
                <motion.div 
                  className="absolute inset-10 sm:inset-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  animate={floatingAnimation}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-4xl sm:text-5xl font-bold shadow-inner">
                    <motion.span
                      className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      style={{ backgroundSize: '200% 200%' }}
                    >
                      ARR
                    </motion.span>
                  </div>
                </motion.div>

                {/* Enhanced Tech Stack Orbit - Responsive */}
                <div className="absolute inset-0 w-full h-full">
                  {['Logic', 'Research', 'AI Tools', 'Creativity', 'Analysis', 'Innovation'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="absolute w-12 h-7 sm:w-14 sm:h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-semibold border border-white/20"
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: '6px 0px'
                      }}
                      animate={{
                        rotate: index * 60,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }
                      }}
                    >
                      <span className="text-xs">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-2 text-white/60">
              <span className="text-sm">Discover my authentic journey</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={24} />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* COMPLETE ABOUT SECTION */}
        <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              The Real <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
            </motion.h2>

            <motion.div 
              className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Enhanced Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                <motion.div 
                  className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-purple-400/20 rounded-full blur-xl"
                  animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
              
              <div className="relative z-10 space-y-6">
                <motion.p 
                  className="text-base sm:text-lg leading-relaxed text-gray-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <strong className="text-blue-400">I'm not your traditional developer.</strong> I don't have formal coding education or years of programming experience. 
                  But I have something different — <strong className="text-purple-400">creative thinking, logical problem-solving, and the ability to harness AI as my development partner.</strong>
                </motion.p>
                
                <motion.p 
                  className="text-base sm:text-lg leading-relaxed text-gray-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Through <strong className="text-blue-400">ChatGPT, Gemini, and other AI tools</strong>, I've built websites, mobile apps, automation systems, and bots. 
                  My superpower isn't writing perfect code — it's <strong className="text-pink-400">asking the right questions, thinking through problems logically, and iterating fast.</strong>
                </motion.p>

                <motion.p 
                  className="text-base sm:text-lg leading-relaxed text-gray-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  I'm on a journey to become a full developer, but right now I'm proud to be an <strong className="text-purple-400">AI-native builder</strong> who delivers real value 
                  through creativity, research, and innovative thinking.
                </motion.p>

                {/* Enhanced Core Strengths - Responsive Grid */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {[
                    { icon: "🧠", title: "Logic-Driven Thinking", desc: "Breaking down complex problems into manageable solutions", color: "blue" },
                    { icon: "🔍", title: "Research & Learning", desc: "Rapidly absorbing new concepts and applying them practically", color: "purple" },
                    { icon: "🤖", title: "AI Partnership", desc: "Leveraging AI tools as co-developers, not just assistants", color: "pink" },
                    { icon: "⚡", title: "Fast Iteration", desc: "Quickly testing, learning, and improving based on results", color: "cyan" }
                  ].map((strength, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 rounded-xl p-4 border border-white/10 relative overflow-hidden group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br from-${strength.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <div className="relative z-10">
                        <div className="text-xl sm:text-2xl mb-2">{strength.icon}</div>
                        <h4 className={`font-semibold text-${strength.color}-400 mb-1 text-sm sm:text-base`}>{strength.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-400">{strength.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Enhanced Personal Stats - Responsive */}
                <motion.div
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                >
                  {[
                    { label: 'AI Journey', value: '6 Months', color: 'blue', icon: '🤖' },
                    { label: 'Projects Built', value: '15+', color: 'purple', icon: '⚡' },
                    { label: 'Learning Hours', value: '500+', color: 'pink', icon: '📚' },
                    { label: 'Growth Rate', value: '∞%', color: 'cyan', icon: '🚀' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center group"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-xl sm:text-2xl mb-1">{stat.icon}</div>
                      <div className={`text-xl sm:text-2xl font-bold text-${stat.color}-400 mb-1`}>{stat.value}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMPLETE JOURNEY SECTION */}
        <section id="journey" className="py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
              animate={{ scale: [1.1, 0.9, 1.1], rotate: [0, -180, -360] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              My Authentic <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Journey</span>
            </motion.h2>

            <div className="relative">
              {/* Enhanced Timeline Line */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block"
                style={{ height: '100%' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />

              <div className="space-y-8 sm:space-y-12">
                {[
                  {
                    year: "Present - 2025",
                    title: "AI-Powered Builder & Explorer",
                    company: "Self-Directed Learning Journey",
                    description: "Now I'm exploring AI, app/web development, and automation — building real-world projects using AI tools and logical thinking, not formal full-stack skills. This is where my true passion lies: creative problem-solving through AI collaboration.",
                    icon: "🤖",
                    color: "blue",
                    achievements: ["AI-assisted project development", "Web/mobile app creation", "Automation systems", "Creative problem-solving mindset"],
                    highlight: "Current Focus"
                  },
                  {
                    year: "Sep 2024", 
                    title: "Promoted to Software Analyst",
                    company: "HCLTech - Verizon Project",
                    description: "Got promoted to Software Analyst on the Verizon Project, continuing in network support but with expanded responsibilities. This role enhanced my analytical thinking and problem-solving skills that I now apply to development.",
                    icon: "📈",
                    color: "purple",
                    achievements: ["Internal promotion achieved", "Verizon client engagement", "Advanced network analysis", "Enhanced analytical skills"],
                    highlight: "Career Growth"
                  },
                  {
                    year: "Dec 2022",
                    title: "Started B.Sc. Design & Computing",
                    company: "BITS Pilani (WILP Program)",
                    description: "Enrolled in B.Sc. Design & Computing through BITS Pilani's Work Integrated Learning Program, balancing work and education. This exposed me to design thinking and computing concepts that fuel my creative development approach.",
                    icon: "🎓",
                    color: "cyan",
                    achievements: ["Design & Computing knowledge", "Work-study balance", "Strategic learning approach", "Foundation in computing concepts"],
                    highlight: "Education"
                  },
                  {
                    year: "Nov 2022",
                    title: "First Professional Role",
                    company: "HCLTech - Network Analyst (Olin Project)",
                    description: "Started my professional career as a Network Analyst on the Olin Project with no prior technical background. This role taught me to analyze complex systems and think logically — skills that became the foundation for my AI-powered development journey.",
                    icon: "💼",
                    color: "pink",
                    achievements: ["First tech industry experience", "Network analysis skills", "System thinking development", "Professional communication"],
                    highlight: "Career Start"
                  },
                  {
                    year: "2020",
                    title: "Intermediate Completion",
                    company: "Sr AVR Campus - MPC Stream",
                    description: "Finished Intermediate (MPC) with an impressive 902/1000 score. Mathematics, Physics, and Chemistry built my logical thinking and problem-solving foundation — skills I now use daily in development and AI collaboration.",
                    icon: "📚",
                    color: "orange",
                    achievements: ["902/1000 excellent score", "Strong STEM foundation", "Logical reasoning skills", "Academic excellence"],
                    highlight: "Academic Excellence"
                  },
                  {
                    year: "2018",
                    title: "The Foundation",
                    company: "Tejaswi High School - 10th Grade",
                    description: "Completed 10th grade with 9.2 GPA from Tejaswi High School. This was the beginning of my educational journey, with no technical background but already showing strong analytical and learning capabilities.",
                    icon: "🌱",
                    color: "green",
                    achievements: ["9.2 GPA achievement", "Strong academic foundation", "Learning mindset established", "First milestone completed"],
                    highlight: "The Beginning"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <div className="flex-1 md:w-5/12 w-full">
                      <motion.div 
                        className={`bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl relative overflow-hidden group ${
                          index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                        }`}
                        whileHover={{ 
                          scale: 1.03, 
                          y: -10
                        }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        {/* Highlight Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`px-2 py-1 bg-${item.color}-400/20 text-${item.color}-400 border border-${item.color}-400/30 rounded-full text-xs font-medium`}>
                            {item.highlight}
                          </span>
                        </div>
                        
                        <div className="relative z-10">
                          <div className={`text-${item.color}-400 font-semibold mb-2 flex items-center gap-2`}>
                            <span className="text-xl sm:text-2xl">{item.icon}</span>
                            <span className="text-sm sm:text-base">{item.year}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold mb-1">{item.title}</h3>
                          <h4 className={`text-${item.color}-400 mb-3 font-medium text-sm sm:text-base`}>{item.company}</h4>
                          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">{item.description}</p>
                          
                          {/* Enhanced Key Achievements */}
                          <div className="space-y-2">
                            <h5 className="text-xs sm:text-sm font-semibold text-gray-300 mb-2">Key Achievements:</h5>
                            {item.achievements.map((achievement, achIndex) => (
                              <motion.div 
                                key={achIndex} 
                                className="flex items-center gap-2 text-xs sm:text-sm text-gray-300"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 + achIndex * 0.05 }}
                              >
                                <div className={`w-1.5 h-1.5 rounded-full bg-${item.color}-400 flex-shrink-0`} />
                                <span>{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Enhanced Hover Effect Lines */}
                        <motion.div
                          className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${item.color}-400 to-transparent`}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Enhanced Timeline Node */}
                    <div className="hidden md:flex w-2/12 justify-center relative z-20 my-8">
                      <motion.div 
                        className={`w-6 h-6 bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 rounded-full border-4 border-slate-900 shadow-lg relative`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                        whileHover={{ scale: 1.5 }}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-${item.color}-400 rounded-full`}
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        />
                      </motion.div>
                    </div>
                    
                    <div className="flex-1 md:w-5/12 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced Journey Insights */}
            <motion.div
              className="mt-12 sm:mt-16 bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
              
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-400">Key Insights from My Journey</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { 
                      icon: "🎯", 
                      title: "No Technical Background", 
                      desc: "Started with zero coding knowledge, proving that passion and logic matter more than formal training",
                      color: "blue"
                    },
                    { 
                      icon: "⚖️", 
                      title: "Work-Study Balance", 
                      desc: "Successfully managing full-time work while pursuing education shows dedication and time management",
                      color: "purple"
                    },
                    { 
                      icon: "🚀", 
                      title: "Natural Evolution", 
                      desc: "From network analysis to AI-powered development — following curiosity and building on analytical skills",
                      color: "pink"
                    }
                  ].map((insight, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 relative overflow-hidden group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br from-${insight.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <div className="relative z-10">
                        <div className="text-2xl sm:text-3xl mb-3">{insight.icon}</div>
                        <h4 className={`font-semibold text-${insight.color}-400 mb-2 text-sm sm:text-base`}>{insight.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{insight.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Timeline Summary */}
                <motion.div
                  className="mt-6 sm:mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>7-Year Journey</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full" />
                    <div className="flex items-center gap-2">
                      <TrendingUp size={14} />
                      <span>Continuous Growth</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full" />
                    <div className="flex items-center gap-2">
                      <Target size={14} />
                      <span>Clear Vision</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMPLETE APPROACH SECTION */}
        <section id="approach" className="py-16 sm:py-20 px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              My AI-Native <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Approach</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  step: "01",
                  title: "Research & Understand",
                  desc: "Deep dive into the problem, understand user needs, and research existing solutions with thorough analysis",
                  icon: "🔍",
                  color: "blue",
                  details: ["Problem definition", "User research", "Market analysis", "Solution mapping"]
                },
                {
                  step: "02", 
                  title: "AI Collaboration",
                  desc: "Partner with ChatGPT, Gemini to brainstorm solutions, architectures, and implementation strategies",
                  icon: "🤖",
                  color: "purple",
                  details: ["Solution brainstorming", "Architecture planning", "Code generation", "Best practices"]
                },
                {
                  step: "03",
                  title: "Iterative Building",
                  desc: "Build, test, learn, and improve rapidly using AI-assisted development and logical thinking",
                  icon: "⚡",
                  color: "pink",
                  details: ["Rapid prototyping", "Testing & feedback", "Continuous improvement", "Performance optimization"]
                },
                {
                  step: "04",
                  title: "Real-World Testing",
                  desc: "Deploy, gather feedback, and continuously improve based on actual user experience and results",
                  icon: "🎯",
                  color: "cyan",
                  details: ["User testing", "Performance monitoring", "Feedback integration", "Continuous deployment"]
                }
              ].map((approach, index) => (
                <motion.div 
                  key={index}
                  className="text-center relative group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <motion.div
                    className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-${approach.color}-500/20 to-${approach.color}-400/20 rounded-full flex items-center justify-center border border-${approach.color}-400/30 relative overflow-hidden`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {/* Enhanced Background Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-${approach.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <span className="text-2xl sm:text-3xl relative z-10">{approach.icon}</span>
                    <div className={`absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-${approach.color}-400 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-slate-900`}>
                      {approach.step}
                    </div>
                  </motion.div>
                  
                  <h3 className="text-lg sm:text-xl font-bold mb-3">{approach.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">{approach.desc}</p>

                  {/* Enhanced Details */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: "auto" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                  >
                    {approach.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        className={`text-xs text-${approach.color}-400 bg-${approach.color}-400/10 px-2 sm:px-3 py-1 rounded-full border border-${approach.color}-400/20`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + detailIndex * 0.05 + 0.7 }}
                      >
                        {detail}
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Enhanced Connection Line */}
                  {index < 3 && (
                    <motion.div 
                      className="hidden lg:block absolute top-8 sm:top-10 left-full w-6 sm:w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Enhanced Process Flow */}
            <motion.div
              className="mt-12 sm:mt-16 bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-purple-400">My Development Philosophy</h3>
              <div className="max-w-3xl mx-auto">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                  <strong className="text-blue-400">"I believe the future of development isn't about replacing human creativity with AI,</strong> 
                  but about <strong className="text-purple-400">amplifying human logic and problem-solving</strong> through intelligent collaboration. 
                  <strong className="text-pink-400">Every project is a learning opportunity</strong> that makes me better at asking the right questions 
                  and building the right solutions."
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: "🎯", text: "Problem-First Thinking", color: "blue" },
                    { icon: "🤝", text: "Human-AI Partnership", color: "purple" },
                    { icon: "📈", text: "Continuous Learning", color: "pink" }
                  ].map((philosophy, index) => (
                    <motion.div
                      key={index}
                      className={`bg-${philosophy.color}-400/10 border border-${philosophy.color}-400/20 rounded-lg p-4`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-xl sm:text-2xl mb-2">{philosophy.icon}</div>
                      <div className={`text-xs sm:text-sm font-semibold text-${philosophy.color}-400`}>{philosophy.text}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMPLETE AI-BUILT PROJECTS SECTION */}
        <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              AI-Built <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
            </motion.h2>

            <motion.p 
              className="text-center text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto text-sm sm:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              These projects weren't built with traditional coding — they're the result of <strong className="text-blue-400">creative thinking, AI collaboration, and iterative problem-solving</strong>. 
              Each one taught me something new about development and showed me what's possible when you think differently.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {[
                {
                  title: "E-Commerce Platform with AI",
                  desc: "Built using ChatGPT as co-developer. Features AI-powered product recommendations and smart search functionality.",
                  buildProcess: "Research → AI Planning → Iterative Building → Real Testing",
                  tech: ["ChatGPT Assisted", "React", "AI APIs", "Logical Design"],
                  gradient: "from-blue-500 to-cyan-500",
                  aiRole: "Co-Developer & Architecture Advisor",
                  learnings: ["API Integration", "User Experience Design", "Performance Optimization"],
                  features: ["AI Recommendations", "Smart Search", "Real-time Analytics", "Mobile Responsive"],
                  status: "Live"
                },
                {
                  title: "Automation Bot Network",
                  desc: "Created multiple bots for social media management, data collection, and customer service using AI-guided development.",
                  buildProcess: "Problem Analysis → AI Consultation → Bot Logic → Deployment",
                  tech: ["Gemini Assisted", "Python Scripts", "API Integration", "Logic Flow"],
                  gradient: "from-purple-500 to-pink-500", 
                  aiRole: "Logic Advisor & Code Generator",
                  learnings: ["Automation Principles", "API Management", "Error Handling"],
                  features: ["Social Media Automation", "Data Collection", "Customer Service", "Multi-platform"],
                  status: "Active"
                },
                {
                  title: "Portfolio Website (This One!)",
                  desc: "This very portfolio was built through AI collaboration, showcasing advanced animations and responsive design.",
                  buildProcess: "Vision → AI Partnership → Iterative Refinement → Polish",
                  tech: ["AI-Assisted Design", "Next.js", "Framer Motion", "Creative Logic"],
                  gradient: "from-orange-500 to-red-500",
                  aiRole: "Design Partner & Technical Guide", 
                  learnings: ["React Ecosystem", "Animation Systems", "Modern Web Development"],
                  features: ["Advanced Animations", "Responsive Design", "Performance Optimized", "SEO Ready"],
                  status: "Live"
                },
                {
                  title: "AI-Powered Task Manager",
                  desc: "Smart task management system that uses AI to prioritize tasks, suggest optimal scheduling, and predict completion times.",
                  buildProcess: "User Research → AI Design → Smart Logic → User Testing",
                  tech: ["AI Planning", "React Native", "Machine Learning", "Cloud Functions"],
                  gradient: "from-green-500 to-teal-500",
                  aiRole: "Intelligence Engine & UX Advisor",
                  learnings: ["Mobile Development", "AI Integration", "User Psychology"],
                  features: ["Smart Prioritization", "Time Prediction", "Habit Tracking", "Cross-platform"],
                  status: "Beta"
                },
                {
                  title: "Network Monitor Dashboard",
                  desc: "Real-time network monitoring system built for HCLTech projects, featuring predictive analytics and alert systems.",
                  buildProcess: "Problem Analysis → AI Architecture → Dashboard Logic → Enterprise Deployment",
                  tech: ["AI Analytics", "Vue.js", "Python Backend", "Real-time Data"],
                  gradient: "from-indigo-500 to-purple-500",
                  aiRole: "Analytics Engine & Interface Designer",
                  learnings: ["Enterprise Solutions", "Real-time Systems", "Data Visualization"],
                  features: ["Real-time Monitoring", "Predictive Alerts", "Custom Dashboards", "Performance Analytics"],
                  status: "Production"
                },
                {
                  title: "AI Content Generator",
                  desc: "Multi-purpose content creation tool that generates blog posts, social media content, and marketing copy using advanced AI.",
                  buildProcess: "Content Strategy → AI Training → Generation Logic → Quality Testing",
                  tech: ["GPT Integration", "Content APIs", "React Dashboard", "Quality Control"],
                  gradient: "from-pink-500 to-red-500",
                  aiRole: "Content Brain & Quality Controller",
                  learnings: ["Content Strategy", "AI Training", "Quality Systems"],
                  features: ["Multi-format Content", "Brand Voice Matching", "SEO Optimization", "Bulk Generation"],
                  status: "Live"
                }
              ].map((project, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 relative group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Project Preview */}
                  <div className={`h-36 sm:h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <motion.div
                        className="text-white/80 group-hover:scale-110 transition-transform"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Bot size={36} className="sm:w-12 sm:h-12" />
                      </motion.div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Live' ? 'bg-green-400/20 text-green-400 border border-green-400/30' :
                        project.status === 'Beta' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' :
                        project.status === 'Production' ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30' :
                        'bg-purple-400/20 text-purple-400 border border-purple-400/30'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    {/* AI Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2 sm:px-3 py-1 bg-green-400/20 text-green-400 border border-green-400/30 rounded-full text-xs font-medium flex items-center gap-1">
                        <Bot size={10} className="sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">AI-Built</span>
                        <span className="sm:hidden">AI</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed text-sm sm:text-base">{project.desc}</p>

                    {/* Key Features */}
                    <div className="mb-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-2">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {project.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="text-xs text-gray-400 flex items-center gap-1"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.05 + 0.5 }}
                          >
                            <div className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* AI Role */}
                    <div className="mb-4 p-3 bg-blue-400/10 rounded-lg border border-blue-400/20">
                      <h4 className="text-xs sm:text-sm font-semibold text-blue-400 mb-1">AI's Role:</h4>
                      <p className="text-xs text-gray-300">{project.aiRole}</p>
                    </div>

                    {/* Build Process */}
                    <div className="mb-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-2">Build Process:</h4>
                      <div className="text-xs text-gray-400 bg-white/5 px-3 py-2 rounded-lg">
                        {project.buildProcess}
                      </div>
                    </div>

                    {/* Key Learnings */}
                    <div className="mb-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-300 mb-2">What I Learned:</h4>
                      <div className="space-y-1">
                        {project.learnings.map((learning, learningIndex) => (
                          <div key={learningIndex} className="flex items-center gap-2 text-xs text-gray-400">
                            <div className="w-1 h-1 bg-purple-400 rounded-full flex-shrink-0" />
                            <span>{learning}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Honest Project Stats */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">My AI-Building Journey So Far</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { number: "15+", label: "Projects Built", desc: "Using AI as co-developer", icon: "⚡" },
                  { number: "6 Months", label: "AI Journey", desc: "From curiosity to capability", icon: "🚀" },
                  { number: "100%", label: "Learning Mode", desc: "Every project teaches something new", icon: "📚" },
                  { number: "∞", label: "Potential", desc: "Just getting started", icon: "🌟" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
                    <div className="font-semibold mb-1 text-sm sm:text-base">{stat.label}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{stat.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMPLETE VISION & FUTURE SECTION */}
        <section id="vision" className="py-16 sm:py-20 px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              My <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Vision</span>
            </motion.h2>

            <motion.div 
              className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.p 
                className="text-lg sm:text-xl leading-relaxed text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <strong className="text-blue-400">I'm building toward a future</strong> where I combine AI-native development skills 
                with deep technical knowledge to become a <strong className="text-purple-400">unique hybrid developer</strong>.
              </motion.p>
              
              <motion.p 
                className="text-base sm:text-lg leading-relaxed text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                The future of development isn't just about traditional coding or just about AI — 
                it's about <strong className="text-pink-400">creative humans who can think logically, ask the right questions, 
                and leverage AI as a powerful development partner</strong>.
              </motion.p>

              <motion.div
                className="pt-6 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-400">What's Next?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    {
                      icon: "📚",
                      title: "Deep Learning",
                      desc: "Mastering traditional development skills to complement my AI-native abilities",
                      timeline: "Next 6 months"
                    },
                    {
                      icon: "🤝", 
                      title: "Community Building",
                      desc: "Connecting with other AI-native builders and sharing knowledge",
                      timeline: "Ongoing"
                    },
                    {
                      icon: "🚀",
                      title: "Bigger Projects", 
                      desc: "Taking on more complex challenges that push my creative problem-solving",
                      timeline: "2025 Goal"
                    },
                    {
                      icon: "🌟",
                      title: "Inspiring Others",
                      desc: "Showing that you don't need traditional paths to build amazing things",
                      timeline: "Mission"
                    }
                  ].map((goal, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 rounded-xl p-4 border border-white/10 text-left relative overflow-hidden group"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xl sm:text-2xl">{goal.icon}</div>
                          <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full">
                            {goal.timeline}
                          </span>
                        </div>
                        <h4 className="font-semibold text-purple-400 mb-1 text-sm sm:text-base">{goal.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-400">{goal.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Vision Statement */}
              <motion.div
                className="pt-6 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-pink-400">My Core Belief</h3>
                <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-white/10">
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed italic">
                    "The most powerful applications will be built by humans who understand both the art of problem-solving 
                    and the science of AI collaboration. I'm not just learning to code — I'm learning to think, 
                    to question, and to create solutions that matter."
                  </p>
                  <div className="text-right mt-4 text-blue-400 font-semibold">— Adelli Rahul Reddy</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* COMPLETE CONTACT SECTION - FIXED */}
        <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Let's <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Connect</span>
            </motion.h2>

            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                Ready to build something <span className="text-blue-400">different</span> together?
              </h3>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Whether you're curious about AI-native development, need a creative problem solver, 
                or want to collaborate on innovative projects — I'd love to hear from you.
              </p>
            </motion.div>

            {/* Enhanced Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {[
                { 
                  icon: Phone, 
                  title: "Phone", 
                  info: "+91 7032784208",
                  color: "blue",
                  href: "tel:+917032784208",
                  description: "Let's discuss your next AI-powered project",
                  availability: "Available 9 AM - 6 PM IST"
                },
                { 
                  icon: Mail, 
                  title: "Email", 
                  info: "adelli.rahulreddy833@gmail.com",
                  color: "purple",
                  href: "mailto:adelli.rahulreddy833@gmail.com", 
                  description: "I respond within 24 hours",
                  availability: "Best for detailed discussions"
                },
                { 
                  icon: MapPin, 
                  title: "Location", 
                  info: "Hyderabad, India",
                  color: "pink",
                  href: "#",
                  description: "Open to remote collaboration",
                  availability: "Global project experience"
                }
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  className="group bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 text-center hover:bg-white/10 transition-all block relative overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${contact.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <motion.div
                      className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-${contact.color}-400/20 rounded-full flex items-center justify-center border border-${contact.color}-400/30 group-hover:border-${contact.color}-400/50 transition-colors`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <contact.icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${contact.color}-400`} />
                    </motion.div>
                    
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{contact.title}</h3>
                    <p className={`text-${contact.color}-400 mb-2 font-medium text-sm sm:text-base`}>{contact.info}</p>
                    <p className="text-xs sm:text-sm text-gray-400 mb-1">{contact.description}</p>
                    <p className="text-xs text-gray-500">{contact.availability}</p>
                  </div>
                               </motion.a>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <motion.a 
                href="https://wa.me/917032784208"
                target="_blank"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                💬 Let's Chat About AI-Powered Development
              </motion.a>
            </div>
          </div>
        </section>

        {/* Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg z-40"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10 bg-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400 mb-6">
              © 2025 Adelli Rahul Reddy. Built with AI as my co-developer, creativity as my compass, and authenticity as my foundation.
            </p>
            <div className="flex justify-center gap-6">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "mailto:adelli.rahulreddy833@gmail.com", label: "Email" }
              ].map(({ icon: Icon, href, label }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                  title={label}
                >
                  <Icon className="w-5 h-5 text-gray-400" />
                </motion.a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// Enhanced Typewriter Component
function AdvancedTypewriter({ texts }: { texts: string[] }) {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex]
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1))
      } else {
        setCurrentText(current.substring(0, currentText.length + 1))
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setCurrentIndex((currentIndex + 1) % texts.length)
      }
    }, isDeleting ? 50 : 150)

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts])

  return (
    <span className="relative">
      {currentText}
      <motion.span
        className="inline-block ml-1 w-0.5 h-6 sm:h-8 bg-blue-400"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  )
}

// Optimized Particle Background Component
function OptimizedParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particleCount = window.innerWidth < 768 ? 15 : 30
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    const colors = ['rgba(100, 181, 246, ', 'rgba(147, 51, 234, ', 'rgba(236, 72, 153, ']
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + particle.opacity + ')'
        ctx.fill()
      })

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = particle.color + '0.05)'
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  )
}

