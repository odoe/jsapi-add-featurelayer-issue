import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import "./style.css";

const symbol = {
  type: "simple-fill",
  color: [51, 51, 204, 0.9],
  style: "solid",
  outline: {
    color: "white",
    width: 1,
  },
};

const markerstyle = {
  type: "picture-marker",
  width: "32px",
  height: "32px",
};

const renderer = {
  type: "simple",
  symbol: symbol,
};
const data = [
  {
    LATITUDE: 32.6735,
    LONGITUDE: -117.2425,
    TYPE: "National Monument",
    NAME: "Cabrillo National Monument",
  },
  {
    LATITUDE: 35.2234,
    LONGITUDE: -118.559,
    TYPE: "National Monument",
    NAME: "Cesar E. Chavez National Monument",
  },
  {
    LATITUDE: 37.6251,
    LONGITUDE: -119.085,
    TYPE: "National Monument",
    NAME: "Devils Postpile National Monument",
  },
  {
    LATITUDE: 35.2915,
    LONGITUDE: -115.0935,
    TYPE: "National Monument",
    NAME: "Castle Mountains National Monument",
  },
  {
    LATITUDE: 41.7588,
    LONGITUDE: -121.5267,
    TYPE: "National Monument",
    NAME: "Lava Beds National Monument",
  },
  {
    LATITUDE: 37.897,
    LONGITUDE: -122.5811,
    TYPE: "National Monument",
    NAME: "Muir Woods National Monument",
  },
  {
    LATITUDE: 41.8868,
    LONGITUDE: -121.3717,
    TYPE: "National Monument",
    NAME: "Tule Lake National Monument",
  },
];
const graphics = [];
for (let i = 0; i < data.length; i++) {
  const graphic = new Graphic({
    geometry: {
      type: "point",
      latitude: data[i].LATITUDE,
      longitude: data[i].LONGITUDE,
    },
    attributes: data[i],
    symbol: markerstyle,
  });
  graphics.push(graphic);
}

const fl = new FeatureLayer({
  source: graphics,
  symbol: symbol,
  objectIdField: "objectid",
  popupEnabled: true,
  rendere: renderer,
  popupTemplate: { content: "<div>popup</div>" },
  fields: [
    {
      name: "objectid",
      type: "oid",
    },
    {
      name: "Name",
      type: "string",
    },
    {
      name: "Type",
      type: "string",
    },
  ],
});

const map = new ArcGISMap({
  basemap: "hybrid",
});

map.add(fl);

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-122.18, 37.49],
  zoom: 3,
});

view.when(() => console.log('view ready'));
