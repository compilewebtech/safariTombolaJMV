// Safari Kermess Tombola - Prize Sponsors Website

// Types for sponsors
/*interface MajorSponsor {
  id: number;
  name: string;
  logo: string; // placeholder - replace with actual logo URL
  prize: string;
  description: string;
}*/

interface SmallBusiness {
  id: number;
  name: string;
  logo: string; // placeholder - replace with actual logo URL
  prize: string;
}

// Placeholder data - Replace logos with actual business logos
/*const majorSponsors: MajorSponsor[] = [
  {
    id: 1,
    name: "Safari Lodge Resort",
    logo: "", // Add logo URL here
    prize: "Weekend Getaway Package",
    description: "A luxurious 2-night stay at Safari Lodge Resort"
  },
  {
    id: 2,
    name: "Wild Adventures Tours",
    logo: "", // Add logo URL here
    prize: "Safari Tour for 4",
    description: "An unforgettable guided safari experience"
  },
  {
    id: 3,
    name: "Savanna Restaurant",
    logo: "", // Add logo URL here
    prize: "Dinner for 6",
    description: "Exclusive dining experience with African cuisine"
  },
  {
    id: 4,
    name: "Jungle Fitness Center",
    logo: "", // Add logo URL here
    prize: "1 Year Membership",
    description: "Full access to all gym facilities and classes"
  },
];*/

const smallBusinesses: SmallBusiness[] = [
  { id: 1, name: "Burger King", logo: "/burgerKing.jpg", prize: "2 Free Burgers" },
  { id: 2, name: "Moustache", logo: "/moustache.jpg", prize: "1 50$ Voucher" },
  { id: 3, name: "Elephant Toys", logo: "/elephantToys.jpg", prize: "Plush Safari Set" },
  { id: 4, name: "Giraffe Books", logo: "/giraffeBooks.jpg", prize: "Book Bundle $75" },
  { id: 5, name: "Hippo Hardware", logo: "/hippoHardware.jpg", prize: "Tool Set" },
  { id: 6, name: "Rhino Auto", logo: "/rhinoAuto.jpg", prize: "Car Wash Package" },
  { id: 7, name: "Cheetah Sports", logo: "/cheetahSports.jpg", prize: "Sports Equipment" },
  { id: 8, name: "Monkey Business", logo: "/monkeyBusiness.jpg", prize: "Party Package" },
  { id: 9, name: "Flamingo Flowers", logo: "/flamingoFlowers.jpg", prize: "Bouquet Voucher" },
  { id: 10, name: "Panther Pets", logo: "/pantherPets.jpg", prize: "Pet Care Bundle" },
  { id: 11, name: "Meerkat Market", logo: "/meerkatMarket.jpg", prize: "Gift Basket $60" },
  { id: 12, name: "Toucan Travel", logo: "/toucanTravel.jpg", prize: "Travel Voucher $100" },
];

// Logo placeholder component
function LogoPlaceholder({ name, size = "large" }: { name: string; size?: "large" | "small" }) {
  const initials = name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  const colors = [
    "from-amber-500 to-orange-600",
    "from-emerald-500 to-green-600",
    "from-yellow-500 to-amber-600",
    "from-orange-500 to-red-600",
    "from-lime-500 to-green-600",
    "from-teal-500 to-emerald-600",
  ];
  const colorIndex = name.length % colors.length;
  
  return (
    <div className={`${size === "large" ? "w-24 h-24" : "w-20 h-20"} rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center shadow-lg`}>
      <span className={`${size === "large" ? "text-2xl" : "text-lg"} font-bold text-white`}>{initials}</span>
    </div>
  );
}

// Safari decorative elements
function SafariDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Palm leaves */}
      <div className="absolute -top-10 -left-10 w-40 h-40 opacity-20">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-green-800">
          <path d="M50 100 Q30 70 10 50 Q30 60 50 50 Q30 40 10 30 Q30 50 50 30 Q40 50 50 50 Q40 60 50 70 Z" />
        </svg>
      </div>
      <div className="absolute -top-10 -right-10 w-40 h-40 opacity-20 transform scale-x-[-1]">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-green-800">
          <path d="M50 100 Q30 70 10 50 Q30 60 50 50 Q30 40 10 30 Q30 50 50 30 Q40 50 50 50 Q40 60 50 70 Z" />
        </svg>
      </div>
    </div>
  );
}

