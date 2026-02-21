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
        ) : (
          <img className="Horizon" src={thumbnail} alt="" />
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
            <img className="profile-picture" src={profilePic} alt="" />
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
