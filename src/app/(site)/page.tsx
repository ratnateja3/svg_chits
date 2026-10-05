import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';
import { HeroSection } from '@/components/home/HeroSection';
import { IntroSection } from '@/components/home/IntroSection';
import { ChitPreviewSection } from '@/components/home/ChitPreviewSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { EnquiryCtaSection } from '@/components/home/EnquiryCtaSection';
import { SocialSection } from '@/components/home/SocialSection';

export const metadata: Metadata = {
  title: `${siteConfig.name} | Trusted Govt. Registered Chit Fund`,
  description:
    'Shri Vijaya Ganapathi Chit Fund Pvt Ltd in Shamshabad, Hyderabad provides disciplined monthly savings schemes and accessible capital under the Chit Funds Act, 1982.',
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Company Introduction */}
      <IntroSection />

      {/* 3. Chit Groups Preview */}
      <ChitPreviewSection />

      {/* 4. How Chit Funds Work */}
      <HowItWorksSection />

      {/* 5. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 6. Benefits / Use Cases */}
      <BenefitsSection />

      {/* 7. Enquiry CTA */}
      <EnquiryCtaSection />

      {/* 8. Social Media Section */}
      <SocialSection />
    </>
  );
}
