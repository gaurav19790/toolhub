"use client";

import Link from "next/link";
import QRCode from "qrcode";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { tools as allTools } from "@/lib/tools";
import type { Tool } from "@/lib/tools";

type Props = {
  tool: Tool;
};

type FieldType = "textarea" | "text" | "number" | "date" | "color";

type ToolUi = {
  primaryLabel: string;
  secondaryLabel: string;
  primaryType: FieldType;
  secondaryType: FieldType;
  action: string;
  resultTitle: string;
  helper: string;
  layoutName: string;
};

type ToolResult = {
  text: string;
  qrImage?: string;
  swatches?: string[];
  cards?: Array<{ label: string; value: string }>;
};

function titleCase(value: string) {
  return value.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function unescapeHtml(value: string) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&");
}

function tryDecodeBase64(value: string) {
  try {
    return decodeURIComponent(escape(atob(value.trim())));
  } catch {
    return "Invalid Base64 input.";
  }
}

function clamp(value: number, min = 0, max = 255) {
  return Math.min(max, Math.max(min, value));
}

function componentToHex(value: number) {
  return clamp(Math.round(value)).toString(16).padStart(2, "0");
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function parseColor(value: string) {
  const clean = value.trim();
  const hex = clean.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);

  if (hex) {
    const raw =
      hex[1].length === 3
        ? hex[1].split("").map((char) => char + char).join("")
        : hex[1];

    return {
      r: parseInt(raw.slice(0, 2), 16),
      g: parseInt(raw.slice(2, 4), 16),
      b: parseInt(raw.slice(4, 6), 16),
    };
  }

  const rgb = clean.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgb) {
    return {
      r: clamp(Number(rgb[1])),
      g: clamp(Number(rgb[2])),
      b: clamp(Number(rgb[3])),
    };
  }

  const parts = clean
    .split(/[,\s]+/)
    .map(Number)
    .filter((item) => !Number.isNaN(item));

  if (parts.length >= 3) {
    return { r: clamp(parts[0]), g: clamp(parts[1]), b: clamp(parts[2]) };
  }

  return null;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    if (max === r) h = (g - b) / delta + (g < b ? 6 : 0);
    if (max === g) h = (b - r) / delta + 2;
    if (max === b) h = (r - g) / delta + 4;
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;

  if (delta !== 0) {
    if (max === r) h = 60 * (((g - b) / delta) % 6);
    if (max === g) h = 60 * ((b - r) / delta + 2);
    if (max === b) h = 60 * ((r - g) / delta + 4);
  }

  if (h < 0) h += 360;

  return {
    h: Math.round(h),
    s: Math.round((max === 0 ? 0 : delta / max) * 100),
    v: Math.round(max * 100),
  };
}

function mixWith(colorValue: number, target: number, amount: number) {
  return Math.round(colorValue + (target - colorValue) * amount);
}

function makePalette(value: string) {
  const color = parseColor(value);
  if (!color) return [];

  return [
    ["50", 0.9],
    ["100", 0.75],
    ["200", 0.55],
    ["300", 0.35],
    ["400", 0.18],
    ["500", 0],
    ["600", -0.12],
    ["700", -0.25],
    ["800", -0.4],
    ["900", -0.55],
  ].map(([name, amount]) => {
    const numeric = Number(amount);
    const target = numeric >= 0 ? 255 : 0;
    const strength = Math.abs(numeric);
    return `${name}: ${rgbToHex(
      mixWith(color.r, target, strength),
      mixWith(color.g, target, strength),
      mixWith(color.b, target, strength)
    )}`;
  });
}

