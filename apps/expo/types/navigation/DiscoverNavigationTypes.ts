import { FontAwesomeType } from 'app/types/FontAwesome'
import { IonIconType } from 'app/types/IonIcon'
import { MaterialCommunityType } from 'app/types/MaterialCommunity'
import { MaterialIconsType } from 'app/types/MaterialIcons'

export type PluginNavigationProps = {
  name: string
  color: string
  icon: MaterialCommunityType
  faIcon: FontAwesomeType
  materialIcon: MaterialIconsType
  ionIcon: IonIconType
}
