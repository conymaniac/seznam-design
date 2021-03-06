/**
 * @overview Pack všech skriptů pro Grid
 * @version 0.2.3
 * @author Dominik Michna (dominik.michna@firma.seznam.cz)
 */

(function() {
    'use strict';

    /**
	 * Namespace pro Grid
	 * @type {object}
	 *
	 * @group Grid
	 */
	var Grid = Grid || { 'Name': 'Grid' };

	/**
	 * Namespace pro responzivní třídy Gridu
	 * @type {object}
	 *
	 * @group Grid.RD
	 */
	Grid.RD = Grid.RD || { 'Name': 'Grid.RD' };

	/**
	 * Namespace pro layout – mobile 1
	 * @type {object}
	 *
	 * @group Grid.RD.M1
	 */
	Grid.RD.M1 = Grid.RD.M1 || { 'Name': 'Grid.RD.M1' }; 

	/**
	 * Namespace pro layout – mobile 2
	 * @type {object}
	 *
	 * @group Grid.RD.M2
	 */
	Grid.RD.M2 = Grid.RD.M2 || { 'Name': 'Grid.RD.M2' };		// layout - mobile 2

	/**
	 * Namespace pro layout – tablet
	 * @type {object}
	 *
	 * @group Grid.RD.TB
	 */
	Grid.RD.TB = Grid.RD.TB || { 'Name': 'Grid.RD.TB' };		// layout – tablet

	/**
	 * Namespace pro layout – desktop
	 * @type {object}
	 *
	 * @group Grid.RD.DK
	 */
	Grid.RD.DK = Grid.RD.DK || { 'Name': 'Grid.RD.DK' };		// layout – desktop

	/*
		Breakpointy pro Responsive Design
	 */

    /* layout – mobil 1 */
    Grid.RD.M1.TITLE = 'Mobile 1';
	Grid.RD.M1.MIN_WIDTH = 0; 			/* 320px – chceme mobile 1, i když je menší */
	Grid.RD.M1.MAX_WIDTH = 407;

	/* layout – mobil 2 */
    Grid.RD.M2.TITLE = 'Mobile 2';
	Grid.RD.M2.MIN_WIDTH = 408;
	Grid.RD.M2.MAX_WIDTH = 599;

	/* layout – tablet */
    Grid.RD.TB.TITLE = 'Tablet';
	Grid.RD.TB.MIN_WIDTH = 600;
	Grid.RD.TB.MAX_WIDTH = 1007;

	/* layout – desktop */
    Grid.RD.DK.TITLE = 'Desktop';
	Grid.RD.DK.MIN_WIDTH = 1008;
	Grid.RD.DK.MAX_WIDTH = 10000; 		/* 1008px – ale chceme desktop, i když je větší */

    // vloží všechny požadované části
	require('./grid.builder')(Grid);
	require('./grid.manager')(Grid);
	require('./grid.core')(Grid);

  	// zveřejním do window objektu pouze instanci samotného jádra
    window.Grid = Grid.Core;

})();