/*
Item 11: Distinguish Excess Property
Checking from Type Checking

*/

/*When you assign an object literal to a variable with a declared type,
TypeScript makes sure it has the properties of that type and no others:

*/

interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}

const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present",
  // ~~~~~~~ Object literal may only specify known properties,
  //
  //and 'elephant' does not exist in type 'Room'
};

/*
. That constant is
assignable to the Room type, which you can see by introducing an
intermediate variable:

*/

const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present",
};
const r2: Room = obj;
// OK

/*
The type of obj is inferred as { numDoors: number; ceilingHeightFt:
number; elephant: string }. This type includes a subset of the values
in the Room type because it only permits string elephants, whereas Room
would permit any type of elephant. Hence it is assignable to Room, and the
code passes the type checker.

*/

interface Options {
  title: string;
  darkMode?: boolean;
}
function createWindow(options: Options) {
  if (options.darkMode) {
    //setDarkMode();
  }
  // ...
}
createWindow({
  title: "Spider Solitaire",
  darkmode: true,
});
/*~~~~~~~ Object literal may only specify known properties,
but 'darkmode' does not exist in type 'Options'.
//
Did you mean to write 'darkMode'?
});*/

/*


If you don’t want this sort of check, you can tell TypeScript to expect
additional properties using an index signature:
interface Options {
darkMode?: boolean;
[otherOptions: string]: unknown;
}
const o: Options = { darkmode: true }; Ok */


