import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';


import CardView from '../components/CardView';

const data = {
  name: 'Lípa srdčitá',
  latin: 'Acer acutum',
  about: 'Stromy až 10 m vysoké, kůra hnědá nebo hnědavě šedá, větévky lysé a hladké; listy opadavé, řapíky 4–12 cm dlouhé, čepel vejčitá nebo vejčitě podlouhlá, 8–15 × 6–12 cm velká, papírovitá, svrchu tmavě zelená, lysá, naspodu v mládí pýřitá, báze srdčitá nebo téměř, 5–7 laloků, ty jsou široce vejčité nebo trojúhlé; květenství terminální, sepal 5, podlouhlých, petal 5, čárkovitě obkopinatých nebo obvejčitých, tyčinek 8, semeníky lysé; plody bledě hnědé, semenná pouzdra 9–11 × 17 mm, nažky 25–35 × 7–11 mm velké, křídla podlouhlá; Čína: Zhejiang	'
}

class DetailScreen extends Component {

  navigateUser = () => {
    console.log("hello");
  }

  render() {
    // if(!this.props.tree) {
    //   return (
    //     <View style={[styles.containerStyle, { justifyContent: 'center', alignItems: 'center' }]}>
    //       <ActivityIndicator size='large' />
    //     </View>
    //   )
    // }
    return (
      <ScrollView>
        <CardView
          title={this.props.tree.dendrology.commonName}
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
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

function mapStateToProps({treeDetail}) {
  return {
    tree: treeDetail
  }
}

export default connect(mapStateToProps, actions) (DetailScreen)