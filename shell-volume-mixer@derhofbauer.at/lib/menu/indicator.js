/**
 * Shell Volume Mixer
 *
 * Customized indicator using Volume Menu.
 *
 * @author Alexander Hofbauer <alex@derhofbauer.at>
 */

/* exported Indicator */

const Lib = imports.misc.extensionUtils.getCurrentExtension().imports.lib;
const Volume = imports.ui.status.volume;

const { Menu } = Lib.menu.menu;


var Indicator = class extends Volume.Indicator
{
    constructor(mixer, options) {
        options = options || {};

        super();

        this._control = mixer.control;

        //TODO remove current volume menu before overwriting
        this._volumeMenu = new Menu(mixer, options);
        this._volumeMenu.connect('icon-changed', this.updateIcon.bind(this));
    }

    updateIcon() {
        let icon = this._volumeMenu.getIcon();

        if (icon != null) {
            this.indicators.show();
            this._primaryIndicator.icon_name = icon;
        } else {
            this.indicators.hide();
        }
    }

    /* XXX custom window implementation done for now?
   TODO parent shows osdWindowManager here
    _onScrollEvent(actor, event) {
        //return this._volumeMenu.scroll(event);
        super._onScrollEvent(actor, event); //XXX
    },
    */

    destroy() {
        if (this.menu) {
            this.menu.destroy();
            this.menu = null;
        }
    }
};
