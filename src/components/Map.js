import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import MapWithClustering  from 'react-native-map-clustering';

import * as config from '../config';

// MOCK DATA
const COORDINATES = [
  {latitude: 50.1200886, longitude: 14.459783 },
  {latitude: 50.1300886, longitude: 14.459783 },
  {latitude: 50.1400886, longitude: 14.459783 },
  {latitude: 50.1500886, longitude: 14.459783 },
  {latitude: 50.1600886, longitude: 14.459783 }
]

class Map extends Component {
   /**
   * Render markers to the map.
   * [markers] - list of markers. 
   */
  _renderMarkers = markers => {
    return markers.map( marker => 
        <MapView.Marker
          key={marker.id}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
          showsUserLocation
          folowUsersLocation
          pinColor={marker.color ? marker.color : this.props.pinColor} >
        </MapView.Marker>
      )
  }

  render() {
    return (
      <View style={{flex:1}}>
        <MapWithClustering 
          style={this.props.mapStyle} 
          region={this.props.region}
          showsUserLocation={this.props.showsUserLocation}
          followsUserLocation={this.props.followsUserLocation}
          clustering={this.props.clustering}
          clusterTextColor={config.PRIMARY_COLOR}
          clusterBorderColor={config.PRIMARY_COLOR}
          onRegionChangeComplete={this.props.onRegionChangeComplete}
          onCalloutPress={this.props.onCalloutPress} 
        >
          {this._renderMarkers(this.props.data)}
          {this.props.renderPolyline}
        </MapWithClustering>

        <View style={this.props.overlayMapStyle}>
          {this.props.children()}
        </View>
      </View>
    )
  }
}

Map.propTypes = {
  region: PropTypes.array.isRequired,
  data: PropTypes.array,
  showsUserLocation: PropTypes.bool,
  followsUserLocation: PropTypes.bool,
  clustering: PropTypes.bool,
  pinColor: PropTypes.string,
  onRegionChangeComplete: PropTypes.func,
  onCalloutPress: PropTypes.func,
  children: PropTypes.func,
  renderPolyline: PropTypes.element

}

Map.defaultProps = {
  data: [],
  showsUserLocation: false,
  followsUserLocation: false,
  clustering: false,
  pinColor: 'green',
  onRegionChangeComplete: () => {},
  onCalloutPress: () => {},
  children: () => {},
  renderPolyline: <View/>
}

export default Map;