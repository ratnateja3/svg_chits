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


---

## Mobile Header Overflow Fix

### Root Cause Diagnosis
1. **Non-shrinking brand wrapper in `Header.tsx`**:
   The header flex layout wrapped the brand logo component in `<div className="flex-shrink-0">`, explicitly preventing the brand identity block from shrinking within the flex container.
2. **Missing `min-w-0` and rigid text width in `Logo.tsx`**:
   The `Logo` component lacked `min-w-0` on its `<Link>` and text `<div>` flex containers. Because flex children default to `min-width: auto`, the container's intrinsic minimum width was dictated by the single-line width of the full 41-character brand name `"Shri Vijaya Ganapathi Chit Fund Pvt Ltd"`, measuring ~289.5px in bold serif typography.
3. **Rigid total row width exceeding narrow viewports**:
   Summing the container horizontal padding (`px-4` = 32px), logo graphic (40px), logo gap (12px), company title text (~289.5px), header flex gap (16px), and hamburger button (44px) resulted in a rigid content row of ~417.5px.
   Consequently, for all viewport widths below 418px (320px, 360px, 375px, 390px, 393px, 402px, and 412px), the header row exceeded the viewport width, pushing the hamburger trigger button off-screen to the right by up to 97.5px and creating a fixed 417px `scrollWidth` horizontal overflow across every page of the application.

### Viewport Measurement Diagnosis (Pre-Fix vs Post-Fix)

Automated headless browser measurements (Microsoft Edge via Playwright in headless mode) against production build served at `http://localhost:3000`:

| Viewport Width | Pre-Fix clientWidth | Pre-Fix scrollWidth | Pre-Fix Overflow | Post-Fix clientWidth | Post-Fix scrollWidth | Post-Fix Overflow | Delta |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **320 px** | 320 px | 417 px | YES (+97 px) | 320 px | 320 px | **NO (0 px)** | -97 px |
| **360 px** | 360 px | 417 px | YES (+57 px) | 360 px | 360 px | **NO (0 px)** | -57 px |
| **375 px** | 375 px | 417 px | YES (+42 px) | 375 px | 375 px | **NO (0 px)** | -42 px |
| **390 px** | 390 px | 417 px | YES (+27 px) | 390 px | 390 px | **NO (0 px)** | -27 px |
| **393 px** | 393 px | 417 px | YES (+24 px) | 393 px | 393 px | **NO (0 px)** | -24 px |
| **402 px** | 402 px | 417 px | YES (+15 px) | 402 px | 402 px | **NO (0 px)** | -15 px |
| **412 px** | 412 px | 417 px | YES (+5 px) | 412 px | 412 px | **NO (0 px)** | -5 px |
| **430 px** | 430 px | 430 px | NO (0 px) | 430 px | 430 px | **NO (0 px)** | 0 px |
| **440 px** | 440 px | 440 px | NO (0 px) | 440 px | 440 px | **NO (0 px)** | 0 px |

### List of Overflowing Elements Identified Before Fix (at 320px)

1. `<div class="flex-shrink-0">`: measured width 341.5px, right edge 357.5px (exceeded viewport by 37.5px) — Brand wrapper in `Header.tsx`.
2. `<a class="inline-flex items-center gap-3 ...">`: measured width 341.5px, right edge 357.5px (exceeded viewport by 37.5px) — `Logo.tsx` anchor.
3. `<div class="flex flex-col">`: measured width 289.5px, right edge 357.5px (exceeded viewport by 37.5px) — Brand text container in `Logo.tsx`.
4. `<span class="font-serif text-base font-bold ...">`: measured width 289.5px, right edge 357.5px (exceeded viewport by 37.5px) — Company name text in `Logo.tsx`.
5. `<div class="flex items-center lg:hidden">`: measured width 44px, right edge 417.5px (exceeded viewport by 97.5px) — Mobile nav wrapper in `MobileNav.tsx`.
6. `<button class="inline-flex min-h-[44px] min-w-[44px] ...">`: measured width 44px, right edge 417.5px (exceeded viewport by 97.5px) — Hamburger button in `MobileNav.tsx`.

### Root Cause Fix Applied

Changes restricted strictly to header and mobile navigation layout:
1. **`src/components/layout/Header.tsx`**:
   - Replaced `<div className="flex-shrink-0">` with `<div className="min-w-0 flex-1 lg:flex-initial lg:shrink-0">`, allowing the brand container to shrink on mobile while preserving the desktop layout.
   - Refined mobile row gap to `gap-2 min-w-0 sm:gap-4` to conserve space on narrow viewports while maintaining existing spacing on larger screens.
