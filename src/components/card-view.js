import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {Button, Card} from 'react-native-elements';
import { SECONDARY_COLOR, PRIMARY_COLOR, PRIMARY_COLOR_TEXT, BORDER_COLOR } from '../config';

export default class CardView extends Component {
  render() {
    return (
        <Card
            title={this.props.title}
            titleStyle={styles.titleStyle}
            containerStyle={styles.containerStyle}>
            <Text style={styles.subtitle}>Informace</Text>
             <View style={[styles.basicInfoStyle]}>
                <View style={styles.row}>
                    <Text style={styles.basicInfoItemStyle}>Latinský název:</Text>
                    <Text style={styles.basicInfoItemStyle}>Acer</Text>
               </View>
               <View style={styles.row}>
                    <Text style={styles.basicInfoItemStyle}>Latinský název:</Text>
                    <Text style={styles.basicInfoItemStyle}>Acer</Text>
               </View>
               <View style={styles.row}>
                    <Text style={styles.basicInfoItemStyle}>Latinský název:</Text>
                    <Text style={styles.basicInfoItemStyle}>Acer</Text>
               </View>

               {/* <Text style={styles.basicInfoItemStyle}>Stáří: 20</Text> */}
             </View>
            <Text style={styles.subtitle}>Popis</Text>
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
        lineHeight: 25,
        textAlign: 'justify',
        color: PRIMARY_COLOR_TEXT
    },
    buttonStyle: {
        backgroundColor: PRIMARY_COLOR
    },
    buttonTextStyle: {
        fontSize: 17
    },

    basicInfoStyle: {
        marginBottom: 10
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    basicInfoItemStyle: {
        flex: 1,
        fontSize: 16,
        paddingBottom: 3,
        paddingTop: 3,
        fontFamily: 'Roboto',
        letterSpacing: 0.5,
        color: PRIMARY_COLOR_TEXT
    },

    subtitle: {
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR
      },
});