let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img:
      "https://storage.googleapis.com/thangs-thumbnails/production/9467e194-07ec-45b6-8f30-e4be5ec9797a/Cyber_Skull.png",
    name: "True Men D...",
    artist: "Red Hot Chilli Pepper",
    music:
      "musica/Red Hot Chili Peppers - True Men Don't Kill Coyotes (2002 Digital Remaster).mp3"
  },
  {
    img:
      "https://cdn.myportfolio.com/b23d902d-104a-420a-ac6b-32e83b4e3e9c/de8ade4e-40e4-4395-adad-6503d35c8d46_rwc_55x0x767x600x767.gif?h=18ec181923bcd81400ea3e48a85d9398",
    name: "Dont Forget Me",
    artist: "Red Hot Chilli Peppers",
    music: "musica/Red Hot Chili Peppers - Don't Forget Me (1).mp3"
  },
  {
    img:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif",
    name: "This Velvet Glove",
    artist: "Red Hot Chilli Peppers",
    music: "musica/Red Hot Chili Peppers - This Velvet Glove.mp3"
  },
  {
    img:
      "/image/rap.gif",
    name: "Jorge Da Capadocia",
    artist: "Racionais Mc's",
    music:
      "musica/01. Racionais Mc's - Jorge Da Capadocia.mp3"
  },
  {
    img:
      "/image/alien_walking.gif",
    name: "Capitulo 4, Versiculo 3",
    artist: "Racionais Mc's",
    music: "/musica/03. Racionais Mc's - Capítulo 4, Versículo 3.mp3"
  } ,
  {
    img:
    "/image/rap.gif",
    name: "Diario de um Detento",
    artist: "Racionais Mc's",
    music:
      "musica/06. Racionais Mc's - Diário De Um Detento.mp3"
  },
  {
    img:
      "/image/alien_walking.gif",
    name: "Qual Mentira Vou Acreditar",
    artist: "Racionais Mc's",
    music: "/musica/08. Racionais Mc's - Qual Mentira Vou Acreditar.mp3"
  },
  {
    img:
    "/image/rap.gif",
    name: "Rapaz Comum",
    artist: "Racionais Mc's",
    music:
      "musica/05. Racionais Mc's - Rapaz Comum.mp3"
  },
  {
    img:
      "/image/alien_walking.gif",
    name: "Formula Mágica Da Paz",
    artist: "Racionais Mc's",
    music: "/musica/10. Racionais Mc's - Formula Mágica Da Paz.mp3"
  },
  {
    img:
      "/image/alien_walking.gif",
    name: "Mágico De Oz",
    artist: "Racionais Mc's",
    music: "/musica/09. Racionais Mc's - Mágico De Oz.mp3"
  },
  {
    img:
      "/image/rap.gif",
    name: " Californication",
    artist: "Red Hot Chili Peppers",
    music:
      "musica/Red Hot Chili Peppers - Californication.mp3"
  }
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
