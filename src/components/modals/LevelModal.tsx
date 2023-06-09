import BottomSheet from 'axelra-react-native-bottom-sheet'
import React, { useCallback } from 'react'
import { Image, Keyboard, Platform } from 'react-native'
import styled from 'styled-components'
import { PLUGINS } from '../../helpers/pluginList'
import { useModal } from '../../hooks/useModal'
import { useLevels } from '../../provider/LevelProvider'
import { SPACING } from '../../theme/theme'
import { Heading3 } from '../../theme/typography'
import PluginBanner from '../discover/PluginBanner'
import Tree from '../plugins/Tree'
import { levelModalRef } from '../refs/modal-refs'
import { BottomSheetViewFlex } from '../ui/BottomSheetViewFlex'
import Button from '../ui/Button'
import { Flex } from '../ui/Flex'
import Spacer from '../ui/Spacer'

const Container = styled(Flex)`
  padding: ${SPACING * 2}px ${SPACING * 3}px;
  min-height: 900px;
`

const AbsoluteImage = styled(Image)`
  position: absolute;
`

const LevelModal = () => {
  const modalProps = useModal({ snapPoints: [`65%`] })
  const { currentlyInspectedPlugin, experienceMap, levelMap } = useLevels()

  const onModalClose = useCallback(() => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()
    }
  }, [])

  return (
    <BottomSheet
      ref={levelModalRef}
      index={-1}
      enablePanDownToClose
      onClose={onModalClose}
      {...modalProps}>
      <BottomSheetViewFlex flex={1} justify={'center'} column>
        <Container>
          <Flex row justify={'space-between'}>
            <Heading3>
              {currentlyInspectedPlugin && PLUGINS[currentlyInspectedPlugin].title}
            </Heading3>
            {currentlyInspectedPlugin && (
              <PluginBanner plugin={currentlyInspectedPlugin} size={50} />
            )}
          </Flex>
          <Tree
            height={290}
            level={
              currentlyInspectedPlugin && levelMap?.[currentlyInspectedPlugin]
                ? levelMap?.[currentlyInspectedPlugin]
                : 0
            }
            experience={currentlyInspectedPlugin ? experienceMap?.[currentlyInspectedPlugin] : 0}
            experienceToNextLevel={50}
          />
          <Spacer x={4} />
          <Button small buttonType={'black'} onPress={() => levelModalRef.current?.close()}>
            close
          </Button>
        </Container>
      </BottomSheetViewFlex>
    </BottomSheet>
  )
}

export default LevelModal
