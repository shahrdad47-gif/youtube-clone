import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import VideoGrid from './components/VideoGrid'
import ShortsShelf from './components/ShortsShelf'
import videos from './data/videos'
import shorts from './data/shorts'

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <VideoGrid videos={videos} />
      <ShortsShelf shorts={shorts} />
    </>
  )
}

export default App
