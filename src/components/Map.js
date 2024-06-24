import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    fetch('/temp-coordinates.json')
      .then(response => response.json())
      .then(data => {
        setCoordinates(data);
      });
  }, []);

  useEffect(() => {
    if (!coordinates) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [coordinates.destination.longitude, coordinates.destination.latitude],
      zoom: 10,
    });

    map.on('load', () => {
      new mapboxgl.Marker({ color: 'blue' })
        .setLngLat([coordinates.destination.longitude, coordinates.destination.latitude])
        .addTo(map);

      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([coordinates.home.longitude, coordinates.home.latitude])
        .addTo(map);
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => map.remove();
  }, [coordinates]);

  return <div ref={mapContainerRef} style={{ width: '100vw', height: '90vh' }} />;
};

export default Map;
