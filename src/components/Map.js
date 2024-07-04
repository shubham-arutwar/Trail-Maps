import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { addPolygons } from './polygon';

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    navigator.geolocation.getCurrentPosition(
      position => {
        //const { latitude, longitude } = position.coords;

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/shubham-arutwar/clxublsj800up01pcfnb12wyb',
          center: [73.06195, 19.07595], // Center map on user's location
          zoom: 12,
        });

        map.on('load', () => {
          addPolygons(map);
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        const geolocateControl = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        });

        map.addControl(geolocateControl, 'top-right');

        return () => map.remove();
      }
    );
  }, []);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default Map;
