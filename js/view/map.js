import { MAPID, RUNNING, TILE_URL } from "../config";

const allMarker = [];

class Map {
    _iconLoad = document.querySelector(".side-nav__loading--map");
    _mapZoomLevel = 13;
    _map;

    //i need to set a click listener to the map, but a click listener can't be set before the map finish loading hence the handler
    renderMap(coord, handler) {
        this._map = L.map(MAPID).setView(coord, this._mapZoomLevel);

        L.tileLayer(TILE_URL, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this._map);

        handler();
    }

    scrollToView(coord) {
        this._map.setView(coord, this._mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1
            }
        });
    }

    //render the marker and popup
    renderPopup(obj) {
        const marker = L.marker(obj.getCoord()).addTo(this._map)
        .bindPopup(
            L.popup({
                maxWidth:150,
                minWidth: 80,
                autoClose: false,
                closeOnClick: false,
                //className: `side-nav__main side-nav__main--border-${obj.getType() === RUNNING ? "cyc" : "run"}`
            })
        ).setPopupContent(obj.getType()).openPopup();

        this._map.addLayer(marker);
        allMarker.push(marker);
    }

    removePreviousMarkers() {
        allMarker.map((iMarker) => this._map.removeLayer(iMarker));
    }

    showLoading() {
        this._iconLoad.classList.remove("u-no-display");
    }

    removeLoading() {
        this._iconLoad.classList.add("u-no-display");
    }

    showErrorMessage(errMesssage) {
        alert(`Error occurred: ${errMesssage}`);
    }

    addClickHandler(handler) {
        this._map.on("click", handler);
    }

}

export default new Map();