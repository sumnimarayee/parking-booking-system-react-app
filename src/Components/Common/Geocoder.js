import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const Geocoder = (props) => {
  const ctrl = new MapBoxGeocoder({
    accessToken: props.accessToken,
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    props.updateSearchLocation(coords[0], coords[1]);
  });
  return null;
};

export default Geocoder;
