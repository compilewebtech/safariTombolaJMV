export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  prize: string;
  quantity?: number;
  order?: number;
}

export interface GrandPrize {
  title: string;
  description: string;
  image: string;
}

export interface SiteText {
  badge: string;
  heroTitle: string;
  heroTagline: string;
  heroDescription: string;
  ctaPrize: string;
  ctaSponsors: string;
  grandPrizeHeading: string;
  sponsorsHeading: string;
  sponsorsSubtitle: string;
  dividerText: string;
  footerTitle: string;
  footerThanks: string;
  footerContact: string;
  footerPhone: string;
}

export const DEFAULT_SITE_TEXT: SiteText = {
  badge: "KERMESS 2026",
  heroTitle: "Welcome to the Safari Tombola!",
  heroTagline: "🌴 Wild Prizes Await You! 🌴",
  heroDescription:
    "Discover amazing prizes donated by our generous local businesses and sponsors. Every ticket is a chance to win big!",
  ctaPrize: "Our Grand Prize 🎁",
  ctaSponsors: "Our Sponsors 🤝",
  grandPrizeHeading: "Grand Prize",
  sponsorsHeading: "Sponsors",
  sponsorsSubtitle:
    "Local businesses making our safari kermess even more special with their generous contributions!",
  dividerText: "Thank you to all our wonderful sponsors!",
  footerTitle: "Safari Kermess 2026",
  footerThanks:
    "Thank you to all our sponsors and partners for making this event possible!",
  footerContact: "Want to become a sponsor? Contact us at",
  footerPhone: "+96170386702",
};

export const DEFAULT_GRAND_PRIZE: GrandPrize = {
  title: "iPhone 17 Pro Max 512GB",
  description:
    "iphone 17 pro max 512gb, the latest and greatest from Apple, featuring a stunning 6.7-inch Super Retina XDR display, A17 Bionic chip for lightning-fast performance, and an advanced triple-camera system for capturing every moment in incredible detail. With its sleek design and cutting-edge technology, this prize is sure to impress any tech enthusiast!",
  image: "/iphone.jpg",
};
