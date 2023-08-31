import BottomSheet from 'axelra-react-native-bottom-sheet'
import { createRef } from 'react'

// welcome
export const signInModalRef = createRef<BottomSheet>()
export const signUpModalRef = createRef<BottomSheet>()

// dashboard
export const meditateTimePickerModalRef = createRef<BottomSheet>()
export const levelModalRef = createRef<BottomSheet>()
export const levelExplanationModalRef = createRef<BottomSheet>()
export const coachExplanationModalRef = createRef<BottomSheet>()

export const deleteAccountModalRef = createRef<BottomSheet>()
