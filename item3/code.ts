//Item 3: Understand That Code Generation Is
//Independent of Types

interface Square {
  width: number;
}

interface Rectangle extends Square {
  height: number;
}

type Shape = Square | Rectangle;

// the below commented out code wont work since we cant check types at runtime

// function calculateArea(shape: Shape) {
//   if (shape instanceof Rectangle) {
//     return shape.height * shape.width;
//   } else {
//     return shape.width * shape.width;
//   }
// }

/*The instanceof check happens at runtime, but Rectangle is a type and so
 it cannot affect the runtime behavior of the code. TypeScript types are
 “erasable”: part of compilation to JavaScript is simply removing all the
 interfaces, types, and type annotations from your code. This is easiest to
 see if you look at the JavaScript that this sample compiles down to:*/

function calculateArea(shape: Shape) {
  if ("height" in shape) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}

// another fix is to use classes
class Square {
  width: number;
  constructor(width: number) {
    this.width = width;
  }
}
class Rectangle extends Square {
  height: number;
  constructor(width: number, height: number) {
    super(width);
    this.height = height;
  }
}

function calculateArea2(shape: Shape) {
  if (shape instanceof Rectangle) {
    return shape.width * shape.height;
    // ^? (parameter) shape: Rectangle
  } else {
    return shape.width * shape.width;
    // ^? (parameter) shape: Square
  }
}

//Type Operations Cannot Affect Runtime Values

function asNumber(val: number | string) {
  return val as number;
}

// the generated javascript would look like
// function asNumber(val) {
//   return val;
// }

/*There is no conversion going on whatsoever. The as number is a type
operation, so it cannot affect the runtime behavior of your code. To
normalize the value you’ll need to check its runtime type and do the
conversion using JavaScript constructs:*/

function asNumberCorrect(val: number | string): number {
  return Number(val);
}

/*Things to Remember
Code generation is independent of the type system. This means that
TypeScript types cannot affect the runtime behavior of your code.
It is possible for a program with type errors to produce code
(“compile”).
TypeScript types are not available at runtime. To query a type at
runtime, you need some way to reconstruct it. Tagged unions and
property checking are common ways to do this.
Some constructs, such as class, introduce both a TypeScript type and
a value that is available at runtime.
Because they are erased as part of compilation, TypeScript types
cannot affect the runtime performance of your code*/
