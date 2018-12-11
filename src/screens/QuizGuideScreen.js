import React, {Component} from 'react';
import {View, Dimensions, ScrollView, Text, Picker} from 'react-native'
import { connect } from 'react-redux';

import * as actions from '../actions';
import { Button } from 'react-native-elements';
import strings from '../res/strings';
import { getBoundingBox } from '../utils';
import { QUIZ_SCREEN } from '../config/screen-routes';
import { ERROR_COLOR } from '../config';

const SCREEN_WIDTH = Dimensions.get('window').width;

class QuizGuideScreen extends Component {
    static navigationOptions = {
        header: null,
        title: 'Kvíz'
    }

    state = {
        count: 3, 
        showErrorMessage: false
    }

    _onSlidesComplete = () => {
        this._fetchQuizTrees((data) => {
            if(data.length == this.state.count) {
                this.props.navigation.navigate(QUIZ_SCREEN, {
                    treeCount: this.state.count
                });
            } else {
                this.setState({showErrorMessage: true});
            }
        });
    }

    _fetchQuizTrees = callback => {
        console.log(this.props.region);
        const [lonMin, latMin, lonMax, latMax ] = getBoundingBox(this.props.region);
        this.props.fetchQuizTrees(latMin, latMax, lonMin, lonMax, this.state.count,
          (data) => callback(data)
        );
    }

      _onValueChange = (itemValue) => {
        this.setState({
            count: itemValue,
            showErrorMessage: false
        })
      }

    render() {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                <View 
                    style={[styles.slideStyle,  {backgroundColor: '#33A9F4' }]}
                >
                    <Text style={styles.textStyle}>{strings.quizGuide.welcomeText}</Text>
                </View>

                <View
                    style={[styles.slideStyle,  {backgroundColor: '#226666' }]}
                >
                    <Text style={styles.textStyle}>{strings.quizGuide.rulesText}</Text>
                </View>

                <View
                    style={[styles.slideStyle, {backgroundColor: '#33A9F4' }]}>
                    <View>
                        <Text style={styles.textStyle}>{strings.quizGuide.settingText} {this.state.count}</Text>
                         { this.state.showErrorMessage && <Text style={styles.errorMessageStyle}>{strings.quizGuide.errorText}</Text> }
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.pickerStyle}
                            selectedValue={this.state.count}
                            onValueChange={(itemValue, itemIndex) => this._onValueChange(itemValue)}>
                                <Picker.Item label="3 stromy" value="3" />
                                <Picker.Item label="5 stromů" value="5" />
                                <Picker.Item label="10 stromů" value="10" />
                        </Picker>
                    </View>
                    <Button 
                        title={strings.quizGuide.button}
                        buttonStyle={styles.buttonStyle}
                        backgroundColor='#fff'
                        color='#000'
                        onPress={this._onSlidesComplete}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },

    textStyle: {
        fontSize: 25,
        textAlign: 'center',
        color: 'white',
        marginBottom: 15
    },

    buttonStyle: {
        marginTop: 20,
        width: 250,
        borderRadius: 10
    },

    pickerContainer: {
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 20
    },

    pickerStyle: {
        //backgroundColor: '#fff',
        height: 50,
        width: 250,
        borderRadius: 10
    },

    errorMessageStyle: {
        color: ERROR_COLOR,
        fontSize: 18,
        textAlign: 'center'
    }
};

function mapStateToProps({quiz, location}) {
    console.log(quiz);
    return {
      trees: quiz,
      region: location.currentRegion
    };
  }

export default connect(mapStateToProps, actions) (QuizGuideScreen);
