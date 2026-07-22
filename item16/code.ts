/*
Prefer More Precise Alternatives to
Index Signatures

*/

/*
Objects in JavaScript map string (or symbol) keys to values of any type.
TypeScript lets you represent flexible mappings like this by specifying an
index signature on the type:
*/

type Rocket = { [property: string]: string | number };
const rocket: Rocket = {
  name: "Falcon 9",
  variant: "v1.0",
  thrust: "4,940 kN",
};

/*
What should you use index signatures for? Historically, they were the best
way to model truly dynamic data. This might come from a CSV file, for
instance, where you have a header row and want to represent data rows as
objects mapping column names to values:


*/

function parseCSV(input: string): { [columnName: string]: string }[] {
  const lines = input.split("\n");
  const [headerLine, ...rows] = lines;
  const headers = headerLine.split(",");
  return rows.map((rowStr) => {
    const row: { [columnName: string]: string } = {};
    rowStr.split(",").forEach((cell, i) => {
      row[headers[i]] = cell;
    });
    return row;
  });
}

/*
There’s no way to know in advance what the column names are in such a
general setting, so there’s no way to get a more precise type. If the user of
parseCSV knows more about what the columns are in a particular context,
they could use an assertion to get more specific:
*/

interface ProductRow {
  productId: string;
  name: string;
  price: string;
}
declare let csvData: string;
const products = parseCSV(csvData) as unknown[] as ProductRow[];

/*
But a better way to model dynamic data is by using a Map type, also known
as an associative array. Here’s how you might implement parseCSV using a
Map:
*/

function parseCSVMap(input: string): Map<string, string>[] {
  const lines = input.split("\n");
  const [headerLine, ...rows] = lines;
  const headers = headerLine.split(",");
  return rows.map((rowStr) => {
    const row = new Map<string, string>();
    rowStr.split(",").forEach((cell, i) => {
      row.set(headers[i], cell);
    });
    return row;
  });
}

const rockets = parseCSVMap(csvData);
const superHeavy = rockets[2];
const thrust_kN = superHeavy.get("thrust_kN");

/*
If you want to get an object type out of a Map, you’ll need to write some
parsing code:
*/

function parseRocket(map: Map<string, string>): Rocket {
  const name = map.get("name");
  const variant = map.get("variant");
  const thrust_kN = Number(map.get("thrust_kN"));
  if (!name || !variant || isNaN(thrust_kN)) {
    throw new Error(`Invalid rocket: ${map}`);
  }
  return { name, variant, thrust_kN };
}
const rockets2 = parseCSVMap(csvData).map(parseRocket);

/*
While this may feel tedious, it does ensure that your data actually has the
shape you expect. This will flag errors when you load your data, rather than
at some later point when you try to use it. This pattern of doing data
validation on a broad type (Map<string, string>) to get a more specific
one (Rocket) is common in TypeScript. Item 74 will explore more
systematic ways of doing runtime type validation

*/

/*
If your type has a limited set of possible fields, don’t model this with an
index signature. For instance, if you know your data will have keys like A,
B, C, D, but you don’t know how many of them there will be, you could
model the type either with optional fields or a union:


*/

interface Row1 {
  [column: string]: number;
}
// Too broad
interface Row2 {
  a: number;
  b?: number;
  c?: number;
  d?: number;
}
// Better
type Row3 =
  | { a: number }
  | { a: number; b: number }
  | { a: number; b: number; c: number }
  | { a: number; b: number; c: number; d: number };

/*
if the problem with using an index signature is that string is too broad,
then you can use a Record. This is a generic type that gives you more
flexibility in the key type. In particular, you can pass in subsets of string:

*/

type Vec3D = Record<"x" | "y" | "z", number>;
// ^? type Vec3D = {
// x: number;
// y: number;
// z: number;
// }

declare function renderAButton(props: ButtonProps): void;
interface ButtonProps {
  title: string;
  onClick: () => void;
}
renderAButton({
  title: "Roll the dice",
  onClick: () => alert(1 + Math.floor(6 * Math.random())),
  theme: "Solarized",
  // ~~~~ Object literal may only specify known properties…
});
//Adding an index signature makes this error go away:
interface ButtonProps {
  title: string;
  onClick: () => void;
  [otherProps: string]: unknown;
}
renderAButton({
  title: "Roll the dice",
  onClick: () => alert(1 + Math.floor(20 * Math.random())),
  theme: "Solarized",
  // ok
});

/*
Things to Remember
Understand the drawbacks of index signatures: much like any, they
erode type safety and reduce the value of language services.
Prefer more precise types to index signatures when possible:
interfaces, Map, Records, mapped types, or index signatures with a
constrained key space.
*/
