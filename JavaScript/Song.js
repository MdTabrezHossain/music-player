import * as Data from "./Data.js";
import { hideHamburgerMenu } from "./Index.js";
import * as Playlist from "./Playlist.js";

export const songPlayBtn = document.querySelector("#songPlayBtn");
let songPlayBtnId;
let audioBtnId;
export const currentSong = document.querySelector("#currentSong");
const songDuration = document.querySelector("#songDuration");
const playBar = document.querySelector("#playBar");
export const durationPlayed = document.querySelector("#durationPlayed");
export const volBtn = document.querySelector("#volBtn");
export const timeLineBar = document.querySelector("#timeLineBar");
let currentSongNumber;


// function to add functionality to song play buttons in the song cards of the playlists
export function activateSongPlayBtns() {
    let songCount = Playlist.selectedPlaylist.length;
    for (let i = 1; i <= songCount; i++) {
        let songPlayBtnId = `#playBtnSong${i}`;
        document.querySelector(songPlayBtnId).addEventListener("click", handleSongPlayBtnClick);
    }
}


// function to handle the song when play button is clicked
function handleSongPlayBtnClick(event) {
    songPlayBtnId = event.target.id;
    currentSongNumber = Number(songPlayBtnId.slice(11));
    audioBtnId = `#song${currentSongNumber}`;
    currentSong.src = document.querySelector(audioBtnId).src;
    currentSong.addEventListener('loadedmetadata', () => {
        currentSong.play();
        showPlayBar(currentSongNumber);
    });
}


// function to show the playBar
function showPlayBar() {
    //display the song name
    let selectedSong = Playlist.selectedPlaylist[currentSongNumber - 1];
    document.querySelector("#currentSongName").textContent = `${selectedSong.songName} - ${selectedSong.artistName}`;

    songDuration.textContent = convertDuration(currentSong.duration);   //display the song duration
    currentSong.volume = document.querySelector("#volumeBar").value;    //set the volume
    if (window.getComputedStyle(playBar).visibility === "hidden") {
        playBar.style.visibility = "visible";
    }
}


// function to convert duration into minute:seconds string
export function convertDuration(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}


// function to toggle the play-pause icon when the song stars or end
export function handleSongStartEnd() {
    if (currentSong.ended) {
        songPlayBtn.classList.remove("fa-circle-pause");
        songPlayBtn.classList.add("fa-circle-play");
    } else if (!currentSong.paused) {
        songPlayBtn.classList.remove("fa-circle-play");
        songPlayBtn.classList.add("fa-circle-pause");
    }
}


// function to play and pause the song from the playBar once selected
export function playPauseSong(event) {
    const btn = event.target;
    if (currentSong.paused) {
        currentSong
            .play()
            .then(() => {
                btn.classList.remove("fa-circle-play");
                btn.classList.add("fa-circle-pause");
            })
            .catch((error) => {
                if (error.name === "NotSupportedError") {
                    alert("Song not found!");
                }
                else { alert(error) };
            })
    } else {
        currentSong.pause();
        btn.classList.remove("fa-circle-pause");
        btn.classList.add("fa-circle-play");
    }
}


// function to change the song volume
export function changeVolume(event) {
    currentSong.volume = Number(event.target.value);
    if (currentSong.volume === 0) {
        volBtn.classList.remove("fa-volume-high");
        volBtn.classList.add("fa-volume-off");
    }
    else if (currentSong.volume <= 0.33) {
        volBtn.classList.remove("fa-volume-off");
        volBtn.classList.remove("fa-volume-high");
        volBtn.classList.add("fa-volume-low");
    }
    else {
        volBtn.classList.remove("fa-volume-off");
        volBtn.classList.add("fa-volume-high");
    }
}


// function to mute-unmute the song
export function toggleSongSound(event) {
    if (!currentSong.muted) {
        currentSong.muted = true;
        event.target.classList.remove("fa-volume-high");
        event.target.classList.add("fa-volume-xmark");
    }
    else {
        currentSong.muted = false;
        event.target.classList.remove("fa-volume-xmark");
        if (currentSong.volume <= 0.33) {
            event.target.classList.add("fa-volume-low");
        }
        else {
            event.target.classList.add("fa-volume-high");
        }
    }
}


// function to jump to a particular moment of the song
export function changeSongCurrentTime() {
    currentSong.currentTime = (timeLineBar.value) / 100 * currentSong.duration;
}


// funtion to play the previous song of the playlist
export function prevSong() {
    if ((currentSongNumber - 2) > -1) {
        currentSongNumber--;
        currentSong.src = Playlist.selectedPlaylist[(currentSongNumber - 1)].songUrl;
        currentSong.play();
        currentSong.addEventListener("loadedmetadata", () => {
            showPlayBar(currentSongNumber);
        });
    }
}


// funtion to play the previous song of the playlist
export function nextSong() {
    if (currentSongNumber <= Playlist.selectedPlaylist.length - 1) {
        currentSongNumber++;
        currentSong.src = Playlist.selectedPlaylist[(currentSongNumber - 1)].songUrl;
        currentSong.play();
        currentSong.addEventListener("loadedmetadata", () => {
            showPlayBar(currentSongNumber);
        });
    }
}


// function to close the song
export function closeSong() {
    currentSong.src = "";
    if (window.getComputedStyle(playBar).visibility === "visible") {
        playBar.style.visibility = "hidden";
    }
}


// function to show all songs
export function showAllSongs() {
    let allSongs = [];
    Data.playlists.forEach((playlists) => {
        playlists.forEach((songObject) => {
            allSongs.push(songObject);
        });
    });
    Playlist.setSelectedPlaylistName("All Songs");
    Playlist.clearSelectedPlaylist();
    Playlist.selectedPlaylist.push(...allSongs);
    Playlist.showPlaylist(allSongs, Playlist.selectedPlaylistName);
    setTimeout(activateSongPlayBtns, 1000);
}


// function to search songs
export function searchSongs(event) {
    setTimeout(() => {
        Playlist.clearPlaylist();
        let searchedSongName = event.target.value.toLowerCase();

        if (searchedSongName) {
            let searchResultSongs = [];
            Data.playlists.forEach((playlist) => {
                playlist.forEach((songObject) => {
                    if (songObject.songName.toLowerCase().startsWith(searchedSongName)) {
                        searchResultSongs.push(songObject);
                    }
                });
            });
            Playlist.showPlaylist(searchResultSongs, "Search Results");
            setTimeout(activateSongPlayBtns, 1000);
        }
    }, 0);
}

// function to handle showAllSongs() according to device
export function handleShowAllSongs() {
    if (window.innerWidth <= 640) {
        hideHamburgerMenu();
        document.querySelector("#playlistSection").style.display = "none";
        document.querySelector("#playlistSection").style.opacity = 0;
        document.querySelector("#songsSection").style.display = "flex";
        document.querySelector("#songsSection").style.opacity = 1;
        showAllSongs();
        return;
    }
    showAllSongs();
}