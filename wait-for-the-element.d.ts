/**
 * Options that define how elements should be searched for.
 */
export interface ElementSearchOptions
{
	/**
	 * The maximum amount of time (in milliseconds) to wait.
	 *
	 * Defaults to `2500`.
	 */
	timeout? : number;

	/**
	 * The root element to start searching from.
	 *
	 * Defaults to `document`.
	 */
	scope? : Element;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Finds the first element matching a provided selector, if an element does not immediately match is will wait.
 *
 * Example usage:
 *
 * ``` js
 * let element;
 *
 * try
 * {
 *     element = await waitForTheElement('.target', {
 *         timeout : 5000
 *     });
 * }
 * catch (error)
 * {
 *     // After 5 seconds, a matching element still doesn't exist.
 * }
 * ```
 *
 * @param selector The selector that an element must match. This can be any selector that `document.querySelector()` supports.
 * @param options  The options that define how elements should be searched for.
 *
 * @typeParam E The type of the element you expect to be found.
 *
 * @returns A promise that will resolve with the first element matching `selector`, or reject with an error if a matching element is not found.
 */
export function waitForTheElement<E extends Element> (selector : string, options? : ElementSearchOptions) : Promise<E>;

/**
 * Waits for all elements to stop matching a provided selector.
 *
 * Example usage:
 *
 * ``` js
 * try
 * {
 *     await waitForTheElementToDisappear('.target', {
 *         timeout : 5000
 *     });
 * }
 * catch (error)
 * {
 *     // After 5 seconds, a matching element still exists.
 * }
 * ```
 *
 * @param selector The selector that elements must not match. This can be any selector that `document.querySelector()` supports.
 * @param options  Options that define how elements should be searched for.
 *
 * @returns A promise that will resolve, or reject with an error if elements are still found to be matching.
 */
export function waitForTheElementToDisappear(selector : string, options? : ElementSearchOptions) : Promise<void>;
