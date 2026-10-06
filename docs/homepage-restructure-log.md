# Homepage Restructuring Log

## Project Information
- **Client**: Shri Vijaya Ganapathi Chit Fund Pvt Ltd (Shamshabad, Hyderabad)
- **Framework**: Next.js (App Router), TypeScript, Tailwind CSS
- **Objective**: Reorganize homepage to reduce mobile scroll length from ~13-15 screens to a focused, conversion-oriented layout over 4 phases.

---

## Baseline Measurements (Pre-Phase 1)

Measurements taken via automated headless browser (Microsoft Edge via Playwright in headless mode) against production build (`npm run build` + `next start`) served at `http://localhost:3000`.

### Current Homepage Section Order
1. **Hero Section**: Primary headline "Disciplined Monthly Savings & Accessible Capital for Your Milestones", supporting description, 4 CTA links (Enquire Now, Explore Chit Groups, WhatsApp [if configured], Call Office), and 3 trust chips.
2. **Company Introduction (`IntroSection`)**: Detailed narrative about company background and statutory compliance under Chit Funds Act, 1982, plus "Verified Company Details" card (jurisdiction, registered address, direct office inquiries).
3. **Chit Groups Preview (`ChitPreviewSection`)**: "Featured Chit Groups" displaying 3 full-sized plan cards (2 open new groups + 1 running full group).
4. **How Chit Funds Work (`HowItWorksSection`)**: 6-step card grid explaining the chit fund lifecycle + educational disclaimer card.
5. **Why Choose Us (`WhyChooseUsSection`)**: 5 pillar cards + link to `/why-us`.
6. **Use Cases / Benefits (`BenefitsSection`)**: 6 practical use-case cards + financial understanding disclaimer.
7. **Enquiry CTA (`EnquiryCtaSection`)**: Final call to action card with Enquire Now, Browse All Schemes, WhatsApp, Call Office buttons.
8. **Social Media (`SocialSection`)**: Official communication channels (WhatsApp, Facebook, Instagram placeholders).
9. **Footer**: Navigation links, office address, statutory disclaimers, copyright notice.

### Baseline Document Height & Screen Ratios

| Viewport (Width x Height) | Document Height (px) | Total Screens (Height / Viewport Height) | Horizontal Scroll |
| :--- | :--- | :--- | :--- |
| **360 x 844** | 12,863 px | 15.24 screens | No (`window.scrollX` = 0) |
| **390 x 844** | 12,231 px | 14.49 screens | No (`window.scrollX` = 0) |
| **430 x 844** | 11,828 px | 14.01 screens | No (`window.scrollX` = 0) |
| **1280 x 800** | 6,763 px | 8.45 screens (8.01 screens at h:844) | No (`window.scrollX` = 0) |
| **1440 x 900** | 6,763 px | 7.51 screens (8.01 screens at h:844) | No (`window.scrollX` = 0) |

### Baseline Section Positions at 390 x 844 px

| Section | Heading / Element | Offset Top (px) | Height (px) | Start Screen | End Screen |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1. Hero | "Disciplined Monthly Savings & Accessible Capital..." | 81 px | 832 px | 0.10 | 1.08 |
| 2. Intro | "Shri Vijaya Ganapathi Chit Fund Pvt Ltd" | 913 px | 1,475 px | 1.08 | 2.83 |
| 3. Featured Groups | "Featured Chit Groups" | 2,388 px | 1,656 px | 2.83 | 4.79 |
| 4. How It Works | "How Chit Funds Work" | 4,044 px | 2,108 px | 4.79 | 7.29 |
| 5. Why Choose Us | "Why Choose Shri Vijaya Ganapathi Chit Fund" | 6,152 px | 1,735 px | 7.29 | 9.34 |
| 6. Use Cases | "Real-World Use Cases for Chit Schemes" | 7,887 px | 2,025 px | 9.34 | 11.74 |
| 7. Final Enquiry CTA | "Interested in Exploring a Registered Chit Group?" | 9,911 px | 731 px | 11.74 | 12.61 |
| 8. Social Channels | "Official Communication & Channels" | 10,642 px | 419 px | 12.61 | 13.11 |
| 9. Footer | Footer navigation & legal details | 11,061 px | 1,170 px | 13.11 | 14.49 |

- **Chit Groups Start**: 2.83 screens from top (~2,388 px)
- **Final CTA Start**: 11.74 screens from top (~9,911 px)

---

## Phase 1 Implementation Log

