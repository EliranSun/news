import { useState, useEffect, useCallback, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, LineChart, Line
} from "recharts";
import ISRAEL_CITIES from "../data/israelCities";
import { getArchiveForZone, getArchiveStats } from "../data/alertsArchive";
import useAlerts from "../hooks/useAlerts";

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findNearestCity(lat, lng) {
  let nearest = ISRAEL_CITIES[0];
  let minDist = Infinity;
  for (const city of ISRAEL_CITIES) {
    const d = getDistance(lat, lng, city.lat, city.lng);
    if (d < minDist) {
      minDist = d;
      nearest = city;
    }
  }
  return nearest;
}

// ──────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#0a0a0f",
        border: "1px solid #ff3a3a",
        padding: "10px 16px",
        borderRadius: 4,
        fontFamily: "'Courier New', monospace",
        fontSize: 13,
      }}>
        <div style={{ color: "#ff3a3a", marginBottom: 4, fontWeight: 700 }}>{label}</div>
        {payload.map((p) => (
          <div key={p.name}>
            <span style={{ color: "#888" }}>{p.name}: </span>
            <span style={{ color: "#fff", fontWeight: 700 }}>{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#444", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#ff3a3a", letterSpacing: "-0.02em" }}>{value}</div>
    </div>
  );
}

function CitySelector({ selectedId, onSelect, onUseLocation, locating }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 24 }}>
      <select
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        style={{
          background: "#0c0c14",
          border: "1px solid #2a2a3a",
          borderRadius: 6,
          color: "#ccc",
          fontFamily: "'Courier New', monospace",
          fontSize: 13,
          padding: "10px 14px",
          minWidth: 200,
          cursor: "pointer",
          outline: "none",
        }}
      >
        {ISRAEL_CITIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nameEn} — {c.name}
          </option>
        ))}
      </select>

      <button
        onClick={onUseLocation}
        disabled={locating}
        style={{
          background: "none",
          border: "1px solid #2a2a3a",
          borderRadius: 6,
          color: locating ? "#444" : "#ff3a3a",
          fontFamily: "'Courier New', monospace",
          fontSize: 12,
          padding: "10px 16px",
          cursor: locating ? "default" : "pointer",
          letterSpacing: "0.06em",
          transition: "border-color 0.15s, color 0.15s",
        }}
      >
        {locating ? "LOCATING..." : "USE MY LOCATION"}
      </button>
    </div>
  );
}

