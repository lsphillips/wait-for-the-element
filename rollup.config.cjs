'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const commonjs        = require('@rollup/plugin-commonjs');
const { babel }       = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser }      = require('rollup-plugin-terser');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function bundle (output)
{
	return {

		input : 'src/wait-for-the-element.js',

		plugins :
		[
			babel({
				babelHelpers : 'bundled'
			}),
			terser()
		],

		output
	};
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports =
[
	bundle({
		file : 'wait-for-the-element.js',
		format : 'esm'
	}),

	bundle({
		file : 'wait-for-the-element.cjs',
		format : 'umd',
		name : 'wait-for-the-element',
		exports : 'named'
	})
];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports.buildForTests = function buildForTests ()
{
	return {

		plugins :
		[
			commonjs(),
			nodeResolve()
		],

		output :
		{
			format : 'iife',
			name : 'tests',
			sourcemap : 'inline'
		}
	};
};
