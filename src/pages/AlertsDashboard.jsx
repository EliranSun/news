import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, LineChart, Line
} from "recharts";

// Data extracted from github.com/dleshem/israel-alerts-data
// Filtered for Gush Dan / Ramat Gan district (דן) — 2014–2026
const BY_YEAR = [
  {"label":"2014","alerts":57},
  {"label":"2016","alerts":14},
  {"label":"2017","alerts":4},
  {"label":"2018","alerts":11},
  {"label":"2019","alerts":6},
  {"label":"2021","alerts":70},
  {"label":"2023","alerts":142},
  {"label":"2024","alerts":77},
  {"label":"2025","alerts":452},
  {"label":"2026","alerts":457},
];

const BY_MONTH = [
  {"label":"2014-07","alerts":11},
  {"label":"2014-08","alerts":46},
  {"label":"2016-06","alerts":3},
  {"label":"2016-09","alerts":10},
  {"label":"2016-12","alerts":1},
  {"label":"2017-07","alerts":1},
  {"label":"2017-11","alerts":3},
  {"label":"2018-07","alerts":2},
  {"label":"2018-12","alerts":9},
  {"label":"2019-03","alerts":6},
  {"label":"2021-05","alerts":69},
  {"label":"2021-11","alerts":1},
  {"label":"2023-05","alerts":5},
  {"label":"2023-10","alerts":92},
  {"label":"2023-11","alerts":21},
  {"label":"2023-12","alerts":24},
  {"label":"2024-09","alerts":11},
  {"label":"2024-10","alerts":21},
  {"label":"2024-11","alerts":17},
  {"label":"2024-12","alerts":28},
  {"label":"2025-01","alerts":8},
  {"label":"2025-03","alerts":22},
  {"label":"2025-04","alerts":8},
  {"label":"2025-05","alerts":70},
  {"label":"2025-06","alerts":228},
  {"label":"2025-07","alerts":32},
  {"label":"2025-08","alerts":36},
  {"label":"2025-09","alerts":44},
  {"label":"2025-10","alerts":4},
  {"label":"2026-02","alerts":150},
  {"label":"2026-03","alerts":307},
];

const BY_HOUR = [
  {"label":"00:00","alerts":59},{"label":"01:00","alerts":48},
  {"label":"02:00","alerts":54},{"label":"03:00","alerts":49},
  {"label":"04:00","alerts":30},{"label":"05:00","alerts":32},
  {"label":"06:00","alerts":47},{"label":"07:00","alerts":55},
  {"label":"08:00","alerts":21},{"label":"09:00","alerts":32},
  {"label":"10:00","alerts":46},{"label":"11:00","alerts":35},
  {"label":"12:00","alerts":53},{"label":"13:00","alerts":62},
  {"label":"14:00","alerts":43},{"label":"15:00","alerts":31},
  {"label":"16:00","alerts":93},{"label":"17:00","alerts":73},
  {"label":"18:00","alerts":54},{"label":"19:00","alerts":88},
  {"label":"20:00","alerts":97},{"label":"21:00","alerts":99},
  {"label":"22:00","alerts":65},{"label":"23:00","alerts":24},
];

const TOTAL = BY_YEAR.reduce((s, d) => s + d.alerts, 0);
const PEAK_YEAR = BY_YEAR.reduce((a, b) => a.alerts > b.alerts ? a : b).label;
const PEAK_HOUR = BY_HOUR.reduce((a, b) => a.alerts > b.alerts ? a : b).label;

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

const TABS = [
  { id: "year", label: "By Year", data: BY_YEAR },
  { id: "month", label: "By Month", data: BY_MONTH },
  { id: "hour", label: "By Hour of Day", data: BY_HOUR },
];

export default function AlertsDashboard() {
  const [tab, setTab] = useState("year");
  const current = TABS.find(t => t.id === tab);

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
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: "#ff3a3a",
            boxShadow: "0 0 12px #ff3a3a",
            animation: "pulse 1.4s ease-in-out infinite",
          }} />
          <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "#ff5555", textTransform: "uppercase" }}>
            Israel Alerts Archive · 2014–2026
          </span>
        </div>

        <h1 style={{
          margin: 0, fontSize: "clamp(22px, 4vw, 38px)",
          fontWeight: 900, letterSpacing: "-0.02em",
          color: "#fff", lineHeight: 1.1,
        }}>
          MISSILE ALERTS
          <span style={{ color: "#ff3a3a", display: "block" }}>RAMAT GAN AREA</span>
        </h1>

        <div style={{ marginTop: 20, display: "flex", gap: 40, flexWrap: "wrap" }}>
          <Stat label="Total Alerts" value={TOTAL} />
          <Stat label="Peak Year" value={PEAK_YEAR} />
          <Stat label="Peak Hour" value={PEAK_HOUR} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: 28, borderBottom: "1px solid #1e1e2e" }}>
        {TABS.map((t) => (
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
            <LineChart data={current.data} margin={{ left: 0, right: 20, top: 4, bottom: 30 }}>
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
            <BarChart data={current.data} margin={{ left: 0, right: 20, top: 4, bottom: 10 }}>
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
        SOURCE · github.com/dleshem/israel-alerts-data · Gush Dan district (דן) · Covers Ramat Gan, Bnei Brak, Giv'atayim
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
