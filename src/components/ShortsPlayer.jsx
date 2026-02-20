import { useState, useRef, useEffect } from 'react';

function ShortsPlayer({ shorts, startIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const videoRef = useRef(null);

  const short = shorts[currentIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(i => i - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < shorts.length - 1) {
        setCurrentIndex(i => i + 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, shorts.length, onClose]);

  return (
    <div className="shorts-player">
      <button className="shorts-player-back" onClick={onClose}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </button>

      <div className="shorts-player-container">
        <div className="shorts-player-video-wrapper">
          <video
            ref={videoRef}
            className="shorts-player-video"
            src={short.videoUrl}
            autoPlay
            loop
            playsInline
            controls
          />
          <div className="shorts-player-info-overlay">
            <p className="shorts-player-title">{short.title}</p>
            <p className="shorts-player-views">{short.views}</p>
          </div>
        </div>

        <div className="shorts-player-actions">
          <button className="shorts-player-action-btn">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
              <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H1v13h16.307c1.593 0 2.96-1.14 3.24-2.71l1.17-6.5c.37-2.07-1.206-3.79-2.937-3.79z" />
            </svg>
            <span>Like</span>
          </button>
          <button className="shorts-player-action-btn">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
              <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H1v13h16.307c1.593 0 2.96-1.14 3.24-2.71l1.17-6.5c.37-2.07-1.206-3.79-2.937-3.79z" transform="rotate(180 12 12)" />
            </svg>
            <span>Dislike</span>
          </button>
          <button className="shorts-player-action-btn">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
              <path d="M21 3H3v18h18V3zm-4.99 14.01L12 14.01l-4.01 3V5h8.02v12.01z" />
            </svg>
            <span>Comment</span>
          </button>
          <button className="shorts-player-action-btn">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
              <path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z" />
            </svg>
            <span>Share</span>
          </button>

          <div className="shorts-player-nav">
            <button
              className="shorts-player-nav-btn"
              onClick={() => setCurrentIndex(i => i - 1)}
              disabled={currentIndex === 0}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
                <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
              </svg>
            </button>
            <button
              className="shorts-player-nav-btn"
              onClick={() => setCurrentIndex(i => i + 1)}
              disabled={currentIndex === shorts.length - 1}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
                <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortsPlayer;