2. **`src/components/shared/Logo.tsx`**:
   - Added `min-w-0 max-w-full` on the `<Link>` container and `min-w-0` on the text flex column.
   - Allowed company name to wrap onto two lines without ellipsis truncation (`"Shri Vijaya Ganapathi Chit Fund"` / `"Pvt Ltd"` at 320px).
   - Scaled logo graphic slightly at narrow widths (`h-9 w-9 shrink-0 sm:h-10 sm:w-10 md:h-11 md:w-11`), strictly preserving its 1:1 aspect ratio without cropping.
   - Applied responsive type scaling (`text-[13px] min-[360px]:text-sm min-[430px]:text-base sm:text-base lg:text-lg` and tagline `text-[10px] min-[430px]:text-[11px]`).
3. **`src/components/layout/MobileNav.tsx`**:
   - Added `shrink-0` to the trigger wrapper `<div className="flex shrink-0 items-center lg:hidden">` and the button `<button ... className="... shrink-0 ...">` to ensure the hamburger button never collapses below 44x44px.
   - Retained 16px clear space from the viewport right edge via `Container`'s `px-4`.

### Verification Across All Routes

All 10 routes plus 404 were audited across all 11 viewports (320px, 360px, 375px, 390px, 393px, 402px, 412px, 430px, 440px, 1280px, 1440px):
- **Finding**: Every single route previously showed horizontal overflow at widths 320px–412px exclusively due to the shared `Header` component in `SiteLayout`.
- **Finding**: No other element or route outside the header contributed to horizontal overflow.
- **Result**: Following the header fix, every route achieved `scrollWidth === clientWidth` across all 11 viewports.

### Mobile Navigation Drawer & Sticky Contact Bar Checks

1. **Mobile Menu Panel (`MobileNav.tsx`)**:
   - Tested open drawer across all viewports.
   - At 320px: drawer width 320px, right edge 320px, `scrollWidth: 320px`, `clientWidth: 320px` (zero horizontal overflow).
   - All drawer navigation touch targets maintain `>= 44px` height (links `min-h-[48px]`, Pay Now `min-h-[44px]`, Enquire Now `min-h-[48px]`, Close button `min-h-[44px]`, Call link `min-h-[44px]`).
2. **Sticky Contact Bar (`StickyContactBar.tsx`)**:
   - Fixed at bottom of mobile viewports (`fixed bottom-0 left-0 right-0 z-40`).
   - Does not overlap the header or hamburger button (`sticky top-0 z-30`).
   - Page `<main>` includes `pb-20 lg:pb-0` to guarantee sticky bar never obscures page content.

---

## Phase 2 Implementation Log: Single Trust + Company Section

### Composition Changes
1. **Replaced Sections**:
   - Removed old `IntroSection` (About narrative + verified details card) from homepage composition.
   - Removed old `WhyChooseUsSection` (5 separate pillar cards) from homepage composition.
   - Left both component files in `src/components/home/` intact (reported below as unused components).
   - Inner pages `/about` and `/why-us` remain completely untouched with full original content intact.
2. **Introduced `TrustCompanySection`**:
   - Placed directly after Section 2 (`ChitPreviewSection` / Open Chit Groups).
   - **H2 Heading**: Reused existing About heading text (`title={siteConfig.name}`, `badge="About Our Company"`).
   - **2-3 Line Company Introduction**: Trimmed from existing About copy, keeping closest original wording without new or strengthened claims.
   - **4 Concise Trust Points**: Reused 4 cards from Why Us (Transparent Process, Customer-Focused Service, Professional Approach, Accessible Local Support), each with an H3 title and one short line trimmed from existing card text. ("Convenient Chit Options" remains exclusively on `/why-us`).
   - **Compact Registered-Office / Legal-Details Block**: Reused details-card styling and exact labels (`Legal Entity`, `Statutory Basis`, `Registered Address`, `Phone`), dynamically bound to `siteConfig`.
   - **Descriptive Links**: Added `"Learn more about our company →"` (`/about`) and `"See why choose us →"` (`/why-us`), both with `>= 44px` touch targets.
   - **Layout**: Stacked on mobile; 7/5 two-column layout on desktop (`lg:grid-cols-12`).

### Sentence Trimming Log (Exact Before & After)

#### 1. Company Introduction (placed in `content/site.ts` as `siteConfig.shortIntro`)
- **Before (from `IntroSection.tsx` Paragraph 1)**:
  `"Shri Vijaya Ganapathi Chit Fund Pvt Ltd operates in full accordance with the statutory provisions of the Chit Funds Act, 1982 in the State of Telangana. We serve individual savers, salaried professionals, self-employed individuals, and local business enterprises seeking a reliable, structured path to accumulate capital and access financial liquidity."`
- **After (trimmed to 2-3 lines in `content/site.ts`)**:
  `"Shri Vijaya Ganapathi Chit Fund Pvt Ltd operates in accordance with the statutory provisions of the Chit Funds Act, 1982 in the State of Telangana. We serve individual savers, salaried professionals, and local business enterprises seeking a structured path to accumulate capital and access financial liquidity."`
  *(Rationale: Removed "full" to maintain exact claim level; condensed list while preserving exact original wording).*