function analyzeText(value: string) {
  const words = value.trim().match(/\b[\w'-]+\b/g) || [];
  const sentences = value.split(/[.!?]+/).filter((item) => item.trim()).length;
  const paragraphs = value.split(/\n\s*\n/).filter((item) => item.trim()).length;
  const minutes = Math.max(1, Math.ceil(words.length / 220));
  const charactersNoSpaces = value.replace(/\s/g, "").length;

  return {
    text: `Words: ${words.length}
Characters: ${value.length}
Characters without spaces: ${charactersNoSpaces}
Sentences: ${sentences}
Paragraphs: ${paragraphs}
Estimated read time: ${minutes} minute${minutes === 1 ? "" : "s"}`,
    cards: [
      { label: "Words", value: String(words.length) },
      { label: "Characters", value: String(value.length) },
      { label: "Sentences", value: String(sentences) },
      { label: "Read Time", value: `${minutes} min` },
    ],
  };
}

function topWords(value: string) {
  const words = value.toLowerCase().match(/\b[a-z0-9]{3,}\b/g) || [];
  const counts = new Map<string, number>();
  for (const word of words) counts.set(word, (counts.get(word) || 0) + 1);

  const rows = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  return {
    text:
      rows
        .map(
          ([word, count]) =>
            `${word}: ${count} (${((count / Math.max(words.length, 1)) * 100).toFixed(1)}%)`
        )
        .join("\n") || "No keywords found yet.",
    cards: rows.slice(0, 4).map(([word, count]) => ({
      label: word,
      value: `${count} hits`,
    })),
  };
}

function convertCsvToJson(value: string) {
  const rows = value
    .split(/\r?\n/)
    .filter(Boolean)
    .map((row) => row.split(",").map((cell) => cell.trim()));
  const [headers, ...items] = rows;

  if (!headers?.length || !items.length) {
    return "Add a header row and at least one data row.";
  }

  return JSON.stringify(
    items.map((row) =>
      Object.fromEntries(headers.map((header, index) => [header, row[index] || ""]))
    ),
    null,
    2
  );
}

function convertJsonToCsv(value: string) {
  try {
    const rows = JSON.parse(value);
    if (!Array.isArray(rows) || rows.length === 0 || typeof rows[0] !== "object") {
      return "Paste a JSON array of objects.";
    }

    const headers = Array.from(
      new Set(rows.flatMap((row: Record<string, unknown>) => Object.keys(row)))
    );
    const lines = rows.map((row: Record<string, unknown>) =>
      headers.map((header) => JSON.stringify(row[header] ?? "")).join(",")
    );

    return [headers.join(","), ...lines].join("\n");
  } catch {
    return "Invalid JSON array.";
  }
}

function markdownPreview(value: string) {
  return value
    .replace(/^### (.*)$/gm, "Heading 3: $1")
    .replace(/^## (.*)$/gm, "Heading 2: $1")
    .replace(/^# (.*)$/gm, "Heading 1: $1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "- ")
    .trim();
}

function initialValues(tool: Tool) {
  switch (tool.slug) {
    case "password-generator":
      return ["16", "Use symbols"];
    case "percentage-calculator":
      return ["250", "18"];
    case "bmi-calculator":
      return ["70", "175"];
    case "loan-calculator":
      return ["100000", "9,5"];
    case "tip-calculator":
      return ["1000", "10,2"];
    case "random-number-generator":
      return ["1", "100"];
    case "date-difference-calculator":
      return ["2026-01-01", "2026-06-30"];
    case "age-calculator":
      return ["1995-01-01", ""];
    case "timestamp-converter":
      return ["1719792000", ""];
    case "aspect-ratio-calculator":
      return ["1920", "16:9"];
    case "unit-converter":
      return ["10", "m"];
    case "file-size-converter":
      return ["1048576", "bytes"];
    case "currency-format-helper":
      return ["123456.7", "USD"];
    case "color-converter":
    case "color-palette-generator":
      return ["#6366f1", ""];
    case "csv-to-json":
      return ["name,age\nAsha,29\nGaurav,31", ""];
    case "json-to-csv":
      return ['[{"name":"Asha","age":29},{"name":"Gaurav","age":31}]', ""];
    case "utm-builder":
      return ["example.com/pricing", "newsletter,email,summer-campaign"];
    case "robots-txt-generator":
      return ["example.com", ""];
    default:
      return [tool.example, ""];
  }
}

function getUi(tool: Tool): ToolUi {
  const base: ToolUi = {
    primaryLabel: "Input",
    secondaryLabel: "Optional value",
    primaryType: "textarea",
    secondaryType: "text",
    action: "Run Tool",
    resultTitle: "Result",
    helper: "Paste your content, run the tool, then copy the result.",
    layoutName: `${tool.category} workstation`,
  };

  const config: Partial<Record<string, Partial<ToolUi>>> = {
    "word-counter": {
      primaryLabel: "Article or text",
      secondaryLabel: "Not needed",
      action: "Analyze Text",
      resultTitle: "Text Metrics",
      helper: "Counts update after running so you can compare drafts.",
    },
    "case-converter": {
      primaryLabel: "Text to convert",
      action: "Convert Case",
      resultTitle: "Converted Cases",
    },
    "password-generator": {
      primaryLabel: "Password length",
      secondaryLabel: "Note",
      primaryType: "number",
      action: "Generate Password",
      resultTitle: "Secure Password",
      helper: "Use 14 or more characters for stronger accounts.",
    },
    "qr-code-generator": {
      primaryLabel: "URL or text payload",
      action: "Generate QR Code",
      resultTitle: "QR Code",
    },
    "color-converter": {
      primaryLabel: "HEX, RGB, or color numbers",
      primaryType: "color",
      action: "Convert Color",
      resultTitle: "Color Values",
      helper: "Use the color picker or paste values like rgb(99, 102, 241).",
    },
    "color-palette-generator": {
      primaryLabel: "Base color",
      primaryType: "color",
      action: "Generate Palette",
      resultTitle: "Palette Scale",
    },
    "percentage-calculator": {
      primaryLabel: "Base number",
      secondaryLabel: "Percentage",
      primaryType: "number",
      secondaryType: "number",
      action: "Calculate Percentage",
    },
    "bmi-calculator": {
      primaryLabel: "Weight in kg",
      secondaryLabel: "Height in cm",
      primaryType: "number",
      secondaryType: "number",
      action: "Calculate BMI",
    },
    "loan-calculator": {
      primaryLabel: "Loan amount",
      secondaryLabel: "Annual rate %, years",
      primaryType: "number",
      secondaryType: "text",
      action: "Calculate Payment",
      helper: "Enter the loan amount, then rate and years like 9,5 for 9% over 5 years.",
    },
    "tip-calculator": {
      primaryLabel: "Bill amount",
      secondaryLabel: "Tip percent, people",
      primaryType: "number",
      secondaryType: "text",
      action: "Calculate Tip",
      helper: "Use the second field like 10,2 for a 10% tip split between 2 people.",
    },
    "random-number-generator": {
      primaryLabel: "Minimum",
      secondaryLabel: "Maximum",
      primaryType: "number",
      secondaryType: "number",
      action: "Generate Number",
    },
    "timestamp-converter": {
      primaryLabel: "Unix timestamp",
      primaryType: "number",
      action: "Convert Timestamp",
    },
    "age-calculator": {
      primaryLabel: "Birth date",
      primaryType: "date",
      action: "Calculate Age",
    },
    "date-difference-calculator": {
      primaryLabel: "Start date",
      secondaryLabel: "End date",
      primaryType: "date",
      secondaryType: "date",
      action: "Calculate Days",
    },
    "aspect-ratio-calculator": {
      primaryLabel: "Width",
      secondaryLabel: "Ratio, for example 16:9",
      primaryType: "number",
      secondaryType: "text",
      action: "Calculate Size",
    },
    "unit-converter": {
      primaryLabel: "Value",
      secondaryLabel: "Source unit: m, km, mi, ft, in",
      primaryType: "number",
      secondaryType: "text",
      action: "Convert Units",
    },
    "file-size-converter": {
      primaryLabel: "File size",
      secondaryLabel: "Source unit: bytes, KB, MB, GB",
      primaryType: "number",
      secondaryType: "text",
      action: "Convert File Size",
    },
    "currency-format-helper": {
      primaryLabel: "Amount",
      secondaryLabel: "Currency code",
      primaryType: "number",
      secondaryType: "text",
      action: "Format Currency",
    },
    "base64-encoder": {
      primaryLabel: "Plain text",
      action: "Encode Base64",
      resultTitle: "Base64 Output",
    },
    "base64-decoder": {
      primaryLabel: "Base64 text",
      action: "Decode Base64",
      resultTitle: "Decoded Text",
    },
    "url-encoder": {
      primaryLabel: "Text or URL part",
      action: "Encode URL",
      resultTitle: "Encoded URL Text",
    },
    "url-decoder": {
      primaryLabel: "Encoded URL text",
      action: "Decode URL",
      resultTitle: "Decoded URL Text",
    },
    "csv-to-json": {
      primaryLabel: "CSV with header row",
      action: "Convert CSV to JSON",
      resultTitle: "JSON Output",
    },
    "json-to-csv": {
      primaryLabel: "JSON array of objects",
      action: "Convert JSON to CSV",
      resultTitle: "CSV Output",
    },
    "utm-builder": {
      primaryLabel: "Destination URL",
      secondaryLabel: "Source, medium, campaign",
      action: "Build UTM URL",
      helper: "Use the second field like newsletter,email,summer-sale.",
    },
    "robots-txt-generator": {
      primaryLabel: "Domain",
      action: "Generate Robots.txt",
      resultTitle: "Robots.txt",
    },
  };

  const slugConfig = config[tool.slug] || {};

  if (tool.kind === "encoding") {
    slugConfig.layoutName ||= "Encoder deck";
    slugConfig.helper ||= "Conversion tools keep the input and output side by side.";
  }
  if (tool.kind === "finance" || tool.kind === "number" || tool.kind === "time") {
    slugConfig.layoutName ||= "Calculator panel";
  }
  if (tool.kind === "list") {
    slugConfig.layoutName ||= "Data cleanup board";
  }
  if (tool.kind === "seo") {
    slugConfig.layoutName ||= "SEO analysis desk";
  }

  return { ...base, ...slugConfig };
}

function buildResult(tool: Tool, input: string, secondary: string): ToolResult {
  const value = input || tool.example;
  const number = Number.parseFloat(value) || 0;
  const secondaryNumber = Number.parseFloat(secondary) || 0;

  switch (tool.slug) {
    case "case-converter":
      return {
        text: `UPPERCASE:
${value.toUpperCase()}

lowercase:
${value.toLowerCase()}

Title Case:
${titleCase(value)}

slug-case:
${slugify(value)}`,
      };
    case "text-reverser":
      return { text: value.split("").reverse().join("") };
    case "slug-generator":
      return { text: slugify(value) };
    case "keyword-density-checker":
      return topWords(value);
    case "password-generator": {
      const length = Math.min(64, Math.max(8, number || 16));
      const includeSymbols = !secondary.toLowerCase().includes("no");
      const chars = `ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789${
        includeSymbols ? "!@#$%&*" : ""
      }`;
      const password = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      return {
        text: password,
        cards: [
          { label: "Length", value: String(length) },
          { label: "Letters", value: "Mixed" },
          { label: "Numbers", value: "Yes" },
          { label: "Symbols", value: includeSymbols ? "Yes" : "No" },
        ],
      };
    }
    case "uuid-generator": {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
              const random = Math.floor(Math.random() * 16);
              const next = char === "x" ? random : (random & 0x3) | 0x8;
              return next.toString(16);
            });
      return { text: id };
    }
    case "qr-code-generator":
      return {
        text: `QR payload:
${value}

Tip: keep QR links short and scan the generated image before printing or publishing.`,
      };
    case "base64-encoder":
      return { text: btoa(unescape(encodeURIComponent(value))) };
    case "base64-decoder":
      return { text: tryDecodeBase64(value) };
    case "url-encoder":
      return { text: encodeURIComponent(value) };
    case "url-decoder":
      try {
        return { text: decodeURIComponent(value) };
      } catch {
        return { text: "Invalid URL encoded text." };
      }
    case "html-escape":
      return { text: escapeHtml(value) };
    case "html-unescape":
      return { text: unescapeHtml(value) };
    case "color-converter": {
      const color = parseColor(value);
      if (!color) return { text: "Enter a valid HEX or RGB color." };
      const hsl = rgbToHsl(color.r, color.g, color.b);
      const hsv = rgbToHsv(color.r, color.g, color.b);
      return {
        text: `HEX: ${rgbToHex(color.r, color.g, color.b)}
RGB: rgb(${color.r}, ${color.g}, ${color.b})
HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)
HSV: hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)
CSS variable: --color-primary: ${rgbToHex(color.r, color.g, color.b)};`,
        swatches: [rgbToHex(color.r, color.g, color.b)],
        cards: [
          { label: "HEX", value: rgbToHex(color.r, color.g, color.b) },
          { label: "RGB", value: `${color.r}, ${color.g}, ${color.b}` },
          { label: "HSL", value: `${hsl.h}, ${hsl.s}%, ${hsl.l}%` },
          { label: "HSV", value: `${hsv.h}, ${hsv.s}%, ${hsv.v}%` },
        ],
      };
    }
    case "color-palette-generator": {
      const palette = makePalette(value);
      return {
        text: palette.length ? palette.join("\n") : "Enter a valid HEX or RGB color.",
        swatches: palette.map((item) => item.split(": ")[1]).filter(Boolean),
      };
    }
    case "percentage-calculator": {
      const percent = secondaryNumber || 10;
      const result = (number * percent) / 100;
      return {
        text: `${percent}% of ${number} = ${result.toFixed(2)}`,
        cards: [
          { label: "Base", value: number.toFixed(2) },
          { label: "Percent", value: `${percent}%` },
          { label: "Result", value: result.toFixed(2) },
        ],
      };
    }
    case "bmi-calculator": {
      const heightMeters = (secondaryNumber || 170) / 100;
      const bmi = number / (heightMeters * heightMeters);
      const category = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
      return {
        text: `BMI: ${bmi.toFixed(1)}
Category: ${category}`,
        cards: [
          { label: "BMI", value: bmi.toFixed(1) },
          { label: "Category", value: category },
        ],
      };
    }
    case "loan-calculator": {
      const principal = number || 100000;
      const [rateInput, yearsInput] = secondary
        .split(/[,\s]+/)
        .map((item) => Number.parseFloat(item))
        .filter((item) => !Number.isNaN(item));
      const annualRate = (rateInput || secondaryNumber || 9) / 100;
      const years = Math.max(1, yearsInput || 5);
      const months = years * 12;
      const monthlyRate = annualRate / 12;
      const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      return {
        text: `Loan amount: ${principal.toFixed(2)}
Interest rate: ${(annualRate * 100).toFixed(2)}%
Term: ${months} months
Estimated monthly payment: ${payment.toFixed(2)}
Total paid: ${(payment * months).toFixed(2)}
Estimated interest: ${(payment * months - principal).toFixed(2)}`,
        cards: [
          { label: "Monthly", value: payment.toFixed(2) },
          { label: "Total Paid", value: (payment * months).toFixed(2) },
          { label: "Interest", value: (payment * months - principal).toFixed(2) },
        ],
      };
    }
    case "tip-calculator": {
      const [tipInput, peopleInput] = secondary
        .split(/[,\s]+/)
        .map((item) => Number.parseFloat(item))
        .filter((item) => !Number.isNaN(item));
      const tipPercent = tipInput || secondaryNumber || 10;
      const people = Math.max(1, Math.round(peopleInput || 2));
      const tip = number * (tipPercent / 100);
      return {
        text: `Tip: ${tip.toFixed(2)}
Total: ${(number + tip).toFixed(2)}
Split by ${people}: ${((number + tip) / people).toFixed(2)}`,
        cards: [
          { label: "Tip", value: tip.toFixed(2) },
          { label: "Total", value: (number + tip).toFixed(2) },
          { label: "Per Person", value: ((number + tip) / people).toFixed(2) },
        ],
      };
    }
    case "currency-format-helper":
      return {
        text: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: (secondary || "USD").trim().toUpperCase(),
        }).format(number),
      };
    case "timestamp-converter":
      return { text: new Date((number || Date.now() / 1000) * 1000).toString() };
    case "age-calculator": {
      const birthday = new Date(value);
      if (Number.isNaN(birthday.getTime())) return { text: "Enter a date like 1995-01-01." };
      return { text: `${Math.floor((Date.now() - birthday.getTime()) / 31557600000)} years` };
    }
    case "date-difference-calculator": {
      const start = new Date(value);
      const end = new Date(secondary || new Date().toISOString().slice(0, 10));
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return { text: "Enter valid dates." };
      return { text: `${Math.abs(Math.round((end.getTime() - start.getTime()) / 86400000))} days` };
    }
    case "random-number-generator": {
      const first = Math.floor(number || 1);
      const second = Math.floor(secondaryNumber || 100);
      const min = Math.min(first, second);
      const max = Math.max(first, second);
      return {
        text: String(Math.floor(Math.random() * (max - min + 1)) + min),
        cards: [
          { label: "Minimum", value: String(min) },
          { label: "Maximum", value: String(max) },
        ],
      };
    }
    case "list-sorter":
      return { text: value.split(/\r?\n/).filter(Boolean).sort((a, b) => a.localeCompare(b)).join("\n") };
    case "duplicate-line-remover":
      return { text: Array.from(new Set(value.split(/\r?\n/).filter(Boolean))).join("\n") };
    case "csv-to-json":
      return { text: convertCsvToJson(value) };
    case "json-to-csv":
      return { text: convertJsonToCsv(value) };
    case "markdown-preview":
      return { text: markdownPreview(value) };
    case "read-time-calculator":
    case "word-counter":
      return analyzeText(value);
    case "invoice-number-generator":
      return {
        text: `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`,
      };
    case "utm-builder": {
      const url = value.startsWith("http") ? value : `https://${value}`;
      const separator = url.includes("?") ? "&" : "?";
      const [source = "newsletter", medium = "email", campaign = "toolhub-campaign"] =
        secondary.split(",").map((item) => item.trim()).filter(Boolean);
      return {
        text: `${url}${separator}utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(
          medium
        )}&utm_campaign=${encodeURIComponent(slugify(campaign))}`,
      };
    }
    case "robots-txt-generator":
      return {
        text: `User-agent: *
Allow: /

Sitemap: ${(value.startsWith("http") ? value : `https://${value}`).replace(/\/$/, "")}/sitemap.xml`,
      };
    case "sitemap-url-helper":
      return { text: value.split(/\r?\n/).filter(Boolean).map((url) => `<url><loc>${url.trim()}</loc></url>`).join("\n") };
    case "dns-record-notes":
      return {
        text: `Record type: TXT
Host: @
Value: ${value}
TTL: 3600
Note: Add this in your domain DNS panel, then wait for propagation.`,
      };
    case "email-template-generator":
      return {
        text: `Subject: Quick follow-up

Hi,

Thanks for reaching out about ${value}. I reviewed the details and will be happy to help.

Best,
ToolHub`,
      };
    case "text-to-speech-script":
      return { text: value.replace(/\s+/g, " ").replace(/([.!?])\s/g, "$1\n\n").trim() };
    case "file-size-converter":
      {
        const unit = secondary.trim().toLowerCase();
        const bytes =
          unit === "gb"
            ? number * 1024 * 1024 * 1024
            : unit === "mb"
              ? number * 1024 * 1024
              : unit === "kb"
                ? number * 1024
                : number;
        return {
          text: `${bytes.toFixed(0)} bytes
${(bytes / 1024).toFixed(2)} KB
${(bytes / 1024 / 1024).toFixed(2)} MB
${(bytes / 1024 / 1024 / 1024).toFixed(4)} GB`,
          cards: [
            { label: "KB", value: (bytes / 1024).toFixed(2) },
            { label: "MB", value: (bytes / 1024 / 1024).toFixed(2) },
            { label: "GB", value: (bytes / 1024 / 1024 / 1024).toFixed(4) },
          ],
        };
      }
    case "aspect-ratio-calculator": {
      const width = number || 1920;
      const ratioText = secondary.trim();
      const ratio = ratioText.includes(":")
        ? (() => {
            const [left, right] = ratioText.split(":").map(Number);
            return left && right ? left / right : 16 / 9;
          })()
        : Number.parseFloat(ratioText) || 16 / 9;
      const height = width / ratio;
      return {
        text: `Width: ${width}
Ratio: ${ratioText || "16:9"}
Height: ${height.toFixed(0)}`,
        cards: [
          { label: "Width", value: String(width) },
          { label: "Height", value: height.toFixed(0) },
          { label: "Ratio", value: ratio.toFixed(3) },
        ],
      };
    }
    case "unit-converter":
      {
        const unit = secondary.trim().toLowerCase();
        const meters =
          unit === "km"
            ? number * 1000
            : unit === "mi"
              ? number * 1609.344
              : unit === "ft"
                ? number / 3.28084
                : unit === "in"
                  ? number / 39.3701
                  : number;
        return {
          text: `${meters.toFixed(4)} meters
${(meters / 1000).toFixed(4)} kilometers
${(meters / 1609.344).toFixed(4)} miles
${(meters * 3.28084).toFixed(2)} feet
${(meters * 39.3701).toFixed(2)} inches`,
          cards: [
            { label: "Meters", value: meters.toFixed(2) },
            { label: "Kilometers", value: (meters / 1000).toFixed(4) },
            { label: "Miles", value: (meters / 1609.344).toFixed(4) },
            { label: "Feet", value: (meters * 3.28084).toFixed(2) },
          ],
        };
      }
    case "meta-title-checker":
      return {
        text: `Characters: ${value.length}
Status: ${value.length >= 35 && value.length <= 60 ? "Good SEO title length" : "Consider keeping it around 35-60 characters."}`,
      };
    case "meta-description-checker":
      return {
        text: `Characters: ${value.length}
Status: ${value.length >= 120 && value.length <= 160 ? "Good meta description length" : "Aim for roughly 120-160 characters."}`,
      };
    default:
      return analyzeText(value);
  }
}

function Field({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: FieldType;
  value: string;
  onChange: (value: string) => void;
}) {
  if (label === "Not needed") return null;

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-200">{label}</span>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-64 w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-sm text-slate-100 outline-none focus:border-pink-400"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-sm text-slate-100 outline-none focus:border-cyan-400"
        />
      )}
    </label>
  );
}

