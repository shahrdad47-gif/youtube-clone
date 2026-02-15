import { useState, useRef, useEffect } from 'react';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="header">
      <div className="left-section">
        <img className="hamburger-menu" src="/icons/hamburger-menu.svg" alt="" />
        <img className="youtube-menu" src="/icons/youtube-logo.svg" alt="" />
      </div>

      <div className="middle-section">
        <input className="Searchbar" type="text" placeholder="Search" />
        <button className="search-button">
          <img className="search-icon" src="/icons/search.svg" alt="" />
          <div className="tooltip">Search</div>
        </button>
        <button className="voice-button">
          <img className="voice-icon" src="/icons/voice-search-icon.svg" alt="" />
          <div className="tooltip">Search with your voice</div>
        </button>
      </div>

      <div className="right-section">
        <div className="upload-icon-coontainer">
          <img className="upload-icon" src="/icons/upload.svg" alt="" />
          <div className="tooltip">Create</div>
        </div>
        <img className="app-icon" src="/icons/youtube-apps.svg" alt="" />
        <img className="notfication-icon" src="/icons/notifications.svg" alt="" />
        <div className="profile-menu-container" ref={menuRef}>
          <img
            className="profile-image"
            src="/images/profiles/channels4_profile (1).jpg"
            alt=""
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <img
                  className="profile-dropdown-avatar"
                  src="/images/profiles/channels4_profile (1).jpg"
                  alt=""
                />
                <div className="profile-dropdown-info">
                  <p className="profile-dropdown-name">Creator</p>
                  <p className="profile-dropdown-handle">@creator</p>
                  <a className="profile-dropdown-channel" href="#">View your channel</a>
                </div>
              </div>
              <div className="profile-dropdown-divider" />

              <div className="profile-dropdown-item">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1c2.4 0 4.53.94 6.13 2.47l-2.97 2.97A5.009 5.009 0 0 0 12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5a5.009 5.009 0 0 0 4.44-2.7l2.97 2.97A8.962 8.962 0 0 1 12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9z"/></svg>
                <span>Google Account</span>
              </div>
              <div className="profile-dropdown-item">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M4 20h14v2H4c-1.1 0-2-.9-2-2V6h2v14zM18 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h10v12zm-5-7V5l4 3.5-4 3.5z"/></svg>
                <span>Switch account</span>
              </div>
              <div className="profile-dropdown-item">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M20 3v18H8v-1h11V4H8V3h12zm-8.9 12.1.7.7 4.4-4.4L11.8 7l-.7.7 3.1 3.1H3v1h11.3l-3.2 3.3z"/></svg>
                <span>Sign out</span>
              </div>

              <div className="profile-dropdown-divider" />

              <div className="profile-dropdown-item">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M10 9.35 15 12l-5 2.65zM12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 17a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/></svg>
                <span>YouTube Studio</span>
              </div>
              <div className="profile-dropdown-item">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"/></svg>
                <span>Your data in YouTube</span>
              </div>

              <div className="profile-dropdown-divider" />

              <div className="profile-dropdown-item">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-19c-4.96 0-9 4.04-9 9s4.04 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.24-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                <span>Appearance: Device theme</span>
              </div>
              <div className="profile-dropdown-item">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7c0 1.1.9 2 2 2h5v-6h2v6h5c1.1 0 2-.9 2-2v-7h1a1 1 0 0 0 .71-.29 1 1 0 0 0 0-1.42l-9-9zM19 12v8h-3v-6H8v6H5v-8l7-7 7 7z"/></svg>
                <span>Language: English</span>
              </div>
              <div className="profile-dropdown-item">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M13.33 6c-1 2.42-2.22 4.65-3.57 6.52l2.98 2.94-.7.7-2.98-2.93a28.07 28.07 0 0 1-4.55 4.22l-.62-.76A27.07 27.07 0 0 0 8.56 12.5c-1.47-1.46-3.13-2.78-4.9-3.94l.46-.84c1.85 1.21 3.58 2.59 5.11 4.11a29.42 29.42 0 0 0 3.44-6.39L4.31 5.4V4.4H9V3h1v1.4h4.69l.52.87-.24.58L13.33 6zM21 17.39v-1.04l-1.56-.31a3.94 3.94 0 0 0-.42-1.01l.89-1.28-.74-.73-1.27.89c-.31-.18-.65-.32-1.01-.42L16.58 12h-1.04l-.31 1.56a3.92 3.92 0 0 0-1.01.42l-1.27-.89-.74.73.89 1.28a3.94 3.94 0 0 0-.42 1.01L11.12 16.42v1.04l1.56.31c.1.36.24.7.42 1.01l-.89 1.28.74.73 1.27-.89c.31.18.65.32 1.01.42l.31 1.56h1.04l.31-1.56c.36-.1.7-.24 1.01-.42l1.27.89.74-.73-.89-1.28c.18-.31.32-.65.42-1.01L21 17.39zm-4.94 1.55a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
                <span>Restricted Mode: Off</span>
              </div>
              <div className="profile-dropdown-item">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm0 16c-4.14 0-7.5-3.36-7.5-7.5S7.36 3 11.5 3 19 6.36 19 10.5c0 3.51-2.13 7.09-6.5 9.44V18h-1zm1-10.5h-2v5h2v-5zm0-3h-2v2h2V4.5z"/></svg>
                <span>Location: United States</span>
              </div>

              <div className="profile-dropdown-divider" />

              <div className="profile-dropdown-item">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M12 9.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 13.38 9.5 12s1.12-2.5 2.5-2.5m0-1c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zM13.22 3l.55 2.2.13.51.5.18c.61.23 1.19.56 1.72.98l.4.32.5-.14 2.17-.62 1.22 2.11-1.63 1.59-.37.36.08.51c.05.32.08.64.08.98s-.03.66-.08.98l-.08.51.37.36 1.63 1.59-1.22 2.11-2.17-.62-.5-.14-.4.32c-.53.43-1.11.76-1.72.98l-.5.18-.13.51-.55 2.24h-2.44l-.55-2.22-.13-.51-.5-.18c-.6-.23-1.18-.56-1.72-.99l-.4-.32-.5.14-2.17.62-1.21-2.12 1.63-1.59.37-.36-.08-.51c-.05-.32-.08-.65-.08-.98s.03-.66.08-.98l.08-.51-.37-.36L3.66 8.09l1.22-2.11 2.17.62.5.14.4-.32c.53-.44 1.11-.77 1.72-.99l.5-.18.13-.51.54-2.21h2.44M14 2h-4l-.72 2.91c-.73.28-1.42.66-2.05 1.13L4.42 5.2 2.42 8.8l2.12 2.07c-.07.42-.1.85-.1 1.13 0 .28.03.71.1 1.13L2.42 15.2l2 3.6 2.82-.84c.63.48 1.31.86 2.05 1.13L10 22h4l.72-2.91c.73-.27 1.42-.65 2.05-1.13l2.81.84 2-3.6-2.12-2.07c.07-.42.1-.85.1-1.13 0-.28-.03-.71-.1-1.13l2.12-2.07-2-3.6-2.82.84c-.63-.48-1.31-.86-2.05-1.13L14 2z"/></svg>
                <span>Settings</span>
              </div>

              <div className="profile-dropdown-divider" />

              <div className="profile-dropdown-item">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M15.36 9.96c0 1.09-.67 1.67-1.31 2.24-.53.47-1.03.9-1.03 1.73h-1.9c0-1.33.71-1.92 1.37-2.48.55-.46 1.03-.86 1.03-1.55 0-.93-.78-1.47-1.54-1.47-1.04 0-1.54.76-1.57 1.55l-1.88-.19c.12-1.69 1.44-3.16 3.45-3.16 1.94 0 3.38 1.33 3.38 3.33zm-3.32 6.48c.69 0 1.24.55 1.24 1.24 0 .69-.55 1.24-1.24 1.24-.69 0-1.24-.55-1.24-1.24 0-.69.56-1.24 1.24-1.24zM12 3c4.96 0 9 4.04 9 9s-4.04 9-9 9-9-4.04-9-9 4.04-9 9-9m0-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
                <span>Help</span>
              </div>
              <div className="profile-dropdown-item">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#fff" d="M13 14h-2v-2h2v2zm0-9h-2v6h2V5zm6-2H5v16.59l3.29-3.29.3-.3H19V3m1-1v14H9l-5 5V2h16z"/></svg>
                <span>Send feedback</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
