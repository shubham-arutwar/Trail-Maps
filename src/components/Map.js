import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { fetchAndAddMarkers } from './Coordinates';

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/shubham-arutwar/clxublsj800up01pcfnb12wyb',
          center: [longitude, latitude],
          zoom: 12,
        });

        map.on('load', () => {
          fetchAndAddMarkers(map);
          geolocateControl.trigger();
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

  return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Map;
