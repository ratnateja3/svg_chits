import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-neutral-200 py-4">
        <Container>
          <Link
            href="/"
            className="rounded font-serif text-lg font-bold text-brand-purple-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
          >
            {siteConfig.name}
          </Link>
        </Container>
      </header>

      <main className="flex flex-1 items-center justify-center">
        <Section spacing="lg">
          <Container size="narrow">
            <div className="space-y-6 text-center">
              <span className="inline-block rounded border border-brand-purple-200/60 bg-brand-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-purple-800">
                404 Error
              </span>
              <SectionHeading
                as="h1"
                align="center"
                title="Page Not Found"
                description="The page you are looking for does not exist or may have been relocated."
              />
              <div className="flex justify-center gap-4 pt-4">
                <Button href="/" variant="primary">
                  Return to Home
                </Button>
                <Button href="/contact" variant="outline">
                  Contact Office
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
        <Container>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </Container>
      </footer>
    </div>
  );
}
