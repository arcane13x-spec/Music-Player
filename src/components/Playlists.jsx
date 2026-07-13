import { useState } from "react";

export const Playlists = ({music}) =>{

    const[newPlaylistName, setNewPlaylistName] = useState("");
    const[selectedPlaylist, setSelectedPlaylist] =useState(null);
    const[searchQuery, setSearchQuery] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);

    const {playlists, createPlaylist, allSongs, addSongsToPlaylist, currentTrackIndex, setCurrentTrack ,setCurrentTrackIndex, handlePlaySong} = music;

    const filteredSongs = allSongs.filter((song) => {
        const matches = 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||  
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) 

        const isAlreadyInPlaylist = selectedPlaylist?.songs?.some((playlistSong) => playlistSong.id === song.id)||false;

        return matches && !isAlreadyInPlaylist;
    } );

    const handleCreatePlaylist = () => {
        if(newPlaylistName.trim()){
            createPlaylist(newPlaylistName.trim())
            setNewPlaylistName("");
        }
    };
    const handleAddSong = (song) => {
        if(selectedPlaylist){
            addSongsToPlaylist(selectedPlaylist.id, song);
            setSearchQuery("");
            setShowDropDown(false);
        }
    };    

    const handlePlayFromPlaylist = (song) => {
        const globalIndex = allSongs.findIndex((s) => s.id === song.id)
        handlePlaySong(song, globalIndex );
    }

    return <div className="playlists">
        <h2>Playlists</h2>

        <div className="create-playlist">
            <h3>Create New Playlists</h3>
            <div className="playlist-form">
                <input type="text" placeholder="playlist name..." className="playlist-input" onChange={(e) => setNewPlaylistName(e.target.value)} value={newPlaylistName}/>
                <button className="create-btn" onClick={handleCreatePlaylist}>Create</button>
            </div>
        </div>

        <div className="playlists-list">
            {playlists.length === 0 ? (<p className="empty-message">NO Playlists Created Yet</p>) : (
                playlists.map((playlist, key) => (<div className="playlist-item" key={playlist.id}>
                    <div className="playlist-header">
                        <h3>{playlist.name}</h3>
                        <div className="playlists-actions">
                            <button className="delete-playlist-btn">Delete</button>
                            </div>
                    </div>
                    
                   <div className="add-song-section">
                    <div className="search-container">
                        <input type="text" placeholder="Search Songs To Ad..." value={selectedPlaylist?.id === playlist.id ? searchQuery : ""}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setSelectedPlaylist(playlist)
                            setShowDropDown(e.target.value.length > 0);
                        } }
                        onFocus={(e) => {
                            setSearchQuery(e.target.value)
                            setSelectedPlaylist(playlist)
                            setShowDropDown(e.target.value.length > 0);
                        }}
                        className="song-search-input"
                        />

                        {selectedPlaylist?.id === playlist.id && showDropDown &&(
                            <div className="song-dropdown">
                                {filteredSongs.length === 0 ? (<div className="dropdown-item no-result">No Songs Found</div>) :
                                 (filteredSongs.slice(0, 5).map((song,) => (
                                    <div key = {song.id} className="dropdown-item" onClick={() => handleAddSong(song)}>
                                        <span className="song-title">{song.title}</span>
                                        <span className="song-artist">{song.artist}</span>
                                    </div>
                                    ) ))}
                                 </div>
                    ) }
                    </div>
                   </div>
                   <div className="playlist-songs">
                    {playlist.songs.length === 0 ? (
                        <p>No Songs In This Playlist</p>
                    ) : (
                        playlist.songs.map((song, key) => (
                        <div key={key}
                          className={`playlist-song ${
                            currentTrackIndex === 
                            allSongs.findIndex((s) => s.id === song.id) 
                            ? "active" 
                            : ""
                            }`}
                            onClick={() => handlePlayFromPlaylist(song, playlist.id, key)}
                            >
                            <div className="song-info">
                                <span className="song-title">{song.title}</span>
                                <span className="song-artist">{song.artist}</span>
                            </div>
                            <span className="song-duration">{song.duration}</span>
                        </div>
                        ))    
                    )}
                   </div>

                </div>
            )))}
        </div>
    </div>;
};