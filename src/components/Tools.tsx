"use client";

import { useState } from "react";

type ToolId = "json" | "markdown" | "color" | "regex";

const tools = [
  {
    id: "json" as ToolId,
    name: "JSON Formatter",
    icon: "{ }",
    desc: "Format, validate, dan minify JSON data",
  },
  {
    id: "markdown" as ToolId,
    name: "Markdown Preview",
    icon: "M↓",
    desc: "Live preview markdown content",
  },
  {
    id: "color" as ToolId,
    name: "Color Converter",
    icon: "◉",
    desc: "Convert HEX, RGB, HSL colors",
  },
  {
    id: "regex" as ToolId,
    name: "Regex Tester",
    icon: ".*",
    desc: "Test regular expressions",
  },
];

function JSONTool() {
  const [input, setInput] = useState('{\n  "name": "test",\n  "value": 42\n}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-32 bg-[var(--bg-deep)] border border-[var(--border)] rounded-lg p-4 font-[family-name:var(--font-mono)] text-sm text-[var(--beige)] resize-none focus:outline-none focus:border-[var(--moss)]"
        placeholder="Paste JSON here..."
      />
      <div className="flex gap-3">
        <button
          onClick={format}
          className="px-4 py-2 bg-[var(--moss)] text-[var(--bg)] rounded-lg text-sm font-semibold hover:opacity-90"
        >
          Format
        </button>
        <button
          onClick={minify}
          className="px-4 py-2 border border-[var(--border)] text-[var(--beige)] rounded-lg text-sm hover:border-[var(--moss)]"
        >
          Minify
        </button>
      </div>
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">
          {error}
        </div>
      )}
      {output && (
        <pre className="bg-[var(--bg-deep)] border border-[var(--border)] rounded-lg p-4 font-[family-name:var(--font-mono)] text-sm text-[var(--beige)] overflow-x-auto max-h-64 overflow-y-auto">
          {output}
        </pre>
      )}
    </div>
  );
}

function MarkdownTool() {
  const [input, setInput] = useState(
    "# Hello World\n\nThis is **bold** and *italic*.\n\n- Item 1\n- Item 2\n\n```js\nconsole.log('hi');\n```"
  );

  const renderMarkdown = (md: string) => {
    return md
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-[var(--bg)] px-1.5 py-0.5 rounded text-[var(--moss)] font-[family-name:var(--font-mono)] text-sm">$1</code>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
      .replace(/\n\n/g, '<br/>')
      .replace(/```js\n([\s\S]*?)```/g, '<pre class="bg-[var(--bg)] p-3 rounded-lg mt-2 mb-2 overflow-x-auto"><code class="text-sm font-[family-name:var(--font-mono)] text-[var(--rosy)]">$1</code></pre>');
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-32 bg-[var(--bg-deep)] border border-[var(--border)] rounded-lg p-4 font-[family-name:var(--font-mono)] text-sm text-[var(--beige)] resize-none focus:outline-none focus:border-[var(--moss)]"
        placeholder="Write markdown..."
      />
      <div className="bg-[var(--bg-deep)] border border-[var(--border)] rounded-lg p-6 min-h-[120px] prose prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(input) }} />
      </div>
    </div>
  );
}

function ColorTool() {
  const [color, setColor] = useState("#839958");

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
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
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-16 h-16 rounded-lg cursor-pointer border-0"
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)] w-10">HEX</span>
            <code className="font-[family-name:var(--font-mono)] text-sm text-[var(--beige)]">{color}</code>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)] w-10">RGB</span>
            <code className="font-[family-name:var(--font-mono)] text-sm text-[var(--beige)]">{hexToRgb(color)}</code>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)] w-10">HSL</span>
            <code className="font-[family-name:var(--font-mono)] text-sm text-[var(--beige)]">{hexToHsl(color)}</code>
          </div>
        </div>
      </div>
      <div className="h-24 rounded-xl border border-[var(--border)]" style={{ background: color }} />
    </div>
  );
}

function RegexTool() {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("Hello 123 world 456");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  const test = () => {
    try {
      const re = new RegExp(pattern, flags);
      const m = testStr.match(re);
      setMatches(m || []);
      setError("");
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 flex items-center bg-[var(--bg-deep)] border border-[var(--border)] rounded-lg px-3">
          <span className="text-[var(--moss)] font-[family-name:var(--font-mono)]">/</span>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="flex-1 bg-transparent p-3 font-[family-name:var(--font-mono)] text-sm text-[var(--beige)] focus:outline-none"
            placeholder="regex pattern"
          />
          <span className="text-[var(--moss)] font-[family-name:var(--font-mono)]">/{flags}</span>
        </div>
        <input
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          className="w-16 bg-[var(--bg-deep)] border border-[var(--border)] rounded-lg p-3 font-[family-name:var(--font-mono)] text-sm text-[var(--beige)] text-center focus:outline-none focus:border-[var(--moss)]"
          placeholder="flags"
        />
      </div>
      <textarea
        value={testStr}
        onChange={(e) => setTestStr(e.target.value)}
        className="w-full h-20 bg-[var(--bg-deep)] border border-[var(--border)] rounded-lg p-4 font-[family-name:var(--font-mono)] text-sm text-[var(--beige)] resize-none focus:outline-none focus:border-[var(--moss)]"
        placeholder="Test string..."
      />
      <button
        onClick={test}
        className="px-4 py-2 bg-[var(--moss)] text-[var(--bg)] rounded-lg text-sm font-semibold hover:opacity-90"
      >
        Test
      </button>
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">{error}</div>
      )}
      {matches.length > 0 && (
        <div className="bg-[var(--bg-deep)] border border-[var(--border)] rounded-lg p-4">
          <p className="text-xs text-[var(--moss)] font-[family-name:var(--font-mono)] mb-2">
            MATCHES ({matches.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {matches.map((m, i) => (
              <span key={i} className="px-2 py-1 bg-[var(--moss)]/20 text-[var(--moss)] rounded font-[family-name:var(--font-mono)] text-sm">
                &quot;{m}&quot;
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const toolComponents: Record<ToolId, React.FC> = {
  json: JSONTool,
  markdown: MarkdownTool,
  color: ColorTool,
  regex: RegexTool,
};

export function Tools() {
  const [active, setActive] = useState<ToolId>("json");
  const ActiveTool = toolComponents[active];

  return (
    <section id="tools" className="py-24 border-t border-[var(--border)] bg-[var(--bg-deep)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--moss)] tracking-widest uppercase mb-4">
            Interactive Tools
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-2">
            Multi <span className="text-[var(--rosy)]">Tools</span>
          </h2>
          <p className="text-[var(--text-muted)] text-sm">
            Tools gratis yang gw bikin — langsung pake di browser, no signup.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActive(tool.id)}
              className={`text-left p-5 rounded-xl border transition-all ${
                active === tool.id
                  ? "bg-[var(--bg-card)] border-[var(--moss)] shadow-lg shadow-[var(--moss)]/10"
                  : "bg-[var(--bg)] border-[var(--border)] hover:border-[var(--text-muted)]"
              }`}
            >
              <span className="text-2xl block mb-2">{tool.icon}</span>
              <h4 className="font-semibold text-sm mb-1">{tool.name}</h4>
              <p className="text-xs text-[var(--text-muted)]">{tool.desc}</p>
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
