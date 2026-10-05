import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex flex-1 items-center justify-center">
        <Section spacing="lg">
          <Container size="narrow">
            <div className="mx-auto max-w-xl text-center">
              <span className="inline-block rounded-full border border-brand-gold-300 bg-brand-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold-900">
                404 &bull; Resource Not Found
              </span>

              <div className="mt-4">
                <SectionHeading
                  as="h1"
                  align="center"
                  title="Page Not Found"
                  description="The page you requested could not be located. It may have been moved, renamed, or is temporarily unavailable."
                />
              </div>

              <p className="mt-4 text-sm text-neutral-600">
                Please check the web address or use the shortcuts below to continue navigating our
                chit plans and company information.
              </p>

              {/* 3 Required Action Buttons */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Button href="/" variant="primary" className="w-full sm:w-auto">
                  Home
                </Button>
                <Button href="/chit-groups" variant="secondary" className="w-full sm:w-auto">
                  Chit Groups
                </Button>
                <Button href="/contact" variant="outline" className="w-full sm:w-auto">
                  Contact
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
