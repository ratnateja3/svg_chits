export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  shortDescription?: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Choose a Chit Group',
    description:
      'Evaluate your monthly savings capacity and timeline to choose an approved chit value, duration, and monthly instalment that suits your requirements.',
    shortDescription:
      'Select an approved chit value and monthly instalment matched to your savings goals and budget.',
  },
  {
    step: '02',
    title: 'Join the Group',
    description:
      'Complete standard subscriber documentation and KYC verification, and execute the official subscriber agreement before the group commences.',
    shortDescription:
      'Complete standard KYC verification and sign the registered subscriber agreement.',
  },
  {
    step: '03',
    title: 'Pay Monthly Instalments',
    // CONTENT-REVIEW: dividend wording ("dividend deductions derived from auction discounts")
    description:
      'Contribute regular monthly instalments to the collective group pool. Enjoy dividend deductions derived from auction discounts in subsequent months.',
    shortDescription:
      'Contribute regular monthly subscriptions into the collective group fund.',
  },
  {
    step: '04',
    title: 'Participate in the Applicable Process',
    // CONTENT-REVIEW: liquidity wording ("lump sum for planned milestones, business expenses, or emergencies")
    description:
      'Participate in scheduled monthly reverse bidding auctions when you require a lump sum for planned milestones, business expenses, or emergencies.',
    shortDescription:
      'Take part in scheduled monthly reverse bidding auctions when lump-sum capital is required.',
  },
  {
    step: '05',
    title: 'Receive the Prize Amount as Applicable',
    description:
      'Upon winning the bid and submitting necessary security documentation per statutory standards, the prized chit amount is promptly disbursed.',
    shortDescription:
      'Submit prescribed security documentation to receive timely prize money disbursement.',
  },
  {
    step: '06',
    title: 'Continue Until the Chit Term Completes',
    description:
      'Continue contributing your scheduled monthly instalments until the full group tenure concludes, completing your commitment to fellow subscribers.',
    shortDescription:
      'Maintain regular monthly contributions until the group tenure concludes.',
  },
];
