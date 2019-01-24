import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, View } from 'react-native'

import {Card} from 'react-native-elements'
import { PRIMARY_COLOR, PRIMARY_COLOR_TEXT, BORDER_COLOR } from '../config'

const TreeDetail = ({tree}) =>
    <Card
        title={tree.commonName}
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}>
        <Text style={styles.subtitle}>Informace</Text>
            <View style={[styles.basicInfoStyle]}>
                {tree.scientificName &&
                    <View style={styles.row}>
                        <Text style={styles.basicInfoItemStyle}>Latinský název:</Text>
                        <Text style={styles.basicInfoItemStyle}>{tree.scientificName}</Text>
                    </View>
                }

                {tree.age &&
                    <View style={styles.row}>
                        <Text style={styles.basicInfoItemStyle}>Stáří:</Text>
                        <Text style={styles.basicInfoItemStyle}>{tree.age}</Text>
                    </View>
                }

                {tree.height &&
                    <View style={styles.row}>
                        <Text style={styles.basicInfoItemStyle}>Výška:</Text>
                        <Text style={styles.basicInfoItemStyle}>{tree.height}</Text>
                    </View>
                }

                {tree.crownSize &&
                    <View style={styles.row}>
                        <Text style={styles.basicInfoItemStyle}>Velikost koruny:</Text>
                        <Text style={styles.basicInfoItemStyle}>{tree.crownSize}</Text>
                    </View>
                }

                {tree.trunkSize &&
                    <View style={styles.row}>
                        <Text style={styles.basicInfoItemStyle}>Průměr kmene:</Text>
                        <Text style={styles.basicInfoItemStyle}>{tree.trunkSize}</Text>
                    </View>
                }
             </View>
         <Text style={styles.subtitle}>Popis</Text>
         <Text style={styles.textStyle}>{tree.aboutDendrology}</Text>
     </Card>


TreeDetail.propTypes = {
    tree: PropTypes.object.isRequired
}

export default TreeDetail;


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