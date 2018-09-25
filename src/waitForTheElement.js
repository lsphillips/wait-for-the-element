'use strict';

/**
 * Retrieves a matching element from a DOM mutation.
 *
 * @private
 *
 * @returns {Element} The matching element from the mutation, otherwise `null`.
 *
 * @param {MutationRecord} mutation The DOM mutation.
 * @param {String}         selector The selector that the element must match.
 */
function getMatchingElementFromMutation  (mutation, selector)
{
	let {
		type,
		target,
		addedNodes
	} = mutation;

	if (type === 'attributes' && target.matches(selector))
	{
		return target;
	}

	if (type === 'childList')
	{
		for (let addedNode of addedNodes)
		{
			if (typeof addedNode.matches === 'function' && addedNode.matches(selector))
			{
				return addedNode;
			}
		}

		return target.querySelector(selector);
	}

	return null;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Fetches an element by waiting for it to exist.
 *
 * Example usage:
 *
 * ```
 * try
 * {
 *     await waitForTheElement('.element-that-may-appear-later', {
 *         timeout : 5000
 *     });
 * }
 * catch (error)
 * {
 *     throw new Error('Took more than 5 seconds to find the element.');
 * }
 * ```
 *
 * @returns {Promise<Element>} A promise that will be fulfilled with the matching element.
 *
 * @param {String}  selector                   The selector of the element to fetch.
 * @param {Object}  [options]                  Some options to control how the element is searched for.
 * @param {Number}  [options.timeout = 2500]   Determines the maximum amount of time you want to wait for (in milliseconds).
 * @param {Element} [options.scope = document] Determines the scope you want to search in.
 *
 * @throws {Error} When a matching element isn't found in time.
 */
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

/**
 * Fetches an element by waiting for it to exist.
 *
 * This works the same way as `waitForTheElement()`, but returns `null` instead of throwing an error.
 *
 * Example usage:
 *
 * ```
 * let element = await tryAndWaitForTheElement('.element-that-may-appear-later', {
 *     timeout : 5000
 * });
 *
 * if (element === null)
 * {
 *     console.log('Took more than 5 seconds to find the element.');
 * }
 * ```
 *
 * @returns {Promise<Element>} A promise that will be fulfilled with the matching element or `null` if a matching element could not be found.
 *
 * @param {String}  selector                   The selector of the element.
 * @param {Object}  [options]                  Some options to control how the element is searched for.
 * @param {Number}  [options.timeout = 2500]   Determines the maximum amount of time you want to wait for (in milliseconds).
 * @param {Element} [options.scope = document] Determines the scope you want to search in.
 */
function tryAndWaitForTheElement (selector, options)
{
	return waitForTheElement(selector, options).catch(() => null);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = { waitForTheElement, tryAndWaitForTheElement };
