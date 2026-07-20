interface Person {
  name: string;
}
const alice1: Person = { name: "Alice", first: "a", last: "b" };
// ^? const alice: Person
const bob1 = { name: "Bob" } as Person;
// ^? const bob: Person

/*While these achieve similar ends, they are actually quite different! The first
(alice: Person) adds a type annotation to the variable and ensures that
the value conforms to the type. The latter (as Person) performs a type
assertion. This tells TypeScript that, despite the type it inferred, you know
better and would like the type to be Person.
In general, you should prefer type annotations to type assertions. Here’s
why:

*/
const alice2: Person = {};
// ~~~~~ Property 'name' is missing in type '{}' but required in type
("Person");
const bob2 = {} as Person;
// No error

/*
It can be tricky to use a type annotation with arrow functions. What if you
wanted to use the named Person interface in this code

*/

interface Person2 {
  name: string;
}

const people1 = ["alice", "bob", "jan"].map((name) => ({ name }));

const people2 = ["alice", "bob", "jan"].map((name): Person2 => ({ name }));
// Type is Person[]

/*
So when should you use a type assertion? Type assertions make the most
sense when you truly do know more about a type than TypeScript does,
typically from context that isn’t available to the type checker. If you’re
working in a browser, for instance, you may know the type of a DOM
element more precisely than TypeScript does:
*/

document.querySelector("#myButton")?.addEventListener("click", (e) => {
  e.currentTarget;
  // ^? (property) Event.currentTarget: EventTarget | null
  // currentTarget is #myButton is a button element
  const button = e.currentTarget as HTMLButtonElement;
  // ^? const button: HTMLButtonElement
});

/*
What if a variable’s type includes null but you know from context that this
isn’t possible? You can use a type assertion to remove null from a type:
*/
const elNull = document.getElementById("foo");
// ^? const elNull: HTMLElement | null
const el1 = document.getElementById("foo") as HTMLElement;
// ^? const el: HTMLElement

/*This sort of type assertion is so common that it gets a special syntax and is
known as a non-null assertion:
*/
const el2 = document.getElementById("foo")!;
// ^? const el: HTMLElement

/*
Type assertions have their limits: they don’t let you convert between
arbitrary types. The general rule is that you can use a type assertion to
convert between A and B if they are “comparable” to one another. Using
the set terminology from Item 7, this means that A and B must have a non-
empty intersection. In particular, subtypes are allowed. HTMLElement is a
subtype of HTMLElement | null, so this type assertion is OK. (The
intersection of these types is HTMLElement.) HTMLButtonElement is a
subtype of EventTarget, so that is OK, too. And Person is a subtype of {},
so that assertion is also fine
*/

interface Person {
  name: string;
}
const body = document.body;
const el3 = body as Person;
const el4 = document.body as unknown as Person; //ok
