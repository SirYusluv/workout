import "core-js/stable";
import { async } from "regenerator-runtime";

import { handleError, timeOut } from "./helper";
import { MONTHS, TILE_URL, TIME_OUT_SEC, RUNNING, CYCLING, NEXT, PREV, LAST, MIN_SCR_SIZE_RESP } from "./config";

import { state, loadLocationCords, validateNums, createRunning, createCycling, saveDataToStorage, getDataFromStorage, getDataToDisplay } from "./model";

import mapView from "./view/map";
import sideNavView from "./view/sideNavView";
import pagination from "./view/pagination";

const docBody = document.body;
const form = document.querySelector(".side-nav__form");
const sideNav = document.querySelector(".side-nav");

let lat, lng;

//Handler functions
const subscribeMapClickHandler = function() {
    mapView.addClickHandler(function(e) {
        ({lat, lng} = e.latlng);

        sideNavView.displayForm();
        sideNavView.focusDurationField();
    });
};

const subscribeFormTypeChangedHandler = function() {
    sideNavView.addFormTypeChangedHandler(function() {
        sideNavView.toggleForm();
    });
};

const sideNavClickHandler = function(e) {
    const clickedEl = e.target.closest(".workout-info");
    if(!clickedEl) return;

    const coord = state.objects.find((obj) => obj.getId() === clickedEl.dataset.id).getCoord();
    mapView.scrollToView(coord);

    if(!(parseInt(getComputedStyle(docBody).width) <= MIN_SCR_SIZE_RESP) || !sideNav.classList.contains("u-top-30")) return;
    sideNavView.animateSideNav();
}

const sideNavAnimateHandler = function(e) {
    if(!(parseInt(getComputedStyle(docBody).width) <= MIN_SCR_SIZE_RESP) || !e.target.classList.contains("side-nav")) return;
    sideNavView.animateSideNav();
}

const nextClickedHandler = function() {
    displayFormMapAndPagi(NEXT);
}

const prevClickedHandler = function() {
    displayFormMapAndPagi(PREV);
}

const formSubmitHandler = function(e) {
    e.preventDefault();

    const type = form.querySelector(".side-nav__drop-down").value
    const duration = form.querySelector(".side-nav__input--duration").value;
    const distance = form.querySelector(".side-nav__input--distance").value;
    const cadence = form.querySelector(".side-nav__input--cadence").value;
    const elev = form.querySelector(".side-nav__input--elev").value;

    type === CYCLING ? validateNums(distance, duration, elev) : validateNums(distance, duration, cadence);

    if (!state.isNum) return;

    //create a cycling or running object in state
    type === CYCLING ? createCycling(type, distance, duration, elev, lat, lng) : createRunning(type, distance, duration, cadence, lat, lng);

    sideNavView.clearFormFields();
    sideNavView.hideForm();
    
    //save form data to storage
    saveDataToStorage();

    //show the last data, so currently added form is shown
    displayFormMapAndPagi(LAST);
    
};

//Other functions
const displayMap = async function() {
    try {
        //TODO: first call view to render spinner
        mapView.showLoading();

        // //not const cause the value might change when promise get fufilled
        // let locationCords = loadLocationCords();
        await Promise.race([loadLocationCords(), timeOut(TIME_OUT_SEC)]);

        //add a map click listener after instatiating map
        mapView.renderMap(state.coord, subscribeMapClickHandler);
        //load form from storage
        initSavedForm();
        //display form and marker in their respective view
        displayFormMapAndPagi(NEXT);
    } catch(err) {
        //call view to handle error
        mapView.showErrorMessage(err.message);
    } finally {
        //remove loading spinner
        mapView.removeLoading();
    }
};

const displayFormMapAndPagi = function(next_prev) {
    getDataToDisplay(next_prev); // data will be stored in state
    // console.log(state.toDisplay);
    if(state.toDisplay.length === 0) return;

    removeMarkersAndWorkout();
    renderForm();
    displayPagi();
}

const removeMarkersAndWorkout = function() {
    sideNavView.removePreviousWorkouts();
    mapView.removePreviousMarkers();
}

const renderForm = function() {
    state.toDisplay.map((obj) => {
        sideNavView.render(obj);
        mapView.renderPopup(obj);
    });
}

const displayPagi = function() {
    if(state.totalPagiNum === 1) {
        console.log(1);
        pagination.renderNone();
        return;
    }

    if(state.currPagiNum != 1 && state.currPagiNum != state.totalPagiNum) {
        pagination.renderBoth();
        return;
    }

    if(state.currPagiNum === 1 && state.totalPagiNum > 1) {
        pagination.renderNext();
        return;
    }

    if(state.currPagiNum === state.totalPagiNum && state.currPagiNum > 1) {
        pagination.renderPrev();
        return;
    }
}

const initSavedForm = function() {
    getDataFromStorage();
};



//for initialization
(function() {
    pagination.renderNone();
    pagination.setNextClickHandler(nextClickedHandler);
    pagination.setPrevClickHandler(prevClickedHandler);

    displayMap();
    
    sideNavView.addClickHandler(sideNavAnimateHandler);
    sideNavView.addSideNavClickHandler(sideNavClickHandler);
    sideNavView.addFormSubmitHandler(formSubmitHandler);
    if(parseInt(getComputedStyle(docBody).width) <= MIN_SCR_SIZE_RESP) sideNavView.removeFooterAndPagiDisplay();

    //TODO: fetch data from storage and display on screen
    subscribeFormTypeChangedHandler();
})();
