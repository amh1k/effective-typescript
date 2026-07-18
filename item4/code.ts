//Item 4: Get Comfortable with Structural Typing;

interface Vector2D {
  x: number;
  y: number;
}

function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x ** 2 + v.y ** 2);
}

// Now you introduce the notion of a named vector:
interface NamedVector {
  name: string;
  x: number;
  y: number;
}
/*The calculateLength function will work with NamedVectors because
they have x and y properties that are numbers. TypeScript is smart enough
to figure this out:*/

const v: NamedVector = { x: 3, y: 3, name: "pythagoras" };
calculateLength(v); // this function is ok

/*
What’s interesting is that you never declared the relationship between
Vector2D and NamedVector. And you didn’t have to write an alternative
implementation of calculateLength for NamedVectors. TypeScript’s type
system is modeling JavaScript’s runtime behavior (Item 1). It allowed
calculateLength to be called with a NamedVector because its structure
was compatible with Vector2D. This is where the term “structural typing”
comes from.But this can also lead to trouble. Say you add a 3D vector type:
*/

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function normalize(v: Vector3D) {
  const length = calculateLength(v);
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  };
}
/*The bug is that calculateLength operates on 2D vectors, but normalize
operates on 3D vectors. So the z component is ignored in the normalization. */

/*As you write functions, it’s easy to imagine that they will be called with
arguments having the properties you’ve declared and no others. This is
known as a “closed,” “sealed,” or “precise” type, and it cannot be expressed
in TypeScript’s type system. Like it or not, your types are “open.”*/

function calculateLengthL1(v: Vector2D) {
  let length = 0;

  for (const axis of Object.keys(v)) {
    const coord = v[axis]; // this is error
    length += Math.abs(coord);
  }
  return length;
}

/*The
logic in the previous paragraph assumes that Vector3D is sealed and does
not have other properties. But it could:*/

const vec3D = { x: 3, y: 4, z: 1, address: "123 Broadway" };
calculateLengthL1(vec3D);
// OK, returns Na

/*Since v could conceivably have any properties, the type of axis is string.
TypeScript has no reason to believe that v[axis] is a number because, as
you just saw, it might not be. (The vec3D variable here avoids excess
property checking, which is the subject of Item 11.)
Iterating over objects can be tricky to type correctly.*/

// Structural typing is beneficial when you’re writing tests. Say you have a
// function that runs a query on a database and processes the results:

interface Author {
  first: string;
  last: string;
}
function getAuthors(database: PostgresDB): Author[] {
  const authorRows = database.runQuery(`SELECT first, last FROM authors`);
  return authorRows.map((row) => ({ first: row[0], last: row[1] }));
}

interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthors(database: DB): Author[] {
  const authorRows = database.runQuery(`SELECT first, last FROM authors`);
  return authorRows.map((row) => ({ first: row[0], last: row[1] }));
}

/*You can still pass getAuthors a PostgresDB in production since it has a
runQuery method. Because of structural typing, the PostgresDB doesn’t
need to say that it implements DB. TypeScript will figure out that it does.*/

/*Things to Remember
Understand that JavaScript is duck typed and TypeScript uses
structural typing to model this: values assignable to your interfaces
might have properties beyond those explicitly listed in your type
declarations. Types are not “sealed.”
Be aware that classes also follow structural typing rules. You may not
have an instance of the class you expect!
Use structural typing to facilitate unit testing.*/
