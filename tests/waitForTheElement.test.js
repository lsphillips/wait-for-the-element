'use strict';

// Dependencies
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const { expect, use } = require('chai');
const chaiAsPromised  = require('chai-as-promised');
const delay           = require('timeout-as-promise');

// Subjects
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const { waitForTheElement, tryAndWaitForTheElement } = require('../src/waitForTheElement');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

before(function ()
{
	use(chaiAsPromised);
});

afterEach(function ()
{
	document.body.innerHTML = '';
});

describe('function waitForTheElement(selector, options)', function ()
{
	describe('when elements matching `selector` already exist', function ()
	{
		beforeEach(function ()
		{
			document.body.innerHTML = `
				<div class="target" id="target-1"></div>

				<div id="parent">
					<div class="target" id="target-2">

					</div>
				</div>

				<div class="target" id="target-3"></div>
			`;
		});

		it('shall return a promise that will be fulfilled with the first matching element', function ()
		{
			// Act & Assert.
			return expect(
				waitForTheElement('.target')
			).to.eventually.have.property('id', 'target-1');
		});

		it('shall return a promise that will be fulfilled with the first matching element that is in `options.scope`', function ()
		{
			let scope = document.querySelector('#parent');

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

		it('shall return a promise that will be fulfilled with a matching element when it is eventually added', async function ()
		{
			// Act.
			let element = waitForTheElement('.target');

			// Wait.
			await delay(1000);

			// Setup.
			document.body.innerHTML = `
				<div class="target" id="target-1"></div>
				<div class="target" id="target-2"></div>
			`;

			// Assert.
			return expect(element).to.eventually.have.property('id', 'target-1');
		});

		it('shall return a promise that will be fulfilled with a matching element, even when it is added as a child of another added element', async function ()
		{
			// Act.
			let element = waitForTheElement('.target');

			// Wait.
			await delay(1000);

			// Setup.
			document.body.innerHTML = `
				<div id="parent">
					<div class="target" id="target"></div>
				</div>
			`;

			// Assert.
			return expect(element).to.eventually.have.property('id', 'target');
		});

		it('shall return a promise that will be fulfilled with a matching element after an attribute change', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div id="target"></div>
			`;

			// Act.
			let element = waitForTheElement('.target');

			// Wait.
			await delay(1000);

			// Setup.
			document.querySelector('#target').setAttribute('class', 'target');

			// Assert.
			return expect(element).to.eventually.have.property('id', 'target');
		});

		it('shall return a promise that will be fulfilled with a matching element only when it is in `options.scope`', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div id="target-1"></div>
				<div id="parent">

				</div>
			`;

			let scope = document.querySelector('#parent');

			// Act.
			let element = waitForTheElement('.target', {
				scope
			});

			// Wait.
			await delay(1000);

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

describe('function tryAndWaitForTheElement(selector, options)', function ()
{
	describe('when elements matching `selector` already exist', function ()
	{
		beforeEach(function ()
		{
			document.body.innerHTML = `
				<div class="target" id="target-1"></div>

				<div id="parent">
					<div class="target" id="target-2">

					</div>
				</div>

				<div class="target" id="target-3"></div>
			`;
		});

		it('shall return a promise that will be fulfilled with the first matching element', function ()
		{
			// Act & Assert.
			return expect(
				tryAndWaitForTheElement('.target')
			).to.eventually.have.property('id', 'target-1');
		});

		it('shall return a promise that will be fulfilled with the first matching element that is in `options.scope`', function ()
		{
			let scope = document.querySelector('#parent');

			// Act & Assert.
			return expect(
				tryAndWaitForTheElement('.target', {
					scope
				})
			).to.eventually.have.property('id', 'target-2');
		});
	});

	describe('when no elements matching `selector` exist', function ()
	{
		it('shall return a promise that will be fulfilled with `null` when an element is not matched after 2.5 seconds', function ()
		{
			// Act & Assert.
			return expect(
				tryAndWaitForTheElement('.target')
			).to.eventually.be.null;
		});

		it('shall return a promise that will be fulfilled with `null` when an element is not matched after `options.timeout`', function ()
		{
			// Act & Assert.
			return expect(
				tryAndWaitForTheElement('.target', {
					timeout : 4000
				})
			).to.eventually.be.null;
		});

		it('shall return a promise that will be fulfilled with a matching element when it is eventually added', async function ()
		{
			// Act.
			let element = tryAndWaitForTheElement('.target');

			// Wait.
			await delay(1000);

			// Setup.
			document.body.innerHTML = `
				<div class="target" id="target-1"></div>
				<div class="target" id="target-2"></div>
			`;

			// Assert.
			return expect(element).to.eventually.have.property('id', 'target-1');
		});

		it('shall return a promise that will be fulfilled with a matching element, even when it is added as a child of another added element', async function ()
		{
			// Act.
			let element = tryAndWaitForTheElement('.target');

			// Wait.
			await delay(1000);

			// Setup.
			document.body.innerHTML = `
				<div id="parent">
					<div class="target" id="target"></div>
				</div>
			`;

			// Assert.
			return expect(element).to.eventually.have.property('id', 'target');
		});

		it('shall return a promise that will be fulfilled with a matching element after an attribute change', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div id="target"></div>
			`;

			// Act.
			let element = tryAndWaitForTheElement('.target');

			// Wait.
			await delay(1000);

			// Setup.
			document.querySelector('#target').setAttribute('class', 'target');

			// Assert.
			return expect(element).to.eventually.have.property('id', 'target');
		});

		it('shall return a promise that will be fulfilled with a matching element only when it is in `options.scope`', async function ()
		{
			// Setup.
			document.body.innerHTML = `
				<div id="target-1"></div>
				<div id="parent">

				</div>
			`;

			let scope = document.querySelector('#parent');

			// Act.
			let element = tryAndWaitForTheElement('.target', {
				scope
			});

			// Wait.
			await delay(1000);

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
