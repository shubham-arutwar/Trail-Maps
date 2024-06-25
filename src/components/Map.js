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
        console.log('Fetched coordinates:', data);
        setCoordinates(data);
      });
  }, []);

  useEffect(() => {
    if (!coordinates) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [coordinates.destination.longitude, coordinates.destination.latitude],
      zoom: 12,
    });

    map.on('load', () => {
      new mapboxgl.Marker({ color: 'blue' })
        .setLngLat([coordinates.destination.longitude, coordinates.destination.latitude])
        .addTo(map);

      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([coordinates.home.longitude, coordinates.home.latitude])
        .addTo(map);

      fetch('/highlight-area.geojson')
        .then(response => response.json())
        .then(data => {
          console.log('Fetched GeoJSON:', data);
          
          map.addSource('highlighted-area', {
            type: 'geojson',
            data: data,
          });

          map.addLayer({
            id: 'highlighted-area-fill',
            type: 'fill',
            source: 'highlighted-area',
            layout: {},
            paint: {
              'fill-color': '#088',
              'fill-opacity': 0.5,
            },
          });

        })
        .catch(error => console.error('Error fetching GeoJSON:', error));

      fetch('/line.geojson')
        .then(response => response.json())
        .then(data => {
          console.log('Fetched line GeoJSON:', data);

          map.addSource('line', {
            type: 'geojson',
            data: data,
          });

          map.addLayer({
            id: 'line-layer',
            type: 'line',
            source: 'line',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#55AA55',
              'line-width': 4
            },
          });
        })
        .catch(error => console.error('Error fetching line GeoJSON:', error));
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => map.remove();
  }, [coordinates]);

  return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Map;
