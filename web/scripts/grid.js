/**
 * @overview Pack všech skriptů pro Grid
 * @version 0.1.0
 * @author Dominik Michna (dominik.michna@firma.seznam.cz)
 *
 * @notes Zatím pouze pro moderní browsery
 */

(function() {
    'use strict';

    // vloží všechny požadované části
	require('./grid.core')();
	require('./grid.build')();
	require('./grid.manager')();
})();