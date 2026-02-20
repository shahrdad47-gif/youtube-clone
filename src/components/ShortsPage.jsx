import { useState, useEffect } from 'react';
import staticShorts from '../data/shorts';

function ShortsPage() {
  const [shorts, setShorts] = useState(staticShorts);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    fetch('/api/videos?shorts=true')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setShorts(data.map(v => ({
            id: v._id,
            thumbnail: v.thumbnailUrl,
            title: v.title,
            views: `${formatViews(v.views)} views`,
            videoUrl: v.videoUrl,
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="shorts-page">
      <div className="shorts-page-feed">
        {shorts.map((short) => (
          <div className="shorts-page-card" key={short.id}>
            <div
              className="shorts-page-thumbnail-container"
              onClick={() => setPlayingId(playingId === short.id ? null : short.id)}
            >
              {playingId === short.id && short.videoUrl ? (
                <video
                  className="shorts-page-thumbnail"
                  src={short.videoUrl}
                  autoPlay
                  loop
                  controls
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  <img
                    className="shorts-page-thumbnail"
                    src={short.thumbnail}
                    alt={short.title}
                  />
                  <div className="shorts-page-play-icon">
                    <svg viewBox="0 0 24 24" width="48" height="48">
                      <path fill="rgba(255,255,255,0.9)" d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </>
              )}
              <div className="shorts-page-overlay">
                <p className="shorts-page-title">{short.title}</p>
                <p className="shorts-page-views">{short.views}</p>
              </div>
            </div>
            <div className="shorts-page-actions">
              <button className="shorts-action-btn">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
                  <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H1v13h16.307c1.593 0 2.96-1.14 3.24-2.71l1.17-6.5c.37-2.07-1.206-3.79-2.937-3.79z" />
                </svg>
              </button>
              <button className="shorts-action-btn">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
                  <path d="M17 4h-1.586l-1.471-1.471c-.378-.378-.88-.529-1.414-.529H11.47c-.534 0-1.036.151-1.414.529L8.586 4H7c-1.65 0-3 1.35-3 3v1h16V7c0-1.65-1.35-3-3-3zM5 20c0 1.65 1.35 3 3 3h8c1.65 0 3-1.35 3-3V9H5v11z" transform="rotate(180 12 12)" />
                </svg>
              </button>
              <button className="shorts-action-btn">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
                  <path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatViews(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(num >= 10_000_000 ? 0 : 1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(num >= 10_000 ? 0 : 1)}k`;
  return String(num);
}

export default ShortsPage;
