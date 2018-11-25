import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { MapView } from 'expo';
import MapWithClustering  from 'react-native-map-clustering';
import { Button } from 'react-native-elements';


export default class TestScreen extends Component {
  state = {
      position: null,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
  }

//   componentDidMount() {
//       navigator.geolocation.getCurrentPosition(
//           (position) => {
//               this.setState({position}, () => console.log(this.state.position))
//           },
//           (error) => console.log(error),
//           { enableHighAccuracy: true, maximumAge: 1000 }
//       )
//   }

  onRegionChange(region) {
      console.log(region);
      this.setState({region});
  }

  onRegionChangeComplete(region) {
      console.log("OnRegionChange");
      console.log(region);
      this.setState({region});
  }

  animate = () => {
    const region =  {
      latitude: 45.78825,
      longitude: 18.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }

    this.mapRef.root.animateToRegion(region);
  }

  render() {
    // if(this.state.position === null) {
    //     return (
    //     <View style={{justifyContent: 'center', alignItems: 'center' }}>
    //         <ActivityIndicator size='large' />
    //     </View>
    //     )
    // }
    return (
      <View style={{flex:1}}>
        <MapWithClustering
            ref={(ref) => this.mapRef = ref}
            style={{flex:1}}
            region={this.state.region}
            // onRegionChangeCompleteCallback={this.onRegionChangeComplete.bind(this)}
            // onRegionChange={this.onRegionChange.bind(this)}
        />
        <Button title="animate" onPress={this.animate}></Button>
      </View>
    )
  }
}