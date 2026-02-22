import { useState, useRef } from 'react';

function VideoCard({ thumbnail, duration, profilePic, title, author, stats, onClick, videoUrl, hideProfilePic, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const hoverTimer = useRef(null);

  const handleMouseEnter = () => {
    if (videoUrl) {
      hoverTimer.current = setTimeout(() => setHovered(true), 500);
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    setHovered(false);
  };

  return (
    <div className="Video-preview" onClick={onClick}>
      <div
        className="Horizon-row"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hovered && videoUrl ? (
          <video
            className="Horizon hover-preview-video"
            src={videoUrl}
            muted
            autoPlay
            loop
          />
        ) : thumbnail ? (
          <img className="Horizon" src={thumbnail} alt="" />
        ) : (
          <div className="Horizon video-thumb-placeholder" />
        )}
        {!hovered && <div className="video-time">{duration}</div>}
        {onDelete && hovered && (
          <button
            className="video-delete-btn"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            title="Delete video"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        )}
      </div>
      <div className="video-info-grid">
        {!hideProfilePic && (
          <div className="channel-picture">
            {profilePic ? (
              <img className="profile-picture" src={profilePic} alt="" />
            ) : (
              <svg className="profile-picture" viewBox="0 0 24 24">
                <path fill="#aaa" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1c4.96 0 9 4.04 9 9 0 2.13-.74 4.08-1.97 5.63-1.15-1.36-3.14-2.3-5.53-2.66a4 4 0 1 0-3 0c-2.39.36-4.38 1.3-5.53 2.66A8.96 8.96 0 0 1 3 12c0-4.96 4.04-9 9-9zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
              </svg>
            )}
          </div>
        )}
        <div className="video-info">
          <p className="video-title">{title}</p>
          <p className="video-author">{author}</p>
          <p className="video-stat">{stats}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
