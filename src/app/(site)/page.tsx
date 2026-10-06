import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';
import { buildPageMetadata } from '@/lib/seo';
import { HeroSection } from '@/components/home/HeroSection';
import { ChitPreviewSection } from '@/components/home/ChitPreviewSection';
import { TrustCompanySection } from '@/components/home/TrustCompanySection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { EnquiryCtaSection } from '@/components/home/EnquiryCtaSection';
import { SocialSection } from '@/components/home/SocialSection';

export const metadata: Metadata = buildPageMetadata({
  title: `${siteConfig.name} | Registered Chit Fund Company in Hyderabad`,
  description:
    'Shri Vijaya Ganapathi Chit Fund Pvt Ltd in Shamshabad, Hyderabad provides disciplined monthly savings schemes and planned capital access under the Chit Funds Act, 1982.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Open Chit Groups */}
      <ChitPreviewSection />

      {/* 3. Trust & Company Profile */}
      <TrustCompanySection />

      {/* 4. How Chit Funds Work */}
      <HowItWorksSection />

      {/* 5. Benefits / Use Cases */}
      <BenefitsSection />

      {/* 6. Enquiry CTA */}
      <EnquiryCtaSection />

      {/* 7. Social Media Section */}
      <SocialSection />
    </>
  );
}
