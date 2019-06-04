'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const build = require('./rollup.config');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = function test (config)
{
	config.set(
	{
		files :
		[
			'test/specs/**/*.spec.js'
		],

		preprocessors :
		{
			'test/**/*.js' : ['rollup']
		},

		frameworks :
		[
			'mocha'
		],

		reporters :
		[
			'mocha'
		],

		browsers :
		[
			'ChromeHeadless',
			'FirefoxHeadless'
		],

		concurrency : 1,

		client :
		{
			mocha :
			{
				timeout : 5000
			}
		},

		mochaReporter :
		{
			showDiff : true
		},

		rollupPreprocessor : build({
			forTest : true
		})
	});
};
