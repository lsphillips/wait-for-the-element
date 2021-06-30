'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const { buildForTests } = require('./rollup.config.cjs');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = function test (config)
{
	config.set({

		files :
		[
			'tests/**/*.test.js'
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

		rollupPreprocessor : buildForTests()
	});
};
