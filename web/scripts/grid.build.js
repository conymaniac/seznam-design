module.exports = function() {

/**
 * @overview Vytvoření mřížky na pozadí
 * @version 0.1.0
 * @author Dominik Michna (dominik.michna@firma.seznam.cz)
 */

(function() {
    'use strict';

    /**
	 * @class Grid.Build
	 */
    var Build = {

    	// status, semafor
    	_activeLayout: false,
        _activeBaseline: false,

    	// nastavení – defaultní možnosti
    	_opt: {
    		units: 24
    	},

    	// DOM objekty
    	_dom: {
    		layout: null,
            baseline: null
    	},

    	// konfigurace
    	cfg: function (opt) {
    		// nastavení – možnosti z argumentu
    		for (var key in opt) { this._opt[key] = opt[key]; }

            // incializace
            this._build();

            // výška gridu při resize okna
            this._setHeight();
            if (document.addEventListener) {
                window.addEventListener('resize', this._setHeight.bind(this), false);
            } else {
                window.attachEvent('onresize', this._setHeight.bind(this));
            }

    	},

    	// zobrazení/skrytí mřížky
    	activate: function (activateLayout, activateBaseline) {
    		// kontrola na parametry, default je zobrazení
    		if (typeof(activateLayout) !== 'boolean') { activateLayout = true; }
            if (typeof(activateBaseline) !== 'boolean') { activateBaseline = true; }

    		// zobrazíme/skryjeme layout
    		if (activateLayout) {
    			this._dom.layout.style = 'display: block';
    		} else {
    			this._dom.layout.style = 'display: none';
    		}

            // zobrazíme/skryjeme baseline
            if (activateBaseline) {
                this._dom.baseline.style = 'display: block';
            } else {
                this._dom.baseline.style = 'display: none';
            }

    		// nastavíme semafor
    		this._activeLayout = activateLayout;
            this._activeBaseline = activateBaseline;
    	},

        // inicializace
        _build: function() {
            // kontrola na existenci layout mřížky
            if (this._dom.layout === null) {
                this._buildLayout();
            } else if (this._dom.layout.parentNode !== document.body) {
                // přidáme do body
                document.body.appendChild(this._dom.layout);
            }

            // kontrola na existenci baseline mřížky
            if (this._dom.baseline === null) {
                this._buildBaseline();
            } else if (this._dom.baseline.parentNode !== document.body) {
                // přidáme do body
                document.body.appendChild(this._dom.baseline);
            }
        },

    	// vybuildnění layout mřížky
    	_buildLayout: function() {
    		// layout element
    		this._dom.layout = document.createElement('div');
    		this._dom.layout.className = 'gr-lt';
    		this._dom.layout.style = 'display: none';

    		// obalující element
    		var grid = document.createElement('div');
    		grid.className = 'gr';

    		// přidáme rodiče do layout
    		this._dom.layout.appendChild(grid);

    		// vybuildíme unity
    		this._buildUnits(grid);
            this._buildMrgn(grid);

    		// přidáme do body
    		document.body.appendChild(this._dom.layout);
    	},

        // vybuildnění baseline mřížky
        _buildBaseline: function() {
            // baseline element
            this._dom.baseline = document.createElement('div');
            this._dom.baseline.className = 'gr-bl';
            this._dom.baseline.style = 'display: none';

            // obalující element
            var grid = document.createElement('div');
            grid.className = 'gr';

            // přidáme rodiče do baseline
            this._dom.baseline.appendChild(grid);

            // vytvoříme elementy – řádek
            var line = document.createElement('div');
            line.className = 'gr-ln';

            // přidáme řádek do rodiče
            grid.appendChild(line);

            // vytvoříme fake element pro zobrazení marginu
            this._buildMrgn(grid)

            // přidáme do body
            document.body.appendChild(this._dom.baseline);
        },

    	// vybuildnění unit
    	_buildUnits: function(grid) {
    		// pokud existuje rodič a máme počet sloupečků
    		if (grid !== null && this._opt.units > 0) {

    			// vytvoříme elementy – řádek
    			var line = document.createElement('div');
    			line.className = 'gr-ln';

    			// vytvoříme odpovídající počet unit
    			var unit;
    			for (var i = 0; i < this._opt.units; i++) {
    				// vytvoříme unitu
    				unit = document.createElement('div');
    				unit.className = 'gr-unt size1of24' + (i === (this._opt.units - 1) ? ' gr-lst': '');
    				unit.innerHTML = '<span class="gr-cnt">&nbsp;</span>';

    				// přidáme do řádku
    				line.appendChild(unit);
    			};

	    		// přidáme řádek do rodiče
	    		grid.appendChild(line);
    		}
    	},

        // vybuildnění fake unit – zobrazení marginu
        _buildMrgn: function(grid) {
            // pokud existuje rodič a máme počet sloupečků
            if (grid !== null) {
                // vytvoříme fake element pro zobrazení marginu
                var mrgn = document.createElement('div');
                mrgn.className = 'gr-mrgn';
                grid.insertBefore(mrgn, grid.firstChild);
                grid.appendChild(mrgn.cloneNode(), grid.firstChild);
            }
        },

        // nastavíme výšku
        _setHeight: function() {
            // kontrola na gridy
            if (this._dom.layout !== null && this._dom.baseline !== null) {

                // jednotlivé gridy
                var lGrid = this._dom.layout.querySelector('.gr');
                var bGrid = this._dom.baseline.querySelector('.gr');

                // kontrola na rozměry
                var bHeight = document.body.offsetHeight;
                var wHeight = Object.prototype.hasOwnProperty.call(window, 'outerHeight') ? window.outerHeight : document.body.clientHeight;

                // porovnání výšky viewportu a body
                if (bHeight > wHeight) {
                    lGrid.style = 'height: ' + bHeight + 'px';
                    bGrid.style = 'height: ' + bHeight + 'px';
                } else {
                    lGrid.removeAttribute('style');
                    bGrid.removeAttribute('style');
                }

            }
        }
	};

	// uložíme do window objektu
	window.Grid.Build = Build;

})();

}