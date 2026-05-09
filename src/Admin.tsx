import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth, ADMIN_EMAIL } from "./firebase";
import {
  fetchSponsors,
  fetchGrandPrize,
  fetchSiteText,
  saveGrandPrize,
  saveSiteText,
  addSponsor,
  updateSponsor,
  deleteSponsor,
  uploadImage,
  deleteImageByUrl,
} from "./data";
import type { Sponsor, GrandPrize, SiteText } from "./types";
import { DEFAULT_GRAND_PRIZE, DEFAULT_SITE_TEXT } from "./types";

export function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
  }, []);

  if (!authReady) return <div className="p-8 text-center">Loading…</div>;
  if (!user || user.email !== ADMIN_EMAIL) return <Login />;
  return <Dashboard user={user} />;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setErr(e.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-amber-800">Admin Login</h1>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2"
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button
          disabled={busy}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ user }: { user: User }) {
  const [tab, setTab] = useState<"sponsors" | "prize" | "text">("sponsors");

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-amber-800 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Safari Tombola CMS</h1>
        <div className="flex items-center gap-4">
          <span className="text-amber-200 text-sm">{user.email}</span>
          <a href="#/" className="text-sm underline">View site</a>
          <button onClick={() => signOut(auth)} className="bg-amber-700 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </header>

      <nav className="bg-white border-b flex gap-2 px-6 py-2">
        {(["sponsors", "prize", "text"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg font-medium ${
              tab === t ? "bg-amber-600 text-white" : "text-amber-800 hover:bg-amber-100"
            }`}
          >
            {t === "sponsors" ? "Sponsors" : t === "prize" ? "Grand Prize" : "Page Text"}
          </button>
        ))}
      </nav>

      <main className="max-w-5xl mx-auto p-6">
        {tab === "sponsors" && <SponsorsPanel />}
        {tab === "prize" && <GrandPrizePanel />}
        {tab === "text" && <SiteTextPanel />}
      </main>
    </div>
  );
}

function SponsorsPanel() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  async function reload() {
    setLoading(true);
    setSponsors(await fetchSponsors());
    setLoading(false);
  }
  useEffect(() => {
    reload();
  }, []);

  async function handleAdd() {
    const order = sponsors.length > 0 ? Math.max(...sponsors.map((s) => s.order ?? 0)) + 1 : 1;
    await addSponsor({ name: "New Sponsor", prize: "Prize", logo: "", order });
    await reload();
  }

  async function handleDelete(s: Sponsor) {
    if (!confirm(`Delete ${s.name}?`)) return;
    if (s.logo) await deleteImageByUrl(s.logo);
    await deleteSponsor(s.id);
    await reload();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-amber-800">Sponsors</h2>
        <button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold">
          + Add Sponsor
        </button>
      </div>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {sponsors.map((s) => (
            <SponsorCard key={s.id} sponsor={s} onChange={reload} onDelete={() => handleDelete(s)} />
          ))}
        </div>
      )}
    </div>
  );
}

function SponsorCard({
  sponsor,
  onChange,
  onDelete,
}: {
  sponsor: Sponsor;
  onChange: () => void;
  onDelete: () => void;
}) {
  const [name, setName] = useState(sponsor.name);
  const [prize, setPrize] = useState(sponsor.prize);
  const [quantity, setQuantity] = useState(sponsor.quantity ?? 1);
  const [order, setOrder] = useState(sponsor.order ?? 0);
  const [logo, setLogo] = useState(sponsor.logo);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);

  async function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      if (sponsor.logo) await deleteImageByUrl(sponsor.logo);
      const url = await uploadImage(file, "sponsors");
      setLogo(url);
      await updateSponsor(sponsor.id, { logo: url });
      onChange();
    } finally {
      setBusy(false);
    }
  }

  async function handleSave() {
    setBusy(true);
    try {
      await updateSponsor(sponsor.id, { name, prize, quantity: Number(quantity), order: Number(order) });
      setDirty(false);
      onChange();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-3">
      <div className="flex items-center gap-4">
        {logo ? (
          <img src={logo} alt={name} className="w-16 h-16 rounded-full object-cover border" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold">
            {name.slice(0, 2).toUpperCase()}
          </div>
        )}
        <label
          className={`inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-3 py-2 rounded-lg font-bold cursor-pointer ${
            busy ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {busy ? "Uploading…" : logo ? "Change Logo" : "Upload Logo"}
          <input type="file" accept="image/*" onChange={handleLogo} className="hidden" />
        </label>
      </div>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setDirty(true);
        }}
        placeholder="Name"
        className="w-full border rounded px-2 py-1"
      />
      <div>
        <label className="block text-xs font-medium text-amber-700 mb-1">Prize description</label>
        <input
          value={prize}
          onChange={(e) => {
            setPrize(e.target.value);
            setDirty(true);
          }}
          placeholder="e.g. Voucher, Free Burger"
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-amber-700 mb-1">Quantity (shown as "N × prize")</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
            setDirty(true);
          }}
          placeholder="1"
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-amber-700 mb-1">Display order (lower = first)</label>
        <input
          type="number"
          value={order}
          onChange={(e) => {
            setOrder(Number(e.target.value));
            setDirty(true);
          }}
          placeholder="0"
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="flex gap-2">
        <button
          disabled={busy || !dirty}
          onClick={handleSave}
          className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-3 py-1 rounded font-medium"
        >
          Save
        </button>
        <button
          disabled={busy}
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function GrandPrizePanel() {
  const [data, setData] = useState<GrandPrize>(DEFAULT_GRAND_PRIZE);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchGrandPrize().then(setData);
  }, []);

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      if (data.image && data.image.includes("firebasestorage")) await deleteImageByUrl(data.image);
      const url = await uploadImage(file, "grandPrize");
      const next = { ...data, image: url };
      setData(next);
      await saveGrandPrize(next);
      setMsg("Image updated");
    } finally {
      setBusy(false);
    }
  }

  async function handleSave() {
    setBusy(true);
    try {
      await saveGrandPrize(data);
      setMsg("Saved");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-2xl font-bold text-amber-800">Grand Prize</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          rows={6}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        {data.image && <img src={data.image} alt="" className="w-48 h-48 object-cover rounded mb-2" />}
        <label
          className={`inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold cursor-pointer ${
            busy ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {busy ? "Uploading…" : data.image ? "Change Image" : "Upload Image"}
          <input type="file" accept="image/*" onChange={handleImage} disabled={busy} className="hidden" />
        </label>
      </div>
      <button
        disabled={busy}
        onClick={handleSave}
        className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-bold"
      >
        Save
      </button>
      {msg && <span className="ml-3 text-emerald-700">{msg}</span>}
    </div>
  );
}

function SiteTextPanel() {
  const [data, setData] = useState<SiteText>(DEFAULT_SITE_TEXT);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchSiteText().then(setData);
  }, []);

  async function handleSave() {
    setBusy(true);
    try {
      await saveSiteText(data);
      setMsg("Saved");
    } finally {
      setBusy(false);
    }
  }

  const fields: { key: keyof SiteText; label: string; multiline?: boolean }[] = [
    { key: "badge", label: "Badge text (e.g. KERMESS 2026)" },
    { key: "heroTitle", label: "Hero title" },
    { key: "heroTagline", label: "Hero tagline" },
    { key: "heroDescription", label: "Hero description", multiline: true },
    { key: "ctaPrize", label: "CTA - prize button" },
    { key: "ctaSponsors", label: "CTA - sponsors button" },
    { key: "grandPrizeHeading", label: "Grand prize heading" },
    { key: "sponsorsHeading", label: "Sponsors heading" },
    { key: "sponsorsSubtitle", label: "Sponsors subtitle", multiline: true },
    { key: "dividerText", label: "Divider thank-you text" },
    { key: "footerTitle", label: "Footer title" },
    { key: "footerThanks", label: "Footer thank-you", multiline: true },
    { key: "footerContact", label: "Footer contact prefix" },
    { key: "footerPhone", label: "Footer phone number" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-2xl font-bold text-amber-800">Page Text</h2>
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-sm font-medium mb-1">{f.label}</label>
          {f.multiline ? (
            <textarea
              value={data[f.key]}
              onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
          ) : (
            <input
              value={data[f.key]}
              onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          )}
        </div>
      ))}
      <button
        disabled={busy}
        onClick={handleSave}
        className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-bold"
      >
        Save
      </button>
      {msg && <span className="ml-3 text-emerald-700">{msg}</span>}
    </div>
  );
}
