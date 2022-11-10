import { Controller } from "@hotwired/stimulus";
import mapboxgl from "mapbox-gl";

export default class extends Controller {
  static targets = ["input", "coordinates"];

  initialize() {
    this.token = "pk.eyJ1IjoibWFyY29yaXgiLCJhIjoiY2wzdjhrYWpiMDg0azNqcGxwM3pibHd0NCJ9.5XVGv45Z7V0EQe2rPWP7CA";
  }

  geocode(event) {
    event.preventDefault();
    const keyword = this.inputTarget.value;
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword}.json?access_token=${this.token}`
    )
      .then(res => res.json())
      .then((data) => {
        const longitude = data.features[0].center[0];
        const latitude = data.features[0].center[1];
        this.coordinatesTarget.innerText = `${longitude}, ${latitude}`;
        this.insertMap(longitude, latitude)
      });
  }

  insertMap(long, lat) {
    mapboxgl.accessToken = this.token;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v9",
      center: [long, lat],
      zoom: 12,
    });
  }
}
