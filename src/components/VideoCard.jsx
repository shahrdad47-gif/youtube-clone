import { useState, useRef } from 'react';

function VideoCard({ thumbnail, duration, profilePic, title, author, stats, onClick, videoUrl }) {
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
      </div>
      <div className="video-info-grid">
        <div className="channel-picture">
          <img className="profile-picture" src={profilePic} alt="" />
        </div>
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
