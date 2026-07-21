/*
Item 13: Know the Differences Between type
and interface*/

type TState = {
  name: string;
  capital: string;
};

interface IState {
  name: string;
  capital: string;
}

/*
For new code where you need to pick a style, the general rule of thumb is to
use interface where possible, using type either where it’s required (e.g.,
union types) or has a cleaner syntax (e.g., function types). We’ll get to the
arguments for this toward the end of this item, but for now let’s explore the
similarities and differences between these two constructs.
*/

/*
First, the similarities: the two State types are nearly indistinguishable from
one another. If you define an IState or a TState value with an extra
property, the errors you get from excess property checking (Item 11) are
character-by-character identical:

*/

type TFn = (x: number) => string;
interface IFn {
  (x: number): string;
}
type TFnAlt = {
  (x: number): string;
};
const toStrT: TFn = (x) => "" + x; // OK
const toStrI: IFn = (x) => "" + x; // OK
const toStrTAlt: TFnAlt = (x) => "" + x; // OK

type TBox<T> = {
  value: T;
};
interface IBox<T> {
  value: T;
}

/*
An interface can extend a type (with some caveats, explained
momentarily), and a type can extend an interface:
*/

interface IStateWithPop extends TState {
  population: number;
}
type TStateWithPop = IState & { population: number };

/*
gain, these types are identical. The caveat is that an interface can only
extend object types that could have been defined with interface (even if
you happened to define them with type). You can’t extend a union type, for
example. If you want to do that, you’ll need to use type and &.
*/

/*
there are union types but no union interfaces
*/

type AorB = "a" | "b";

/*An interface can extend some types, but not this one. Extending union
types can sometimes be useful. If you have separate types for Input and
Output variables and a mapping from name to variable:*/
type Input = {
  /* ... */
};
type Output = {
  /* ... */
};
interface VariableMap {
  [name: string]: Input | Output;
}
type NamedVariable = (Input | Output) & { name: string };
/*then you might want a type that attaches the name to the variable. This
would be:
type NamedVariable = (Input | Output) & { name: string };
This type cannot be expressed with interface. A type is, in general, more
capable than an interface. It can be a union, and it can also take
advantage of fancy type-level features*/

//Type aliases are the natural way to express tuple and array types:
type Pair = [a: number, b: number];
type StringList = string[];
type NamedNums = [string, ...number[]];

/*
An interface does have some abilities that a type doesn’t, however. One
of these is that an interface can be augmented. Going back to the State
example, you could have added a population field in another way:
*/
interface IState {
  name: string;
  capital: string;
}
interface IState {
  population: number;
}
const wyoming: IState = {
  name: "Wyoming",
  capital: "Cheyenne",
  population: 578_000,
};

/*
his is known as “declaration merging,” and it’s quite surprising if you’ve
never seen it before. This is primarily used with type declaration files
(Chapter 8), and if you’re writing one, you should follow the norms and use
interface to support it. The idea is that there may be gaps in your type
declarations that users need to fill, and this is how they do it.
*/

/*
Returning to the question at the start of the item, should you use type or
interface? For complex types, you have no choice: you need to use a type
alias. And for function types, tuple types, and array types, the type syntax
is more concise and natural than the interface syntax. But what about
simpler object types that can be represented either way?
If you’re working in a codebase with an established style, stick with that.
You probably won’t go too wrong.
For a new project without an established style, prefer interface. Your type
name will appear more consistently in error messages and type display, and
you’ll get more checks that you extend other interfaces correctly.
*/

/*
Returning to the question at the start of the item, should you use type or
interface? For complex types, you have no choice: you need to use a type
alias. And for function types, tuple types, and array types, the type syntax
is more concise and natural than the interface syntax. But what about
simpler object types that can be represented either way?
If you’re working in a codebase with an established style, stick with that.
You probably won’t go too wrong.
For a new project without an established style, prefer interface. Your type
name will appear more consistently in error messages and type display, and
you’ll get more checks that you extend other interfaces correctly.

*/
