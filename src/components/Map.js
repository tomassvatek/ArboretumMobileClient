import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import MapWithClustering  from 'react-native-map-clustering';

import * as config from '../config';

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
          pinColor={this.props.pinColor}
          onCalloutPress={() => /*this.props.navigation.navigate('detail')*/ console.log('callout pressed') }>
        </MapView.Marker>
      )
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <MapWithClustering 
          style={this.props.mapStyle} 
          region={this.props.region}
          showsUserLocation={this.props.showsUserLocation}
          folowUsersLocation={this.props.folowUsersLocation}
          clustering={this.props.clustering}
          clusterTextColor={config.PRIMARY_COLOR}
          clusterBorderColor={config.PRIMARY_COLOR}
          onRegionChangeComplete={this.props.onRegionChangeComplete}
          onCalloutPress={this.props.onCalloutPress} >
          {this._renderMarkers(this.props.data)}
        </MapWithClustering >
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
  folowUsersLocation: PropTypes.bool,
  clustering: PropTypes.bool,
  pinColor: PropTypes.string,
  onRegionChangeComplete: PropTypes.func,
  onCalloutPress: PropTypes.func
}

Map.defaultProps = {
  data: [],
  showsUserLocation: false,
  folowUsersLocation: false,
  clustering: false,
  pinColor: 'green',
  onRegionChangeComplete: () => {},
  onCalloutPress: () => {}
}


const styles = {
  containerStyle: {
    flex: 1
  }
}

export default Map;