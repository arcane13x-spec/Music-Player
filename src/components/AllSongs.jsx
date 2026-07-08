import {useMusic} from "../hooks/useMusic";

export const AllSongs = () =>{
    const {allSongs, handlePlaySong, currentTrackIndex} = useMusic();
    return <div className="all-songs"> 
    <h2> All Songs  ({allSongs.length}) </h2> 
    <div className="songs-grid">
        {allSongs.map((song, key)  => (
          <div
             key={key} 
             className={`song-card ${currentTrackIndex === key ? "active" : ""}`}
            onClick={ () => handlePlaySong(song, key)}>
                <div className="song-info">
                    <h3>{song.title}</h3>
                    <p> {song.artist} </p>
                    <span> {song.duration} </span>
                    </div>
                    <div className="play-button">
                        {currentTrackIndex === key ? "♫" : "▶"}
                    </div>
                
                </div>
        ))}

    </div>

    </div>;
};