import { useState } from 'react';
import VideoGrid from './VideoGrid';

function ChannelPage({ channel, videos, shorts, onBack, onVideoClick, onShortClick }) {
  const [activeTab, setActiveTab] = useState('home');
  const [descExpanded, setDescExpanded] = useState(false);

  const channelVideos = videos.filter(v => v.author === channel.name);
  const channelShorts = shorts.filter(s => s.title.toLowerCase().includes(channel.name.toLowerCase()));

  // For Corgi Kingdom, match shorts by corgi keyword since shorts don't have author field
  const corgiShorts = channel.name === "Corgi Kingdom"
    ? shorts.filter(s => s.title.toLowerCase().includes("corgi"))
    : channelShorts;

  const displayShorts = corgiShorts.length > 0 ? corgiShorts : channelShorts;

  const featuredVideo = channelVideos.length > 0 ? channelVideos[0] : null;
  const remainingVideos = channelVideos.slice(1);

  const tabs = ['home', 'videos', 'shorts', 'playlists', 'community'];

  return (
    <div className="channel-page">
      <button className="channel-back-btn" onClick={onBack}>
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="#fff" d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z" />
        </svg>
        Back
      </button>

      <div className="channel-banner">
        <img src={channel.banner} alt="" />
      </div>

      <div className="channel-header">
        <img className="channel-header-avatar" src={channel.avatar} alt="" />
        <div className="channel-header-info">
          <div className="channel-header-top-row">
            <h1 className="channel-header-name">{channel.name}</h1>
            <button className="channel-subscribe-btn">Subscribe</button>
          </div>
          <p className="channel-header-meta">
            {channel.handle} · {channel.subscriberCount} · {channelVideos.length} video{channelVideos.length !== 1 ? 's' : ''}
          </p>
          <p className={`channel-header-desc ${descExpanded ? 'expanded' : ''}`}>
            {channel.description}
            {!descExpanded && (
              <span className="channel-desc-more" onClick={() => setDescExpanded(true)}>...more</span>
            )}
          </p>
          {descExpanded && (
            <span className="channel-desc-less" onClick={() => setDescExpanded(false)}>Show less</span>
          )}
        </div>
      </div>

      <div className="channel-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`channel-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="channel-content">
        {activeTab === 'home' && (
          <>
            {featuredVideo && (
              <div className="channel-featured-video" onClick={() => onVideoClick(featuredVideo)}>
                <div className="channel-featured-thumbnail">
                  <img src={featuredVideo.thumbnail} alt="" />
                  <div className="video-time">{featuredVideo.duration}</div>
                </div>
                <div className="channel-featured-info">
                  <p className="channel-featured-title">{featuredVideo.title}</p>
                  <p className="channel-featured-stats">{featuredVideo.stats}</p>
                </div>
              </div>
            )}
            {remainingVideos.length > 0 && (
              <div className="channel-video-grid">
                <VideoGrid videos={remainingVideos} onVideoClick={onVideoClick} hideProfilePic />
              </div>
            )}
            {displayShorts.length > 0 && (
              <div className="channel-shorts-section">
                <h2 className="search-section-title">Shorts</h2>
                <div className="search-shorts-row">
                  {displayShorts.map((short, index) => (
                    <div
                      key={short.id}
                      className="short-card"
                      onClick={() => onShortClick(displayShorts, index)}
                    >
                      <div className="short-thumbnail-container">
                        <img className="short-thumbnail" src={short.thumbnail} alt="" />
                        <div className="short-title-overlay">
                          <p className="short-title">{short.title}</p>
                          <p className="short-views">{short.views}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!featuredVideo && displayShorts.length === 0 && (
              <p className="channel-empty">No content yet</p>
            )}
          </>
        )}

        {activeTab === 'videos' && (
          <>
            {channelVideos.length > 0 ? (
              <div className="channel-video-grid">
                <VideoGrid videos={channelVideos} onVideoClick={onVideoClick} hideProfilePic />
              </div>
            ) : (
              <p className="channel-empty">No videos yet</p>
            )}
          </>
        )}

        {activeTab === 'shorts' && (
          <>
            {displayShorts.length > 0 ? (
              <div className="search-shorts-row">
                {displayShorts.map((short, index) => (
                  <div
                    key={short.id}
                    className="short-card"
                    onClick={() => onShortClick(displayShorts, index)}
                  >
                    <div className="short-thumbnail-container">
                      <img className="short-thumbnail" src={short.thumbnail} alt="" />
                      <div className="short-title-overlay">
                        <p className="short-title">{short.title}</p>
                        <p className="short-views">{short.views}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="channel-empty">No shorts yet</p>
            )}
          </>
        )}

        {activeTab === 'playlists' && (
          <p className="channel-empty">No playlists yet</p>
        )}

        {activeTab === 'community' && (
          <p className="channel-empty">No community posts yet</p>
        )}
      </div>
    </div>
  );
}

export default ChannelPage;
