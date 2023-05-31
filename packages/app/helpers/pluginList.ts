import { EXTRA_COLORS } from 'app/theme/theme'
import { FontAwesomeType } from 'app/types/FontAwesome'
import { IonIconType } from 'app/types/IonIcon'
import { MaterialCommunityType } from 'app/types/MaterialCommunity'
import { MaterialIconsType } from 'app/types/MaterialIcons'
import { UserPluginName } from '../../api/openapi'

export const PLUGIN_COLORS: { [key in UserPluginName]: string } = {
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
  plugin?: UserPluginName
  onboardingRoute?: string
  onboardingSubRoutes?: string[]
}

export const PLUGINS: { [key in UserPluginName]: PluginType } = {
  meditation: {
    title: 'Meditate',
    plugin: UserPluginName.PluginNameMeditation,
    color: PLUGIN_COLORS.meditation,
    icon: 'meditation',
    route: 'meditation',
    onboardingRoute: 'meditation',
    onboardingSubRoutes: ['goal', 'notifications'],
  },
  finance: {
    title: 'Finance',
    color: PLUGIN_COLORS.finance,
    plugin: UserPluginName.PluginNameFinance,
    icon: 'finance',
    route: 'finance',
    onboardingRoute: 'finance',
    onboardingSubRoutes: ['strategy', 'notifications'],
  },
  elevator: {
    title: 'Stairs',
    color: PLUGIN_COLORS.elevator,
    plugin: UserPluginName.PluginNameElevator,
    icon: 'elevator-passenger',
    route: 'elevator',
    onboardingRoute: 'elevator',
    onboardingSubRoutes: ['notifications'],
  },
}
