/**
 * Utility functions for formatting numbers and currencies in the Indian numbering system.
 */

/**
 * Formats a numeric value into INR currency representation (e.g., ₹5,00,000).
 */
export function formatIndianCurrency(amount: number, options?: { showDecimals?: boolean }): string {
  if (isNaN(amount)) return '₹0';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: options?.showDecimals ? 2 : 0,
    minimumFractionDigits: options?.showDecimals ? 2 : 0,
  }).format(amount);
}

/**
 * Formats a numeric value in Indian number grouping (e.g., 5,00,000).
 */
export function formatIndianNumber(value: number): string {
  if (isNaN(value)) return '0';

  return new Intl.NumberFormat('en-IN').format(value);
}

/**
 * Converts a chit value into a readable Lakhs / Thousands string.
 * Example: 500000 -> "₹5 Lakh", 1000000 -> "₹10 Lakh"
 */
export function formatChitValueDisplay(value: number): string {
  if (value >= 10000000) {
    const crores = value / 10000000;
    return `₹${crores % 1 === 0 ? crores : crores.toFixed(1)} Cr`;
  }
  if (value >= 100000) {
    const lakhs = value / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(1)} Lakh`;
  }
  return formatIndianCurrency(value);
}
