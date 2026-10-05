/**
 * UTM & Campaign Attribution Persistence Helper
 * Captures standard marketing campaign query parameters and persists them
 * across client navigation so attribution reaches the enquiry submission payload.
 */

export interface CampaignAttribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
}

const STORAGE_KEY = 'svg_chit_attribution_v1';

// In-memory fallback if sessionStorage is unavailable (e.g. private mode or SSR)
let memoryStore: CampaignAttribution = {};

/**
 * Stores attribution parameters found in the current URL or searchParams into sessionStorage.
 */
export function persistAttribution(params: {
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
}): CampaignAttribution {
  const current = getStoredAttribution();

  const updated: CampaignAttribution = {
    utmSource: params.utmSource?.trim() || current.utmSource,
    utmMedium: params.utmMedium?.trim() || current.utmMedium,
    utmCampaign: params.utmCampaign?.trim() || current.utmCampaign,
    utmTerm: params.utmTerm?.trim() || current.utmTerm,
    utmContent: params.utmContent?.trim() || current.utmContent,
    gclid: params.gclid?.trim() || current.gclid,
    fbclid: params.fbclid?.trim() || current.fbclid,
  };

  // Only persist non-empty properties
  const sanitized: CampaignAttribution = {};
  for (const [key, value] of Object.entries(updated)) {
    if (value) {
      sanitized[key as keyof CampaignAttribution] = value;
    }
  }

  memoryStore = sanitized;

  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    } catch {
      // Ignore sessionStorage quota or access errors
    }
  }

  return sanitized;
}

/**
 * Retrieves previously stored attribution parameters.
 */
export function getStoredAttribution(): CampaignAttribution {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return { ...memoryStore };
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...memoryStore, ...parsed };
    }
  } catch {
    // Ignore JSON parse or storage errors
  }

  return { ...memoryStore };
}
