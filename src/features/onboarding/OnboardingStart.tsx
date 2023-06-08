import { Ionicons } from '@expo/vector-icons'
import { alpha } from 'axelra-react-native-utilities'
import React, { useRef, useState } from 'react'
import { FlatList, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'
import Button from '../../components/ui/Button'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { coachImages, useOnboarding } from '../../provider/OnboardingProvider'
import { COLORS, OUTER_BORDER_RADIUS, SPACING } from '../../theme/theme'

const WelcomeContainer = styled(Flex)`
  margin: ${SPACING * 8}px 0 ${SPACING * 2}px;
  padding: ${SPACING * 2}px;
  background: ${alpha(0.7, COLORS.WHITE)};
  border-radius: ${OUTER_BORDER_RADIUS}px;
`

const StyledImage = styled(Image)<{ width?: number; height?: number }>`
  padding: ${SPACING * 2}px;
  width: ${({ width }) => width || 300}px;
  height: ${({ height }) => height || 300}px;
`

const StyleFlatList = styled(FlatList)`
  position: absolute;
  height: 100%;
  width: 100%;
`

const ButtonContainer = styled(Flex)`
  padding: 0 ${SPACING * 2}px ${SPACING * 3}px;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: ${SPACING * 3}px ${SPACING * 2}px ${SPACING * 5}px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`

const Arrow = styled(Ionicons)<{ right?: boolean }>`
  position: absolute;
  top: 400px;
  left: ${({ right }) => (right ? 'auto' : `${SPACING}px`)};
  right: ${({ right }) => (right ? `${SPACING}px` : `auto`)};
`

const OnboardingStart = () => {
  const { windowWidth, windowHeight } = useWindowDimensions()
  const navigation = useNavigation()
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const listRef = useRef<FlatList>(null)
  const { setCoach } = useOnboarding()

  return (
    <>
      <StyleFlatList
        data={coachImages}
        ref={listRef}
        snapToAlignment={'start'}
        snapToInterval={windowWidth}
        decelerationRate={'fast'}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const slideSize = event.nativeEvent.layoutMeasurement.width
          const index = (event.nativeEvent.contentOffset.x / slideSize).toFixed(0)
          setCurrentSlide(Number(index))
        }}
        renderItem={({ item }) => (
          <StyledImage
            source={item as ImageSourcePropType}
            width={windowWidth}
            height={windowHeight}
          />
        )}
        horizontal
      />
      {currentSlide === 1 && (
        <TouchableOpacity
          onPress={() => listRef.current?.scrollToIndex({ index: 0, animated: true })}>
          <Arrow name={'chevron-back-circle'} color={COLORS.WHITE} size={50} />
        </TouchableOpacity>
      )}
      {currentSlide === 0 && (
        <TouchableOpacity
          onPress={() => listRef.current?.scrollToIndex({ index: 1, animated: true })}>
          <Arrow name={'chevron-forward-circle'} right color={COLORS.WHITE} size={50} />
        </TouchableOpacity>
      )}

      <ButtonContainer>
        <Button
          buttonType={'black'}
          onPress={() => {
            navigation?.navigate('chat')
            setCoach(currentSlide)
          }}>
          Choose Coach
        </Button>

        <Spacer x={2} />

        <Button
          small
          color={COLORS.WHITE}
          buttonType={'secondary'}
          onPress={() => navigation?.navigate('choose-plugins')}>
          Skip
        </Button>
      </ButtonContainer>
    </>
  )
}

export default OnboardingStart
