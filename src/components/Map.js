import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import MapWithClustering  from 'react-native-map-clustering';

import * as config from '../config';

class Map extends Component {
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
          {this.props.renderMarkers}
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
  showsUserLocation: PropTypes.bool,
  followsUserLocation: PropTypes.bool,
  clustering: PropTypes.bool,
  onRegionChangeComplete: PropTypes.func,
  onCalloutPress: PropTypes.func,
  children: PropTypes.func,
  renderMarkers: PropTypes.element,
  renderPolyline: PropTypes.element
}

Map.defaultProps = {
  //data: [],
  showsUserLocation: false,
  followsUserLocation: false,
  clustering: false,
  onRegionChangeComplete: () => {},
  onCalloutPress: () => {},
  children: () => {},
  renderMarkers: <View/>,
  renderPolyline: <View/>
}

export default Map;