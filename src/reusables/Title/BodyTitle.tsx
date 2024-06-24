import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constant/theme';

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
        color: COLORS.gray_1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    leftText:{
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold'
    }
})