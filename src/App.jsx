import React, { useState } from 'react'; // Added useState import
import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, CheckCircle, Calendar, Star, Zap, Target, Award } from 'lucide-react';
import {Menu, X } from "lucide-react";

// --- SHARED CONFIGURATION ---
const whatsappNumber = "2348080821226";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Royal%20Smile,%20I%20would%20like%20to%20book%20a%20consultation.`;

// --- ANIMATION VARIANTS ---
const fadeInUp = {
hidden: { opacity: 0, y: 40 },
visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
hidden: { opacity: 0 },
visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// --- SUB-COMPONENT: FOOTER ---
const Footer = () => {
return (
<footer className="bg-[#0a0f1a] text-white pt-20 pb-10 relative overflow-hidden">
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
<div className="container mx-auto px-6">
<div className="grid md:grid-cols-3 gap-16 mb-16">
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
<div className="flex items-center gap-3 justify-center md:justify-start">
<img src="/logo.png" alt="Logo" className="w-12 h-12 brightness-110 rounded-full" />
<h4 className="text-3xl font-extrabold tracking-tight text-white">Royal<span className="text-blue-500">Smile</span></h4>
</div>
<p className="text-gray-400 text-lg text-center md:text-left">Clinical Excellence. Mobile Convenience. Bringing the future of dental care to your doorstep.</p>
</motion.div>

<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6 text-center md:text-left">
<h5 className="text-blue-500 font-bold uppercase tracking-widest text-sm">Get In Touch</h5>
<div className="space-y-4">
<a href="tel:08080821226" className="flex items-center justify-center md:justify-start gap-4 text-gray-300 hover:text-white transition-colors group">
<div className="p-3 bg-gray-800 rounded-xl group-hover:bg-blue-600 transition-colors"><Phone size={20} /></div>
<span className="text-lg font-medium">08080821226</span>
</a>
<a href="mailto:royalsmile@gmail.com" className="flex items-center justify-center md:justify-start gap-4 text-gray-300 hover:text-white transition-colors group">
<div className="p-3 bg-gray-800 rounded-xl group-hover:bg-blue-600 transition-colors"><Mail size={20} /></div>
<span className="text-lg font-medium">royalsmile@gmail.com</span>
</a>
</div>
</motion.div>

<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="space-y-6 text-center md:text-left">
<h5 className="text-blue-500 font-bold uppercase tracking-widest text-sm">Follow the Journey</h5>
<div className="flex items-center justify-center md:justify-start gap-4">
{[
{ icon: <Instagram size={24} />, link: "https://instagram.com/royalsmile" },
{ icon: <div className="font-bold text-lg">f</div>, link: "https://facebook.com/royalsmile" },
{ icon: <Phone size={24} />, link: whatsappLink },
{ icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-1.13-.32-2.34-.14-3.33.44-.97.57-1.63 1.54-1.77 2.65-.12 1.02.2 2.06.87 2.85.67.81 1.66 1.31 2.69 1.4 1.25.12 2.54-.43 3.32-1.4.67-.84.99-1.92.93-2.99-.05-3.63-.01-7.26-.01-10.88z"/></svg>, link: "https://www.tiktok.com/@royalsmile529?_r=1&_t=ZS-93c9PdNB2jY" }
].map((social, index) => (
<motion.a key={index} href={social.link} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5, scale: 1.1 }} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:text-white transition-all">
{social.icon}
</motion.a>
))}
</div>
</motion.div>
</div>
<div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
<p>&copy; {new Date().getFullYear()} RoyalSmile Mobile Dental Care. All rights reserved.</p>
</div>
</div>
</footer>
);
};

// --- SUB-COMPONENT: SERVICE FLIP CARD ---
const ServiceFlipCard = ({ title, details }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      // Entrance animation for the card itself
      variants={fadeInUp}
      className="relative h-[420px] w-full perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)} // Essential for mobile tap
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 backface-hidden bg-white/90 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-xl border border-blue-50 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
            <CheckCircle size={40} />
          </div>
          <h4 className="text-2xl font-bold text-gray-900 mb-4">{title}</h4>
          <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full">
            {/* Dynamic text for mobile/desktop */}
            <span className="md:block hidden">Hover for Details</span>
            <span className="md:hidden block">Tap for Details</span>
          </p>
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 backface-hidden bg-blue-700 p-8 rounded-[2.5rem] shadow-2xl text-white flex flex-col justify-center text-left"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-blue-300 mb-1">
                <Zap size={16} />
                <span className="text-[10px] font-black uppercase tracking-tighter">The Procedure</span>
              </div>
              <p className="text-[13px] leading-relaxed opacity-90">{details.procedure}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-green-400 mb-1">
                <Target size={16} />
                <span className="text-[10px] font-black uppercase tracking-tighter">Goal</span>
              </div>
              <p className="text-[13px] leading-relaxed opacity-90">{details.goal}</p>
            </div>
            <div className="pt-4 border-t border-blue-500/50">
              <div className="flex items-center gap-2 text-blue-200 mb-1">
                <Award size={16} />
                <span className="text-[10px] font-black uppercase tracking-tighter">RoyalSmile Proficiency</span>
              </div>
              <p className="text-[12px] italic opacity-90">{details.proficiency}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


// --- MAIN APP COMPONENT ---
const App = () => {
  // 1. ALL STATES AT THE TOP
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const whatsappNumber = "2348080821226";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Royal%20Smile,%20I%20would%20like%20to%20book%20a%20consultation.`;

  // 2. ALL DATA ARRAYS
  const allServices = [
    { title: "Scaling & Polishing", details: { procedure: "Ultrasonic removal of plaque/calculus followed by stain-removal polishing.", goal: "Prevents gum disease and restores natural smoothness.", proficiency: "High-frequency portable tech ensures a pain-free office-grade clean." } },
    { title: "Teeth Whitening", details: { procedure: "Application of hydrogen peroxide gel activated by mobile LED light.", goal: "Brightens teeth by up to 8 shades in a single home session.", proficiency: "We use calibrated enamel-safe formulas for zero sensitivity." } },
    { title: "Gum Treatment", details: { procedure: "Deep cleaning and therapeutic scaling to target sub-gingival bacteria.", goal: "Stops bleeding, reduces inflammation, and prevents tooth loss.", proficiency: "Specialized clinical hygiene tools for thorough home care." } },
    { title: "Denture Services", details: { procedure: "Precision digital measurements and custom prosthetic fabrication.", goal: "Restores bite functionality and facial aesthetics.", proficiency: "Multiple home-fitting trials for a perfect 'Royal' fit." } },
    { title: "Braces / Ortho", details: { procedure: "Diagnostic alignment assessment and installation of corrective appliances.", goal: "Corrects bite issues and creates a straight smile.", proficiency: "Mobile monitoring ensures orthodontic progress without clinic trips." } },
    { title: "Dental Checkups", details: { procedure: "Comprehensive 20-point oral exam including cancer screening.", goal: "Early detection of decay and custom health roadmapping.", proficiency: "High-definition mobile cameras used for patient education." } },
    { title: "Oral Surgery", details: { procedure: "Minor extractions and localized surgical procedures.", goal: "Relieves pain and removes non-restorable infected teeth.", proficiency: "Sterile mobile environment meeting clinical safety standards." } },
    { title: "Free Consultations", details: { procedure: "Professional virtual or in-person assessment of oral needs.", goal: "Understand options and costs with zero pressure.", proficiency: "Transparent advice tailored to your lifestyle." } }
  ];

  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-blue-100">
      
      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto flex justify-between items-center p-4 md:px-10">
          
          {/* LOGO */}
          <div className="flex items-center gap-2 cursor-pointer min-w-fit">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-blue-50" 
            />
            <h1 className="text-xl md:text-2xl font-extrabold text-blue-700 tracking-tight">
              Royal<span className="text-gray-900">Smile</span>
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-10 font-bold text-gray-500">
            {[{ name: "About", link: "#about" }, { name: "Services", link: "#services" }, { name: "Results", link: "#gallery" }].map((item) => (
              <a key={item.name} href={item.link} className="hover:text-blue-600 transition-colors relative group">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full rounded-full"></span>
              </a>
            ))}
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-3">
            <a 
              href={whatsappLink} 
              className="bg-blue-600 text-white px-5 py-2 md:px-8 md:py-2.5 rounded-full font-bold text-xs md:text-sm shadow-lg hover:bg-blue-700 transition-all"
            >
              <span className="md:inline hidden">Book Appointment</span>
              <span className="md:hidden inline">Book Now</span>
            </a>

            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-700 transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6 font-bold text-gray-700">
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 text-lg border-b border-gray-50 pb-2">About</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 text-lg border-b border-gray-50 pb-2">Services</a>
              <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 text-lg border-b border-gray-50 pb-2">Results</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* --- HERO SECTION STARTS HERE --- */}

