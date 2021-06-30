'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = function config (api)
{
	api.cache(false);

	return {

		presets :
		[
			'@babel/env'
		],

		plugins :
		[

		],

		ignore :
		[
			/(node_modules)/
		]
	};
};
