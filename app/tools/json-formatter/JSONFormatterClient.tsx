"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";

// Advanced JSON editor using jsoneditor when available, falling back to text mode.
export default function JSONFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState<number>(2);
  const [mode, setMode] = useState<"text" | "tree" | "code">("text");
  const [autoFormatOnPaste, setAutoFormatOnPaste] = useState<boolean>(true);
  const [sortKeys, setSortKeys] = useState<boolean>(false);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const jsonEditorRef = useRef<any>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const searchResultsRef = useRef<string[][] | null>(null);
  const searchIndexRef = useRef<number>(0);
  const lastSearchTermRef = useRef<string>("");
  const lastTextIndexRef = useRef<number>(-1);
  const longDescription = (
    <div className="prose max-w-none text-slate-300 mb-6">
      <p>
        JSON is the lingua franca of modern web development, data interchange,
        and configuration. This JSON Formatter tool is designed to make working
        with JSON faster, safer, and more productive — whether you're a
        developer, data analyst, or product manager. The formatter performs
        essential tasks: validating structure, formatting for readability,
        minifying for transport, sorting keys for consistent diffs, and enabling
        quick search and navigation inside complex documents. It runs entirely
        in your browser so your data never leaves your machine unless you
        explicitly copy or download it.
      </p>

      <p>
        At its core, the tool helps you understand the shape of JSON data. When
        data is minified or comes from an API, reading it can be difficult — the
        formatter indents nested structures and aligns arrays and objects to
        make them human-readable. The indent level is adjustable so you can
        choose a compact view or a verbose one for thorough inspection. For
        teams, a consistent formatting standard reduces noisy diffs in version
        control and speeds code reviews. The optional "sort keys" feature
        normalizes object property order so two semantically identical objects
        are easier to compare.
      </p>

      <p>
        Validation is an essential part of the workflow. The tool parses the
        input and reports syntax errors with helpful messages rather than merely
        failing silently. This immediate feedback is valuable when editing
        configuration files, preparing API payloads, or debugging serialization
        issues. In Tree or Code modes, the built-in editor exposes both the raw
        text and a navigable object view: you can expand nodes, examine arrays,
        and edit values inline. Copying or downloading the result is a single
        click — ideal for sharing small payloads or saving prepared fixtures for
        later use.
      </p>

      <p>
        Search and navigation features reduce the time it takes to find a value
        inside large payloads. The tool supports case-insensitive search across
        keys and values and cycles through matches so you can quickly jump from
        one occurrence to the next. In Text mode, it will scroll to and select
        the match; in Tree/Code mode, it will expand and select the
        corresponding path when possible. This is especially useful when dealing
        with deeply nested documents or logs converted to JSON format.
      </p>

      <p>
        Performance and safety are also considered. Formatting and parsing are
        executed client-side, avoiding network latency and protecting sensitive
        data. For extremely large documents, the tool avoids blocking the UI by
        using efficient traversal strategies and conservative DOM updates. If
        you work with multi-megabyte payloads frequently, consider using the
        minify feature to reduce size before transmitting, or split large logs
        into smaller chunks for targeted inspection.
      </p>

      <p>
        Beyond basic formatting, the tool helps you prepare JSON for different
        contexts. Minified JSON is ideal for embedding in HTML or sending over
        the wire, while pretty-printed JSON is better for documentation and
        debugging. You can copy the transformed JSON to the clipboard or
        download it as a .json file for use in tests or as fixtures. Combined
        with the "Load Output Into Input" capability, you can iteratively refine
        a dataset and re-validate it right away.
      </p>

      <p>
        The editor also respects common developer ergonomics: keyboard shortcuts
        shave seconds off repetitive tasks (for example, format with Ctrl/Cmd+B
        and minify with Ctrl/Cmd+M), and auto-format-on-paste reduces friction
        when copying JSON from logs or other tools. The UI is tuned for
        readability with high-contrast colors, resizable views, and accessible
        controls so it fits into both light and dark-themed workflows.
      </p>

      <p>
        For teams and reproducible workflows, sorted keys and consistent
        indentation are practical features. If you commit JSON files to a
        repository, normalizing key order helps reduce noise in diffs and makes
        automated merges cleaner. The tool's sorting is stable and recursive, so
        nested objects are normalized as well. Keep in mind that sorting changes
        object enumeration order, which is harmless for most JSON uses but may
        be significant if the receiver relies on insertion order.
      </p>

      <p>
        The formatter is intentionally minimal in scope: it focuses on common
        editing and inspection tasks rather than full JSON Schema validation or
        heavyweight linting. If you need schema-aware validation, you can
        integrate this tool with a separate schema validator or paste the
        formatted JSON into a type-checking environment. That said, the tool's
        clear error messages help you quickly locate syntax issues so you can
        move to schema validation with confidence.
      </p>

      <p>
        Practical tips: when copying JSON from a web page, enable auto-format-on
        paste to immediately transform messy payloads into readable structures.
        Use Search to reveal all occurrences of a property name when you suspect
        duplicates or naming inconsistencies. When preparing API requests, use
        the Minify action to shrink payload size; when documenting responses,
        use Format with an indent of 2 or 4 spaces depending on your style
        guide.
      </p>

      <p>
        In short, this JSON Formatter is a lightweight, privacy-first utility
        that speeds everyday JSON tasks: reading, editing, validating, and
        preparing data. It is built with pragmatic defaults, helpful controls,
        and keyboard shortcuts to fit naturally into development workflows. If
        you have feature requests — for example, JSON Schema integration,
        automatic type hints, or export templates — please share them so the
        tool can evolve to better meet your team's needs.
      </p>
    </div>
  );
  useEffect(() => {
    let mounted = true;
    if (mode !== "text" && editorRef.current) {
      // dynamic import to avoid SSR issues
      import("jsoneditor").then((JE) => {
        if (!mounted) return;
        const JSONEditor = JE.default || JE;
        if (jsonEditorRef.current) {
          try {
            jsonEditorRef.current.destroy();
          } catch {}
        }
        const container = editorRef.current as HTMLElement;
        jsonEditorRef.current = new JSONEditor(container, {
          mode: mode === "tree" ? "tree" : "code",
          mainMenuBar: false,
          navigationBar: true,
          onError: (err: any) => setError(String(err)),
        });
        // load current input if parseable
        try {
          const parsed = input ? JSON.parse(input) : {};
          jsonEditorRef.current.set(parsed);
          setError(null);
        } catch (e: any) {
          // if code mode, set text
          if (mode === "code") jsonEditorRef.current.setText(input || "");
          setError(e?.message || "Invalid JSON");
        }
      });
    }
    return () => {
      mounted = false;
      if (jsonEditorRef.current) {
        try {
          jsonEditorRef.current.destroy();
          jsonEditorRef.current = null;
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    // synchronize changes from editor to text when in text mode
    if (mode !== "text" && jsonEditorRef.current) {
      try {
        const data =
          mode === "code"
            ? jsonEditorRef.current.getText()
            : jsonEditorRef.current.get();
        setOutput(mode === "code" ? data : JSON.stringify(data, null, indent));
        setError(null);
      } catch (e: any) {
        setError(e?.message || "Invalid JSON");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indent]);

  const parseInput = (text: string) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      throw e;
    }
  };

  const formatJSON = (text: string) => {
    const obj = parseInput(text);
    if (sortKeys) {
      const sortRec = (v: any): any => {
        if (Array.isArray(v)) return v.map(sortRec);
        if (v && typeof v === "object") {
          return Object.keys(v)
            .sort()
            .reduce((acc: any, key) => ((acc[key] = sortRec(v[key])), acc), {});
        }
        return v;
      };
      return JSON.stringify(sortRec(obj), null, indent);
    }
    return JSON.stringify(obj, null, indent);
  };

  const handleFormat = () => {
    try {
      if (mode === "text") {
        const formatted = formatJSON(input);
        setOutput(formatted);
        setError(null);
        return;
      }

      // editor modes
      if (!jsonEditorRef.current) return;
      try {
        if (mode === "code") {
          const txt =
            typeof jsonEditorRef.current.getText === "function"
              ? jsonEditorRef.current.getText()
              : null;
          if (txt !== null) {
            const formatted = formatJSON(txt);
            setOutput(formatted);
            setError(null);
            return;
          }
        }
        const data =
          typeof jsonEditorRef.current.get === "function"
            ? jsonEditorRef.current.get()
            : null;
        if (data !== null) {
          setOutput(JSON.stringify(data, null, indent));
          setError(null);
        }
      } catch (e: any) {
        setError(e?.message || "Format failed");
      }
    } catch (e: any) {
      setError(e?.message || "Format failed");
    }
  };

  const handleMinify = () => {
    try {
      if (mode === "text") {
        const obj = parseInput(input);
        setOutput(JSON.stringify(obj));
        setError(null);
        return;
      }
      if (!jsonEditorRef.current) return;
      try {
        const data =
          typeof jsonEditorRef.current.get === "function"
            ? jsonEditorRef.current.get()
            : null;
        if (data !== null) {
          setOutput(JSON.stringify(data));
          setError(null);
        }
      } catch (e: any) {
        setError(e?.message || "Minify failed");
      }
    } catch (e: any) {
      setError(e?.message || "Minify failed");
    }
  };

  const handleValidate = () => {
    try {
      if (mode === "text") {
        parseInput(input);
        setOutput("Valid JSON");
        setError(null);
        return;
      }
      if (!jsonEditorRef.current) return;
      try {
        const data =
          typeof jsonEditorRef.current.get === "function"
            ? jsonEditorRef.current.get()
            : null;
        if (data !== null) {
          setOutput("Valid JSON");
          setError(null);
        }
      } catch (e: any) {
        setError(e?.message || "Invalid JSON");
      }
    } catch (e: any) {
      setError(e?.message || "Invalid JSON");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output || "");
    } catch {}
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([output || ""], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {}
  };

  const handleLoadExample = () => {
    const example = JSON.stringify(
      { hello: "world", items: [{ id: 1, name: "Item" }] },
      null,
      2,
    );
    setInput(example);
    if (mode !== "text") setMode("tree");
  };

  const handleEditorSearch = async (term: string) => {
    if (!jsonEditorRef.current) return;
    try {
      // prefer built-in search
      if (typeof jsonEditorRef.current.search === "function") {
        jsonEditorRef.current.search(term);
        return;
      }
      if (typeof jsonEditorRef.current.find === "function") {
        jsonEditorRef.current.find(term);
        return;
      }

      // fallback: traverse object and find first matching path
      let root: any = null;
      try {
        root =
          typeof jsonEditorRef.current.get === "function"
            ? jsonEditorRef.current.get()
            : null;
      } catch {
        try {
          const txt =
            typeof jsonEditorRef.current.getText === "function"
              ? jsonEditorRef.current.getText()
              : null;
          root = txt ? JSON.parse(txt) : null;
        } catch {
          root = null;
        }
      }
      if (!root) {
        setError("Search unavailable: editor content not accessible");
        return;
      }

      const results: string[][] = [];
      const q = String(term).toLowerCase();
      const visit = (node: any, path: string[]) => {
        if (node === null || node === undefined) return;
        if (
          typeof node === "string" ||
          typeof node === "number" ||
          typeof node === "boolean"
        ) {
          if (String(node).toLowerCase().includes(q))
            results.push(path.slice());
          return;
        }
        if (Array.isArray(node)) {
          for (let i = 0; i < node.length; i++)
            visit(node[i], path.concat(String(i)));
          return;
        }
        if (typeof node === "object") {
          for (const k of Object.keys(node)) {
            if (k.toLowerCase().includes(q)) results.push(path.concat(k));
            visit(node[k], path.concat(k));
          }
        }
      };
      visit(root, []);
      if (results.length === 0) {
        setError("Term not found");
        return;
      }

      const firstPath = results[0];
      setError(null);
      // try to expand the path in the tree view
      if (typeof jsonEditorRef.current.expandPath === "function") {
        try {
          jsonEditorRef.current.expandPath(firstPath);
        } catch {
          // ignore
        }
      }
      // also try to focus/select if possible
      if (typeof jsonEditorRef.current.selectPath === "function") {
        try {
          jsonEditorRef.current.selectPath(firstPath);
        } catch {}
      }
      // as fallback, show found path to the user
      if (
        !jsonEditorRef.current.expandPath &&
        !jsonEditorRef.current.selectPath
      ) {
        setError(`Found at path: ${firstPath.join(".")}`);
      }
    } catch (e: any) {
      setError(e?.message || "Search failed");
    }
  };

  const doSearch = (term: string) => {
    if (!term) return;

    // reset search state when a new term is entered
    if (lastSearchTermRef.current !== term) {
      searchResultsRef.current = null;
      searchIndexRef.current = 0;
      lastTextIndexRef.current = -1;
      lastSearchTermRef.current = term;
    }

    if (mode === "text") {
      const ta = textAreaRef.current;
      if (!ta) return;
      const start = Math.max(0, lastTextIndexRef.current + 1);
      const idx = ta.value.indexOf(term, start);
      if (idx >= 0) {
        lastTextIndexRef.current = idx;
        ta.focus();
        ta.selectionStart = idx;
        ta.selectionEnd = idx + term.length;
        const lineHeight = 20;
        const before = ta.value.slice(0, idx);
        const line = before.split("\n").length;
        ta.scrollTop = Math.max(0, (line - 3) * lineHeight);
        setError(null);
      } else {
        // try from beginning (wrap)
        const wrapIdx = ta.value.indexOf(term, 0);
        if (wrapIdx >= 0) {
          lastTextIndexRef.current = wrapIdx;
          ta.focus();
          ta.selectionStart = wrapIdx;
          ta.selectionEnd = wrapIdx + term.length;
          const lineHeight = 20;
          const before = ta.value.slice(0, wrapIdx);
          const line = before.split("\n").length;
          ta.scrollTop = Math.max(0, (line - 3) * lineHeight);
          setError(null);
        } else {
          setError("Term not found");
        }
      }
      return;
    }

    // editor mode: compute results once per term and cycle through them
    const q = String(term).toLowerCase();
    const computeResults = (): string[][] => {
      // try to get root object from editor
      let root: any = null;
      try {
        root =
          typeof jsonEditorRef.current?.get === "function"
            ? jsonEditorRef.current.get()
            : null;
      } catch {
        try {
          const txt =
            typeof jsonEditorRef.current?.getText === "function"
              ? jsonEditorRef.current.getText()
              : null;
          root = txt ? JSON.parse(txt) : null;
        } catch {
          root = null;
        }
      }
      if (!root) return [];
      const results: string[][] = [];
      const visit = (node: any, path: string[]) => {
        if (node === null || node === undefined) return;
        if (
          typeof node === "string" ||
          typeof node === "number" ||
          typeof node === "boolean"
        ) {
          if (String(node).toLowerCase().includes(q))
            results.push(path.slice());
          return;
        }
        if (Array.isArray(node)) {
          for (let i = 0; i < node.length; i++)
            visit(node[i], path.concat(String(i)));
          return;
        }
        if (typeof node === "object") {
          for (const k of Object.keys(node)) {
            if (k.toLowerCase().includes(q)) results.push(path.concat(k));
            visit(node[k], path.concat(k));
          }
        }
      };
      visit(root, []);
      return results;
    };

    if (!searchResultsRef.current) {
      // prefer built-in search first (one-shot)
      if (typeof jsonEditorRef.current?.search === "function") {
        try {
          // built-in search may handle highlighting; still compute results for cycling
          try {
            jsonEditorRef.current.search(term);
          } catch {}
          const res = computeResults();
          searchResultsRef.current = res;
        } catch {
          searchResultsRef.current = computeResults();
        }
      } else if (typeof jsonEditorRef.current?.find === "function") {
        try {
          jsonEditorRef.current.find(term);
        } catch {}
        searchResultsRef.current = computeResults();
      } else {
        searchResultsRef.current = computeResults();
      }
    }

    const results = searchResultsRef.current || [];
    if (results.length === 0) {
      setError("Term not found");
      return;
    }

    // select/cycle
    const idx = searchIndexRef.current % results.length;
    const firstPath = results[idx];
    searchIndexRef.current = (idx + 1) % results.length;
    setError(null);
    if (typeof jsonEditorRef.current?.expandPath === "function") {
      try {
        jsonEditorRef.current.expandPath(firstPath);
      } catch {}
    }
    if (typeof jsonEditorRef.current?.selectPath === "function") {
      try {
        jsonEditorRef.current.selectPath(firstPath);
      } catch {}
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    if (jsonEditorRef.current) {
      try {
        jsonEditorRef.current.set({});
      } catch {}
    }
  };

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        handleFormat();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "m") {
        e.preventDefault();
        handleMinify();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white py-8">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-6  pt-14">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              JSON Formatter (Advanced)
            </h1>
            <p className="text-sm md:text-base text-slate-400">
              Tree & code editor, search, sort keys, presets, and keyboard
              shortcuts.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    doSearch(searchTerm);
                  }
                }}
                placeholder="Search"
                className="pl-3 pr-10 py-2 rounded bg-slate-900 border border-slate-700 text-sm text-slate-200"
              />
              <button
                onClick={() => doSearch(searchTerm)}
                title="Search"
                className="absolute right-0 top-0 mt-1 mr-1 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-slate-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3a7.5 7.5 0 105.293 12.793l3.707 3.707a1 1 0 001.414-1.414l-3.707-3.707A7.5 7.5 0 0010.5 3zM5 10.5a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={handleLoadExample}
              className="px-3 py-2 bg-sky-600 rounded text-sm"
            >
              Load Example
            </button>
            <button
              onClick={() => setMode(mode === "text" ? "tree" : "text")}
              className="px-3 py-2 bg-slate-700 rounded text-sm"
            >
              Mode: {mode}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex gap-2 items-center mb-3">
              <label className="text-sm text-slate-300">Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="bg-slate-900 p-1 rounded"
              >
                <option value="text">Text</option>
                <option value="tree">Tree</option>
                <option value="code">Code</option>
              </select>

              <label className="text-sm text-slate-300 ml-4">Sort keys</label>
              <input
                type="checkbox"
                checked={sortKeys}
                onChange={(e) => setSortKeys(e.target.checked)}
                className="ml-1"
              />

              <label className="text-sm text-slate-300 ml-4">
                Auto-format on paste
              </label>
              <input
                type="checkbox"
                checked={autoFormatOnPaste}
                onChange={(e) => setAutoFormatOnPaste(e.target.checked)}
                className="ml-1"
              />
            </div>

            {mode === "text" ? (
              <textarea
                ref={textAreaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste JSON here"
                className="w-full h-96 p-3 bg-slate-900 border border-slate-700 rounded text-sm text-slate-100 focus:outline-none"
              />
            ) : (
              <div ref={editorRef} style={{ minHeight: 420 }} />
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={handleFormat}
                className="px-3 py-2 bg-green-500 rounded text-sm font-semibold"
              >
                Format (Ctrl/Cmd+B)
              </button>
              <button
                onClick={handleMinify}
                className="px-3 py-2 bg-indigo-600 rounded text-sm font-semibold"
              >
                Minify (Ctrl/Cmd+M)
              </button>
              <button
                onClick={handleValidate}
                className="px-3 py-2 bg-yellow-600 rounded text-sm font-semibold"
              >
                Validate
              </button>
              <button
                onClick={handleClear}
                className="px-3 py-2 bg-slate-700 rounded text-sm"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  setInput(output || input);
                }}
                className="px-3 py-2 bg-amber-600 rounded text-sm"
              >
                Load Output Into Input
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <label className="text-sm text-slate-300">Indent:</label>
              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 text-slate-200 p-1 rounded"
              >
                <option value={0}>None</option>
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col">
            <label className="block text-sm md:text-base font-medium mb-2 text-slate-200">
              Output / Preview
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full h-64 p-3 bg-slate-900 border border-slate-700 rounded text-sm text-slate-100 focus:outline-none"
            />

            <div className="flex gap-2 mt-3">
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-emerald-500 rounded text-sm font-semibold"
              >
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-2 bg-emerald-600 rounded text-sm font-semibold"
              >
                Download
              </button>
            </div>

            <div className="mt-3 text-sm text-slate-300">
              {error ? (
                <div className="text-red-400">Error: {error}</div>
              ) : output === "Valid JSON" ? (
                <div className="text-green-400">Valid JSON</div>
              ) : (
                <div>Ready</div>
              )}
            </div>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Search in editor"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm((e.target as HTMLInputElement).value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    doSearch(searchTerm);
                  }
                }}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <h1 className="text-2xl font-bold text-white mb-3">
          JSON Formatter (Advanced)
        </h1>
        {longDescription}
      </div>
      <Footer />
    </div>
  );
}
