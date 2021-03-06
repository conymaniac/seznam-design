/**
 * @overview Ovládání mřížky
 * @version 0.2.3
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
            _dom.manager.className += ' szd-no-touch';
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
        _dom.manager.className = 'szd-grid-manager' + (_opt.directlyShrink ? ' szd-shrinked' : '');
        _dom.manager.style.display = 'block';

        // obalující element
        var grid = document.createElement('div');
        grid.className = 'szd-grid';
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
            _dom.logo.className = 'szd-button szd-button-open';
            _dom.logo.innerHTML = '<span class="szd-icon szd-icon-open"></span><span class="szd-icon-label szd-subheadline">Otevřít</span>';
            _dom.right.appendChild(_dom.logo);

            // ikonka – zavřít
            _dom.close = _dom.logo.cloneNode();
            _dom.close.className = 'szd-button szd-button-close';
            _dom.close.innerHTML = '<span class="szd-icon szd-icon-close"></span><span class="szd-icon-label szd-subheadline">Zavřít</span>';
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
            _dom.group.className = 'szd-button-group';

            // zobrazení layoutu
            _dom.layout = document.createElement('button');
            _dom.layout.setAttribute('type', 'button');
            _dom.layout.className = 'szd-button szd-button-layout' + (_opt.directlyGrid ? ' szd-button-active' : '');
            _dom.layout.id = 'szd-button-layout';
            _dom.layout.innerHTML = '<span class="szd-icon szd-icon-layout"></span><span class="szd-icon-label szd-subheadline">Zobrazit layout</span>';

            // zobrazení baseline
            _dom.baseline = document.createElement('button');
            _dom.baseline.setAttribute('type', 'button');
            _dom.baseline.className = 'szd-button szd-button-baseline' + (_opt.directlyGrid ? ' szd-button-active' : '');
            _dom.baseline.id = 'szd-button-baseline';
            _dom.baseline.innerHTML = '<span class="szd-icon szd-icon-baseline"></span><span class="szd-icon-label szd-subheadline">Zobrazit baseline</span>';

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
            _dom.left.className = 'szd-left';
            grid.insertBefore(_dom.left, grid.firstChild);

            // skupinka ovládacích prvků
            _dom.layoutType = document.createElement('div');
            _dom.layoutType.className = 'szd-info szd-info-type';
            _dom.left.appendChild(_dom.layoutType);

            // zarovnání vpravo
            _dom.right = document.createElement('div');
            _dom.right.className = 'szd-right';
            grid.appendChild(_dom.right);

            // skupinka ovládacích prvků
            _dom.viewPort = document.createElement('div');
            _dom.viewPort.className = 'szd-info szd-info-size';
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
        if (_hasClass(_dom.manager, 'szd-shrinked')) {
            _dom.manager.className = classes.replace(' szd-shrinked', '');
            shrink = false;
        }

        // kontrola na třídu
        _dom.manager.className +=  shrink ? ' szd-shrinking' : ' szd-unshrinking';

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
        if (_hasClass(_dom.manager, 'szd-shrinking')) {
            _dom.manager.className = classes.replace(' szd-shrinking', '');
        } else if (_hasClass(_dom.manager, 'szd-unshrinking')) {
            _dom.manager.className = classes.replace(' szd-unshrinking', '');
        }

        // kontrola na třídu stavu
        if (shrink) {
            _dom.manager.className += ' szd-shrinked';

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
        if (_hasClass(button, 'szd-button-active')) {
            button.className = button.className.replace(' szd-button-active', '');
        } else {
            button.className += ' szd-button-active';
        }

        // odpovídající aktivování mřížky
        if (Grid && Grid.Builder) {
            var activateLayout = _hasClass(_dom.layout, 'szd-button-active');
            var activateBaseline = _hasClass(_dom.baseline, 'szd-button-active');
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
            _dom.viewPort.innerHTML = '<span class="szd-info-port">w: ' + wWidth + 'px</span>';
            _dom.viewPort.innerHTML += '<span class="szd-info-port">h: ' + wHeight + 'px</span>';

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