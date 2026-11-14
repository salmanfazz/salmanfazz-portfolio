import React from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import Portfolio from './App.jsx'
import './index.css'

// In-page links (the nav's Projects, Stack, Work and Education, the logo, the hero's "See the
// projects", the footer's list, the skip link) take the visitor to their section without writing
// #section into the address. The page glides there with the browser's own smooth scroll (asked for
// on 2026-11-14): one move per click, which the visitor's wheel, touch or keys take over at any
// moment, and a plain jump under reduced motion. No script holds or steers the page. The section's
// heading takes the keyboard's place, so the next Tab goes on from it; a keyboard visitor sees the
// kit's own focus ring on that heading, a mouse click draws none. A link opened with a modifier key
// or another mouse button is left to the browser.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const link = event.target.closest && event.target.closest('a[href^="#"]')
  if (!link) return
  const id = decodeURIComponent(link.getAttribute('href').slice(1))
  const target = id ? document.getElementById(id) : document.documentElement
  if (!target) return
  event.preventDefault()
  target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' })
  if (target !== document.documentElement) {
    const spot = target.querySelector('h1, h2') || target
    if (!spot.hasAttribute('tabindex')) spot.setAttribute('tabindex', '-1')
    spot.focus({ preventScroll: true })
  }
})

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