// Animal icons for decoration
/*function AnimalIcons() {
  return (
    <div className="flex justify-center gap-8 py-6">
      <span className="text-4xl opacity-60">🦁</span>
      <span className="text-4xl opacity-60">🦒</span>
      <span className="text-4xl opacity-60">🐘</span>
      <span className="text-4xl opacity-60">🦓</span>
      <span className="text-4xl opacity-60">🦛</span>
    </div>
  );
}*/

export function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        <SafariDecoration />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Safari badge */}
          <div className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg">
            <span>🎪</span>
            <span>KERMESS 2026</span>
            <span>🎪</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 mb-6 leading-tight">
            Welcome to the Safari Tombola!
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4">
            🌴 Wild Prizes Await You! 🌴
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-amber-700/80 max-w-2xl mx-auto mb-8 leading-relaxed"> 
            Discover amazing prizes donated by our generous local businesses and sponsors. 
            Every ticket is a chance to win big!
          </p>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="#sponsors" className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Our Grand Prize 🎁
            </a>
            <a href="#small-businesses" className="border-2 border-amber-600 text-amber-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-600 hover:text-white transition-all duration-300">
              Our Sponsors 🤝
            </a>
          </div>
          
          {/*<AnimalIcons />}
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Major Sponsors Section */}
      <section id="sponsors" className="py-20 px-4 bg-gradient-to-b from-amber-100/50 to-orange-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-5xl mb-4 block">🏆</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-amber-800 mb-4">
              Grand Prize
            </h2>
          </div>
          
          {/* Grand Prize Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            {/* Left - Description */}
            <div>
              <h3 className="text-2xl font-bold text-amber-800 mb-4">Prize Description</h3>
              <p className="text-lg text-amber-700/80">
                iphone 17 pro max 512gb, the latest and greatest from Apple, featuring a stunning 6.7-inch Super Retina XDR display, A17 Bionic chip for lightning-fast performance, and an advanced triple-camera system for capturing every moment in incredible detail. With its sleek design and cutting-edge technology, this prize is sure to impress any tech enthusiast!
              </p>
            </div>
            
            {/* Right - Photo/Logo */}
            <div className="bg-gray-200 rounded-lg h-100 md:h-150 flex items-center justify-center overflow-hidden">
              <img 
                src="/iphone.jpg"
                alt="iPhone 17 Pro Max" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 py-4">
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <span className="text-3xl">🌿</span>
          <span className="text-amber-800 font-semibold">Thank you to all our wonderful sponsors!</span>
          <span className="text-3xl">🌿</span>
        </div>
      </div>

      {/* Small Businesses Section */}
      <section id="small-businesses" className="py-20 px-4 bg-gradient-to-b from-green-50 to-emerald-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-5xl mb-4 block"></span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-4">
              Sponsors
            </h2>
            <p className="text-xl text-emerald-700/70 max-w-2xl mx-auto">
              Local businesses making our safari kermess even more special with their generous contributions!
            </p>
          </div>
          
          {/* Small businesses grid - circular logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {smallBusinesses.map((business) => (
              <div 
                key={business.id}
                className="flex flex-col items-center text-center group"
              >
                {/* Circular logo container */}
                <div className="mb-4 transform group-hover:scale-110 transition-all duration-300">
                  <div className="p-1 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full shadow-lg group-hover:shadow-xl">
                    {business.logo ? (
                      <img 
                        src={business.logo} 
                        alt={business.name} 
                        className="w-20 h-20 rounded-full object-cover border-4 border-white"
                      />
                    ) : (
                      <div className="border-4 border-white rounded-full">
                        <LogoPlaceholder name={business.name} size="small" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Business name */}
                <h4 className="font-bold text-emerald-800 text-sm mb-1 leading-tight">
                  {business.name}
                </h4>
                
                {/* Prize */}
                <p className="text-emerald-600 text-xs font-medium bg-emerald-100 px-3 py-1 rounded-full">
                  {business.prize}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-800 via-orange-800 to-amber-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/*<div className="flex justify-center gap-4 mb-6">
            <span className="text-4xl">🦁</span>
            <span className="text-4xl">🎪</span>
            <span className="text-4xl">🦒</span>
          </div>*/}
          <h3 className="text-2xl font-bold mb-4">Safari Kermess 2026</h3>
          <p className="text-amber-200 mb-6">
            Thank you to all our sponsors and partners for making this event possible!
          </p>
          <p className="text-amber-300 text-sm">
            Want to become a sponsor? Contact us at <span className="underline">+96170386702</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
