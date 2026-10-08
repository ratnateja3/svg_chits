import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyContactBar } from '@/components/layout/StickyContactBar';
import { AutoEnquiryModal } from '@/components/shared/AutoEnquiryModal';
import { PayInstallmentsModal } from '@/components/shared/PayInstallmentsModal';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-purple-900 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
      >
        Skip to main content
      </a>

      <Header />

      {/* Main content area with bottom padding on mobile to prevent StickyContactBar overlap */}
      <main id="main-content" className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>

      <Footer />

      {/* Sticky contact bar for mobile viewports */}
      <StickyContactBar />

      {/* Site-wide customer enquiry popup (triggered once per session after ~2.5s) */}
      <AutoEnquiryModal />

      {/* Online payment modal (triggered without page redirect) */}
      <PayInstallmentsModal />
    </div>
  );
}
