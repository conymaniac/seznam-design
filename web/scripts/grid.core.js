module.exports = function() {

/**
 * @overview Základní jádro mřížky
 * @version 0.1.0
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
	var Grid = Grid || { 'Name': 'Grid' }
  	
  	// zveřejnění do window objektu
    window.Grid = Grid;

})();

}