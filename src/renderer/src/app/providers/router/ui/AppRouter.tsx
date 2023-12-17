import { Route, Routes } from 'react-router-dom'
import { ReactElement, Suspense, useCallback } from 'react'
import { routeConfig } from '@renderer/shared/config/routeConfig/routeConfig'
import { Loader } from '@renderer/shared/ui/Loader/Loader'
import { AppRoutesProps } from '@renderer/shared/config/routeConfig/routeConfig'
import { RequireAuth } from './RequireAuth'

export const AppRouter = (): ReactElement => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <Suspense fallback={<Loader />}>{route.element}</Suspense>
    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
      />
    )
  }, [])

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
}
