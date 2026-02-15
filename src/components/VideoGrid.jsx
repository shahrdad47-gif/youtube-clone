import VideoCard from "./VideoCard";

function VideoGrid({ videos }) {
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
        />
      ))}
    </div>
  );
}

export default VideoGrid;
