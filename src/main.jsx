import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// The prerendered HTML (scripts/prerender.mjs) is a client-render snapshot for
// crawlers/fast FCP, not SSR — so we mount fresh with createRoot rather than
// hydrate (hydration would mismatch since the snapshot lacks SSR text markers).
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
