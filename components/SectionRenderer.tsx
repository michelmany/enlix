'use client';

import AboutSection from '@/components/sections/AboutSection';
// import LinksSection from '@/components/sections/LinksSection';
// import ContactSection from '@/components/sections/ContactSection';
// import GallerySection from '@/components/sections/GallerySection';

import { SectionProps } from '@/types/section';

export default function SectionRenderer({ section, template }: SectionProps) {
  // Select component based on section type
  switch (section.type) {
    case 'about':
      return <AboutSection data={section.data} template={template} />;
    // case 'links':
    //   return <LinksSection data={section.data} template={template} />;
    // case 'contact':
    //   return <ContactSection data={section.data} template={template} />;
    // case 'gallery':
    //   return <GallerySection data={section.data} template={template} />;
    default:
      return <div>Unknown section type: {section.type}</div>;
  }
}
