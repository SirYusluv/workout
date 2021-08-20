import Workout from "./workout";

export default class Cycling extends Workout {
    
    constructor(type, distance, duration, elev, lat, lng, id, date) {
        super(type, distance, duration, lat, lng, id, date);
        this._elev = elev;
    }

    getElev() { return this._elev; }

};