import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import VideoGrid from './components/VideoGrid'
import videos from './data/videos'

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <VideoGrid videos={videos} />
    </>
  )
}

export default App
