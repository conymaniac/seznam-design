/**
 * @overview Vytvoření mřížky
 * @version 0.2.1
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
		_dom.layout.className = 'szd-grid-layout';
		_dom.layout.style.display = 'none';

		// obalující element
		var grid = document.createElement('div');
		grid.className = 'szd-grid';

		// přidáme rodiče do layout
		_dom.layout.appendChild(grid);

		// vybuildíme unity
		_buildUnits(grid);
        _buildedge(grid);

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
        _dom.baseline.className = 'szd-grid-baseline';
        _dom.baseline.style.display = 'none';

        // obalující element
        var grid = document.createElement('div');
        grid.className = 'szd-grid';

        // přidáme rodiče do baseline
        _dom.baseline.appendChild(grid);

        // vytvoříme elementy – řádek
        var line = document.createElement('div');
        line.className = 'szd-line';

        // pro IE8 přidáme na pozadí vlastní image
        if (navigator.userAgent.match(/MSIE 8/) !== null) {
            line.style.backgroundImage = 'url(data:image/png;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/7QCEUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGccAigAYkZCTUQwMTAwMGE5ZDAzMDAwMGY5MDMwMDAwMWUwNDAwMDA3NjA0MDAwMGE1MDQwMDAwYzYwNDAwMDBkMTA0MDAwMDA0MDUwMDAwMzAwNTAwMDA1ZDA1MDAwMDZhMDUwMDAwAP/iAhxJQ0NfUFJPRklMRQABAQAAAgxsY21zAhAAAG1udHJSR0IgWFlaIAfcAAEAGQADACkAOWFjc3BBUFBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtbGNtcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACmRlc2MAAAD8AAAAXmNwcnQAAAFcAAAAC3d0cHQAAAFoAAAAFGJrcHQAAAF8AAAAFHJYWVoAAAGQAAAAFGdYWVoAAAGkAAAAFGJYWVoAAAG4AAAAFHJUUkMAAAHMAAAAQGdUUkMAAAHMAAAAQGJUUkMAAAHMAAAAQGRlc2MAAAAAAAAAA2MyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRleHQAAAAARkIAAFhZWiAAAAAAAAD21gABAAAAANMtWFlaIAAAAAAAAAMWAAADMwAAAqRYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9jdXJ2AAAAAAAAABoAAADLAckDYwWSCGsL9hA/FVEbNCHxKZAyGDuSRgVRd13ta3B6BYmxmnysab9908PpMP///9sAQwAHBQUGBQQHBgUGCAcHCAoRCwoJCQoVDxAMERgVGhkYFRgXGx4nIRsdJR0XGCIuIiUoKSssKxogLzMvKjInKisq/9sAQwEHCAgKCQoUCwsUKhwYHCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq/8IAEQgAEAFAAwAiAAERAQIRAf/EABYAAQEBAAAAAAAAAAAAAAAAAAAHAv/EABYBAQEBAAAAAAAAAAAAAAAAAAADBf/EABYBAQEBAAAAAAAAAAAAAAAAAAADBf/aAAwDAAABEQIRAAAB0oyWzOVGE5UYTlRhOVGE5UYTlRhOVGE5UYTlRhOVGE5UYTlRhOVGE5UYTlRhOVGE5UYTlRhOVGH/xAAUEAEAAAAAAAAAAAAAAAAAAABg/9oACAEAAAEFAiH/xAAYEQACAwAAAAAAAAAAAAAAAAAAFWKh4f/aAAgBAhEBPwFpC8GkLwaQvBpC8GkLwaQvBpC8GkLwaQvBpC8GkLwaQvBpC8GkLwaQvBpC8GkLwaQvBpC8GkLw/8QAFREBAQAAAAAAAAAAAAAAAAAAABP/2gAIAQERAT8Bmmmmmmmmmmmmmmmmmmmm/8QAFBABAAAAAAAAAAAAAAAAAAAAYP/aAAgBAAAGPwIh/8QAFBABAAAAAAAAAAAAAAAAAAAAYP/aAAgBAAABPyEh/9oADAMAAAERAhEAABDzzzzzzzzzzzzzzzzzzzz/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECEQE/ECAAAAAAAAAAAAAH/8QAFREBAQAAAAAAAAAAAAAAAAAAAHH/2gAIAQERAT8QpSlKUpSlKUpSlKUpT//EABQQAQAAAAAAAAAAAAAAAAAAAGD/2gAIAQAAAT8QIf/Z)';
        }

        // přidáme řádek do rodiče
        grid.appendChild(line);

        // vytvoříme fake element pro zobrazení marginu
        _buildEdges(grid)

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
			line.className = 'szd-line';

			// vytvoříme odpovídající počet unit
			var unit;
			for (var i = 0; i < _opt.units; i++) {
				// vytvoříme unitu
				unit = document.createElement('div');
				unit.className = 'szd-unit szd-size-1of' + _opt.units;
				unit.innerHTML = '<span class="szd-inside">&nbsp;</span>';

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
     * @method _buildedge
     * @private
     */
    var _buildEdges = function(grid) {
        // pokud existuje rodič a máme počet sloupečků
        if (grid !== null) {
            // vytvoříme fake element pro zobrazení marginu
            var edge = document.createElement('div');
            edge.className = 'szd-edge';
            grid.insertBefore(edge, grid.firstChild);
            grid.appendChild(edge.cloneNode(), grid.firstChild);
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
            var lGrid = _dom.layout.querySelector('.szd-grid');
            var bGrid = _dom.baseline.querySelector('.szd-grid');

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