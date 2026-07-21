function printTriangles(n: number) {
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(i);
    console.log(arraySum(nums));
  }
}

function arraySum(arr: readonly number[]) {
  let sum = 0;
  let num;
  while ((num = arr.pop()) !== undefined) {
    sum += num;
  }
  return sum;
}

/*
his function does calculate the sum of the numbers in the array. But it also
has the side effect of emptying the array! TypeScript is fine with this,
because JavaScript arrays are mutable. The problem is that
printTriangles made an assumption about arraySum, namely that it
doesn’t modify nums.
Mutation is the root cause of many hard-to-find bugs. Mutable is the default
in JavaScript, but TypeScript’s readonly modifier can help you catch and
prevent surprise mutations. Because it can prevent such a pernicious set of
bugs, it’s worth learning how to use this feature in your own code.

*/

interface PartlyMutableName {
  readonly first: string;
  last: string;
}
const jackie: PartlyMutableName = { first: "Jacqueline", last: "Kennedy" };
jackie.last = "Onassis";
// OK
jackie.first = "Jacky";
// ~~~~~ Cannot assign to 'first' because it is a read-only property

/*
Typically, you’ll want to prevent assignments to all properties on an object.
TypeScript provides a generic utility type, Readonly<T>, that does just that:

*/

interface FullyMutableName {
  first: string;
  last: string;
}

type FullyImmutableName = Readonly<FullyMutableName>;

interface Outer {
  inner: {
    x: number;
  };
}
const obj2: Readonly<Outer> = { inner: { x: 0 } };
obj2.inner = { x: 1 };
// ~~~~~ Cannot assign to 'inner' because it is a read-only property
obj2.inner.x = 1;
// OK

const a: number[] = [1, 2, 3];
const b: readonly number[] = a;
const c: number[] = b;

function printTriangles2(n: number) {
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(i);
    console.log(arraySum(nums as readonly number[]));
    //

    // The type 'readonly number[]' is 'readonly' and cannot be
    // assigned to the mutable type 'number[]'.
  }
}

/*
if your function does not modify its parameters, declare them
readonly (arrays) or Readonly (object types). This makes the
function’s contract clearer and prevents inadvertent mutations in its
implementation.
Understand that readonly and Readonly are shallow, and that
Readonly only affects properties, not methods.
Use readonly to prevent errors with mutation and to find the places in
your code where mutations occur.
Understand the difference between const and readonly: the former
prevents reassignment, the latter prevents mutation.

*/
