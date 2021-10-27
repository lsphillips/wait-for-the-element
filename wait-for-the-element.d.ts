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
	scope? : ParentNode;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Finds the first element matching a provided selector, if an element does not immediately match is will wait.
 *
 * Example usage:
 *
 * ``` js
 * const element = await waitForTheElement('.target', {
 * {
 *     timeout : 5000
 * });
 *
 * if (element === null)
 * {
 *     // After 5 seconds, a matching element still doesn't exist.
 * }
 * ```
 *
 * @param selector The selector that an element must match. This can be any selector that `document.querySelector()` supports.
 * @param options The options that define how elements should be searched for.
 *
 * @typeParam E The type of the element you expect to be found.
 *
 * @returns A promise that will resolve with the first element matching the `selector`, or resolve with `null` if a matching element is not found.
 */
export function waitForTheElement<E extends Element> (selector : string, options? : ElementSearchOptions) : Promise<E | null>;

/**
 * Waits for all elements to stop matching a provided selector.
 *
 * Example usage:
 *
 * ``` js
 * const hidden = await waitForTheElementToDisappear('.target', {
 *     timeout : 5000
 * });
 *
 * if (!hidden)
 * {
 *     // After 5 seconds, a matching element still exists.
 * }
 * ```
 *
 * @param selector The selector that elements must not match. This can be any selector that `document.querySelector()` supports.
 * @param options Options that define how elements should be searched for.
 *
 * @returns A promise that will resolve with `false` if elements are still found to be matching the `selector`, otherwise it will resolve with `true`.
 */
export function waitForTheElementToDisappear(selector : string, options? : ElementSearchOptions) : Promise<boolean>;
