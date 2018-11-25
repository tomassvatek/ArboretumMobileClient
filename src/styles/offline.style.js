import {
    StyleSheet
} from 'react-native';
import {
    ERROR_COLOR
} from '../config';

export const style = new StyleSheet.create({
    container: {
        backgroundColor: ERROR_COLOR,
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%'
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorMessage: {
        color: '#fff'
    }
})