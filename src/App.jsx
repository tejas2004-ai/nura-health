import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Activity, ArrowRight, Calendar, Check, Cpu, Heart, 
  Menu, Shield, X, ArrowUpRight, Monitor, Clock, Play, 
  RotateCcw, Save, Server, Sparkles, CheckCircle2 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Custom Magnetic Button Component with Sliding Background Hover Effect
const MagneticButton = ({ children, className = '', onClick, variant = 'clay' }) => {
  const btnRef = useRef(null);

  const slideBgColor = 
    variant === 'clay' ? 'bg-moss' : 
    variant === 'moss' ? 'bg-clay' : 
    'bg-charcoal';

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`btn-magnetic btn-slide group relative px-6 py-3 rounded-full font-outfit font-medium text-xs md:text-sm tracking-wider uppercase transition-all duration-300 ${className}`}
    >
      <span className={`slide-bg ${slideBgColor} absolute inset-0 w-full h-full left-0 top-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-x-0`} />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

// ----------------------------------------------------
// FEATURE CARD 1: DIAGNOSTIC SHUFFLER
// ----------------------------------------------------
const DiagnosticShuffler = () => {
  const [cards, setCards] = useState([
    { id: 0, title: 'Hormonal Biomarkers', value: '98.2 pg/mL', status: 'Optimal', trend: 'STABLE', metric: 'Cortisol/DHEA ratio' },
    { id: 1, title: 'Metabolic Velocity', value: '4.2 mmol/L', status: 'Optimal', trend: 'STEADY', metric: 'Blood glucose variance' },
    { id: 2, title: 'Epigenetic Drift Rate', value: 'Δ -0.04 yrs/yr', status: 'Decelerating', trend: 'IMPROVING', metric: 'DNA methylation speed' }
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="relative w-full h-[220px] flex items-center justify-center mt-6">
      {cards.map((card, index) => {
        const diff = (index - activeIndex + cards.length) % cards.length;
        
        // Compute style based on stack position
        let zIndex = 30 - diff * 10;
        let scale = 1 - diff * 0.08;
        let translateY = diff * -16;
        let opacity = 1 - diff * 0.25;

        return (
          <div
            key={card.id}
            style={{
              zIndex,
              transform: `translateY(${translateY}px) scale(${scale})`,
              opacity
            }}
            className="absolute w-full max-w-[280px] p-5 bg-cream-light border border-moss/10 rounded-2xl shadow-xl hover-lift transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-clay font-semibold bg-clay/10 px-2 py-0.5 rounded">
                BIO-METRIC {card.id + 1}
              </span>
              <span className="flex items-center gap-1 font-mono text-[9px] text-moss font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
                {card.trend}
              </span>
            </div>
            <h4 className="font-outfit font-bold text-[#1A1A1A] text-lg text-left mt-2">
              {card.title}
            </h4>
            <div className="flex justify-between items-baseline mt-4 border-t border-moss/5 pt-3">
              <span className="font-mono font-bold text-xl text-moss">
                {card.value}
              </span>
              <span className="font-outfit text-xs text-moss/70 italic">
                {card.status}
              </span>
            </div>
            <p className="font-mono text-[10px] text-moss/50 text-left mt-1">
              {card.metric}
            </p>
          </div>
        );
      })}
    </div>
  );
};

// ----------------------------------------------------
// FEATURE CARD 2: TELEMETRY TYPEWRITER
// ----------------------------------------------------
const TelemetryTypewriter = () => {
  const messages = [
    'Recalculating biological age baseline...',
    'DNA methylation sequencing verified.',
    'Epigenetic markers indicate stable trajectory.',
    'System: Mitochondrial activity optimized (98.4%).'
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullText = messages[currentMessageIndex];

    if (!isDeleting) {
      if (displayedText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, 40);
      } else {
        // Wait at the end of the text
        timer = setTimeout(() => setIsDeleting(true), 2500);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 15);
      } else {
        setIsDeleting(false);
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentMessageIndex]);

  return (
    <div className="w-full bg-charcoal p-5 rounded-2xl border border-moss/20 shadow-xl flex flex-col justify-between h-[220px] text-left mt-6 font-mono">
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <span className="text-[10px] text-white/50 tracking-wider flex items-center gap-1.5 uppercase font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-ping" />
          Live Telemetry Feed
        </span>
        <span className="text-[9px] text-[#39ff14]">NURA-CORE V2.8</span>
      </div>
      <div className="flex-1 flex items-center py-4">
        <p className="text-cream-light text-xs md:text-sm leading-relaxed min-h-[48px]">
          &gt; {displayedText}
          <span className="inline-block w-1.5 h-4 ml-1 bg-clay animate-pulse" />
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-2 text-[9px] text-white/35">
        <div>
          <span className="block font-sans text-[8px] text-white/20 uppercase">Core Load</span>
          <span>14.8 Tflops</span>
        </div>
        <div>
          <span className="block font-sans text-[8px] text-white/20 uppercase">Confidence</span>
          <span>99.98%</span>
        </div>
        <div>
          <span className="block font-sans text-[8px] text-white/20 uppercase">Encryption</span>
          <span>256-bit SHA</span>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// FEATURE CARD 3: CURSOR PROTOCOL SCHEDULER
// ----------------------------------------------------
const CursorProtocolScheduler = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Loop timeline simulating automated workflow selection
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      tl.set(cursorRef.current, { xPercent: -50, yPercent: -50, x: 250, y: 150, opacity: 0 })
        // Step 1: Fade-in and hover to 'W' cell (index 3)
        // Approximate relative coordinates for W cell: x: ~120px, y: ~60px
        .to(cursorRef.current, { opacity: 1, duration: 0.4 })
        .to(cursorRef.current, { x: 130, y: 65, duration: 1.2, ease: 'power2.out' })
        // Step 2: Perform click
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .call(() => setSelectedDay('W'))
        // Step 3: Move to Save button
        // Approximate relative coordinates for Save button: x: ~140px, y: ~155px
        .to(cursorRef.current, { x: 140, y: 155, duration: 1, ease: 'power2.inOut', delay: 0.5 })
        // Step 4: Click Save
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .call(() => setIsSaved(true))
        // Step 5: Fade out
        .to(cursorRef.current, { opacity: 0, duration: 0.4, delay: 0.8 })
        // Pause and reset
        .to({}, { duration: 1 })
        .call(() => {
          setSelectedDay(null);
          setIsSaved(false);
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[220px] bg-cream-light border border-moss/10 rounded-2xl shadow-xl p-5 flex flex-col justify-between scheduler-interactive overflow-hidden mt-6"
    >
      {/* Animated SVG Cursor */}
      <svg
        ref={cursorRef}
        className="absolute w-5 h-5 text-clay fill-current pointer-events-none z-50 transition-transform duration-75"
        viewBox="0 0 24 24"
        style={{ top: 0, left: 0, opacity: 0 }}
      >
        <path d="M4.5 3V17L9.2 12.3L14.7 21L17.5 19.3L12.2 10.7L17.7 10.7L4.5 3Z" />
      </svg>

      <div className="flex justify-between items-center">
        <span className="font-mono text-[9px] uppercase tracking-widest text-moss/50 font-bold">
          Active Protocol Schedule
        </span>
        <Calendar className="w-4 h-4 text-moss/40" />
      </div>

      {/* Grid of days */}
      <div className="flex justify-between gap-1 mt-4">
        {days.map((day, idx) => {
          // Wednesday is selected
          const isW = day === 'W' && idx === 3;
          const isSelected = selectedDay === 'W' && isW;
          return (
            <div
              key={idx}
              className={`flex-1 aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-mono font-bold transition-all duration-300 border ${
                isSelected
                  ? 'bg-clay text-cream border-clay shadow-md'
                  : 'bg-cream text-moss/70 border-moss/5'
              }`}
            >
              <span>{day}</span>
              {isSelected && <span className="w-1 h-1 rounded-full bg-cream mt-0.5" />}
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-center mt-4 z-10">
        <div
          className={`w-full max-w-[180px] py-2 rounded-full font-outfit text-[10px] tracking-wider uppercase text-center font-bold border transition-all duration-500 flex items-center justify-center gap-1.5 ${
            isSaved
              ? 'bg-moss text-cream border-moss shadow-md'
              : 'bg-transparent text-moss border-moss/20'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Protocol Locked
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              Lock Cellular Shift
            </>
          )}
        </div>
      </div>
    </div>
  );
};


// ----------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const philosophyRef = useRef(null);

  // Monitor Scroll for Navbar Morphing
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrances and Manifesto reveal animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrances
      gsap.fromTo(
        '.hero-fade-up',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
      );

      // 2. Features Cards on Scroll
      gsap.fromTo(
        '.features-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#features',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 3. Manifesto Reveal animation (SplitText word fade effect)
      gsap.fromTo(
        '.manifesto-text span',
        { opacity: 0.15, y: 5 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          scrollTrigger: {
            trigger: '.manifesto-container',
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: true
          }
        }
      );

      // 4. Stacking cards pinning & overlapping effects
      const protocolCards = gsap.utils.toArray('.protocol-card');
      protocolCards.forEach((card, index) => {
        if (index === protocolCards.length - 1) return; // Skip last card
        const nextCard = protocolCards[index + 1];

        gsap.to(card, {
          scale: 0.9,
          filter: 'blur(15px)',
          opacity: 0.4,
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Handler for waitlist submit (mock action)
  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    alert('Thank you. You have been placed on the priority biological audit waitlist.');
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-clay selection:text-cream select-none overflow-x-hidden">
      
      {/* A. NAVBAR — "The Floating Island" */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500">
        <nav
          className={`flex items-center justify-between w-full max-w-5xl h-14 md:h-16 px-6 md:px-8 rounded-full border transition-all duration-500 ${
            scrolled
              ? 'bg-cream/80 backdrop-blur-xl border-moss/10 text-moss shadow-xl shadow-moss/5'
              : 'bg-transparent border-transparent text-cream-light'
          }`}
        >
          {/* Logo */}
          <a href="#hero" className="font-outfit font-black tracking-tight text-lg md:text-xl flex items-center gap-1.5 hover-lift">
            <Activity className="w-5 h-5 text-clay" />
            <span>NURA HEALTH</span>
          </a>

          {/* Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 font-outfit text-[11px] font-semibold tracking-wider uppercase">
            <a href="#features" className="hover:text-clay hover-lift">Overview</a>
            <a href="#philosophy" className="hover:text-clay hover-lift">Manifesto</a>
            <a href="#protocol" className="hover:text-clay hover-lift">Protocol</a>
            <a href="#pricing" className="hover:text-clay hover-lift">Membership</a>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <MagneticButton variant={scrolled ? 'clay' : 'moss'} className={scrolled ? 'bg-clay text-cream' : 'bg-cream text-charcoal'}>
              Join Waitlist
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1 hover-lift"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      <div 
        className={`fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between p-8 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="font-outfit font-black text-xl text-cream-light flex items-center gap-2">
            <Activity className="w-5 h-5 text-clay" />
            NURA HEALTH
          </span>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 text-cream-light hover-lift"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="flex flex-col gap-6 text-2xl font-outfit font-semibold text-cream-light uppercase tracking-wider text-left pl-4">
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-clay">Overview</a>
          <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="hover:text-clay">Manifesto</a>
          <a href="#protocol" onClick={() => setMobileMenuOpen(false)} className="hover:text-clay">Protocol</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-clay">Membership</a>
        </div>

        <div>
          <button 
            onClick={() => { setMobileMenuOpen(false); alert('Redirecting to waitlist...'); }}
            className="w-full py-4 bg-clay hover:bg-moss text-cream font-outfit font-bold rounded-full tracking-widest uppercase transition-all duration-300 shadow-lg"
          >
            Join Waitlist
          </button>
          <div className="text-[10px] text-white/30 font-mono mt-4 text-center">
            SYSTEM STATUS: OPERATIONAL
          </div>
        </div>
      </div>


      {/* B. HERO SECTION — "The Opening Shot" */}
      <section 
        id="hero"
        ref={heroRef}
        className="relative h-screen w-full flex items-end pb-16 md:pb-24 px-6 md:px-16 overflow-hidden bg-charcoal"
      >
        {/* Full-bleed forest image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920"
            alt="Organic Foliage Backdrop" 
            className="w-full h-full object-cover opacity-65 scale-105"
          />
          {/* Heavy gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-moss/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-transparent to-transparent" />
        </div>

        {/* Content layout pushed to bottom-left third */}
        <div className="relative z-10 w-full max-w-4xl text-left">
          <div className="hero-fade-up inline-flex items-center gap-1.5 px-3 py-1 bg-cream/10 backdrop-blur-md rounded-full border border-white/10 text-cream-light text-[10px] md:text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-clay" />
            Biological Optimization Platform
          </div>

          <h1 className="hero-fade-up font-outfit font-black text-4xl sm:text-6xl md:text-8xl tracking-tighter text-cream-light leading-[0.85] uppercase">
            Longevity is the
            <span className="block font-drama italic text-clay font-light text-5xl sm:text-7xl md:text-[9rem] tracking-tight leading-[0.9] mt-2 lowercase">
              blueprint.
            </span>
          </h1>

          <p className="hero-fade-up font-outfit text-sm md:text-base text-cream-light/75 max-w-md mt-6 leading-relaxed font-light">
            We bridge deep biological research with automated telemetry systems. 
            Unlock clinical precision therapeutics and map your cell lifecycle 
            with absolute telemetry control.
          </p>

          <div className="hero-fade-up mt-8 flex flex-wrap gap-4">
            <MagneticButton variant="clay" className="bg-clay text-cream px-8 py-4">
              Join the waitlist
            </MagneticButton>
            <a 
              href="#features" 
              className="inline-flex items-center gap-2 font-outfit font-semibold text-xs tracking-wider uppercase text-cream-light hover:text-clay transition-colors group px-4 py-4"
            >
              Explore Telemetry
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Bottom indicators */}
        <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-4 text-[10px] text-cream-light/40 font-mono">
          <span>COORDINATES: 35.6762° N, 139.6503° E</span>
          <span className="w-1.5 h-1.5 rounded-full bg-moss" />
          <span>V.01 // EXP_BLUEPRINT</span>
        </div>
      </section>


      {/* C. FEATURES — "Interactive Functional Artifacts" */}
      <section id="features" className="py-24 md:py-32 bg-cream text-charcoal px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Section Heading */}
          <div className="text-left max-w-2xl mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-clay font-bold">
              Functional Subsystems
            </span>
            <h2 className="font-outfit font-black text-3xl md:text-5xl uppercase tracking-tight text-moss mt-2">
              Autonomous Biological Diagnostics
            </h2>
            <p className="font-outfit text-sm md:text-base text-moss/75 mt-4 leading-relaxed font-light">
              Rather than static dashboards, our systems operate as functional micro-UIs, constantly shuffling profiles, typing signals, and automating scheduling protocols.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Card 1: Diagnostic Shuffler */}
            <div className="features-card bg-cream-light border border-moss/10 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between h-[450px]">
              <div>
                <div className="w-10 h-10 rounded-full bg-moss/5 border border-moss/10 flex items-center justify-center text-moss">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-outfit font-black text-xl uppercase tracking-tight text-moss mt-6">
                  Continuous Bio-Monitoring
                </h3>
                <p className="font-outfit text-xs text-moss/70 mt-2 leading-relaxed">
                  Real-time assay alignment. Track and observe endocrine markers, metabolic velocity, and molecular changes continuously.
                </p>
              </div>
              <DiagnosticShuffler />
            </div>

            {/* Card 2: Telemetry Typewriter */}
            <div className="features-card bg-cream-light border border-moss/10 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between h-[450px]">
              <div>
                <div className="w-10 h-10 rounded-full bg-moss/5 border border-moss/10 flex items-center justify-center text-moss">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-outfit font-black text-xl uppercase tracking-tight text-moss mt-6">
                  Predictive Longevity Index
                </h3>
                <p className="font-outfit text-xs text-moss/70 mt-2 leading-relaxed">
                  Deep intelligence analysis. Translates genomic stability, cellular repair ratios, and baseline drift into logical outputs.
                </p>
              </div>
              <TelemetryTypewriter />
            </div>

            {/* Card 3: Cursor Protocol Scheduler */}
            <div className="features-card bg-cream-light border border-moss/10 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between h-[450px]">
              <div>
                <div className="w-10 h-10 rounded-full bg-moss/5 border border-moss/10 flex items-center justify-center text-moss">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-outfit font-black text-xl uppercase tracking-tight text-moss mt-6">
                  Customized Cellular Therapy
                </h3>
                <p className="font-outfit text-xs text-moss/70 mt-2 leading-relaxed">
                  Precision scheduling protocols. Coordinate personalized metabolic infusions and cell-cycle corrections automatically.
                </p>
              </div>
              <CursorProtocolScheduler />
            </div>

          </div>
        </div>
      </section>


      {/* D. PHILOSOPHY — "The Manifesto" */}
      <section 
        id="philosophy" 
        ref={philosophyRef}
        className="relative py-32 md:py-48 bg-charcoal text-cream overflow-hidden px-6"
      >
        {/* Parallax texture background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1920"
            alt="Misty Woods Backdrop" 
            className="w-full h-full object-cover opacity-15 scale-105"
            style={{ transform: 'translateY(5%)' }} // Subtle layout offset
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto manifesto-container text-left flex flex-col gap-8">
          <span className="font-mono text-xs uppercase tracking-widest text-clay font-bold">
            The Manifesto
          </span>

          <div className="flex flex-col gap-12 max-w-4xl">
            {/* Standard Approach */}
            <div className="text-left">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 block mb-2">
                Conventional Philosophy
              </span>
              <p className="font-outfit text-lg md:text-2xl text-cream-dark/60 font-light leading-relaxed max-w-2xl">
                Most clinical systems focus on: diagnosing and treating cellular pathology after symptoms appear. They reactionarily patch failure states.
              </p>
            </div>

            {/* Our Differentiated Approach */}
            <div className="text-left mt-4 border-l border-clay/35 pl-6 md:pl-10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-clay block mb-2">
                Autonomous Optimization
              </span>
              <h3 className="manifesto-text font-outfit text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight uppercase leading-[0.95] text-cream-light">
                {"We focus on: decoding biological blueprints to prevent decay."
                  .split(' ')
                  .map((word, idx) => {
                    const isKey = word.toLowerCase().includes('biological') || word.toLowerCase().includes('blueprints') || word.toLowerCase().includes('prevent');
                    return (
                      <span 
                        key={idx} 
                        className={`inline-block mr-3 md:mr-4 transition-all duration-300 ${
                          isKey ? 'font-drama italic text-clay font-normal lowercase' : ''
                        }`}
                      >
                        {word}
                      </span>
                    );
                  })
                }
              </h3>
            </div>
          </div>
        </div>
      </section>


      {/* E. PROTOCOL — "Sticky Stacking Archive" */}
      <section id="protocol" className="py-24 bg-cream text-charcoal px-6 md:px-16 relative">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-left mb-16 md:mb-24">
            <span className="font-mono text-xs uppercase tracking-widest text-clay font-bold">
              Systematic Methodologies
            </span>
            <h2 className="font-outfit font-black text-3xl md:text-5xl uppercase tracking-tight text-moss mt-2">
              The Protocol Suite
            </h2>
            <p className="font-outfit text-sm md:text-base text-moss/75 mt-4 max-w-xl font-light">
              A sequential program that integrates molecular indexing with target therapies. Experience a stacking, tactile progression through our clinical timeline.
            </p>
          </div>

          {/* Stacking Containers */}
          <div className="relative space-y-12">
            
            {/* Card 1: Sequencing */}
            <div className="protocol-card sticky top-24 min-h-[400px] md:min-h-[480px] bg-[#E5E2D5] border border-moss/10 rounded-[2.5rem] shadow-xl p-8 md:p-12 flex flex-col md:flex-row justify-between gap-8 items-start md:items-center overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-5">
                <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="relative z-10 max-w-md text-left flex flex-col h-full justify-between">
                <div>
                  <span className="font-mono text-xs text-clay font-bold tracking-widest block uppercase mb-4">
                    PHASE 01 // INTERFACE
                  </span>
                  <h3 className="font-outfit font-black text-3xl md:text-4xl text-moss uppercase tracking-tight leading-none">
                    Molecular Sequencing
                  </h3>
                  <p className="font-outfit text-sm text-moss/80 mt-6 leading-relaxed font-light">
                    Full genome sequencing, metabolomics baseline establishment, and deep sequencing of biological clocks. We map out 3 billion base pairs to uncover genetic liabilities and structural cellular drift.
                  </p>
                </div>
                <div className="mt-8 font-mono text-[10px] text-moss/40">
                  SYSTEM INPUT: BLOOD, SALIVA, EPIGENETIC SWAB
                </div>
              </div>
              <div className="relative z-10 w-full md:w-auto flex justify-center items-center">
                {/* Rotating SVG helix */}
                <div className="w-48 h-48 rounded-full bg-cream flex items-center justify-center shadow-inner border border-moss/5">
                  <svg className="w-32 h-32" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#2E4036" stroke-width="0.75" fill="none" stroke-dasharray="4 4" className="animate-[spin_35s_linear_infinite]" />
                    <circle cx="50" cy="50" r="30" stroke="#CC5833" stroke-width="1.5" fill="none" stroke-dasharray="10 5" className="animate-[spin_18s_linear_infinite_reverse]" />
                    <circle cx="50" cy="50" r="20" stroke="#2E4036" stroke-width="0.5" fill="none" />
                    <g className="animate-[spin_10s_linear_infinite]">
                      <circle cx="50" cy="10" r="5" fill="#CC5833" />
                      <circle cx="50" cy="90" r="5" fill="#CC5833" />
                    </g>
                    <g className="animate-[spin_6s_linear_infinite_reverse]">
                      <circle cx="20" cy="50" r="3" fill="#2E4036" />
                      <circle cx="80" cy="50" r="3" fill="#2E4036" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2: Tracking */}
            <div className="protocol-card sticky top-28 min-h-[400px] md:min-h-[480px] bg-[#DFDBD0] border border-moss/10 rounded-[2.5rem] shadow-xl p-8 md:p-12 flex flex-col md:flex-row justify-between gap-8 items-start md:items-center overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-5">
                <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="relative z-10 max-w-md text-left flex flex-col h-full justify-between">
                <div>
                  <span className="font-mono text-xs text-clay font-bold tracking-widest block uppercase mb-4">
                    PHASE 02 // LOGIC
                  </span>
                  <h3 className="font-outfit font-black text-3xl md:text-4xl text-moss uppercase tracking-tight leading-none">
                    Telemetry Tracking
                  </h3>
                  <p className="font-outfit text-sm text-moss/80 mt-6 leading-relaxed font-light">
                    Continuous monitoring systems track inflammatory markers, cellular oxidation levels, and hormone balance in real time. Advanced machine intelligence models compile observations to predict rate of decay.
                  </p>
                </div>
                <div className="mt-8 font-mono text-[10px] text-moss/40">
                  SYSTEM INPUT: TRANS-DERMAL BIO-WEARABLES & RECURRING ASSAYS
                </div>
              </div>
              <div className="relative z-10 w-full md:w-auto flex justify-center items-center">
                {/* Laser scan grid */}
                <div className="w-48 h-48 rounded-full bg-cream flex items-center justify-center shadow-inner border border-moss/5 overflow-hidden relative">
                  <svg viewBox="0 0 100 100" className="w-28 h-28 relative">
                    <g fill="#2E4036" opacity="0.2">
                      <circle cx="20" cy="20" r="3" /> <circle cx="40" cy="20" r="3" /> <circle cx="60" cy="20" r="3" /> <circle cx="80" cy="20" r="3" />
                      <circle cx="20" cy="40" r="3" /> <circle cx="40" cy="40" r="3" /> <circle cx="60" cy="40" r="3" /> <circle cx="80" cy="40" r="3" />
                      <circle cx="20" cy="60" r="3" /> <circle cx="40" cy="60" r="3" /> <circle cx="60" cy="60" r="3" /> <circle cx="80" cy="60" r="3" />
                      <circle cx="20" cy="80" r="3" /> <circle cx="40" cy="80" r="3" /> <circle cx="60" cy="80" r="3" /> <circle cx="80" cy="80" r="3" />
                    </g>
                    {/* Scanning Laser Line */}
                    <g className="animate-scan">
                      <line x1="10" y1="10" x2="90" y2="10" stroke="#CC5833" stroke-width="2.5" />
                      <line x1="10" y1="10" x2="90" y2="10" stroke="#CC5833" stroke-width="6" opacity="0.3" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3: Therapy */}
            <div className="protocol-card sticky top-32 min-h-[400px] md:min-h-[480px] bg-[#D7D2C4] border border-moss/10 rounded-[2.5rem] shadow-xl p-8 md:p-12 flex flex-col md:flex-row justify-between gap-8 items-start md:items-center overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-5">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="relative z-10 max-w-md text-left flex flex-col h-full justify-between">
                <div>
                  <span className="font-mono text-xs text-clay font-bold tracking-widest block uppercase mb-4">
                    PHASE 03 // ACTION
                  </span>
                  <h3 className="font-outfit font-black text-3xl md:text-4xl text-moss uppercase tracking-tight leading-none">
                    Targeted Cellular Shift
                  </h3>
                  <p className="font-outfit text-sm text-moss/80 mt-6 leading-relaxed font-light">
                    Targeted rejuvenation infusions and cell repair protocols are deployed. Tailored amino formulas, senolytic agents, and mitochondrial peptides correct biological course and lock in optimized health.
                  </p>
                </div>
                <div className="mt-8 font-mono text-[10px] text-moss/40">
                  SYSTEM OUTPUT: TARGETED THERAPY INFUSIONS & REPAIR PEPTIDES
                </div>
              </div>
              <div className="relative z-10 w-full md:w-auto flex justify-center items-center">
                {/* Waveform graphic */}
                <div className="w-48 h-48 rounded-full bg-cream flex items-center justify-center shadow-inner border border-moss/5">
                  <svg className="w-36 h-36" viewBox="0 0 200 100">
                    {/* Grid Lines */}
                    <line x1="10" y1="50" x2="190" y2="50" stroke="#2E4036" stroke-width="0.5" stroke-dasharray="3 3" opacity="0.3" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="#2E4036" stroke-width="0.5" stroke-dasharray="3 3" opacity="0.3" />
                    <line x1="100" y1="10" x2="100" y2="90" stroke="#2E4036" stroke-width="0.5" stroke-dasharray="3 3" opacity="0.3" />
                    <line x1="150" y1="10" x2="150" y2="90" stroke="#2E4036" stroke-width="0.5" stroke-dasharray="3 3" opacity="0.3" />
                    
                    {/* EKG Path */}
                    <path
                      d="M 10 50 L 60 50 L 70 30 L 80 75 L 90 40 L 100 50 L 120 50 L 125 15 L 132 85 L 140 45 L 145 50 L 190 50"
                      fill="none"
                      stroke="#CC5833"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="animate-ekg"
                    />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* F. MEMBERSHIP / PRICING */}
      <section id="pricing" className="py-24 md:py-32 bg-cream-dark text-charcoal px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <span className="font-mono text-xs uppercase tracking-widest text-clay font-bold">
              Membership Architecture
            </span>
            <h2 className="font-outfit font-black text-3xl md:text-5xl uppercase tracking-tight text-moss mt-2">
              Select Your Access Tier
            </h2>
            <p className="font-outfit text-sm text-moss/70 mt-4 font-light">
              Every membership unlocks advanced cellular diagnostics, continuous baseline assessments, and direct access to longevity clinical specialists.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Card 1: Essential */}
            <div className="bg-cream-light border border-moss/10 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between hover-lift">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-moss/45 font-bold">
                  TIER 01 // INTEGRATION
                </span>
                <h3 className="font-outfit font-black text-2xl uppercase tracking-tight text-moss mt-3">
                  Essential Access
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-extrabold text-moss">$199</span>
                  <span className="font-outfit text-xs text-moss/60">/ Month</span>
                </div>
                <p className="font-outfit text-xs text-moss/70 mt-4 leading-relaxed font-light">
                  Continuous tracking and biological profiling. For individuals starting their preventative mapping.
                </p>
                
                <ul className="mt-8 space-y-3 font-outfit text-xs text-moss/80 border-t border-moss/5 pt-6 text-left">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    Bi-Annual Diagnostic Assay
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    Core Longevity Metrics Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    Automated Digital Health Dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    Priority Waitlist Access
                  </li>
                </ul>
              </div>
              <button className="w-full mt-10 py-3 rounded-full font-outfit text-xs font-bold uppercase tracking-wider border border-moss/20 text-moss hover:bg-moss hover:text-cream transition-all duration-300">
                Initiate Essential
              </button>
            </div>

            {/* Card 2: Performance (Pops Out) */}
            <div className="bg-moss text-cream-light border border-moss rounded-[2.25rem] p-8 md:p-10 shadow-2xl relative flex flex-col justify-between hover-lift scale-[1.02] ring-2 ring-clay/20 z-10">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-clay text-cream text-[9px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                RECOMMENDED
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-clay font-bold">
                  TIER 02 // PERFORMANCE
                </span>
                <h3 className="font-outfit font-black text-3xl uppercase tracking-tight text-cream mt-3">
                  Optimal Matrix
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-extrabold text-clay">$499</span>
                  <span className="font-outfit text-xs text-cream-dark/60">/ Month</span>
                </div>
                <p className="font-outfit text-xs text-cream-light/75 mt-4 leading-relaxed font-light">
                  Full molecular telemetry sequence + targeted cellular infusions. The definitive choice for dedicated biological optimization.
                </p>

                <ul className="mt-8 space-y-3 font-outfit text-xs text-cream-light/90 border-t border-cream-light/10 pt-6 text-left">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    Quarterly Deep Genetic & Assay Audits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    Dynamic Cellular Shift Infusion Plans
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    Continuous Hormonal Wearable Telemetry
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    Dedicated Longevity Clinician Direct Line
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    Next-Day Peptide Delivery
                  </li>
                </ul>
              </div>
              <div className="mt-10">
                <MagneticButton variant="moss" className="bg-clay text-cream w-full py-4 text-center justify-center font-bold">
                  Initiate Performance
                </MagneticButton>
              </div>
            </div>

            {/* Card 3: Enterprise */}
            <div className="bg-cream-light border border-moss/10 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between hover-lift">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-moss/45 font-bold">
                  TIER 03 // TRANSCENDENCE
                </span>
                <h3 className="font-outfit font-black text-2xl uppercase tracking-tight text-moss mt-3">
                  Sovereign Cell
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-extrabold text-moss">$1,499</span>
                  <span className="font-outfit text-xs text-moss/60">/ Month</span>
                </div>
                <p className="font-outfit text-xs text-moss/70 mt-4 leading-relaxed font-light">
                  A bespoke biology architecture. Concierge clinical lab integration, customized epigenetic therapy arrays, and executive-level service.
                </p>

                <ul className="mt-8 space-y-3 font-outfit text-xs text-moss/80 border-t border-moss/5 pt-6 text-left">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    Monthly Full-Spectrum Epigenetic Audits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    Custom Engineered Autologous Cell Assays
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    In-Home Clinical Nurse Service
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-clay" />
                    24/7 Global Clinical Advisory Panel
                  </li>
                </ul>
              </div>
              <button className="w-full mt-10 py-3 rounded-full font-outfit text-xs font-bold uppercase tracking-wider border border-moss/20 text-moss hover:bg-moss hover:text-cream transition-all duration-300">
                Initiate Sovereign
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* G. FOOTER */}
      <footer className="bg-charcoal text-cream-dark pt-20 pb-12 px-6 md:px-16 rounded-t-[3.5rem] md:rounded-t-[4rem] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/5">
            
            {/* Column 1: Brand */}
            <div className="md:col-span-2 text-left">
              <a href="#hero" className="font-outfit font-black tracking-tight text-xl text-cream-light flex items-center gap-1.5 mb-4 hover-lift">
                <Activity className="w-5 h-5 text-clay" />
                NURA HEALTH
              </a>
              <p className="font-outfit text-xs text-white/50 max-w-sm leading-relaxed font-light">
                Nura Health designs, builds, and operates clinical longevity systems. We synthesize biological intelligence and molecular logic, enabling optimal cell-cycle preservation.
              </p>
              
              {/* Newsletter Waitlist */}
              <form onSubmit={handleWaitlistSubmit} className="mt-6 flex max-w-sm bg-white/5 border border-white/10 rounded-full p-1">
                <input 
                  type="email" 
                  required
                  placeholder="Enter email for telemetry digest" 
                  className="bg-transparent text-cream-light placeholder-white/20 font-mono text-[10px] uppercase tracking-wider px-4 py-2 flex-1 focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="bg-clay hover:bg-moss text-cream font-outfit text-[9px] uppercase tracking-widest font-black px-4 rounded-full transition-colors duration-300"
                >
                  Join Waitlist
                </button>
              </form>
            </div>

            {/* Column 2: Index */}
            <div className="text-left font-outfit text-xs space-y-3">
              <h4 className="font-mono text-[10px] text-white/20 uppercase tracking-widest font-semibold">
                SYSTEMS
              </h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-clay">Bio-Telemetry</a></li>
                <li><a href="#features" className="hover:text-clay">Assay Sequencing</a></li>
                <li><a href="#features" className="hover:text-clay">Metabolic Locks</a></li>
                <li><a href="#features" className="hover:text-clay">Index Calculations</a></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="text-left font-outfit text-xs space-y-3">
              <h4 className="font-mono text-[10px] text-white/20 uppercase tracking-widest font-semibold">
                PLATFORM
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-clay">Documentation</a></li>
                <li><a href="#" className="hover:text-clay">Methodology</a></li>
                <li><a href="#" className="hover:text-clay">Clinical Safety</a></li>
                <li><a href="#" className="hover:text-clay">Privacy Protocol</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
            
            {/* Pulsing Green status indicator */}
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#39ff14]/75 bg-[#39ff14]/5 border border-[#39ff14]/20 px-3 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39ff14] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39ff14]" />
              </span>
              <span>SYSTEM STATUS: OPERATIONAL</span>
            </div>

            <div className="font-mono text-[9px] text-white/20 uppercase">
              © 2026 Nura Health Corp. All Molecular Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
