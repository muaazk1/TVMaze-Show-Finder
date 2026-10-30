/* 
  Name: Mu'aaz Khan
  Date: 10.29.2026
  CSC 372-01

    This is the utils.js page for assignment 5. It contains utility functions for fetching data from the TVmaze API, formatting data, and handling errors.
*/

export const NA = "Not available";
const API = "https://api.tvmaze.com";
export const searchUrl = (query) => `${API}/search/shows?q=${encodeURIComponent(query)}`;
export const showUrl = (id) => `${API}/shows/${encodeURIComponent(id)}`;
export const castUrl = (id) => `${API}/shows/${encodeURIComponent(id)}/cast`;

const cache = new Map();

/**
 * Fetches JSON data from the given URL and caches the result.
 * @param {string} url - The URL to fetch data from.    
 * @returns {Promise<any>} - A promise that resolves to the fetched JSON data.
 * @throws {Error} - Throws an error if the request fails, not found, or if the response status is not OK.
 */
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

/**
 * Strips HTML tags from the given string and returns the plain text.
 * @param {string} html - The HTML string to strip.
 * @returns {string} - The plain text without HTML tags, or "Not available" if the input is empty or null.
 */
export function stripHtml(html) {
  if (!html) return NA;
  const text = new DOMParser().parseFromString(html, "text/html").body.textContent.trim();
  return text || NA;
}

/** * Truncates the given text to the specified maximum length and adds an ellipsis to the end if necessary.
 * @param {string} text - The text to truncate.
 * @param {number} [max=200] - The maximum length of the truncated text.
 * @returns {string} - The truncated text with an ellipsis, or the original text if it is shorter than the maximum length.
 */
export function truncate(text, max = 200) {
  if (!text || text === NA || text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

/** * Formats a date string in the format "YYYY-MM-DD" to a more readable format.
 * @param {string} dateStr - The date string to format.
 * @returns {string} - The formatted date string, or "Not available" if the input is empty or invalid.
 */
export function formatDate(dateStr) {
  if (!dateStr) return NA;
  const date = new Date(`${dateStr}T00:00:00`);
  return Number.isNaN(date.getTime()) ? NA : date.toLocaleDateString(undefined, { dateStyle: "medium" });
}

/** * Formats a Unix timestamp (in seconds) to a more readable date and time format.
 * @param {number} unixSeconds - The Unix timestamp in seconds to format.
 * @returns {string} - The formatted date and time string, or "Not available" if the input is empty or invalid.
 */
export function formatDateTime(unixSeconds) {
  if (!unixSeconds) return NA;
  return new Date(unixSeconds * 1000).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export const formatGenres = (genres) => (genres && genres.length ? genres.join(", ") : NA);
export const formatRating = (rating) => (rating?.average ? `${rating.average} / 10` : NA);
export const getNetwork = (show) => show.network?.name || show.webChannel?.name || NA;