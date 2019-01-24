import React, { Component } from 'react'
import { Platform, View, ActivityIndicator, NetInfo, StatusBar } from 'react-native'
import { MapView, Constants } from 'expo';
import { FloatingAction } from 'react-native-floating-action';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import Map from '../components/clustering-map';
import AutocompleteInput from '../components/autocomplete-input';
import Notification from '../components/notification';
import { getBoundingBox, getPolylineCoordinates } from '../utils';
import { fetchClosestTree, fetchClosestTreeByDendrology } from '../services/http';
import { DETAIL_SCREEN, ADD_SCREEN, QUIZ_GUIDE_SCREEN } from '../config/screen-routes';
import { NAVIGATE_USER } from '../actions/const/redux-action-types';
import * as actions from '../actions';
import * as fab from '../helpers/fab';
import { ERROR_COLOR, NOTIFICATION_BASE_COLOR, SECONDARY_COLOR, PRIMARY_COLOR, PRIMARY_DARK_COLOR } from '../config';
import { INTERNET_CONNECTION_LOST_MESSAGE, TREE_NAVIGATION_CANCEL_MESSAGE } from '../services/notification/notification-messages';
import { TREE_NAVIGATION_CANCEL } from '../services/notification/notification-types';
import strings from '../res/strings';

const API_CALL_RATE = 3500;

class MainScreen extends Component {
  static navigationOptions = {
    header: null,
    title: strings.screenTitles.mainScreen
  }

  state = {
    polylineCoordinates: [],
    currentCallout: null,
    lastApiCall: 0,
    apiCallEnable: true
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.trees.length !== nextProps.trees.length ||
       this.props.notification !== nextProps.notification || 
       this.state.polylineCoordinates !== nextState.polylineCoordinates ||
       this.state.currentCallout !== nextState.currentCallout
       ) 
    {
      // console.log("change");
      return true;
    }
    