{/* --- HERO SECTION --- */}

<header className="relative h-[750px] flex items-center overflow-hidden">

  {/* Background Image with a Smooth Zoom Animation */}

  <motion.div 

    initial={{ scale: 1.1, opacity: 0 }}

    animate={{ scale: 1, opacity: 1 }}

    transition={{ duration: 1.5, ease: "easeOut" }}

    className="absolute inset-0 z-0"

  >

    <img 

      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000" 

      alt="Dentist and patient in a home setting" 

      className="w-full h-full object-cover"

    />

    {/* Refined Gradient Overlay for better readability */}

    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent"></div>

  </motion.div>



  <div className="container mx-auto px-6 relative z-10">

    <motion.div 

      initial="hidden"

      animate="visible"

      variants={{

        hidden: { opacity: 0 },

        visible: {

          opacity: 1,

          transition: {

            staggerChildren: 0.2, // This makes elements appear one after another

            delayChildren: 0.3

          }

        }

      }}

      className="max-w-2xl"

    >

      {/* 1. Badge Animation */}

      <motion.span 

        variants={{

          hidden: { opacity: 0, x: -20 },

          visible: { opacity: 1, x: 0 }

        }}

        className="inline-block text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 shadow-sm"

      >

        Mobile Dental Care

      </motion.span>



      {/* 2. Headline Animation */}

      <motion.h2 

        variants={{

          hidden: { opacity: 0, y: 30 },

          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }

        }}

        className="text-5xl md:text-7xl font-extrabold mt-6 leading-tight text-gray-900 tracking-tight"

      >

        A Royal Smile in the <br /> 

        <span className="text-blue-700">Comfort of Your Home.</span>

      </motion.h2>



      {/* 3. Paragraph Animation */}

      <motion.p 

        variants={{

          hidden: { opacity: 0, y: 20 },

          visible: { opacity: 1, y: 0 }

        }}

        className="mt-6 text-lg md:text-xl text-gray-600 font-medium leading-relaxed"

      >

        Experience clinical-grade dental care without leaving your living room. 

        Professional scaling, polishing, whitening, and more brought directly to your doorstep.

      </motion.p>



      {/* 4. Button Animation with a subtle "pulse" or hover pop */}

      <motion.div 

        variants={{

          hidden: { opacity: 0, scale: 0.8 },

          visible: { opacity: 1, scale: 1 }

        }}

        className="mt-10"

      >

        <motion.a 

          href={whatsappLink} 

          whileHover={{ scale: 1.05, boxShadow: "0px 20px 30px rgba(34, 197, 94, 0.3)" }}

          whileTap={{ scale: 0.95 }}

          className="inline-flex items-center gap-3 bg-green-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-green-600 transition-colors shadow-xl"

        >

          <Calendar size={24} /> 

          <span>Book Now via WhatsApp</span>

        </motion.a>

      </motion.div>

    </motion.div>

  </div>

