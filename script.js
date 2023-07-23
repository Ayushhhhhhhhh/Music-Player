const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const audio = document.querySelector("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Karan Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Karan Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Karan Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Karan Design",
  },
];

isplaying = false;

function playSong() {
  audio.play();
  play.classList.replace("fa-play", "fa-pause");
  play.setAttribute("title", "Pause");
  isplaying = true;
}

function pauseSong() {
  audio.pause();
  play.classList.replace("fa-pause", "fa-play");
  play.setAttribute("title", "Play");
  isplaying = false;
}

play.addEventListener("click", () => (isplaying ? pauseSong() : playSong()));

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

loadSong(songs[songIndex]);

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

prev.addEventListener("click", prevSong);

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

next.addEventListener("click", nextSong);

function updateProgressBar(e) {
  const { duration, currentTime } = e.target;
  if (isplaying) {
    progress.style.width = `${(currentTime / duration) * 100}%`;
  }
  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }
  if (durationSeconds) {
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }
  const currentTimeMinutes = Math.floor(currentTime / 60);
  let currentTimeSeconds = Math.floor(currentTime % 60);
  if (currentTimeSeconds < 10) {
    currentTimeSeconds = `0${currentTimeSeconds}`;
  }
  currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
}

audio.addEventListener("timeupdate", updateProgressBar);

function setProgressBar(e) {
  console.log(e);
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener("click", setProgressBar);

audio.addEventListener("ended", nextSong);
