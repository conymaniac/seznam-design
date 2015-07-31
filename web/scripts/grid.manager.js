module.exports = function() {

/**
 * @overview Ovládání mřížky na pozadí
 * @version 0.1.0
 * @author Dominik Michna (dominik.michna@firma.seznam.cz)
 */

(function() {
    'use strict';

    /**
	 * @class Grid.Manager
	 */
    var Manager = {
        // status, semafor
        _active: false,

        // nastavení – defaultní možnosti
        _opt: {
            units: 24,
            directlyManager: true,      // přímo zapnout ovládací prvky
            directlyGrid: false,        // přímo zapnout mřížku
            directlyShrink: false,      // přímo zmenšená verze
        },

        // DOM objekty
        _dom: {
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
        },

        // konfigurace
        cfg: function (opt) {
            // nastavení – možnosti z argumentu
            for (var key in opt) { this._opt[key] = opt[key]; }

            // kontrla na event listener
            if (document.addEventListener) {
                // po načtení DOMu nakonfigujerem mřížku a inicializujeme
                document.addEventListener('DOMContentLoaded', this._init.bind(this));

                // výška gridu při resize okna
                window.addEventListener('resize', this._setBodyPadding.bind(this), false);
            }

        },

        // zobrazení/skrytí ovládacích prvků
        activate: function (activate) {
            // kontrola na ovládací prvky
            if (this._dom.manager === null) { return; }

            // kontrola na parametry, default je zobrazení
            if (typeof(activate) !== 'boolean') { activate = true; }

            // zobrazíme/skryjeme ovládací prvky
            if (activate) {
                this._dom.manager.style.display = 'block';

                // nastavíme výšku, synchro
                this._timeOut = this._timeOut && clearTimeout(this._timeOut);
                this._timeOut = setTimeout(this._setBodyPadding.bind(this), 0);
            } else {
                this._dom.manager.style.display = 'none';
                document.body.removeAttribute('style');
            }

            // nastavíme semafor
            this._active = activate;
        },

        // inicializace
        _init: function() {
            // build ovládacích prvků
            this._build();

            // zobrazení/skrytí ovládacích prvků dle nastavení
            this.activate(this._opt.directlyManager);

            // konfigurace mřížky
            if (window.Grid && window.Grid.Builder) {
                window.Grid.Builder.cfg(this._opt);

                // dle možností můžeme rovnou i aktivovat kompletní mřížku
                if (this._opt.directlyGrid) {
                    window.Grid.Builder.activate(true, true);
                }
            }
        },

        // základní build, kontrola na existenci
        _build: function () {
            // kontrola na existenci ovládacích prvků
            if (this._dom.manager === null) {
                this._buildManager();
            } else if (this._dom.manager.parentNode !== document.body) {
                // přidáme do body
                document.body.appendChild(this._dom.manager);
            }

            // kontrola na touch zařízení
            if ('ontouchstart' in document) {
                this._dom.manager.className += ' no-touch';
            }
         },

        // vytvoření managera
        _buildManager: function () {
            // manager element
            this._dom.manager = document.createElement('div');
            this._dom.manager.className = 'gr-mg' + (this._opt.directlyShrink ? ' shrnk' : '');
            this._dom.manager.style.display = 'block';

            // obalující element
            var grid = document.createElement('div');
            grid.className = 'gr';

            // přidáme rodiče do layout
            this._dom.manager.appendChild(grid);

            // vybuildíme unity
            this._buildGridControls(grid);
            this._buildSizeInfo(grid);
            this._buildManagerControls(grid);

            // přidáme do body
            document.body.appendChild(this._dom.manager);
        },

        // vybuildnění ovládacích prvků pro mřížku
        _buildManagerControls: function(grid) {
            // pokud existuje rodič a máme počet sloupečků
            if (grid !== null) {

                // ikonka – logo
                this._dom.logo = document.createElement('button');
                this._dom.logo.setAttribute('type', 'button');
                this._dom.logo.className = 'btn btnLg';
                this._dom.logo.innerHTML = '<span class="icn-ctrl icn-ctrl-lg"></span><span class="lbl">Otevřít</span>';
                this._dom.right.appendChild(this._dom.logo);

                // ikonka – zavřít
                this._dom.close = this._dom.logo.cloneNode();
                this._dom.close.className = 'btn btnCls';
                this._dom.close.innerHTML = '<span class="icn-ctrl icn-ctrl-cls"></span><span class="lbl">Zavřít</span>';
                this._dom.right.appendChild(this._dom.close);

                // aktivace/deaktivace mřížky
                if (document.addEventListener) {
                    this._dom.logo.addEventListener('click', this._setManagerActive.bind(this));
                    this._dom.close.addEventListener('click', this._setManagerActive.bind(this));
                }
            }     
        },


        // vybuildnění ovládacích prvků pro managera
        _buildGridControls: function(grid) {
            // pokud existuje rodič a máme počet sloupečků
            if (grid !== null) {

                // skupinka ovládacích prvků
                this._dom.group = document.createElement('div');
                this._dom.group.className = 'btnGrp';

                // zobrazení layoutu
                this._dom.layout = document.createElement('button');
                this._dom.layout.setAttribute('type', 'button');
                this._dom.layout.className = 'btn btnLt' + (this._opt.directlyGrid ? ' actv' : '');
                this._dom.layout.id = 'btnLt';
                this._dom.layout.innerHTML = '<span class="icn-ctrl icn-ctrl-lt"></span><span class="lbl">Zobrazit layout</span>';

                // zobrazení baseline
                this._dom.baseline = document.createElement('button');
                this._dom.baseline.setAttribute('type', 'button');
                this._dom.baseline.className = 'btn btnBl' + (this._opt.directlyGrid ? ' actv' : '');
                this._dom.baseline.id = 'btnBl';
                this._dom.baseline.innerHTML = '<span class="icn-ctrl icn-ctrl-bl"></span><span class="lbl">Zobrazit baseline</span>';

                // aktivace/deaktivace mřížky
                if (document.addEventListener) {
                    this._dom.layout.addEventListener('click', this._setGridActive.bind(this));
                    this._dom.baseline.addEventListener('click', this._setGridActive.bind(this));
                }

                // přidáme do managera
                this._dom.group.appendChild(this._dom.layout);
                this._dom.group.appendChild(this._dom.baseline);
                grid.appendChild(this._dom.group);
            }     
        },

        // vybuildnění informací o layoutu
        _buildSizeInfo: function(grid) {
            // pokud existuje rodič a máme počet sloupečků
            if (grid !== null) {

                // zarovnání vlevo
                this._dom.left = document.createElement('div');
                this._dom.left.className = 'fl-lft';
                grid.insertBefore(this._dom.left, grid.firstChild);

                // skupinka ovládacích prvků
                this._dom.layoutType = document.createElement('div');
                this._dom.layoutType.className = 'inf tp';
                this._dom.left.appendChild(this._dom.layoutType);

                // zarovnání vpravo
                this._dom.right = document.createElement('div');
                this._dom.right.className = 'fl-rght';
                grid.appendChild(this._dom.right);

                // skupinka ovládacích prvků
                this._dom.viewPort = document.createElement('div');
                this._dom.viewPort.className = 'inf sz';
                this._dom.right.appendChild(this._dom.viewPort);

                // zobrazíme rozměry
                this._setSize()
                if (document.addEventListener) {
                    window.addEventListener('resize', this._setSize.bind(this), false);
                }
            }     
        },

        // aktivování/deaktivování managera
        _setManagerActive: function(e) {
            // kontrola na element
            if (this._dom.manager === null) { return; }

            // kontrola na třídu stavu
            var shrink = true;
            var classes = this._dom.manager.className;
            if (classes.indexOf('shrnk') > -1 && classes.indexOf('shrnking') === -1 && classes.indexOf('unshrnking') === -1) {
                this._dom.manager.className = classes.replace(' shrnk', '');
                shrink = false;
            }

            // kontrola na třídu
            this._dom.manager.className +=  shrink ? ' shrnking' : ' unshrnking';

            // "animace"
            this._timeOut = this._timeOut && clearTimeout(this._timeout);
            this._timeOut = setTimeout(this._doneManagerActive.bind(this, shrink), 500);
        },

        // ukončení aktivování/deaktivování managera
        _doneManagerActive: function(shrink) {
            // kontrola na element
            if (this._dom.manager === null) { return; }

            // kontrola na třídu animace
            var classes = this._dom.manager.className;
            if (classes.indexOf('shrnking') > -1 && classes.indexOf('unshrnking') === -1) {
                this._dom.manager.className = classes.replace(' shrnking', '');
            } else if (classes.indexOf('unshrnking') > -1) {
                this._dom.manager.className = classes.replace(' unshrnking', '');
            }

            // kontrola na třídu stavu
            if (shrink) {
                this._dom.manager.className += ' shrnk';
            }
        },

        // aktivování/deaktivování mřížky
        _setGridActive: function(e) {
            // target element
            var target = e.target;
            if (target.className.indexOf('btn') === -1) {
                target = target.parentNode;
            }

            // kontrola na třídu
            var classes = target.className;
            if (classes.indexOf('actv') > -1) {
                target.className = target.className.replace(' actv', '');
            } else {
                target.className += ' actv';
            }

            // odpovídající aktivování mřížky
            if (window.Grid && window.Grid.Builder) {
                var activateLayout = this._dom.layout.className.indexOf('actv') > -1;
                var activateBaseline = this._dom.baseline.className.indexOf('actv') > -1;
                window.Grid.Builder.activate(activateLayout, activateBaseline);
            }
        },

        // nastavení rozměrů
        _setSize: function() {
            // kontrola na gridy
            if (this._dom.viewPort !== null && this._dom.layoutType !== null) {

                // rozměry okna
                var wWidth = Object.prototype.hasOwnProperty.call(window, 'innerWidth') ? window.innerWidth : document.body.clientWidth;
                var wHeight = Object.prototype.hasOwnProperty.call(window, 'innerHeight') ? window.innerHeight : document.body.clientHeight;

                // zobrazíme info
                this._dom.viewPort.innerHTML = '<span class="prt">w: ' + wWidth + 'px</span>';
                this._dom.viewPort.innerHTML += '<span class="prt">h: ' + wHeight + 'px</span>';

                // typ layoutu
                var type = 'Mobile 1';
                if (wWidth >= 408 && wWidth <= 599) {
                    type = 'Mobile 2';
                } else if (wWidth >= 600 && wWidth <= 1007) {
                    type = 'Tablet';
                } else if (wWidth >= 1008) {
                    type = 'Desktop';
                }

                // zobrazíme info
                this._dom.layoutType.textContent = 'Layout ' + type;
            }
        },

        // nastavení paddingu
        _setBodyPadding: function() {
            // kontrola na rozměry
            var bHeight = document.body.offsetHeight;
            var wHeight = Object.prototype.hasOwnProperty.call(window, 'innerHeight') ? window.innerHeight : document.body.clientHeight;

            // porovnání výšky viewportu a body
            if (bHeight > wHeight) {
                document.body.style.paddingBottom = '3.5em';
            } else {
                document.body.removeAttribute('style');
            }
        }
    };

	// uložíme do window objektu
	window.Grid.Manager = Manager;

})();

}