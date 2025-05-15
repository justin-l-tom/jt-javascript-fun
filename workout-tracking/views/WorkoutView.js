export class WorkoutView {
    
    constructor() {
        this.form = document.querySelector('.form');
        this.containerWorkouts = document.querySelector('.workouts');
        this.inputType = document.querySelector('.form__input--type');
        this.inputDistance = document.querySelector('.form__input--distance');
        this.inputDuration = document.querySelector('.form__input--duration');
        this.inputCadence = document.querySelector('.form__input--cadence');
        this.inputElevation = document.querySelector('.form__input--elevation');
    }

    toggleElevationField() {
        this.inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
        this.inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }
    
    hideForm() {
        this.inputDistance.value = "";
        this.inputDuration.value = "";
        this.inputCadence.value = "";
        this.inputElevation.value = "";

        this.form.style.display = "none";
        this.form.classList.add("hidden");
        setTimeout(() => this.form.style.display = "grid", 1000);
    }

    renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴"}</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>
          `;

          if (workout.type === "running") {
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
                `;
          }

          if (workout.type === "cycling") {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(1)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>
            `;
          }

          this.form.insertAdjacentHTML('afterend', html);
    }

}

export default new WorkoutView();