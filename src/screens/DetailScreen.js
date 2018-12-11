import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from '../actions';


import { Button } from 'react-native-elements';
import CardView from '../components/card-view';
import { DETAIL_SCREEN, MAIN_SCREEN } from '../config/screen-routes';
import { NAVIGATE_USER } from "../actions/redux-action-types";
import strings from '../res/strings';
import { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR, PRIMARY_COLOR_TEXT } from '../config';


const data = {
  name: 'Lípa srdčitá',
  latin: 'Acer acutum',
  about: 'Stromy až 10 m vysoké, kůra hnědá nebo hnědavě šedá, větévky lysé a hladké; listy opadavé, řapíky 4–12 cm dlouhé, čepel vejčitá nebo vejčitě podlouhlá, 8–15 × 6–12 cm velká, papírovitá, svrchu tmavě zelená, lysá, naspodu v mládí pýřitá, báze srdčitá nebo téměř, 5–7 laloků, ty jsou široce vejčité nebo trojúhlé; květenství terminální, sepal 5, podlouhlých, petal 5, čárkovitě obkopinatých nebo obvejčitých, tyčinek 8, semeníky lysé; plody bledě hnědé, semenná pouzdra 9–11 × 17 mm, nažky 25–35 × 7–11 mm velké, křídla podlouhlá; Čína: Zhejiang	'
}

class DetailScreen extends Component {

  static navigationOptions = {
    title: strings.screenTitles.detailScreen,
    //statusBarStyle: 'light-content',
    headerStyle: {
      backgroundColor: PRIMARY_COLOR,
    },
    headerTintColor: "#fff"
  }

  navigateUser = () => {
    this.props.navigation.navigate(MAIN_SCREEN, {
      //previousScreen: DETAIL_SCREEN,
      actionName: NAVIGATE_USER
    });
  }

  componentDidMount() {
    console.log("DetailScreen did mount");
  }

  componentWillUnmount() {
    console.log("DetailScreen will unmount");
  }

  render() {
    if(!this.props.tree) {
      return (
        <View style={[styles.containerStyle, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return (
      <ScrollView style={styles.containerStyle}>
        <CardView
          title={this.props.tree.commonName}
          text={data.about}
          onComplete={this.navigateUser}
        />
        {/* <View>
          <Text>{data.name}</Text>
        </View>
        <View>
          <Text>{data.about}</Text>
        </View> */}
      </ScrollView>

      // <ScrollView style={styles.containerStyle}>
      //   <View style={styles.containerHeader}>
      //     <Text style={styles.headline}>{data.name}</Text>
      //   </View>

      //   <View style={styles.mainContent}>
      //   <Text style={styles.subtitle}>Basic information</Text>
      //   <View style={[styles.basicInfoStyle]}>
      //     <View style={styles.row}>
      //       <Text style={styles.basicInfoItemStyle}>Latinský název: Acer</Text>
      //       <Text style={styles.basicInfoItemStyle}>Výška stromu: 90</Text>
      //       <Text style={styles.basicInfoItemStyle}>Velikost koruny: 70</Text>
      //       <Text style={styles.basicInfoItemStyle}>Stáří: 20</Text>
      //     </View>
      //     {/* <View style={styles.row}>
      //       <Text style={styles.basicInfoItemStyle}>Velikost koruny: 70</Text>
      //       <Text style={styles.basicInfoItemStyle}>Stáří: 20</Text>
      //     </View> */}
      //     <View>
      //     </View>
      //   </View>

      //   <View style={styles.descriptionStyle}>
      //     <Text style={styles.subtitle}>Popis</Text>
      //     <Text style={styles.textStyle}>{data.about}</Text>
      //   </View>

      //   <View style={styles.actionButtons}>
      //     <Button 
      //       title='navigovat'
      //       style={{textTransform: 'uppercase'}}
      //       backgroundColor={SECONDARY_COLOR}
      //       color={PRIMARY_COLOR_TEXT}
      //     />
      //   </View>

      //   </View>
      // </ScrollView>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    //padding: 20,
    backgroundColor: '#fff'
  },
  containerHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headline: {
    fontSize: 30,
    fontFamily: 'Roboto'
  },

  subtitle: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR
  },

  mainContent: {
    flex: 4,
  },

  basicInfoStyle: {
  },

  row: {
    //flexDirection: 'row',
    //justifyContent: 'space-between'
  },

  basicInfoItemStyle: {
    fontSize: 16,
    paddingBottom: 5,
    paddingTop: 5,
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
    color: PRIMARY_COLOR_TEXT
  },

  descriptionStyle: {
    marginTop: 15,
    marginBottom: 15,
  },

  actionButtons: {
  },

  textStyle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
    color: PRIMARY_COLOR_TEXT
  }
}

function mapStateToProps({treeDetail}) {
  return {
    tree: treeDetail
  }
}

export default connect(mapStateToProps, actions) (DetailScreen)