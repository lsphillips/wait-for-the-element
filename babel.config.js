export default function config (api)
{
	api.cache(true);

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
}
