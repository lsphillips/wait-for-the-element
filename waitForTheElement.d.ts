export interface WaitForTheElementOptions
{
	timeout? : number;
	scope?   : Element;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default function waitForTheElement<T> (selector : string, options? : WaitForTheElementOptions) : Promise<T | null>;
