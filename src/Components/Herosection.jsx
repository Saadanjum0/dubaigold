import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  
  const heroTexts = [
    {
      title: "DUBAI Gold/Silver-BarMaker",
      subtitle: "Secured Investment",
      cta: "WHERE TO BUY",
      image: "/Images/skider1.webp"
    },
    {
      title: "DUBAI Gold/Silver-BarMaker",
      subtitle: "Secured Investment",
      cta: "EXPLORE COLLECTION",
      image: "/Images/skider2.webp"
    },
    {
      title: "DUBAI Gold/Silver-BarMaker",
      subtitle: "Secured Investment",
      cta: "GET STARTED",
      image: "/Images/slider3.webp"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative mt-0 h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('${heroTexts[currentText].image}')`
            }}
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          
          {/* Gold Bar Image */}
        

          {/* Main Heading */}
          <h1 className=" text-[43px]  md:text-8xl font-black text-white mb-4 tracking-wider leading-none">
            <span className="inline-block animate-fade-in">
              {heroTexts[currentText].title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 font-extralight md:font-light mb-8 tracking-widest">
            {heroTexts[currentText].subtitle}
          </p>

          {/* CTA Button */}
          <button className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black   md:px-12 px-9 py-4 rounded-full font-bold text-sm  md:text-lg tracking-wide hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-2xl">
            <span className="relative z-10">{heroTexts[currentText].cta}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Scroll Down Indicator */}
         

          {/* Text Change Indicators */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroTexts.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentText ? 'bg-yellow-400 w-8' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

       
      
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </>
  );
};

export default HeroSection;