import {
	setTimeout
} from 'node:timers/promises';
import {
	describe,
	it,
	before,
	afterEach
} from 'node:test';
import assert from 'node:assert';
import {
	createBrowserWithLibrary
} from './support/browser.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('wait-for-the-element', function ()
{
	let window, waitForTheElement, waitForTheElementToDisappear;

	before(async function ()
	{
		// Setup browser.
		window = await createBrowserWithLibrary();

		// Setup library.
		({ waitForTheElement, waitForTheElementToDisappear } = window.library);
	});

	afterEach(function ()
	{
		window.document.body.innerHTML = '';
	});

	describe('function waitForTheElement(selector, options)', function ()
	{
		describe('when elements matching `selector` already exist', function ()
		{
			it('shall return a promise that will be fulfilled with the first matching element', async function ()
			{
				// Setup.
				window.document.body.innerHTML = `
					<div class="target" id="target"></div>
					<div class="target" id="ignore"></div>
				`;

				// Act.
				const element = await waitForTheElement('.target');

				// Assert.
				assert.strictEqual(element.id, 'target');
			});

			it('shall return a promise that will be fulfilled with the first matching element this is inside `options.scope`', async function ()
			{
				window.document.body.innerHTML = `
					<div class="target" id="out-of-scope"></div>

					<div id="parent">
						<div class="target" id="target"></div>
						<div class="target" id="ignore"></div>
					</div>
				`;

				// Act.
				const element = await waitForTheElement('.target', {
					scope : window.document.querySelector('#parent')
				});

				// Assert.
				assert.strictEqual(element.id, 'target');
			});
		});

		describe('when no elements matching `selector` exist', function ()
		{
			it('shall return a promise that will be fulfilled with `null` if an element is not matched after 2.5 seconds', async function ()
			{
				// Act & Assert.
				assert.strictEqual(
					await waitForTheElement('.target'), null
				);
			});

			it('shall return a promise that will be fulfilled with `null` if an element is not matched after `options.timeout`', async function ()
			{
				// Act & Assert.
				assert.strictEqual(
					await waitForTheElement('.target', {
						timeout : 4000
					}),
					null
				);
			});

			it('shall return a promise that will be fulfilled with a matching element that was eventually added', async function ()
			{
				// Act.
				const element = waitForTheElement('.target');

				// Setup.
				await setTimeout(1000);

				// Setup.
				window.document.body.innerHTML = `
					<div class="target" id="target"></div>
					<div class="target" id="ignore"></div>
				`;

				// Assert.
				assert.strictEqual(
					(await element).id, 'target'
				);
			});

			describe('shall return a promise that will be fulfilled with a matching element that matched after an attribute change', function ()
			{
				it('including class attributes', async function ()
				{
					// Setup.
					window.document.body.innerHTML = `
						<div id="target" class="ignore"></div>
					`;

					// Act.
					const element = waitForTheElement('.target');

					// Setup.
					await setTimeout(1000);

					// Setup.
					window.document.querySelector('#target').setAttribute('class', 'target');

					// Assert.
					assert.strictEqual(
						(await element).id, 'target'
					);
				});

				it('including id attributes', async function ()
				{
					// Setup.
					window.document.body.innerHTML = `
						<div id="ignore"></div>
					`;

					// Act.
					const element = waitForTheElement('#target');

					// Setup.
					await setTimeout(1000);

					// Setup.
					window.document.querySelector('#ignore').setAttribute('id', 'target');

					// Assert.
					assert.strictEqual(
						(await element).id, 'target'
					);
				});

				it('including miscellaneous attributes', async function ()
				{
					// Setup.
					window.document.body.innerHTML = `
						<input type="text" id="target" name="ignore" />
					`;

					// Act.
					const element = waitForTheElement('input[name="target"]');

					// Setup.
					await setTimeout(1000);

					// Setup.
					window.document.querySelector('#target').setAttribute('name', 'target');

					// Assert.
					assert.strictEqual(
						(await element).id, 'target'
					);
				});

				it('including data attributes', async function ()
				{
					// Setup.
					window.document.body.innerHTML = `
						<div id="target" data-attribute="ignore"></div>
					`;

					// Act.
					const element = waitForTheElement('[data-attribute="target"]');

					// Setup.
					await setTimeout(1000);

					// Setup.
					window.document.querySelector('#target').setAttribute('data-attribute', 'target');

					// Assert.
					assert.strictEqual(
						(await element).id, 'target'
					);
				});
			});

			it('shall return a promise that will be fulfilled with a matching element only found inside `options.scope`', async function ()
			{
				// Setup.
				window.document.body.innerHTML = `
					<div id="ignore" class="target"></div>
					<div id="parent"></div>
				`;

				const scope = window.document.querySelector('#parent');

				// Act.
				const element = waitForTheElement('.target', {
					scope
				});

				// Setup.
				await setTimeout(1000);

				// Setup.
				window.document.querySelector('#ignore').setAttribute('class', 'target');

				// Setup.
				scope.innerHTML = `
					<div id="target" class="target"></div>
				`;

				// Assert.
				assert.strictEqual(
					(await element).id, 'target'
				);
			});
		});
	});

	describe('function waitForTheElementToDisappear(selector, options)', function ()
	{
		describe('when no elements matching `selector` exist', function ()
		{
			it('shall return a promise that will be fulfilled with `true`', async function ()
			{
				// Act & Assert.
				assert.strictEqual(
					await waitForTheElementToDisappear('.target'), true
				);
			});

			it('shall return a promise that will be fulfilled with `true` when no match is found inside `options.scope`', async function ()
			{
				// Setup.
				window.document.body.innerHTML = `
					<div id="ignore" class="target"></div>
					<div id="parent"></div>
				`;

				// Act & Assert.
				assert.strictEqual(
					await waitForTheElementToDisappear('.target', {
						scope : window.document.querySelector('#parent')
					}),
					true
				);
			});
		});

		describe('when elements matching `selector` already exist', function ()
		{
			it('shall return a promise that will be fulfilled with `false` if an element still matches after 2.5 seconds', async function ()
			{
				// Setup.
				window.document.body.innerHTML = `
					<div class="target"></div>
				`;

				// Act & Assert.
				assert.strictEqual(
					await waitForTheElementToDisappear('.target'), false
				);
			});

			it('shall return a promise that will be fulfilled with `false` if an element still matches after `options.timeout`', async function ()
			{
				// Setup.
				window.document.body.innerHTML = `
					<div class="target"></div>
				`;

				// Act & Assert.
				assert.strictEqual(
					await waitForTheElementToDisappear('.target', {
						timeout : 4000
					}),
					false
				);
			});

			it('shall return a promise that will be fulfilled with `true` when the matching element is eventually removed', async function ()
			{
				// Setup.
				window.document.body.innerHTML = `
					<div id="target"></div>
				`;

				// Act.
				const result = waitForTheElementToDisappear('#target');

				// Setup.
				await setTimeout(1000);

				// Setup.
				window.document.querySelector('#target').remove();

				// Assert.
				assert.strictEqual(await result, true);
			});

			it('shall return a promise that will be fulfilled with `true` only when all matching elements are removed', async function ()
			{
				// Setup.
				window.document.body.innerHTML = `
					<div class="target"></div>
					<div class="target"></div>
				`;

				// Act.
				const result = waitForTheElementToDisappear('.target');

				// Setup.
				await setTimeout(1000);

				// Setup.
				window.document.querySelector('.target').remove();

				// Assert.
				assert.strictEqual(await result, false);
			});

			describe('shall return a promise that will be fulfilled with `true` when no element matches after an attribute change', function ()
			{
				it('including class attributes', async function ()
				{
					// Setup.
					window.document.body.innerHTML = `
						<div id="target" class="target"></div>
					`;

					// Act.
					const result = waitForTheElementToDisappear('.target');

					// Setup.
					await setTimeout(1000);

					// Setup.
					window.document.querySelector('#target').setAttribute('class', 'ignore');

					// Assert.
					assert.strictEqual(await result, true);
				});

				it('including id attributes', async function ()
				{
					// Setup.
					window.document.body.innerHTML = `
						<div id="target"></div>
					`;

					// Act.
					const result = waitForTheElementToDisappear('#target');

					// Setup.
					await setTimeout(1000);

					// Setup.
					window.document.querySelector('#target').setAttribute('id', 'ignore');

					// Assert.
					assert(await result, true);
				});

				it('including miscellaneous attributes', async function ()
				{
					// Setup.
					window.document.body.innerHTML = `
						<input type="text" id="target" name="target" />
					`;

					// Act.
					const result = waitForTheElementToDisappear('input[name="target"]');

					// Setup.
					await setTimeout(1000);

					// Setup.
					window.document.querySelector('#target').setAttribute('name', 'ignore');

					// Assert.
					assert.strictEqual(await result, true);
				});

				it('including data attributes', async function ()
				{
					// Setup.
					window.document.body.innerHTML = `
						<div id="target" data-attribute="target"></div>
					`;

					// Act.
					const result = waitForTheElementToDisappear('[data-attribute="target"]');

					// Setup.
					await setTimeout(1000);

					// Setup.
					window.document.querySelector('#target').setAttribute('data-attribute', 'ignore');

					// Assert.
					assert.strictEqual(await result, true);
				});
			});

			it('shall return a promise that will be fulfilled with `true` when all matching elements are removed from `options.scope`', async function ()
			{
				// Setup.
				window.document.body.innerHTML = `
					<div class="target" id="ignore"></div>
					<div id="parent">
						<div class="target" id="target"></div>
					</div>
				`;

				// Act.
				const result = waitForTheElementToDisappear('.target', {
					scope : window.document.querySelector('#parent')
				});

				// Setup.
				await setTimeout(1000);

				// Setup.
				window.document.querySelector('#target').remove();

				// Assert.
				return assert.strictEqual(await result, true);
			});
		});
	});
});
