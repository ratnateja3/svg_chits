export interface TrustPoint {
  title: string;
  description: string;
  shortDescription?: string;
}

export const homepageTrustPoints: TrustPoint[] = [
  {
    title: 'Transparent Process',
    description:
      'All group operations, monthly auction schedules, bid discounts, and dividend distributions are conducted openly with clear documentation under statutory rules.',
    // CONTENT-REVIEW: dividend wording ("dividend distributions") & statutory wording ("statutory rules")
    shortDescription:
      'Group operations, monthly auction schedules, bid discounts, and dividend distributions are conducted openly with clear documentation under statutory rules.',
  },
  {
    title: 'Customer-Focused Service',
    description:
      'Dedicated guidance from enrollment to prize disbursement. We assist members at every step to ensure your financial objectives are seamlessly met.',
    shortDescription:
      'Dedicated guidance from enrollment to prize disbursement, assisting members at every step.',
  },
  {
    title: 'Professional Approach',
    description:
      'Strict compliance with the Chit Funds Act, 1982, systematic accounting practices, and reliable administrative oversight for every subscriber group.',
    // CONTENT-REVIEW: statutory wording ("Chit Funds Act, 1982")
    shortDescription:
      'Strict compliance with the Chit Funds Act, 1982, systematic accounting, and reliable administrative oversight.',
  },
  {
    title: 'Accessible Local Support',
    description:
      'Direct assistance from our registered office in Shamshabad, Hyderabad. Members can easily consult with our team in person or via verified contact channels.',
    shortDescription:
      'Direct assistance from our registered office in Shamshabad, Hyderabad, in person or via verified contact channels.',
  },
];
