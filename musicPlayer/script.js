
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

const songs = [
    {
        name: '1',
        displayName: 'Electric Chill Machine',
        artist: 'Mo',
    },
    {
        name: '2',
        displayName: 'Blues Chill House',
        artist: 'James',
    },
    {
        name: '3',
        displayName: 'American vibes',
        artist: 'Arthur',
    },
    {
        name: 'metric-1',
        displayName: 'Cat Walk',
        artist: 'Sarah',
    },
];

// currentSong
let currentSong = 0;


// check if is playing
let isPlaying = false;

// play 
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `./music/${song.name}.mp3`;
    image.src = `./img/${song.name}.jpg`;
}

function prevSong(){
    currentSong = currentSong === 0 ? songs.length - 1 : currentSong - 1;
    loadSong(songs[currentSong]);
    playSong();

}

function nextSong(){
    currentSong = currentSong === songs.length - 1 ? 0 : currentSong + 1;
    loadSong(songs[currentSong]);
    playSong();
}

function getTime(time){
    const timeMinutes = Math.floor(time / 60);
    const timeSeconds = Math.floor((time % 60)).toString().padStart(2, '0');
    if (!isNaN(timeMinutes)) return `${timeMinutes}:${timeSeconds}`;
    return '';
}

function updateProgressBar(e){
    if (isPlaying){
        const { duration, currentTime} = e.srcElement;
        //update progress bar
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // update display for duration
        const durationTime = getTime(duration);
        const updatedCurrentTime = getTime(currentTime);

        if (durationTime && updatedCurrentTime){
            durationElement.textContent = durationTime;
            currentTimeElement.textContent = updatedCurrentTime;
        }
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;

    const clickedSeconds = (clickX / width) * duration;
    music.currentTime = clickedSeconds;

}

//play or pause event listener
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
})

// next event listener
nextBtn.addEventListener('click', nextSong)

// prev event listener
prevBtn.addEventListener('click', prevSong);

//progress bar
music.addEventListener('timeupdate', updateProgressBar);

// click on progress bar functionality
progressContainer.addEventListener('click', setProgressBar);

// jump to next song once song is completed
music.addEventListener('ended', nextSong);

// on load - select first song
loadSong(songs[currentSong]);