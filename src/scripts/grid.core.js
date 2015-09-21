/**
 * @overview Základní jádro mřížky
 * @version 0.1.4
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
		content: 'body', 				// selector pro element reprezentující hlavní obsah 
		directlyCfg: false, 			// přímo nakonfigurovat, nečekat na DOMContentLoaded
        directlyManager: true,      	// přímo zapnout ovládací prvky
        directlyGrid: false        		// přímo zapnout mřížku
	};

	// DOM objekty
	var _dom = {
        content: null
	};

	// uložení pro onDOMReady
	var _domReadyCallbacks = [];

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
    	if (!_opt.directlyCfg) {
    		_onDOMReady(this, _init.bind(this));
	    } else {
	    	_init();
	    }
	};

	/**
	 * Inicializace
	 * 
	 * @method _init
	 * @private
	 */
	var _init = function() {
        // hlavní obsahový element
        _dom.content = document.querySelector(_opt.content);

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

	/**
	 * Metoda kterou použijeme, pokud chceme navěsit vlastní kód na událost, kdy je DOM strom připraven k použití.
	 * Je možné navěsit libovolný počet volaných funkcí.   
	 *
     * @method _onDOMReady
	 * @param {object} obj kontext, tj. "this" pro funkci
	 * @param {function || string} func funkce, která se bude provádět jako posluchač  
	 * @see jak.js
	 * @private
	 */ 
	var _onDOMReady = function(obj, func) {
		var f = (typeof(func) == "function" ? func : obj[func]);
		if (obj) { f = f.bind(obj); }

		if (document.readyState == "complete") { return setTimeout(f, 0); } /* uz bylo, jen asynchronne vykoname */

		if (!_domReadyCallbacks.length) { /* prvni volani - navesit relevantni posluchac */
			var process = function() {
				while (_domReadyCallbacks.length) { _domReadyCallbacks.shift()(); }
			}
			process = process.bind(this);

			if (window.addEventListener) {
				window.addEventListener("DOMContentLoaded", process, false);
			} else {
				document.attachEvent("onreadystatechange", function() {
					if (document.readyState == "complete") { process(); }
				});
			}
		}

		_domReadyCallbacks.push(f);
	}

	/**
	 * IE8 Fixes
	 */
	if (!Function.prototype.bind) {
		/**
		 * ES5 Function.prototype.bind
		 * Vrací funkci zbindovanou do zadaného kontextu.
		 * Zbylé volitelné parametry jsou předány volání vnitřní funkce.
		 * @param {object} thisObj Nový kontext
		 * @returns {function}
		 */
		Function.prototype.bind = function(thisObj) {
			var fn = this;
			var args = Array.prototype.slice.call(arguments, 1); 
			return function() { 
				return fn.apply(thisObj, args.concat(Array.prototype.slice.call(arguments))); 
			}
		}
	};

};

// uložíme do Grid objektu
Grid.Core = new Core();

}