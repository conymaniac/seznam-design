(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @overview Vytvoření mřížky
 * @version 0.2.0
 * @author Dominik Michna (dominik.michna@firma.seznam.cz)
 */

module.exports = function(Grid) {

'use strict';

/**
 * @class Grid.Builder
 */
var Builder = function() {

	// status, semafor
	var _activeLayout = false;
    var _activeBaseline = false;

	// nastavení – defaultní možnosti
	var _opt = {
        content: 'body',                // selector pro element reprezentující hlavní obsah 
		units: 24                       // počet unit v layout mřížce
	};

	// DOM objekty
	var _dom = {
        content: null,
		layout: null,
        baseline: null
	};

    // timeout
    var _timeOut = null;

	/**
     * Konfigurace
     * 
     * @param {object} [opt] - nastavení, možnosti
     * @param {units} [opt.units=24] - počet sloupečků
     * @method cfg
     * @public
     */
	this.cfg = function (opt) {
		// nastavení – možnosti z argumentu
		for (var key in opt) { _opt[key] = opt[key]; }

        // hlavní obsahový element
        _dom.content = document.querySelector(_opt.content);

        // incializace
        _build();

        // výška gridu při resize okna
        if (window.addEventListener) {
            window.addEventListener('resize', _setHeight.bind(this), false);
        } else {
            window.attachEvent('onresize', _setHeight.bind(this));
        }

	};

	/**
     * Zobrazení/skrytí mřížky
     * 
     * @param {boolean} [activateLayout] - aktivovat mřížku pro layout
     * @param {boolean} [activateBaseline] - aktivovat mřížku pro baseline
     * @method activate
     * @public
     */
	this.activate = function (activateLayout, activateBaseline) {
		// zobrazíme/skryjeme layout
		if (activateLayout === true) {
			_dom.layout.style.display = 'block';
            _activeLayout = !!activateLayout;
		} else if (activateLayout === false) {
			_dom.layout.style.display = 'none';
            _activeLayout = !!activateLayout;
		}

        // zobrazíme/skryjeme baseline
        if (activateBaseline === true) {
            _dom.baseline.style.display = 'block';
            _activeBaseline = !!activateBaseline;
        } else if (activateBaseline === false) {
            _dom.baseline.style.display = 'none';
            _activeBaseline = !!activateBaseline;
        }

        // nastavíme výšku, synchro
        _timeOut = _timeOut && clearTimeout(_timeOut);
        _timeOut = setTimeout(_setHeight.bind(this), 0);
	};

    /**
     * Základní build, kontrola na existenci
     * 
     * @method _build
     * @private
     */
    var _build = function() {
        // kontrola na existenci layout mřížky
        if (_dom.layout === null) {
            _buildLayout();
        } else if (_dom.layout.parentNode !== _dom.content) {
            // přidáme do body
            _dom.content.appendChild(_dom.layout);
        }

        // kontrola na existenci baseline mřížky
        if (_dom.baseline === null) {
            _buildBaseline();
        } else if (_dom.baseline.parentNode !== _dom.content) {
            // přidáme do body
            _dom.content.appendChild(_dom.baseline);
        }
    };

	/**
     * Vytvoření horizontální mřížky – layout, sloupečky
     * 
     * @method _buildLayout
     * @private
     */
	var _buildLayout = function() {
		// layout element
		_dom.layout = document.createElement('div');
		_dom.layout.className = 'gr-lt';
		_dom.layout.style.display = 'none';

		// obalující element
		var grid = document.createElement('div');
		grid.className = 'gr';

		// přidáme rodiče do layout
		_dom.layout.appendChild(grid);

		// vybuildíme unity
		_buildUnits(grid);
        _buildMrgn(grid);

		// přidáme do body
		_dom.content.appendChild(_dom.layout);
	};

    /**
     * Vytvoření vertikální mřížky – baseline, řádky
     * 
     * @method _buildBaseline
     * @private
     */
    var _buildBaseline = function() {
        // baseline element
        _dom.baseline = document.createElement('div');
        _dom.baseline.className = 'gr-bl';
        _dom.baseline.style.display = 'none';

        // obalující element
        var grid = document.createElement('div');
        grid.className = 'gr';

        // přidáme rodiče do baseline
        _dom.baseline.appendChild(grid);

        // vytvoříme elementy – řádek
        var line = document.createElement('div');
        line.className = 'ln';

        // pro IE8 přidáme na pozadí vlastní image
        if (navigator.userAgent.match(/MSIE 8/) !== null) {
            line.style.backgroundImage = 'url(data:image/png;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/7QCEUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGccAigAYkZCTUQwMTAwMGE5ZDAzMDAwMGY5MDMwMDAwMWUwNDAwMDA3NjA0MDAwMGE1MDQwMDAwYzYwNDAwMDBkMTA0MDAwMDA0MDUwMDAwMzAwNTAwMDA1ZDA1MDAwMDZhMDUwMDAwAP/iAhxJQ0NfUFJPRklMRQABAQAAAgxsY21zAhAAAG1udHJSR0IgWFlaIAfcAAEAGQADACkAOWFjc3BBUFBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtbGNtcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACmRlc2MAAAD8AAAAXmNwcnQAAAFcAAAAC3d0cHQAAAFoAAAAFGJrcHQAAAF8AAAAFHJYWVoAAAGQAAAAFGdYWVoAAAGkAAAAFGJYWVoAAAG4AAAAFHJUUkMAAAHMAAAAQGdUUkMAAAHMAAAAQGJUUkMAAAHMAAAAQGRlc2MAAAAAAAAAA2MyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRleHQAAAAARkIAAFhZWiAAAAAAAAD21gABAAAAANMtWFlaIAAAAAAAAAMWAAADMwAAAqRYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9jdXJ2AAAAAAAAABoAAADLAckDYwWSCGsL9hA/FVEbNCHxKZAyGDuSRgVRd13ta3B6BYmxmnysab9908PpMP///9sAQwAHBQUGBQQHBgUGCAcHCAoRCwoJCQoVDxAMERgVGhkYFRgXGx4nIRsdJR0XGCIuIiUoKSssKxogLzMvKjInKisq/9sAQwEHCAgKCQoUCwsUKhwYHCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq/8IAEQgAEAFAAwAiAAERAQIRAf/EABYAAQEBAAAAAAAAAAAAAAAAAAAHAv/EABYBAQEBAAAAAAAAAAAAAAAAAAADBf/EABYBAQEBAAAAAAAAAAAAAAAAAAADBf/aAAwDAAABEQIRAAAB0oyWzOVGE5UYTlRhOVGE5UYTlRhOVGE5UYTlRhOVGE5UYTlRhOVGE5UYTlRhOVGE5UYTlRhOVGH/xAAUEAEAAAAAAAAAAAAAAAAAAABg/9oACAEAAAEFAiH/xAAYEQACAwAAAAAAAAAAAAAAAAAAFWKh4f/aAAgBAhEBPwFpC8GkLwaQvBpC8GkLwaQvBpC8GkLwaQvBpC8GkLwaQvBpC8GkLwaQvBpC8GkLwaQvBpC8GkLw/8QAFREBAQAAAAAAAAAAAAAAAAAAABP/2gAIAQERAT8Bmmmmmmmmmmmmmmmmmmmm/8QAFBABAAAAAAAAAAAAAAAAAAAAYP/aAAgBAAAGPwIh/8QAFBABAAAAAAAAAAAAAAAAAAAAYP/aAAgBAAABPyEh/9oADAMAAAERAhEAABDzzzzzzzzzzzzzzzzzzzz/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECEQE/ECAAAAAAAAAAAAAH/8QAFREBAQAAAAAAAAAAAAAAAAAAAHH/2gAIAQERAT8QpSlKUpSlKUpSlKUpT//EABQQAQAAAAAAAAAAAAAAAAAAAGD/2gAIAQAAAT8QIf/Z)';
        }

        // přidáme řádek do rodiče
        grid.appendChild(line);

        // vytvoříme fake element pro zobrazení marginu
        _buildMrgn(grid)

        // přidáme do body
        _dom.content.appendChild(_dom.baseline);
    };

	/**
     * Vytvoření prvků pro horizontální mřížku, pro layout
     * 
     * @param {object} [grid] - obalující element
     * @method _buildUnits
     * @private
     */
	var _buildUnits = function(grid) {
		// pokud existuje rodič a máme počet sloupečků
		if (grid !== null && _opt.units > 0) {

			// vytvoříme elementy – řádek
			var line = document.createElement('div');
			line.className = 'ln';

			// vytvoříme odpovídající počet unit
			var unit;
			for (var i = 0; i < _opt.units; i++) {
				// vytvoříme unitu
				unit = document.createElement('div');
				unit.className = 'unt s1of' + _opt.units;
				unit.innerHTML = '<span class="cnt">&nbsp;</span>';

				// přidáme do řádku
				line.appendChild(unit);
			};

    		// přidáme řádek do rodiče
    		grid.appendChild(line);
		}
	};

    /**
     * Vytvoření "falešných" prvků pro horizontální mřížku – odsazení
     * 
     * @param {object} [grid] - obalující element
     * @method _buildMrgn
     * @private
     */
    var _buildMrgn = function(grid) {
        // pokud existuje rodič a máme počet sloupečků
        if (grid !== null) {
            // vytvoříme fake element pro zobrazení marginu
            var mrgn = document.createElement('div');
            mrgn.className = 'mrgn';
            grid.insertBefore(mrgn, grid.firstChild);
            grid.appendChild(mrgn.cloneNode(), grid.firstChild);
        }
    };

    /**
     * Nastavení výšky
     * 
     * @method _setHeight
     * @private
     */
    var _setHeight = function() {
        // kontrola na gridy
        if (_dom.layout !== null && _dom.baseline !== null) {

            // jednotlivé gridy
            var lGrid = _dom.layout.querySelector('.gr');
            var bGrid = _dom.baseline.querySelector('.gr');

            // kontrola na rozměry
            var bHeight = _dom.content.offsetHeight;
            var wHeight = Object.prototype.hasOwnProperty.call(window, 'innerHeight') ? window.innerHeight : document.body.clientHeight;

            // porovnání výšky viewportu a body
            if (bHeight >= wHeight) {
                lGrid.style.height = bHeight + 'px';
                bGrid.style.height = bHeight + 'px';
                lGrid.style.bottom = 'auto';
                bGrid.style.bottom = 'auto';
            } else {
                lGrid.removeAttribute('style');
                bGrid.removeAttribute('style');
            }

        }
    }
};

// uložíme do Grid objektu
Grid.Builder = new Builder();

}
},{}],2:[function(require,module,exports){
/**
 * @overview Základní jádro mřížky
 * @version 0.2.0
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
},{}],3:[function(require,module,exports){
/**
 * @overview Pack všech skriptů pro Grid
 * @version 0.2.0
 * @author Dominik Michna (dominik.michna@firma.seznam.cz)
 *
 * @notes Zatím pouze pro moderní browsery
 */

(function() {
    'use strict';

    /**
	 * Namespace pro Grid
	 * @type {object}
	 *
	 * @group Grid
	 */
	var Grid = Grid || { 'Name': 'Grid' };

	/**
	 * Namespace pro Responsive Design
	 */
	Grid.RD = Grid.RD || { 'Name': 'Grid.RD' };
	Grid.RD.M1 = Grid.RD.M1 || { 'Name': 'Grid.RD.M1' }; 		// layout – mobile 1
	Grid.RD.M2 = Grid.RD.M2 || { 'Name': 'Grid.RD.M2' };		// layout - mobile 2
	Grid.RD.TB = Grid.RD.TB || { 'Name': 'Grid.RD.TB' };		// layout – tablet
	Grid.RD.DK = Grid.RD.DK || { 'Name': 'Grid.RD.DK' };		// layout – desktop

	/**
	 * Breakpointy pro Responsive Design
	 *
	 * @notes V "em" stejně jako v CSS
	 */

    /* layout – mobil 1 */
    Grid.RD.M1.TITLE = 'Mobile 1';
	Grid.RD.M1.MIN_WIDTH = 0; 			/* 320px – chceme mobile 1, i když je menší */
	Grid.RD.M1.MAX_WIDTH = 407;

	/* layout – mobil 2 */
    Grid.RD.M2.TITLE = 'Mobile 2';
	Grid.RD.M2.MIN_WIDTH = 408;
	Grid.RD.M2.MAX_WIDTH = 599;

	/* layout – tablet */
    Grid.RD.TB.TITLE = 'Tablet';
	Grid.RD.TB.MIN_WIDTH = 600;
	Grid.RD.TB.MAX_WIDTH = 1007;

	/* layout – desktop */
    Grid.RD.DK.TITLE = 'Desktop';
	Grid.RD.DK.MIN_WIDTH = 1008;
	Grid.RD.DK.MAX_WIDTH = 10000; 		/* 1008px – ale chceme desktop, i když je větší */

    // vloží všechny požadované části
	require('./grid.builder')(Grid);
	require('./grid.manager')(Grid);
	require('./grid.core')(Grid);

  	// zveřejním do window objektu pouze instanci samotného jádra
    window.Grid = Grid.Core;

})();
},{"./grid.builder":1,"./grid.core":2,"./grid.manager":4}],4:[function(require,module,exports){
/**
 * @overview Ovládání mřížky
 * @version 0.2.0
 * @author Dominik Michna (dominik.michna@firma.seznam.cz)
 */

module.exports = function(Grid) {

'use strict';

/**
 * @class Grid.Manager
 */
var Manager = function() {

    // status, semafor
    var _active = false;

    // nastavení – defaultní možnosti
    var _opt = {
        content: 'body',                // selector pro element reprezentující hlavní obsah 
        directlyShrink: true,           // přímo zmenšená verze
        directlyGrid: false             // přímo zapnout mřížku
    };

    // DOM objekty
    var _dom = {
        content: null,
        manager: null,
        group: null,
        layout: null,
        baseline: null,
        logo: null,
        close: null,
        viewPort: null,
        layoutType: null,
        left: null,
        right: null
    };

    // timeout
    var _timeOut = null;

    /**
     * Konfigurace
     * 
     * @param {object} [opt] - nastavení, možnosti
     * @param {boolean} [directlyShrink=true] - zmenšený stav widgetu
     * @param {boolean} [directlyGrid=false] - zapnout rovnou zobrazení mřížky
     * @method cfg
     * @public
     */
    this.cfg = function (opt) {
        // nastavení – možnosti z argumentu
        for (var key in opt) { _opt[key] = opt[key]; }

        // hlavní obsahový element
        _dom.content = document.querySelector(_opt.content);

        // build ovládacích prvků
        _build();

        // výška gridu při resize okna
        if (window.addEventListener) {
            window.addEventListener('resize', _setBodyPadding.bind(this), false);
        } else {
            window.attachEvent('onresize', _setBodyPadding.bind(this));
        }

    };

    /**
     * Zobrazení/skrytí ovládacích prvků
     * 
     * @param {boolean} [activate=true] - aktivovat/deaktivovat ovládací prvky
     * @method activate
     * @public
     */
    this.activate = function (activate) {
        // kontrola na ovládací prvky
        if (_dom.manager === null) { return; }

        // kontrola na parametry, default je zobrazení
        if (typeof(activate) !== 'boolean') { activate = true; }

        // zobrazíme/skryjeme ovládací prvky
        if (activate) {
            _dom.manager.style.display = 'block';

            // nastavíme padding, synchro
            if (!_opt.directlyShrink) {
                _timeOut = _timeOut && clearTimeout(_timeOut);
                _timeOut = setTimeout(_setBodyPadding.bind(this), 0);
            }
        } else {
            _dom.manager.style.display = 'none';
            _dom.content.removeAttribute('style');
        }

        // nastavíme semafor
        _active = activate;
    };

    /**
     * Základní build, kontrola na existenci
     * 
     * @method _build
     * @private
     */
    var _build = function () {
        // kontrola na existenci ovládacích prvků
        if (_dom.manager === null) {
            _buildManager();
        } else if (_dom.manager.parentNode !== _dom.content) {
            // přidáme do body
            _dom.content.appendChild(_dom.manager);
        }

        // kontrola na touch zařízení
        if ('ontouchstart' in document) {
            _dom.manager.className += ' no-touch';
        }
     };

    /**
     * Vytvoření managera
     * 
     * @method _buildManager
     * @private
     */
    var _buildManager = function () {
        // manager element
        _dom.manager = document.createElement('div');
        _dom.manager.className = 'gr-mg' + (_opt.directlyShrink ? ' shrnk' : '');
        _dom.manager.style.display = 'block';

        // obalující element
        var grid = document.createElement('div');
        grid.className = 'gr';
        grid.style.boxSizing = 'border-box';

        // přidáme rodiče do layout
        _dom.manager.appendChild(grid);

        // vybuildíme unity
        _buildGridControls(grid);
        _buildSizeInfo(grid);
        _buildManagerControls(grid);

        // přidáme do body
        _dom.content.appendChild(_dom.manager);
    };

    /**
     * Vytvoření ovládacích prvků pro managera
     * 
     * @param {object} [grid] - obalující element
     * @method _buildManagerControls
     * @private
     */
    var _buildManagerControls = function(grid) {
        // pokud existuje rodič a máme počet sloupečků
        if (grid !== null) {

            // ikonka – logo
            _dom.logo = document.createElement('button');
            _dom.logo.setAttribute('type', 'button');
            _dom.logo.className = 'btn btnLg';
            _dom.logo.innerHTML = '<span class="icn-ctrl icn-ctrl-lg"></span><span class="lbl">Otevřít</span>';
            _dom.right.appendChild(_dom.logo);

            // ikonka – zavřít
            _dom.close = _dom.logo.cloneNode();
            _dom.close.className = 'btn btnCls';
            _dom.close.innerHTML = '<span class="icn-ctrl icn-ctrl-cls"></span><span class="lbl">Zavřít</span>';
            _dom.right.appendChild(_dom.close);

            // aktivace/deaktivace mřížky
            if (document.addEventListener) {
                _dom.logo.addEventListener('click', _setManagerActive.bind(this));
                _dom.close.addEventListener('click', _setManagerActive.bind(this));
            } else {
                _dom.logo.attachEvent('onclick', _setManagerActive.bind(this));
                _dom.close.attachEvent('onclick', _setManagerActive.bind(this));
            }

        }     
    };

    /**
     * Vytvoření ovládacích prvků pro mřížku
     * 
     * @param {object} [grid] - obalující element
     * @method _buildGridControls
     * @private
     */
    var _buildGridControls = function(grid) {
        // pokud existuje rodič a máme počet sloupečků
        if (grid !== null) {

            // skupinka ovládacích prvků
            _dom.group = document.createElement('div');
            _dom.group.className = 'btnGrp';

            // zobrazení layoutu
            _dom.layout = document.createElement('button');
            _dom.layout.setAttribute('type', 'button');
            _dom.layout.className = 'btn btnLt' + (_opt.directlyGrid ? ' actv' : '');
            _dom.layout.id = 'btnLt';
            _dom.layout.innerHTML = '<span class="icn-ctrl icn-ctrl-lt"></span><span class="lbl">Zobrazit layout</span>';

            // zobrazení baseline
            _dom.baseline = document.createElement('button');
            _dom.baseline.setAttribute('type', 'button');
            _dom.baseline.className = 'btn btnBl' + (_opt.directlyGrid ? ' actv' : '');
            _dom.baseline.id = 'btnBl';
            _dom.baseline.innerHTML = '<span class="icn-ctrl icn-ctrl-bl"></span><span class="lbl">Zobrazit baseline</span>';

            // aktivace/deaktivace mřížky
            if (document.addEventListener) {
                _dom.layout.addEventListener('click', _setGridActive.bind(this, _dom.layout));
                _dom.baseline.addEventListener('click', _setGridActive.bind(this, _dom.baseline));
            } else {
                _dom.layout.attachEvent('onclick', _setGridActive.bind(this, _dom.layout));
                _dom.baseline.attachEvent('onclick', _setGridActive.bind(this, _dom.baseline));
            }

            // přidáme do managera
            _dom.group.appendChild(_dom.layout);
            _dom.group.appendChild(_dom.baseline);
            grid.appendChild(_dom.group);
        }     
    };

    /**
     * Vytvoření informací o layoutu
     * 
     * @param {object} [grid] - obalující element
     * @method _buildSizeInfo
     * @private
     */
    var _buildSizeInfo = function(grid) {
        // pokud existuje rodič a máme počet sloupečků
        if (grid !== null) {

            // zarovnání vlevo
            _dom.left = document.createElement('div');
            _dom.left.className = 'fl-lft';
            grid.insertBefore(_dom.left, grid.firstChild);

            // skupinka ovládacích prvků
            _dom.layoutType = document.createElement('div');
            _dom.layoutType.className = 'inf tp';
            _dom.left.appendChild(_dom.layoutType);

            // zarovnání vpravo
            _dom.right = document.createElement('div');
            _dom.right.className = 'fl-rght';
            grid.appendChild(_dom.right);

            // skupinka ovládacích prvků
            _dom.viewPort = document.createElement('div');
            _dom.viewPort.className = 'inf sz';
            _dom.right.appendChild(_dom.viewPort);

            // zobrazíme rozměry
            _setSize()
            if (window.addEventListener) {
                window.addEventListener('resize', _setSize.bind(this), false);
            } else {
                window.attachEvent('onresize', _setSize.bind(this));
            }
        }     
    };

    /**
     * Aktivace/deaktivace managera
     * 
     * @param {object} [e] - event objekt z posluchače
     * @method _setManagerActive
     * @private
     */
    var _setManagerActive = function(e) {
        // kontrola na element
        if (_dom.manager === null) { return; }

        // kontrola na třídu stavu
        var shrink = true;
        var classes = ' ' + _dom.manager.className + ' ';
        if (_hasClass(_dom.manager, 'shrnk')) {
            _dom.manager.className = classes.replace(' shrnk', '');
            shrink = false;
        }

        // kontrola na třídu
        _dom.manager.className +=  shrink ? ' shrnking' : ' unshrnking';

        // "animace"
        _timeOut = _timeOut && clearTimeout(_timeOut);
        _timeOut = setTimeout(_doneManagerActive.bind(this, shrink), 500);
    };

    /**
     * Ukončení aktivace/deaktivace managera
     * 
     * @param {boolean} [shrink] - informace o zmenšení
     * @method _doneManagerActive
     * @private
     */
    var _doneManagerActive = function(shrink) {
        // kontrola na element
        if (_dom.manager === null) { return; }

        // kontrola na třídu animace
        var classes = ' ' + _dom.manager.className + ' ';
        if (_hasClass(_dom.manager, 'shrnking')) {
            _dom.manager.className = classes.replace(' shrnking', '');
        } else if (_hasClass(_dom.manager, 'unshrnking')) {
            _dom.manager.className = classes.replace(' unshrnking', '');
        }

        // kontrola na třídu stavu
        if (shrink) {
            _dom.manager.className += ' shrnk';

            // pokud je zkrácený, zrušíme padding na body
            document.body.removeAttribute('style');

        } else {
            _setBodyPadding();
        }
    };

    /**
     * Aktivace/deaktivace mřížky
     * 
     * @param {object} [button] - tlačítko
     * @method _setGridActive
     * @private
     */
    var _setGridActive = function(button) {
        // kontrola na třídu
        var classes = ' ' + button.className + ' ';
        if (_hasClass(button, 'actv')) {
            button.className = button.className.replace(' actv', '');
        } else {
            button.className += ' actv';
        }

        // odpovídající aktivování mřížky
        if (Grid && Grid.Builder) {
            var activateLayout = _hasClass(_dom.layout, 'actv');
            var activateBaseline = _hasClass(_dom.baseline, 'actv');
            Grid.Builder.activate(activateLayout, activateBaseline);
        }
    };

    /**
     * Nastavení rozměrů
     * 
     * @method _setSize
     * @private
     */
    var _setSize = function() {
        // kontrola na gridy
        if (_dom.viewPort !== null && _dom.layoutType !== null) {

            // rozměry okna
            var wWidth = Object.prototype.hasOwnProperty.call(window, 'innerWidth') ? window.innerWidth : document.body.clientWidth;
            var wHeight = Object.prototype.hasOwnProperty.call(window, 'innerHeight') ? window.innerHeight : document.body.clientHeight;

            // zobrazíme info
            _dom.viewPort.innerHTML = '<span class="prt">w: ' + wWidth + 'px</span>';
            _dom.viewPort.innerHTML += '<span class="prt">h: ' + wHeight + 'px</span>';

            // typ layoutu
            var type = 'Too small';
            for (var layout in Grid.RD) {
                if (layout !== 'Name') {
                    if (wWidth >= Grid.RD[layout].MIN_WIDTH && wWidth <= Grid.RD[layout].MAX_WIDTH) {
                        type = Grid.RD[layout].TITLE;
                    }
                }
            };

            // zobrazíme info
            if ('textContent' in _dom.layoutType) {
                _dom.layoutType.textContent = 'Layout ' + type;
            } else if ('innerText' in _dom.layoutType) {
                _dom.layoutType.innerText = 'Layout ' + type;
            }
        }
    };

    /**
     * Nastavení odsazení
     * 
     * @method _setBodyPadding
     * @private
     */
    var _setBodyPadding = function() {
        // kontrola na rozměry
        var bHeight = _dom.content.offsetHeight;
        var wHeight = Object.prototype.hasOwnProperty.call(window, 'innerHeight') ? window.innerHeight : _dom.content.clientHeight;

        // porovnání výšky viewportu a body
        if (bHeight > wHeight) {
            _dom.content.style.paddingBottom = '3em';
        } else {
            _dom.content.removeAttribute('style');
        }
    }

    /**
     * Zjištění třídy
     * 
     * @method _hasClass
     * @private
     */
    var _hasClass = function (elem, _class) {
        return elem.className && (' ' + elem.className + ' ').indexOf(' ' + _class + ' ') > -1;
    }
};

// uložíme do Grid objektu
Grid.Manager = new Manager();

}
},{}]},{},[3]);
