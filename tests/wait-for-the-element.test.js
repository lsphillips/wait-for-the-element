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
		beforeEach(function ()
		{
			document.body.innerHTML = `
				<div class="target" id="target-1"></div>

				<div id="parent">
					<div class="target" id="target-2"></div>
					<div class="target" id="target-3"></div>
				</div>

				<div class="target" id="target-4"></div>
			`;
		});

		it('shall return a promise that will be fulfilled with the first matching element', function ()
		{
			// Act & Assert.
			return expect(
				waitForTheElement('.target')
			).to.eventually.have.property('id', 'target-1');
		});

		it('shall return a promise that will be fulfilled with the first matching element this is inside `options.scope`', function ()
		{
			const scope = document.querySelector('#parent');

			// Act & Assert.
			return expect(
				waitForTheElement('.target', {
					scope
				})
			).to.eventually.have.property('id', 'target-2');
		});
	});

	describe('when no elements matching `selector` exist', function ()
	{
		it('shall throw an error if an element is not matched after 2.5 seconds', function ()
		{
			// Act & Assert.
			return expect(
				waitForTheElement('.target')
			).to.be.rejectedWith(Error);
		});

		it('shall throw an error if an element is not matched after `options.timeout`', function ()
		{
			// Act & Assert.
			return expect(
				waitForTheElement('.target', {
					timeout : 4000
				})
			).to.be.rejectedWith(Error);
		});

		it('shall return a promise that will be fulfilled with a matching element that was eventually added', async function ()
		{
			// Act.
			const element = waitForTheElement('.target');

			// Wait.
			await wait(1000);

			// Setup.
			document.body.innerHTML = `
				<div class="target" id="target-1"></div>
				<div class="target" id="target-2"></div>
			`;

			// Assert.
			return expect(element).to.eventually.have.property('id', 'target-1');
		});

		it('shall return a promise that will be fulfilled with a matching element that matched after an attribute change', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div id="target"></div>
			`;

			// Act.
			const element = waitForTheElement('[data-name="target"]');

			// Wait.
			await wait(1000);

			// Setup.
			document.querySelector('#target').setAttribute('data-name', 'target');

			// Assert.
			return expect(element).to.eventually.have.property('id', 'target');
		});

		it('shall return a promise that will be fulfilled with a matching element that is inside `options.scope`', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div id="target-1"></div>
				<div id="parent">

				</div>
			`;

			const scope = document.querySelector('#parent');

			// Act.
			const element = waitForTheElement('.target', {
				scope
			});

			// Wait.
			await wait(1000);

			// Setup.
			document.querySelector('#target-1').setAttribute('class', 'target');

			// Setup.
			scope.innerHTML = `
				<div class="target" id="target-2"></div>
			`;

			// Assert.
			return expect(element).to.eventually.have.property('id', 'target-2');
		});
	});
});

describe('function waitForTheElementToDisappear(selector, options)', function ()
{
	describe('when no elements matching `selector` exist', function ()
	{
		it('shall return a promise that will be fulfilled', function ()
		{
			// Act & Assert.
			return expect(
				waitForTheElementToDisappear('.target')
			).to.be.fulfilled;
		});

		it('shall return a promise that will be fulfilled when no match is found inside `options.scope`', function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div class="target"></div>
				<div id="parent"></div>
			`;

			const scope = document.querySelector('#parent');

			// Act & Assert.
			return expect(
				waitForTheElementToDisappear('.target', {
					scope
				})
			).to.be.fulfilled;
		});
	});

	describe('when elements matching `selector` already exist', function ()
	{
		it('shall throw an error if an element still matches after 2.5 seconds', function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div class="target"></div>
			`;

			// Act & Assert.
			return expect(
				waitForTheElementToDisappear('.target')
			).to.be.rejectedWith(Error);
		});

		it('shall throw an error if an element still matches after `options.timeout`', function ()
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
			).to.be.rejectedWith(Error);
		});

		it('shall return a promise that will be fulfilled when the matching element is eventually removed', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div class="target"></div>
			`;

			// Act.
			const result = waitForTheElementToDisappear('.target');

			// Wait.
			await wait(1000);

			// Setup.
			document.querySelector('.target').remove();

			// Assert.
			return expect(result).to.be.fulfilled;
		});

		it('shall return a promise that will be fulfilled only when all matching elements are removed', async function ()
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
			return expect(result).to.be.rejectedWith(Error);
		});

		it('shall return a promise that will be fulfilled when no element matches after an attribute change', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div id="target" data-name="target"></div>
			`;

			// Act.
			const result = waitForTheElementToDisappear('[data-name="target"]');

			// Wait.
			await wait(1000);

			// Setup.
			document.querySelector('#target').setAttribute('data-name', 'bullseye');

			// Assert.
			return expect(result).to.be.fulfilled;
		});

		it('shall return a promise that will be fulfilled when all matching elements are removed in `options.scope`', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div class="target" id="target-1"></div>
				<div id="parent">
					<div class="target" id="target-2"></div>
				</div>
			`;

			const scope = document.querySelector('#parent');

			// Act.
			const result = waitForTheElement('.target', {
				scope
			});

			// Wait.
			await wait(1000);

			// Setup.
			document.querySelector('#target-2').remove();

			// Assert.
			return expect(result).to.be.fulfilled;
		});
	});
});
