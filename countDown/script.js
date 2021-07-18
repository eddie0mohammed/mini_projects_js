
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const title = document.getElementById('title');
const dateElement = document.getElementById('date-picker');
const countdownElement = document.getElementById('countdown');
const countdownTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completedElement = document.getElementById('complete');
const completedElementInfo = document.getElementById('complete-info');
const completedElementBtn = document.getElementById('complete-button');



let countdownMainTitle = '';
let countdownDate = '';
let countdownValue;
let intervalId = null;

let savedCountDown;

const second = 1000;
const min = second * 60;
const hour = min * 60;
const day = hour * 24;

// set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateElement.setAttribute('min', today);

// can only change date using mouse
dateElement.addEventListener('keydown', (e) => {
    e.preventDefault();
});

function updateDOM(title, time){
    intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = time - now;
        
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const mins = Math.floor((distance % hour) / min);
        const secs = Math.floor((distance % min) / second);
    
        countdownTitle.textContent = `${title}`;
        timeElements[0].textContent = days;
        timeElements[1].textContent = hours;
        timeElements[2].textContent = mins;
        timeElements[3].textContent = secs;
        
        if (distance < 0){
            countdownDate.hidden = true;
            inputContainer.hidden = true;
            clearInterval(intervalId);
            completedElement.hidden = false;
            return ;
        }
        inputContainer.hidden = true;
        countdownElement.hidden = false;

    }, 1000);
}

function saveToLocalStorage(title, countdown){
    const countdownObj = {
        title,
        countdown,
    }
    localStorage.setItem('countdown', JSON.stringify(countdownObj));
}

function retrieveFromLocalStorage(){
    return localStorage.getItem('countdown');
}

function clearLocalStorage(){
    localStorage.removeItem('countdown');
}

function updateCountdown(e){
    e.preventDefault();
    // get values from event
    countdownMainTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    saveToLocalStorage(countdownMainTitle, countdownDate);
    
    // update countdown value according to selected date
    countdownValue = new Date(countdownDate).getTime();

    // update DOM with selected values
    if (countdownMainTitle && countdownDate){
        updateDOM(countdownMainTitle, countdownValue);
    } else {
        alert('Please fill all fields');
    }
}

function reset(){
    clearInterval(intervalId);
    clearLocalStorage();
    inputContainer.hidden = false;
    countdownElement.hidden = true;
    completedElement.hidden = true;
    title.value = '';
    dateElement.value = '';
}

function init(){
    savedCountDown = JSON.parse(retrieveFromLocalStorage());
    if (savedCountDown){
        const {title, countdown} = savedCountDown;
    
        countdownValue = new Date(countdown).getTime();
        updateDOM(title, countdownValue);
    }
}


//event listeners
countdownForm.addEventListener('submit', updateCountdown);

countdownBtn.addEventListener('click', reset);

completedElementBtn.addEventListener('click', reset);

init();