#### 2. Trust Point 1: Transparent Process (in `content/why-us.ts`)
- **Before (from `WhyChooseUsSection.tsx` Pillar 1)**:
  `"All group operations, monthly auction schedules, bid discounts, and dividend distributions are conducted openly with clear documentation under statutory rules."`
- **After (trimmed short line)**:
  `"Group operations, monthly auction schedules, bid discounts, and dividend distributions are conducted openly with clear documentation under statutory rules."`
  *(Rationale: Removed "All ", preserving exact original phrasing).*

#### 3. Trust Point 2: Customer-Focused Service (in `content/why-us.ts`)
- **Before (from `WhyChooseUsSection.tsx` Pillar 2)**:
  `"Dedicated guidance from enrollment to prize disbursement. We assist members at every step to ensure your financial objectives are seamlessly met."`
- **After (trimmed short line)**:
  `"Dedicated guidance from enrollment to prize disbursement, assisting members at every step."`
  *(Rationale: Compacted compound sentence into a single descriptive clause).*

#### 4. Trust Point 3: Professional Approach (in `content/why-us.ts`)
- **Before (from `WhyChooseUsSection.tsx` Pillar 4)**:
  `"Strict compliance with the Chit Funds Act, 1982, systematic accounting practices, and reliable administrative oversight for every subscriber group."`
- **After (trimmed short line)**:
  `"Strict compliance with the Chit Funds Act, 1982, systematic accounting, and reliable administrative oversight."`
  *(Rationale: Compacted list items while preserving exact original terms).*

#### 5. Trust Point 4: Accessible Local Support (in `content/why-us.ts`)
- **Before (from `WhyChooseUsSection.tsx` Pillar 5)**:
  `"Direct assistance from our registered office in Shamshabad, Hyderabad. Members can easily consult with our team in person or via verified contact channels."`
- **After (trimmed short line)**:
  `"Direct assistance from our registered office in Shamshabad, Hyderabad, in person or via verified contact channels."`
  *(Rationale: Combined into single concise sentence preserving exact original terms).*

---

## Content-Review Items (Wording to verify before launch)

Phrases tagged with `CONTENT-REVIEW` in content files and logged for pre-launch verification:

| Phrase / Category | Exact Location(s) in Codebase | Context / Label | Notes / Guidance |
| :--- | :--- | :--- | :--- |
| **"Government Registered Chit Fund"** | `src/components/shared/Logo.tsx:50` | Brand tagline under logo | Verify whether official tagline should state "Govt. Registered Chit Fund" or "Registered Chit Fund Company". |
| **"government-registered"** | `src/components/home/IntroSection.tsx:20`, `src/components/home/TrustCompanySection.tsx:23`, `src/app/(site)/about/page.tsx:52` | Section heading description | Verify preferred casing and phrasing for statutory registration representation. |
| **"Verified Company Details"** | `src/components/home/IntroSection.tsx:65`, `src/components/home/TrustCompanySection.tsx:71` | Eyebrow label on legal details card | UI label identifying official statutory profile and office details. |
| **"complete transparency"** | `src/components/home/IntroSection.tsx:43`, `src/app/(site)/why-us/page.tsx:62` | Narrative text on About and Why Us | Review whether absolute modifier "complete" is preferred or should be "transparent group administration". |
| **Legal-basis / Statutory Wording** | `src/content/site.ts:16`, `src/content/why-us.ts:14,28`, `src/components/home/TrustCompanySection.tsx:86`, `src/app/(site)/about/page.tsx:21,70,114`, `src/app/(site)/why-us/page.tsx:13,21,138` | Reference to Chit Funds Act, 1982 and Telangana state jurisdiction | Ensure correct statutory reference phrasing across all public descriptions. |
| **Dividend Wording** | `src/content/why-us.ts:13`, `src/app/(site)/about/page.tsx:21,82`, `src/app/(site)/why-us/page.tsx:26,47`, `src/content/process-steps.ts:28`, `src/components/home/BenefitsSection.tsx:11` | Reference to auction bid discounts and dividend distributions | Ensure explanation accurately depicts dividend distribution mechanisms under the Act. |
| **Emergency-Liquidity Wording** | `src/content/site.ts:16`, `src/components/home/IntroSection.tsx:32`, `src/app/(site)/about/page.tsx:31`, `src/content/process-steps.ts:37`, `src/components/home/BenefitsSection.tsx:42` | Reference to accumulated capital and financial liquidity | Verify description of access to funds via competitive monthly auctions. |
| **Google Sheet Enquiry Storage** | `docs/enquiry-spreadsheet-setup.md`, `src/lib/enquiry.ts` | Customer PII backup copy in Google Sheets | Privacy Policy and Terms must mention the Google Sheet copy of enquiries if STEP 7 is enabled. |


---

## Comprehensive Validation & Evidence Matrix

