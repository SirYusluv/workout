import "regenerator-runtime/runtime";

export const handleError = function(errMessage = "Unexpected error occureed") {
    alert(errMessage);
}

export const timeOut = function(sec) {
    return new Promise(function(_, reject){
        setTimeout(function(){
            reject(new Error(`Took too long to respond. After ${sec} second(s)`));
        }, sec * 1000);
    });
}

export const calcPace = function(durationMin, distanceKm) {
    return durationMin/distanceKm;
}

export const calcSpeeed = function(distanceKm, durationHr) {
    return  (distanceKm / (durationHr / 60)).toFixed(2);//convert to min
}

export const generateId = function() {
    //slice the date(milli) from the 10th to the end
    return (Date.now() + "").slice(-10);
}

export const generateDate = function() {
    return `${Date.getMonth()} ${Date.getDay()}, ${Date.getFullYear().slice(1)}`
}

export const isNumber = function(nums) {
    return nums.every((num) => isFinite(parseFloat(num)));
}