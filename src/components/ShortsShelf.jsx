import { useState } from 'react';

function ShortsShelf({ shorts }) {
  const [playingId, setPlayingId] = useState(null);

  return (
    <div className="shorts-shelf">
      <div className="shorts-header">
        <svg
          className="shorts-icon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
        >
          <path
            d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"
            fill="#FF0000"
          />
        </svg>
        <h2>Shorts</h2>
      </div>
      <div className="shorts-row">
        {shorts.map((short) => (
          <div
            className="short-card"
            key={short.id}
            onClick={() => setPlayingId(playingId === short.id ? null : short.id)}
          >
            <div className="short-thumbnail-container">
              {playingId === short.id && short.videoUrl ? (
                <video
                  className="short-thumbnail"
                  src={short.videoUrl}
                  autoPlay
                  loop
                  controls
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <img
                  className="short-thumbnail"
                  src={short.thumbnail}
                  alt={short.title}
                />
              )}
              {playingId !== short.id && (
                <div className="short-title-overlay">
                  <p className="short-title">{short.title}</p>
                  <p className="short-views">{short.views}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShortsShelf;
