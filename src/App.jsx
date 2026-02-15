import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import VideoGrid from './components/VideoGrid'
import ShortsShelf from './components/ShortsShelf'
import videos from './data/videos'
import shorts from './data/shorts'

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <>
      <Header onToggleSidebar={() => setSidebarExpanded(prev => !prev)} />
      <Sidebar expanded={sidebarExpanded} onClose={() => setSidebarExpanded(false)} />
      <VideoGrid videos={videos} />
      <ShortsShelf shorts={shorts} />
    </>
  )
}

export default App
