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
			'tests/specs/**/*.spec.js'
		],

		preprocessors :
		{
			'tests/**/*.js' : ['rollup']
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
			'ChromeHeadless'
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
