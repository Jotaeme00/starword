import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import data from "../data/quotes.json";


function pickRandom(arr, excludeId) {
  if (!arr || arr.length === 0) return null;

  let pool = excludeId ? arr.filter(q => q.id !== excludeId) : arr;
  if (pool.length === 0) pool = arr; 

  return pool[Math.floor(Math.random() * pool.length)];
}

export function useQuotes() {
  const [tag, setTag] = useState(() => localStorage.getItem("mot_tag") || "Todas");
  const lastId = useRef(null);

  const tags = useMemo(() => {
    const all = new Set();
    data.forEach(q => q.tags.forEach(t => all.add(t)));
    return ["Todas", ...Array.from(all)];
  }, []);

  const filtered = useMemo(() => {
    if (tag === "Todas") return data;
    return data.filter(q => q.tags.includes(tag));
  }, [tag]);

  const [quote, setQuote] = useState(() => pickRandom(filtered));

  const next = useCallback(() => {
    const q = pickRandom(filtered, lastId.current);
    if (q) {
      lastId.current = q.id;
      setQuote(q);
    }
  }, [filtered]);

  const copy = useCallback(() => {
    if (!quote) return;
    const content = `“${quote.text}” — ${quote.author}`;
    try {
      navigator.clipboard?.writeText(content);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  }, [quote]);

  const share = useCallback(async () => {
    if (!quote) return;
    const text = `“${quote.text}” — ${quote.author}`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ text, url, title: "Starword" });
      } catch (err) {
        console.error("Erro ao compartilhar:", err);
      }
    } else {
      const shareUrl = new URL("https://www.linkedin.com/sharing/share-offsite/");
      shareUrl.searchParams.set("url", url);
      window.open(shareUrl.toString(), "_blank");
    }
  }, [quote]);

  useEffect(() => {
    localStorage.setItem("mot_tag", tag);
  }, [tag]);

  useEffect(() => {
    const onKey = e => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next]);

  useEffect(() => {
    const q = pickRandom(filtered);
    if (q) {
      lastId.current = q.id;
      setQuote(q);
    }
  }, [filtered]);

  return { quote, tags, tag, setTag, next, copy, share };
}

