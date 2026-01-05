"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaShoppingBag,
  FaHome,
  FaUtensils,
  FaCoffee,
  FaHeartbeat,
  FaGraduationCap,
  FaGamepad,
  FaDumbbell,
  FaUsers,
  FaTruck,
  FaPlane,
  FaMoneyBillWave,
  FaRocket,
  FaCalendarAlt,
  FaHandsHelping,
  FaBalanceScale,
} from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";
import Image from "next/image";
import Underline from "../../components/Underline";

const industries = [
  {
    title: "E-Commerce",
    description:
      "Boost your online sales with sleek, high-converting digital stores.",
    tags: ["Online Stores", "Product Showcases", "Checkout Systems"],
    icon: <FaShoppingBag className="text-2xl" />,
    bgColor: "bg-blue-50",
    image: "/images/ecommercePhoto.png",
  },
  {
    title: "Real Estate",
    description:
      "Showcase listings and generate leads with smart search and CRM tools.",
    tags: ["Listings", "Virtual Tours", "Agent Profiles"],
    icon: <FaHome className="text-2xl" />,
    bgColor: "bg-purple-50",
    image: "/images/realestatePhoto.png",
  },
  {
    title: "Restaurants & Food",
    description:
      "Delight diners with digital menus, table bookings, and online orders.",
    tags: ["Menus", "Online Ordering", "Reservations"],
    icon: <FaUtensils className="text-2xl" />,
    bgColor: "bg-red-50",
    image: "/images/foodPhoto.png",
  },
  {
    title: "Cafes & Bakeries",
    description:
      "Turn casual visitors into regulars with cozy, photo-rich websites.",
    tags: ["Menus", "Instagram Feed", "Online Orders"],
    icon: <FaCoffee className="text-2xl" />,
    bgColor: "bg-amber-50",
    image: "/images/bakeryPhoto.png",
  },
  {
    title: "Healthcare & Wellness",
    description:
      "Empower patients with intuitive, secure, and modern health platforms.",
    tags: ["Booking Systems", "Patient Portals", "HIPAA Compliance"],
    icon: <FaHeartbeat className="text-2xl" />,
    bgColor: "bg-pink-50",
    image: "/images/healthcarePhoto.png",
  },
  {
    title: "Education & eLearning",
    description:
      "Simplify learning with digital classrooms, LMS, and mobile-first design.",
    tags: ["Courses", "Certifications", "Progress Tracking"],
    icon: <FaGraduationCap className="text-2xl" />,
    bgColor: "bg-indigo-50",
    image: "/images/educationPhoto.png",
  },
  {
    title: "Gaming & Esports",
    description:
      "Level up with dynamic landing pages, community hubs, and game portals.",
    tags: ["Game Launches", "Team Pages", "Tournaments"],
    icon: <FaGamepad className="text-2xl" />,
    bgColor: "bg-green-50",
    image: "/images/egamingPhoto.png",
  },
  {
    title: "Sports & Fitness",
    description:
      "Connect with your community and streamline bookings & memberships.",
    tags: ["Class Schedules", "Trainer Bios", "Memberships"],
    icon: <FaDumbbell className="text-2xl" />,
    bgColor: "bg-blue-50",
    image: "/images/fitnessPhoto.png",
  },
  {
    title: "Social Platforms",
    description:
      "Build and grow online communities with engaging social features.",
    tags: ["Profiles", "Messaging", "Groups"],
    icon: <FaUsers className="text-2xl" />,
    bgColor: "bg-teal-50",
    image: "/images/socialPhoto.png",
  },
  {
    title: "Logistics & Transport",
    description:
      "Manage routes, fleets, and customers with smart tracking solutions.",
    tags: ["Real-Time Tracking", "Fleet Management", "Customer Portals"],
    icon: <FaTruck className="text-2xl" />,
    bgColor: "bg-amber-50",
    image: "/images/logisticsPhoto.png",
  },
  {
    title: "Travel & Hospitality",
    description:
      "Showcase destinations and simplify bookings for travelers worldwide.",
    tags: ["Hotel Listings", "Photo Galleries", "Itinerary Builders"],
    icon: <FaPlane className="text-2xl" />,
    bgColor: "bg-blue-50",
    image: "/images/travelPhoto.png",
  },
  {
    title: "Finance & FinTech",
    description:
      "Secure, scalable web solutions built for the financial sector.",
    tags: ["Dashboards", "Transactions", "Analytics"],
    icon: <FaMoneyBillWave className="text-2xl" />,
    bgColor: "bg-green-50",
    image: "/images/financePhoto.png",
  },
  {
    title: "SaaS & Startups",
    description:
      "Launch faster with performance-driven platforms and clean UX.",
    tags: ["MVPs", "Dashboards", "Landing Pages"],
    icon: <FaRocket className="text-purple-600 text-2xl" />,
    bgColor: "bg-purple-50",
    image: "/images/saasPhoto.png",
  },
  {
    title: "Events & Entertainment",
    description:
      "Make your events unforgettable with stunning online experiences.",
    tags: ["Ticketing", "Artist Pages", "Event Schedules"],
    icon: <FaCalendarAlt className="text-red-500 text-2xl" />,
    bgColor: "bg-red-50",
    image: "/images/eventsPhoto.png",
  },
  {
    title: "Nonprofits & NGOs",
    description:
      "Share your mission, grow your impact, and connect with donors.",
    tags: ["Donations", "Volunteer Signups", "Campaigns"],
    icon: <FaHandsHelping className="text-teal-600 text-2xl" />,
    bgColor: "bg-teal-50",
    image: "/images/nonprofitPhoto.png",
  },
  {
    title: "Beauty & Lifestyle",
    description:
      "Style-focused web experiences for modern beauty & lifestyle brands.",
    tags: ["Service Menus", "Portfolios", "Testimonials"],
    icon: <GiLipstick className="text-pink-500 text-2xl" />,
    bgColor: "bg-pink-50",
    image: "/images/beautyPhoto.png",
  },
  {
    title: "Legal & Consulting",
    description: "Build authority and trust with professional, clean websites.",
    tags: ["Case Studies", "Service Pages", "Consultation Forms"],
    icon: <FaBalanceScale className="text-2xl" />,
    bgColor: "bg-indigo-50",
    image: "/images/legalPhoto.png",
  },
];

