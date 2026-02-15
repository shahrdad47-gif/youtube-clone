const sidebarItems = [
  { icon: "/icons/home.svg", label: "Home" },
  { icon: "/icons/explore.svg", label: "Explore" },
  { icon: "/icons/subscriptions.svg", label: "Subscriptions" },
  { icon: "/icons/originals.svg", label: "Originals" },
  { icon: "/icons/youtube-music.svg", label: "Music" },
  { icon: "/icons/library.svg", label: "Library" },
];

function Icon({ d, fill = "#f1f1f1" }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
      <path d={d} fill={fill} />
    </svg>
  );
}

const paths = {
  home: "M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z",
  shorts: "M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.56-.72 2.52-1.97 2.52-3.28 0-2.36-2.86-4.28-6.37-4.28S7.79 3.42 7.79 5.78c0 .38.04.74.13 1.09l-1.21.5C6.24 6.65 6 5.84 6 4.96 6 2.22 8.69 0 12 0s6 2.22 6 4.96c0 2.14-1.38 3.97-3.43 4.87zM12 24c-3.31 0-6-2.22-6-4.96 0-2.14 1.38-3.97 3.43-4.87l1.2.5-1.42.74C7.69 16.13 6.79 17.38 6.79 18.69c0 2.36 2.86 4.28 6.37 4.28s6.37-1.92 6.37-4.28c0-.38-.04-.74-.13-1.09l1.21-.5c.47.72.71 1.53.71 2.41 0 2.74-2.69 4.96-6 4.96z",
  subscriptions: "M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4-6-3.27v6.53L16 16z",
  history: "M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h2c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8C8.56 4 5.85 5.48 4.28 7.8L7 8H1V2l2.72 2.72C5.41 2.34 8.46 1 12 1c6.07 0 11 4.93 11 11z",
  playlists: "M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z",
  yourVideos: "M10 8l6 4-6 4V8zm11-5v18H3V3h18zm-1 1H4v16h16V4z",
  watchLater: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z",
  likedVideos: "M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H1v13h16.307c1.593 0 2.96-1.14 3.24-2.71l1.17-6.5c.37-2.07-1.206-3.79-2.937-3.79zM2 12h4v11H2V12zm15.307 11H7V11.36l5.93-6.5c.17-.18.42-.29.69-.29.59 0 1.07.59.88 1.16L12.75 11h6.02c.95 0 1.81.95 1.59 1.9l-1.17 6.5c-.15.86-.89 1.46-1.77 1.46l-.07.14z",
  trending: "M17.53 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 5.24 13.95 3c-2.09 1-3.46 2.65-4.15 4.62-.08.24-.14.5-.19.75-.06.33-.07.67-.02 1-.05-.08-.1-.16-.15-.25-.39-.67-.22-1.59-.2-2.39C7.43 7.56 5.87 9.3 5.3 10.8c-.68 1.81-.34 3.53.36 5.04.42.89 1.03 1.69 1.79 2.33 1.63 1.38 3.82 2.09 5.95 1.74 2.28-.38 4.13-1.98 4.96-4.1.12-.31.2-.62.26-.93.16-.85.05-1.85-.47-2.92l-.62-.76zm-2.66 5.08c-.26.31-.63.57-1.02.76-.77.37-1.69.35-2.44-.02-.09-.04-.17-.09-.26-.14-.53-.33-.86-.84-1.03-1.41-.13-.42-.13-.86-.07-1.29.17-.87.76-1.6 1.22-2.34.43.33.82.73 1.1 1.2.33.53.49 1.15.44 1.77 1.03-.39 1.64-1.59 1.36-2.63-.1-.36-.28-.68-.47-1 .68.89.84 2.24.17 3.1z",
  shopping: "M18.36 2.64c-.14-.14-.33-.22-.53-.22H6.17c-.2 0-.39.08-.53.22l-3.42 3.43c-.14.13-.22.32-.22.52v.81C2 8.93 3.07 10 4.38 10c.77 0 1.45-.37 1.89-.95A2.37 2.37 0 0 0 8.16 10c.77 0 1.45-.37 1.89-.95A2.37 2.37 0 0 0 11.94 10c.77 0 1.46-.37 1.89-.95a2.37 2.37 0 0 0 1.89.95c.77 0 1.46-.37 1.89-.95A2.37 2.37 0 0 0 19.5 10c1.31 0 2.38-1.07 2.38-2.38v-.81c0-.2-.08-.39-.22-.52l-3.3-3.65z",
  music: "M12 4v9.38c-.73-.84-1.8-1.38-3-1.38-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V8h6V4h-7zM9 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm9-12h-5V5h5v1z",
  movies: "M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z",
  live: "M14 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM8.48 8.45l-.71-.7C6.68 8.83 6 10.34 6 12s.68 3.17 1.77 4.25l.71-.71C7.57 14.64 7 13.39 7 12s.57-2.64 1.48-3.55zm7.75-.7-.71.7C16.43 9.36 17 10.61 17 12s-.57 2.64-1.48 3.55l.71.71C17.32 15.17 18 13.66 18 12s-.68-3.17-1.77-4.25zM5.65 5.63l-.7-.71C3.13 6.73 2 9.24 2 12s1.13 5.27 2.95 7.08l.71-.71C4.02 16.74 3 14.49 3 12s1.02-4.74 2.65-6.37zm13.4-.71-.7.71C19.98 7.26 21 9.51 21 12s-1.02 4.74-2.65 6.37l.7.71C20.87 17.27 22 14.76 22 12s-1.13-5.27-2.95-7.08z",
  gaming: "M10 12H8v2H6v-2H4v-2h2V8h2v2h2v2zm7 .5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm3-3c0-.83-.67-1.5-1.5-1.5S17 8.67 17 9.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z",
  news: "M11 11v6H7v-6h4m1-1H6v8h6v-8zm7 1v4h-4v-4h4m1-2h-6v8h6v-8zM3 3v18h18V3H3zm17 17H4V5h16v15z",
  sports: "M17 3C15.79 3 14.69 3.47 13.88 4.26 13.07 3.47 11.96 3 10.76 3 8.46 3 6.58 4.88 6.58 7.18c0 3.04 2.73 5.51 6.87 9.26l.42.38.42-.37c4.13-3.76 6.86-6.23 6.86-9.27C21.16 4.88 19.28 3 17 3z",
  learning: "M12 3 1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z",
  ytPremium: "M21.78 8s-.2-1.37-.8-1.97c-.75-.8-1.6-.8-1.99-.85C16.2 4.98 12 4.98 12 4.98s-4.2 0-6.99.2c-.4.05-1.24.05-1.99.85-.6.6-.8 1.97-.8 1.97S2 9.58 2 11.16v1.48c0 1.58.22 3.16.22 3.16s.2 1.37.8 1.97c.75.8 1.76.77 2.2.86 1.6.15 6.78.2 6.78.2s4.2 0 6.99-.2c.4-.05 1.24-.05 1.99-.85.6-.6.8-1.97.8-1.97S22 14.22 22 12.64v-1.48c0-1.58-.22-3.16-.22-3.16zM10 15.5v-7l5.5 3.5-5.5 3.5z",
  ytStudio: "M10 9.35 15 12l-5 2.65zM12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 17a8 8 0 1 1 0-16 8 8 0 0 1 0 16z",
  ytMusic: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 17a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-2-5.65L15 12l-5-2.65v5.3zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 9c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z",
  ytKids: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.91 13.57c-.47-.15-.76-.55-.87-.97l-.12-.46c-.07-.27 0-.55.17-.76.18-.22.44-.35.74-.35h.56l1.1 4.33c.08.32-.11.65-.44.72-.32.08-.65-.11-.72-.44L6.91 13.57zm10.87-3.08-2.42 6.53c-.21.56-.93.77-1.39.39L12 15.87l-1.97 1.54c-.46.38-1.18.17-1.39-.39l-.33-.88 1.22-.96 2.48 1.95 2.47-6.67c.17-.46.77-.55 1.08-.17l.76.93c.16.2.13.49-.08.65-.2.16-.49.13-.65-.08l-.26-.32-1.82 4.9-.97-.76 1.86-5.02c.23-.63 1.12-.65 1.38-.03z",
  settings: "M13.22 3l.55 2.2.13.51.5.18c.61.23 1.19.56 1.72.98l.4.32.5-.14 2.17-.62 1.22 2.11-1.63 1.59-.37.36.08.51c.05.32.08.64.08.98s-.03.66-.08.98l-.08.51.37.36 1.63 1.59-1.22 2.11-2.17-.62-.5-.14-.4.32c-.53.43-1.11.76-1.72.98l-.5.18-.13.51-.55 2.24h-2.44l-.55-2.22-.13-.51-.5-.18c-.6-.23-1.18-.56-1.72-.99l-.4-.32-.5.14-2.17.62-1.21-2.12 1.63-1.59.37-.36-.08-.51c-.05-.32-.08-.65-.08-.98s.03-.66.08-.98l.08-.51-.37-.36L3.66 8.09l1.22-2.11 2.17.62.5.14.4-.32c.53-.44 1.11-.77 1.72-.99l.5-.18.13-.51.54-2.21h2.44M14 2h-4l-.72 2.91c-.73.28-1.42.66-2.05 1.13L4.42 5.2 2.42 8.8l2.12 2.07c-.07.42-.1.85-.1 1.13 0 .28.03.71.1 1.13L2.42 15.2l2 3.6 2.82-.84c.63.48 1.31.86 2.05 1.13L10 22h4l.72-2.91c.73-.27 1.42-.65 2.05-1.13l2.81.84 2-3.6-2.12-2.07c.07-.42.1-.85.1-1.13 0-.28-.03-.71-.1-1.13l2.12-2.07-2-3.6-2.82.84c-.63-.48-1.31-.86-2.05-1.13L14 2z",
  reportHistory: "M13.18 4 6.97 4.06l-3.15 5.5L7.1 15.04l6.22-.06 3.15-5.5L13.18 4zM16.6 9.28l-2.56 4.46-5.06.05-2.59-4.44 2.56-4.46L14.01 4.84l2.59 4.44z",
  help: "M15.36 9.96c0 1.09-.67 1.67-1.31 2.24-.53.47-1.03.9-1.03 1.73h-1.9c0-1.33.71-1.92 1.37-2.48.55-.46 1.03-.86 1.03-1.55 0-.93-.78-1.47-1.54-1.47-1.04 0-1.54.76-1.57 1.55l-1.88-.19c.12-1.69 1.44-3.16 3.45-3.16 1.94 0 3.38 1.33 3.38 3.33zm-3.32 6.48c.69 0 1.24.55 1.24 1.24 0 .69-.55 1.24-1.24 1.24-.69 0-1.24-.55-1.24-1.24 0-.69.56-1.24 1.24-1.24zM12 3c4.96 0 9 4.04 9 9s-4.04 9-9 9-9-4.04-9-9 4.04-9 9-9m0-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
  feedback: "M13 14h-2v-2h2v2zm0-9h-2v6h2V5zm6-2H5v16.59l3.29-3.29.3-.3H19V3m1-1v14H9l-5 5V2h16z",
};

