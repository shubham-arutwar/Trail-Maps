import React from 'react';
import './App.css';
import Map from './components/Map';
import ProjectDetails from './components/projectDetails';

function App() {
  return (
    <div className="App">
      <div className="project-details-container">
        <ProjectDetails />
      </div>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
}

export default App;
