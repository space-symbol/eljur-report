import { Route, RouteProps, Routes } from 'react-router-dom'
import { ReactElement, Suspense } from 'react'
import { routeConfig } from '@renderer/shared/config/routeConfig/routeConfig'
import { Loader } from '@renderer/shared/ui/Loader/Loader'

export const AppRouter = (): ReactElement => {
  const renderWithWrapper = (route: RouteProps): ReactElement => {
    const element = <Suspense fallback={<Loader />}>{route.element}</Suspense>

    return <Route key={route.path} path={route.path} element={element} />
  }
  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
}
