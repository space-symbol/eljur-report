import { RouteProps } from 'react-router-dom'
import { MainPage } from '@renderer/pages/MainPage'

const enum AppRoutes {
  MAIN = 'main'
  // NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/'
  // [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />
  }
}
