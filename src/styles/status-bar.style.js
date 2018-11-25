import {
    StyleSheet
} from 'react-native';
import {
    Constants
} from 'expo'
import {
    PRIMARY_DARK_COLOR
} from '../config';

export const style = new StyleSheet.create({
    statusBar: {
        backgroundColor: PRIMARY_DARK_COLOR,
        height: Constants.statusBarHeight,
    }
})