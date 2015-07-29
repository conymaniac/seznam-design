module.exports = function() {

/**
 * @overview Základní správce mřížky
 * @version 0.1.0
 * @author Dominik Michna (dominik.michna@firma.seznam.cz)
 */

/**
 * @class grid.build
 */
(function() {
    'use strict';

    /**
	 * Namespace pro Grid
	 * @type {object}
	 *
	 * @group grid
	 */
	var Grid = Grid || { 'Name': 'Grid' }
  	
  	// zveřejnění do window objektu
    window.Grid = Grid;

})();

}