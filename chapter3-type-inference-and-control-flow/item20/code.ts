//Item 20: Understand How a Variable Gets Its Type

interface Vector3 {
  x: number;
  y: number;
  z: number;
}
function getComponent(vector: Vector3, axis: "x" | "y" | "z") {
  return vector[axis];
}

//But when you try to use it, TypeScript flags an error:

let x = "x";
let vec = { x: 10, y: 20, z: 30 };
getComponent(vec, x);

// Argument of type 'string' is not assignable
//
//to parameter of type '"x" | "y" | "z"'

/*
The issue is that x’s type is inferred as string, whereas the getComponent
function expected a more specific type for its second argument. This is
widening at work, and here it has led to a type error.
Widening is ambiguous in the sense that there are many possible types for
any given value. In this statement, for example
*/

/*
The general rule for primitive values assigned with let is that they expand
to their “base type”: "x" expands to string, 39 expands to number, true
expands to boolean and so on. (null and undefined are handled
differently, see Item 25.)
*/

/*
If you declare a variable with const instead of let, it gets a
narrower type. In fact, using const fixes the error in our original example:
*/

const x2 = "x";
// ^? const x: "x"
let vec2 = { x: 10, y: 20, z: 30 };
getComponent(vec, x2);
// OK

//Similar issues arise with objects. This code is fine in JavaScript:
const obj = {
  x: 1,
};
obj.x = 3;
obj.x = "3";
obj.y = 4;
obj.z = 5;
obj.name = "Pythagoras";
/*
The type of obj could be inferred anywhere along the spectrum of
specificity. At the specific end is {readonly x: 1}. More general is {x:
number}. More general still would be {[key: string]: number}, object
or, most general of all, any, or unknown.
In the case of objects, TypeScript infers what it calls the “best common
type.” It determines this by treating each property as though it were
assigned with let. So the type of obj comes out as {x: number}. This lets
you reassign obj.x to a different number, but not to a string. And it
prevents you from adding other properties via direct assignment. (This is a
good reason to build objects all at once, as explained in Item 21.)
So the last four statements are errors:*/

const obj = {
  x: 1,
};
obj.x = 3;
// OK
obj.x = "3";
// ~ Type 'string' is not assignable to type 'number'
obj.y = 4;
// ~ Property 'y' does not exist on type '{ x: number; }'
obj.z = 5;
// ~ Property 'z' does not exist on type '{ x: number; }'
obj.name = "Pythagoras";
// ~~~~ Property 'name' does not exist on type '{ x: number; }'1

/*
Again, TypeScript is trying to strike a balance between specificity and
flexibility. It needs to infer a specific enough type to catch errors, but not
such a specific type that it creates false positives. It does this by inferring a
type of number for a property initialized to a value like 1.
If you know better, there are a few ways to override TypeScript’s default
behavior. One is to supply an explicit type annotation:
*/

const obj3: { x: string | number } = { x: 1 };

/*
Another is to provide additional context to the type checker, e.g., by passing
the value as an argument to a function (Item 24).
A third way is with a const assertion. This is not to be confused with let
and const, which introduce symbols in value space. This is a purely type-
level construct. Look at the different inferred types for these variables:
*/

const obj1 = { x: 1, y: 2 };
// ^? const obj1: { x: number; y: number; }
const obj2 = { x: 1 as const, y: 2 };
// ^? const obj2: { x: 1; y: number; }
const obj4 = { x: 1, y: 2 } as const;

/*When you write as const after a value, TypeScript will infer the narrowest
possible type for it. There is no widening. For true constants, this is
typically what you want. You can also use as const with arrays to infer a
tuple type:
*/
const arr1 = [1, 2, 3];
// ^? const arr1: number[]
const arr2 = [1, 2, 3] as const;
// ^? const arr2: readonly [1, 2, 3]

function tuple<T extends unknown[]>(...elements: T) {
  return elements;
}
const arr3 = tuple(1, 2, 3);
// ^? const arr3: [number, number, number]
const mix = tuple(4, "five", true);
// ^? const mix: [number, string, boolean]
// The tuple function here serves no purpose at runtime, but guides
// TypeScript toward inferring the type you want.
// Another function that can guide inference is JavaScript’s Object.freeze:

const frozenArray = Object.freeze([1, 2, 3]);
// ^? const frozenArray: readonly number[]
const frozenObj = Object.freeze({ x: 1, y: 2 });
// ^? const frozenObj: Readonly<{ x: 1; y: 2; }>

/*
Finally, a fourth way to control widening is the satisfies operator. This
ensures that a value, well, satisfies the requirements of a type and guides
inference by preventing TypeScript from inferring a wider type. Here’s how
it works:
*/

type Point = [number, number];
const capitals1 = { ny: [-73.7562, 42.6526], ca: [-121.4944, 38.5816] };
const capitals2 = {
  ny: [-73.7562, 42.6526],
  ca: [-121.4944, 38.5816],
} satisfies Record<string, Point>;
capitals2;

/*
Left to its own devices, TypeScript takes the keys from the object literal and
widens the values to number[], just as it would with let. With satisfies,
we prevent the values from being widened beyond the Point type.
Compare this to what you get from an annotation using the same type:
*/
const capitals3: Record<string, Point> = capitals2;
capitals3.pr;
// undefined at runtime
// ^? Point
capitals2.pr;
//

/*

Things to Remember
Understand how TypeScript infers a type from a literal by widening it.
Familiarize yourself with the ways you can affect this behavior: const,
type annotations, context, helper functions, as const, and satisfies.

*/
