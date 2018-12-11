import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Deck from '../components/deck';
import { Card, Button } from 'react-native-elements';
import { fetchDendrologies } from '../services/http';

import * as statusBar from '../styles/status-bar.style';
import { PRIMARY_COLOR } from '../config';


const CARDS_COUNT = 10;

class LearningScreen extends Component {
  state = {
    pageNumber: 1,
    dendrologies: []
  }

  componentDidMount() {
    this._fetchDendrologies();
  }

  _fetchDendrologies = () => {
    fetchDendrologies(this.state.pageNumber, CARDS_COUNT).then(
      (data) => this.setState({dendrologies: data})
    );
  }

  getMoreCards = () => {
    this.setState(prevState => ({pageNumber: prevState.pageNumber + 1}));
    this._fetchDendrologies();
  }

  renderCard(item) {
    return(
      <Card
        key={item.id}
        title={item.commonName}
      >
        <Text 
          style={{marginBottom: 10, fontSize: 14,  lineHeight: 25}}>
            {item.about}
        </Text>
      </Card>
    );
  }
    
  renderNoMoreCards() {
    return (
      <Card title="All done">
        <Text style={{marginBottom: 10}}>
          There is no more cards here!;
        </Text>
        <Button
          backgroundColor={PRIMARY_COLOR}
          title="Get more!"
          onPress={() => this._getMoreCards()}
        />
      </Card>
    );
  }

  render() {
    return (
     <View style={styles.container}>
     <View style={statusBar.style.statusBar}></View>

        <Deck
          data={this.state.dendrologies}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
  });

export default LearningScreen;