const Class      = /\.(?:[-\w\u{0080}-\u{FFFF}]|\\.)+/u;
const Id         = /#(?:[-\w\u{0080}-\u{FFFF}]|\\.)+/u;
const Attributes = /\[\s*((?:(?:\*|[-\w]*)\|)?(?:[-\w\u{0080}-\u{FFFF}]+))/gu;

const selectorObservationSettings =
{
	// [selector : string] : (settings : object)
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function getObservationSettingsForSelector (selector)
{
	let settings = selectorObservationSettings[selector];

	if (settings)
	{
		return settings;
	}

	const attributes = [];

	if (
		Class.test(selector)
	)
	{
		attributes.push('class');
	}

	if (
		Id.test(selector)
	)
	{
		attributes.push('id');
	}

	[...selector.matchAll(Attributes)].forEach(match =>
	{
		attributes.push(
			match[1].replace('|', ':')
		);
	});

	settings = selectorObservationSettings[selector] = {
		attributes : true, subtree : true, childList : true
	};

	if (
		attributes.length === 0 || attributes.some(a => a.startsWith('*'))
	)
	{
		settings.attributes = false;
	}
	else
	{
		settings.attributeFilter = attributes;
	}

	return settings;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function waitForTheElement (selector, {
	timeout = 2500, scope = document
} = {})
{
	return new Promise((resolve, reject) =>
	{
		const element = scope.querySelector(selector);

		if (element !== null)
		{
			resolve(element);

			return;
		}

		let timer = null;

		const observer = new MutationObserver(() =>
		{
			const node = scope.querySelector(selector);

			if (node !== null)
			{
				clearTimeout(timer);

				observer.disconnect();

				resolve(node);
			}
		});

		observer.observe(
			scope, getObservationSettingsForSelector(selector)
		);

		timer = setTimeout(() =>
		{
			observer.disconnect();

			reject(
				new Error(`An element does not matche selector ${selector} after ${timeout / 1000} seconds.`)
			);

		}, timeout);
	});
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function waitForTheElementToDisappear (selector, {
	timeout = 2500, scope = document
} = {})
{
	return new Promise((resolve, reject) =>
	{
		let timer = null;

		if (
			scope.querySelector(selector) === null
		)
		{
			resolve();

			return;
		}

		const observer = new MutationObserver(() =>
		{
			if (
				scope.querySelector(selector) === null
			)
			{
				clearTimeout(timer);

				observer.disconnect();

				resolve();
			}
		});

		observer.observe(
			scope, getObservationSettingsForSelector(selector)
		);

		timer = setTimeout(() =>
		{
			observer.disconnect();

			reject(
				new Error(`An element still matches selector ${selector} after ${timeout / 1000} seconds.`)
			);

		}, timeout);
	});
}
