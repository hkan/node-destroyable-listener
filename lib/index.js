// Event emitter
const EventEmitter = require('events')

/**
 * Whether the extending have been done or not.
 *
 * @type {boolean}
 */
const extended = false

const orgAdd = EventEmitter.prototype.addListener
const orgOnce = EventEmitter.prototype.once

/**
 *
 */
module.exports.apply = function () {
    if (extended) {
        return
    }

    extended = true

    EventEmitter.prototype.addListener = function (ev, originalFn) {
        let destroyed = false

        let fn = function (...args) {
            originalFn.apply(this, args)
        }

        let data = {
            isDestroyed() {
                return destroyed
            },
            destroy() {
                destroyed = true
                this.removeListener(ev, fn)
            }
        }

        orgAdd.call(this, ev, fn);
        return data
    }

    EventEmitter.prototype.once = function (ev, originalFn) {
        let triggered = false
        let destroyed = false

        let fn = function (...args) {
            if (triggered) {
                return
            }

            triggered = true
            originalFn.apply(this, args)
        }

        let data = {
            isDestroyed() {
                return destroyed
            }

            destroy() {
                if (destroyed) {
                    return
                }

                destroyed = true
                this.removeListener(ev, fn)
            }
        }

        orgOnce.call(this, ev, fn);
        return data
    }
}

/**
 * Restores to original methods.
 */
module.exports.restore = function () {
    if (!extended) {
        return
    }

    extended = false

    EventEmitter.prototype.addListener = orgAdd
    EventEmitter.prototype.once = orgOnce
}
