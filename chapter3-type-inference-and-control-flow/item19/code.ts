//Item 19: Use Different Variables for DifferentTypes

function fetchProduct(productId: string | number) {}

function fetchProductBySerialNumber(productId: number) {}
let productId = "12-34-56";
fetchProduct(productId);
productId = 123456;
// ~~~~~~ Type 'number' is not assignable to type 'string'
fetchProductBySerialNumber(productId);

/*
This fixes the errors. It’s interesting that TypeScript has been able to
determine that id is really a string in the first call and really a number in
the second. It has narrowed the union type based on the assignment

*/

let productId2: string | number = "12-34-56";
fetchProduct(productId2);
productId2 = 123456;
// OK
fetchProductBySerialNumber(productId2);

/*
The better solution is to introduce a new variable:
const productId = "12-34-56";
fetchProduct(productId);
const serial = 123456;
// OK
fetchProductBySerialNumber(serial);

*/

/*The general theme, which will come up repeatedly in this chapter, is that
mutation makes it harder for the type checker to follow along with your
code. Try to avoid type-changing variables. If you can use different names
for different concepts, it will make your code clearer both to human readers
and to the type checker. You should have far more const than let.
This is not to be confused with “shadowed” variables, as in this example:

*/
const productId3 = "12-34-56";
fetchProduct(productId3);
{
  const productId3 = 123456;
  // OK
  fetchProductBySerialNumber(productId3);
  // OK
}

/*
Things to Remember
While a variable’s value can change, its type generally does not.
To avoid confusion, both for human readers and for the type checker,
avoid reusing variables for differently typed values.

*/
