
// dom selectors
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');

const images = document.querySelectorAll('.img');
const circles = document.querySelectorAll('.circles');


// init position of images
images.forEach((image, i) => {
    image.style.transform = `translateX(${i * 100}%)`;
})


let activeSlide = 0;


const changeSlide = (activeSlide) => {
    images.forEach((img, i) => {
        img.style.transform = `translateX(${100 * (i - activeSlide)}%)`;
    })

    circles.forEach(elem => elem.classList.remove('active'));
    document.querySelector(`.circle-${activeSlide}`).classList.add('active');
}


const arrowClicked = (e) => {
    if (e.target.classList.contains('arrow-left')){
    
        activeSlide -= 1;
        if (activeSlide < 0){
            activeSlide = images.length - 1;
        }
        
        changeSlide(activeSlide);
        
    } else if (e.target.classList.contains('arrow-right')){
        
        activeSlide += 1;
        if (activeSlide >= images.length){
            activeSlide = 0;
        }
        changeSlide(activeSlide);
    }
}






// Event listeners
leftArrow.addEventListener('click', arrowClicked);
rightArrow.addEventListener('click', arrowClicked);

circles.forEach((circle, i) => {
    circle.addEventListener('click', () => changeSlide(i));
})