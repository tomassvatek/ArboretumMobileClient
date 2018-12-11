import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import {Icon, Button} from 'react-native-elements';
import { MapView, Constants  } from 'expo'
import { connect } from 'react-redux';
import Modal from 'react-native-modal';

import AutocompleteInput from '../components/autocomplete-input';
import * as actions from '../actions';
import * as modal from '../styles/modal.style';
import { getPolylineCoordinates, getBoundingBox, calculateDistance } from '../utils';
import ScoreBoard from '../components/scoreboard';
import Map from '../components/custom-map';
import { PRIMARY_DARK_COLOR, BORDER_COLOR, SECONDARY_COLOR } from '../config';

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

const QUIZ_COUNT = 3;

class QuizScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    score: {
      correct: 0,
      total: 5
    },
    index: 0,
    destination: {},
    polylineCoordinates: null,
    isModalVisible: false,
    isButtonVisible: false,
    answer: {},
    quizEnd: true
  }

  componentDidMount() {
    this._startQuiz();
    this._watchPositionAsync();
  }


  // _fetchQuizTrees = callback => {
  //   const [lonMin, latMin, lonMax, latMax ] = getBoundingBox(this.props.region);
  //   this.props.fetchQuizTrees(latMin, latMax, lonMin, lonMax, QUIZ_COUNT,
  //     () => callback()
  //   );
  // }

  _canQuizStart = () => {
    return this.props.trees.length === QUIZ_COUNT ? true : false;
  }

  _watchPositionAsync = () => {
    this.props.watchPosition((coordinate) => {
         const distance = calculateDistance(coordinate, this.state.destination);
         distance < 500 ? this.setState({isModalVisible: true}) : null;
    })
  }

  _startQuiz = () => {
    console.log("Current tree");
    console.log(this.state.destination);
    if(this.state.index <= this.props.trees.length - 1) {
      const { location } = this.props.location;
      console.log(this.state.index);
      console.log(this.props.trees);
      this.setState({destination: this.props.trees[this.state.index]}, () => 
      {
          let destinationLatLng = {
            latitude: this.state.destination.latitude, 
            longitude: this.state.destination.longitude
          };

          getPolylineCoordinates(this.props.location, destinationLatLng).then(polylineCoordinates => 
            this.setState({
              polylineCoordinates
            }, ()  => this._incrementIndex())
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


//TODO: Pripad ze neni odpoved spravna
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
    } else {
      this.setState(prevState => ({
        score: {
          ...prevState.score,
          total: prevState.score.total - 1
        }
      }),
      () => this._startQuiz())
    }
    console.log("false");
    this.setState({
      isModalVisible: false
    });
  }

  _evualateAnswer = () => {
    console.log("user answer");
    console.log(this.state.userAnswer);
    const correctAnswer = this.state.destination.commonName.toLowerCase();
    const userAnswer = this.state.answer.commonName.toLowerCase();

    const result = userAnswer == correctAnswer ? true : false;
    return result;
  }

  _onItemPress = (item) => {
    console.log(item);
    this.setState({answer: item, isButtonVisible: true});
  }

  onChangeText = (value) => {
    this.setState({isButtonVisible: false});
    //this.setState({answer: {}});
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
            autocompleteContainerStyle={styles.autocompleteContainerStyle}
            autocompleteItems={this.props.dendrologies}
            filterProperty="commonName"
            displayProperty="commonName"
            placeholder="Zadej odpověď"
            onItemPress={(item) => this._onItemPress(item)}
            onChangeText={(value) => this.onChangeText(value)}
          />
        </View>
        {this.state.isButtonVisible &&  
        <Button 
          title="Potvrdit odpověď" 
          icon={{name: 'done'}}
          backgroundColor={SECONDARY_COLOR}
          buttonStyle={modal.style.buttonStyle}
          onPress={() => this._updateScore()}/>
        }
      </View>
      </Modal>
    )
  }

  _renderQuizEnd = () => {
    return (
    <Modal
      style={modal.style.modalStyle}
      isVisible={false}
      onBackdropPress={() => this._toggleModal()}
    >
    <View style={modal.style.modalContentStyle}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Dokončil jsi kvíz se skore.</Text>
        </View>
        <Button 
          title="Potvrdit odpověď" 
          icon={{name: 'done'}}
          backgroundColor={SECONDARY_COLOR}
          buttonStyle={modal.style.buttonStyle}
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

  // _watchPositionAsync = () => {
  //   this.props.watchPosition((coordinate) => {
  //        const distance = calculateDistance(coordinate, this.state.destination);
  //        distance < 500 ? this.setState({isModalVisible: true}) : null;
  //   })
  // }

  render() {
    if(!this.state.polylineCoordinates ||	!this.state.destination) 
      return (
        <View style={[styles.containerStyle, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size='large' />
        </View>
      )
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
            onRef={(ref) => this.mapRef = ref}
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
          {this._renderQuizEnd()}
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
  },
  autocompleteContainerStyle: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: BORDER_COLOR,
    //borderRadius: 10,
},
}

function mapStateToProps({location, quiz, dendrologies }) {
  console.log(quiz);
  return {
    location: location.currentLocation,
    trees: quiz,
    region: location.currentRegion,
    dendrologies: dendrologies
  };
}

export default connect(mapStateToProps, actions) (QuizScreen);