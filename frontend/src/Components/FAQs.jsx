import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaChevronDown, 
  FaQuestionCircle, 
  FaRegLightbulb, 
  FaPhoneAlt, 
  FaHeadset, 
  FaCheckCircle, 
  FaRocket 
} from 'react-icons/fa';

const faqCategories = [
  'All',
  'General',
  'Services & Strategy',
  'Pricing & Timeline',
  'Technical & Integrations'
];

const faqsData = [
  {
    id: 1,
    category: 'General',
    question: 'How do custom landing pages improve conversion rates compared to standard website pages?',
    answer: 'Standard website pages are designed for general browsing and navigation with dozens of competing links. A dedicated custom landing page is engineered around a single call-to-action (CTA), removing distractions, streamlining user messaging, and matching ad creative context to convert up to 3x-5x higher.'
  },
  {
    id: 2,
    category: 'General',
    question: 'Will my website have both the landing page and the product page?',
    answer: 'Yes, during the initial launch and testing phase, we host landing pages alongside your current site. Once our custom landing pages outperform your default pages, we make them your default product detail pages (PDPs).'
  },
  {
    id: 3,
    category: 'Services & Strategy',
    question: 'Why choose PageTraffics over traditional marketing or design agencies?',
    answer: 'We focus purely on Conversion Rate Optimization (CRO), UX strategy, and revenue per visitor. Unlike traditional design agencies that only focus on aesthetics, we design based on buyer psychology, competitor analysis, and real-time ad performance data.'
  },
  {
    id: 4,
    category: 'Services & Strategy',
    question: 'What increase in conversion rate should I expect for my brand?',
    answer: 'While exact results depend on your traffic quality and ad spend, our clients typically see a 20% to 50%+ increase in overall conversion rate within the first 30 days post-launch.'
  },
  {
    id: 5,
    category: 'Services & Strategy',
    question: 'Will you build my entire website if requested?',
    answer: 'Absolutely! For us, every page on your site is a conversion landing page. We design and develop full Shopify, WooCommerce, and custom web applications from scratch.'
  },
  {
    id: 6,
    category: 'Pricing & Timeline',
    question: 'How long does it take to design and launch a custom landing page?',
    answer: 'Our average turnaround time is 7 to 14 business days from kickoff to final deployment, including research, copywriting, UI/UX design, and development.'
  },
  {
    id: 7,
    category: 'Pricing & Timeline',
    question: 'What are your service pricing plans?',
    answer: 'We offer fixed-rate project packages as well as monthly CRO retainer plans. All pricing options include strategy, design, copywriting, development, and revision rounds. Contact us for a customized quote tailored to your business scale.'
  },
  {
    id: 8,
    category: 'Pricing & Timeline',
    question: 'Are there any hidden recurring platform or maintenance fees?',
    answer: 'No hidden fees. Once delivered, you own 100% of your code, design assets, and pages.'
  },
  {
    id: 9,
    category: 'Technical & Integrations',
    question: 'Which e-commerce platforms and CMS tools do you support?',
    answer: 'We seamlessly integrate with Shopify, WooCommerce, Webflow, React/Node.js, WordPress, Custom APIs, Klaviyo, Meta Pixel, Google Tag Manager, and major payment gateways.'
  },
  {
    id: 10,
    category: 'Technical & Integrations',
    question: 'How do you ensure landing pages load fast on mobile devices?',
    answer: 'We clean-code all pages using modern lightweight frameworks, optimize images, utilize modern web fonts, and eliminate render-blocking scripts to achieve sub-1.5 second loading speeds.'
  }
];

