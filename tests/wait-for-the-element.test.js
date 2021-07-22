import { use, expect }                                     from 'chai';
import asPromised                                          from 'chai-as-promised';
import wait                                                from 'timeout-as-promise';
import { waitForTheElement, waitForTheElementToDisappear } from '../src/wait-for-the-element.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

before(function ()
{
	use(asPromised);
});

afterEach(function ()
{
	document.body.innerHTML = '';
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('function waitForTheElement(selector, options)', function ()
{
	describe('when elements matching `selector` already exist', function ()
	{
		it('shall return a promise that will be fulfilled with the first matching element', function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div class="target" id="target"></div>
				<div class="target" id="ignore"></div>
			`;

			// Act & Assert.
			return expect(
				waitForTheElement('.target')
			).to.eventually.have.property('id', 'target');
		});

		it('shall return a promise that will be fulfilled with the first matching element this is inside `options.scope`', function ()
		{
			document.body.innerHTML = `
				<div class="target" id="out-of-scope"></div>

				<div id="parent">
					<div class="target" id="target"></div>
					<div class="target" id="ignore"></div>
				</div>
			`;

			// Act & Assert.
			return expect(
				waitForTheElement('.target', {
					scope : document.querySelector('#parent')
				})
			).to.eventually.have.property('id', 'target');
		});
	});

	describe('when no elements matching `selector` exist', function ()
	{
		it('shall return a promise that will be fulfilled with `null` if an element is not matched after 2.5 seconds', function ()
		{
			// Act & Assert.
			return expect(
				waitForTheElement('.target')
			).to.eventually.be.null;
		});

		it('shall return a promise that will be fulfilled with `null` if an element is not matched after `options.timeout`', function ()
		{
			// Act & Assert.
			return expect(
				waitForTheElement('.target', {
					timeout : 4000
				})
			).to.eventually.be.null;
		});

		it('shall return a promise that will be fulfilled with a matching element that was eventually added', async function ()
		{
			// Act.
			const element = waitForTheElement('.target');

			// Wait.
			await wait(1000);

			// Setup.
			document.body.innerHTML = `
				<div class="target" id="target"></div>
				<div class="target" id="ignore"></div>
			`;

			// Assert.
			return expect(element).to.eventually.have.property('id', 'target');
		});

		describe('shall return a promise that will be fulfilled with a matching element that matched after an attribute change', function ()
		{
			it('including class attributes', async function ()
			{
				// Setup.
				document.body.innerHTML = `
					<div id="target" class="ignore"></div>
				`;

				// Act.
				const element = waitForTheElement('.target');

				// Wait.
				await wait(1000);

				// Setup.
				document.querySelector('#target').setAttribute('class', 'target');

				// Assert.
				return expect(element).to.eventually.have.property('id', 'target');
			});

			it('including id attributes', async function ()
			{
				// Setup.
				document.body.innerHTML = `
					<div id="ignore"></div>
				`;

				// Act.
				const element = waitForTheElement('#target');

				// Wait.
				await wait(1000);

				// Setup.
				document.querySelector('#ignore').setAttribute('id', 'target');

				// Assert.
				return expect(element).to.eventually.have.property('id', 'target');
			});

			it('including miscellaneous attributes', async function ()
			{
				// Setup.
				document.body.innerHTML = `
					<input type="text" id="target" name="ignore" />
				`;

				// Act.
				const element = waitForTheElement('input[name="target"]');

				// Wait.
				await wait(1000);

				// Setup.
				document.querySelector('#target').setAttribute('name', 'target');

				// Assert.
				return expect(element).to.eventually.have.property('id', 'target');
			});

			it('including data attributes', async function ()
			{
				// Setup.
				document.body.innerHTML = `
					<div id="target" data-attribute="ignore"></div>
				`;

				// Act.
				const element = waitForTheElement('[data-attribute="target"]');

				// Wait.
				await wait(1000);

				// Setup.
				document.querySelector('#target').setAttribute('data-attribute', 'target');

				// Assert.
				return expect(element).to.eventually.have.property('id', 'target');
			});
		});

		it('shall return a promise that will be fulfilled with a matching element only found inside `options.scope`', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div id="ignore" class="target"></div>
				<div id="parent"></div>
			`;

			const scope = document.querySelector('#parent');

			// Act.
			const element = waitForTheElement('.target', {
				scope
			});

			// Wait.
			await wait(1000);

			// Setup.
			document.querySelector('#ignore').setAttribute('class', 'target');

			// Setup.
			scope.innerHTML = `
				<div id="target" class="target"></div>
			`;

			// Assert.
			return expect(element).to.eventually.have.property('id', 'target');
		});
	});
});

describe('function waitForTheElementToDisappear(selector, options)', function ()
{
	describe('when no elements matching `selector` exist', function ()
	{
		it('shall return a promise that will be fulfilled with `true`', function ()
		{
			// Act & Assert.
			return expect(
				waitForTheElementToDisappear('.target')
			).to.eventually.be.true;
		});

		it('shall return a promise that will be fulfilled with `true` when no match is found inside `options.scope`', function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div id="ignore" class="target"></div>
				<div id="parent"></div>
			`;

			// Act & Assert.
			return expect(
				waitForTheElementToDisappear('.target', {
					scope : document.querySelector('#parent')
				})
			).to.eventually.be.true;
		});
	});

	describe('when elements matching `selector` already exist', function ()
	{
		it('shall return a promise that will be fulfilled with `false` if an element still matches after 2.5 seconds', function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div class="target"></div>
			`;

			// Act & Assert.
			return expect(
				waitForTheElementToDisappear('.target')
			).to.eventually.be.false;
		});

		it('shall return a promise that will be fulfilled with `false` if an element still matches after `options.timeout`', function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div class="target"></div>
			`;

			// Act & Assert.
			return expect(
				waitForTheElementToDisappear('.target', {
					timeout : 4000
				})
			).to.eventually.be.false;
		});

		it('shall return a promise that will be fulfilled with `true` when the matching element is eventually removed', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div id="target"></div>
			`;

			// Act.
			const result = waitForTheElementToDisappear('#target');

			// Wait.
			await wait(1000);

			// Setup.
			document.querySelector('#target').remove();

			// Assert.
			return expect(result).to.eventually.be.true;
		});

		it('shall return a promise that will be fulfilled with `true` only when all matching elements are removed', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div class="target"></div>
				<div class="target"></div>
			`;

			// Act.
			const result = waitForTheElementToDisappear('.target');

			// Wait.
			await wait(1000);

			// Setup.
			document.querySelector('.target').remove();

			// Assert.
			return expect(result).to.eventually.be.false;
		});

		describe('shall return a promise that will be fulfilled with `true` when no element matches after an attribute change', function ()
		{
			it('including class attributes', async function ()
			{
				// Setup.
				document.body.innerHTML = `
					<div id="target" class="target"></div>
				`;

				// Act.
				const result = waitForTheElementToDisappear('.target');

				// Wait.
				await wait(1000);

				// Setup.
				document.querySelector('#target').setAttribute('class', 'ignore');

				// Assert.
				return expect(result).to.eventually.be.true;
			});

			it('including id attributes', async function ()
			{
				// Setup.
				document.body.innerHTML = `
					<div id="target"></div>
				`;

				// Act.
				const result = waitForTheElementToDisappear('#target');

				// Wait.
				await wait(1000);

				// Setup.
				document.querySelector('#target').setAttribute('id', 'ignore');

				// Assert.
				return expect(result).to.eventually.be.true;
			});

			it('including miscellaneous attributes', async function ()
			{
				// Setup.
				document.body.innerHTML = `
					<input type="text" id="target" name="target" />
				`;

				// Act.
				const result = waitForTheElementToDisappear('input[name="target"]');

				// Wait.
				await wait(1000);

				// Setup.
				document.querySelector('#target').setAttribute('name', 'ignore');

				// Assert.
				return expect(result).to.eventually.be.true;
			});

			it('including data attributes', async function ()
			{
				// Setup.
				document.body.innerHTML = `
					<div id="target" data-attribute="target"></div>
				`;

				// Act.
				const result = waitForTheElementToDisappear('[data-attribute="target"]');

				// Wait.
				await wait(1000);

				// Setup.
				document.querySelector('#target').setAttribute('data-attribute', 'ignore');

				// Assert.
				return expect(result).to.eventually.be.true;
			});
		});

		it('shall return a promise that will be fulfilled with `true` when all matching elements are removed from `options.scope`', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div class="target" id="ignore"></div>
				<div id="parent">
					<div class="target" id="target"></div>
				</div>
			`;

			// Act.
			const result = waitForTheElementToDisappear('.target', {
				scope : document.querySelector('#parent')
			});

			// Wait.
			await wait(1000);

			// Setup.
			document.querySelector('#target').remove();

			// Assert.
			return expect(result).to.eventually.be.true;
		});
	});
});
