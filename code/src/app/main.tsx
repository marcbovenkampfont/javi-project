import { createRoot } from 'react-dom/client'
import './index.scss'
import { GoogleAuthProvider } from '../auth/GoogleAuthProvider.tsx'
import { AppRoutes } from './router.tsx'
import Router from '../components/router-integration/router.tsx'
import { ModalProvider } from '../utils/modalContext.tsx'

createRoot(document.getElementById('root')!).render(
  <GoogleAuthProvider>
    <ModalProvider>
      <Router routes={AppRoutes()} />
    </ModalProvider>
  </GoogleAuthProvider>
)
