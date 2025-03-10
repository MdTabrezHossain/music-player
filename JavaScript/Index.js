import * as Playlist from "./Playlist.js";
import * as Song from "./Song.js";


//activate the playlist play button once the html loads
document.addEventListener("DOMContentLoaded", Playlist.activatePlaylistPlayBtns);

// show all songs when box icon of the navigation bar is clicked
document.querySelector("#showAllSongsBtn").addEventListener("click", Song.showAllSongs);

// play the song
Song.songPlayBtn.addEventListener("click", Song.playPauseSong);

// change the play-pause icon accordingly when the song starts and ends
Song.currentSong.addEventListener("play", Song.handleSongStartEnd);
Song.currentSong.addEventListener("ended", Song.handleSongStartEnd);

// update the time of the song played in real time
Song.currentSong.addEventListener("timeupdate", () => {
    Song.durationPlayed.textContent = Song.convertDuration(currentSong.currentTime);
});

// update the timeline bar in real time as when the song is playing
Song.currentSong.addEventListener("timeupdate", () => {
    Song.timeLineBar.value = (currentSong.currentTime / currentSong.duration) * 100;
});

// changing the song volume
document.querySelector("#volumeBar").addEventListener("change", Song.changeVolume);

// mute the song
Song.volBtn.addEventListener("click", Song.toggleSongSound);

// jump to a particular instance of the song
Song.timeLineBar.addEventListener("change", Song.changeSongCurrentTime);

// play the previous song of the playlist
document.querySelector("#prevBtn").addEventListener("click", Song.prevSong);

// play the next song of the playlist
document.querySelector("#nextBtn").addEventListener("click", Song.nextSong);

// close the song
document.querySelector("#closeSongBtn").addEventListener("dblclick", Song.closeSong);

// search song when user types in the searchbar
document.querySelector("#searchInput").addEventListener("keydown", Song.searchSongs);