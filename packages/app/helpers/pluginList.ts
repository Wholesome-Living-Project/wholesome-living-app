import { EXTRA_COLORS } from 'app/theme/theme'
import { FontAwesomeType } from 'app/types/FontAwesome'
import { IonIconType } from 'app/types/IonIcon'
import { MaterialCommunityType } from 'app/types/MaterialCommunity'
import { MaterialIconsType } from 'app/types/MaterialIcons'

export enum plugins {
  MEDITATE = 'MEDITATE',
  ELEVATOR = 'ELEVATOR',
  RUN = 'RUN',
  SLEEP = 'SLEEP',
  WORKOUT = 'WORKOUT',
  DIET = 'DIET',
  FINANCE = 'FINANCE',
}

export const PLUGIN_COLORS: { [key in plugins]: string } = {
  MEDITATE: EXTRA_COLORS.BLUE,
  ELEVATOR: EXTRA_COLORS.PURPLE,
  RUN: EXTRA_COLORS.FINA,
  SLEEP: EXTRA_COLORS.MAUVE,
  WORKOUT: EXTRA_COLORS.JORDY,
  DIET: EXTRA_COLORS.PURPLE,
  FINANCE: EXTRA_COLORS.SUNSET,
}

export type PluginType = {
  title: string
  route?: string
  color?: string
  materialIcon?: MaterialIconsType
  faIcon?: FontAwesomeType
  ionIcon?: IonIconType
  icon?: MaterialCommunityType
  plugin?: plugins
  onboardingRoute?: string
  onboardingSubRoutes?: string[]
}

export const PLUGINS: { [key in plugins]: PluginType } = {
  MEDITATE: {
    title: 'Meditate',
    plugin: plugins.MEDITATE,
    color: PLUGIN_COLORS.MEDITATE,
    icon: 'meditation',
    route: 'meditation',
    onboardingRoute: 'meditation',
    onboardingSubRoutes: ['goal', 'notifications'],
  },
  FINANCE: {
    title: 'Finance',
    color: PLUGIN_COLORS.FINANCE,
    plugin: plugins.FINANCE,
    icon: 'finance',
    route: 'finance',
    onboardingRoute: 'finance',
    onboardingSubRoutes: ['strategy', 'notifications'],
  },
  ELEVATOR: {
    title: 'Elevator',
    color: PLUGIN_COLORS.ELEVATOR,
    plugin: plugins.ELEVATOR,
    icon: 'elevator-passenger',
    route: 'elevator',
    onboardingRoute: 'elevator',
    onboardingSubRoutes: ['behavior', 'notifications'],
  },
  RUN: {
    title: 'Run',
    color: PLUGIN_COLORS.RUN,
    plugin: plugins.RUN,
    materialIcon: 'directions-run',
    route: 'run',
  },
  SLEEP: {
    title: 'Sleep',
    color: PLUGIN_COLORS.SLEEP,
    icon: 'power-sleep',
    plugin: plugins.SLEEP,
    route: 'sleep',
  },
  WORKOUT: {
    title: 'Workout',
    color: PLUGIN_COLORS.WORKOUT,
    plugin: plugins.WORKOUT,
    materialIcon: 'fitness-center',
    route: 'workout',
  },
  DIET: {
    title: 'Diet',
    color: PLUGIN_COLORS.DIET,
    icon: 'weight-kilogram',
    route: 'diet',
    plugin: plugins.DIET,
  },
}
