import React from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker
} from '@react-google-maps/api';

import WithAutocomplete from './Maps';
import './App.css';

const position = {
  lat: 3.040020,
  lng: 101.579231
}

const onLoad = marker => {
  console.log('marker: ', marker)
}

const onDragEnd = marker => {
  console.log('marker: ', marker)
  console.log('lat: ', marker.latLng.lat())
  console.log('lng: ', marker.latLng.lng())
}

function App() {

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey="AIzaSyAtrfpL0BU0LzmP9rE5gqWP9yqZRJyBILk"
      libraries={['places']}
    >
      <GoogleMap
        id='example-map'
        mapContainerStyle={{
          height: "400px",
          width: "650px"
        }}
        zoom={15}
        center={position}
      >
        <Marker
          onLoad={onLoad}
          position={position}
          draggable={true}
          onDragEnd={onDragEnd}
        />
        <WithAutocomplete />
      </GoogleMap>
    </LoadScript>
  );
}

export default App;
