// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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

export default getMatchingElementFromMutation;
