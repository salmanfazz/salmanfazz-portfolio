import React from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import Portfolio from './App.jsx'
import './index.css'

// The page shell (header.nav, main, footer.closing) is written in index.html and
// filled through portals, so React needs no wrapper element of its own. The first
// render is flushed synchronously: the design kit's scripts (public/assets), which
// load right after this module, then find the finished markup to act on.
const root = createRoot(document.createElement('div'))
flushSync(() => {
  root.render(
    <React.StrictMode>
      <Portfolio />
    </React.StrictMode>,
  )
})
