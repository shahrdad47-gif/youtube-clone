import VideoGrid from './VideoGrid';

function SearchResults({ query, videos, shorts, channels, onVideoClick, onChannelClick, onShortClick }) {
  const q = query.toLowerCase();

  const matchedChannels = channels.filter(
    c => c.name.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q)
  );

  const matchedVideos = videos.filter(
    v => v.title.toLowerCase().includes(q) || v.author.toLowerCase().includes(q)
  );

  const matchedShorts = shorts.filter(
    s => s.title.toLowerCase().includes(q)
  );

  const noResults = matchedChannels.length === 0 && matchedVideos.length === 0 && matchedShorts.length === 0;

  return (
    <div className="search-results">
      {noResults && (
        <div className="search-no-results">
          <p>No results found for "<strong>{query}</strong>"</p>
          <p>Try different keywords or check your spelling</p>
        </div>
      )}

      {matchedChannels.length > 0 && (
        <div className="search-section">
          <h2 className="search-section-title">Channels</h2>
          <div className="search-channels-row">
            {matchedChannels.map(channel => (
              <div
                key={channel.id}
                className="search-channel-card"
                onClick={() => onChannelClick(channel)}
              >
                <img className="search-channel-avatar" src={channel.avatar} alt="" />
                <div className="search-channel-info">
                  <p className="search-channel-name">{channel.name}</p>
                  <p className="search-channel-handle">{channel.handle}</p>
                  <p className="search-channel-subs">{channel.subscriberCount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {matchedVideos.length > 0 && (
        <div className="search-section">
          <h2 className="search-section-title">Videos</h2>
          <VideoGrid videos={matchedVideos} onVideoClick={onVideoClick} />
        </div>
      )}

      {matchedShorts.length > 0 && (
        <div className="search-section">
          <h2 className="search-section-title">Shorts</h2>
          <div className="search-shorts-row">
            {matchedShorts.map((short, index) => (
              <div
                key={short.id}
                className="short-card"
                onClick={() => onShortClick(matchedShorts, index)}
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
    </div>
  );
}

export default SearchResults;