const IndustryCard = ({ industry }) => {
  return (
    <div className="relative h-[500px] md:h-auto md:aspect-square w-full rounded-[4rem] overflow-hidden bg-[#D9D9D9]  hover:shadow-md transition-all duration-300 group">
      <div className="p-10 h-full flex flex-col">
        <div className="mb-8">
          {React.cloneElement(industry.icon, {
            className: "text-[#666] text-4xl",
          })}
        </div>
        <h3 className="text-3xl font-bold text-black mb-6">{industry.title}</h3>
        <p className="text-black text-md mb-8 flex-1 leading-relaxed">
          {industry.description}
        </p>
        <div className="flex flex-wrap gap-3 mt-auto relative z-10">
          {industry.tags.map((tag, index) => {
            const noiseSvg =
              "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E";

            return (
              <div
                key={index}
                className="relative group overflow-hidden rounded-full"
              >
                {/* Frosted glass effect using filter blur */}
                <div
                  className="absolute inset-0 rounded-full overflow-hidden"
                  style={{
                    background: "rgba(0, 0, 0, 0.2)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {/* Noise texture */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: `url("${noiseSvg}")`,
                      backgroundSize: "cover",
                      mixBlendMode: "overlay",
                    }}
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.1))",
                    }}
                  />
                </div>
                {/* Tag text */}
                <div className="relative z-10 px-4 py-2 text-sm font-medium text-white">
                  {tag}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom right image */}
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3">
          <div className="w-full h-full relative">
            <div className="absolute inset-0 mix-blend-multiply">
              <div className="relative w-full h-full opacity-100">
                <Image
                  src={industry.image || "/images/placeholder.png"}
                  alt={industry.title}
                  fill
                  sizes="(max-width: 768px) 66vw, 33vw"
                  className="object-contain object-bottom-right"
                  priority={false}
                  style={{
                    filter: "contrast(1.1) saturate(1.2)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Industries = () => {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(450);
  const gap = 24; // space-x-6 = 1.5rem = 24px
  const scrollAmount = cardWidth + gap;
  const totalCards = industries.length;
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollInterval = useRef(null);

  // Update card width on resize to prevent mobile overflow
  useEffect(() => {
    const updateWidth = () => {
      // If mobile, use 85% of screen width. Else 450px.
      if (window.innerWidth < 768) {
        setCardWidth(window.innerWidth * 0.85);
      } else {
        setCardWidth(450);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const scrollToCard = (index) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollPosition = index * scrollAmount;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    setCurrentIndex(index);
  };

  const nextCard = () => {
    const nextIndex = (currentIndex + 1) % totalCards;
    scrollToCard(nextIndex);
  };

  const prevCard = () => {
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    scrollToCard(prevIndex);
  };

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (isAutoScrolling) {
      autoScrollInterval.current = setInterval(() => {
        nextCard();
      }, 2000);
    }

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [currentIndex, isAutoScrolling, cardWidth]);

  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  return (
    <section className="w-full bg-[#FAFAFA] py-20 lg:py-32" id="industries">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* HEADER SECTION - Simplified Layout */}
        <div className="flex flex-col mb-12 md:mb-16">
          <span className="text-xs font-bold text-gray-400 tracking-[0.2em] mb-4">
            INDUSTRIES
          </span>
          
          <h2 className="text-4xl md:text-6xl font-light text-black leading-tight">
            Built for Every <br className="hidden md:block" />
            <span className="relative inline-block font-medium font-hello">
              Industry
              {/* Underline - distinct positioning */}
              <div className="absolute left-0 right-0 -bottom-2 h-4">
                 <Underline color="#FECE2E" width="100%" thickness="4" />
              </div>
            </span>
          </h2>
          
          <h2 className="text-4xl md:text-6xl font-normal text-black mt-2 mb-8">
            That Dreams Big
          </h2>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
            From real estate to restaurants, finance to fitness, brands across the
            globe trust us to deliver results-driven experiences that grow with
            their business.
          </p>
        </div>

        {/* CAROUSEL SECTION - Native Scroll first approach */}
        <div className="relative w-full">
          
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 w-full snap-x snap-mandatory no-scrollbar"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            style={{ scrollBehavior: 'smooth' }}
          >
            {industries.map((industry, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] md:w-[450px] snap-center md:snap-start"
              >
                <IndustryCard industry={industry} />
              </div>
            ))}
          </div>

          {/* Controls - Only show on desktop for clarity, swipe is best for mobile */}
          <div className="hidden md:flex justify-end gap-4 mt-8">
             <button
              onClick={prevCard}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="Previous"
            >
              &larr;
            </button>
            <button
              onClick={nextCard}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="Next"
            >
              &rarr;
            </button>
          </div>

        </div>

      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Industries;
