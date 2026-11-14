import React from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import Portfolio from './App.jsx'
import './index.css'

// The page shell (header.nav, main, footer.closing) is written in index.html and
// filled through portals, so React needs no wrapper element of its own. The first
// render is flushed synchronously: the design kit's scripts (public/assets), which
// load right after this module, then find the finished markup to act on.
// In-page links (the nav's Projects, Stack, Work and Education, the logo, the hero's "See the
// projects", the footer's list, the skip link) take the visitor to their section without writing
// #section into the address. The section is scrolled to as the browser would, and takes the
// keyboard's place in the page, so the next Tab goes on from it. A link opened with a modifier key
// or another mouse button is left to the browser.
document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const link = event.target.closest && event.target.closest('a[href^="#"]')
  if (!link) return
  const id = decodeURIComponent(link.getAttribute('href').slice(1))
  const target = id ? document.getElementById(id) : document.documentElement
  if (!target) return
  event.preventDefault()
  target.scrollIntoView()
  if (target !== document.documentElement) {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }
})

const root = createRoot(document.createElement('div'))
flushSync(() => {
  root.render(
    <React.StrictMode>
      <Portfolio />
    </React.StrictMode>,
  )
})
