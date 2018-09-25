import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import {Button, Card} from 'react-native-elements';

class CardView extends Component {
  render() {
    return (
        <Card
            title={this.props.title}
            titleStyle={styles.titleStyle}
            containerStyle={styles.containerStyle}>
            <Text style={styles.textStyle}>{this.props.text}</Text>
            <Button
                title='Navigovat'
                textStyle={styles.buttonTextStyle}
                icon={{name: 'navigation'}}
                raised
                buttonStyle={styles.buttonStyle}
                onPress={this.props.onComplete}
            />
        </Card>
    )
  }
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18
    },
    textStyle: {
        marginBottom: 20,
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'justify'
    },
    buttonStyle: {
        backgroundColor: '#3E51B4'
    },
    buttonTextStyle: {
        fontSize: 17
    }
});

export default CardView;