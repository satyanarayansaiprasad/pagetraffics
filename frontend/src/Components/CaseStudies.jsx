import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaChartLine, 
  FaArrowRight, 
  FaCheckCircle, 
  FaStar, 
  FaRocket, 
  FaFilter, 
  FaLayerGroup, 
  FaMobileAlt, 
  FaPhoneAlt 
} from 'react-icons/fa';

const caseStudiesData = [
  {
    id: 'good-stuffs',
    title: "The Good Stuff’s Flowless Gummies",
    category: 'E-Commerce & Health',
    tag: 'DTC E-COMMERCE',
    heroImage: 'img1.png',
    metrics: [
      { label: 'Conversion Rate', value: '+42%', icon: FaChartLine },
      { label: 'Monthly Revenue', value: '+180%', icon: FaRocket },
      { label: 'Return on Ad Spend', value: '4.2x ROAS', icon: FaStar }
    ],
    overview: 'Complete redesign of product landing page focused on mobile conversion optimization, social proof integration, and subscription upsell funnels.',
    challenge: 'High ad spend traffic with drop-offs at checkout due to non-optimized mobile UI and slow page loading times.',
    solution: 'Engineered a lightning-fast custom landing page with sticky bottom CTA bar, dynamic bundle builder, and real-time customer reviews.',
    results: [
      'Increased checkout initiation rate by 55%',
      'Boosted average order value (AOV) by $24 via dynamic cross-sells',
      'Reduced mobile page load time from 4.2s to 1.1s'
    ]
  },
  {
    id: 'tiara-ventures',
    title: 'Tiara Ventures',
    category: 'Fashion & Luxury',
    tag: 'LUXURY BRANDING',
    heroImage: '1.png',
    metrics: [
      { label: 'Checkout Completion', value: '+35%', icon: FaChartLine },
      { label: 'Bounce Rate Reduction', value: '-28%', icon: FaRocket },
      { label: 'Mobile Sales Share', value: '78%', icon: FaMobileAlt }
    ],
    overview: 'High-end responsive luxury accessories store layout focusing on visual storytelling, custom video banners, and frictionless payment funnels.',
    challenge: 'Brand struggled to convey luxury appeal while keeping the page simple and fast enough for high mobile conversion.',
    solution: 'Implemented micro-animations, high-resolution product carousels, and single-click checkout integrations.',
    results: [
      '35% improvement in final checkout completions',
      '28% reduction in homepage drop-offs',
      'Expanded customer repeat purchase rate to 32%'
    ]
  },
  {
    id: 'st-xaviers',
    title: 'St Xaviers International School',
    category: 'Education & Lead Gen',
    tag: 'LEAD GENERATION',
    heroImage: '2.png',
    metrics: [
      { label: 'Admission Inquiries', value: '+210%', icon: FaChartLine },
      { label: 'Cost Per Lead (CPL)', value: '-45%', icon: FaRocket },
      { label: 'Form Fill Rate', value: '18.4%', icon: FaCheckCircle }
    ],
    overview: 'Conversion-focused admissions page designed to capture high-intent parent inquiries for academic enrollment.',
    challenge: 'Complex 3-page registration form resulting in high drop-off rates on mobile devices.',
    solution: 'Simplified inquiry funnel into a 2-step interactive quiz with instant WhatsApp & phone callback options.',
    results: [
      'More than doubled overall inquiry volume within 14 days',
      'Cut advertising cost per lead by 45%',
      'Generated over 1,200 verified parent leads during admission window'
    ]
  },
  {
    id: 'sonalika-jewellers',
    title: 'Sonalika Jewellers',
    category: 'Fashion & Luxury',
    tag: 'HIGH-TICKET RETAIL',
    heroImage: '3.png',
    metrics: [
      { label: 'High-Ticket Views', value: '+65%', icon: FaChartLine },
      { label: 'WhatsApp Leads', value: '3.5x', icon: FaRocket },
      { label: 'Consultation Bookings', value: '+120%', icon: FaStar }
    ],
    overview: 'Mobile-first showcase page built for high-ticket jewellery collections with direct VIP consultation booking.',
    challenge: 'Customers were browsing products online but hesitated to purchase without direct phone/chat consultation.',
    solution: 'Integrated floating 1-click WhatsApp VIP booking widget and interactive 360-degree jewellery video sliders.',
    results: [
      '3.5x increase in qualified WhatsApp consultation requests',
      '65% increase in high-value gold & diamond category page duration',
      'Over $150K in direct trackable sales from digital campaign traffic'
    ]
  },
  {
    id: 'dimalsons-decorator',
    title: 'Dimalsons Decorator',
    category: 'Home & Decor',
    tag: 'CRO & INTERIOR',
    heroImage: 'img2.png',
    metrics: [
      { label: 'Project Quote Requests', value: '+88%', icon: FaChartLine },
      { label: 'Ad Campaign ROI', value: '3.8x', icon: FaRocket },
      { label: 'Avg Session Duration', value: '3m 45s', icon: FaStar }
    ],
    overview: 'Interactive interior decoration portfolio page showcasing transformational before-and-after work.',
    challenge: 'Static photo gallery failed to demonstrate full scope of transformational renovation work.',
    solution: 'Designed custom interactive before-and-after slider with instant project cost estimator.',
    results: [
      '88% boost in total project estimate requests',
      '3.8x campaign return on ad spend within 30 days',
      'Increased site visitor engagement duration by over 2 minutes'
    ]
  }
];

