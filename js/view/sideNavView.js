import { RUNNING } from "../config";

class SideNavView {

    _formContainer = document.querySelector(".side-nav__form-container");
    _form = document.querySelector(".side-nav__form");
    _submitBtn = document.querySelector(".side-nav__submit");
    _footer = document.querySelector(".side-nav__footer");
    _pagi = document.querySelector(".next-prev__btn");
    _sideNav = document.querySelector(".side-nav");

    _distanceField = this._form.querySelector(".side-nav__input--distance");
    _durationField = this._form.querySelector(".side-nav__input--duration");
    _elevField = this._form.querySelector(".side-nav__input--elev");
    _cadenceField = this._form.querySelector(".side-nav__input--cadence");

    _elev = this._form.querySelector(".side-nav__item--elev");
    _cadence = this._form.querySelector(".side-nav__item--cadence");


    _toggleFooterAndPagiDisp() {
        this._footer.classList.toggle("u-no-display");
        this._pagi.classList.toggle("u-no-display");
    }

    displayForm() {
        this._formContainer.classList.remove("u-margin-top-11");
    }

    hideForm() {
        this._formContainer.classList.add("u-margin-top-11")
    }

    removePreviousWorkouts() {
        const allWorkOut = document.querySelectorAll(".workout-info");

        if(allWorkOut.length === 0) return;

        const workouts = [...allWorkOut];
        workouts.map((workOut) => workOut.remove());
    }

    addFormSubmitHandler(handler) {
        this._form.addEventListener("submit", handler);
        this._submitBtn.addEventListener("click", handler);
        
    }

    addSideNavClickHandler(handler) {
        const sideNavContainer = document.querySelector(".side-nav__list");

        sideNavContainer.addEventListener("click", handler);
    }

    focusDurationField(){
        this._durationField.focus();
    }

    addFormTypeChangedHandler(handler) {
        const fromType = this._form.querySelector(".side-nav__drop-down");
        fromType.addEventListener("change", handler);
    }

    toggleForm() {
        this._elev.classList.toggle("u-no-display");
        this._cadence.classList.toggle("u-no-display");
    }

    clearFormFields() {
        this._distanceField.value = "";
        this._durationField.value = "";
        this._cadenceField.value = "";
        this._elevField.value = "";
    }

    render(toRender) {

        const markUp = `
            <li class="workout-info side-nav__main side-nav__main--border-${toRender.getType()  === RUNNING ? "run" : "cyc"} u-margin-top-small u-no-opacity u-no-display js--just-added"  data-id=${toRender.getId()}>
                <h2 class="workout-info__heading u-margin-bottom-medium">${toRender.getType()} on ${toRender.getDate()}</h2>
                <div class="workout-info__div-main u-margin-top-small">
                    <p class="workout-info__p-text">🧗‍♂️ ${toRender.getDistance()} km</p>
                    <p class="workout-info__p-text">⌚ ${toRender.getDuration()} min</p>
                    <p class="workout-info__p-text">⚡ ${toRender.getSpeed()} km / h</p>
                    <!-- for cycling, for running-->
                    ${
                        toRender.getType() === RUNNING ? 
                        `<p class="workout-info__p-text">🚅 ${toRender.getCadence()} m</p>` : 
                        `<p class="workout-info__p-text">🐾 ${toRender.getElev()} m</p>`
                    }
                </div>
            </li>
        `;

        this._formContainer.insertAdjacentHTML("afterend", markUp);
        const justAddedElement = document.querySelector(".js--just-added");
        justAddedElement.classList.remove("u-no-opacity", "u-no-display", "js--just-added");
    }

    removeFooterAndPagiDisplay() {
        this._toggleFooterAndPagiDisp();
    }

    animateSideNav() {
        this._sideNav.classList.toggle("u-top-30");
        this._toggleFooterAndPagiDisp();
    }

    addClickHandler(handler) {
        this._sideNav.addEventListener("click", function(e) {
            handler(e);
        });
    }
}

export default new SideNavView();