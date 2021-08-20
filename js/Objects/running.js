import Workout from "./workout";

export default class Running extends Workout {
    constructor(type, distance, duration, cadence, lat, lng, id, date) {
        super(type, distance, duration, lat, lng, id, date);
        this._cadence = cadence;
    }

    getCadence() { return this._cadence; }
};