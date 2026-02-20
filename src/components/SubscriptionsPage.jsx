import VideoCard from './VideoCard';
import videos from '../data/videos';

const channels = [
  { name: "All", active: true },
  { name: "MrBeast", avatar: "https://i.pravatar.cc/48?img=12" },
  { name: "TechVault", avatar: "https://i.pravatar.cc/48?img=33" },
  { name: "GamersUnite", avatar: "https://i.pravatar.cc/48?img=47" },
  { name: "CookingPro", avatar: "https://i.pravatar.cc/48?img=58" },
];

function SubscriptionsPage() {
  return (
    <div className="subscriptions-page">
      <div className="subscriptions-chips">
        {channels.map((ch) => (
          <button
            className={`subscriptions-chip ${ch.active ? 'active' : ''}`}
            key={ch.name}
          >
            {ch.avatar && (
              <img className="subscriptions-chip-avatar" src={ch.avatar} alt="" />
            )}
            <span>{ch.name}</span>
          </button>
        ))}
      </div>

      <h2 className="subscriptions-section-title">Latest</h2>

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
    </div>
  );
}

export default SubscriptionsPage;
