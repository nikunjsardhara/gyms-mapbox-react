import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import data from "./data.json";

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute"
};

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const App = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [72.885784, 21.215967],
        zoom: 13
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
        data.map(function(dataItem){
          var para = document.createElement("p");
          para.style="background:white;box-shadow:0px 0px 10px black;border-radius:10px;padding:5px;";
          para.innerHTML = dataItem.name;
          new mapboxgl.Marker({element:para})
          .setLngLat([dataItem.longitude, dataItem.lattitude])
          .addTo(map);
          return true;
        });
      });
    };
    

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default App;