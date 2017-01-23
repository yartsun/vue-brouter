/* @flow */

import type Router from '../index'
import { assert } from './warn'

const positionStore = Object.create(null)

export function handleScroll (
  router: Router,
  key: string,
  to: Route,
  from: Route,
  isPop: boolean
) {
  if (!router.app) {
    return
  }

  const behavior = router.options.scrollBehavior
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', `scrollBehavior must be a function`)
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(() => {
    let position = getScrollPosition(key)
    const shouldScroll = behavior(to, from, isPop ? position : null)
    if (!shouldScroll) {
      return
    }
    const isObject = typeof shouldScroll === 'object'
    if (isObject && typeof shouldScroll.selector === 'string') {
      const el = document.querySelector(shouldScroll.selector)
      if (el) {
        position = getElementPosition(el)
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll)
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll)
    }

    if (position) {
      window.scrollTo(position.x, position.y)
    }
  })
}

export function saveScrollPosition (key: string) {
  if (!key) return
  positionStore[key] = {
    x: window.pageXOffset,
    y: window.pageYOffset
  }
}

function getScrollPosition (key: string): ?Object {
  if (!key) return
  return positionStore[key]
}

function getElementPosition (el: Element): Object {
  const docRect = document.documentElement.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  }
}

function isValidPosition (obj: Object): boolean {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj: Object): Object {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function isNumber (v: any): boolean {
  return typeof v === 'number'
}