export default function GenericToolClient({ tool }: Props) {
  const ui = getUi(tool);
  const [initialInput, initialSecondary] = initialValues(tool);
  const [input, setInput] = useState(initialInput);
  const [secondary, setSecondary] = useState(initialSecondary);
  const [result, setResult] = useState<ToolResult | null>(null);
  const [copied, setCopied] = useState(false);
  const previewColor = tool.kind === "color" ? parseColor(input) : null;
  const relatedTools = allTools
    .filter((candidate) => candidate.slug !== tool.slug && candidate.category === tool.category)
    .slice(0, 4);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory:
      tool.category === "Developer" ? "DeveloperApplication" : "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const handleRun = async () => {
    const nextResult = buildResult(tool, input, secondary);

    if (tool.slug === "qr-code-generator") {
      nextResult.qrImage = await QRCode.toDataURL(input || tool.example, {
        width: 320,
        margin: 2,
        color: {
          dark: "#020617",
          light: "#ffffff",
        },
      });
    }

    setResult(nextResult);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result?.text) return;
    await navigator.clipboard.writeText(result.text);
    setCopied(true);
  };

  const reset = () => {
    const [nextInput, nextSecondary] = initialValues(tool);
    setInput(nextInput);
    setSecondary(nextSecondary);
    setResult(null);
    setCopied(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main className="relative pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(236,72,153,0.22),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(14,165,233,0.22),transparent_26%),linear-gradient(180deg,#020617,#0f172a_45%,#020617)]" />

        <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-12 lg:grid-cols-[1fr_420px]">
          <div>
            <Link href="/#tools" className="text-sm text-slate-400 hover:text-white">
              Back to tools
            </Link>
            <div className="mt-8 [perspective:1000px]">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl [transform:rotateX(4deg)_rotateY(-4deg)]">
                <div className={`mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.accent} text-xl font-black text-white shadow-xl shadow-black/30`}>
                  {tool.icon}
                </div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                  {ui.layoutName}
                </p>
                <h1 className="max-w-3xl text-4xl font-black tracking-normal md:text-6xl">
                  {tool.name}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  {tool.description}
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
            <h2 className="text-xl font-bold">How to use it</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{ui.helper}</p>
            <ol className="mt-5 space-y-4">
              {tool.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-slate-300">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tool.accent} text-xs font-black text-white`}>
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">{tool.name} Input</h2>
              <span className={`rounded-full bg-gradient-to-r ${tool.accent} px-3 py-1 text-xs font-black text-white`}>
                {tool.category}
              </span>
            </div>

            <div className="space-y-4">
              <Field label={ui.primaryLabel} type={ui.primaryType} value={input} onChange={setInput} />
              <Field label={ui.secondaryLabel} type={ui.secondaryType} value={secondary} onChange={setSecondary} />
            </div>

            {previewColor && (
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/70 p-3 text-sm text-slate-300">
                <span
                  className="h-12 w-12 rounded-xl border border-white/20"
                  style={{
                    backgroundColor: rgbToHex(previewColor.r, previewColor.g, previewColor.b),
                  }}
                />
                <span>Live color preview: {rgbToHex(previewColor.r, previewColor.g, previewColor.b)}</span>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={handleRun}
                className={`rounded-xl bg-gradient-to-r ${tool.accent} px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5`}
              >
                {ui.action}
              </button>
              <button
                onClick={reset}
                className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/15"
              >
                Reset Example
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">{ui.resultTitle}</h2>
              <button
                onClick={handleCopy}
                className={`rounded-xl bg-gradient-to-r ${tool.accent} px-4 py-2 text-sm font-bold text-white shadow-lg`}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {result?.cards && result.cards.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {result.cards.map((card) => (
                  <div key={card.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">{card.label}</p>
                    <p className="mt-2 break-words text-lg font-black text-white">{card.value}</p>
                  </div>
                ))}
              </div>
            )}

            {result?.swatches && result.swatches.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-5">
                {result.swatches.map((swatch) => (
                  <div key={swatch} className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                    <div className="h-16" style={{ backgroundColor: swatch }} />
                    <div className="p-2 text-center text-xs font-bold text-slate-200">{swatch}</div>
                  </div>
                ))}
              </div>
            )}

            <pre className="min-h-80 overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-700 bg-black/40 p-4 text-sm leading-6 text-slate-100">
              {result?.text || "Enter your values, then run the tool to generate a real result."}
            </pre>

            {result?.qrImage && (
              <div className="mt-4 rounded-2xl border border-slate-700 bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result.qrImage} alt="Generated QR code" className="mx-auto h-64 w-64" />
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          {relatedTools.length > 0 && (
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-black">Related tools</h2>
              <div className="grid gap-4 md:grid-cols-4">
                {relatedTools.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/tools/${related.slug}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition hover:-translate-y-1 hover:border-cyan-300/60"
                  >
                    <span className="text-sm font-black text-cyan-300">
                      {related.icon}
                    </span>
                    <h3 className="mt-2 font-bold">{related.name}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      {related.shortDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-3">
            {tool.features.map((feature) => (
              <div key={feature} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/20">
                <div className={`mb-4 h-2 w-16 rounded-full bg-gradient-to-r ${tool.accent}`} />
                <h3 className="text-lg font-bold">{feature}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {tool.shortDescription} Use the focused controls above to
                  generate, convert, check, or clean your input quickly.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
