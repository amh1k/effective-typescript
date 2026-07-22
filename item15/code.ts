/*
 Use Type Operations and Generic
Types to Avoid Repeating Yourself
*/

/*
The simplest way to reduce repetition is by naming your types. Rather than
writing a distance function this way:
*/

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

//create a name for the type and use it:
interface Point2D {
  x: number;
  y: number;
}
function distance2(a: Point2D, b: Point2D) {
  /* ... */
}

interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}
interface TopNavState {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  // omits pageContents
}

//You can remove duplication in the types of the properties by indexing into state

interface TopNavStateRefactored {
  userId: State["userId"];
  pageTitle: State["pageTitle"];
  recentFiles: State["recentFiles"];
}

type TopNavStateMappedType = {
  [K in keyof TopNavState]: State[K];
};
type TopNavStatePick = Pick<State, "userId" | "pageTitle" | "recentFiles">;

interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}
interface OptionsUpdate {
  width?: number;
  height?: number;
  color?: string;
  label?: string;
}
class UIWidget {
  constructor(init: Options) {
    /* ... */
  }
  update(options: OptionsUpdate) {
    /* ... */
  }
}

type OptionsUpdateWithMapped = { [k in keyof Options]?: Options[k] };

//This pattern is also very common and is included in the standardlibrary as Partial:

class UIWidget2 {
  constructor(init: Options) {
    /* ... */
  }
  update(options: Partial<Options>) {
    /* ... */
  }
}
function getUserInfo(userId: string) {
  // ...
  return {
    userId,
    name,
    age,
    height,
    weight,
    favoriteColor,
  };
}
// Return type inferred as { userId: string; name: string; age: number, ... }

type UserInfo = ReturnType<typeof getUserInfo>;

/*
Things to Remember
The DRY (don’t repeat yourself) principle applies to types as much as
it applies to logic.
Name types rather than repeating them. Use extends to avoid
repeating fields in interfaces.
Build an understanding of the tools provided by TypeScript to map
between types. These include keyof, typeof, indexing, and mapped
types.
Generic types are the equivalent of functions for types. Use them to
map between types instead of repeating type-level operations.
Familiarize yourself with generic types defined in the standard library,
such as Pick, Partial, and ReturnType.
Avoid over-application of DRY: make sure the properties and types
you’re sharing are really the same thing.


*/