</header>

{/* ABOUT & MISSION */}
<section id="about" className="py-20 bg-white">
<div className="container mx-auto px-6">
<motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="flex justify-center mb-16">
<div className="relative">
<div className="absolute -inset-4 bg-blue-100 rounded-full blur-2xl opacity-70"></div>
<img src="/smile.PNG" className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-8 border-white shadow-2xl" alt="Radiant Smile" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=800"; }} />
</div>
</motion.div>
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="grid md:grid-cols-2 gap-12">
<motion.div variants={fadeInUp} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 shadow-sm">
<h3 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-3"><span className="w-2 h-8 bg-blue-600 rounded-full"></span> About RoyalSmile</h3>
<p className="text-gray-600 text-lg">RoyalSmile Mobile Dental Care removes the "dentist office anxiety" by bringing elite clinical equipment to you.</p>
</motion.div>
<motion.div variants={fadeInUp} className="bg-blue-700 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
<h3 className="text-2xl font-bold mb-6 uppercase tracking-widest relative z-10">Our Mission</h3>
<p className="text-xl opacity-95 italic leading-relaxed relative z-10">"To restore confidence through premium oral hygiene services, utilizing state-of-the-art dental technology while maintaining a personal touch."</p>
</motion.div>
</motion.div>
</div>
</section>
{/* --- SERVICES SECTION --- */}

