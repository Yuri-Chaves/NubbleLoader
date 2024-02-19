import { useAppTheme } from '@hooks'
import { ThemeColors } from '@theme'
import React, { useRef } from 'react'
import { Animated, Easing, ViewStyle } from 'react-native'
import { Box } from '../Box/Box'
import { InnerCircle } from './components/InnerCircle'
import { OuterCircle } from './components/OuterCircle'

interface Props {
  color?: ThemeColors
  size?: number
}

export function Loader({ color = 'primary', size = 40 }: Props) {
  const { colors } = useAppTheme()

  const outerAnim = useRef(new Animated.Value(0)).current
  const innerAnim = useRef(new Animated.Value(0)).current

  Animated.loop(
    Animated.timing(outerAnim, {
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.ease,
      duration: 1000,
    }),
  ).start()

  Animated.loop(
    Animated.timing(innerAnim, {
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: 1000,
    }),
  ).start()

  const innerSpin = innerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  })
  const outerSpin = outerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const $view: ViewStyle = {
    position: 'absolute',
  }

  return (
    <Box position="relative" width={40} height={40}>
      <Animated.View style={[$view, { transform: [{ rotate: outerSpin }] }]}>
        <OuterCircle color={colors[color]} size={size} />
      </Animated.View>
      <Animated.View style={[$view, { transform: [{ rotate: innerSpin }] }]}>
        <InnerCircle color={colors[color]} size={size} />
      </Animated.View>
    </Box>
  )
}
