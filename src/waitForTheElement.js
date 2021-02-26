// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import getMatchingElementFromMutation from './getMatchingElementFromMutation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function waitForTheElement (selector, {
	timeout = 2500, scope = document
} = {})
{
	return new Promise((resolve, reject) =>
	{
		let element = scope.querySelector(selector), timer = null;

		if (element !== null)
		{
			resolve(element);

			return;
		}

		let observer = new MutationObserver(mutations =>
		{
			for (let mutation of mutations)
			{
				let nodeThatMatches = getMatchingElementFromMutation(mutation, selector);

				if (nodeThatMatches !== null)
				{
					clearTimeout(timer);

					observer.disconnect();

					resolve(nodeThatMatches);

					break;
				}
			}
		});

		observer.observe(scope, {
			attributes : true, subtree : true, childList : true
		});

		timer = setTimeout(() =>
		{
			observer.disconnect();

			reject(
				new Error(`No element matches the selector ${selector}.`)
			);

		}, timeout);
	});
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function tryAndWaitForTheElement (selector, options)
{
	return waitForTheElement(selector, options).catch(() => null);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export { waitForTheElement, tryAndWaitForTheElement };
