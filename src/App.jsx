import {MusicPlayer} from "./components/MusicPlayer";
import { BrowserRouter, Routes, Route  } from "react-router"; 
import { Playlists } from "./components/Playlists";
import { AllSongs } from "./components/AllSongs";


function App() {
  return (
    <BrowserRouter>
    <div className="app">
    {/* { <Navbar />} */}
    <main className="app-main">
      <div className="player-section"></div>
      <div className="content-section">
      <Routes>
      <Route path="/" element ={<AllSongs />} />
      <Route path="/playlists" element ={<Playlists />} />
      </Routes>
      </div>
      <MusicPlayer />
    </main>
     </div>
     </BrowserRouter>
  );
}

export default App
