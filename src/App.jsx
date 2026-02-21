import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import VideoGrid from './components/VideoGrid'
import ShortsShelf from './components/ShortsShelf'
import ShortsPage from './components/ShortsPage'
import SubscriptionsPage from './components/SubscriptionsPage'
import YouPage from './components/YouPage'
import UploadModal from './components/UploadModal'
import VideoPlayer from './components/VideoPlayer'
import ShortsPlayer from './components/ShortsPlayer'
import SearchResults from './components/SearchResults'
import ChannelPage from './components/ChannelPage'
import SignInPage from './components/SignInPage'
import staticVideos from './data/videos'
import staticShorts from './data/shorts'
import channels from './data/channels'

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [videos, setVideos] = useState(staticVideos);
  const [shorts, setShorts] = useState(staticShorts);
  const [showUpload, setShowUpload] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentShort, setCurrentShort] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentChannel, setCurrentChannel] = useState(null);
  const [user, setUser] = useState(null);

  const fetchVideos = useCallback(() => {
    fetch('/api/videos?shorts=false')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setVideos(data.map(v => ({
            id: v._id,
            thumbnail: v.thumbnailUrl,
            duration: v.duration,
            profilePic: v.author?.avatar || '',
            title: v.title,
            author: v.author?.username || 'Unknown',
            authorAvatar: v.author?.avatar || '',
            stats: `${formatViews(v.views)} views`,
            videoUrl: v.videoUrl,
            description: v.description,
            views: v.views,
          })));
        }
      })
      .catch(() => {});

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

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
  };

  const handleShortClick = (shortsArray, index) => {
    setCurrentShort({ shorts: shortsArray, startIndex: index });
  };

  const handleUploadSuccess = () => {
    setShowUpload(false);
    fetchVideos();
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const res = await fetch(`/api/videos/${videoId}`, { method: 'DELETE' });
      if (res.ok) fetchVideos();
    } catch (err) {}
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActivePage("search");
    setCurrentChannel(null);
    setCurrentVideo(null);
  };

  const handleLogoClick = () => {
    setActivePage("home");
    setSearchQuery('');
    setCurrentChannel(null);
    setCurrentVideo(null);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    setSearchQuery('');
    setCurrentChannel(null);
    setCurrentVideo(null);
  };

  const handleChannelClick = (channel) => {
    setCurrentChannel(channel);
    setSearchQuery('');
    setActivePage("channel");
  };

  if (currentVideo) {
    return (
      <>
        <Header
          onToggleSidebar={() => setSidebarExpanded(prev => !prev)}
          onUploadClick={() => setShowUpload(true)}
          onSearch={handleSearch}
          onLogoClick={handleLogoClick}
          onChannelClick={handleChannelClick}
          videos={videos}
          channels={channels}
          user={user}
          onSignIn={setUser}
          onSignInClick={() => setActivePage("signin")}
        />
        <VideoPlayer video={currentVideo} onBack={() => setCurrentVideo(null)} />
      </>
    );
  }

  return (
    <>
      <Header
        onToggleSidebar={() => setSidebarExpanded(prev => !prev)}
        onUploadClick={() => setShowUpload(true)}
        onSearch={handleSearch}
        onLogoClick={handleLogoClick}
        onChannelClick={handleChannelClick}
        videos={videos}
        channels={channels}
        user={user}
        onSignIn={setUser}
        onSignInClick={() => setActivePage("signin")}
      />
      <Sidebar
        expanded={sidebarExpanded}
        onClose={() => setSidebarExpanded(false)}
        activePage={activePage}
        onNavigate={handleNavigate}
      />
      {activePage === "signin" && (
        <SignInPage
          onSignIn={(userData) => { setUser(userData); setActivePage("home"); }}
          onBack={() => setActivePage("home")}
        />
      )}
      {activePage === "home" && (
        <>
          <VideoGrid videos={videos} onVideoClick={handleVideoClick} onDeleteVideo={handleDeleteVideo} />
          <ShortsShelf shorts={shorts} onShortClick={(index) => handleShortClick(shorts, index)} />
        </>
      )}
      {activePage === "shorts" && <ShortsPage onShortClick={handleShortClick} />}
      {activePage === "subscriptions" && <SubscriptionsPage />}
      {activePage === "you" && <YouPage />}

      {activePage === "search" && (
        <SearchResults
          query={searchQuery}
          videos={videos}
          shorts={shorts}
          channels={channels}
          onVideoClick={handleVideoClick}
          onChannelClick={handleChannelClick}
          onShortClick={handleShortClick}
        />
      )}

      {activePage === "channel" && currentChannel && (
        <ChannelPage
          channel={currentChannel}
          videos={videos}
          shorts={shorts}
          onBack={handleLogoClick}
          onVideoClick={handleVideoClick}
          onShortClick={handleShortClick}
        />
      )}

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onSuccess={handleUploadSuccess}
        />
      )}

      {currentShort && (
        <ShortsPlayer
          shorts={currentShort.shorts}
          startIndex={currentShort.startIndex}
          onClose={() => setCurrentShort(null)}
        />
      )}
    </>
  )
}

function formatViews(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(num >= 10_000_000 ? 0 : 1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(num >= 10_000 ? 0 : 1)}k`;
  return String(num);
}

export default App
