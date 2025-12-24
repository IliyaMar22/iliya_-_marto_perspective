import { motion } from 'framer-motion';
import type { Section } from '../../hooks/useScrollSection';

interface NavigationDotsProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

const sections: { id: Section; label: string }[] = [
  { id: 'europe', label: 'Europe Overview' },
  { id: 'bulgaria', label: 'Bulgaria' },
  { id: 'details', label: 'Regional Details' },
];

export default function NavigationDots({ currentSection, onNavigate }: NavigationDotsProps) {
  const scrollToSection = (sectionId: Section) => {
    const element = document.querySelector(`.${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => {
            scrollToSection(section.id);
            onNavigate(section.id);
          }}
          className="group relative"
        >
          <motion.div
            className={`w-3 h-3 rounded-full border-2 transition-all ${
              currentSection === section.id
                ? 'border-lime-400 bg-lime-400'
                : 'border-gray-400 bg-transparent hover:border-lime-400'
            }`}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-black/90 backdrop-blur-lg border border-lime-400 px-3 py-1 rounded-lg text-lime-400 text-sm whitespace-nowrap">
              {section.label}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