const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqsData.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 10% 20%, rgba(25, 60, 184, 0.04) 0%, rgba(255, 105, 0, 0.04) 90%)',
      fontFamily: "'Inter', sans-serif",
      color: '#0f172a'
    }}>
      
      {/* Hero Header */}
      <section style={{
        padding: '5rem 1.5rem 4rem 1.5rem',
        background: 'linear-gradient(135deg, #193CB8 0%, #0F172A 100%)',
        color: '#ffffff',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
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
              Help & Support Center
            </span>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: '800',
              margin: '0 0 1rem 0',
              lineHeight: 1.2
            }}>
              Frequently Asked <span style={{
                background: 'linear-gradient(90deg, #FF6900 0%, #FF9E00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Questions</span>
            </h1>

            <p style={{
              fontSize: 'clamp(1.0rem, 2vw, 1.2rem)',
              color: '#cbd5e1',
              maxWidth: '680px',
              margin: '0 auto 2.5rem auto',
              lineHeight: 1.6
            }}>
              Have questions about our process, pricing, timeline, or tech integrations? Find quick answers below or speak with our team directly.
            </p>

            {/* Search Bar Input */}
            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              position: 'relative'
            }}>
              <FaSearch style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b',
                fontSize: '1.2rem'
              }} />
              <input
                type="text"
                placeholder="Search questions or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 20px 16px 54px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.95)',
                  fontSize: '1.05rem',
                  outline: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  boxSizing: 'border-box',
                  color: '#0f172a'
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Pills */}
      <section style={{ padding: '2.5rem 1.5rem 1rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justify: 'center',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              style={{
                padding: '10px 22px',
                borderRadius: '50px',
                border: activeCategory === cat ? 'none' : '1px solid rgba(25, 60, 184, 0.2)',
                background: activeCategory === cat ? '#193CB8' : '#ffffff',
                color: activeCategory === cat ? '#ffffff' : '#334155',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeCategory === cat ? '0 8px 20px rgba(25, 60, 184, 0.25)' : '0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion FAQ List */}
      <section style={{ padding: '2rem 1.5rem 5rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        {filteredFaqs.length === 0 ? (
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
          }}>
            <FaQuestionCircle style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.4rem', color: '#193CB8' }}>No questions found matching your search.</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Try searching with different keywords or contact our team directly.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              style={{
                padding: '10px 24px',
                background: '#FF6900',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {filteredFaqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  style={{
                    background: '#ffffff',
                    borderRadius: '18px',
                    border: isOpen ? '1.5px solid #193CB8' : '1px solid rgba(25, 60, 184, 0.12)',
                    boxShadow: isOpen ? '0 10px 28px rgba(25, 60, 184, 0.12)' : '0 4px 14px rgba(0,0,0,0.04)',
                    overflow: 'hidden',
                    transition: 'border 0.25s ease, box-shadow 0.25s ease'
                  }}
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '1.4rem 1.8rem',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isOpen ? '#193CB8' : 'rgba(25, 60, 184, 0.08)',
                        color: isOpen ? '#ffffff' : '#193CB8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                        fontWeight: '800',
                        flexShrink: 0
                      }}>
                        {idx + 1}
                      </span>
                      <span style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: isOpen ? '#193CB8' : '#0f172a',
                        lineHeight: 1.4
                      }}>
                        {item.question}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ flexShrink: 0 }}
                    >
                      <FaChevronDown style={{ color: isOpen ? '#FF6900' : '#64748b', fontSize: '1.1rem' }} />
                    </motion.div>
                  </button>

                  {/* Answer Panel */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div style={{
                          padding: '0 1.8rem 1.6rem 4rem',
                          color: '#475569',
                          fontSize: '1.0rem',
                          lineHeight: '1.65',
                          borderTop: '1px solid #f1f5f9',
                          paddingTop: '1rem'
                        }}>
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Still Have Questions CTA */}
      <section style={{
        padding: '4rem 1.5rem',
        background: '#ffffff',
        borderTop: '1px solid rgba(25, 60, 184, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 105, 0, 0.1)',
            color: '#FF6900',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            margin: '0 auto 1.2rem auto'
          }}>
            <FaHeadset />
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#193CB8', marginBottom: '0.8rem' }}>
            Still Have Questions?
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569', marginBottom: '2rem' }}>
            Our team is here to help you audit your landing pages and answer any technical questions.
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
              Contact Our Strategy Team
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
              <FaPhoneAlt /> +91 7655000956
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
