import { SettingsPluginName } from '../../api/openapi'
import { EXTRA_COLORS } from '../theme/theme'
import { FontAwesomeType } from '../types/FontAwesome'
import { IonIconType } from '../types/IonIcon'
import { MaterialCommunityType } from '../types/MaterialCommunity'
import { MaterialIconsType } from '../types/MaterialIcons'

export const PLUGIN_COLORS: { [key in SettingsPluginName]: string } = {
  meditation: EXTRA_COLORS.BLUE,
  finance: EXTRA_COLORS.SUNSET,
  elevator: EXTRA_COLORS.FINA,
}

export const PLUGIN_COLORS_LIGHT: { [key in SettingsPluginName]: string } = {
  meditation: EXTRA_COLORS.BLUE_LIGHT,
  finance: EXTRA_COLORS.SUNSET_LIGHT,
  elevator: EXTRA_COLORS.FINA_LIGHT,
}

export type PluginType = {
  title: string
  route?: string
  color?: string
  colorLight?: string
  materialIcon?: MaterialIconsType
  faIcon?: FontAwesomeType
  ionIcon?: IonIconType
  icon?: MaterialCommunityType
  plugin?: SettingsPluginName
  onboardingRoute?: string
  onboardingSubRoutes?: string[]
  image: any
}

export const PLUGINS: { [key in SettingsPluginName]: PluginType } = {
  meditation: {
    title: 'Meditate',
    plugin: SettingsPluginName.PluginNameMeditation,
    color: PLUGIN_COLORS.meditation,
    colorLight: PLUGIN_COLORS_LIGHT.meditation,
    icon: 'meditation',
    route: 'meditation',
    onboardingRoute: 'meditation',
    onboardingSubRoutes: ['goal', 'notifications'],
    image: require('../../assets/images/woman_meditating_2.jpg'),
  },
  finance: {
    title: 'Invest',
    color: PLUGIN_COLORS.finance,
    colorLight: PLUGIN_COLORS_LIGHT.finance,
    plugin: SettingsPluginName.PluginNameFinance,
    icon: 'finance',
    route: 'finance',
    onboardingRoute: 'finance',
    onboardingSubRoutes: ['strategy', 'notifications'],
    image: require('../../assets/images/woman_investing.jpg'),
  },
  elevator: {
    title: 'Stairs',
    color: PLUGIN_COLORS.elevator,
    colorLight: PLUGIN_COLORS_LIGHT.elevator,
    plugin: SettingsPluginName.PluginNameElevator,
    icon: 'elevator-passenger',
    route: 'elevator',
    onboardingRoute: 'elevator',
    onboardingSubRoutes: ['notifications'],
    image: require('../../assets/images/man_walking_stairs.jpg'),
  },
}
