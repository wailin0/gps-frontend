import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import "mapbox-gl/dist/mapbox-gl.css"
import gpsService from "./services/gps";


mapboxgl.accessToken = 'pk.eyJ1Ijoid2FpbGluaHRldCIsImEiOiJja3FsYWQwNjYweGQwMnBwcTN3aXMzZjQxIn0.a8Olbn_rgmvAqjA5J-4e5g';

const App = () => {
    const [gpsData, setGPSData] = useState(null)

    const mapContainerRef = useRef(null);

    useEffect(() => {
        gpsService.getGPSData().then(response => setGPSData(response.map(item => [item.longitude, item.latitude])))
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
       if (gpsData){
           const map = new mapboxgl.Map({
               container: mapContainerRef.current,
               style: 'mapbox://styles/mapbox/streets-v12',
               center: gpsData[0],
               zoom: 14
           });

           map.on('load', () => {
               map.addSource('route', {
                   'type': 'geojson',
                   'data': {
                       'type': 'Feature',
                       'properties': {},
                       'geometry': {
                           'type': 'LineString',
                           'coordinates': gpsData
                       }
                   }
               });
               map.addLayer({
                   'id': 'route',
                   'type': 'line',
                   'source': 'route',
                   'layout': {
                       'line-join': 'round',
                       'line-cap': 'round'
                   },
                   'paint': {
                       'line-color': '#888',
                       'line-width': 8
                   }
               });
           });
       }
    }, [gpsData]);

    return <div ref={mapContainerRef} style={{width: "100vw", height: "100vh"}}/>;
};

export default App;