### Changes Summary
1. **Hero Optimization**:
   - Added location eyebrow above H1: `"Registered Chit Fund • Shamshabad, Hyderabad"` using dynamic `siteConfig.address.area` and `siteConfig.address.city`.
   - H1 text, hero copy, and three trust chips preserved exactly as originally authored.
   - Removed duplicate/competing `"Explore Chit Groups"` button.
   - Restricted `"Call Office"` CTA to desktop viewports (`lg` breakpoint and above) since mobile viewports already have the sticky contact bar.
   - Preserved WhatsApp helper behavior (only displays if configured in `siteConfig`).
   - Refined hero vertical padding (`py-10 sm:py-14 md:py-16 lg:py-20`) to keep open groups above ~1.5 screens on mobile.
2. **Open Chit Groups Section (Replaced Featured Groups)**:
   - Moved directly below the Hero + Trust chips (Section 2 on homepage).
   - Filtered exclusively for open schemes (`getOpenChitPlans()`), showing only the 2 confirmed open groups: ₹15,00,000 (30M/30 members) and ₹6,00,000 (30M/30 members). Running/full schemes (including the ₹30,00,000 group) are omitted from the homepage.
   - Replaced 3-column grid with a dedicated 2-column layout (`grid-cols-1 md:grid-cols-2`) to avoid awkward trailing columns.
   - Introduced a new `compact` variant on `ChitPlanCard` showing only: prominent status badge, total chit value once, `"30 months - 30 members"`, and `"Enquire for This Group"` CTA.
   - Preserved default `ChitPlanCard` layout for `/chit-groups`, leaving all 9 groups with complete information unchanged.
   - Added informative notes below cards:
     - Clarified that monthly contribution details are shared on enquiry.
     - Dynamically calculated count of running/full groups (`7 other chit groups are currently running or full`) with link `"View all chit groups"` to `/chit-groups`.
     - Provided a graceful fallback in the event of zero open groups.

### Post-Phase 1 Document Height & Screen Ratios

| Viewport (Width x Height) | Document Height (px) | Total Screens (Height / Viewport Height) | Horizontal Scroll | Difference vs Baseline |
| :--- | :--- | :--- | :--- | :--- |
| **360 x 844** | 12,060 px | 14.29 screens | No (`window.scrollX` = 0) | -803 px (-0.95 screens) |
| **390 x 844** | 11,530 px | 13.66 screens | No (`window.scrollX` = 0) | -701 px (-0.83 screens) |
| **430 x 844** | 11,111 px | 13.16 screens | No (`window.scrollX` = 0) | -717 px (-0.85 screens) |
| **1280 x 800** | 6,741 px | 8.43 screens (7.99 screens at h:844) | No (`window.scrollX` = 0) | -22 px (-0.02 screens) |
| **1440 x 900** | 6,741 px | 7.49 screens (7.99 screens at h:844) | No (`window.scrollX` = 0) | -22 px (-0.02 screens) |

### Post-Phase 1 Section Positions at 390 x 844 px

| Section | Heading / Element | Offset Top (px) | Height (px) | Start Screen | End Screen |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1. Hero | "Disciplined Monthly Savings & Accessible Capital..." | 81 px | 813 px | 0.10 | 1.06 |
| 2. Open Chit Groups | "Chit Groups Open for Enquiry" | 894 px | 974 px | 1.06 | 2.21 |
| 3. Intro (About) | "Shri Vijaya Ganapathi Chit Fund Pvt Ltd" | 1,868 px | 1,475 px | 2.21 | 3.96 |
| 4. How It Works | "How Chit Funds Work" | 3,343 px | 2,108 px | 3.96 | 6.46 |
| 5. Why Choose Us | "Why Choose Shri Vijaya Ganapathi Chit Fund" | 5,451 px | 1,735 px | 6.46 | 8.51 |
| 6. Use Cases | "Real-World Use Cases for Chit Schemes" | 7,186 px | 2,025 px | 8.51 | 10.91 |
| 7. Final Enquiry CTA | "Interested in Exploring a Registered Chit Group?" | 9,210 px | 731 px | 10.91 | 11.78 |
| 8. Social Channels | "Official Communication & Channels" | 9,941 px | 419 px | 11.78 | 12.27 |
| 9. Footer | Footer navigation & legal details | 10,360 px | 1,170 px | 12.27 | 13.66 |

### Key Metric Comparison at 390px

| Metric | Baseline | Post-Phase 1 | Target | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Open Groups Section Start** | 2.83 screens (2,388 px) | **1.06 screens (894 px)** | Within ~1.5 screens | PASS |
| **Final CTA Position** | 11.74 screens (9,911 px) | **10.91 screens (9,210 px)** | Approaching target (~7 screens across 4 phases) | PROGRESSING |
| **Total Page Height** | 14.49 screens (12,231 px) | **13.66 screens (11,530 px)** | Progressive reduction | -701 px (-0.83 screens) |
| **Touch Targets** | >= 44 px for primary buttons | **All key CTAs >= 44 px** | >= 44 px | PASS |
| **Horizontal Scroll** | 0 px | **0 px** | 0 px | PASS |

