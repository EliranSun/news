import { useState, useEffect, useCallback } from "react";

const ALERTS_URL = "https://www.oref.org.il/WarningMessages/alert/alerts.json";
const HISTORY_URL = "https://www.oref.org.il/WarningMessages/History/AlertsHistory.json";
const POLL_INTERVAL = 5000;

const REQUIRED_HEADERS = {
  "X-Requested-With": "XMLHttpRequest",
  Referer: "https://www.oref.org.il/",
};

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: REQUIRED_HEADERS,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  if (!text || text.trim() === "") return [];
  return JSON.parse(text);
}

export default function useAlerts(cityName) {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = useCallback(async () => {
    try {
      const data = await fetchJson(ALERTS_URL);
      const alerts = Array.isArray(data) ? data : data?.data ? [data] : [];
      if (cityName) {
        setActiveAlerts(
          alerts.filter(
            (a) =>
              a.data?.includes(cityName) || a.cities?.includes(cityName)
          )
        );
      } else {
        setActiveAlerts(alerts);
      }
      setError(null);
    } catch (err) {
      // Geo-blocked or network error — keep previous state
      if (!error) {
        setError(err.message);
      }
    }
  }, [cityName, error]);

  const fetchHistory = useCallback(async () => {
    try {
      const data = await fetchJson(HISTORY_URL);
      const items = Array.isArray(data) ? data : [];
      if (cityName) {
        setHistory(
          items.filter(
            (h) => h.data?.includes(cityName) || h.cities?.includes(cityName)
          )
        );
      } else {
        setHistory(items);
      }
    } catch {
      // History fetch is non-critical
    } finally {
      setLoading(false);
    }
  }, [cityName]);

  useEffect(() => {
    setLoading(true);
    fetchAlerts();
    fetchHistory();

    const interval = setInterval(fetchAlerts, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchAlerts, fetchHistory]);

  return { activeAlerts, history, loading, error };
}
