import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Modal } from 'react-native';
import {Icon, Button} from 'react-native-elements';
import { MapView } from 'expo'
import { connect } from 'react-redux';
import geolib from 'geolib';

import { getPolylineCoordinates } from '../utils';
import ScoreBoard from '../components/Scoreboard';
import Map from '../components/Map';

/**
 * TODO:
 * modal 
 * tracking location
 * evualate answer
 * 
 */

// TODO: Replace a real data from API
const DATA = [
  {id: 1, latlng: {latitude: 50.1200886, longitude: 14.459083 }, title: 'Lípa srdčitá', description: 'description', color: 'red'},
  {id: 2, latlng: {latitude: 50.1370886, longitude: 14.459183 }, title: 'Buk', description: 'description', color: 'blue'},
  {id: 3, latlng: {latitude: 50.1420886, longitude: 14.459283 }, title: 'Vrba', description: 'description', color: 'green'},
  {id: 4, latlng: {latitude: 50.1530886, longitude: 14.459983 }, title: 'Kaštan', description: 'description', color: 'yellow'},
  {id: 5, latlng: {latitude: 50.1620886, longitude: 14.459883 }, title: 'Ořech', description: 'description', color: 'black'}
];

class QuizScreen extends Component {
  static navigationOptions = {
    title: 'Kvíz',
    tabBarIcon: ({tintColor}) => {
      return <Icon name='question-answer' size={27} color={tintColor}/>;
    }
  }

  state = {
    region: {
      latitude: 50.1200885,
      latitudeDelta: 0.0922,
      longitude: 14.4597821,
      longitudeDelta: 0.0421
    },
    data: DATA,
    score: {
      correct: 0,
      total: 5
    },
    index: -1,
    origin: null,
    destination: null,
    polylineCoordinates: null
  }

  componentDidMount() {
    this._launchQuiz();
    // console.log(this.state.index);
    // console.log(this.state.data[this.state.index]);
  }

  _enterAnswer = () => {    
  }

  _evualuteAnswer = () => {
  }

  _launchQuiz = () => {
    if(this.state.index <= -1) {
      this._firstTree();
    }
    else {
      this._nextTree();
    }
  }

  _firstTree = () => {
    console.log('firstTree');
    const { location } = this.props.location;
    const origin = {
      latitude: location.latitude,
      longitude: location.longitude
    }
    
    this.setState((prevState) => ({index: prevState.index + 1}), () => {
      this.setState({origin, destination: this.state.data[this.state.index].latlng}, () => {
        getPolylineCoordinates(this.state.origin, this.state.destination).then((polylineCoordinates) => this.setState({polylineCoordinates}))
    });
      // this.setState({destination: this.state.data[this.state.index].latlng}, () => {
      //   getPolylineCoordinates(this.state.origin, this.state.destination).then((polylineCoordinates) => this.setState({polylineCoordinates}))
      // });
    })
  }

  _nextTree = () => {
    if(this.state.index !== this.state.data.length - 1) {
      const origin = this.state.data[this.state.index].latlng;
      this.setState({origin});

      this.setState({destination: this.state.data[this.state.index + 1].latlng}, () => {
          getPolylineCoordinates(this.state.origin, this.state.destination)
                                .then( (polylineCoordinates) => this.setState( {polylineCoordinates}, () => this._incrementIndex() ));
          this._calculateDistance();
      });
    }
  }

  _incrementIndex = () => {
    this.setState((prevState) => ({index: prevState.index + 1}));
  }

  _calculateDistance = () => {
    let distance = geolib.getDistance(this.state.origin, this.state.destination);
    console.log(`Distance between origin: [${this.state.origin.latitude}, ${this.state.origin.longitude}] and destination: [${this.state.destination.latitude}, ${this.state.destination.longitude}] is ${distance} meters.`);
  }

  _renderMarkers = () => {
    return (
      <MapView.Marker
        coordinate={this.state.destination} />
    )
  }

  _renderPolyline = () => {
    return (
      <MapView.Polyline
        coordinates={this.state.polylineCoordinates}
        strokeColor='#00B3FD'
        strokeWidth={3}
        miterLimit={13}
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

  _renderModal = () => {
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={true}
      >
        <View style={styles.modalContent}>
          <Text>Hello</Text>
        </View>
      </Modal>
    )
  }

  _handleUserLocationChange = () => {
    console.log('position change');
  }

  render() {
    if(this.state.data.length < 5)
      return this._rederNoDataMessage()
    if(!this.state.polylineCoordinates ||	!this.state.destination) {
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
            correct={this.state.score.correct}
            total={this.state.score.total} 
          />
        </View>
          <Map
            mapStyle={{flex:1}} 
            region={this.state.region}
            showsUserLocation
            followUserLocation
            onUserLocationChange={this._handleUserLocationChange()}
            renderMarkers={this._renderMarkers()}
            renderPolyline={this._renderPolyline()}>
          </Map>
          {/* <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Modal
                animationType='slide'
                transparent={false}
                visible={true}
              >
              <View style={styles.modalContent}>
                <Text>Hello</Text>
              </View>
            </Modal>
          </View> */}
          <Button title='Increment' onPress={() => this._launchQuiz()}></Button>
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
  modalContent: {
    flex: 1
  }
}

function mapStateToProps(state) {
  return {
    location: state.location
  };
}

export default connect(mapStateToProps) (QuizScreen);