const sections = [
  {
    items: [
      { key: "home", label: "Home", active: true },
      { key: "shorts", label: "Shorts" },
      { key: "subscriptions", label: "Subscriptions" },
    ],
  },
  {
    title: "You",
    arrow: true,
    items: [
      { key: "history", label: "History" },
      { key: "playlists", label: "Playlists" },
      { key: "yourVideos", label: "Your videos" },
      { key: "watchLater", label: "Watch later" },
      { key: "likedVideos", label: "Liked videos" },
    ],
  },
  {
    title: "Subscriptions",
    items: [
      { avatar: "https://i.pravatar.cc/48?img=12", label: "MrBeast" },
      { avatar: "https://i.pravatar.cc/48?img=33", label: "TechVault" },
      { avatar: "https://i.pravatar.cc/48?img=47", label: "GamersUnite" },
      { avatar: "https://i.pravatar.cc/48?img=58", label: "CookingPro" },
    ],
  },
  {
    title: "Explore",
    items: [
      { key: "trending", label: "Trending" },
      { key: "shopping", label: "Shopping" },
      { key: "music", label: "Music" },
      { key: "movies", label: "Movies" },
      { key: "live", label: "Live" },
      { key: "gaming", label: "Gaming" },
      { key: "news", label: "News" },
      { key: "sports", label: "Sports" },
      { key: "learning", label: "Learning" },
    ],
  },
  {
    title: "More from YouTube",
    items: [
      { key: "ytPremium", label: "YouTube Premium", red: true },
      { key: "ytStudio", label: "YouTube Studio", red: true },
      { key: "ytMusic", label: "YouTube Music", red: true },
      { key: "ytKids", label: "YouTube Kids", red: true },
    ],
  },
  {
    items: [
      { key: "settings", label: "Settings" },
      { key: "reportHistory", label: "Report history" },
      { key: "help", label: "Help" },
      { key: "feedback", label: "Send feedback" },
    ],
  },
];

