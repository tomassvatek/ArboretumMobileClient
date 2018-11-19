import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import {Icon, Button} from 'react-native-elements';
import { MapView } from 'expo'
import { connect } from 'react-redux';
import geolib from 'geolib';
import Modal from 'react-native-modal';

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
// const DATA = [
//   {id: 1, latlng: {latitude: 50.1200886, longitude: 14.459083 }, title: 'Lípa srdčitá', description: 'description', color: 'red'},
//   {id: 2, latlng: {latitude: 50.1370886, longitude: 14.459183 }, title: 'Buk', description: 'description', color: 'blue'},
//   {id: 3, latlng: {latitude: 50.1420886, longitude: 14.459283 }, title: 'Vrba', description: 'description', color: 'green'},
//   {id: 4, latlng: {latitude: 50.1530886, longitude: 14.459983 }, title: 'Kaštan', description: 'description', color: 'yellow'},
//   {id: 5, latlng: {latitude: 50.1620886, longitude: 14.459883 }, title: 'Ořech', description: 'description', color: 'black'}
// ];

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
    index: 0,
    destination: null,
    polylineCoordinates: null
  }

  // Nejprve zjistit jak se chová region, zda se mění když posouvám mapu. 
  // Dávalo by smysl ho dát do Reduxu a sdílet mezi MainScreen a QuizScreen.
  componentDidMount() {
    //this.props.fetchQuizTrees()
    this._nextTree();
  }

  // _enterAnswer = () => {    
  // }

  // _evualuteAnswer = () => {
  // }
  
  _nextTree = () => {
    if(this.state.index <= this.props.trees.length - 1) {
      const { location } = this.props.location;
   
      this.setState({destination: this.props.trees[this.state.index]}, () => {
          getPolylineCoordinates(location, this.state.destination.latlng)
                                .then( (polylineCoordinates) => this.setState( {polylineCoordinates}, () => this._incrementIndex() ));
      });
    }
  }

  _incrementIndex = () => {
    this.setState((prevState) => ({index: prevState.index + 1}));
  }

  _calculateDistance = () => {
    const { location } = this.props.location;

    let distance = geolib.getDistance(location, this.state.destination);
    console.log(`Distance between origin: [${location.latitude}, ${location.longitude}] and destination: [${this.state.destination.latng.latitude}, ${this.state.destination.latng.longitude}] is ${distance} meters.`);
  }

  _renderMarkers = () => {
    return (
      <MapView.Marker
        coordinate={this.state.destination.latlng} />
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
            renderPolyline={this._renderPolyline()}
          >
          </Map>
          <Button title='Increment' onPress={() => this._nextTree()}></Button>
          {/* <View>
            <Modal
              isVisible
            >
              <View style={{flex:1}}>
                <Text>Hello MODAL</Text>
              </View>
            </Modal>
        </View> */}
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

function mapStateToProps({location, quiz }) {
  console.log(quiz);
  return {
    location: state.location,
    trees: quiz
  };
}

export default connect(mapStateToProps) (QuizScreen);