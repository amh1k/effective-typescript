/*Know How to Tell Whether a Symbol
Is in the Type Space or Value Space
*/

interface Cylinder {
  radius: number;
  height: number;
}

const Cylinder = (radius: number, height: number) => ({ radius, height });

/*
interface Cylinder introduces a symbol in type space. const Cylinder
introduces a symbol with the same name in value space. They have nothing
to do with one another. Depending on the context, when you write
Cylinder, you’ll either be referring to the type or the value. Sometimes this
can lead to errors:
*/

/*
statements in TypeScript can alternate between type space and value space.
The symbols after a type declaration (:) or an assertion (as) are in type
space, while everything after an = in an assignment is in value space. For
example:
*/
interface Person {
  first: string;
  last: string;
}
const jane: Person = { first: "Jane", last: "jacob" };

function email(to: Person, subject: string, body: string): Response {}

type T1 = typeof jane;
// ^? type T1 = Person
type T2 = typeof email;
// ^? type T2 = (to: Person, subject: string, body: string) => Response
const v1 = typeof jane;
// Value is "object"
const v2 = typeof email;
// Value is "function"

/*
The [] property accessor also has an identical-looking equivalent in type
space. But be aware that while obj['field'] and obj.field are
equivalent in value space, they are not in type space. You must use the
former to get the type of another type’s property:

*/

const first: Person["first"] = jane["first"];
//Person['first'] is a type here since it appears in a type context (after a:).

function emailWrong({ to: Person, subject: string, body: string }) {}
// the above code gives error becuase n a destructuring context : means renaming the variabls

function emailCorrect({
  to,
  subject,
  body,
}: {
  to: Person;
  subject: string;
  body: string;
}) {}
