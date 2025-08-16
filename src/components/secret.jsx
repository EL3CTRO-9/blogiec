import React, { useEffect, useMemo, useState } from "react";
import "./secret.css";

// --- tiny, dependency-free lemmatizer for common cases ---
function lemmatize(word) {
  const w = (word || "").toLowerCase();
  if (w.endsWith("ies") && w.length > 3) return w.slice(0, -3) + "y";      // candies -> candy
  if (w.endsWith("sses") || w.endsWith("shes") || w.endsWith("ches")) return w.slice(0, -2); // kisses -> kiss
  if (w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);         // cats -> cat
  if (w.endsWith("ing") && w.length > 5) return w.slice(0, -3);            // running -> run (simple)
  if (w.endsWith("ed") && w.length > 4) return w.slice(0, -2);             // walked -> walk
  return w;
}

// parse Free Dictionary API -> { definition, pos }
function extractPrimaryDefinition(apiJson) {
  if (!Array.isArray(apiJson) || !apiJson[0]) return null;
  const entry = apiJson[0];
  const meaning = (entry.meanings || []).find(m => (m.definitions || []).length);
  if (!meaning) return null;
  const def = meaning.definitions[0]?.definition || null;
  const pos = meaning.partOfSpeech || "";
  return def ? { definition: def, pos } : null;
}

export default function Secrets() {
  const [words, setWords] = useState([]); // [{word, base, definition, pos}]
  const [loadingWords, setLoadingWords] = useState(false);
  const [fact, setFact] = useState("");
  const [loadingFact, setLoadingFact] = useState(false);
  const [error, setError] = useState("");

  // stable key per session if you ever want to cache
  const wordCount = 12;
  const apiWordURL = useMemo(
    () => `https://random-word-api.vercel.app/api?words=${wordCount}`,
    []
  );

  async function fetchDefinitionFor(word) {
    // 1) try original word
    try {
      const r1 = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (r1.ok) {
        const j1 = await r1.json();
        const found1 = extractPrimaryDefinition(j1);
        if (found1) return { word, base: word, ...found1 };
      }
    } catch (e) {/* ignore */}
    // 2) try base form
    const base = lemmatize(word);
    if (base !== word) {
      try {
        const r2 = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(base)}`);
        if (r2.ok) {
          const j2 = await r2.json();
          const found2 = extractPrimaryDefinition(j2);
          if (found2) return { word, base, ...found2 };
        }
      } catch (e) {/* ignore */}
    }
    // 3) graceful fallback
    return { word, base, definition: "Definition not found (likely inflection or slang).", pos: "" };
  }

  async function loadWords() {
    setLoadingWords(true);
    setError("");
    try {
      const r = await fetch(apiWordURL);
      if (!r.ok) throw new Error("Word source failed");
      let list = await r.json();
      // sanity: keep alphabetic only & unique, then cap to 10
      list = (Array.isArray(list) ? list : [])
        .filter(w => /^[a-zA-Z]+$/.test(w))
        .map(w => w.toLowerCase());
      // ensure exactly 10 if API sent more/less
      if (list.length < wordCount) {
        // top up with some safe extras
        const extras = ["monastery","waybill","pamphleteer","blimey","gawp","resilient","tenacious","ambivalent","eloquent","lucid"];
        list = [...new Set([...list, ...extras])].slice(0, wordCount);
      } else {
        list = list.slice(0, wordCount);
      }

      // fetch definitions in parallel
      const defs = await Promise.all(list.map(w => fetchDefinitionFor(w)));
      setWords(defs);
    } catch (e) {
      console.error(e);
      setError("Couldn’t load words right now. Please try again.");
      setWords([]);
    } finally {
      setLoadingWords(false);
    }
  }

  async function loadFact() {
    setLoadingFact(true);
    try {
      const r = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
      if (!r.ok) throw new Error("Fact source failed");
      const j = await r.json();
      setFact(j?.text || "Honey found in ancient tombs is still edible.");
    } catch (e) {
      console.error(e);
      const backups = [
        "Bananas are berries, but strawberries aren’t.",
        "Octopuses have three hearts.",
        "Sharks existed before trees.",
        "There are more possible chess games than atoms in the observable universe.",
        "A day on Venus is longer than its year."
      ];
      setFact(backups[Math.floor(Math.random() * backups.length)]);
    } finally {
      setLoadingFact(false);
    }
  }

  useEffect(() => {
    loadWords();
    loadFact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="secrets-section">
      <div className="secrets-inner">
        <header className="secrets-head">
          <h1 className="secrets-title">Secrets</h1>
          <p className="secrets-sub">Hidden nook for quick learning — 10 words + a fun fact.</p>
          <div className="actions">
            <button className="btn" onClick={loadWords} disabled={loadingWords} aria-busy={loadingWords}>
              {loadingWords ? "Refreshing words…" : "Refresh Words"}
            </button>
            <button className="btn btn-ghost" onClick={loadFact} disabled={loadingFact} aria-busy={loadingFact}>
              {loadingFact ? "Getting fact…" : "New Fact"}
            </button>
          </div>
          {error && <div className="alert">{error}</div>}
        </header>

        <div className="fact-card">
          <div className="fact-chip">Fun Fact</div>
          <p className="fact-text">{loadingFact ? "…" : fact}</p>
        </div>

        <div className="words-wrap">
          <h2 className="section-label">Random Words & Definitions</h2>

          <div className="words-grid">
            {loadingWords
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="word-card skeleton">
                    <div className="skeleton-line w40"></div>
                    <div className="skeleton-line w90"></div>
                    <div className="skeleton-line w75"></div>
                  </div>
                ))
              : words.map((w, i) => (
                  <div key={`${w.word}-${i}`} className="word-card">
                    <div className="word-row">
                      <span className="word">{w.word}</span>
                      {w.pos ? <span className="pos">{w.pos}</span> : null}
                    </div>
                    <p className="definition">
                      {w.definition || <span className="muted">Definition not found.</span>}
                      {w.base && w.base !== w.word ? (
                        <span className="base-note"> (base: {w.base})</span>
                      ) : null}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
