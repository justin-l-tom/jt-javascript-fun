"use strict"

import Running from '../models/Running.js';
import Cycling from '../models/Cycling.js';
import WorkoutView from '../views/WorkoutView.js';

export default class AppController {

    #map;
    #mapEvent;
    #mapZoomLevel = 13;
    #workouts = [];
    
    constructor() {

        this._getPosition();

        this._getLocalStorage();

        console.log(this);

        WorkoutView.form.addEventListener("submit", this._newWorkout.bind(this));
        
        WorkoutView.inputType.addEventListener("change", WorkoutView.toggleElevationField.bind(WorkoutView));

        WorkoutView.containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
        
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function() {
                alert("could not get your position");
            });
        }
    }

    _loadMap(position) {
        
        const {latitude} = position.coords;
        const {longitude} = position.coords;

        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on("click", this._showForm.bind(this));

        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        });

    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        WorkoutView.form.classList.remove('hidden');
        WorkoutView.inputDistance.focus();
    }

    _newWorkout(e) {
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        e.preventDefault();

        const type = WorkoutView.inputType.value;
        const distance = Number(WorkoutView.inputDistance.value);
        const duration = Number(WorkoutView.inputDuration.value);
        const {lat, lng} = this.#mapEvent.latlng;
        let workout;

        if (type === "running") {
            const cadence = Number(WorkoutView.inputCadence.value)

            if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)) return alert("Inputs have to be positive numbers!");

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        if (type === "cycling") {
            const elevation = Number(WorkoutView.inputElevation.value)

            if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration)) return alert("Inputs have to be positive numbers!");

            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        this.#workouts.push(workout);

        this._renderWorkoutMarker(workout)

        WorkoutView.renderWorkout(workout);

        WorkoutView.hideForm();
        
        this._setLocalStorage();
            
    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            }))
            .setPopupContent(`${workout.type === "running" ? "🏃‍♂️" : "🚴"} ${workout.description}`)
            .openPopup();
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest(".workout");

        if (!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1
            }
        });
        
    }

    _setLocalStorage() {
        localStorage.setItem("workouts", JSON.stringify(this.#workouts));
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem("workouts"));

        if (!data) return;

        this.#workouts = data;
        this.#workouts.forEach(work => {
            WorkoutView.renderWorkout(work);
        });
    }

    reset() {
        localStorage.removeItem("workouts");
        location.reload();
    }

}