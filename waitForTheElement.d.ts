export interface WaitForTheElementOptions
{
	timeout? : number;
	scope?   : Element;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function waitForTheElement<T> (selector : string, options? : WaitForTheElementOptions) : Promise<T>;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export function tryAndWaitForTheElement<T> (selector : string, options? : WaitForTheElementOptions) : Promise<T | null>;
