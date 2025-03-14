import * as Playlist from "./Playlist.js";
import * as Song from "./Song.js";

const hamMenu = document.querySelector("#hamburgerMenuSection");
const hamMenuBtn = document.querySelector("#hamburgerMenuBtn");

// function to display hamburger menu
export function showHamburgerMenu() {
    hamMenu.style.display = "block";
    setTimeout(() => {
        hamMenu.style.opacity = 1;
    });
}

// function to hide hamburger menu
export function hideHamburgerMenu() {
    hamMenu.style.opacity = 0;
    setTimeout(() => {
        hamMenu.style.display = "none";
    }, 200);
}

//activate the playlist play button once the html loads
document.addEventListener("DOMContentLoaded", Playlist.activatePlaylistPlayBtns);

// show all songs when box icon of the navigation bar is clicked
document.querySelector("#showAllSongsBtn").addEventListener("click", Song.handleShowAllSongs);

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

// hide the ham menu if clicked outside it
document.addEventListener("click", function (event) {
    const clickedElement = event.target;

    // if the menu does NOT contains the clicked element AND the clicked element is NOT the menu button. Then hide the menu
    if (!hamMenu.contains(clickedElement) && !hamMenuBtn.contains(clickedElement)) {
        hamMenu.style.display = "none";
    }
});

// display the hamburger menu
hamMenuBtn.addEventListener("click", showHamburgerMenu);

// display playlist section in mobile
document.querySelector("#yourLibBtn").addEventListener("click", Playlist.showPlaylistsInMobile);

// show all songs in mobile
document.querySelector("#allSongsBtn").addEventListener("click", Song.handleShowAllSongs);

