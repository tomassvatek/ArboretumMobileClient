import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import {Icon, Button} from 'react-native-elements';
import { MapView, Constants  } from 'expo'
import { connect } from 'react-redux';
// import geolib from 'geolib';
import Modal from 'react-native-modal';

import AutocompleteInput from '../components/autocomplete-input';
import * as actions from '../actions';
import * as modal from '../styles/modal.style';
import { getPolylineCoordinates, getBoundingBox, calculateDistance } from '../utils';
import ScoreBoard from '../components/Scoreboard';
import Map from '../components/Map';
import { PRIMARY_DARK_COLOR } from '../config';

const DATA = [
  {
    commonName: "buk"
  },
  {
    commonName: "buk"
  },
  {
    commonName: "buk"
  },
  {
    commonName: "javor"
  }
]

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

const QUIZ_COUNT = 3;

class QuizScreen extends Component {
  static navigationOptions = {
    title: 'Kvíz',
    tabBarIcon: ({tintColor}) => {
      return <Icon name='question-answer' size={27} color={tintColor}/>;
    }
  }

  state = {
    score: {
      correct: 0,
      total: 5
    },
    index: 0,
    destination: {
      latitude: 0,
      longitude: 0
    },
    polylineCoordinates: null,
    isModalVisible: false,
    answer: ''
  }

  componentDidMount() {
    this._fetchQuizTrees(() =>  this._startQuiz());
    this._watchPositionAsync();
  }


  _fetchQuizTrees = callback => {
    let [lonMin, latMin, lonMax, latMax ] = getBoundingBox(this.props.region);
    this.props.fetchQuizTrees(latMin, latMax, lonMin, lonMax, QUIZ_COUNT,
      () => callback()
    );
  }

  _canQuizStart = () => {
    return this.props.trees.length === QUIZ_COUNT ? true : false;
  }

  _startQuiz = () => {
    if(this.state.index <= this.props.trees.length - 1) {
      const { location } = this.props.location;
      this.setState({destination: this.props.trees[this.state.index]}, () => 
      {
          let destinationLatLng = {
            latitude: this.state.destination.latitude, 
            longitude: this.state.destination.longitude
          };

          getPolylineCoordinates(location, destinationLatLng).then(polylineCoordinates => 
            this.setState({
              polylineCoordinates
            }, () => this._incrementIndex())
         )
      })
    }
  }

  _incrementIndex = () => {
    this.setState(prevState => ({index: prevState.index + 1}));
  }

  _renderMarkers = () => {
    return (
      <MapView.Marker
        coordinate={{latitude: this.state.destination.latitude, longitude: this.state.destination.longitude  }} />
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

  _updateScore = () => {
    if (this._evualateAnswer()) {
      this.setState(prevState => ({
          score: {
            ...prevState.score,
            correct: prevState.score.correct + 1,
            total: prevState.score.total - 1
          }
        }),
        () => this._startQuiz())
    }
    this.setState({
      isModalVisible: false
    });
  }

  _evualateAnswer = () => {
    console.log(this.state.destination);
    const correctAnswer = this.state.destination.dendrology.commonName.toLowerCase();
    const userAnswer = this.state.answer.toLowerCase();
    
    return userAnswer == correctAnswer ? true : false;
  }

  _onItemPress = (item) => {
    this.setState({answer: item.commonName});
  }

  _renderModal = () => {
    return (
      <Modal
        style={modal.style.modalStyle}
        isVisible={this.state.isModalVisible}
        onBackdropPress={() => this._toggleModal()}
      >
      <View style={modal.style.modalContentStyle}>
        <View style={modal.style.autocomplete}>
          <AutocompleteInput
            autocompleteItems={this.props.dendrologies}
            query={this.state.answer}
            onItemPress={(item) => this._onItemPress(item)}
            filterProperty="commonName"
            placeholder="Zadej odpověď"
          />
        </View>
          <Button title="Potvrdit odpověď" 
            onPress={() => this._updateScore()}/>
      </View>
      </Modal>
    )
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  // _calculateDistance = () => {
  //   const { location } = this.props.location;
  //   console.log(`CALCULATE DISTANCE LOCATION  ${location.latitude} ${location.longitude}`);
  //   console.log(`CALCULATE DISTANCE DESTINATION  ${this.state.destination.latitude} ${this.state.destination.longitude}`);

  //   let distance = geolib.getDistance(location, this.state.destination);
  //   console.log(`Distance between origin: [${location.latitude}, ${location.longitude}] and destination: [${this.state.destination.latitude}, ${this.state.destination.longitude}] is ${distance} meters.`);
  //   return distance;
  // }

  _watchPositionAsync = () => {
    this.props.watchPosition((coordinate) => {
         const distance = calculateDistance(coordinate, this.state.destination);
         distance < 500 ? this.setState({isModalVisible: true}) : null;
    })
  }

  render() {
    if(!this.state.polylineCoordinates ||	!this.state.destination) 
      return (
        <View style={[styles.containerStyle, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size='large' />
        </View>
      )

    if(!this._canQuizStart())
      return this._rederNoDataMessage()

    return (
      <View style={{flex: 1}}>
        <View style={styles.statusBar}></View>
      <View style={styles.containerStyle}>
        <View style={{height:70}}>
          <ScoreBoard 
            correct={this.state.score.correct}
            total={this.state.score.total} 
          />
        </View>
          <Map
            mapStyle={{flex:1}} 
            region={this.props.region}
            showsUserLocation
            followUserLocation
            // onUserLocationChange={() => this._handleUserLocationChange()}
            renderMarkers={this._renderMarkers()}
            renderPolyline={this._renderPolyline()}
          >
          </Map>
          <Button title='Increment' onPress={() => this._toggleModal()}></Button>
          {this._renderModal()}
      </View>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    // REFACTOR STATUS BAR
    //marginTop: 25
  },
  modalContent: {
    flex: 1
  },
  statusBar: {
    backgroundColor: PRIMARY_DARK_COLOR,
    height: Constants.statusBarHeight,
  }
}

function mapStateToProps({location, quiz, region, dendrologies }) {
  return {
    location: location.currentLocation,
    trees: quiz,
    region: location.currentRegion,
    dendrologies: dendrologies
  };
}

export default connect(mapStateToProps, actions) (QuizScreen);