import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type Section = 'europe' | 'bulgaria' | 'details';

export const useScrollSection = () => {
  const [currentSection, setCurrentSection] = useState<Section>('europe');

  useEffect(() => {
    // Europe to Bulgaria transition
    ScrollTrigger.create({
      trigger: '.bulgaria-section',
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        setCurrentSection('bulgaria');
      },
      onLeaveBack: () => setCurrentSection('europe'),
      markers: false, // Set to true for debugging
    });

    // Bulgaria to Regional Details transition
    ScrollTrigger.create({
      trigger: '.details-section',
      start: 'top center',
      onEnter: () => setCurrentSection('details'),
      onLeaveBack: () => setCurrentSection('bulgaria'),
      markers: false,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return currentSection;
};

