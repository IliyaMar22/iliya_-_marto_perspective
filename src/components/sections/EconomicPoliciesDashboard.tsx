import React, { useState, useRef } from 'react';

const PRESENTATION_PPTX = '/Sustainable-Growth-and-Competitiveness.pptx';
const PRESENTATION_PDF = '/Sustainable-Growth-and-Competitiveness.pdf';

// Presentation Preview Modal with PDF Viewer
const PresentationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass-dark rounded-2xl shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col overflow-hidden border border-lime-400/20">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-lime-400/20 bg-gradient-to-r from-lime-400 to-green-600 text-dark-green">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Sustainable Growth & Competitiveness</h3>
              <p className="text-sm text-white/80">Economic Policy Framework - Full Presentation</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href={PRESENTATION_PDF}
              download="Sustainable-Growth-and-Competitiveness.pdf"
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF</span>
            </a>
            <a
              href={PRESENTATION_PPTX}
              download="Sustainable-Growth-and-Competitiveness.pptx"
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PPTX</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-black">
          <iframe
            src={`${PRESENTATION_PDF}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
            className="w-full h-full border-0"
            title="Sustainable Growth & Competitiveness Presentation"
          />
        </div>

        {/* Footer */}
        <div className="p-3 glass-dark border-t border-lime-400/20 text-center">
          <p className="text-xs text-gray-400">
            📄 Scroll through the PDF to view all slides • Use the toolbar to zoom, print, or download
          </p>
        </div>
      </div>
    </div>
  );
};

interface PolicySlide {
  id: string;
  title: string;
  subtitle?: string;
  items: {
    heading: string;
    content: string;
    icon?: string;
  }[];
  color: string;
  accentColor: string;
}

interface PolicySection {
  id: string;
  number: string;
  title: string;
  slides: PolicySlide[];
}

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'intro',
    number: '',
    title: 'Sustainable Growth & Competitiveness',
    slides: [
      {
        id: 'intro-1',
        title: 'Sustainable Growth & Competitiveness',
        subtitle: 'Strategic Economic Framework for Bulgaria',
        items: [
          {
            heading: 'Our Objective',
            content: 'Increase sustainable growth, restore competitiveness, accelerate convergence, reduce vulnerability to external shocks, and enhance income equality—while stabilizing inflation and preserving macroeconomic stability.',
            icon: '🎯'
          }
        ],
        color: 'from-green-600 to-emerald-700',
        accentColor: 'green'
      }
    ]
  },
  {
    id: 'fiscal',
    number: 'I',
    title: 'Fiscal Consolidation with Investment Priority',
    slides: [
      {
        id: 'fiscal-1',
        title: 'Fiscal Consolidation with Investment Priority',
        items: [
          {
            heading: '1. Limit Current Expenditures',
            content: 'Redirect fiscal resources towards infrastructure and human capital investments (education, healthcare, R&D). Expected effect: Long-term productivity gains and sustainable debt path.',
            icon: '💰'
          },
          {
            heading: '2. Targeted Housing Policy',
            content: 'Implement stricter mortgage macroprudential buffers (lower LTVs for investment properties, tighter income-to-service ratios). Expected effect: Cool speculative housing demand, redirect savings toward productive investment.',
            icon: '🏠'
          },
          {
            heading: '3. Fiscal & Monetary Coordination',
            content: 'Establish a platform for data exchange and joint response to inflationary pressures, preserving central bank independence. Expected effect: More effective policy mix against inflation.',
            icon: '🤝'
          }
        ],
        color: 'from-blue-600 to-indigo-700',
        accentColor: 'blue'
      }
    ]
  },
  {
    id: 'inflation',
    number: 'II',
    title: 'Combating Inflation & Restoring Competitiveness',
    slides: [
      {
        id: 'inflation-1',
        title: 'Combating Inflation & Restoring Competitiveness',
        items: [
          {
            heading: 'Conditional Income Policy',
            content: 'Temporary halt/limitation of broad-based wage increases in the public sector, linked to productivity gains. Expected effect: Anchor inflation expectations, improve price competitiveness.',
            icon: '📊'
          },
          {
            heading: 'Antimonopoly Enforcement',
            content: 'Targeted inspections and sanctions against unfair trading practices; strengthen Competition Authority capacity. Expected effect: Limit monopolistic price increases, protect consumers.',
            icon: '⚖️'
          },
          {
            heading: 'Productivity Growth Support',
            content: 'Investment in training, digitalization, and mechanization; tax credits for capital investments. Expected effect: Enable wage growth consistent with productivity, restoring competitiveness.',
            icon: '📈'
          }
        ],
        color: 'from-amber-600 to-orange-700',
        accentColor: 'amber'
      }
    ]
  },
  {
    id: 'structural',
    number: 'III',
    title: 'Structural Reforms for Accelerated Convergence',
    slides: [
      {
        id: 'structural-1',
        title: 'Structural Reforms for Accelerated Convergence',
        items: [
          {
            heading: 'Targeted Industrial Strategy',
            content: 'Attract high-value FDI in R&D, semiconductors, pharma, green energy via incentives and clusters.',
            icon: '🏭'
          },
          {
            heading: 'Public Administration Reform',
            content: 'E-government, faster licensing, anti-corruption, transparency in public procurement.',
            icon: '🏛️'
          },
          {
            heading: 'Education & Talent Retention',
            content: 'Reform focused on STEM, dual vocational training; programs to retain skilled emigrants.',
            icon: '🎓'
          },
          {
            heading: 'Regional Decentralization',
            content: 'Industrial zones, regional investment funds, tax incentives for companies outside Sofia.',
            icon: '🗺️'
          }
        ],
        color: 'from-purple-600 to-violet-700',
        accentColor: 'purple'
      }
    ]
  },
  {
    id: 'financial',
    number: 'IV',
    title: 'Financial Sector & Capital Market Development',
    slides: [
      {
        id: 'financial-1',
        title: 'Financial Sector & Capital Market Development',
        items: [
          {
            heading: 'Stimulating Financial Intermediation',
            content: 'Improve regulatory framework for bank credit to productive investment; expand M&A and project finance. Expected effect: Transform excess deposits into productive credit.',
            icon: '🏦'
          },
          {
            heading: 'Capital Market Development',
            content: 'Incentives for IPOs; support for SMEs to list on the stock exchange; regulatory reforms to attract institutional investors. Expected effect: More diversified financing sources; reduced reliance on banks.',
            icon: '📊'
          }
        ],
        color: 'from-teal-600 to-cyan-700',
        accentColor: 'teal'
      }
    ]
  },
  {
    id: 'trade',
    number: 'V',
    title: 'External Trade & Current Account',
    slides: [
      {
        id: 'trade-1',
        title: 'External Trade & Current Account',
        items: [
          {
            heading: 'Export Competitiveness',
            content: 'Support innovation, higher-value products, export credit facilities, and diversification of export markets.',
            icon: '🌍'
          },
          {
            heading: 'Energy Policy',
            content: 'Support competitive energy capacity, investment in green energy for export, and modern energy infrastructure.',
            icon: '⚡'
          }
        ],
        color: 'from-rose-600 to-pink-700',
        accentColor: 'rose'
      }
    ]
  },
  {
    id: 'social',
    number: 'VI',
    title: 'Social Policy & Inclusion',
    slides: [
      {
        id: 'social-1',
        title: 'Social Policy & Inclusion',
        items: [
          {
            heading: 'Targeted Social Transfers',
            content: 'Better-targeted aid and training programs for poor regions and vulnerable households; active labour-market programs. Expected effect: Mitigate inequality without inflating current expenditure.',
            icon: '🤲'
          },
          {
            heading: 'Health & Education Investment',
            content: 'Funding aimed at improving human capital and long-term productivity for sustainable societal development.',
            icon: '🏥'
          }
        ],
        color: 'from-emerald-600 to-green-700',
        accentColor: 'emerald'
      }
    ]
  },
  {
    id: 'legal',
    number: 'VII',
    title: 'Legal Framework & Anti-Corruption',
    slides: [
      {
        id: 'legal-1',
        title: 'Legal Framework & Anti-Corruption',
        items: [
          {
            heading: 'Institutional Reforms',
            content: 'Independent anti-corruption bodies, transparency, and accelerated judicial procedures for economic crimes. Expected effect: Higher trust, increased FDI, and improved international rankings.',
            icon: '⚖️'
          }
        ],
        color: 'from-slate-600 to-gray-700',
        accentColor: 'slate'
      }
    ]
  },
  {
    id: 'roadmap',
    number: 'VIII',
    title: 'Priority Roadmap & Quick Wins',
    slides: [
      {
        id: 'roadmap-1',
        title: 'Priority Roadmap & Quick Wins',
        items: [
          {
            heading: '1. First 6 Months',
            content: 'Lower LTVs for investment properties, fast-track key infrastructure, temporary public wage restraint.',
            icon: '🚀'
          },
          {
            heading: '2. 6-24 Months',
            content: 'Fiscal reform for investment, launch industrial clusters and R&D programs, administrative reform.',
            icon: '📅'
          },
          {
            heading: '3. 2-7 Years',
            content: 'Education reform, capital market development, deep institutional reforms, regional development policies.',
            icon: '🎯'
          }
        ],
        color: 'from-indigo-600 to-blue-700',
        accentColor: 'indigo'
      }
    ]
  },
  {
    id: 'risk',
    number: 'IX',
    title: 'Risk Assessment & Mitigation',
    slides: [
      {
        id: 'risk-1',
        title: 'Risk Assessment & Mitigation',
        items: [
          {
            heading: 'Political Resistance',
            content: 'Mitigate with targeted compensatory measures and communication strategy.',
            icon: '🏛️'
          },
          {
            heading: 'Short-Term Consumption Drop',
            content: 'Combine restraint with investment stimulus to balance economic activity.',
            icon: '📉'
          },
          {
            heading: 'External Shocks',
            content: 'Build fiscal buffers and diversify markets to enhance resilience.',
            icon: '🌊'
          },
          {
            heading: 'Skilled Labor Emigration',
            content: 'Implement retention and return-talent programs with incentives.',
            icon: '✈️'
          }
        ],
        color: 'from-red-600 to-rose-700',
        accentColor: 'red'
      }
    ]
  }
];

const PolicyCard: React.FC<{ item: PolicySlide['items'][0] }> = ({ item }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]">
    <div className="flex items-start space-x-4">
      <span className="text-4xl">{item.icon}</span>
      <div className="flex-1">
        <h4 className="text-xl font-bold text-white mb-3">{item.heading}</h4>
        <p className="text-white/90 leading-relaxed">{item.content}</p>
      </div>
    </div>
  </div>
);

const SlideView: React.FC<{ slide: PolicySlide; sectionNumber: string }> = ({ slide, sectionNumber }) => (
  <div className={`min-w-full h-full bg-gradient-to-br ${slide.color} rounded-2xl p-8 flex flex-col`}>
    <div className="mb-8">
      {sectionNumber && (
        <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-white/90 text-sm font-medium mb-4">
          Section {sectionNumber}
        </span>
      )}
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">{slide.title}</h2>
      {slide.subtitle && (
        <p className="text-xl text-white/80">{slide.subtitle}</p>
      )}
    </div>
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto">
      {slide.items.map((item, idx) => (
        <PolicyCard key={idx} item={item} />
      ))}
    </div>
  </div>
);

const SectionNavigator: React.FC<{
  sections: PolicySection[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}> = ({ sections, activeSection, onSectionClick }) => (
  <div className="sticky top-0 z-10 glass-dark shadow-md rounded-xl p-4 mb-8 border border-lime-400/20">
    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Policy Sections</h3>
    <div className="flex flex-wrap gap-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeSection === section.id
              ? 'bg-lime-400 text-dark-green shadow-lg'
              : 'glass-dark text-gray-300 hover:bg-lime-400/20 border border-lime-400/10'
          }`}
        >
          {section.number ? `${section.number}. ` : ''}{section.title.split(' ').slice(0, 3).join(' ')}
          {section.title.split(' ').length > 3 ? '...' : ''}
        </button>
      ))}
    </div>
  </div>
);

