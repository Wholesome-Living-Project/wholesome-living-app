import Spacer from 'app/components/ui/Spacer'
import MeditateSvg from 'app/components/welcome/MeditateSvg'
import WavesSvg from 'app/components/welcome/WavesSvg'
import { COLORS } from 'app/theme/theme'
import { Heading2 } from 'app/theme/typography'
import React from 'react'

const LandingSimple = () => {
  return (
    <>
      <WavesSvg />
      <Spacer x={30} />
      <MeditateSvg />
      <Spacer x={4} />
      <Heading2 color={COLORS.PRIMARY}>Wholesome Living</Heading2>
    </>
  )
}

export default LandingSimple