<section id="services" className="relative py-24 bg-gray-50 overflow-hidden">

  {/* Blended Background Image - Subtle animation */}

  <motion.div 

    initial={{ opacity: 0 }}

    whileInView={{ opacity: 0.05 }}

    transition={{ duration: 1.5 }}

    className="absolute inset-0 z-0 grayscale"

  >

    <img 

      src="https://images.unsplash.com/photo-1588776814546-1ffce47267a5?auto=format&fit=crop&q=80&w=2000" 

      className="w-full h-full object-cover" 

      alt="Background" 

    />

  </motion.div>



  <div className="container mx-auto px-6 relative z-10">

    <motion.div 

      initial={{ opacity: 0, y: 20 }}

      whileInView={{ opacity: 1, y: 0 }}

      viewport={{ once: true }}

      transition={{ duration: 0.6 }}

      className="text-center mb-16"

    >

      <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900">Clinical Procedures</h3>

      <p className="text-blue-600 font-bold uppercase tracking-widest mt-4">

        Professional Dental Care Brought to You

      </p>

    </motion.div>



    {/* The "Alive" Grid: Cards stagger in as you scroll */}

    <motion.div 

      variants={staggerContainer}

      initial="hidden"

      whileInView="visible"

      viewport={{ once: true, amount: 0.1 }} // Triggers when 10% of the section is visible

      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"

    >

      {allServices.map((service, index) => (

        <motion.div 

          key={index} 

          variants={fadeInUp}

          // Adding a hover lift effect to make individual cards feel responsive

          whileHover={{ y: -10 }} 

          className="w-full"

        >

          <ServiceFlipCard title={service.title} details={service.details} />

        </motion.div>

      ))}

    </motion.div>

  </div>

</section>



{/* GALLERY */}
<section id="gallery" className="py-24 bg-white overflow-hidden">
<div className="container mx-auto px-6">
<div className="text-center mb-16">
<h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Transformation Gallery</h3>
<p className="text-blue-600 uppercase tracking-widest">Real Results, Royal Smiles</p>
</div>
<div className="grid md:grid-cols-2 gap-12">
{/* Procedure 1 */}
<motion.div variants={fadeInUp} initial="hidden" whileInView="visible" className="bg-white p-6 rounded-[2rem] shadow-2xl border border-blue-50 overflow-hidden">
<h4 className="text-xl font-bold mb-6">Teeth Whitening</h4>
<div className="grid grid-cols-2 gap-6 relative">
<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-blue-100 rounded-full z-10 flex items-center justify-center shadow-sm text-blue-400 font-bold italic">VS</div>
<div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
<img src="/whitening b.jpg" className="w-full h-full object-cover" alt="Before" onError={(e) => { e.target.src = "https://placehold.co/400x300?text=Before"; }} />
<div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded">BEFORE</div>
</div>
<div className="rounded-2xl overflow-hidden aspect-[4/3] relative ring-4 ring-blue-500/20">
<img src="/whitening a.jpg" className="w-full h-full object-cover" alt="After" onError={(e) => { e.target.src = "https://placehold.co/400x300?text=After"; }} />
<div className="absolute bottom-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded">AFTER</div>
</div>
</div>
</motion.div>

{/* Procedure 2 */}
<motion.div variants={fadeInUp} initial="hidden" whileInView="visible" className="bg-white p-6 rounded-[2rem] shadow-2xl border border-blue-50 overflow-hidden">
<h4 className="text-xl font-bold mb-6">Scaling and Polishing</h4>
<div className="grid grid-cols-2 gap-6 relative">
<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-blue-100 rounded-full z-10 flex items-center justify-center shadow-sm text-blue-400 font-bold italic">VS</div>
<div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
<img src="/scaling b.jpg" className="w-full h-full object-cover" alt="Before" onError={(e) => { e.target.src = "https://placehold.co/400x300?text=Before"; }} />
<div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded">BEFORE</div>
</div>
<div className="rounded-2xl overflow-hidden aspect-[4/3] relative ring-4 ring-blue-500/20">
<img src="/scaling a.jpg" className="w-full h-full object-cover" alt="After" onError={(e) => { e.target.src = "https://placehold.co/400x300?text=After"; }} />
<div className="absolute bottom-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded">AFTER</div>
</div>
</div>
</motion.div>

{/* Procedure 3 */}
<motion.div variants={fadeInUp} initial="hidden" whileInView="visible" className="bg-white p-6 rounded-[2rem] shadow-2xl border border-blue-50 overflow-hidden">
<h4 className="text-xl font-bold mb-6">Denture</h4>
<div className="grid grid-cols-2 gap-6 relative">
<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-blue-100 rounded-full z-10 flex items-center justify-center shadow-sm text-blue-400 font-bold italic">VS</div>
<div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
<img src="/denture b.jpg" className="w-full h-full object-cover" alt="Before" onError={(e) => { e.target.src = "https://placehold.co/400x300?text=Before"; }} />
<div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded">BEFORE</div>
</div>
<div className="rounded-2xl overflow-hidden aspect-[4/3] relative ring-4 ring-blue-500/20">
<img src="/denture a.jpg" className="w-full h-full object-cover" alt="After" onError={(e) => { e.target.src = "https://placehold.co/400x300?text=After"; }} />
<div className="absolute bottom-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded">AFTER</div>
</div>
</div>
</motion.div>

