import { useEffect, useState } from 'react';

function VideoPlayer({ video, onBack, onView }) {
  const [views, setViews] = useState(video.views ?? null);

  useEffect(() => {
    if (!video.id) return;
    fetch(`/api/videos/${video.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.views != null) {
          setViews(data.views);
          if (onView) onView(video.id, data.views);
        }
      })
      .catch(() => {});
  }, [video.id]);

  const displayStats = views != null ? `${formatViews(views)} views` : video.stats;

  return (
    <div className="video-player-page">
      <div className="video-player-main">
        <video
          className="video-player-element"
          src={video.videoUrl}
          controls
          autoPlay
        />
        <div className="video-player-info">
          <h1 className="video-player-title">{video.title}</h1>
          <div className="video-player-meta">
            <div className="video-player-author">
              {video.authorAvatar && (
                <img className="video-player-avatar" src={video.authorAvatar} alt="" />
              )}
              <div>
                <p className="video-player-author-name">{video.author}</p>
              </div>
            </div>
          </div>
          <div className="video-player-stats">
            <span>{displayStats}</span>
          </div>
          {video.description && (
            <div className="video-player-description">
              <p>{video.description}</p>
            </div>
          )}
        </div>
      </div>
      <div className="video-player-top-bar">
        <button className="video-player-back" onClick={onBack}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="#fff" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back
        </button>
      </div>
    </div>
  );
}

function formatViews(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(num >= 10_000_000 ? 0 : 1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(num >= 10_000 ? 0 : 1)}k`;
  return String(num);
}

export default VideoPlayer;
