import { useEffect, useState } from "react";
import { fetchSponsors, fetchGrandPrize, fetchSiteText } from "./data";
import type { Sponsor, GrandPrize, SiteText } from "./types";
import { DEFAULT_GRAND_PRIZE, DEFAULT_SITE_TEXT } from "./types";

function LogoPlaceholder({ name, size = "large" }: { name: string; size?: "large" | "small" }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = [
    "from-sky-300 to-cyan-400",
    "from-rose-300 to-pink-400",
    "from-amber-200 to-yellow-300",
    "from-emerald-300 to-teal-400",
    "from-violet-300 to-purple-400",
    "from-orange-200 to-rose-300",
  ];
  const colorIndex = name.length % colors.length;
  return (
    <div className={`${size === "large" ? "w-24 h-24" : "w-20 h-20"} rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center shadow-lg`}>
      <span className={`${size === "large" ? "text-2xl" : "text-lg"} font-bold text-white`}>{initials}</span>
    </div>
  );
}

function SummerDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sun top-right */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 opacity-50 blur-2xl" />
      {/* Cloud-like blob top-left */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-gradient-to-br from-sky-200 to-cyan-200 opacity-50 blur-2xl" />
      {/* Bottom mint blob */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-200 to-teal-200 opacity-40 blur-3xl" />
      {/* Pink blob */}
      <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 opacity-50 blur-2xl" />
    </div>
  );
}

function SoccerBall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="32" cy="32" r="28" fill="white" />
      <polygon points="32,18 40,24 37,34 27,34 24,24" fill="currentColor" />
      <path d="M32 4 L32 18 M60 32 L40 24 M52 52 L37 34 M12 52 L27 34 M4 32 L24 24" />
    </svg>
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
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-rose-50 to-yellow-100">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        <SummerDecoration />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-sky-700 border border-sky-200 px-6 py-2 rounded-full text-sm font-semibold mb-8 shadow-md">
            <span>☀️</span>
            <span>{text.badge}</span>
            <span>⚽</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-rose-400 to-amber-400 mb-6 leading-tight drop-shadow-sm">
            {text.heroTitle}
          </h1>

          <p className="text-2xl md:text-3xl font-semibold text-rose-500 mb-4">{text.heroTagline}</p>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            {text.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#sponsors"
              className="bg-gradient-to-r from-rose-400 to-orange-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {text.ctaPrize}
            </a>
            <a
              href="#small-businesses"
              className="bg-white/80 backdrop-blur-sm border-2 border-sky-300 text-sky-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-sky-300 hover:text-white transition-all duration-300"
            >
              {text.ctaSponsors}
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Grand prize */}
      <section id="sponsors" className="py-20 px-4 bg-gradient-to-b from-rose-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-5xl mb-4 block">🏆</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-rose-500 mb-4">
              {text.grandPrizeHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-sky-700 mb-4">{grandPrize.title}</h3>
              <p className="text-lg text-slate-600 whitespace-pre-line">{grandPrize.description}</p>
            </div>

            <div className="h-100 md:h-150 flex items-center justify-center">
              {grandPrize.image && (
                <img src={grandPrize.image} alt={grandPrize.title} className="max-w-full max-h-full object-contain drop-shadow-xl" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-gradient-to-r from-sky-200 via-rose-200 to-yellow-200 py-4">
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <span className="text-3xl">☀️</span>
          <span className="text-slate-700 font-semibold">{text.dividerText}</span>
          <span className="text-3xl">⚽</span>
        </div>
      </div>

      {/* Sponsors */}
      <section id="small-businesses" className="py-20 px-4 bg-gradient-to-b from-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-sky-700 mb-4">
              {text.sponsorsHeading}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">{text.sponsorsSubtitle}</p>
          </div>

          {loading ? (
            <p className="text-center text-sky-600">Loading sponsors…</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {sponsors.map((business) => (
                <div key={business.id} className="flex flex-col items-center text-center group">
                  <div className="mb-4 transform group-hover:scale-110 transition-all duration-300">
                    <div className="p-1 bg-gradient-to-br from-sky-300 via-rose-300 to-amber-300 rounded-full shadow-lg group-hover:shadow-xl">
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
                  <h4 className="font-bold text-sky-800 text-sm mb-1 leading-tight">{business.name}</h4>
                  <p className="text-rose-600 text-sm font-semibold bg-rose-100 px-3 py-1.5 rounded-2xl break-words max-w-full">
                    {business.quantity && business.quantity > 0 ? `${business.quantity} × ${business.prize}` : business.prize}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-sky-400 via-rose-400 to-orange-400 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <SoccerBall className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{text.footerTitle}</h3>
          <p className="text-white/90 mb-6">{text.footerThanks}</p>
          <p className="text-white/80 text-sm">
            {text.footerContact} <span className="underline">{text.footerPhone}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
