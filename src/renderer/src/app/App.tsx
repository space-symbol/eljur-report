import { AppRouter } from '@renderer/app/providers/router'
import { Suspense } from 'react'

function App() {
  return (
    <div className="app">
      <Suspense fallback={''}>
        <AppRouter />
      </Suspense>
    </div>
  )
}

export default App
