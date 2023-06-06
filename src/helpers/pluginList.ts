import { SettingsPluginName } from '../../api/openapi'
import { EXTRA_COLORS } from '../theme/theme'
import { FontAwesomeType } from '../types/FontAwesome'
import { IonIconType } from '../types/IonIcon'
import { MaterialCommunityType } from '../types/MaterialCommunity'
import { MaterialIconsType } from '../types/MaterialIcons'

export const PLUGIN_COLORS: { [key in SettingsPluginName]: string } = {
  meditation: EXTRA_COLORS.BLUE,
  finance: EXTRA_COLORS.PURPLE,
  elevator: EXTRA_COLORS.FINA,
}

export type PluginType = {
  title: string
  route?: string
  color?: string
  materialIcon?: MaterialIconsType
  faIcon?: FontAwesomeType
  ionIcon?: IonIconType
  icon?: MaterialCommunityType
  plugin?: SettingsPluginName
  onboardingRoute?: string
  onboardingSubRoutes?: string[]
}

export const PLUGINS: { [key in SettingsPluginName]: PluginType } = {
  meditation: {
    title: 'Meditate',
    plugin: SettingsPluginName.PluginNameMeditation,
    color: PLUGIN_COLORS.meditation,
    icon: 'meditation',
    route: 'meditation',
    onboardingRoute: 'meditation',
    onboardingSubRoutes: ['goal', 'notifications'],
  },
  finance: {
    title: 'Finance',
    color: PLUGIN_COLORS.finance,
    plugin: SettingsPluginName.PluginNameFinance,
    icon: 'finance',
    route: 'finance',
    onboardingRoute: 'finance',
    onboardingSubRoutes: ['strategy', 'notifications'],
  },
  elevator: {
    title: 'Stairs',
    color: PLUGIN_COLORS.elevator,
    plugin: SettingsPluginName.PluginNameElevator,
    icon: 'elevator-passenger',
    route: 'elevator',
    onboardingRoute: 'elevator',
    onboardingSubRoutes: ['notifications'],
  },
}
