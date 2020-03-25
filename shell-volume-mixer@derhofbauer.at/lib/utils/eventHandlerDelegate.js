/**
 * Shell Volume Mixer
 *
 * Event handler mixin.
 *
 * @author Alexander Hofbauer <alex@derhofbauer.at>
 */

/* exported EventHandlerDelegate */

const Lib = imports.misc.extensionUtils.getCurrentExtension().imports.lib;
const Utils = Lib.utils.utils;


/**
 * @mixin
 */
var EventHandlerDelegate = class {
    /**
     * @return {String[]}
     * @private
     */
    get _signals() {
        if (!this.__signals) {
            this.__signals = [];
        }

        return this.__signals;
    }

    /**
     * @param {Object} delegate
     */
    set eventHandlerDelegate(delegate) {
        this.__delegate = delegate;
    }

    /**
     * Connects to a signal.
     *
     * @param {string} signal
     * @param {function} callback
     */
    connect(signal, callback) {
        if (!this.__delegate) {
            Utils.error('EventHandlerDelegate', 'connect', 'Connect called before setting "eventHandlerDelegate"');
            return;
        }

        let id = this.__delegate.connect(signal, callback);
        this._signals.push(id);
    }

    /**
     * Disconnects all locally used signals.
     */
    disconnectAll() {
        if (!this.__delegate) {
            return;
        }

        while (this._signals.length > 0) {
            this.__delegate.disconnect(this._signals.pop());
        }
    }
};
