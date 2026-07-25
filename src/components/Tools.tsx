"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { FC } from "react";

type ToolId = "markdown" | "calculator" | "color" | "textcounter" | "password";

/* ── SVG Icons ── */
const ToolIcon = ({ name, className = "" }: { name: string; className?: string }) => {
  const icons: Record<string, string> = {
    markdown: `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    calculator: `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg>`,
    color: `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>`,
    textcounter: `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
    password: `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  };
  const svg = icons[name];
  if (!svg) return null;
  return <span dangerouslySetInnerHTML={{ __html: svg }} />;
};

const tools = [
  { id: "markdown" as ToolId, name: "Markdown Preview", icon: "markdown", desc: "Live preview with formatting" },
  { id: "calculator" as ToolId, name: "Calculator", icon: "calculator", desc: "GUI calculator with history" },
  { id: "color" as ToolId, name: "Color Picker", icon: "color", desc: "HEX, RGB, HSL converter" },
  { id: "textcounter" as ToolId, name: "Text Counter", icon: "textcounter", desc: "Words, characters, sentences" },
  { id: "password" as ToolId, name: "Password Generator", icon: "password", desc: "Secure random passwords" },
];

/* ── Markdown Preview ── */
function MarkdownTool() {
  const [input, setInput] = useState(
    "# Heading 1\n## Heading 2\n\nThis is **bold** and *italic* text.\n\n- First item\n- Second item\n- Third item\n\n> A blockquote for emphasis.\n\n`inline code` works too."
  );

  const renderMarkdown = (md: string) => {
    let html = md
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-5 mb-2 text-[var(--beige)]">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-[var(--beige)]">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-3 text-[var(--beige)]">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[var(--beige)]">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-[var(--bg)] px-1.5 py-0.5 rounded text-[var(--moss)] font-[family-name:var(--font-mono)] text-sm">$1</code>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 text-[var(--text-muted)]">\u2022 $1</li>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-2 border-[var(--moss)] pl-4 italic text-[var(--text-muted)]">$1</blockquote>')
      .replace(/\n\n/g, '<br/>');
    return html;
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="text-xs text-[var(--text-muted)] font-medium mb-2 block tracking-wide uppercase">Markdown Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-64 bg-[var(--bg-deep)] border border-[var(--border)] rounded-xl p-4 font-[family-name:var(--font-mono)] text-sm text-[var(--beige)] resize-none focus:outline-none focus:border-[var(--moss)] transition-colors"
        />
      </div>
      <div>
        <label className="text-xs text-[var(--text-muted)] font-medium mb-2 block tracking-wide uppercase">Preview</label>
        <div className="bg-[var(--bg-deep)] border border-[var(--border)] rounded-xl p-6 min-h-[264px]">
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(input) }} />
        </div>
      </div>
    </div>
  );
}

/* ── Calculator ── */
function CalculatorTool() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  const [newNumber, setNewNumber] = useState(true);

  const inputDigit = useCallback((d: string) => {
    setDisplay((prev) => {
      if (newNumber) { setNewNumber(false); return d === "." ? "0." : d; }
      if (d === "." && prev.includes(".")) return prev;
      return prev === "0" && d !== "." ? d : prev + d;
    });
  }, [newNumber]);

  const calculate = useCallback((op: string) => {
    setDisplay((prev) => {
      const val = parseFloat(prev);
      if (op === "\u00b1") return String(-val);
      if (op === "%") return String(val / 100);
      if (op === "\u221a") return String(Math.sqrt(val));
      return prev;
    });
  }, []);

  const operate = useCallback((op: string) => {
    setDisplay((prev) => {
      const expr = prev + " " + op + " ";
      setHistory((h) => [...h.slice(-4), expr]);
      setNewNumber(false);
      return expr;
    });
  }, []);

  const equals = useCallback(() => {
    try {
      // eslint-disable-next-line no-eval
      const result = Function('"use strict";return (' + display + ")")();
      const resultStr = typeof result === "number" ? String(Math.round(result * 1e10) / 1e10) : "Error";
      setHistory((h) => [...h.slice(-4), display + " = " + resultStr]);
      setDisplay(resultStr);
      setNewNumber(true);
    } catch {
      setDisplay("Error");
      setNewNumber(true);
    }
  }, [display]);

  const clear = () => { setDisplay("0"); setNewNumber(true); };

  const buttons = [
    ["C", "\u00b1", "%", "\u00f7"],
    ["7", "8", "9", "\u00d7"],
    ["4", "5", "6", "\u2212"],
    ["1", "2", "3", "+"],
    ["0", ".", "\u221a", "="],
  ];

  const btnClass = "h-12 rounded-lg font-medium text-sm transition-all active:scale-95";
  const numClass = `${btnClass} bg-[var(--bg-card)] text-[var(--beige)] border border-[var(--border)] hover:bg-[var(--bg-card-hover)]`;
  const opClass = `${btnClass} bg-[var(--moss)]/15 text-[var(--moss)] border border-[var(--moss)]/30 hover:bg-[var(--moss)]/25`;
  const funcClass = `${btnClass} bg-[var(--bg-deep)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--beige)]`;

  const handleBtn = (b: string) => {
    if (b === "C") return clear();
    if (b === "=") return equals();
    if (["\u00b1", "%", "\u221a"].includes(b)) return calculate(b);
    if (["\u00f7", "\u00d7", "\u2212", "+"].includes(b)) return operate(b === "\u00f7" ? "/" : b === "\u00d7" ? "*" : b === "\u2212" ? "-" : b);
    inputDigit(b);
  };

  const getLabel = (b: string) => b === "\u00f7" ? "/" : b === "\u00d7" ? "*" : b === "\u2212" ? "-" : b;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="max-w-xs">
        <div className="bg-[var(--bg-deep)] border border-[var(--border)] rounded-xl p-4 mb-3">
          <div className="text-right font-[family-name:var(--font-mono)] text-3xl text-[var(--beige)] truncate min-h-[40px]">
            {display}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((b, i) => (
            <button
              key={i}
              onClick={() => handleBtn(b)}
              className={`${b === "0" ? "col-span-2" : ""} ${
                b === "C" || b === "\u00b1" || b === "%" || b === "\u221a" ? funcClass :
                b === "\u00f7" || b === "\u00d7" || b === "\u2212" || b === "+" || b === "=" ? opClass : numClass
              }`}
              data-value={getLabel(b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <label className="text-xs text-[var(--text-muted)] font-medium mb-3 block tracking-wide uppercase">History</label>
        {history.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)] italic">No calculations yet.</p>
        ) : (
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={i} className="text-sm font-[family-name:var(--font-mono)] text-[var(--text-muted)] bg-[var(--bg-deep)] border border-[var(--border)] rounded-lg px-4 py-2.5">
                {h}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Color Picker ── */
function ColorTool() {
  const [color, setColor] = useState("#839958");

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b, str: `rgb(${r}, ${g}, ${b})` };
  };

  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const rgb = hexToRgb(color);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col items-center gap-6">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-32 h-32 rounded-2xl cursor-pointer border-0 shadow-xl"
        />
        <div className="h-20 w-full rounded-xl border border-[var(--border)]" style={{ background: color }} />
      </div>
      <div className="space-y-4">
        {[
          { label: "HEX", value: color.toUpperCase() },
          { label: "RGB", value: rgb.str },
          { label: "HSL", value: hexToHsl(color) },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => copyToClipboard(item.value)}
            className="w-full flex items-center gap-3 bg-[var(--bg-deep)] border border-[var(--border)] rounded-xl px-5 py-3.5 hover:border-[var(--moss)] transition-colors text-left group"
          >
            <span className="text-xs text-[var(--moss)] font-medium w-8">{item.label}</span>
            <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--beige)] flex-1">{item.value}</span>
            <span className="text-xs text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">click to copy</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Text Counter ── */
function TextCounterTool() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200);

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-40 bg-[var(--bg-deep)] border border-[var(--border)] rounded-xl p-4 text-sm text-[var(--beige)] resize-none focus:outline-none focus:border-[var(--moss)] transition-colors"
        placeholder="Type or paste your text here..."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Words", value: words },
          { label: "Characters", value: chars },
          { label: "No Spaces", value: charsNoSpace },
          { label: "Sentences", value: sentences },
          { label: "Paragraphs", value: paragraphs },
          { label: "Read Time", value: `${readingTime}m` },
        ].map((stat) => (
          <div key={stat.label} className="bg-[var(--bg-deep)] border border-[var(--border)] rounded-xl p-4 text-center">
            <div className="text-xl font-bold text-[var(--beige)] font-[family-name:var(--font-mono)]">
              {stat.value}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Password Generator ── */
function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generate = useCallback(() => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    let result = "";
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    for (let i = 0; i < length; i++) {
      result += chars[arr[i] % chars.length];
    }
    setPassword(result);
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  useEffect(() => { generate(); }, [generate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (uppercase && lowercase) score++;
    if (numbers) score++;
    if (symbols) score++;
    if (score <= 2) return { label: "Weak", color: "text-red-400", bg: "bg-red-400", w: "w-1/5" };
    if (score <= 3) return { label: "Fair", color: "text-yellow-400", bg: "bg-yellow-400", w: "w-2/5" };
    if (score <= 4) return { label: "Strong", color: "text-[var(--moss)]", bg: "bg-[var(--moss)]", w: "w-4/5" };
    return { label: "Very Strong", color: "text-[var(--moss)]", bg: "bg-[var(--moss)]", w: "w-full" };
  };

  const strength = getStrength();

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <div className="flex-1 bg-[var(--bg-deep)] border border-[var(--border)] rounded-xl px-5 py-4 font-[family-name:var(--font-mono)] text-lg text-[var(--beige)] truncate">
          {password}
        </div>
        <button
          onClick={copyToClipboard}
          className="px-5 py-3 bg-[var(--moss)] text-[var(--bg)] rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span className="text-xs text-[var(--text-muted)] font-medium tracking-wide uppercase">Strength</span>
          <span className={`text-xs font-medium ${strength.color}`}>{strength.label}</span>
        </div>
        <div className="h-1.5 bg-[var(--bg-deep)] rounded-full overflow-hidden">
          <div className={`h-full ${strength.bg} rounded-full transition-all duration-500 ${strength.w}`} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between mb-3">
            <label className="text-xs text-[var(--text-muted)] font-medium tracking-wide uppercase">Length</label>
            <span className="text-sm text-[var(--beige)] font-[family-name:var(--font-mono)]">{length}</span>
          </div>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-[var(--moss)]"
          />
        </div>
        <div className="space-y-2.5">
          {[
            { label: "Uppercase (A-Z)", checked: uppercase, set: setUppercase },
            { label: "Lowercase (a-z)", checked: lowercase, set: setLowercase },
            { label: "Numbers (0-9)", checked: numbers, set: setNumbers },
            { label: "Symbols (!@#...)", checked: symbols, set: setSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.set(e.target.checked)}
                className="accent-[var(--moss)] w-4 h-4"
              />
              <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--beige)] transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Tool Registry ── */
const toolComponents: Record<ToolId, React.FC> = {
  markdown: MarkdownTool,
  calculator: CalculatorTool,
  color: ColorTool,
  textcounter: TextCounterTool,
  password: PasswordGeneratorTool,
};

export function Tools() {
  const [active, setActive] = useState<ToolId>("markdown");
  const ActiveTool = toolComponents[active];

  return (
    <section id="tools" className="py-32 mt-20 border-t border-[var(--border)]" style={{background: "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-card) 50%, var(--bg-deep) 100%)"}}>
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="mb-12 text-center">
          <p className="font-medium text-xs text-[var(--moss)] tracking-[0.25em] uppercase mb-4">
            Interactive Tools
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-3">
            Utility <span className="text-[var(--rosy)]">Toolkit</span>
          </h2>
          <p className="text-[var(--text-muted)] text-sm max-w-lg mx-auto">
            Free, browser-based tools — no signup required. Built for developers and creators.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActive(tool.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                active === tool.id
                  ? "bg-[var(--bg-card)] border-[var(--rosy)] shadow-lg shadow-[var(--rosy)]/10"
                  : "bg-[var(--bg)] border-[var(--border)] hover:border-[var(--border-hover)]"
              }`}
            >
              <span className="text-[var(--moss)] block mb-2">
                <ToolIcon name={tool.icon} />
              </span>
              <h4 className="font-semibold text-xs mb-0.5">{tool.name}</h4>
              <p className="text-[10px] text-[var(--text-muted)] leading-tight">{tool.desc}</p>
            </button>
          ))}
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 md:p-8">
          <ActiveTool />
        </div>
      </div>
    </section>
  );
}
