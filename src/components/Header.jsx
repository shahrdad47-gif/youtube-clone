function Header() {
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
        <img className="profile-image" src="/images/profiles/channels4_profile (1).jpg" alt="" />
      </div>
    </div>
  );
}

export default Header;
