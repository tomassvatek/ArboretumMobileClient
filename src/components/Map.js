import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types';
import MapWithClustering  from 'react-native-map-clustering';

import * as config from '../config';

class Map extends Component {

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  //TODO: Animate to region vetsi vzdalenost
  animateToRegion = (region) => {
    setTimeout(() => {
      this.mapClusterRef.root.animateToRegion(region, 500);
    }, 500);
  }

  animateToCoordinate = (camera, duration) => {
    this.mapClusterRef.root.animateToCoordinate(camera, duration);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <MapWithClustering
          ref={(ref) => this.mapClusterRef = ref}
          style={this.props.mapStyle} 
          region={this.props.region}
          showsUserLocation={this.props.showsUserLocation}
          followsUserLocation={this.props.followsUserLocation}
          clustering={this.props.clustering}
          clusterTextColor={config.PRIMARY_COLOR}
          clusterBorderColor={config.PRIMARY_COLOR}
          onRegionChange={this.props.onRegionChange}
          onRegionChangeComplete={this.props.onRegionChangeComplete}
          onUserLocationChange={this.props.onUserLocationChange}
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
  region: PropTypes.object.isRequired,
  //initialRegion: PropTypes.object,
  showsUserLocation: PropTypes.bool,
  followsUserLocation: PropTypes.bool,
  clustering: PropTypes.bool,
  onRegionChange: PropTypes.func,
  onRegionChangeComplete: PropTypes.func,
  onUserLocationChange: PropTypes.func,
  onCalloutPress: PropTypes.func,
  children: PropTypes.func,
  renderMarkers: PropTypes.any,
  renderPolyline: PropTypes.element
}

Map.defaultProps = {
  //initialRegion: {latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0},
  showsUserLocation: false,
  followsUserLocation: false,
  clustering: false,
  onRegionChange: () => {},
  onRegionChangeComplete: () => {},
  onUserLocationChange: () => {},
  onCalloutPress: () => {},
  children: () => {},
  renderMarkers: <View/>,
  renderPolyline: <View/>
}

export default Map;