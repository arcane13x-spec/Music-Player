import {useMusic} from "../hooks/useMusic";

export const AllSongs = ({ music }) =>{
    const {allSongs, handlePlaySong, currentTrackIndex} = music;
    return <div className="all-Songs"> 
    <h2> All Songs  ({allSongs.length}) </h2> 
    <div className="Songs-grid">
        {allSongs.map((song, index)  => (
          <div
             key={song.id} 
             className={`song-card ${currentTrackIndex === index ? "active" : ""}`}
            onClick={ () => handlePlaySong(song, index)}>
                <div className="song-info">
                    <h3>{song.title}</h3>
                    <p> {song.artist} </p>
                    <span> {song.duration} </span>
                    </div>
                    <div className="play-button">
                        {currentTrackIndex === index ? "♫" : "▶"}
                    </div>
                
                </div>
        ))}

    </div>

    </div>;
};