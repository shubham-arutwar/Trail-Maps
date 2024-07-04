import React from 'react';
import './css/projectDetails.css';

const ProjectDetails = () => {
  return (
    <div className="project-details">
      <div>
        <p>GitHub : <a href="https://github.com/shubham-arutwar">shubham-arutwar</a></p>
        <p>LinkedIn : <a href="https://www.linkedin.com/in/shubham-arutwar">shubham-arutwar</a></p>
      </div>
      <h1>Trail-Maps</h1>
      <p>GitHub repository: <a href="https://github.com/shubham-arutwar/Trail-Maps-frontend">Trail-Maps-frontend</a> / <a href="https://github.com/shubham-arutwar/Trail-Maps-Backend">Trail-Maps-Backend</a></p>
      <h2>Project Overview</h2>
      <p>
       - TrailMaps identifies dangerous slopes on unknown terrain. It uses elevation data from ALOS PALSAR dataset to calculate slope on each point on the map with 12.5m accuracy. This data is turned into GeoJSON polygons for visualization on Mapbox.
      </p>
      <p>
       - This demo gives you a peek at a small area for now—it's just a prototype! I'm planning to add a backend soon to make the map cover more ground and be responsive.
      </p>
      <p>
       - In the demo map, area with slope higher than 25 degree is marked with red. this slope calue can be modified in following Terrain Analysis.
      </p>

      <h2>Terrain Analysis</h2>
      <p>Explained in this <a href="https://github.com/shubham-arutwar/Trail-Maps-Backend/blob/main/README.md">Github README</a></p>

      <h2>Features Implemented</h2>
      <ul>
        <li>GeoJSON polygons to mark areas with steep slopes.</li>
        <li>Implemented geolocate controls for user position tracking.</li>
      </ul>

      <h2>Future Enhancements</h2>
      <ul>
        <li>Pathfinding Algorithms: algorithms to suggest safer paths to hike between tw points.</li>
        <li>Mobile App Development: React Native App for Offline use.</li>
        <li>Collect user data to know what path is actually taken by hikers.</li>
      </ul>

      
    </div>
  );
};

export default ProjectDetails;
