//Item 7: Think of Types as Sets of Values
const x: never = 12;

type A = "A";
type B = "B";
type Twelve = 12;

type AB = "A" | "B";
type AB12 = "A" | "B" | 12;

/*The word “assignable” appears in many TypeScript errors. In the context of
sets of values, it means either “member of” (for a relationship between a
value and a type) or “subset of” (for a relationship between two types):*/

/*declare let twelve: AB12;
const back: AB = twelve;*/
// ~~~~ Type 'AB12' is not assignable to type 'AB'
//
//Type '12' is not assignable to type 'AB'

/*Thinking of types as sets of values helps you reason about operations on
them. For example:*/
interface Person {
  name: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan1 = Person & Lifespan;

/*The & operator computes the intersection of two types. What sorts of values
belong to the PersonSpan type? On first glance, the Person and Lifespan
interfaces have no properties in common, so you might expect it to be the
empty set (i.e., the never type). But type operations apply to the sets of
values (the domain of the type), not to the properties in the interface. And
remember that values with additional properties still belong to a type. So a
value that has the properties of both Person and Lifespan will belong to
the intersection type:*/

const ps: PersonSpan1 = {
  name: "Alan Turing",
  birth: new Date("1912/06/23"),
  death: new Date("1954/06/07"),
};
// OK

/*The intuition about intersecting properties is correct, but for the union of
two interfaces, rather than their intersection:*/

type K = keyof (Person | Lifespan);

/*
keyof (A&B) = (keyof A) | (keyof B)
keyof (A|B) = (keyof A) & (keyof B)
*/

interface Person {
  name: string;
}
interface PersonSpan2 extends Person {
  birth: Date;
  death?: Date;
}

/*While extends is typically used to add fields to an interface, anything
matching a subset of the values of the base type will do. This lets you
model more nuanced type relationships:*/

interface NullyStudent {
  name: string;
  ageYears: number | null;
}
interface Student extends NullyStudent {
  ageYears: number;
}
/*
if you try to expand the type of ageYears
instead, you’ll get an error:

interface StringyStudent extends NullyStudent {
  ageYears: number | string;
}
*/

interface Vector1d {
  x: Number;
}
interface Vector2d {
  y: Number;
}

interface Vector3d {
  z: Number;
}

/*
The extends keyword can also appear as a constraint in a generic type, and
it also means “subset of” in this context*/

function getKey<K extends string>(val: any, key: K) {
  // ...
}

getKey({}, "x");
// OK, 'x' extends string
getKey({}, Math.random() < 0.5 ? "a" : "b");
// OK, 'a'|'b' extends string
getKey({}, document.title);
// OK, string extends string

/*Thinking of types as sets can also clarify the relationships between arrays
and tuples. For example:
*/

const list = [1, 2];
const tuple: [number, number] = list;
// reverse would be true though

/*Is a triple assignable to a pair? Thinking in terms of structural typing, you
might expect it to be. A pair has 0 and 1 keys, so mightn’t it have others,
too, like 2?
const triple: [number, number, number] = [1, 2, 3];
const double: [number, number] = triple;
// ~~~~~~ '[number, number, number]' is not assignable to '[number,
number]'
//
Source has 3 element(s) but target allows only 2.
The answer is “no,” and for an interesting reason. Rather than modeling a
pair of numbers as {0: number, 1: number}, TypeScript models it as {0:
number, 1: number, length: 2}. This makes sense—you can check the
length of a tuple—and it precludes this assignment. And that’s probably for
the best!
*/
