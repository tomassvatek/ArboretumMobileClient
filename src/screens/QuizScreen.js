import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import {Icon, Button} from 'react-native-elements';
import { MapView } from 'expo'
import { connect } from 'react-redux';

import { getPolylineCoordinates } from '../utils';
import ScoreBoard from '../components/Scoreboard';
import Map from '../components/Map';

// MOCK DATA
const DATA = [
  {id: 1, latlng: {latitude: 50.1200886, longitude: 14.459783 }, title: 'Lípa srdčitá', description: 'description', color: 'red'},
  {id: 2, latlng: {latitude: 50.1300886, longitude: 14.459783 }, title: 'Buk', description: 'description', color: 'blue'},
  {id: 3, latlng: {latitude: 50.1400886, longitude: 14.459783 }, title: 'Vrba', description: 'description', color: 'green'},
  {id: 4, latlng: {latitude: 50.1500886, longitude: 14.459783 }, title: 'Kaštan', description: 'description', color: 'yellow'},
  {id: 5, latlng: {latitude: 50.1600886, longitude: 14.459783 }, title: 'Ořech', description: 'description', color: 'black'}
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
                                 .then( (polylineCoordinates) => this.setState( {polylineCoordinates}, () => this._incrementIndex() ))
      });
    }
  }

  _incrementIndex = () => {
    this.setState((prevState) => ({index: prevState.index + 1}));
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

  // _renderMarkers = marker => {
  //   <MapView.Marker
  //     coordinate={marker.latlng}>
  //   </MapView.Marker>
  // }

  _rederNoDataMessage = () => {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Nenalezeny žádné stromy v okolí!</Text>
      </View>
    )
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
            data={this.state.data}
            showsUserLocation
            followUserLocation
            renderPolyline={this._renderPolyline()}>
          </Map>
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
  }
}

function mapStateToProps(state) {
  return {
    location: state.location
  };
}

export default connect(mapStateToProps) (QuizScreen);