### 1. Route Response & Content Integrity
- `npm run lint`: **0 errors, 0 warnings** (PASS)
- `npx tsc --noEmit`: **0 type errors** (PASS)
- `npm run build`: **Compiled successfully** in production mode (PASS)
- All 11 routes return valid HTTP responses:
  - `http://localhost:3000/` → **200 OK**
  - `http://localhost:3000/about` → **200 OK**
  - `http://localhost:3000/chit-groups` → **200 OK**
  - `http://localhost:3000/how-chit-funds-work` → **200 OK**
  - `http://localhost:3000/why-us` → **200 OK**
  - `http://localhost:3000/faqs` → **200 OK**
  - `http://localhost:3000/contact` → **200 OK**
  - `http://localhost:3000/pay-now` → **200 OK**
  - `http://localhost:3000/privacy-policy` → **200 OK**
  - `http://localhost:3000/terms-and-conditions` → **200 OK**
  - `http://localhost:3000/not-found-page-404` → **404 Not Found**
- Content integrity on inner pages:
  - `/about`: Confirmed full original presence of "Who We Are", "Our Mission", "Our Vision", "Our Core Values", and "Company Identity & Profile".
  - `/why-us`: Confirmed full original presence of "Our Principles of Reliability", 6 trust pillar cards, and comparison table "Registered Chit Funds vs. Informal Circles".

### 2. Comprehensive Overflow Matrix (All Routes x All Viewports)

Measured via automated headless browser (Microsoft Edge via Playwright) reporting `scrollWidth` vs `clientWidth`:

| Route | 320px | 360px | 375px | 390px | 393px | 402px | 412px | 430px | 440px | 1280px | 1440px |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `/` | 320/320 (PASS) | 360/360 (PASS) | 375/375 (PASS) | 390/390 (PASS) | 393/393 (PASS) | 402/402 (PASS) | 412/412 (PASS) | 430/430 (PASS) | 440/440 (PASS) | 1280/1280 (PASS) | 1440/1440 (PASS) |
| `/about` | 320/320 (PASS) | 360/360 (PASS) | 375/375 (PASS) | 390/390 (PASS) | 393/393 (PASS) | 402/402 (PASS) | 412/412 (PASS) | 430/430 (PASS) | 440/440 (PASS) | 1280/1280 (PASS) | 1440/1440 (PASS) |
| `/chit-groups` | 320/320 (PASS) | 360/360 (PASS) | 375/375 (PASS) | 390/390 (PASS) | 393/393 (PASS) | 402/402 (PASS) | 412/412 (PASS) | 430/430 (PASS) | 440/440 (PASS) | 1280/1280 (PASS) | 1440/1440 (PASS) |
| `/how-chit-funds-work` | 320/320 (PASS) | 360/360 (PASS) | 375/375 (PASS) | 390/390 (PASS) | 393/393 (PASS) | 402/402 (PASS) | 412/412 (PASS) | 430/430 (PASS) | 440/440 (PASS) | 1280/1280 (PASS) | 1440/1440 (PASS) |
| `/why-us` | 320/320 (PASS) | 360/360 (PASS) | 375/375 (PASS) | 390/390 (PASS) | 393/393 (PASS) | 402/402 (PASS) | 412/412 (PASS) | 430/430 (PASS) | 440/440 (PASS) | 1280/1280 (PASS) | 1440/1440 (PASS) |
| `/faqs` | 320/320 (PASS) | 360/360 (PASS) | 375/375 (PASS) | 390/390 (PASS) | 393/393 (PASS) | 402/402 (PASS) | 412/412 (PASS) | 430/430 (PASS) | 440/440 (PASS) | 1280/1280 (PASS) | 1440/1440 (PASS) |
| `/contact` | 320/320 (PASS) | 360/360 (PASS) | 375/375 (PASS) | 390/390 (PASS) | 393/393 (PASS) | 402/402 (PASS) | 412/412 (PASS) | 430/430 (PASS) | 440/440 (PASS) | 1280/1280 (PASS) | 1440/1440 (PASS) |
| `/pay-now` | 320/320 (PASS) | 360/360 (PASS) | 375/375 (PASS) | 390/390 (PASS) | 393/393 (PASS) | 402/402 (PASS) | 412/412 (PASS) | 430/430 (PASS) | 440/440 (PASS) | 1280/1280 (PASS) | 1440/1440 (PASS) |
| `/privacy-policy` | 320/320 (PASS) | 360/360 (PASS) | 375/375 (PASS) | 390/390 (PASS) | 393/393 (PASS) | 402/402 (PASS) | 412/412 (PASS) | 430/430 (PASS) | 440/440 (PASS) | 1280/1280 (PASS) | 1440/1440 (PASS) |
| `/terms-and-conditions` | 320/320 (PASS) | 360/360 (PASS) | 375/375 (PASS) | 390/390 (PASS) | 393/393 (PASS) | 402/402 (PASS) | 412/412 (PASS) | 430/430 (PASS) | 440/440 (PASS) | 1280/1280 (PASS) | 1440/1440 (PASS) |
| `/not-found-page-404` | 320/320 (PASS) | 360/360 (PASS) | 375/375 (PASS) | 390/390 (PASS) | 393/393 (PASS) | 402/402 (PASS) | 412/412 (PASS) | 430/430 (PASS) | 440/440 (PASS) | 1280/1280 (PASS) | 1440/1440 (PASS) |

