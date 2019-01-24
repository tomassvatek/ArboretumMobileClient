import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import {Icon, Button} from 'react-native-elements';
import { MapView, Constants  } from 'expo'
import { connect } from 'react-redux';
import Modal from 'react-native-modal';

import AutocompleteInput from '../components/autocomplete-input';
import * as actions from '../actions';
import * as modal from '../styles/modal.style';
import { getPolylineCoordinates, calculateDistance } from '../utils';
import ScoreBoard from '../components/scoreboard';
import Map from '../components/custom-map';
import { PRIMARY_DARK_COLOR, BORDER_COLOR, SECONDARY_COLOR } from '../config';
import { MAIN_SCREEN } from '../config/screen-routes';

const QUIZ_COUNT = 3;
const DISTANCE_THRESHOLD = 10;

class QuizScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    score: {
      correct: 0,
      total: this.props.navigation.getParam('treeCount')
    },
    index: 0,
    destination: {},
    polylineCoordinates: null,
    isModalVisible: false,
    isButtonVisible: false,
    answer: {},
    quizEnd: false,
    count: this.props.navigation.getParam('treeCount')
  }

  async componentDidMount() {
    await this._startQuiz();
    this._watchPositionAsync();
  }


  _canQuizStart = () => {
    return this.props.trees.length === QUIZ_COUNT ? true : false;
  }

  _watchPositionAsync = () => {
    this.props.watchPosition(20, (coordinate) => {
         const distance = calculateDistance(coordinate, this.state.destination);
         distance < DISTANCE_THRESHOLD ? this.setState({isModalVisible: true}) : null;
    })
  }

  _startQuiz = async () => {
    if(this.state.index <= this.props.trees.length - 1) {
      this.setState({destination: this.props.trees[this.state.index]}, async () => 
      {
          const destinationLatLng = {
            latitude: this.state.destination.latitude, 
            longitude: this.state.destination.longitude
          };
          const location = this.props.location;
          
          const polylineCoordinates = await getPolylineCoordinates(location, destinationLatLng);
          this.setState({polylineCoordinates});
          this._incrementIndex();
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

  _updateScore = () => {
    const isAnwerCorrect = this._isAnswerCorrect();
    isAnwerCorrect ? this._handleCorrectAnswer() : this._handleWrongAnswer();
    this._closeModal();
  }

  _handleCorrectAnswer = () => {
    this.setState(prevState => ({
      score: {
        ...prevState.score,
        correct: prevState.score.correct + 1,
        total: prevState.score.total - 1
      }
    }),
    () => {
      this._isLastQuizItem();
      this._startQuiz(); 
    })
  }

  _handleWrongAnswer = () => {
    this.setState(prevState => ({
      score: {
        ...prevState.score,
        total: prevState.score.total - 1
      }
    }),
    () => { 
      this._isLastQuizItem();
      this._startQuiz(); 
    })
  }

  _isLastQuizItem = () => {
    if(this.state.score.total == 0) {
      this.setState({quizEnd: true})
     }
  }

  _isAnswerCorrect = () => {
    const correctAnswer = this.state.destination.commonName.toLowerCase();
    const userAnswer = this.state.answer.commonName.toLowerCase();
    const result = userAnswer == correctAnswer ? true : false;
    return result;
  }


  _onItemPress = (item) => {
    this.setState({answer: item, isButtonVisible: true});
  }

  _onChangeText = (value) => {
    this.setState({isButtonVisible: false});
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
            itemsCount={3}
            filterProperty="commonName"
            displayProperty="commonName"
            placeholder="Zadej odpověď"
            onItemPress={(item) => this._onItemPress(item)}
            onChangeText={(value) => this._onChangeText(value)}
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

  _closeModal = () => {
    this.setState({
      isModalVisible: false
    });
  }

  _renderQuizEnd = () => {
    return (
    <Modal
      style={modal.style.modalStyle}
      isVisible={this.state.quizEnd}
    >
    <View style={[modal.style.modalContentStyle, {justifyContent: 'center', alignItems: 'center', padding: 20}]}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Dokončil jsi kvíz. Dokázal jsi rozeznat {this.state.score.correct} stromů z celkových {this.state.count}.</Text>
        </View>
        <Button 
          title="Konec" 
          backgroundColor={SECONDARY_COLOR}
          buttonStyle={{borderRadius: 10, marginTop: 15}}
          onPress={() => this._handleQuizEnd()}/>
      </View>
    </Modal>
    )
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  _handleQuizEnd = () => {
    this.props.navigation.navigate(MAIN_SCREEN);
    this.setState({quizEnd: false});
  }

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
            renderMarkers={this._renderMarkers()}
            renderPolyline={this._renderPolyline()}
          >
          </Map>
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