/**
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/
 *
 */

import UUID from 'uuid'
import Cookie from 'tiny-cookie'
import UA from 'ua-device'
import { stringify } from 'querystring'

// ua
const detectRs = new UA(navigator.userAgent)

const isSupportLocalStorage = !!window.localStorage

// variables
const uuidName = 'isk_uuid'
const sidName = 'isk_sid'

// feature detect

// screen
const screen = `${window.screen.width}*${window.screen.height}`

// uuid
const uuid = (function () {
  let rs
    // check if cookie has uuid
  let _uuid = Cookie.get(uuidName)
  if (!_uuid) {
    if (isSupportLocalStorage) {
      _uuid = window.localStorage.getItem(uuidName)
    }
  }

  rs = _uuid || UUID.v4()
    // save to cookie and localstorage
  Cookie.set(uuidName, rs, {
    expires: '2Y'
  })
  isSupportLocalStorage && window.localStorage.setItem(uuidName, rs)
  return rs
})()

// session id
const sessionId = (function () {
  let rs = Cookie.get(sidName)
  if (!rs) {
    rs = new Date().getTime()
    Cookie.set(sidName, rs, {
      expires: '30m'
    })
  }
  return rs
})()

const Tracker = class {
  constructor () {
    this.params = {}
    this.plugins = []
    if (!this.beaconUrl) {
      console.warn('no beacon server is specified')
    }
  }

  execPlugins () {
    for (let i = 0; i < this.plugins.length; i++) {
      this.plugins[i].fn.call(this)
    }
  }

  _set (key, val) {
    this.params[key] = val
  }

  registerPlugin (name, fn) {
    this.plugins.push({
      name,
      fn: fn
    })
  }

  set (Obj) {
    for (let i in Obj) {
      this._set(i, Obj[i])
    }
    return this
  }

  send () {
    new window.Image().src = `${this.beaconUrl.indexOf('?') ? (this.beaconUrl + '&') : '?'}${this.buildParams()}`
  }

  buildParams () {
    return stringify(this.params)
  }
}

/**
 process on server
 date
 user.ip
 location.country
 location.province
 location.city
*/

const tracker = new Tracker()
tracker.set({
  'session.id': sessionId,
  'user.uuid': uuid,
  time: new Date().getTime(), // @todo should avoid wrong local time
  'page.url': encode(window.location.href),
  'page.referrer': encode(document.referrer),
  'device.id': uuid,
  'device.brand': lower(detectRs.device.manufacturer),
  'device.model': lower(detectRs.device.model),
  'device.browser': lower(detectRs.browser.name),
  'device.screen': screen,
  'device.browser_version': encode(detectRs.browser.version.original || detectRs.browser.version.alias),
  'device.type': lower(detectRs.device.type),
  'device.os': lower(detectRs.os.name),
  'device.os_version': encode(detectRs.os.version.alias || detectRs.os.version.original)
})

export default tracker

function encode (str) {
  return encodeURIComponent(str)
}

function lower (arg) {
  return arg ? arg.toLowerCase() : ''
}

/**
* Usage
* import Tracker from 'tracker'
* Tracker.set({
    app: 'lottery',
    type: 'page',
    'user.uid': 'uid'
  }).send()

*/
