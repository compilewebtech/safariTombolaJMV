import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";
import type { Sponsor, GrandPrize, SiteText } from "./types";
import { DEFAULT_GRAND_PRIZE, DEFAULT_SITE_TEXT } from "./types";

const SPONSORS = "sponsors";
const CONFIG = "config";

export async function fetchSponsors(): Promise<Sponsor[]> {
  const q = query(collection(db, SPONSORS), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Sponsor, "id">) }));
}

export async function fetchGrandPrize(): Promise<GrandPrize> {
  const snap = await getDoc(doc(db, CONFIG, "grandPrize"));
  return snap.exists() ? (snap.data() as GrandPrize) : DEFAULT_GRAND_PRIZE;
}

export async function fetchSiteText(): Promise<SiteText> {
  const snap = await getDoc(doc(db, CONFIG, "siteText"));
  return snap.exists()
    ? { ...DEFAULT_SITE_TEXT, ...(snap.data() as Partial<SiteText>) }
    : DEFAULT_SITE_TEXT;
}

export async function saveGrandPrize(data: GrandPrize) {
  await setDoc(doc(db, CONFIG, "grandPrize"), data);
}

export async function saveSiteText(data: SiteText) {
  await setDoc(doc(db, CONFIG, "siteText"), data);
}

export async function addSponsor(data: Omit<Sponsor, "id">) {
  return addDoc(collection(db, SPONSORS), data);
}

export async function updateSponsor(id: string, data: Partial<Sponsor>) {
  await updateDoc(doc(db, SPONSORS, id), data);
}

export async function deleteSponsor(id: string) {
  await deleteDoc(doc(db, SPONSORS, id));
}

export async function uploadImage(file: File, folder: string): Promise<string> {
  const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const r = ref(storage, path);
  await uploadBytes(r, file);
  return getDownloadURL(r);
}

export async function deleteImageByUrl(url: string) {
  if (!url || !url.includes("firebasestorage")) return;
  try {
    await deleteObject(ref(storage, url));
  } catch {
    /* ignore */
  }
}