const CaseStudies = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'E-Commerce & Health', 'Fashion & Luxury', 'Education & Lead Gen', 'Home & Decor'];

  const filteredData = activeFilter === 'All' 
    ? caseStudiesData 
    : caseStudiesData.filter(item => item.category === activeFilter);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 10% 20%, rgba(25, 60, 184, 0.04) 0%, rgba(255, 105, 0, 0.04) 90%)',
      fontFamily: "'Inter', sans-serif",
      color: '#0f172a'
    }}>
      
      {/* Hero Header Banner */}
      <section style={{
        padding: '5rem 1.5rem 3.5rem 1.5rem',
        background: 'linear-gradient(135deg, #193CB8 0%, #0F172A 100%)',
        color: '#ffffff',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span style={{
              display: 'inline-block',
              padding: '6px 18px',
              borderRadius: '50px',
              background: 'rgba(255, 105, 0, 0.18)',
              border: '1px solid rgba(255, 105, 0, 0.4)',
              color: '#FF6900',
              fontSize: '0.85rem',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '1.2rem'
            }}>
              Proven Results & Data-Driven Success
            </span>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: '800',
              margin: '0 0 1rem 0',
              lineHeight: 1.2
            }}>
              Our Case <span style={{
                background: 'linear-gradient(90deg, #FF6900 0%, #FF9E00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Studies & Growth Stories</span>
            </h1>

            <p style={{
              fontSize: 'clamp(1.0rem, 2vw, 1.2rem)',
              color: '#cbd5e1',
              maxWidth: '720px',
              margin: '0 auto 2rem auto',
              lineHeight: 1.6
            }}>
              Explore how we help DTC e-commerce brands, high-ticket retail stores, and service providers scale their conversion rates and boost ad revenue.
            </p>

            {/* Quick Metrics Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '18px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#FF6900' }}>200+</div>
                <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Projects Delivered</div>
              </div>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#38bdf8' }}>+42%</div>
                <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Avg Conversion Lift</div>
              </div>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#4ade80' }}>$12M+</div>
                <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Trackable Client Revenue</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section style={{ padding: '2.5rem 1.5rem 1rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justify: 'center',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                border: activeFilter === cat ? 'none' : '1px solid rgba(25, 60, 184, 0.2)',
                background: activeFilter === cat ? '#193CB8' : '#ffffff',
                color: activeFilter === cat ? '#ffffff' : '#334155',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeFilter === cat ? '0 8px 20px rgba(25, 60, 184, 0.25)' : '0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Case Studies Grid */}
      <section style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem'
            }}
          >
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid rgba(25, 60, 184, 0.12)',
                  boxShadow: '0 12px 36px rgba(25, 60, 184, 0.07)',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '0'
                }}
              >
                {/* Left Column: Image / Mockup Preview */}
                <div style={{
                  background: '#f8fafc',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'center',
                  alignItems: 'center',
                  borderRight: '1px solid rgba(0,0,0,0.06)'
                }}>
                  <div style={{
                    alignSelf: 'flex-start',
                    padding: '4px 14px',
                    borderRadius: '50px',
                    background: 'rgba(255, 105, 0, 0.1)',
                    color: '#FF6900',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    letterSpacing: '1px',
                    marginBottom: '1.2rem'
                  }}>
                    {item.tag}
                  </div>

                  <img 
                    src={`/${item.heroImage}`} 
                    alt={item.title} 
                    style={{
                      width: '100%',
                      maxHeight: '280px',
                      objectFit: 'contain',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                    }} 
                  />
                </div>

                {/* Right Column: Case Study Details & Metrics */}
                <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#193CB8', margin: '0 0 0.8rem 0' }}>
                      {item.title}
                    </h2>

                    <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>
                      {item.overview}
                    </p>

                    {/* Metric Badges */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                      gap: '1rem',
                      marginBottom: '1.8rem'
                    }}>
                      {item.metrics.map((m, i) => {
                        const Icon = m.icon;
                        return (
                          <div 
                            key={i} 
                            style={{
                              background: 'radial-gradient(circle at 10% 20%, rgba(25, 60, 184, 0.04) 0%, rgba(255, 105, 0, 0.04) 90%)',
                              border: '1px solid rgba(25, 60, 184, 0.15)',
                              borderRadius: '14px',
                              padding: '1rem',
                              textAlign: 'center'
                            }}
                          >
                            <Icon style={{ color: '#FF6900', fontSize: '1.2rem', marginBottom: '4px' }} />
                            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#193CB8' }}>{m.value}</div>
                            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>{m.label}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Key Results Checklist */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
                        Key Campaign Achievements:
                      </div>
                      {item.results.map((res, rIdx) => (
                        <div key={rIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '0.9rem', color: '#334155' }}>
                          <FaCheckCircle style={{ color: '#16a34a', flexShrink: 0 }} />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Link Button */}
                  <div style={{ paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                    <Link
                      to="/contact"
                      style={{
                        padding: '12px 24px',
                        background: '#FF6900',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 8px 20px -4px rgba(255, 105, 0, 0.35)'
                      }}
                    >
                      Get Similar Results For Your Brand <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Bottom Conversion Callout */}
      <section style={{
        padding: '4rem 1.5rem',
        background: '#ffffff',
        borderTop: '1px solid rgba(25, 60, 184, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#193CB8', marginBottom: '1rem' }}>
            Ready To Multiply Your Landing Page Conversions?
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569', marginBottom: '2rem' }}>
            Book a 1-on-1 strategy call with our CRO experts to audit your current pages and discover growth opportunities.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                padding: '14px 32px',
                background: '#FF6900',
                color: '#ffffff',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.0rem',
                textDecoration: 'none',
                boxShadow: '0 10px 25px -5px rgba(255, 105, 0, 0.4)'
              }}
            >
              Book a Strategy Call
            </Link>
            <a
              href="tel:+917655000956"
              style={{
                padding: '14px 32px',
                background: '#ffffff',
                color: '#193CB8',
                border: '1px solid rgba(25, 60, 184, 0.3)',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.0rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FaPhoneAlt /> Call Us Now (+91 7655000956)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
