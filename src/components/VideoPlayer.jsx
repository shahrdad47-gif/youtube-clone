function VideoPlayer({ video, onBack }) {
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
            <span>{video.stats}</span>
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

export default VideoPlayer;
