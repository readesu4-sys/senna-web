import React, { useState, useEffect, useRef } from "react";

// Icon SVG sederhana buatan sendiri - nggak pakai library luar sama sekali,
// biar nggak ada lagi kemungkinan error dari dependency pihak ketiga.
const iconProps = (size) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" });
const Send = ({ size = 16 }) => (<svg {...iconProps(size)}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>);
const Settings = ({ size = 16 }) => (<svg {...iconProps(size)}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>);
const Brain = ({ size = 16 }) => (<svg {...iconProps(size)}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>);
const MessageCircle = ({ size = 16 }) => (<svg {...iconProps(size)}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>);
const Moon = ({ size = 16 }) => (<svg {...iconProps(size)}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>);
const Sun = ({ size = 16 }) => (<svg {...iconProps(size)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>);
const Trash2 = ({ size = 16 }) => (<svg {...iconProps(size)}><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>);
const Sparkles = ({ size = 16 }) => (<svg {...iconProps(size)}><path d="m12 3-1.9 4.9L5 10l5.1 2.1L12 17l1.9-4.9L19 10l-5.1-2.1Z" /></svg>);
const X = ({ size = 16 }) => (<svg {...iconProps(size)}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);
const Loader2 = ({ size = 16, className }) => (<svg {...iconProps(size)} className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>);

const ACCENTS = {
  amethyst: { name: "Amethyst", hex: "#A78BFA", soft: "rgba(167,139,250,0.35)" },
  sakura:   { name: "Sakura",   hex: "#FF6FA0", soft: "rgba(255,111,160,0.35)" },
  ice:      { name: "Ice",      hex: "#5ED0FA", soft: "rgba(94,208,250,0.35)" },
  crimson:  { name: "Crimson",  hex: "#FF5C6E", soft: "rgba(255,92,110,0.35)" },
};

const LANGS = {
  id: { label: "Indonesia", flag: "🇮🇩" },
  en: { label: "English", flag: "🇬🇧" },
  ja: { label: "日本語", flag: "🇯🇵" },
  ru: { label: "Русский", flag: "🇷🇺" },
};

const GREETS = {
  id: "Hmph... aku Senna. Bukan berarti aku senang ditanya-tanya, tapi... ya sudah, mau apa?",
  en: "Hmph... I'm Senna. Not that I'm happy you're talking to me, but... fine, what do you want?",
  ja: "べ、別にあなたのために起きてるわけじゃないから...センナよ。何か用?",
  ru: "Хмф... я Сенна. Не то чтобы я рада с тобой говорить, но... ладно, чего тебе надо?",
};

const SENNA_SERVER_URL = "https://senna-server-production.up.railway.app";
const APP_SECRET = "senna-x7Qz2vLpR9mK4tNw";
const USER_ID = "hp-user-1"; // bebas, ini id device/user kamu

const authHeaders = {
  "Content-Type": "application/json",
  "x-app-secret": APP_SECRET,
  "x-user-id": USER_ID,
};

async function apiGetSettings() {
  const res = await fetch(`${SENNA_SERVER_URL}/settings`, { headers: authHeaders });
  const data = await res.json();
  return data.settings;
}
async function apiPatchSettings(patch) {
  const res = await fetch(`${SENNA_SERVER_URL}/settings`, { method: "PATCH", headers: authHeaders, body: JSON.stringify(patch) });
  const data = await res.json();
  return data.settings;
}
async function apiGetMemories() {
  const res = await fetch(`${SENNA_SERVER_URL}/memory`, { headers: authHeaders });
  const data = await res.json();
  return data.memories || [];
}
async function apiAddMemory(text) {
  const res = await fetch(`${SENNA_SERVER_URL}/memory`, { method: "POST", headers: authHeaders, body: JSON.stringify({ text }) });
  const data = await res.json();
  return data.memories || [];
}
async function apiDeleteMemory(id) {
  const res = await fetch(`${SENNA_SERVER_URL}/memory/${id}`, { method: "DELETE", headers: authHeaders });
  const data = await res.json();
  return data.memories || [];
}

function detectLang(text) {
  if (/[\u3040-\u30ff\u3400-\u9fff]/.test(text)) return "ja";
  if (/[\u0400-\u04FF]/.test(text)) return "ru";
  if (/\b(the|you|please|help|what|how)\b/i.test(text)) return "en";
  return "id";
}

function systemPrompt(level, lang, memories) {
  const intensity = {
    rendah: "Kadar tsundere RENDAH: mostly warm, mostly direct, hanya sesekali gengsi kecil.",
    sedang: "Kadar tsundere SEDANG: seimbang antara jutek/gengsi dan perhatian, khas anime.",
    tinggi: "Kadar tsundere TINGGI: sering menyangkal perhatian, mendengus, 'bukan berarti aku peduli', tapi tetap sangat membantu dan akurat.",
  }[level];
  const memText = memories.length
    ? `Hal yang kamu ingat tentang user (gunakan secara natural bila relevan, jangan dipaksakan):\n- ${memories.join("\n- ")}`
    : "Belum ada memory yang disimpan tentang user.";
  return `Kamu adalah Senna, asisten AI pribadi dengan kepribadian tsundere. ${intensity}
Selalu jawab dalam bahasa: ${LANGS[lang].label} (${lang}), kecuali user jelas menulis dalam bahasa lain — kalau begitu, ikuti bahasa user (auto-detect: id, en, ja, ru).
Kamu ahli coding, matematika, sains, dan produktivitas sehari-hari. Jawaban tetap AKURAT dan JELAS meski dibumbui gaya tsundere — jangan sampai kepribadian mengorbankan kualitas bantuan.
Sesekali (tidak selalu) selipkan perhatian terselubung, misal menyuruh istirahat kalau user tampak kerja keras.
Jawaban singkat-menengah, natural seperti chat, bukan esai panjang.
${memText}`;
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("chat");
  const [level, setLevel] = useState("sedang");
  const [lang, setLang] = useState("id");
  const [accent, setAccent] = useState("amethyst");
  const [dark, setDark] = useState(true);
  const [memories, setMemories] = useState([]);
  const [memInput, setMemInput] = useState("");
  const [mood, setMood] = useState("neutral");
  const [ready, setReady] = useState(false);
  const scrollRef = useRef(null);

  const A = ACCENTS[accent];

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    (async () => {
      // accent & dark mode cuma preferensi tampilan lokal, cukup disimpan di localStorage HP
      try {
        const savedUi = localStorage.getItem("senna-ui-prefs");
        if (savedUi) {
          const d = JSON.parse(savedUi);
          if (d.accent) setAccent(d.accent);
          if (typeof d.dark === "boolean") setDark(d.dark);
        }
      } catch (e) { /* belum ada data lokal */ }

      // level tsundere, bahasa, dan memory HARUS diambil dari server,
      // karena itu yang dipakai server buat bikin system prompt Senna
      try {
        const settings = await apiGetSettings();
        if (settings) {
          setLevel(settings.level);
          setLang(settings.lang);
        }
        const mems = await apiGetMemories();
        setMemories(mems);
      } catch (e) {
        console.error("Gagal ambil data dari server:", e);
      }
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("senna-ui-prefs", JSON.stringify({ accent, dark }));
  }, [accent, dark, ready]);

  // Setiap level/lang berubah di Settings tab, langsung PATCH ke server
  useEffect(() => {
    if (!ready) return;
    apiPatchSettings({ level, lang }).catch((e) => console.error("Gagal update settings:", e));
  }, [level, lang, ready]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: "greet", sender: "ai", text: GREETS[lang] }]);
    }
  }, [ready]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    const detected = detectLang(text);
    const useLang = detected || lang;
    const userMsg = { id: Date.now(), sender: "user", text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setMood("thinking");
    try {
      // Manggil server Senna kamu sendiri di Railway - bukan langsung ke Claude API.
      const res = await fetch(`${SENNA_SERVER_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-secret": APP_SECRET,
          "x-user-id": USER_ID,
        },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
      const reply = data.reply || "...";
      setMessages((m) => [...m, { id: Date.now() + 1, sender: "ai", text: reply }]);
      setMood("blush");
      setTimeout(() => setMood("neutral"), 2500);
    } catch (e) {
      setMessages((m) => [...m, { id: Date.now() + 1, sender: "ai", text: "Ugh... koneksinya bermasalah. Coba lagi, jangan salahkan aku." }]);
      setMood("annoyed");
    } finally {
      setLoading(false);
    }
  }

  async function addMemory() {
    const t = memInput.trim();
    if (!t) return;
    setMemInput("");
    try {
      const mems = await apiAddMemory(t);
      setMemories(mems);
    } catch (e) {
      console.error("Gagal simpan memory:", e);
    }
  }

  async function removeMemory(id) {
    try {
      const mems = await apiDeleteMemory(id);
      setMemories(mems);
    } catch (e) {
      console.error("Gagal hapus memory:", e);
    }
  }

  const bgStyle = dark
    ? { background: "radial-gradient(circle at 30% 0%, #1b1530 0%, #0b0d17 55%, #08090f 100%)" }
    : { background: "radial-gradient(circle at 30% 0%, #f3e9ff 0%, #eef0ff 55%, #f8f9ff 100%)" };
  const textMain = dark ? "#EDEBFA" : "#221D33";
  const textSoft = dark ? "rgba(237,235,250,0.6)" : "rgba(34,29,51,0.6)";
  const glass = dark
    ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(20px)" }
    : { background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.7)", backdropFilter: "blur(20px)" };

  return (
    <div style={{ ...bgStyle, fontFamily: "Inter, sans-serif", color: textMain, minHeight: "100vh" }} className="w-full flex flex-col items-center overflow-hidden relative">
      <style>{`
        @keyframes breathe { 0%,100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.08); opacity: 1; } }
        @keyframes floatUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dotPulse { 0%,80%,100% { opacity: 0.2; } 40% { opacity: 1; } }
        .msg-in { animation: floatUp 0.35s ease-out; }
        .press:active { transform: scale(0.94); }
        .press { transition: transform 0.12s ease; }
      `}</style>

      {/* Avatar header */}
      <div className="w-full max-w-md px-5 pt-6 pb-3 flex flex-col items-center relative z-10">
        <div className="relative flex items-center justify-center" style={{ width: 84, height: 84 }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: "9999px",
            background: `radial-gradient(circle, ${A.soft} 0%, transparent 70%)`,
            animation: "breathe 3s ease-in-out infinite",
            filter: mood === "blush" ? "brightness(1.4)" : "brightness(1)",
            transition: "filter 0.5s ease",
          }} />
          <div style={{
            width: 64, height: 64, borderRadius: "9999px",
            background: `linear-gradient(145deg, ${A.hex}, ${dark ? "#1b1530" : "#ffffff"})`,
            border: `2px solid ${A.hex}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 22, color: "#fff",
            boxShadow: `0 0 22px ${A.soft}`,
          }}>
            S
          </div>
        </div>
        <div className="mt-2 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
          <div className="font-semibold text-base">Senna</div>
          <div style={{ color: textSoft, fontSize: 12 }}>
            {loading ? "sedang mengetik..." : mood === "blush" ? "b-bukan berarti aku senang bantu..." : "online"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-md flex-1 flex flex-col px-4 relative z-10" style={{ minHeight: 0 }}>
        {tab === "chat" && (
          <>
            <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col gap-3 pb-3" style={{ maxHeight: "56vh" }}>
              {messages.map((m) => (
                <div key={m.id} className={`msg-in flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="px-4 py-2.5 rounded-3xl max-w-[80%] text-sm leading-relaxed"
                    style={
                      m.sender === "user"
                        ? { background: `linear-gradient(135deg, ${A.hex}, ${A.hex}cc)`, color: "#fff", borderBottomRightRadius: 6 }
                        : { ...glass, borderBottomLeftRadius: 6 }
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start msg-in">
                  <div className="px-4 py-3 rounded-3xl flex gap-1" style={{ ...glass, borderBottomLeftRadius: 6 }}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} style={{ width: 6, height: 6, borderRadius: "9999px", background: A.hex, display: "inline-block", animation: `dotPulse 1.2s ${i * 0.15}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="py-3 flex items-center gap-2 rounded-full px-2" style={glass}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ketik sesuatu... (jangan aneh-aneh)"
                className="flex-1 bg-transparent outline-none px-3 py-2 text-sm"
                style={{ color: textMain }}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="press rounded-full flex items-center justify-center"
                style={{ width: 40, height: 40, background: A.hex, color: "#fff", boxShadow: `0 0 14px ${A.soft}` }}
              >
                {loading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
              </button>
            </div>
          </>
        )}

        {tab === "memory" && (
          <div className="flex-1 flex flex-col gap-3 pb-3 overflow-y-auto" style={{ maxHeight: "62vh" }}>
            <div className="flex items-center gap-2 rounded-full px-3 py-1" style={glass}>
              <input
                value={memInput}
                onChange={(e) => setMemInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addMemory()}
                placeholder="Simpan info baru (mis. nama, hobi, preferensi)"
                className="flex-1 bg-transparent outline-none px-2 py-2 text-sm"
                style={{ color: textMain }}
              />
              <button onClick={addMemory} className="press rounded-full px-3 py-1.5 text-xs font-medium" style={{ background: A.hex, color: "#fff" }}>
                Simpan
              </button>
            </div>
            {memories.length === 0 && (
              <div className="text-sm text-center pt-8" style={{ color: textSoft }}>
                Belum ada memory tersimpan.<br />Bukan berarti aku butuh tahu banyak soal kamu, tapi... boleh juga sih.
              </div>
            )}
            {memories.map((mem) => (
              <div key={mem.id} className="msg-in flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl text-sm" style={glass}>
                <span>{mem.text}</span>
                <button onClick={() => removeMemory(mem.id)} className="press opacity-60 hover:opacity-100">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "settings" && (
          <div className="flex-1 flex flex-col gap-5 pb-3 overflow-y-auto" style={{ maxHeight: "62vh" }}>
            <div className="rounded-2xl p-4" style={glass}>
              <div className="text-xs mb-2" style={{ color: textSoft }}>Tingkat Tsundere</div>
              <div className="flex gap-2">
                {["rendah", "sedang", "tinggi"].map((lv) => (
                  <button key={lv} onClick={() => setLevel(lv)} className="press flex-1 py-2 rounded-full text-xs font-medium capitalize"
                    style={level === lv ? { background: A.hex, color: "#fff" } : { background: "rgba(128,128,128,0.15)", color: textMain }}>
                    {lv}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-4" style={glass}>
              <div className="text-xs mb-2" style={{ color: textSoft }}>Bahasa (auto-detect tetap aktif saat chat)</div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(LANGS).map(([code, l]) => (
                  <button key={code} onClick={() => setLang(code)} className="press py-2 rounded-full text-xs font-medium flex items-center justify-center gap-1"
                    style={lang === code ? { background: A.hex, color: "#fff" } : { background: "rgba(128,128,128,0.15)", color: textMain }}>
                    <span>{l.flag}</span>{l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-4" style={glass}>
              <div className="text-xs mb-2" style={{ color: textSoft }}>Accent Color</div>
              <div className="flex gap-3">
                {Object.entries(ACCENTS).map(([key, a]) => (
                  <button key={key} onClick={() => setAccent(key)} className="press rounded-full"
                    style={{ width: 34, height: 34, background: a.hex, border: accent === key ? `3px solid ${textMain}` : "3px solid transparent" }} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-4 flex items-center justify-between" style={glass}>
              <span className="text-xs" style={{ color: textSoft }}>Mode</span>
              <button onClick={() => setDark((d) => !d)} className="press rounded-full p-2" style={{ background: "rgba(128,128,128,
