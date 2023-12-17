import { useSelector } from 'react-redux'
import { getUserAuthData } from '@renderer/entities/User'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePath } from '@renderer/shared/config/routeConfig/routeConfig'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useSelector(getUserAuthData)
  const location = useLocation()

  if (!auth) {
    return <Navigate to={RoutePath.auth} state={{ from: location }} replace />
  }

  return children
}
