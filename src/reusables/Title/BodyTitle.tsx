import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface BodyTitleProps {
    titleLeft: string;
    titleRight: string;
  }
const BodyTitle : React.FC<BodyTitleProps> = ({ titleLeft,  titleRight}) => {
    return (
        <View>
            <View style={styles.title}>
                <Text style = {styles.leftText}>{titleLeft}</Text>
                <TouchableOpacity>

                    <Text>{titleRight}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BodyTitle

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftText:{
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold'
    }
})