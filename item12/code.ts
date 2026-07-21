/*
Item 12: Apply Types to Entire Function
Expressions When Possible
*/

function rollDice1(sides: number): number {
  /* ... */
  return 2;
}
// Statement
const rollDice2 = function (sides: number): number {
  return 3;
  /* ... */
};
//Expression;
const rollDice3 = (sides: number): number => {
  return 4;
  /* ... */
};
// Also expression;

type DiceRollFn = (sides: number) => number;
const rollDice: DiceRollFn = (sides) => {
  return 1;
  /* ... */
};

type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;
const div: BinaryFn = (a, b) => a / b;

/*
his has fewer type annotations than before, and they’re separated away
from the function implementations. This makes the logic more apparent.
You’ve also gained a check that the return type of all the function
expressions is number.
*/

const checkedFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response;
};

/*
What if you want to match the parameter types of another function but
change the return type? This is possible using a rest parameter and the built-
in Parameters utility type:
*/

async function fetchANumber(
  ...args: Parameters<typeof fetch>
): Promise<number> {
  const response = await checkedFetch(...args);
  const num = Number(await response.text());
  if (isNaN(num)) {
    throw new Error(`Response was not a number.`);
  }
  return num;
}

/*
Things to Remember
Consider applying type annotations to entire function expressions,
rather than to their parameters and return type.
If you’re writing the same type signature repeatedly, factor out a
function type or look for an existing one.
If you’re a library author, provide types for common callbacks.
Use typeof fn to match the signature of another function, or
Parameters and a rest parameter if you need to change the return type.
*/
