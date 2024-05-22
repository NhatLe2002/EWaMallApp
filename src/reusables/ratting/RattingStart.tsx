import React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

interface Props {
  star: number,
  size: number
}

const RatingStar: React.FC<Props> = ({ star, size }) => {
  const fullStars = Math.floor(star)
  const halfStar = star % 1 >= 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar

  const stars = [
    ...Array(fullStars).fill('star'),
    ...Array(halfStar).fill('star-half-o'),
    ...Array(emptyStars).fill('star-o')
  ]

  return (
    <View style={styles.container}>
      {stars.map((starType, index) => (
        <Icon key={index} name={starType} size={size} color="#FFD700" />
      ))}
    </View>
  )
}

export default RatingStar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
