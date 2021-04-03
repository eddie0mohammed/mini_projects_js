
const API_KEY = 'zxcjUgN86iui_4IDINKRJy4EfrPazybTiD0s6Qqgus0';

const API_SECRET = '5yNJYj4Zdr_bu-jGhsKVXoopRjYmnFkOP4NtKUYenX0';

const IMAGES_COUNT = 10;

const API_URL = `https:/api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${IMAGES_COUNT}`;

// ---------------------------------------


const imageContainer = document.querySelector('.imageContainer');
const loader = document.querySelector('.loadingContainer');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


// add hidden class on loader
const loaderContainer = document.querySelector('.loadingContainer');



// check if all images were loaded 
const imgLoaded = () => {
    imagesLoaded += 1;
    if (imagesLoaded === totalImages){
        ready = true;
        loaderContainer.classList.add('hidden');
    }
}


// display photos
// create elements for links and photos and add to DOM
const displayPhotos = () => {
    totalImages += IMAGES_COUNT;
    photosArray.forEach((photo) => {
        // create <a>
        const a = document.createElement('a');
        a.setAttribute('href', photo.links.html);
        a.setAttribute('target', '_blank');
        //craete <img>
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        img.addEventListener('load', imgLoaded);
        //put IMG inside a
        a.appendChild(img);
        //put a into imageContainer
        imageContainer.appendChild(a);

    })
}


// Get photos from unsplash api

const getPhotos = async () => {

    try{
        const response = await fetch(API_URL);
        photosArray = await response.json();
        displayPhotos()

    }catch(err){
        console.log(err);
    }
}


// infinite scroll
// check to see if scroll near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 
        && ready){
        ready = false;
        getPhotos();
    }
})





// ON LOAD
// getPhotos();