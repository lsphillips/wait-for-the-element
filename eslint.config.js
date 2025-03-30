import protectMeFromMyStupidity            from 'eslint-config-protect-me-from-my-stupidity';
import andFromWritingStupidWebApplications from 'eslint-config-protect-me-from-my-stupidity/and/from-writing-stupid-web-applications';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default [
	{
		ignores : [
			'wait-for-the-element.js',
			'wait-for-the-element.cjs'
		]
	},
	{
		files : [
			'tests/**/*.test.js'
		],

		languageOptions :
		{
			globals : {
				'before'     : 'readonly',
				'after'      : 'readonly',
				'afterEach'  : 'readonly',
				'beforeEach' : 'readonly',
				'describe'   : 'readonly',
				'it'         : 'readonly'
			}
		}
	},
	...protectMeFromMyStupidity(),
	...andFromWritingStupidWebApplications()
];
