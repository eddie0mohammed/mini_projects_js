
const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// prompt to select a media stream,
// pass to video element, then play
const selectMediaStream = async () => {

    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
        
    }catch(err){
        console.log(err);
    }
}

button.addEventListener('click', async () => {
    //disable button
    button.disabled = true;
    //start picture in picture
    await videoElement.requestPictureInPicture();
    //reset button
    button.disabled = false;

})

// on load
selectMediaStream();