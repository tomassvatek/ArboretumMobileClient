import {
    StyleSheet
} from 'react-native';
import {
    PRIMARY_COLOR
} from '../config';

export const style = new StyleSheet.create({
    modalStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    modalContentStyle: {
        height: 350,
        width: '95%',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 10
    },

    autocomplete: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        marginRight: 10,
        marginLeft: 10,
    }
})