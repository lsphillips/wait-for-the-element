/**
 * Options that define how an element should be searched for.
 */
export interface ElementSearchOptions
{
	/**
	 * The maximum amount of time (in milliseconds) to wait for a matching element to exist.
	 */
	timeout? : number;

	/**
	 * The root element to start searching from.
	 */
	scope? : Element;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Fetches an element by waiting for it to exist.
 *
 * Example usage:
 *
 * ``` js
 * try
 * {
 *     let element = await waitForTheElement('.selector-for-an-element-that-may-appear-later', {
 *         timeout : 5000
 *     });
 * }
 * catch (error)
 * {
 *     throw new Error('Took more than 5 seconds to find the element.');
 * }
 * ```
 *
 * By default it will search the entire document and wait for 2.5 seconds.
 *
 * @param selector The selector of the element to fetch. This can be any selector that `document.querySelector()` supports.
 * @param options  Options that define how the element should be searched for.
 *
 * @typeParam E The type of the element you expect to be found.
 *
 * @returns A promise that will resolve with an element matching `selector`, or reject with an error if an element isn't found in time.
 */
export function waitForTheElement<E extends Element> (selector : string, options? : ElementSearchOptions) : Promise<E>;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Fetches an element by waiting for it to exist, but returns `null` instead of throwing an error.
 *
 * Example usage:
 *
 * ``` js
 * let element = await tryAndWaitForTheElement('.selector-for-an-element-that-may-appear-later', {
 *     timeout : 5000
 * });
 *
 * if (element === null)
 * {
 *     console.log('Took more than 5 seconds to find the element.');
 * }
 * ```
 *
 * By default it will search the entire document and wait for 2.5 seconds.
 *
 * @param selector The selector of the element to fetch. This can be any selector that `document.querySelector()` supports.
 * @param options  Options that define how the element should be searched for.
 *
 * @typeParam E The type of the element you expect to be found.
 *
 * @returns A promise that will resolve with an element matching `selector`, or `null` if an element isn't found in time.
 */
export function tryAndWaitForTheElement<E extends Element> (selector : string, options? : ElementSearchOptions) : Promise<E | null>;
