'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = function (config)
{
	config.set(
	{
		files :
		[
			'tests/waitForTheElement.test.js'
		],

		frameworks :
		[
			'browserify',
			'mocha',
			'source-map-support'
		],

		browsers :
		[
			'ChromeHeadless',
			'FirefoxHeadless'
		],

		preprocessors :
		{
			'tests/waitForTheElement.test.js' : ['browserify']
		},

		client :
		{
			mocha : { timeout : 5000 }
		},

		browserify : { debug : true }
	});
};
