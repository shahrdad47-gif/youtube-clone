import videos from '../data/videos';

function YouPage() {
  return (
    <div className="you-page">
      <div className="you-profile-header">
        <img
          className="you-profile-avatar"
          src="/images/profiles/channels4_profile.jpg"
          alt=""
        />
        <div className="you-profile-info">
          <h1 className="you-profile-name">Your Channel</h1>
          <p className="you-profile-handle">@yourchannel</p>
          <p className="you-profile-meta">1 subscriber · 3 videos</p>
        </div>
      </div>

      <div className="you-section">
        <div className="you-section-header">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="#f1f1f1">
            <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h2c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8C8.56 4 5.85 5.48 4.28 7.8L7 8H1V2l2.72 2.72C5.41 2.34 8.46 1 12 1c6.07 0 11 4.93 11 11z" />
          </svg>
          <h2>History</h2>
          <button className="you-view-all">View all</button>
        </div>
        <div className="you-scroll-row">
          {videos.map((video) => (
            <div className="you-scroll-card" key={video.id}>
              <div className="Horizon-row">
                <img className="Horizon" src={video.thumbnail} alt="" />
                <div className="video-time">{video.duration}</div>
              </div>
              <p className="you-card-title">{video.title}</p>
              <p className="you-card-meta">{video.author}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="you-section">
        <div className="you-section-header">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="#f1f1f1">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
          </svg>
          <h2>Watch later</h2>
          <button className="you-view-all">View all</button>
        </div>
        <div className="you-scroll-row">
          {videos.slice(0, 4).map((video) => (
            <div className="you-scroll-card" key={video.id}>
              <div className="Horizon-row">
                <img className="Horizon" src={video.thumbnail} alt="" />
                <div className="video-time">{video.duration}</div>
              </div>
              <p className="you-card-title">{video.title}</p>
              <p className="you-card-meta">{video.author}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="you-section">
        <div className="you-section-header">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="#f1f1f1">
            <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H1v13h16.307c1.593 0 2.96-1.14 3.24-2.71l1.17-6.5c.37-2.07-1.206-3.79-2.937-3.79zM2 12h4v11H2V12zm15.307 11H7V11.36l5.93-6.5c.17-.18.42-.29.69-.29.59 0 1.07.59.88 1.16L12.75 11h6.02c.95 0 1.81.95 1.59 1.9l-1.17 6.5c-.15.86-.89 1.46-1.77 1.46l-.07.14z" />
          </svg>
          <h2>Liked videos</h2>
          <button className="you-view-all">View all</button>
        </div>
        <div className="you-scroll-row">
          {videos.slice(2, 6).map((video) => (
            <div className="you-scroll-card" key={video.id}>
              <div className="Horizon-row">
                <img className="Horizon" src={video.thumbnail} alt="" />
                <div className="video-time">{video.duration}</div>
              </div>
              <p className="you-card-title">{video.title}</p>
              <p className="you-card-meta">{video.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YouPage;
