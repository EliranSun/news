const pages = [
  { path: "/news", label: "News" },
  { path: "/qr", label: "Birthday QR Codes" },
  { path: "/fire", label: "Fire Rekindle" },
  { path: "/chart", label: "One Piece Chart" },
  { path: "/ten", label: "Ten Thousand Hours" },
  { path: "/cv", label: "Curriculum Vitae" },
  { path: "/simple", label: "Simple Tracker" },
  { path: "/clock", label: "Clock" },
  { path: "/sleep-graph", label: "Sleep Graph" },
  { path: "/sleep/add", label: "Sleep Add" },
  { path: "/orchuk", label: "Orchuk" },
  { path: "/squares", label: "Squares" },
  { path: "/square-calendar", label: "Square Calendar" },
  { path: "/physics", label: "Physics Demo" },
  { path: "/css", label: "CSS Character Selection" },
  { path: "/alerts", label: "Alerts Dashboard" },
];

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-8">
        App Pages
      </h1>
      <ul className="w-full max-w-sm space-y-3">
        {pages.map(({ path, label }) => (
          <li key={path}>
            <a
              href={path}
              className="block w-full px-5 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-100 font-medium hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
