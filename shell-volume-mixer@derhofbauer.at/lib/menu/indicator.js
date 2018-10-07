/**
 * Shell Volume Mixer
 *
 * Customized indicator using Volume Menu.
 *
 * @author Alexander Hofbauer <alex@derhofbauer.at>
 */

/* exported Indicator */

const Lang = imports.lang;
const Lib = imports.misc.extensionUtils.getCurrentExtension().imports.lib;
const PanelMenu = imports.ui.panelMenu;
const Volume = imports.ui.status.volume;

const { Menu } = Lib.menu.menu;


var Indicator = new Lang.Class({
    Name: 'GvmIndicator',
    Extends: Volume.Indicator,

    _init(mixer, options) {
        options = options || {};

        // no parent here as we cannot unbind signals with array functions
        PanelMenu.SystemIndicator.prototype._init.call(this);

        this._primaryIndicator = this._addIndicator();
        this._control = mixer.control;

        this._volumeMenu = new Menu(mixer, options);
        this._volumeMenu.connect('icon-changed', this.updateIcon.bind(this));

        this.menu.addMenuItem(this._volumeMenu);

        this.indicators.connect('scroll-event', this._onScrollEvent.bind(this));
    },

    updateIcon() {
        let icon = this._volumeMenu.getIcon();

        if (icon != null) {
            this.indicators.show();
            this._primaryIndicator.icon_name = icon;
        } else {
            this.indicators.hide();
        }
    },

    /* XXX custom window implementation done for now?
   TODO parent shows osdWindowManager here
    _onScrollEvent(actor, event) {
        //return this._volumeMenu.scroll(event);
        this.parent(actor, event); //XXX
    },
    */

    destroy() {
        if (this.menu) {
            this.menu.destroy();
            this.menu = null;
        }
    }
});