### 3. Header & Hamburger Measurements at Key Viewports

| Viewport | Hamburger Size (W x H) | Hamburger Right Edge | Space From Right Edge | Closed Header Overflow | Open Drawer Right Edge | Open Drawer Overflow |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **320 px** | 44.0 x 44.0 px | 304.0 px | **16.0 px** (>= 8 px) | 0 px (PASS) | 320.0 px | 0 px (PASS) |
| **375 px** | 44.0 x 44.0 px | 359.0 px | **16.0 px** (>= 8 px) | 0 px (PASS) | 375.0 px | 0 px (PASS) |
| **393 px** | 44.0 x 44.0 px | 377.0 px | **16.0 px** (>= 8 px) | 0 px (PASS) | 393.0 px | 0 px (PASS) |

### 4. Post-Phase 2 Document Height & Screen Ratios at 390px

| Viewport (Width x Height) | Baseline Height | Post-Phase 1 Height | Post-Phase 2 Height | Total Screens (at h:844) | Total Screens (at h:800) | Net Reduction vs Baseline |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **390 x 844 px** | 12,231 px (14.49 screens) | 11,530 px (13.66 screens) | **9,998 px** | **11.85 screens** | 12.50 screens | **-2,233 px (-2.64 screens)** |

### 5. Homepage Semantic Structure & Accessibility
- **H1 Elements**: Exactly 1 (`"Disciplined Monthly Savings & Accessible Capital for Your Milestones"`).
- **H2 Sequence**:
  1. `"Chit Groups Open for Enquiry"` (Section 2 - Open Groups)
  2. `"Shri Vijaya Ganapathi Chit Fund Pvt Ltd"` (Section 3 - Trust & Company Section)
  3. `"How Chit Funds Work"` (Section 4 - Process)
  4. `"Real-World Use Cases for Chit Schemes"` (Section 5 - Use Cases)
  5. `"Interested in Exploring a Registered Chit Group?"` (Section 6 - Final CTA)
  6. `"Official Communication & Channels"` (Section 7 - Social Channels)
- **H3 Order**: Properly nested under parent sections (4 trust points in Section 3, process steps in Section 4, use cases in Section 5).
- **Address & Phone**: Read dynamically from `siteConfig.address` and `siteConfig.contact.phoneDisplay` in `content/site.ts`.
- **Touch Targets**: All key CTA buttons and links maintain `>= 44px` touch targets.

---

## Phase 3 Resume Audit

Conducted following computer shutdown / session interruption prior to resuming Phase 3 work.

### 1. Working Tree & Git Status
- **Current Branch**: `phase-10-wip` (matches upstream `origin/phase-10-wip`).
- **Working Tree State**: Clean (`git status` reports `nothing to commit, working tree clean`).
- **Committed Pre-interruption Changes**: Changes from the interrupted Phase 3 run were committed into HEAD commit `3e163b4` ("phase 10 wip"):
  - `src/app/(site)/how-chit-funds-work/page.tsx` (added `<BenefitsSection />` component)
  - `src/components/home/BenefitsSection.tsx` (added `CONTENT-REVIEW` comments for dividend and liquidity wording)
  - `src/components/home/CompactHowItWorksSection.tsx` (created compact 6-step section with combined notices)
  - `src/components/home/EnquiryCtaSection.tsx` (updated CTA buttons, added FAQ link, removed address)
  - `src/content/process-steps.ts` (created with neutral `shortDescription` fields and `CONTENT-REVIEW` tags)
  - `src/lib/enquiry.ts` (added phone normalization, submission ID, flat snake_case payload, parallel sheet fetch)
  - `src/types/index.ts` (added `formLocation` and `pagePath` to `EnquiryFormData`)
- **Untracked / Added Files**: None.

### 2. Step-by-Step Status Assessment
- **STEP 2 (Compact How It Works)**: **Partially Done**.
  - `src/content/process-steps.ts` exists with additive `shortDescription` strings for all 6 steps.
  - `src/components/home/CompactHowItWorksSection.tsx` exists and implements the single step number, mobile vertical list, and desktop 3x2 grid, merging educational and financial understanding notices.
  - *Missing*: Homepage `src/app/(site)/page.tsx` still renders the old `HowItWorksSection`. Needs to swap in `CompactHowItWorksSection`.
