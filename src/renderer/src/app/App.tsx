import { AppRouter } from '@renderer/app/providers/router'
import { Suspense, useEffect } from 'react'
import { getUserInited, userActions } from '@renderer/entities/User'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { Loader } from '@renderer/shared/ui/Loader/Loader'
import { Navbar } from '@renderer/widgets/Navbar'

const App = () => {
  const dispatch = useDispatch()
  const inited = useSelector(getUserInited)
  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={'app'}>
      <Navbar />
      <Suspense fallback={<Loader />}>{inited && <AppRouter />}</Suspense>
    </div>
  )
}

export default App
