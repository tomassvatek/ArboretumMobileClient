import React, { Component } from 'react'
import { Text, View } from 'react-native'

import CardView from '../components/CardView';

const DATA = {
  name: 'Lípa srdčitá',
  latin: 'Acer acutum',
  about: 'Stromy až 10 m vysoké, kůra hnědá nebo hnědavě šedá, větévky lysé a hladké; listy opadavé, řapíky 4–12 cm dlouhé, čepel vejčitá nebo vejčitě podlouhlá, 8–15 × 6–12 cm velká, papírovitá, svrchu tmavě zelená, lysá, naspodu v mládí pýřitá, báze srdčitá nebo téměř, 5–7 laloků, ty jsou široce vejčité nebo trojúhlé; květenství terminální, sepal 5, podlouhlých, petal 5, čárkovitě obkopinatých nebo obvejčitých, tyčinek 8, semeníky lysé; plody bledě hnědé, semenná pouzdra 9–11 × 17 mm, nažky 25–35 × 7–11 mm velké, křídla podlouhlá; Čína: Zhejiang	'
}

class DetailScreen extends Component {

  /**
   * Navigate to the selected object.
   */
  navigateUser = () => {
    console.log("hello");
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <CardView
          title={DATA.name}
          text={DATA.about}
          onComplete={this.navigateUser}
        />
      </View>
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

export default DetailScreen;