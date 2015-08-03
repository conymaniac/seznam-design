/**
 * @overview Ovládání mřížky na pozadí
 * @version 0.1.0
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
        directlyShrink: false      // přímo zmenšená verze
    };

    // DOM objekty
    var _dom = {
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

    // konfigurace
    this.cfg = function (opt) {
        // nastavení – možnosti z argumentu
        for (var key in opt) { _opt[key] = opt[key]; }

        // build ovládacích prvků
        _build();

        // kontrola na event listener
        if (document.addEventListener) {
            // výška gridu při resize okna
            window.addEventListener('resize', _setBodyPadding.bind(this), false);
        }

    };

    // zobrazení/skrytí ovládacích prvků
    this.activate = function (activate) {
        // kontrola na ovládací prvky
        if (_dom.manager === null) { return; }

        // kontrola na parametry, default je zobrazení
        if (typeof(activate) !== 'boolean') { activate = true; }

        // zobrazíme/skryjeme ovládací prvky
        if (activate) {
            _dom.manager.style.display = 'block';

            // nastavíme výšku, synchro
            _timeOut = _timeOut && clearTimeout(_timeOut);
            _timeOut = setTimeout(_setBodyPadding.bind(this), 0);
        } else {
            _dom.manager.style.display = 'none';
            document.body.removeAttribute('style');
        }

        // nastavíme semafor
        _active = activate;
    };

    // základní build, kontrola na existenci
    var _build = function () {
        // kontrola na existenci ovládacích prvků
        if (_dom.manager === null) {
            _buildManager();
        } else if (_dom.manager.parentNode !== document.body) {
            // přidáme do body
            document.body.appendChild(_dom.manager);
        }

        // kontrola na touch zařízení
        if ('ontouchstart' in document) {
            _dom.manager.className += ' no-touch';
        }
     };

    // vytvoření managera
    var _buildManager = function () {
        // manager element
        _dom.manager = document.createElement('div');
        _dom.manager.className = 'gr-mg' + (_opt.directlyShrink ? ' shrnk' : '');
        _dom.manager.style.display = 'block';

        // obalující element
        var grid = document.createElement('div');
        grid.className = 'gr';

        // přidáme rodiče do layout
        _dom.manager.appendChild(grid);

        // vybuildíme unity
        _buildGridControls(grid);
        _buildSizeInfo(grid);
        _buildManagerControls(grid);

        // přidáme do body
        document.body.appendChild(_dom.manager);
    };

    // vybuildnění ovládacích prvků pro mřížku
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
            }
        }     
    };


    // vybuildnění ovládacích prvků pro managera
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
                _dom.layout.addEventListener('click', _setGridActive.bind(this));
                _dom.baseline.addEventListener('click', _setGridActive.bind(this));
            }

            // přidáme do managera
            _dom.group.appendChild(_dom.layout);
            _dom.group.appendChild(_dom.baseline);
            grid.appendChild(_dom.group);
        }     
    };

    // vybuildnění informací o layoutu
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
            if (document.addEventListener) {
                window.addEventListener('resize', _setSize.bind(this), false);
            }
        }     
    };

    // aktivování/deaktivování managera
    var _setManagerActive = function(e) {
        // kontrola na element
        if (_dom.manager === null) { return; }

        // kontrola na třídu stavu
        var shrink = true;
        var classes = _dom.manager.className;
        if (classes.indexOf('shrnk') > -1 && classes.indexOf('shrnking') === -1 && classes.indexOf('unshrnking') === -1) {
            _dom.manager.className = classes.replace(' shrnk', '');
            shrink = false;
        }

        // kontrola na třídu
        _dom.manager.className +=  shrink ? ' shrnking' : ' unshrnking';

        // "animace"
        _timeOut = _timeOut && clearTimeout(_timeOut);
        _timeOut = setTimeout(_doneManagerActive.bind(this, shrink), 500);
    };

    // ukončení aktivování/deaktivování managera
    var _doneManagerActive = function(shrink) {
        // kontrola na element
        if (_dom.manager === null) { return; }

        // kontrola na třídu animace
        var classes = _dom.manager.className;
        if (classes.indexOf('shrnking') > -1 && classes.indexOf('unshrnking') === -1) {
            _dom.manager.className = classes.replace(' shrnking', '');
        } else if (classes.indexOf('unshrnking') > -1) {
            _dom.manager.className = classes.replace(' unshrnking', '');
        }

        // kontrola na třídu stavu
        if (shrink) {
            _dom.manager.className += ' shrnk';
        }
    };

    // aktivování/deaktivování mřížky
    var _setGridActive = function(e) {
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
        if (Grid && Grid.Builder) {
            var activateLayout = _dom.layout.className.indexOf('actv') > -1;
            var activateBaseline = _dom.baseline.className.indexOf('actv') > -1;
            Grid.Builder.activate(activateLayout, activateBaseline);
        }
    };

    // nastavení rozměrů
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
            var type = 'Mobile 1';
            if (wWidth >= Grid.RD.MIN_M2 * Grid.RD.FS && wWidth <= Grid.RD.MAX_M2 * Grid.RD.FS) {
                type = 'Mobile 2';
            } else if (wWidth >= Grid.RD.MIN_TB * Grid.RD.FS && wWidth <= Grid.RD.MAX_TB * Grid.RD.FS) {
                type = 'Tablet';
            } else if (wWidth >= Grid.RD.MIN_DK * Grid.RD.FS) {
                type = 'Desktop';
            }

            // zobrazíme info
            _dom.layoutType.textContent = 'Layout ' + type;
        }
    };

    // nastavení paddingu
    var _setBodyPadding = function() {
        // kontrola na rozměry
        var bHeight = document.body.offsetHeight;
        var wHeight = Object.prototype.hasOwnProperty.call(window, 'innerHeight') ? window.innerHeight : document.body.clientHeight;

        // porovnání výšky viewportu a body
        if (bHeight > wHeight) {
            document.body.style.paddingBottom = '3em';
        } else {
            document.body.removeAttribute('style');
        }
    }
};

// uložíme do Grid objektu
Grid.Manager = new Manager();

}