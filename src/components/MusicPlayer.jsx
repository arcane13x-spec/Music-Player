import { useMusic } from "../hooks/useMusic";
import { useEffect } from "react";
import { useRef } from "react";


export const MusicPlayer = () =>{
    const {currentTrack, 
        formatTime, 
        currentTime,
        duration, 
        setDuration, 
        setCurrentTime,
        nextTrack,
        prevTrack,
        isPlaying,
        pause,
        play
     } = useMusic();
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;
        if(isPlaying){
            audio
        }


    } ,[isPlaying]);
    
    useEffect(() =>{
        const audio = audioRef.current;
        if(!audio) return;

        const handleLoadedMetadata = () => {
             console.log("Duration:", audio.duration);
            setDuration(audio.duration);
            

        };
        const handleLoadedUpdate = () => {};
        const handleEnded = () => {};


       audio.addEventListener("loadedmetadata", handleLoadedMetadata);

       return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
       };
    }, [setDuration,currentTrack]);


    return(
    <div className="music-player">
        <audio ref={audioRef} src={currentTrack.url} preload="metadata" crossOrigin="anonymous"/>

        <div className="track-info">
            <h3 className="track-title">`${currentTrack.title}`` </h3>
            <p className="track-artist"> `${currentTrack.artist}` </p>
        </div>
        <div className="progress-container">
            <span className="time">{formatTime(currentTime)}</span>
            <input type="range" min="0" max={duration || 0} step="0.1"
             value={currentTime || 0 } 
             className="progress-bar"
             style={{}} 
             />
            <span className="time">{formatTime(duration)}</span>
            

            <div className="controls">
                <button className="control-btn" onClick={prevTrack}>⏮</button>
                 <button className="control-btn play-btn" 
                 onClick={() => isPlaying ? pause() : play()}>{isPlaying ? "⏸" : "▶"}</button>
                <button className="control-btn" onClick={nextTrack}>⏭</button>
            </div>

        </div>
         </div>
    );
};