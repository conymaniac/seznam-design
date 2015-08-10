/**
 * @overview Základní jádro mřížky
 * @version 0.1.2
 * @author Dominik Michna (dominik.michna@firma.seznam.cz)
 */

module.exports = function(Grid) {

'use strict';

/**
 * @class Grid.Builder
 */
var Core = function() {

	// nastavení – defaultní možnosti
	var _opt = {
        directlyManager: true,      // přímo zapnout ovládací prvky
        directlyGrid: false        	// přímo zapnout mřížku
	};

	/**
	 * Konfigurace
	 * 
	 * @param {object} [opt] - nastavení, možnosti
	 * @param {boolean} [directlyManager=true] - zapnout zobrazení manažera/widgetu
	 * @param {boolean} [directlyGrid] - zapnout rovnou zobrazení mřížky
	 * @method cfg
	 * @public
	 */
	this.cfg = function (opt) {
		// nastavení – možnosti z argumentu
		for (var key in opt) { _opt[key] = opt[key]; }
			
        // po načtení DOMu nakonfigurujeme vše
        document.addEventListener('DOMContentLoaded', _init.bind(this));
	};

	/**
	 * Inicializace
	 * 
	 * @method _init
	 * @private
	 */
	var _init = function() {

		/* default font-size */
		var style = window.getComputedStyle(document.body, null).getPropertyValue('font-size');

		/* počítáme s defaultem 16px */
		/* TODO!! Dodělat on resize změnu */
		Grid.RD.FS = parseFloat(style);  	

		// ovládací panel
        if (Grid && Grid.Manager) {
            Grid.Manager.cfg(_opt);

            // dle možností můžeme rovnou i aktivovat kompletní mřížku
            if (_opt.directlyManager) {
                Grid.Manager.activate(true);
            }
        }

		// konfigurace mřížky
        if (Grid && Grid.Builder) {
            Grid.Builder.cfg(_opt);

            // dle možností můžeme rovnou i aktivovat kompletní mřížku
            if (_opt.directlyGrid) {
                Grid.Builder.activate(true, true);
            }
        }
	}

};

// uložíme do Grid objektu
Grid.Core = new Core();

}