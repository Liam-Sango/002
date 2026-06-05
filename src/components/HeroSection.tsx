import Link from "next/link";

/* Simple pixel-art SVG icons in classic Win98 style */

function MonitorIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="40" height="28" fill="#000080" rx="2" />
      <rect x="6" y="6" width="36" height="24" fill="#008080" />
      <rect x="16" y="32" width="16" height="4" fill="#c0c0c0" />
      <rect x="14" y="36" width="20" height="4" fill="#808080" rx="1" />
      <rect x="14" y="40" width="20" height="3" fill="#c0c0c0" rx="1" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="22" rx="20" ry="18" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      <circle cx="14" cy="16" r="4" fill="#ff0000" />
      <circle cx="26" cy="12" r="4" fill="#0000ff" />
      <circle cx="34" cy="18" r="4" fill="#ffff00" />
      <circle cx="15" cy="28" r="4" fill="#008000" />
      <circle cx="28" cy="30" r="4" fill="#ff00ff" />
      <circle cx="36" cy="28" r="3" fill="#ff8800" />
      <rect x="20" y="34" width="8" height="8" fill="#808080" rx="1" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="18" height="8" fill="#ffcc00" rx="1" />
      <path
        d="M4 16 L4 38 Q4 40 6 40 L42 40 Q44 40 44 38 L44 14 Q44 12 42 12 L22 12 L18 10 L6 10 Q4 10 4 12 Z"
        fill="#ffcc00"
        stroke="#c8a000"
        strokeWidth="1"
      />
      <rect x="8" y="18" width="32" height="4" fill="rgba(255,255,255,0.3)" rx="1" />
    </svg>
  );
}

const HERO_ICONS = [
  { icon: <MonitorIcon />, label: "Developer", href: "#projects" },
  { icon: <PaletteIcon />, label: "Designer", href: "#about" },
  { icon: <FolderIcon />, label: "Portfolio", href: "#projects" },
];

export default function HeroSection() {
  return (
    <section id="hero" className="hero">
      <div className="site-container">
        <h1>Liam Sango</h1>
        <p className="hero-sub">Developer &amp; Designer</p>
        <div className="hero-icons">
          {HERO_ICONS.map((item) => (
            <Link key={item.label} href={item.href} className="hero-icon">
              <span className="icon-img">{item.icon}</span>
              <span className="icon-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
