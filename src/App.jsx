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
import staticVideos from './data/videos'
import staticShorts from './data/shorts'

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [videos, setVideos] = useState(staticVideos);
  const [shorts, setShorts] = useState(staticShorts);
  const [showUpload, setShowUpload] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

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

  const handleUploadSuccess = () => {
    setShowUpload(false);
    fetchVideos();
  };

  if (currentVideo) {
    return (
      <>
        <Header
          onToggleSidebar={() => setSidebarExpanded(prev => !prev)}
          onUploadClick={() => setShowUpload(true)}
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
      />
      <Sidebar
        expanded={sidebarExpanded}
        onClose={() => setSidebarExpanded(false)}
        activePage={activePage}
        onNavigate={setActivePage}
      />
      {activePage === "home" && (
        <>
          <VideoGrid videos={videos} onVideoClick={handleVideoClick} />
          <ShortsShelf shorts={shorts} />
        </>
      )}
      {activePage === "shorts" && <ShortsPage />}
      {activePage === "subscriptions" && <SubscriptionsPage />}
      {activePage === "you" && <YouPage />}

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onSuccess={handleUploadSuccess}
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
