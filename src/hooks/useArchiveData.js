import { useState, useEffect, useRef } from "react";

const CSV_URL =
  "https://raw.githubusercontent.com/dleshem/israel-alerts-data/main/israel-alerts.csv";

// In-memory cache: once fetched & parsed, reuse across components / re-renders.
let _cachedRows = null;
let _fetchPromise = null;

/**
 * Parse a single CSV line that may contain quoted fields with commas inside.
 * Returns an array of field values.
 */
function parseCSVLine(line) {
  const fields = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      // Quoted field – scan until closing quote (handle escaped "")
      i++; // skip opening quote
      let val = "";
      while (i < line.length) {
        if (line[i] === '"') {
          if (line[i + 1] === '"') {
            val += '"';
            i += 2;
          } else {
            i++; // skip closing quote
            break;
          }
        } else {
          val += line[i++];
        }
      }
      fields.push(val);
      i++; // skip comma
    } else {
      const next = line.indexOf(",", i);
      if (next === -1) {
        fields.push(line.substring(i));
        break;
      }
      fields.push(line.substring(i, next));
      i = next + 1;
    }
  }
  return fields;
}

/**
 * Fetch the full CSV once, parse into lightweight row objects, and cache.
 */
async function fetchAndParse() {
  if (_cachedRows) return _cachedRows;
  if (_fetchPromise) return _fetchPromise;

  _fetchPromise = (async () => {
    const res = await fetch(CSV_URL);
    const text = await res.text();
    const lines = text.split("\n");

    // Skip header: data,date,time,alertDate,category,category_desc,matrix_id,rid
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const fields = parseCSVLine(line);
      // We only need data (areas), alertDate, and category
      const data = fields[0] || "";
      const alertDate = fields[3] || ""; // ISO format: 2014-07-24T17:05:00
      rows.push({ data, alertDate });
    }

    _cachedRows = rows;
    _fetchPromise = null;
    return rows;
  })();

  return _fetchPromise;
}

/**
 * Build archive stats for a given city name (Hebrew).
 * Matches rows where the `data` field contains the city name.
 */
function buildArchive(rows, cityName) {
  const yearMap = {};   // "2014" → count
  const monthMap = {};  // "2014-07" → count
  const hourMap = {};   // 0..23 → count

  // Initialise hour buckets
  for (let h = 0; h < 24; h++) hourMap[h] = 0;

  for (const row of rows) {
    if (!row.data.includes(cityName)) continue;

    const dt = row.alertDate; // "2014-07-24T17:05:00"
    if (!dt || dt.length < 16) continue;

    const year = dt.substring(0, 4);
    const month = dt.substring(0, 7);
    const hour = parseInt(dt.substring(11, 13), 10);

    yearMap[year] = (yearMap[year] || 0) + 1;
    monthMap[month] = (monthMap[month] || 0) + 1;
    if (!isNaN(hour)) hourMap[hour] += 1;
  }

  const byYear = Object.entries(yearMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, alerts]) => ({ label, alerts }));

  const byMonth = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, alerts]) => ({ label, alerts }));

  const byHour = Array.from({ length: 24 }, (_, h) => ({
    label: `${String(h).padStart(2, "0")}:00`,
    alerts: hourMap[h],
  }));

  if (byYear.length === 0) return null;

  const firstYear = byYear[0].label;
  const lastYear = byYear[byYear.length - 1].label;

  return {
    label: `${cityName} (${firstYear}–${lastYear})`,
    source: "github.com/dleshem/israel-alerts-data",
    byYear,
    byMonth,
    byHour,
  };
}

/**
 * React hook — fetches the CSV (once, cached) and returns archive data
 * for the given Hebrew city name.
 */
export default function useArchiveData(cityName) {
  const [archive, setArchive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cityRef = useRef(cityName);
  cityRef.current = cityName;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchAndParse()
      .then((rows) => {
        if (cancelled) return;
        const result = buildArchive(rows, cityRef.current);
        setArchive(result);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to fetch alerts archive CSV:", err);
        setError(err);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cityName]);

  return { archive, loading, error };
}