function ActiveAlertsBanner({ alerts, cityName }) {
  if (!alerts.length) {
    return (
      <div style={{
        background: "#0a1a0a",
        border: "1px solid #1a3a1a",
        borderRadius: 8,
        padding: "16px 20px",
        marginBottom: 28,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: "#22c55e",
          boxShadow: "0 0 8px #22c55e",
        }} />
        <span style={{ color: "#22c55e", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          No active alerts — {cityName}
        </span>
      </div>
    );
  }

  return (
    <div style={{
      background: "#1a0a0a",
      border: "1px solid #ff3a3a",
      borderRadius: 8,
      padding: "16px 20px",
      marginBottom: 28,
      animation: "alertFlash 1s ease-in-out infinite",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: "#ff3a3a",
          boxShadow: "0 0 12px #ff3a3a",
          animation: "pulse 0.6s ease-in-out infinite",
        }} />
        <span style={{ color: "#ff3a3a", fontSize: 14, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          ACTIVE ALERT
        </span>
      </div>
      {alerts.map((a, i) => (
        <div key={i} style={{ color: "#fff", fontSize: 13, marginTop: 6 }}>
          <span style={{ color: "#ff3a3a", fontWeight: 700 }}>{a.title || a.cat || "Alert"}</span>
          {" — "}
          {(a.data || a.cities || []).join(", ")}
        </div>
      ))}
    </div>
  );
}

function HistoryList({ history }) {
  if (!history.length) return null;

  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#444", textTransform: "uppercase", marginBottom: 12 }}>
        Recent Live History
      </div>
      <div style={{ maxHeight: 300, overflowY: "auto" }}>
        {history.slice(0, 50).map((h, i) => (
          <div key={i} style={{
            borderBottom: "1px solid #111",
            padding: "10px 0",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
          }}>
            <span style={{ color: "#ff5555" }}>{h.alertDate || h.date || "—"}</span>
            <span style={{ color: "#888" }}>{h.title || h.cat || "Alert"}</span>
            <span style={{ color: "#555" }}>{(h.data || h.cities || []).join(", ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionDivider({ label }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      margin: "36px 0 24px",
    }}>
      <div style={{ flex: 1, height: 1, background: "#1e1e2e" }} />
      <span style={{
        fontSize: 10,
        letterSpacing: "0.3em",
        color: "#333",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "#1e1e2e" }} />
    </div>
  );
}

// ──────────────────────────────────────────────
// Archive chart section
// ──────────────────────────────────────────────

const ARCHIVE_TABS = [
  { id: "year", label: "By Year" },
  { id: "month", label: "By Month" },
  { id: "hour", label: "By Hour of Day" },
];

function ArchiveSection({ archive, stats }) {
  const [tab, setTab] = useState("year");

  const dataMap = {
    year: archive.byYear,
    month: archive.byMonth,
    hour: archive.byHour,
  };
  const currentData = dataMap[tab];

  return (
    <div>
      {/* Archive header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#555",
        }} />
        <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#555", textTransform: "uppercase" }}>
          {archive.label}
        </span>
      </div>

      {/* Archive stats */}
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 24 }}>
        <Stat label="Total Alerts" value={stats.total} />
        <Stat label="Peak Year" value={stats.peakYear} />
        <Stat label="Peak Hour" value={stats.peakHour} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: 28, borderBottom: "1px solid #1e1e2e" }}>
        {ARCHIVE_TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "10px 22px",
            fontFamily: "'Courier New', monospace",
            fontSize: 12, letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: tab === t.id ? "#ff3a3a" : "#444",
            borderBottom: tab === t.id ? "2px solid #ff3a3a" : "2px solid transparent",
            marginBottom: -1,
            transition: "color 0.15s",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div style={{
        background: "#0c0c14",
        border: "1px solid #16162a",
        borderRadius: 8,
        padding: "28px 12px 16px",
      }}>
        <ResponsiveContainer width="100%" height={360}>
          {tab === "month" ? (
            <LineChart data={currentData} margin={{ left: 0, right: 20, top: 4, bottom: 30 }}>
              <CartesianGrid stroke="#111822" strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#444", fontSize: 11, fontFamily: "Courier New" }}
                angle={-40} textAnchor="end" height={55}
              />
              <YAxis tick={{ fill: "#444", fontSize: 11, fontFamily: "Courier New" }} width={40} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone" dataKey="alerts" name="Alerts"
                stroke="#ff3a3a" strokeWidth={2}
                dot={{ fill: "#ff3a3a", r: 4 }}
                activeDot={{ r: 6, fill: "#ff3a3a" }}
              />
            </LineChart>
          ) : (
            <BarChart data={currentData} margin={{ left: 0, right: 20, top: 4, bottom: 10 }}>
              <CartesianGrid stroke="#111822" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#555", fontSize: tab === "year" ? 13 : 11, fontFamily: "Courier New" }}
              />
              <YAxis tick={{ fill: "#444", fontSize: 11, fontFamily: "Courier New" }} width={40} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="alerts" name="Alerts"
                fill="#ff3a3a" radius={[3, 3, 0, 0]}
                maxBarSize={tab === "year" ? 70 : 36}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: 14, fontSize: 11, color: "#2a2a3a", letterSpacing: "0.06em" }}>
        SOURCE · {archive.source}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────

const STORAGE_KEY = "alerts-selected-city";

export default function AlertsDashboard() {
  const [selectedCityId, setSelectedCityId] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "ramat-gan"
  );
  const [locating, setLocating] = useState(false);

  const selectedCity = useMemo(
    () => ISRAEL_CITIES.find((c) => c.id === selectedCityId) || ISRAEL_CITIES[0],
    [selectedCityId]
  );

  const { activeAlerts, history, loading, error } = useAlerts(selectedCity.name);

  const archive = useMemo(() => getArchiveForZone(selectedCity.zone), [selectedCity.zone]);
  const archiveStats = useMemo(() => getArchiveStats(archive), [archive]);

  const handleCityChange = useCallback((id) => {
    setSelectedCityId(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const handleUseLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = findNearestCity(pos.coords.latitude, pos.coords.longitude);
        handleCityChange(nearest.id);
        setLocating(false);
      },
      () => {
        alert("Unable to get your location. Please select a city manually.");
        setLocating(false);
      },
      { timeout: 10000 }
    );
  }, [handleCityChange]);

  return (
    <div style={{
      background: "#07070d",
      minHeight: "100vh",
      fontFamily: "'Courier New', monospace",
      color: "#ccc",
      padding: "40px 32px",
    }}>
      {/* Scanline overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
        zIndex: 10,
      }} />

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: "#ff3a3a",
            boxShadow: "0 0 12px #ff3a3a",
            animation: "pulse 1.4s ease-in-out infinite",
          }} />
          <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "#ff5555", textTransform: "uppercase" }}>
            Alerts Monitor · Live + Archive
          </span>
        </div>

        <h1 style={{
          margin: 0, fontSize: "clamp(22px, 4vw, 38px)",
          fontWeight: 900, letterSpacing: "-0.02em",
          color: "#fff", lineHeight: 1.1,
        }}>
          MISSILE ALERTS
          <span style={{ color: "#ff3a3a", display: "block" }}>
            {selectedCity.nameEn.toUpperCase()}
          </span>
        </h1>
      </div>

      {/* City Selector */}
      <CitySelector
        selectedId={selectedCityId}
        onSelect={handleCityChange}
        onUseLocation={handleUseLocation}
        locating={locating}
      />

      {/* ── SECTION A: Live Alerts ── */}
      <SectionDivider label="Live Status" />

      {loading ? (
        <div style={{ color: "#444", fontSize: 12, marginBottom: 28, letterSpacing: "0.1em" }}>
          CONNECTING TO ALERT SYSTEM...
        </div>
      ) : (
        <ActiveAlertsBanner alerts={activeAlerts} cityName={selectedCity.nameEn} />
      )}

      {error && (
        <div style={{
          background: "#0c0c14",
          border: "1px solid #2a2a3a",
          borderRadius: 8,
          padding: "12px 16px",
          marginBottom: 28,
          fontSize: 11,
          color: "#666",
          letterSpacing: "0.06em",
        }}>
          Note: The alert API is only accessible from Israel. If you're outside Israel, live alerts may not load.
        </div>
      )}

      <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 12 }}>
        <Stat label="Active Now" value={activeAlerts.length} />
        <Stat label="Recent (API)" value={history.length} />
        <Stat label="City" value={selectedCity.name} />
      </div>

      <HistoryList history={history} />

      {/* ── SECTION B: Historical Archive ── */}
      <SectionDivider label="Historical Archive" />

      {archive && archiveStats ? (
        <ArchiveSection archive={archive} stats={archiveStats} />
      ) : (
        <div style={{ color: "#333", fontSize: 12, letterSpacing: "0.06em" }}>
          No historical archive data available for the {selectedCity.zone} zone.
        </div>
      )}

      <div style={{ marginTop: 36, fontSize: 11, color: "#2a2a3a", letterSpacing: "0.06em" }}>
        LIVE · oref.org.il · Pikud HaOref (Home Front Command)
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes alertFlash {
          0%, 100% { background: #1a0a0a; }
          50% { background: #2a0a0a; }
        }
      `}</style>
    </div>
  );
}
