/**
 * @overview Pack všech skriptů pro Grid
 * @version 0.1.0
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
	var Grid = Grid || { 'Name': 'Grid' }

	/**
	 * Namespace pro Responsive Design
	 */
	Grid.RD = Grid.RD || { 'Name': 'Grid.RD' };

	/**
	 * Breakpointy pro Responsive Design
	 *
	 * @notes V "em" stejně jako v CSS
	 */

    /* layout – mobil 1 */
	Grid.RD.MIN_M1 = 20; 		/* 320px */
	Grid.RD.MAX_M1 = 25.4375; 	/* 407px */

	/* layout – mobil 2 */
	Grid.RD.MIN_M2 = 25.5; 		/* 408px */
	Grid.RD.MAX_M2 = 37.4375; 	/* 599px */

	/* layout – tablet */
	Grid.RD.MIN_TB = 37.5; 		/* 600px */
	Grid.RD.MAX_TB = 62.9375; 	/* 1007px */

	/* layout – desktop */
	Grid.RD.MIN_DK = 63; 		/* 1008px */
	Grid.RD.MAX_DK = 63; 		/* 1008px */

    // vloží všechny požadované části
	require('./grid.builder')(Grid);
	require('./grid.manager')(Grid);
	require('./grid.core')(Grid);

  	// zveřejním do window objektu pouze instanci samotného jádra
    window.Grid = Grid.Core;
})();