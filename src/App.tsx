import { useEffect, useState } from "react";
import { fetchSponsors, fetchGrandPrize, fetchSiteText } from "./data";
import type { Sponsor, GrandPrize, SiteText } from "./types";
import { DEFAULT_GRAND_PRIZE, DEFAULT_SITE_TEXT } from "./types";

function LogoPlaceholder({ name, size = "large" }: { name: string; size?: "large" | "small" }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
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

function SafariDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

export function App() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [grandPrize, setGrandPrize] = useState<GrandPrize>(DEFAULT_GRAND_PRIZE);
  const [text, setText] = useState<SiteText>(DEFAULT_SITE_TEXT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchSponsors(), fetchGrandPrize(), fetchSiteText()])
      .then(([s, gp, t]) => {
        setSponsors(s);
        setGrandPrize(gp);
        setText(t);
      })
      .catch((e) => console.error("Failed to load content", e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-100">
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        <SafariDecoration />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg">
            <span>🎪</span>
            <span>{text.badge}</span>
            <span>🎪</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 mb-6 leading-tight">
            {text.heroTitle}
          </h1>

          <p className="text-2xl md:text-3xl font-semibold text-amber-800 mb-4">{text.heroTagline}</p>

          <p className="text-lg md:text-xl text-amber-700/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            {text.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#sponsors"
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {text.ctaPrize}
            </a>
            <a
              href="#small-businesses"
              className="border-2 border-amber-600 text-amber-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-600 hover:text-white transition-all duration-300"
            >
              {text.ctaSponsors}
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      <section id="sponsors" className="py-20 px-4 bg-gradient-to-b from-amber-100/50 to-orange-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-5xl mb-4 block">🏆</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-amber-800 mb-4">
              {text.grandPrizeHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-amber-800 mb-4">{grandPrize.title}</h3>
              <p className="text-lg text-amber-700/80 whitespace-pre-line">{grandPrize.description}</p>
            </div>

            <div className="h-100 md:h-150 flex items-center justify-center">
              {grandPrize.image && (
                <img src={grandPrize.image} alt={grandPrize.title} className="max-w-full max-h-full object-contain" />
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 py-4">
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <span className="text-3xl">🌿</span>
          <span className="text-amber-800 font-semibold">{text.dividerText}</span>
          <span className="text-3xl">🌿</span>
        </div>
      </div>

      <section id="small-businesses" className="py-20 px-4 bg-gradient-to-b from-green-50 to-emerald-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-4">
              {text.sponsorsHeading}
            </h2>
            <p className="text-xl text-emerald-700/70 max-w-2xl mx-auto">{text.sponsorsSubtitle}</p>
          </div>

          {loading ? (
            <p className="text-center text-emerald-700">Loading sponsors…</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {sponsors.map((business) => (
                <div key={business.id} className="flex flex-col items-center text-center group">
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
                  <h4 className="font-bold text-emerald-800 text-sm mb-1 leading-tight">{business.name}</h4>
                  <p className="text-emerald-700 text-sm font-semibold bg-emerald-100 px-3 py-1.5 rounded-2xl break-words max-w-full">
                    {business.quantity && business.quantity > 0 ? `${business.quantity} × ${business.prize}` : business.prize}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gradient-to-r from-amber-800 via-orange-800 to-amber-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">{text.footerTitle}</h3>
          <p className="text-amber-200 mb-6">{text.footerThanks}</p>
          <p className="text-amber-300 text-sm">
            {text.footerContact} <span className="underline">{text.footerPhone}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
