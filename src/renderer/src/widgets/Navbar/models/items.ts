import { RoutePaths } from '@renderer/shared/config/routeConfig/routeConfig'

export interface NavbarItemType {
  path: RoutePaths
  text: string
  authOnly?: boolean
}

export const navbarItemsList: NavbarItemType[] = [
  {
    path: RoutePaths.MAIN,
    text: 'Главная',
    authOnly: true
  },
  {
    path: RoutePaths.PROFILE,
    text: 'Профиль',
    authOnly: true
  }
]