- **STEP 3 (Final Enquiry CTA)**: **Done**.
  - `src/components/home/EnquiryCtaSection.tsx` preserves heading, sets Enquire Now (primary), Call Our Office (secondary), conditional WhatsApp link, link to `/faqs`, removes repeated office address, and preserves confidentiality sentence.
- **STEP 4 (Removals and Use Cases Retention)**: **Partially Done**.
  - `src/app/(site)/how-chit-funds-work/page.tsx` successfully includes `<BenefitsSection />` before the final CTA.
  - *Missing*: Homepage `src/app/(site)/page.tsx` still renders `BenefitsSection` and `SocialSection`. Both must be removed from the homepage composition.
- **STEP 5 (Mobile Enquiry Popup)**: **Not Started**.
  - No popup component, trigger hook, or lazy import in homepage exists.
- **STEP 6 (Enquiry Payload & Delivery Check)**: **Partially Done**.
  - Phone normalization and snake_case payload exist in `src/lib/enquiry.ts`.
  - *Refinements needed*: Ensure `submission_id` uses `crypto.randomUUID` with safe fallback; ensure all 15 specified fields are always present with empty strings for unset values; remove extra `submitted_at`; add mock endpoint verification tests.
- **STEP 7 (Optional Spreadsheet Copy & Documentation)**: **Partially Done**.
  - Client-side parallel `no-cors` fetch to `NEXT_PUBLIC_SHEET_ENDPOINT` is coded in `src/lib/enquiry.ts`.
  - *Missing*: Documentation in `.env.example` and `README.md`; `docs/enquiry-spreadsheet-setup.md` is not yet created; privacy policy content-review note not yet logged.

### 3. Code Integrity & Damage Check (Pre-edit)
- `npm run lint`: **0 warnings, 0 errors** (PASSED)
- `npx tsc --noEmit`: **0 type errors** (PASSED)
- `npm run build`: **Compiled successfully** in 43s (PASSED)
  - Baseline First Load JS for `/`: **111 kB** (Page size: 4.88 kB, Shared: 103 kB)
- File integrity: All files are syntactically valid with no truncated blocks, dangling imports, or merge conflicts.

### 4. Leftover Artifacts Check
- No temporary mock servers, scripts, test files, stray logs, or external screenshots exist.
- No `.env` or `.env.local` files exist with localhost endpoints or sensitive credentials.
- Action taken: None needed (no leftovers detected).

### 5. Phases 1 and 2 Integrity Check
- **Phase 1**: Verified present (Hero with location eyebrow, 3 trust chips, lg-only call CTA; open chit groups showing only 2 schemes with compact cards; dynamic running groups count).
- **Mobile Header Fix**: Verified present (`min-w-0 flex-1 lg:flex-initial lg:shrink-0` in `Header.tsx`, `min-w-0 max-w-full` in `Logo.tsx`, `shrink-0` in `MobileNav.tsx`). Zero overflow at widths 320px–440px.
- **Phase 2**: Verified present (`TrustCompanySection` on homepage with 4 trust points, concise intro, registered details card, links to `/about` and `/why-us`; `IntroSection` and `WhyChooseUsSection` removed from homepage).

---

## Phase 3 Implementation & Completion Log

### Changes Summary
1. **Compact How It Works Section (`CompactHowItWorksSection`)**:
   - Swapped out old six-card `HowItWorksSection` for a streamlined compact version on the homepage.
   - Each step displays a single step number (removed redundant `"STEP 0X"`), the step title, and one neutral one-liner derived from existing content in `src/content/process-steps.ts`.
   - Layout: vertical numbered list on mobile (`grid-cols-1`); light 3x2 grid on desktop (`lg:grid-cols-3`).
   - Combined the statutory educational notice (with link to `/how-chit-funds-work`) and the financial understanding notice ("Chit funds are dual-purpose savings and credit instruments...") into a single compact notice block directly following the steps.
2. **Final Enquiry CTA Section (`EnquiryCtaSection`)**:
   - Preserved primary headline and subtitle.
   - Action buttons: `"Enquire Now"` (primary) and `"Call Our Office"` (secondary, `>= 44px` touch target). WhatsApp appears only when configured. Removed `"Browse All Schemes"`.
   - Added direct text link to `/faqs` (`"Have questions? Read our FAQs →"`).
   - Removed repeated registered office address (remains in Trust block and Footer). Kept confidential reassurance notice.
3. **Removals from Homepage & Inner Page Retention**:
   - Removed `BenefitsSection` (Use Cases) and `SocialSection` from `src/app/(site)/page.tsx`.
   - Retained `BenefitsSection` on `/how-chit-funds-work` directly before the final CTA card.
   - Retained social link helpers in Footer and `/contact`. Verified no placeholder "pending confirmation" text exists on any other page.
