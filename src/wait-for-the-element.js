const Classes    = /\.(?:[-\w\u{0080}-\u{FFFF}]|\\.)+/u;
const Ids        = /#(?:[-\w\u{0080}-\u{FFFF}]|\\.)+/u;
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

	settings = selectorObservationSettings[selector] = {
		attributes : true, subtree : true, childList : true
	};

	let attributeFilter = [];

	const attributes = selector.matchAll(Attributes);

	for (const [, attribute] of attributes)
	{
		// This means we are matching an attribute in any
		// namespace, we can't do much optimization at this
		// point.
		if (
			attribute.startsWith('*') || attribute.startsWith('|')
		)
		{
			return settings;
		}

		attributeFilter.push(
			attribute.replace('|', ':')
		);
	}

	if (
		Classes.test(selector)
	)
	{
		attributeFilter.push('class');
	}

	if (
		Ids.test(selector)
	)
	{
		attributeFilter.push('id');
	}

	if (attributeFilter.length === 0)
	{
		settings.attributes = false;
	}
	else
	{
		settings.attributeFilter = attributeFilter;
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
				new Error(`An element still does not match selector ${selector} after ${timeout} milliseconds.`)
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
				new Error(`An element still matches selector ${selector} after ${timeout} milliseconds.`)
			);

		}, timeout);
	});
}
