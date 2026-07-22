//Item 18: Avoid Cluttering Your Code with Inferable Types

/*

Explicit type annotations are still required in some situations where
TypeScript doesn’t have enough context to determine a type on its own.
You have seen one of these before: function parameters.

Ideal TypeScript code includes type annotations for function/method
signatures but not for the local variables created in their bodies. This keeps
noise to a minimum and lets readers focus on the implementation logic.

*/


/*Parameter types can usually be inferred when the function is used as a
callback for a library with type declarations. The declarations on request
and response in this example using the express HTTP server library are
not required:
*/
// Don't do this:

app.get('/health', (request: express.Request, response: express.Response) => {
response.send('OK');
});// Do this:
app.get('/health', (request, response) => {
//
^? (parameter) request: Request<...>
response.send('OK');
// ^? (parameter) response: Response<...>
});



/*

There are a few situations where you may still want to specify a type even
where it can be inferred.
One is when you define an object literal:
*/

interface Product {
    name: string
    id: string
    price: number
}
const elmo: Product = {
name: 'Tickle Me Elmo',
id: '048188 627152',
price: 28.99,
};


/*

Things to Remember
Avoid writing type annotations when TypeScript can infer the same
type.
Ideal TypeScript code has type annotations in function/method
signatures but not on local variables in their bodies.
Consider using explicit annotations for object literals to enable excess
property checking and ensure errors are reported close to where they
occur.
Don’t annotate function return types unless the function has multiple
returns, is part of a public API, or you want it to return a named type

*/


