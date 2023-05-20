import { EXTRA_COLORS } from 'app/theme/theme'
import { FontAwesomeType } from 'app/types/FontAwesome'
import { IonIconType } from 'app/types/IonIcon'
import { MaterialCommunityType } from 'app/types/MaterialCommunity'
import { MaterialIconsType } from 'app/types/MaterialIcons'

export enum plugins {
  MEDITATE = 'MEDITATE',
  ELEVATOR = 'ELEVATOR',
  RUN = 'RUN',
  //SLEEP = 'SLEEP',
  WORKOUT = 'WORKOUT',
  //DIET = 'DIET',
}

export const PLUGIN_COLORS: { [key in plugins]: string } = {
  MEDITATE: EXTRA_COLORS.BLUE,
  ELEVATOR: EXTRA_COLORS.PURPLE,
  RUN: EXTRA_COLORS.OCEAN,
  //SLEEP: EXTRA_COLORS.MAUVE,
  WORKOUT: EXTRA_COLORS.JORDY,
  //DIET: EXTRA_COLORS.PURPLE,
}

export type PluginType = {
  title: string
  route: string
  color?: string
  materialIcon?: MaterialIconsType
  faIcon?: FontAwesomeType
  ionIcon?: IonIconType
  icon?: MaterialCommunityType
}

export const PLUGINS: { [key in plugins]: PluginType } = {
  MEDITATE: {
    title: 'Meditate',
    color: PLUGIN_COLORS.MEDITATE,
    icon: 'meditation',
    route: 'meditation',
  },
  ELEVATOR: {
    title: 'Elevator',
    color: PLUGIN_COLORS.ELEVATOR,
    icon: 'elevator-passenger',
    route: 'elevator',
  },
  RUN: {
    title: 'Run',
    color: PLUGIN_COLORS.RUN,
    materialIcon: 'directions-run',
    route: 'run',
  },
  //SLEEP: { title: 'Sleep', color: PLUGIN_COLORS.SLEEP, icon: 'power-sleep', route: 'sleep' },
  WORKOUT: {
    title: 'Workout',
    color: PLUGIN_COLORS.WORKOUT,
    materialIcon: 'fitness-center',
    route: 'workout',
  },
  //DIET: { title: 'Diet', color: PLUGIN_COLORS.DIET, icon: 'weight-kilogram', route: 'diet' },
}
