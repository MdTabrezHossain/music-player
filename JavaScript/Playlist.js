import * as Data from "./Data.js";
import * as Song from "./Song.js";

const songContainer = document.querySelector(".songContainer");
let playlistNameSpan = document.querySelector("#playlistNameSpan");

export let selectedPlaylist = [];
export let selectedPlaylistNumber = 0;
export let selectedPlaylistName = "";


export function setSelectedPlaylistName(name) {
    selectedPlaylistName = name;
}


export function clearSelectedPlaylist() {
    selectedPlaylist = [];
}


// function to add functionality to playlist play buttons
export function activatePlaylistPlayBtns() {
    for (let i = 1; i <= 3; i++) {
        const playlistPlayBtnId = `#playBtnPlaylist${i}`
        document.querySelector(playlistPlayBtnId).addEventListener("mouseover", handlePlaylistPlayBtnMouseOver);
        document.querySelector(playlistPlayBtnId).addEventListener("mouseout", handlePlaylistPlayBtnMouseOut);
        document.querySelector(playlistPlayBtnId).addEventListener("click", handlePlaylistPlayBtnClick);
    }
}


//function to show the playlist songs on the screen
export function showPlaylist(playlist, name) {
    playlistNameSpan.textContent = name;
    songContainer.innerHTML = "";
    createSongCards(playlist);

    const songCards = document.querySelectorAll(".songCard");
    songCards.forEach((card) => {
        setTimeout(() => {
            card.style.opacity = 1;
        }, 200);
    });
}


// function to create song cards
function createSongCards(playlist) {
    let cardNumber = 1;
    playlist.forEach(songObject => {
        const div = document.createElement("div");
        div.className = "songCard flex pad1em borderRad";
        div.innerHTML =
            `<img src="${songObject.thumbnailUrl}" alt="Thumbnail">
        <img src="../Icons/icons8-circled-play-48.png" class="cursorPointer" id="playBtnSong${cardNumber}">
        <span>${songObject.songName}</span>
        <span class="artistName">${songObject.artistName}</span>
        <audio src="${songObject.songUrl}" id="song${cardNumber}"></audio>`;
        songContainer.append(div);
        cardNumber++;
    });
}


// function to show playlist songs on mouse over
function handlePlaylistPlayBtnMouseOver(event) {
    let playlistPlayBtnId = event.target.id;
    let playlistNumber = Number(playlistPlayBtnId.slice(-1))
    let playlist = Data.playlists[playlistNumber - 1];
    let playlistName = Data.playlistsNames[playlistNumber - 1];
    showPlaylist(playlist, playlistName);
}


// function to remove the playlist songs from the screen mouse out
function handlePlaylistPlayBtnMouseOut() {
    clearPlaylist();
    if (selectedPlaylist) {
        // console.log(selectedPlaylist);
        showPlaylist(selectedPlaylist, selectedPlaylistName);
        setTimeout(Song.activateSongPlayBtns, 500);
    }
}


// function to clear the playlist songs from the screen
export function clearPlaylist() {
    if (selectedPlaylistName === "") {
        selectedPlaylistName = "Select a Playlist";
    }

    songContainer.innerHTML = "";
}


// function to show playlist songs when playlist play button is clicked
function handlePlaylistPlayBtnClick(event) {
    let playlistPlayBtnId = event.target.id;
    selectedPlaylistNumber = Number(playlistPlayBtnId.slice(-1))
    selectedPlaylist = Data.playlists[selectedPlaylistNumber - 1];
    selectedPlaylistName = Data.playlistsNames[selectedPlaylistNumber - 1];
    showPlaylist(selectedPlaylist, selectedPlaylistName);
    setTimeout(Song.activateSongPlayBtns, 500);
}

// function to display hamburger menu in mobile
export function showPlaylistInMobile() {
    document.querySelector("#playlistSection").style.display = "block";
    setTimeout(() => {
        document.querySelector("#playlistSection").style.opacity = 1;
    });

    document.querySelector("#songsSection").style.display = "none";
}
