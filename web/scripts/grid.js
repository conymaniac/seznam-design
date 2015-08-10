/**
 * @overview Pack všech skriptů pro Grid
 * @version 0.1.2
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
	Grid.RD.M1.MAX_WIDTH = 25.4375; 	/* 407px */

	/* layout – mobil 2 */
    Grid.RD.M2.TITLE = 'Mobile 2';
	Grid.RD.M2.MIN_WIDTH = 25.5; 		/* 408px */
	Grid.RD.M2.MAX_WIDTH = 37.4375; 	/* 599px */

	/* layout – tablet */
    Grid.RD.TB.TITLE = 'Tablet';
	Grid.RD.TB.MIN_WIDTH = 37.5; 		/* 600px */
	Grid.RD.TB.MAX_WIDTH = 62.9375; 	/* 1007px */

	/* layout – desktop */
    Grid.RD.DK.TITLE = 'Desktop';
	Grid.RD.DK.MIN_WIDTH = 63; 			/* 1008px */
	Grid.RD.DK.MAX_WIDTH = 1000; 		/* 1008px – ale chceme desktop, i když je větší */

    // vloží všechny požadované části
	require('./grid.builder')(Grid);
	require('./grid.manager')(Grid);
	require('./grid.core')(Grid);

  	// zveřejním do window objektu pouze instanci samotného jádra
    window.Grid = Grid.Core;

})();