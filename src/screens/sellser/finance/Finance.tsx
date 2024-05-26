import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderSeller from '../../../reusables/header/HeaderSeller'
import HeaderTitleSeller from '../../../reusables/Title/HeaderTitleSeller'
import HeightSpacerSeller from '../../../reusables/height_spacer/HeightSpacerSeller'
import { COLORS } from '../../../constant/theme'

const Finance = () => {
    return (
        <View style={styles.container}>
            <HeaderTitleSeller text={'Tài chính'} />
            <HeightSpacerSeller color={COLORS.gray_3} height={10} />
            <View>
                <View>
                    <View>
                        <Text>
                            Tổng số dư
                        </Text>
                        <Text>
                            Lịch sử giao dịch
                        </Text>
                    </View>
                    <View></View>
                </View>
                <View>
                    <Text>Doanh Thu Đơn Hàng</Text>
                </View>
            </View>
        </View>
    )
}

export default Finance

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flexDirection: 'column',
    }
})