    // console.log("not change");
    return false;
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionStatusChange);

    if(Platform.OS === 'android') {
      this.props.getUserLocation(() => { 
        this._fetchTrees();
      });
      this._watchPositionAsync();
      this._fetchDendrologies();
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionStatusChange);
  }

  /**
   * React navigation lifecycle metohd.
   */
  async componentWillFocus(payload) {
    const { action } = payload;

    const { params } = action;
    if(!params) return false;

    const { actionName } = params;
    if(!actionName) return false;
      
    switch(actionName) {
      case NAVIGATE_USER:
        await this._startNavigationMode();
        break;
    }
  }

  _startNavigationMode = async () => {
    const { latitude, longitude } = this.state.currentCallout;
    await this._fetchNavigationRoad({latitude, longitude});
    this.props.showNotification({
      type: TREE_NAVIGATION_CANCEL,
      color: NOTIFICATION_BASE_COLOR,
      message: TREE_NAVIGATION_CANCEL_MESSAGE
    });

    //this._animateToMarker(this.props.currentLocation);
  }

  _animateToMarker = ({latitude, longitude}) => {
    const regionToAnimate = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001
    }

    this.mapRef.animateToRegion(regionToAnimate);
  }

  _watchPositionAsync = () => {
    this.props.watchPosition(20, (coordinate) => {
         this._fetchTrees();
         //this.mapRef && this.mapRef.animateToRegion(this.props.region);
    });
  }

  _fetchNavigationRoad = async (destination) => {
    try {
      const location = this.props.currentLocation;
      const polylineCoordinates = await getPolylineCoordinates(location, destination);
      this.setState({polylineCoordinates}, () => console.log(this.state.polylineCoordinates));
    } catch(err) {
        (error) => console.log(error)
    }
  }

  _fetchTrees = () => {
    const [lonMin, latMin, lonMax, latMax ] = getBoundingBox(this.props.region);
    this.props.fetchTrees(latMin, latMax, lonMin, lonMax);
  }

    //FIXME: LATITUDE DELTA PARAMS MOVE TO CONSTANT
  _fetchClosestTree = () => {
    const [lonMin, latMin, lonMax, latMax ] = getBoundingBox(this.props.region);
    const currentLocation = this.props.currentLocation;

    fetchClosestTree(latMin, latMax, lonMin, lonMax, currentLocation).then(
       ({id, latitude, longitude}) => {
       this._animateToMarker({latitude, longitude});
       this.refs['marker'+id].showCallout();
    },
      (error) => console.log(error)
    )
  }

  _fetchDendrologies = () => {
    this.props.fetchDendrologies();
  }

  _findTreeByDendrology = (commonName) => {
    if(commonName) {
      const [lonMin, latMin, lonMax, latMax ] = getBoundingBox(this.props.region);
      const currentLocation = this.props.currentLocation;

      fetchClosestTreeByDendrology(commonName, latMin, latMax, lonMin, lonMax, currentLocation).then(
        ({id, latitude, longitude}) => {
          this._animateToMarker({latitude, longitude});
          this.refs['marker'+id].showCallout();
        },
        (error) => console.log(error)
      )
    }
  }

  //FIXME: Same problem like fetch polyline coordinates. I have to call setState polyline coordinate twice.
  _resetTreeNavigation = () => { 
    this.setState({currentCallout: null, polylineCoordinates: []}, () => this.setState({polylineCoordinates: []}));
    this.props.dismissNotification();
  }

  _setRegion = region => {
    this.setState({lastApiCall: Date.now() - API_CALL_RATE });

    this.props.regionChange(region, () => {
      if(Date.now() - this.state.lastApiCall >= API_CALL_RATE) {
        this._fetchTrees();
        this.setState({lastApiCall: Date.now()});
      }
    });
  }

  _handleConnectionStatusChange = (isConnected) => {
    this.props.changeConnectionStatus(isConnected);
    if(!isConnected) {
      this.props.showNotification({
        message: INTERNET_CONNECTION_LOST_MESSAGE,
        color: ERROR_COLOR  
      });
    } else {
      this.props.dismissNotification();
    }
  }

  _handleCalloutPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const currentCallout = this.props.trees.find(t => t.latitude === latitude && t.longitude === longitude);
    const { id, providerId } = currentCallout;

    this.props.fetchTreeById(id, providerId, () => {
      this.props.navigation.navigate(DETAIL_SCREEN);
      this.setState({currentCallout});
    })
  }

  /**
   * The Callback method. The method is called after ther user presses
   * the floating action item. 
   */
  _handleFabItemPress = name => {
    switch(name) {
      case fab.FAB_ACTION_ADD:
        this._handleFabItemAddPress();
        break;
      case fab.FAB_ACTION_MYPOSITION:
        this._handleFabItemMyPositionPress();
        break;
      case fab.FAB_ACTION_NEAREST:
        this._handleFabItemNearestPress();
        break;
      default:
        break;
    }
  }

  _handleFabItemAddPress = () => {
    this.props.navigation.navigate(ADD_SCREEN);
  }

  _handleFabItemMyPositionPress = () => {
    const { latitude, longitude } = this.props.currentLocation;
    this._animateToMarker({latitude, longitude});
    //this.setState({apiCallEnable: false});
  }
 
  _handleFabItemNearestPress = () => {
    this._fetchClosestTree();
  }

  _handleIconButtonPress = (item) => {
    this._findTreeByDendrology(item.commonName);
  }

  _handleNotificationPress = () => {
    switch(this.props.notification.type) {
      case TREE_NAVIGATION_CANCEL:
        this._resetTreeNavigation();
        break;
    }
  }

  _renderOverlay = () => 
    <View style={{flex:1}}>
      <AutocompleteInput
        autocompleteContainerStyle={styles.autocompleteContainerStyle}
        autocompleteItems={this.props.dendrologies}
        filterProperty="commonName"
        displayProperty="commonName"
        iconButton
        placeholder="Jaký strom hledáte?"
        onIconButtonPress={this._handleIconButtonPress}
      />
    </View>

  _renderMarkers = markers => {
   return markers.map( marker => 
        <MapView.Marker
          ref={'marker'+marker.id}
          identifier={marker.id.toString()}
          key={marker.id}
          coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
          title={marker.commonName}
          description={marker.scientificName}
        >
        </MapView.Marker>
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

  _isReadyToRender = () => {
    return this.props.region ? true : false;
  }

  render() {
    // if(!this._isReadyToRender()) {
    //   return (
    //     <View style={[styles.containerStyle, { justifyContent: 'center', alignItems: 'center' }]}>
    //       <ActivityIndicator size='large' />
    //     </View>
    //   )
    // }
    return (
      <View style={{flex:1}}>
        <NavigationEvents
          onWillFocus={payload => this.componentWillFocus(payload)}
        />
        <View style={styles.statusBar}></View>
        <View style={styles.containerStyle}>
          <Notification 
            isVisible={this.props.notification.message ? true : false}
            notificationStyle={{backgroundColor: this.props.notification.color}}
            notificationMessage={this.props.notification.message}
            textColor="#fff"
            onNotificationPress={this._handleNotificationPress}
          />

          <Map
            onRef={(ref) => this.mapRef = ref}
            mapStyle={styles.mapStyle}
            overlayMapStyle={styles.overlayMapStyle}
            region={this.props.region}
            clustering={true}
            showsUserLocation
            followUserLocation
            onRegionChangeComplete={this._setRegion}
            onCalloutPress={(event) => this._handleCalloutPress(event)}
            renderMarkers={ this._renderMarkers(this.props.trees)}
            renderPolyline={this._renderPolyline()}
          >
            {this._renderOverlay}
          </Map>

          <FloatingAction 
            color={PRIMARY_COLOR}
            actions={fab.FAB_ACTIONS}
            onPressItem={name => this._handleFabItemPress(name)}
          />

        </View>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 2
  },

  mapStyle: {
    flex: 1
  },


  overlayMapStyle: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    marginRight: 20,
    marginLeft: 20
  },

  autocompleteContainerStyle: {
    borderRadius: 10,
    backgroundColor: '#fff'
},

statusBar: {
  backgroundColor: PRIMARY_DARK_COLOR,
  height: Constants.statusBarHeight,
},
}

function mapStateToProps(state) {
  return {
    currentLocation: state.location.currentLocation,
    trees: state.trees,
    dendrologies: state.dendrologies,
    region: state.location.currentRegion,
    networkStatus: state.networkStatus,
    notification: state.notification
  }
}

export default connect(mapStateToProps, actions) (MainScreen);