import { MONTHS } from "../config";
import { calcSpeeed } from "../helper";

export default class Workout {

    constructor(type, distance, duration, lat, lng, id, date) {
        this._type = type;
        this._distance = distance;
        this._duration = duration;
        this._latLng = { lat: lat, lng: lng };
        this._speed = calcSpeeed(distance, duration);

        id ? this._id = id : this._id = (Date.now() +  "").slice(-10);
        const d = new Date();
        date ? this._date = date : this._date = `${MONTHS[d.getMonth()]} ${d.getDate()}, ${(d.getFullYear() + "").slice(2)}`;
    }

    getType() { return this._type; }
    getDistance() { return this._distance; }
    getDuration() { return this._duration; }
    getCoord() { return this._latLng; }
    getSpeed() { return this._speed; }
    getId() { return this._id; }
    getDate() { return this._date; }

};