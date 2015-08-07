/**
 * @overview Vytvoření mřížky na pozadí
 * @version 0.1.0
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
		units: 24         // počet unit v layout mřížce
	};

	// DOM objekty
	var _dom = {
		layout: null,
        baseline: null
	};

    // timeout
    var _timeOut = null;

	// konfigurace
	this.cfg = function (opt) {
		// nastavení – možnosti z argumentu
		for (var key in opt) { _opt[key] = opt[key]; }

        // incializace
        _build();

        // výška gridu při resize okna
        if (document.addEventListener) {
            window.addEventListener('resize', _setHeight.bind(this), false);
        }

	};

	// zobrazení/skrytí mřížky
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

    // inicializace
    var _build = function() {
        // kontrola na existenci layout mřížky
        if (_dom.layout === null) {
            _buildLayout();
        } else if (_dom.layout.parentNode !== document.body) {
            // přidáme do body
            document.body.appendChild(_dom.layout);
        }

        // kontrola na existenci baseline mřížky
        if (_dom.baseline === null) {
            _buildBaseline();
        } else if (_dom.baseline.parentNode !== document.body) {
            // přidáme do body
            document.body.appendChild(_dom.baseline);
        }
    };

	// vybuildnění layout mřížky
	var _buildLayout = function() {
		// layout element
		_dom.layout = document.createElement('div');
		_dom.layout.className = 'gr-lt no-change';
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
		document.body.appendChild(_dom.layout);
	};

    // vybuildnění baseline mřížky
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

        // přidáme řádek do rodiče
        grid.appendChild(line);

        // vytvoříme fake element pro zobrazení marginu
        _buildMrgn(grid)

        // přidáme do body
        document.body.appendChild(_dom.baseline);
    };

	// vybuildnění unit
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

    // vybuildnění fake unit – zobrazení marginu
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

    // nastavíme výšku
    var _setHeight = function() {
        // kontrola na gridy
        if (_dom.layout !== null && _dom.baseline !== null) {

            // jednotlivé gridy
            var lGrid = _dom.layout.querySelector('.gr');
            var bGrid = _dom.baseline.querySelector('.gr');

            // kontrola na rozměry
            var bHeight = document.body.offsetHeight;
            var wHeight = Object.prototype.hasOwnProperty.call(window, 'innerHeight') ? window.innerHeight : document.body.clientHeight;

            // porovnání výšky viewportu a body
            if (bHeight > wHeight) {
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