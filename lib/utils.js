import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function postJSON(url, { arg }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  return res.json();
}

export function summarizeGitlab(data) {
  const fileLines = data.changedFiles
    .slice(0, 30)
    .map((f) => `- [${f.status}] ${f.path}`);
  return [
    `Branch: ${data.branch} (base: ${data.baseBranch})`,
    ``,
    `Changed Files (${data.changedFiles.length}):`,
    ...(fileLines.length ? fileLines : ["- (none)"]),
    ``,
  ].join("\n");
}
