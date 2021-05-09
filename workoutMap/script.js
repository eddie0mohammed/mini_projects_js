'use strict';


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const cadenceForm = document.querySelector('.cadence');
const elevForm = document.querySelector('.elev');


class App {
    //private instance fields
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #workouts = [];

    constructor(){
        // as soon as page loads, call _getPosition method
        this._getPosition();

        // get data from localStorage
        this._getDataFromLocalStorage()

        // add eventListeners 
        this._addEventListeners();
    }

    _getDataFromLocalStorage(){
        const data = JSON.parse(localStorage.getItem('workouts'));
        if (data){
            this.#workouts = data;
            this.#workouts.forEach((workout) => this._renderWorkout(workout));
        }

    }

    

    _getPosition(){
        if (navigator?.geolocation){
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),  () => {
                alert('Could not get position');
            })
        }
    }

    _loadMap(position){
        // get current location and open map
        const {longitude, latitude} = position.coords; 
        const coords = [latitude, longitude];
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // // display marker at current location
        // L.marker(coords).addTo(map)
        //     .bindPopup('Your <br> Current Position ')
        //     .openPopup();

        // handling clicks on map
        this.#map.on('click', this._showForm.bind(this));

        // add markers for workouts from localstorage on page load
        this.#workouts.forEach((workout) => this._renderWorkoutMarker(workout));
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm(){
        //clear form inputs
        inputDistance.value = '';
        inputDuration.value = '';
        inputCadence.value = '';
        inputElevation.value = '';
        // hide form
        form.classList.add('hidden');

    }

    _toggleElevationField(e){
        if (e.target.value === 'running'){
            elevForm.classList.add('form__row--hidden');
            cadenceForm.classList.remove('form__row--hidden');
        }else if (e.target.value === 'cycling'){
            cadenceForm.classList.add('form__row--hidden');
            elevForm.classList.remove('form__row--hidden');
        }
    }

    _newWorkout(e){
        e.preventDefault();

        const validateInputs = (...inputs) => inputs.every((input) => Number.isFinite(input));
        const allPositive = (...inputs) => inputs.every((input) => input > 0);
        // get data from form
        const formType = inputType.value;
        const distance = Number(inputDistance.value);
        const duration = Number(inputDuration.value);

        const {lat, lng} = this.#mapEvent.latlng;
        let workout;

        // if workout is running, create running object
        if (formType === 'running'){
            const cadence = Number(inputCadence.value);
            // check if data is valid
            if (!validateInputs(distance, duration, cadence)
                || !allPositive(distance, duration, cadence)){
                return alert('Inputs have to be positive numbers!');
            }

            workout = new Running([lat, lng], distance, duration, cadence);
        }
        // if workout is cycling, create cycling object
        if (formType === 'cycling') {
            const elevGain = Number(inputElevation.value);
            // check if data is valid
            if (!validateInputs(distance, duration, elevGain) 
                || !allPositive(distance, duration)){
                return alert('Inputs have to be positive numbers!');
            }

            workout = new Cycling([lat, lng], distance, duration, elevGain);
        }

        // add new object to workout array
        this.#workouts.push(workout);
        // console.log(this.#workouts);

        // render workout on map as marker
        this._renderWorkoutMarker(workout, formType);
        this._renderWorkout(workout, formType);

        // clear all fields and hide form
        this._hideForm()

        // add all workouts to localStorage
        this._setLocalStorage();
        
            
    }

    _addEventListeners(){
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);     
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));   
    }

    _renderWorkoutMarker(workout, formType){
        // display marker on form submit
        L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${formType}-popup`
            })
        )
        .setPopupContent(`${formType === 'running' ? '🏃‍♂️' : '⚡️'} ${workout.description}`)
        .openPopup();
    }

    _renderWorkout(workout, formType){
        let html = `
        <li class="workout workout--${formType}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${formType === 'running' ? '🏃‍♂️' : '⚡️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          
        `;

        if (workout.type === 'running'){
            html += `
                <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            </li>
        `
        }else {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevGain}</span>
                <span class="workout__unit">m</span>
            </div>
            </li>
            `;
        }

        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e){
        // console.log('test');
        const workoutElement = e.target.closest('.workout');
        // console.log(workoutElement);

        if (workoutElement){
            const workout = this.#workouts.find(workout => workout.id === workoutElement.dataset.id);
            this.#map.setView(workout.coords, this.#mapZoomLevel, {
                animate: true,
                pan: {
                    duration: 1,
                }

            });
            // using this public interfact to increase the clicks
            // workout.click();
        }
        
    }

    _setLocalStorage(){
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }
}


class Workout {

    // these are similar to adding in the constructor using this.date and this.id ... 
    // newer syntax
    date = new Date();
    id = (new Date().getTime() + '').slice(-10);
    clicks = 0;

    constructor(coords, distance, duration){
        this.coords = coords; // [lat,lng]
        this.distance = distance;
        this.duration = duration;
    }

    _setDescription(){
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }

    click(){
        this.clicks++;
    }
}


class Running extends Workout {
    type = 'running';

    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';

    constructor(coords, distance, duration, elevGain){
        super(coords, distance, duration);
        this.elevGain = elevGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed(){
        this.speed = this.distance / (this.duration / 60);
        return this;
    }
}


const app = new App();






