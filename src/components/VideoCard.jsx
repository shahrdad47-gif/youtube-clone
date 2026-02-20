function VideoCard({ thumbnail, duration, profilePic, title, author, stats, onClick }) {
  return (
    <div className="Video-preview" onClick={onClick}>
      <div className="Horizon-row">
        <img className="Horizon" src={thumbnail} alt="" />
        <div className="video-time">{duration}</div>
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
