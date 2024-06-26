import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const HeaderSeller = () => {
    const navigation = useNavigation();
    return (
        <View>
            <View style = {styles.title}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile' as never)}
                >

                <Ionicons name='arrow-back' size={25}/>
                </TouchableOpacity>
                <View>
                    <Text>shop cua toi</Text>
                </View>
                <View>
                    <TouchableOpacity >
                        <Ionicons
                            name='settings'
                            size={26}
                            color='black'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text>
                    Phần header Vinh stype header profile xong import vào là được
                </Text>
            </View>
        </View>
    )
}

export default HeaderSeller

const styles = StyleSheet.create({
    title:{

        flexDirection: 'row'
    }
})