const HorizontalSlideshow: React.FC<{ section: PolicySection }> = ({ section }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (index: number) => {
    if (containerRef.current) {
      const slideWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const slideWidth = containerRef.current.offsetWidth;
      const scrollLeft = containerRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / slideWidth);
      if (newIndex !== currentSlide) {
        setCurrentSlide(newIndex);
      }
    }
  };

  return (
    <div className="relative">
      {/* Slides Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {section.slides.map((slide) => (
          <div key={slide.id} className="min-w-full snap-center p-1" style={{ height: '500px' }}>
            <SlideView slide={slide} sectionNumber={section.number} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {section.slides.length > 1 && (
        <>
          <button
            onClick={() => scrollToSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-dark rounded-full shadow-lg flex items-center justify-center hover:bg-lime-400/30 border border-lime-400/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollToSlide(Math.min(section.slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === section.slides.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-dark rounded-full shadow-lg flex items-center justify-center hover:bg-lime-400/30 border border-lime-400/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {section.slides.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {section.slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide ? 'bg-lime-400 w-8' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const EconomicPoliciesDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [showPresentation, setShowPresentation] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-8">
      {/* Presentation Modal */}
      <PresentationModal isOpen={showPresentation} onClose={() => setShowPresentation(false)} />

      {/* Header */}
      <div className="bg-gradient-to-r from-lime-400 via-green-600 to-teal-600 rounded-2xl p-8 text-dark-green">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-4xl">📋</span>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">Economic Policies</h1>
              <p className="text-lg text-white/80">Sustainable Growth & Competitiveness Framework</p>
            </div>
          </div>

          {/* Presentation Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowPresentation(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-dark-green text-lime-400 font-semibold rounded-xl hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl border border-lime-400/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>View Presentation</span>
            </button>
            <a
              href={PRESENTATION_PDF}
              download="Sustainable-Growth-and-Competitiveness.pdf"
              className="flex items-center space-x-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF</span>
            </a>
            <a
              href={PRESENTATION_PPTX}
              download="Sustainable-Growth-and-Competitiveness.pptx"
              className="flex items-center space-x-2 px-6 py-3 bg-white/10 text-white/80 font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>PPTX</span>
            </a>
          </div>
        </div>

        <p className="text-white/90 max-w-3xl mt-6">
          Strategic policy framework to increase sustainable growth, restore competitiveness, accelerate EU convergence, 
          reduce vulnerability to external shocks, and enhance income equality—while stabilizing inflation and preserving 
          macroeconomic stability.
        </p>
      </div>

      {/* Section Navigator */}
      <SectionNavigator
        sections={POLICY_SECTIONS}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Policy Sections */}
      <div className="space-y-12">
        {POLICY_SECTIONS.map((section) => (
          <div
            key={section.id}
            ref={(el) => (sectionRefs.current[section.id] = el)}
            className="scroll-mt-32"
          >
            {/* Section Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-lime-400/20 rounded-xl flex items-center justify-center border border-lime-400/30">
                <span className="text-2xl font-bold text-lime-400">{section.number || '🎯'}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-lime-400">{section.title}</h2>
                {section.number && (
                  <p className="text-gray-400">Section {section.number}</p>
                )}
              </div>
            </div>

            {/* Horizontal Slideshow */}
            <HorizontalSlideshow section={section} />
          </div>
        ))}
      </div>

      {/* Footer Summary */}
      <div className="glass-dark rounded-2xl p-8 text-white border border-lime-400/20">
        <h3 className="text-2xl font-bold mb-6 flex items-center text-lime-400">
          <span className="text-3xl mr-3">🎯</span>
          Policy Implementation Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-dark rounded-xl p-6 border border-lime-400/10">
            <div className="text-4xl mb-3">⏱️</div>
            <h4 className="font-semibold text-lg mb-2 text-lime-400">Short-Term (0-6 Months)</h4>
            <p className="text-gray-300 text-sm">Quick wins: LTV adjustments, infrastructure fast-tracking, wage restraint</p>
          </div>
          <div className="glass-dark rounded-xl p-6 border border-lime-400/10">
            <div className="text-4xl mb-3">📅</div>
            <h4 className="font-semibold text-lg mb-2 text-lime-400">Medium-Term (6-24 Months)</h4>
            <p className="text-gray-300 text-sm">Fiscal reform, industrial clusters, R&D programs, admin reform</p>
          </div>
          <div className="glass-dark rounded-xl p-6 border border-lime-400/10">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-semibold text-lg mb-2 text-lime-400">Long-Term (2-7 Years)</h4>
            <p className="text-gray-300 text-sm">Education reform, capital markets, institutional reforms, regional development</p>
          </div>
        </div>
      </div>

      {/* Source Attribution */}
      <div className="text-center text-gray-400 text-sm">
        <p>Source: Sustainable Growth & Competitiveness Policy Framework</p>
        <p>Bulgarian National Bank & Ministry of Finance</p>
      </div>
    </div>
  );
};

export default EconomicPoliciesDashboard;

