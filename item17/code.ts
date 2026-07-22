//Item 17: Avoid Numeric Index Signatures

/*
JavaScript does not have a notion of “hashable” objects like you find in
Python or Java. If you try to use a more complex object as a key, it is
converted into a string by calling its toString method:
> x = {}
{}
> x[[1, 2, 3]] = 2
2
> x
{ '1,2,3': 2 }

*/

/*
In particular, numbers cannot be used as keys. If you try to use a number as
a property name, the JavaScript runtime will convert it to a string:
> { 1: 2, 3: 4}
{ '1': 2, '3': 4 }
So what are arrays, then? They are certainly objects:
> typeof []
'object'
And yet it’s quite normal to use numeric indices with them:
> x = [1, 2, 3]
[ 1, 2, 3 ]
> x[0]
1
Are these being converted into strings? In one of the oddest quirks of all,
the answer is “yes.” You can also access the elements of an array using
string keys:
> x['1']

*/

const xs = [1, 2, 3];
const x0 = xs[0];
// OK
const x1 = xs["1"];
// stringified numeric constants are also OK
const inputEl = document.getElementsByTagName("input")[0];
const xN = xs[inputEl.value];

/*
While the fiction of numeric keys is helpful, it’s important to remember that
it is just a fiction. Like all aspects of TypeScript’s type system, it is erased
at runtime (Item 3). This means that constructs like Object.keys still
return strings:

*/

/*
The pattern here is that a number index signature means that what you put
in generally has to be a number, but what you get out is a string.
If this sounds confusing, it’s because it is! As a general rule, there’s not
much reason to use number as the index signature of a type. If you want to
specify something that will be indexed using numbers, you probably want
to use an Array or tuple type instead. Using number as an index type can
create the misconception that numeric properties are a real thing in
JavaScript, either for yourself or for readers of your code.z
*/

/*
Things to Remember
Understand that arrays are objects, so their keys are strings, not
numbers. number as an index signature is a purely TypeScript
construct designed to help catch bugs.
Prefer Array, tuple, ArrayLike, or Iterable types to using number in
an index signature yourself

*/
