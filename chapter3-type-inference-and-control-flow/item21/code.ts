//Item 21: Create Objects All at Once

const pt = {};
pt.x = 3;
pt.y = 4;

interface Point2 {
  x: number;
  y: number;
}

// This is because the type of pt on the first line is inferred based on its value
// {}, and you may only assign to known properties.

//The best solution is to define the object all at once with a type declaration:
const pt2: Point2 = {
  x: 3,
  y: 4,
};

/*
You can also use object spread syntax to build up objects field by field in a
type-safe way. The key is to use a new variable on every update so that each
gets a new typ
*/

const pt0 = {};
const pt1 = { ...pt0, x: 3 };
const pt3: Point2 = { ...pt1, y: 4 };
// OK

/*
to conditionally add a property in a type-safe way, you can use spread
syntax with {} or any falsy value (null, undefined, false, etc.), which
add no properties:
*/

declare let hasMiddle: boolean;

const firstLast = { first: "Harry", last: "traman" };
const president = { ...firstLast, ...(hasMiddle ? { middle: "S" } : {}) };

/*
Things to Remember
Prefer to build objects all at once rather than piecemeal.
Use multiple objects and object spread syntax ({...a, ...b}) to add
properties in a type-safe way.
Know how to conditionally add properties to an object.

*/