4. **Mobile Enquiry Bottom-Sheet Popup (`MobileEnquiryPopup` & `MobileEnquirySheet`)**:
   - Mounted exclusively on homepage (`/`); active only below `md` breakpoint (`< 768px`).
   - Trigger conditions: visitor has scrolled past the open chit groups section (or >= 40% page height) **AND** >= 8 seconds elapsed since page load.
   - Session storage: remembers dismissal (`svg_chit_popup_dismissed`) and submission (`svg_chit_popup_submitted`); never re-opens in the same session.
   - Suppression: does not open if mobile menu is open, if an input is focused, if visitor is within final CTA/footer, or if another dialog is open.
   - Bottom sheet UI: rounded top corners, backdrop blur overlay, max height `85dvh` with internal scrolling, 44x44px close button, backdrop tap & Escape key dismissal.
   - Content: Heading `"Interested in joining a chit group?"` and subtext `"Share your details and our team will get in touch."`.
   - Form fields: Name, Phone, Interested Scheme, Consent with Privacy Policy link; message field hidden via `variant="popup"` and `hideMessage`.
   - Performance: Sheet component is dynamically loaded via `next/dynamic` (`ssr: false`) so form code is deferred until triggered. First Load JS of `/` only increased from 111 kB to 113 kB (+2 kB).
5. **Clean Flat Enquiry Payload (STEP 6)**:
   - Generated client-side unique `submission_id` via `crypto.randomUUID()` with safe timestamp fallback.
   - Formatted flat snake_case payload: `submission_id`, `name`, `phone`, `interested_in`, `message`, `consent` (`"yes"`), `form_location`, `page_path`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `fbclid`.
   - Empty values are consistently formatted as empty strings `""`.
6. **Optional Google Sheets Webhook Copy (STEP 7)**:
   - Added environment-variable gate `NEXT_PUBLIC_SHEET_ENDPOINT`.
   - Submits parallel non-blocking `no-cors` `text/plain` POST to the Apps Script URL without blocking visitor feedback.
   - Documented in `.env.example`, `README.md`, and complete setup guide in `docs/enquiry-spreadsheet-setup.md`.

---

## Phase 3 Verification & Measurement Data

### 1. Document Height & Section Offsets at 390 x 844 px

| Section | Heading / Element | Offset Top (px) | Height (px) | Start Screen | End Screen |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1. Hero | "Disciplined Monthly Savings & Accessible Capital..." | 81 px | 813 px | 0.10 | 1.06 |
| 2. Open Chit Groups | "Chit Groups Open for Enquiry" | 894 px | 974 px | 1.06 | 2.21 |
| 3. Trust + Company | "Shri Vijaya Ganapathi Chit Fund Pvt Ltd" | 1,868 px | 1,678 px | 2.21 | 4.20 |
| 4. Compact How It Works | "How Chit Funds Work" | 3,546 px | 1,503 px | 4.20 | 5.98 |
| 5. Final Enquiry CTA | "Interested in Exploring a Registered Chit Group?" | 5,049 px | 677 px | **5.98** | 6.78 |
| 6. Footer | Footer navigation & legal disclaimers | 5,806 px | 1,089 px | 6.88 | **8.17** |

### 2. Homepage Scroll Height Progression across Phases

| Stage | Document Height at 390px | Total Screens (at h:844) | Total Screens (at h:800) | Final CTA Start Screen | Net Delta vs Baseline |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Baseline (Pre-Phase 1)** | 12,231 px | 14.49 screens | 15.29 screens | 11.74 screens | Baseline |
| **Post-Phase 1** | 11,530 px | 13.66 screens | 14.41 screens | 10.91 screens | -701 px (-0.83 screens) |
| **Post-Phase 2** | 9,998 px | 11.85 screens | 12.50 screens | 8.85 screens | -2,233 px (-2.64 screens) |
| **Post-Phase 3 (Current)** | **6,896 px** | **8.17 screens** | **8.62 screens** | **5.98 screens** | **-5,335 px (-6.32 screens)** |

- **Open Groups Start Target**: <= 1.5 screens -> **1.06 screens** (PASS)
- **Final CTA Reachability Target**: ~7 screens -> **5.98 screens** (PASS)

### 3. First Load JS Size Progression

| Route | Pre-Phase 3 First Load JS | Post-Phase 3 First Load JS | Net Difference |
| :--- | :--- | :--- | :--- |
| **`/` (Homepage)** | 111 kB (Page: 4.88 kB) | 113 kB (Page: 6.62 kB) | +2 kB (dynamic popup trigger only) |
| **`/how-chit-funds-work`** | 107 kB | 107 kB | 0 kB |
| **`/contact`** | 113 kB | 113 kB | 0 kB |

### 4. Comprehensive Overflow Matrix (11 Routes x 11 Viewports)

Measured in headless Microsoft Edge via Playwright reporting `scrollWidth` vs `clientWidth`:

