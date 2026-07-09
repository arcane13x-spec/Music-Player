import {MusicPlayer} from "./components/MusicPlayer";
import { BrowserRouter, Routes, Route  } from "react-router"; 
import { Playlists } from "./components/Playlists";
import { AllSongs } from "./components/AllSongs";
import { useMusic } from "./hooks/useMusic";
import { Navbar } from "./components/Navbar";


function App() {

  const music = useMusic();
  return (
    <BrowserRouter>
    <div className="app">
    { <Navbar />}
    <main className="app-main">
      <div className="player-section"></div>
      <div className="content-section">
      <Routes>
      <Route path="/" element ={<AllSongs music={music} />} />
      <Route path="/playlists" element ={<Playlists music={music} />} />
      </Routes>
      </div>
      <MusicPlayer  music={music} />
    </main>
     </div>
     </BrowserRouter>
  );
}

export default App
