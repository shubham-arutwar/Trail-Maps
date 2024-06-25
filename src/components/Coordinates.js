import mapboxgl from 'mapbox-gl';

const fetchCoordinates = async () => {
  const response = await fetch('/temp-coordinates.json');
  const data = await response.json();
  return data;
};

const addMarkersToMap = (map, coordinates) => {
  Object.keys(coordinates).forEach(key => {
    const location = coordinates[key];
    new mapboxgl.Marker({ color: location.color })
      .setLngLat([location.longitude, location.latitude])
      .addTo(map);
  });
};

export const fetchAndAddMarkers = async (map) => {
  const coordinates = await fetchCoordinates();
  addMarkersToMap(map, coordinates);
};
