
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTimePlay = document.querySelector('.time-elapsed');
const timeDuration = document.querySelector('.time-duration');
const fullScreenBtn = document.querySelector('.fullscreen');
const playbackSpeed = document.querySelector('.player-speed');
const player = document.querySelector('.player');  




// Play & Pause ----------------------------------- //

function showPlayIcon(){
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function togglePlay(){
    if (video.paused){
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        showPlayIcon();        
    }
}

// Progress Bar ---------------------------------- //

function displayTime(time){

    const min = Math.floor(time / 60);
    let sec = Math.floor(time % 60).toString().padStart(2, '0');

    return `${min}:${sec}`;
}

function updateProgress(){
    const {currentTime, duration} = video;
    const percentagePlayed = (currentTime / duration) * 100;
    progressBar.style.width = `${percentagePlayed}%`;
    currentTimePlay.textContent = `${displayTime(currentTime)} / `;
    timeDuration.textContent = `${displayTime(duration)}`;
}

// click on progress range to seek through video
function setProgress(e){
    const newTime = (e.offsetX / progressRange.offsetWidth);
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
    
}

// Volume Controls --------------------------- //

let lastVolume = 1;

function changeVolume(e){
    let volume = e.offsetX / volumeRange.offsetWidth;
    // round volume value up or down
    if (volume < 0.1){
        volume = 0;
    } else if (volume > 0.9){
        volume = 1;
    }

    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    // change icon depending on volume
    volumeIcon.className = '';
    if (volume > 0.7){
        volumeIcon.classList.add('fas', 'fa-volume-up')
    } else if (volume > 0){
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0){
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }

    lastVolume = volume;
}

function toggleMute(){
    volumeIcon.className = '';
    if (video.volume){
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    }
}

// Change Playback Speed -------------------- //

function changePlaybackSpeed(){
    const playbackRate = playbackSpeed.value;
    video.playbackRate = playbackRate;
}


// Fullscreen ------------------------------- //

// var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');

}

let fullScreen = false;
function toggleFullScreen(){
    if (!fullScreen){
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullScreen = !fullScreen;
}


playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);

volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);

playbackSpeed.addEventListener('change', changePlaybackSpeed);
fullScreenBtn.addEventListener('click', toggleFullScreen);

// on Video end
video.addEventListener('ended', showPlayIcon);