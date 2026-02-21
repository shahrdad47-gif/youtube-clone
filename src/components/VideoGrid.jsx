import VideoCard from "./VideoCard";

function VideoGrid({ videos, onVideoClick, hideProfilePic, onDeleteVideo }) {
  return (
    <div className="Video-grid">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          thumbnail={video.thumbnail}
          duration={video.duration}
          profilePic={video.profilePic}
          title={video.title}
          author={video.author}
          stats={video.stats}
          videoUrl={video.videoUrl}
          hideProfilePic={hideProfilePic}
          onClick={() => onVideoClick && onVideoClick(video)}
          onDelete={onDeleteVideo && typeof video.id === 'string' ? () => onDeleteVideo(video.id) : undefined}
        />
      ))}
    </div>
  );
}

export default VideoGrid;
