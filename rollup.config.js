'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const commonjs   = require('rollup-plugin-commonjs');
const buble      = require('rollup-plugin-buble');
const node       = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function ignoreCircularDependencyAndEvalWarnings (warning, next)
{
	if (warning.code !== 'CIRCULAR_DEPENDENCY' && warning.code !== 'EVAL')
	{
		next(warning);
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = function build ({
	forTest = false
} = {})
{
	const plugins =
	[
		commonjs(),
		node()
	];

	if (forTest)
	{
		return {

			onwarn : ignoreCircularDependencyAndEvalWarnings,

			output :
			{
				format : 'iife',
				name : 'tests',
				sourcemap : 'inline'
			},

			plugins
		};
	}

	return {

		input : 'src/waitForTheElement.js',

		output :
		{
			file : 'waitForTheElement.js',
			format : 'umd',
			name : 'waitForTheElement',
			exports : 'named'
		},

		plugins : [
			...plugins, buble({
				transforms : { dangerousForOf : true }
			}), terser()
		]
	};
};
