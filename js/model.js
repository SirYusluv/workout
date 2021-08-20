import "regenerator-runtime/runtime";

import { isNumber } from "./helper";
import { DATA_PER_PAGE, LAST, PREV, RUNNING, STORAGENAME } from "./config";

import Cycling from "./Objects/cycling";
import Running from "./Objects/running";

export const state = {
    coord: [],
    isNum: false,  // if the currently checked num is num
    objects: [], // A list of all objects // user shoudn't have access to this anymore
    object: "", // currently generated cycling or running object
    toDisplay: [], // object that should be in the current side nav pagi
    currPagiNum: 0,
    totalPagiNum: 0
}

export const loadLocationCords = function() {
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(function(pos) {
            const { latitude, longitude } = pos.coords;
            state.coord = [latitude, longitude];
            resolve();
        }, reject);
    });
}

export const validateNums = function(...nums){
    state.isNum = isNumber(nums);
}

export const createCycling = function(type, distance, duration, elev, lat, lng, id, date) {
    const cyc = new Cycling(type, distance, duration, elev, lat, lng, id, date);
    // state.object = cyc;
    state.objects.push(cyc);
}

export const createRunning = function(type, distance, duration, cadence, lat, lng, id, date) {
    const run = new Running(type, distance, duration, cadence, lat, lng, id, date);
    // state.object = run;
    state.objects.push(run);
}

export const saveDataToStorage = function() {
    localStorage.setItem(STORAGENAME, JSON.stringify(state.objects));
}

//the handler is responsible for rendering each element to screen
export const getDataFromStorage = function() {
    const storage = JSON.parse(localStorage.getItem(STORAGENAME));
    if(!storage) return;
    
    storage.map(function(obj) {
        obj._type === RUNNING ? createRunning(obj._type, obj._distance, obj._duration, obj._cadence, obj._latLng.lat,  obj._latLng.lng, obj._id, obj._date)
        : createCycling(obj._type, obj._distance, obj._duration, obj._elev, obj._latLng.lat,  obj._latLng.lng, obj._id, obj._date);

        // handler();
    });
}

export const getDataToDisplay = function(prev_next) {
    //Seven num of data per page
    state.totalPagiNum = Math.ceil(state.objects.length/DATA_PER_PAGE);
    if(prev_next === LAST) {
        _last();
        return;
    }
    prev_next === PREV ? _prev() : _next();
}

//********** NOT EXPORTING **********//

const _prev = function() {
    if(state.currPagiNum === 1) return;
    state.currPagiNum--;
    _loadPageToState();
}

const _next = function() {
    if(state.currPagiNum === state.totalPagiNum) return;
    state.currPagiNum++;
    _loadPageToState();
}

const _last = function() {
    state.currPagiNum = state.totalPagiNum;
    _loadPageToState();
}

const _loadPageToState = function() {
    const start = (state.currPagiNum - 1) * DATA_PER_PAGE;
    const end = state.currPagiNum * DATA_PER_PAGE;
    state.toDisplay = state.objects.slice(start, end);
}