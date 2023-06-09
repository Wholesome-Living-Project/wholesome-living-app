import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import { useNavigation } from 'solito/build/router/use-navigation'
import styled from 'styled-components'
import { coachExplanationModalRef } from '../../components/refs/modal-refs'
import Button from '../../components/ui/Button'
import { Flex } from '../../components/ui/Flex'
import Spacer from '../../components/ui/Spacer'
import useHaptics from '../../hooks/useHaptics'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { coachImages, useOnboarding } from '../../provider/OnboardingProvider'
import { COLORS, SPACING } from '../../theme/theme'

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
  left: ${({ right }) => (right ? 'auto' : `${SPACING * 1.5}px`)};
  right: ${({ right }) => (right ? `${SPACING * 1.5}px` : `auto`)};
`

const InfoButton = styled(TouchableOpacity)`
  position: absolute;
  top: 50px;
  right: 0;
  padding: ${SPACING * 2}px ${SPACING * 2.7}px;
`

const ChooseCoach = () => {
  const { windowWidth, windowHeight } = useWindowDimensions()
  const navigation = useNavigation()
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const listRef = useRef<FlatList>(null)
  const { setCoach } = useOnboarding()
  const { doMediumFeedback } = useHaptics()

  useEffect(() => {
    coachExplanationModalRef.current?.expand()
  }, [])

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
      <InfoButton
        onPress={async () => {
          await doMediumFeedback()
          coachExplanationModalRef.current?.expand()
        }}>
        <FontAwesome5 name="question-circle" size={25} color={COLORS.WHITE} />
      </InfoButton>
      <ButtonContainer>
        <Button
          buttonType={'black'}
          onPress={() => {
            navigation?.navigate('chat')
            setCoach(currentSlide)
          }}>
          Choose {currentSlide === 0 ? 'Gabriel' : 'Aurora'}
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

export default ChooseCoach
