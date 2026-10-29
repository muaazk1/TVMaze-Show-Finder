export const NA = "Not available";
const API = "https://api.tvmaze.com";
export const searchUrl = (query) => `${API}/search/shows?q=${encodeURIComponent(query)}`;
export const showUrl = (id) => `${API}/shows/${encodeURIComponent(id)}`;
export const castUrl = (id) => `${API}/shows/${encodeURIComponent(id)}/cast`;

const cache = new Map();

export async function fetchJson(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const res = await fetch(url);
  if (res.status === 429) throw new Error("Too many requests. Please wait a few seconds and try again.");
  if (res.status === 404) throw new Error("Not found.");
  if (!res.ok) throw new Error(`Request failed with status ${res.status}.`);

  const data = await res.json();

  cache.set(url, data);

  return data;
}

export function stripHtml(html) {
  if (!html) return NA;
  const text = new DOMParser().parseFromString(html, "text/html").body.textContent.trim();
  return text || NA;
}

export function truncate(text, max = 200) {
  if (!text || text === NA || text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

export function formatDate(dateStr) {
  if (!dateStr) return NA;
  const date = new Date(`${dateStr}T00:00:00`);
  return Number.isNaN(date.getTime()) ? NA : date.toLocaleDateString(undefined, { dateStyle: "medium" });
}

export function formatDateTime(unixSeconds) {
  if (!unixSeconds) return NA;
  return new Date(unixSeconds * 1000).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export const formatGenres = (genres) => (genres && genres.length ? genres.join(", ") : NA);
export const formatRating = (rating) => (rating?.average ? `${rating.average} / 10` : NA);
export const getNetwork = (show) => show.network?.name || show.webChannel?.name || NA;