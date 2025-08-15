import React, { useEffect, useMemo, useState } from "react";
import "./secret.css";

/**
 * APIs used (no keys required):
 * - Random words: https://random-word-api.vercel.app/api?words=10
 *   (fallback to a local list if unavailable)
 * - Definitions: https://api.dictionaryapi.dev/api/v2/entries/en/<word>
 * - Fun facts:   https://uselessfacts.jsph.pl/random.json?language=en
 */

const FALLBACK_WORDS = [
  "serendipity","ephemeral","mellifluous","luminous","ubiquitous",
  "catharsis","conundrum","euphoria","quintessential","sonder",
  "ambivalence","brevity","camaraderie","eloquent","innate",
  "lucid","paradox","resilient","tenacious","zenith"
];

const todayKey = () => {
  const d = new Date();
  // Cache set per day so the same 10 stay if user returns the same day
  return `vocab_set_${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
};

async function getRandomWords(count = 10) {
  try {
    const r = await fetch(`https://random-word-api.vercel.app/api?words=${count}`);
    if (!r.ok) throw new Error("Random word API error");
    const data = await r.json();
    // Ensure we only get alphabetic single words
    return (data || []).filter(w => /^[a-zA-Z]+$/.test(w)).slice(0, count);
  } catch {
    // Fallback: pick random words from local list
    const shuffled = [...FALLBACK_WORDS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
}

async function getDefinition(word) {
  try {
    const r = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!r.ok) throw new Error("Not found");
    const data = await r.json();
    // Dictionary API returns an array of entries; pick the first sensible meaning
    const entry = Array.isArray(data) ? data[0] : null;
    const phonetic = entry?.phonetic || (entry?.phonetics?.find(p => p.text)?.text) || "";
    // Flatten meanings
    const meanings = (entry?.meanings || []).flatMap(m =>
      (m.definitions || []).map(def => ({
        partOfSpeech: m.partOfSpeech || "",
        definition: def.definition || "",
        example: def.example || ""
      }))
    );

    // Choose the shortest clear definition to display
    const primary = meanings.find(m => m.definition.length > 0) || null;

    return {
      word,
      phonetic: phonetic || "",
      partOfSpeech: primary?.partOfSpeech || "",
      definition: primary?.definition || "—",
      example: primary?.example || ""
    };
  } catch {
    return {
      word,
      phonetic: "",
      partOfSpeech: "",
      definition: "Definition not found.",
      example: ""
    };
  }
}

async function getFunFact() {
  try {
    const r = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
    if (!r.ok) throw new Error("Facts API error");
    const data = await r.json();
    return data?.text || "Here’s a fun fact placeholder: Honey never spoils.";
  } catch {
    const backups = [
      "Bananas are berries, but strawberries are not.",
      "Octopuses have three hearts.",
      "Honey found in ancient tombs is still edible.",
      "There are more possible chess games than atoms in the observable universe.",
      "A day on Venus is longer than its year."
    ];
    return backups[Math.floor(Math.random() * backups.length)];
  }
}

export default function VocabAndFacts() {
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState([]); // array of { word, phonetic, partOfSpeech, definition, example }
  const [fact, setFact] = useState("");
  const [error, setError] = useState("");

  const cacheKey = useMemo(() => todayKey(), []);

  // Load cached words if available (same calendar day)
  useEffect(() => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length) {
          setWords(parsed);
        }
      } catch { /* ignore */ }
    }
    // Always fetch a fresh fun fact on load
    getFunFact().then(setFact);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function generateWords() {
    setLoading(true);
    setError("");
    try {
      const baseWords = await getRandomWords(10);
      // Pull definitions for each word (in parallel)
      const defs = await Promise.all(baseWords.map(w => getDefinition(w)));
      setWords(defs);
      localStorage.setItem(cacheKey, JSON.stringify(defs));
    } catch (e) {
      setError("Couldn’t load words. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function generateFact() {
    const text = await getFunFact();
    setFact(text);
  }

  return (
    <div className="vocab-wrap">
      <div className="vocab-card">
        <header className="vocab-head">
          <h1 className="vocab-title">🧠 Learn 10 New Words + 🎉 Fun Fact</h1>
          <p className="vocab-sub">New vocabulary at a tap, with simple definitions. No accounts, no keys.</p>
        </header>

        <div className="vocab-actions">
          <button
            className="btn primary"
            onClick={generateWords}
            disabled={loading}
            title="Fetch 10 random words with meanings"
          >
            {loading ? "Loading…" : "Get 10 New Words"}
          </button>

          <button className="btn ghost" onClick={generateFact} title="Get a new fun fact">
            New Fun Fact
          </button>
        </div>

        {error && <div className="vocab-error">{error}</div>}

        <section className="vocab-section">
          <h2 className="section-title">Words</h2>
          {words.length === 0 ? (
            <div className="placeholder">
              Click <b>Get 10 New Words</b> to start.
            </div>
          ) : (
            <div className="word-list">
              {words.map((w, i) => (
                <div className="word-item" key={`${w.word}-${i}`}>
                  <div className="word-row">
                    <div className="word-main">
                      <span className="word">{w.word}</span>
                      {w.phonetic && <span className="phonetic">/{w.phonetic}/</span>}
                    </div>
                    {w.partOfSpeech && <span className="pos">{w.partOfSpeech}</span>}
                  </div>
                  <div className="def">{w.definition}</div>
                  {w.example && <div className="ex">“{w.example}”</div>}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="vocab-section">
          <h2 className="section-title">Fun Fact</h2>
          <div className="fact-box">{fact || "Click ‘New Fun Fact’ to fetch one."}</div>
        </section>
      </div>
    </div>
  );
}
