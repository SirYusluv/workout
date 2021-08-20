class Pagination {
    _prevBtn = document.querySelector(".next-prev__arr--l");
    _nextBtn = document.querySelector(".next-prev__arr--r");
    _nextPrev = document.querySelector(".next-prev__btn");

    renderPrev() {
        this._disableNext();
        this._enablePrev();
        this._prevBtn.classList.remove("u-no-opacity");
        this._nextBtn.classList.add("u-no-opacity");
    }

    renderNext() {
        this._disablePrev();
        this._enableNext();
        this._prevBtn.classList.add("u-no-opacity");
        this._nextBtn.classList.remove("u-no-opacity");
    }

    renderBoth() {
        this._enableBoth();
        this._prevBtn.classList.remove("u-no-opacity");
        this._nextBtn.classList.remove("u-no-opacity");
    }

    renderNone() {
        this._disableBoth();
        this._prevBtn.classList.add("u-no-opacity");
        this._nextBtn.classList.add("u-no-opacity");
    }

    setNextClickHandler(handler) {
        this._nextPrev.addEventListener("click", function(e){
            e.preventDefault();
            const next = e.target.closest(".next-prev__arr--r");
            if(!next) return;
            handler();
        });
    }

    setPrevClickHandler(handler) {
        this._nextPrev.addEventListener("click", function(e) {
            e.preventDefault();
            const prev = e.target.closest(".next-prev__arr--l");
            if(!prev) return;
            handler();
        });
    }

    _disableNext() {
        this._prevBtn.attributes.disabled = true;
        this._nextBtn.classList.add("u-no-pointer-cursor");
    }

    _enableNext() {
        this._nextBtn.attributes.disabled = false;
        this._nextBtn.classList.remove("u-no-pointer-cursor");
    }

    _disablePrev() {
        this._prevBtn.attributes.disabled = true;
        this._prevBtn.classList.add("u-no-pointer-cursor");
    }

    _enablePrev() {
        this._prevBtn.attributes.disabled = false;
        this._prevBtn.classList.remove("u-no-pointer-cursor");
    }

    _disableBoth() {
        this._disablePrev();
        this._disableNext();
    }

    _enableBoth() {
        this._enableNext();
        this._enablePrev();
    }

}

export default new Pagination();