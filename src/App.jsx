import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import VideoGrid from './components/VideoGrid'
import ShortsShelf from './components/ShortsShelf'
import ShortsPage from './components/ShortsPage'
import SubscriptionsPage from './components/SubscriptionsPage'
import YouPage from './components/YouPage'
import videos from './data/videos'
import shorts from './data/shorts'

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activePage, setActivePage] = useState("home");

  return (
    <>
      <Header onToggleSidebar={() => setSidebarExpanded(prev => !prev)} />
      <Sidebar
        expanded={sidebarExpanded}
        onClose={() => setSidebarExpanded(false)}
        activePage={activePage}
        onNavigate={setActivePage}
      />
      {activePage === "home" && (
        <>
          <VideoGrid videos={videos} />
          <ShortsShelf shorts={shorts} />
        </>
      )}
      {activePage === "shorts" && <ShortsPage />}
      {activePage === "subscriptions" && <SubscriptionsPage />}
      {activePage === "you" && <YouPage />}
    </>
  )
}

export default App
