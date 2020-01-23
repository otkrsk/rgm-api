import React, { Component } from 'react';
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker
} from '@react-google-maps/api';

const places=['places'];

class Map extends Component {

  constructor (props) {
    super(props)

    this.autocomplete = null

    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)

    this.state = {
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      }
    }
  }

  onLoad (autocomplete) {
    console.log('autocomplete: ', autocomplete)
    this.autocomplete = autocomplete
  }

  onDragEnd = marker => {
    console.log('marker: ', marker)
    console.log('lat: ', marker.latLng.lat())
    console.log('lng: ', marker.latLng.lng())
  }

  onClick (e) {
    console.log('clicked', e);
    console.log('lat: ', e.latLng.lat());
    console.log('lng: ', e.latLng.lng());
  }

  onPlaceChanged () {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace())
      console.log('lat: ', this.autocomplete.getPlace().geometry.location.lat())
      console.log('lng: ', this.autocomplete.getPlace().geometry.location.lng())

      const latValue=this.autocomplete.getPlace().geometry.location.lat(),
        lngValue=this.autocomplete.getPlace().geometry.location.lng();

      this.setState({
        markerPosition: {
          lat: latValue,
          lng: lngValue
        },
        mapPosition: {
          lat: latValue,
          lng: lngValue
        },
      })
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  render () {
    return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyAtrfpL0BU0LzmP9rE5gqWP9yqZRJyBILk"
        libraries={places}
      >
        <GoogleMap
          id='example-map'
          mapContainerStyle={{
            height: "400px",
            width: "650px"
          }}
          zoom={15}
          center={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng
          }}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false
          }}
          onClick={this.onClick}
        >
          <Marker
            onLoad={this.onLoad}
            position={{
              lat: this.state.mapPosition.lat,
              lng: this.state.mapPosition.lng
            }}
            draggable={true}
            onDragEnd={this.onDragEnd}
          />
          <Autocomplete
            onLoad={this.onLoad}
            onPlaceChanged={this.onPlaceChanged}
            restrictions={{country: "my"}}
          >
            <input
              type="text"
              placeholder="Search..."
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `300px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px",
                marginTop: "11px"
              }}
            />
          </Autocomplete>
        </GoogleMap>
      </LoadScript>
    )
  }


}

export default Map;