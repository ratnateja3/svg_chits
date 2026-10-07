'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';

const MobileEnquirySheet = dynamic(
  () => import('./MobileEnquirySheet').then((mod) => mod.MobileEnquirySheet),
  { ssr: false },
);

const SESSION_DISMISSED_KEY = 'svg_chit_popup_dismissed';
const SESSION_SUBMITTED_KEY = 'svg_chit_popup_submitted';
const TIME_TRIGGER_MS = 8000;

export function MobileEnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const timeElapsedRef = useRef(false);
  const scrolledPastRef = useRef(false);
  const hasTriggeredRef = useRef(false);

  const checkAndOpen = useCallback(() => {
    if (hasTriggeredRef.current || isOpen) return;
    if (typeof window === 'undefined') return;

    // Check breakpoint: active only below md (< 768px)
    if (window.innerWidth >= 768) return;

    // Both conditions must be met: at least 8s and scrolled past trigger
    if (!timeElapsedRef.current || !scrolledPastRef.current) return;

    // Check sessionStorage
    try {
      if (
        sessionStorage.getItem(SESSION_DISMISSED_KEY) === 'true' ||
        sessionStorage.getItem(SESSION_SUBMITTED_KEY) === 'true'
      ) {
        return;
      }
    } catch {
      // Storage unavailable fallback
    }

    // Suppression checks:
    // 1. Mobile menu open
    const menuButton = document.querySelector('button[aria-controls="mobile-navigation-menu"][aria-expanded="true"]');
    const mobileMenu = document.getElementById('mobile-navigation-menu');
    if (menuButton || (mobileMenu && !mobileMenu.classList.contains('translate-x-full'))) return;

    // 2. Any input/textarea/select focused
    const activeEl = document.activeElement;
    if (
      activeEl &&
      (activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT')
    ) {
      return;
    }

    // 3. Visitor is already within the final enquiry CTA section or footer
    const finalCta = document.getElementById('final-enquiry-cta');
    const footer = document.querySelector('footer');
    const viewportHeight = window.innerHeight;

    if (finalCta) {
      const rect = finalCta.getBoundingClientRect();
      if (rect.top <= viewportHeight * 0.8 && rect.bottom >= 0) {
        return;
      }
    }

    if (footer) {
      const rect = footer.getBoundingClientRect();
      if (rect.top <= viewportHeight * 0.8) {
        return;
      }
    }

    // 4. Another dialog is open (excluding closed navigation menu)
    const otherDialogs = Array.from(document.querySelectorAll('dialog[open], [role="dialog"]'));
    const isOtherDialogOpen = otherDialogs.some((d) => {
      if (d.id === 'mobile-navigation-menu') {
        return !d.classList.contains('translate-x-full');
      }
      if (d.id === 'mobile-enquiry-sheet') return false;
      return true;
    });
    if (isOtherDialogOpen) return;

    // Trigger popup
    hasTriggeredRef.current = true;
    setIsOpen(true);
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 768) return;

    // Check sessionStorage immediately on arrival
    try {
      if (
        sessionStorage.getItem(SESSION_DISMISSED_KEY) === 'true' ||
        sessionStorage.getItem(SESSION_SUBMITTED_KEY) === 'true'
      ) {
        return;
      }
    } catch {
      // Proceed
    }

    // 8-second time trigger
    const timer = setTimeout(() => {
      timeElapsedRef.current = true;
      checkAndOpen();
    }, TIME_TRIGGER_MS);

    // Scroll trigger listener
    const handleScroll = () => {
      if (hasTriggeredRef.current) return;

      const groupsSection = document.getElementById('chit-groups');
      const scrollY = window.scrollY || window.pageYOffset;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Scrolled past roughly the end of open-groups section or ~50% of the page
      if (groupsSection) {
        const rect = groupsSection.getBoundingClientRect();
        // End of open-groups section reached or scrolled past its bottom
        if (rect.bottom <= window.innerHeight * 0.6) {
          scrolledPastRef.current = true;
        }
      } else if (totalDocHeight > 0 && scrollY / totalDocHeight >= 0.4) {
        scrolledPastRef.current = true;
      }

      if (scrolledPastRef.current) {
        checkAndOpen();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [checkAndOpen]);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(SESSION_DISMISSED_KEY, 'true');
    } catch {
      // Fallback
    }
  }, []);

  const handleSuccess = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_SUBMITTED_KEY, 'true');
    } catch {
      // Fallback
    }
  }, []);

  if (!isOpen) return null;

  return (
    <MobileEnquirySheet
      isOpen={isOpen}
      onClose={handleDismiss}
      onSuccess={handleSuccess}
    />
  );
}
