import {
    StyleSheet
} from 'react-native';
import {
    BORDER_COLOR
} from '../config';

export const autocompleteStyle = StyleSheet.create({
    autocompleteContainerStyle: {
        flex: 1,
        left: 0,
        position: 'relative',
        right: 0,
        top: 0,
        zIndex: 1
    },
    containerStyle: {
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    inputContainerStyle: {
        borderWidth: 0,
        borderRadius: 10,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 10
    },
    listOpenStyle: {
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1
    },
    listContainerStyle: {
        borderWidth: 0
    },
    listStyle: {
        borderWidth: 0
    },
    listItemStyle: {
        paddingTop: 8,
        paddingBottom: 8
    },
    iconButtonContainerStyle: {
        position: 'absolute',
        top: 5,
        right: 0
    },
    iconContainerStyle: {
        padding: 15
    }
})