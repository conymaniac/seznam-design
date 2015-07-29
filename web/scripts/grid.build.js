module.exports = function() {

	/**
	 * @overview Vytvoření mřížky na pozadí
	 * @version 0.1.0
	 * @author Dominik Michna (dominik.michna@firma.seznam.cz)
	 *
	 * @notes Pouze pro moderní browsery
	 */

    /**
	 * @class Grid.Build
	 */
    var Build = {

    	// status, semafor
    	_active: false,

    	// nastavení – defaultní možnosti
    	_opt: {
    		units: 24
    	},

    	// DOM objekty
    	_dom: {
    		overlay: null,
    		parent: null
    	},

    	// konfigurace
    	cfg: function (opt) {
    		// kontrola na nastavení
			if (!(opt instanceof Object)) { return; }

    		// nastavení – možnosti z argumentu
    		for (var key in opt) { this._opt[key] = opt[key]; }
    	},

    	// zobrazení/skrytí mřížky
    	activate: function (active) {
    		// kontrola na parametry, default je zobrazení
    		if (typeof(active) !== 'boolean') { active = true; }

    		// kontrola na existenci elementu
    		if (this._dom.overlay === null) {
    			this._build();
    		} else if (this._dom.overlay.parentNode !== document.body) {
    			// přidáme do body
    			document.body.appendChild(this._dom.overlay);
    		}

    		// zobrazíme/skryjeme
    		if (active) {
    			this._dom.overlay.style = 'display: block';
    		} else {
    			this._dom.overlay.style = 'display: none';
    		}

    		// nastavíme semafor
    		this._active = active;
    	},

    	// vybuildnění overlay a rodiče
    	_build: function() {
    		// overlay element
    		this._dom.overlay = document.createElement('div');
    		this._dom.overlay.className = 'gr-ol';
    		this._dom.overlay.style = 'display: none';

    		// obalující element
    		this._dom.parent = document.createElement('div');
    		this._dom.parent.className = 'gr';

    		// přidáme rodiče do overlay
    		this._dom.overlay.appendChild(this._dom.parent);

    		// vybuildíme unity
    		this._buildUnits();

			// vytvoříme fake element
			var mrgn = document.createElement('div');
			mrgn.className = 'gr-mrgn';
			this._dom.parent.insertBefore(mrgn, this._dom.parent.firstChild);
			this._dom.parent.appendChild(mrgn.cloneNode(), this._dom.parent.firstChild);

    		// přidáme do body
    		document.body.appendChild(this._dom.overlay);
    	},

    	// vybuildnění unit
    	_buildUnits: function() {
    		// pokud existuje rodič a máme počet sloupečků
    		if (this._dom.parent !== null && this._opt.units > 0) {

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
	    		this._dom.parent.appendChild(line);
    		}
    	}


	}

	// uložíme do window objektu
	window.Grid.Build = Build;

}