| Route | 320px | 360px | 375px | 390px | 393px | 402px | 412px | 430px | 440px | 1280px | 1440px |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `/` | 320/320 | 360/360 | 375/375 | 390/390 | 393/393 | 402/402 | 412/412 | 430/430 | 440/440 | 1280/1280 | 1440/1440 |
| `/about` | 320/320 | 360/360 | 375/375 | 390/390 | 393/393 | 402/402 | 412/412 | 430/430 | 440/440 | 1280/1280 | 1440/1440 |
| `/chit-groups` | 320/320 | 360/360 | 375/375 | 390/390 | 393/393 | 402/402 | 412/412 | 430/430 | 440/440 | 1280/1280 | 1440/1440 |
| `/how-chit-funds-work` | 320/320 | 360/360 | 375/375 | 390/390 | 393/393 | 402/402 | 412/412 | 430/430 | 440/440 | 1280/1280 | 1440/1440 |
| `/why-us` | 320/320 | 360/360 | 375/375 | 390/390 | 393/393 | 402/402 | 412/412 | 430/430 | 440/440 | 1280/1280 | 1440/1440 |
| `/faqs` | 320/320 | 360/360 | 375/375 | 390/390 | 393/393 | 402/402 | 412/412 | 430/430 | 440/440 | 1280/1280 | 1440/1440 |
| `/contact` | 320/320 | 360/360 | 375/375 | 390/390 | 393/393 | 402/402 | 412/412 | 430/430 | 440/440 | 1280/1280 | 1440/1440 |
| `/pay-now` | 320/320 | 360/360 | 375/375 | 390/390 | 393/393 | 402/402 | 412/412 | 430/430 | 440/440 | 1280/1280 | 1440/1440 |
| `/privacy-policy` | 320/320 | 360/360 | 375/375 | 390/390 | 393/393 | 402/402 | 412/412 | 430/430 | 440/440 | 1280/1280 | 1440/1440 |
| `/terms-and-conditions` | 320/320 | 360/360 | 375/375 | 390/390 | 393/393 | 402/402 | 412/412 | 430/430 | 440/440 | 1280/1280 | 1440/1440 |
| `/not-found-page-404` | 320/320 | 360/360 | 375/375 | 390/390 | 393/393 | 402/402 | 412/412 | 430/430 | 440/440 | 1280/1280 | 1440/1440 |

*Result*: **Zero horizontal overflow** (`scrollWidth === clientWidth`) across all 11 routes and all 11 test viewports.

### 5. Mobile Enquiry Popup Verification Matrix

| Test Scenario | Viewport / Route | Expected Outcome | Measured Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop Viewports** | 1280px & 1440px on `/` | Popup never appears | Not visible | PASS |
| **Route Isolation** | 390px on `/about`, `/contact`, `/chit-groups` | Popup never appears | Not visible | PASS |
| **Initial Arrival** | 390px on `/` | Does not open on load | Not visible | PASS |
| **Early Scroll (<8s)** | 390px on `/` | Does not open before 8s | Not visible | PASS |
| **Qualified Trigger** | 390px on `/` (scroll + 8s) | Opens bottom sheet | Visible (`#mobile-enquiry-sheet`) | PASS |
| **Close Button** | 390px on `/` | Closes on click, restores scroll | Closed, body scroll restored | PASS |
| **Session Persistence** | 390px on `/` | Does not re-open in session | Did not re-open | PASS |
| **Escape Key Dismissal** | 375px on `/` | Closes dialog on Escape | Closed | PASS |
| **Backdrop Tap Dismissal** | 360px on `/` | Closes dialog on backdrop tap | Closed | PASS |
| **Suppression (Menu)** | 390px on `/` | Does not open while menu open | Suppressed | PASS |
| **Touch Target Size** | Close button | >= 44 x 44 px | 44.0 x 44.0 px | PASS |
| **Short Viewport** | 360 x 640 px | Fits inside 85dvh without overflow | 360/360 px | PASS |
| **Sticky Bar State** | Mobile viewports | Sticky bar remains active & intact | Intact | PASS |

### 6. Payload & Spreadsheet Delivery Test Matrix (Local Mock Endpoints)

| Test Case | Configuration | Form Mock Received | Sheet Mock Received | Visitor Status | Status |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **Unconfigured Endpoint** | No env vars | 0 req | 0 req | Safe fallback with office phone | PASS |
| **Form Only** | `NEXT_PUBLIC_FORM_ENDPOINT` only | 1 req | 0 req | Success feedback | PASS |
| **Both Endpoints** | Both env vars configured | 1 req | 1 req | Success feedback; matching IDs | PASS |
| **15 Field Snake_case** | Full payload verification | 15 fields | 15 fields | All string types, empty = `""` | PASS |
| **Sheet Outage Resilience** | Sheet mock returns 500 | 1 req | 1 req | Success feedback unaffected | PASS |
| **Form Provider Failure** | Form mock returns 500 | 1 req | 0 req | Failure fallback with phone | PASS |
| **Honeypot Bot Trap** | `honeypot: 'spam'` | 0 req | 0 req | Silent success (zero outbound) | PASS |


