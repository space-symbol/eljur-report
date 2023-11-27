import App from '@renderer/app/App'
import '@renderer/app/styles/index.css'
import { HashRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StoreProvider } from '@renderer/app/providers/StoreProvider'

const domRootNode = document.getElementById('root')!
const root = createRoot(domRootNode)
root.render(
  <StoreProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </StoreProvider>
)