function Sidebar({ expanded, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${expanded ? 'visible' : ''}`}
        onClick={onClose}
      />

      {/* Mini sidebar (collapsed) */}
      <div className={`sidebar ${expanded ? 'hidden' : ''}`}>
        {sidebarItems.map((item) => (
          <div className="sidebar-link" key={item.label}>
            <img src={item.icon} alt="" />
            <div>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Expanded sidebar */}
      <div className={`sidebar-expanded ${expanded ? 'open' : ''}`}>
        <div className="sidebar-expanded-header">
          <button className="sidebar-hamburger-btn" onClick={onClose}>
            <img src="/icons/hamburger-menu.svg" alt="" />
          </button>
          <img className="sidebar-yt-logo" src="/icons/youtube-logo.svg" alt="" />
        </div>

        <nav className="sidebar-expanded-scroll">
          {sections.map((section, si) => (
            <div key={si}>
              {section.title && (
                <h3 className="sidebar-section-title">
                  {section.title}
                  {section.arrow && (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#f1f1f1" style={{ marginLeft: 4 }}>
                      <path d="M9.4 18.4l-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z" />
                    </svg>
                  )}
                </h3>
              )}
              {section.items.map((item) => (
                <div
                  className={`sidebar-expanded-item ${item.active ? 'active' : ''}`}
                  key={item.label}
                >
                  {item.avatar ? (
                    <img className="sidebar-channel-avatar" src={item.avatar} alt="" />
                  ) : (
                    <Icon d={paths[item.key]} fill={item.red ? '#f00' : '#f1f1f1'} />
                  )}
                  <span>{item.label}</span>
                </div>
              ))}
              {si < sections.length - 1 && <div className="sidebar-divider" />}
            </div>
          ))}

          <div className="sidebar-footer">
            <p>About Press Copyright Contact us Creators Advertise Developers</p>
            <p>Terms Privacy Policy &amp; Safety How YouTube works Test new features</p>
            <p className="sidebar-copyright">&copy; 2025 Google LLC</p>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
