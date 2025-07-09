const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const time = document.getElementById("time");
const playlistDiv = document.getElementById("playlist");
const createPlaylistBtn = document.getElementById("createPlaylistBtn");
const userPlaylists = document.getElementById("userPlaylists");

const songs = [
  { title: "On & On", artist: "Cartoon ft. Daniel Levi", src: "songs/song1.mp3" },
  { title: "Sky High", artist: "Elektronomia", src: "songs/song2.mp3" },
  { title: "Fade", artist: "Alan Walker", src: "songs/song3.mp3" }
];

let currentSong = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  document.querySelectorAll(".playlist-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  const format = (s) => `${Math.floor(s / 60)}:${("0" + Math.floor(s % 60)).slice(-2)}`;
  time.textContent = `${format(audio.currentTime)} / ${format(audio.duration)}`;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Show default playlist
songs.forEach((song, index) => {
  const item = document.createElement("div");
  item.className = "playlist-item";
  item.textContent = `${song.title} - ${song.artist}`;
  item.addEventListener("click", () => {
    currentSong = index;
    loadSong(currentSong);
    playSong();
  });
  playlistDiv.appendChild(item);
});

// Create custom playlist
let playlistCount = 1;
createPlaylistBtn.addEventListener("click", () => {
  const name = prompt("Enter playlist name:");
  if (name) {
    const div = document.createElement("div");
    div.textContent = `📂 ${name}`;
    div.className = "playlist-item";
    userPlaylists.appendChild(div);
  }
});

loadSong(currentSong);
