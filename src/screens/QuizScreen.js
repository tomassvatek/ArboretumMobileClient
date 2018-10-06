import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import {Icon} from 'react-native-elements';
import { MapView } from 'expo';

import { getPolylineCoordinates } from '../utils';
import ScoreBoard from '../components/Scoreboard';
import Map from '../components/Map';


// MOCK DATA
const DATA = [
  {id: 1, latlng: {latitude: 50.1200886, longitude: 14.459783 }, title: 'Lípa srdčitá', description: 'description', color: 'red'},
  {id: 2, latlng: {latitude: 50.1300886, longitude: 14.459783 }, title: 'Buk', description: 'description', color: 'blue'},
  {id: 3, latlng: {latitude: 50.1400886, longitude: 14.459783 }, title: 'Vrba', description: 'description', color: 'green'},
  {id: 4, latlng: {latitude: 50.1500886, longitude: 14.459783 }, title: 'Kaštan', description: 'description', color: 'yellow'},
  {id: 4, latlng: {latitude: 50.1600886, longitude: 14.459783 }, title: 'Ořech', description: 'description', color: 'black'}
];

const COORDINATES = [
  {latitude: 50.1200886, longitude: 14.459783 },
  {latitude: 50.1300886, longitude: 14.459783 },
  {latitude: 50.1400886, longitude: 14.459783 },
  {latitude: 50.1500886, longitude: 14.459783 },
  {latitude: 50.1600886, longitude: 14.459783 }
];

const origin = {
  latitude: 50.1200886, 
  longitude: 14.459783 
};

const destination = {
  latitude: 50.1300886, 
  longitude: 14.459783
};

class QuizScreen extends Component {
  static navigationOptions = {
    title: 'Kvíz',
    tabBarIcon: ({tintColor}) => {
      return <Icon name='question-answer' size={27} color={tintColor}/>;
    }
  }

  state = {
    correct: 0,
    total: 5,
    region: {
      latitude: 50.1200885,
      latitudeDelta: 0.0922,
      longitude: 14.4597821,
      longitudeDelta: 0.0421
    },
    coordinates: null
  }

  componentDidMount() {
    getPolylineCoordinates(origin, destination)
                          .then((coordinates) => this.setState({coordinates}));
  }

  _navigateToPlace = () => {

  }

  _renderPolyline = () => {
    return (
      <MapView.Polyline
        coordinates={this.state.coordinates}
        strokeColor='#00B3FD'
        strokeWidth={3}
        miterLimit={15}
        lineCap='round'
        lineJoin='round' >
      </MapView.Polyline>
    )
  }

  _rederNoDataMessage = () => {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Nenalezeny žádné stromy v okolí!</Text>
      </View>
    )
  }

  render() {
    if(DATA.length < 5)
      return this._rederNoDataMessage()
    if(!this.state.coordinates) {
      return (
        <View style={[styles.containerStyle, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return (
      <View style={styles.containerStyle}>
        <View style={{height:70}}>
          <ScoreBoard 
            correct={this.state.correct}
            total={this.state.total} 
          />
        </View>
          <Map
            mapStyle={styles.mapStyle} 
            region={this.state.region}
            data={DATA}
            showsUserLocation
            followUserLocation
            renderPolyline={this._renderPolyline()}>
          </Map>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    // REFACTOR STATUS BAR
    marginTop: 25
  },
  mapStyle: {
    flex: 1
  },
}

export default QuizScreen;