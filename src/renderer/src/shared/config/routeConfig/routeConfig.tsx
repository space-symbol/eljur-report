import { RouteProps } from 'react-router-dom'
import { MainPage } from '@renderer/pages/MainPage'
import { AuthPage } from '@renderer/pages/AuthPage'
import { ProfilePage } from '@renderer/pages/ProfilePage'

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
}
export const enum AppRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  AUTH = 'auth'
}

export const enum RoutePaths {
  MAIN = '/',
  AUTH = '/auth',
  PROFILE = '/profile'
}

export const RoutePath: Record<AppRoutes, RoutePaths> = {
  [AppRoutes.MAIN]: RoutePaths.MAIN,
  [AppRoutes.AUTH]: RoutePaths.AUTH,
  [AppRoutes.PROFILE]: RoutePaths.PROFILE
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
    authOnly: true
  },
  [AppRoutes.AUTH]: {
    path: RoutePath.auth,
    element: <AuthPage />
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
    authOnly: true
  }
}