{/* Procedure 4 */}
<motion.div variants={fadeInUp} initial="hidden" whileInView="visible" className="bg-white p-6 rounded-[2rem] shadow-2xl border border-blue-50 overflow-hidden">
<h4 className="text-xl font-bold mb-6">Composite Build-up</h4>
<div className="grid grid-cols-2 gap-6 relative">
<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-blue-100 rounded-full z-10 flex items-center justify-center shadow-sm text-blue-400 font-bold italic">VS</div>
<div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
<img src="/composite b.jpg" className="w-full h-full object-cover" alt="Before" onError={(e) => { e.target.src = "https://placehold.co/400x300?text=Before"; }} />
<div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded">BEFORE</div>
</div>
<div className="rounded-2xl overflow-hidden aspect-[4/3] relative ring-4 ring-blue-500/20">
<img src="/composite a.jpg" className="w-full h-full object-cover" alt="After" onError={(e) => { e.target.src = "https://placehold.co/400x300?text=After"; }} />
<div className="absolute bottom-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded">AFTER</div>
</div>
</div>
</motion.div>

</div>
</div>
</section>

{/* --- TESTIMONIALS --- */}

<section className="relative py-24 bg-blue-700 overflow-hidden">

  <div className="container mx-auto px-6 relative z-10">

    <motion.div 

      initial={{ opacity: 0, y: 30 }}

      whileInView={{ opacity: 1, y: 0 }}

      viewport={{ once: true }}

      className="text-center text-white mb-16"

    >

      <h3 className="text-4xl md:text-5xl font-extrabold mb-4">Patient Experiences</h3>

      <div className="w-24 h-1.5 bg-green-400 mx-auto rounded-full"></div>

    </motion.div>



    <motion.div 

      variants={staggerContainer}

      initial="hidden"

      whileInView="visible"

      viewport={{ once: true, amount: 0.2 }}

      className="grid md:grid-cols-2 gap-10"

    >

      {/* Review 1 */}

      <motion.div 

        variants={fadeInUp}

        whileHover={{ y: -10 }}

        className="bg-white p-10 rounded-[2.5rem] text-gray-800 shadow-2xl relative"

      >

        <span className="absolute top-6 right-10 text-8xl text-blue-50 font-serif opacity-50">“</span>

        <div className="flex items-center gap-5 mb-8">

          <img src="/petty.jpg" className="w-20 h-20 rounded-full border-4 border-white shadow-lg" alt="Sarah" onError={(e) => { e.target.src = "https://i.pravatar.cc/150?u=sarah"; }} />

          <div>

            <h4 className="font-bold text-2xl text-blue-900">Sarah J.</h4>

            <div className="flex text-yellow-400">

              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}

            </div>

          </div>

        </div>

        <p className="text-gray-600 text-lg italic leading-relaxed">"The convenience of having my scaling done at home was amazing. RoyalSmile is professional, timely, and very gentle!"</p>

      </motion.div>



      {/* Review 2 */}

      <motion.div 

        variants={fadeInUp}

        whileHover={{ y: -10 }}

        className="bg-white p-10 rounded-[2.5rem] text-gray-800 shadow-2xl relative"

      >

        <span className="absolute top-6 right-10 text-8xl text-blue-50 font-serif opacity-50">“</span>

        <div className="flex items-center gap-5 mb-8">

          <img src="/betty.jpg" className="w-20 h-20 rounded-full border-4 border-white shadow-lg" alt="Anna" onError={(e) => { e.target.src = "https://i.pravatar.cc/150?u=anna"; }} />

          <div>

            <h4 className="font-bold text-2xl text-blue-900">Anna M.</h4>

            <div className="flex text-yellow-400">

              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}

            </div>

          </div>

        </div>

        <p className="text-gray-600 text-lg italic leading-relaxed">"Excellent service! My teeth whitening results are better than I expected. They explained every step of the procedure."</p>

      </motion.div>

    </motion.div>

  </div>

</section>





<Footer />
</div>
);
};

export default App;
