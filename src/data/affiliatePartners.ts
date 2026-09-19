export const affiliatePartners = {
  getyourguide: {
    name: 'GetYourGuide',
    disclosure: 'Werbung · Affiliate-Link'
  },
  booking: {
    name: 'Booking.com',
    disclosure: 'Werbung · Affiliate-Link'
  },
  discovercars: {
    name: 'DiscoverCars',
    disclosure: 'Werbung · Affiliate-Link'
  }
} as const;

export type AffiliatePartnerId = keyof typeof affiliatePartners;
