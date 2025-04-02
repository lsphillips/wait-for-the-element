import {
	babel
} from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

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

export default
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
