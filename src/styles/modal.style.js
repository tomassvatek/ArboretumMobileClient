import {
    StyleSheet
} from 'react-native';
import {
    PRIMARY_COLOR, BORDER_COLOR
} from '../config';

export const style = new StyleSheet.create({
    modalStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    modalContentStyle: {
        height: 250,
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 10
    },

    modalHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    autocomplete: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        marginRight: 10,
        marginLeft: 10,
        //borderWidth: 1,
        //boderColor: BORDER_COLOR
    },

    buttonStyle: {
        position: 'absolute',
        top: 150,
        left: 0,
        right: 0
    }
})