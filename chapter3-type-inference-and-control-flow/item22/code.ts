const elem = document.getElementById("what-time-is-it");
// ^? const elem: HTMLElement | null
if (elem) {
  elem.innerHTML = "Party Time".blink();
  // ^? const elem: HTMLElement
} else {
  elem;
  // ^? const elem: null
  alert("No element #what-time-is-it");
}

const elem2 = document.getElementById("what-time-is-it");
// ^? const elem: HTMLElement | null
if (!elem2) throw new Error("Unable to find #what-time-is-it");
elem2.innerHTML = "Party Time".blink();
// ^? const elem: HTMLElement

function contains(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    return !!search.exec(text);
  }
  return text.includes(search);
}

/*
ypeScript is generally quite good at tracking types through conditionals.
Think twice before adding a type assertion—it might be on to something
that you’re not! For example, this is the wrong way to exclude null from a
union type:

*/
const elem3 = document.getElementById("what-time-is-it");
// ^? const elem: HTMLElement | null
if (typeof elem3 === "object") {
  elem3;
  // ^? const elem3: HTMLElement | null
}

/*
Another common way to help the type checker narrow your types is by
putting an explicit “tag” on them

*/

interface UploadEvent {
  type: "upload";
  filename: string;
  contents: string;
}
interface DownloadEvent {
  type: "download";
  filename: string;
}
type AppEvent = UploadEvent | DownloadEvent;

function handleAppEvent(e: AppEvent) {
  switch (e.type) {
    case "download":
      console.log("Download", e.filename);
      // ^? (parameter) e: DownloadEvent
      break;

    case "upload":
      console.log("Upload", e.filename, e.contents.length, "bytes");
      //^? (parameter) e: UploadEvent
      break;
  }
}
//This is known as a “tagged union” or “discriminated union,” and it is ubiquitous in TypeScript.

//If TypeScript isn’t able to figure out a type, you can introduce a special function to help it out

function isInputElement(el: Element): el is HTMLInputElement {
  return "value" in el;
}

function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    return el.value;
    // ^? (parameter) el: HTMLInputElement
  }
  return el.textContent;
  // ^? (parameter) el: HTMLElement
}

/*

This is known as a “user-defined type guard,” and the el is
HTMLInputElement clause is called a “type predicate.” As a return type,
this type tells the type checker that it can narrow the type of the parameter if
the function returns true.
Some functions are able to use type guards to narrow types in arrays or
objects, notably the filter method on Arrays:
*/

const formEls = document.querySelectorAll(".my-form *");
const formInputEls = [...formEls].filter(isInputElement);

/*
You can often rework your code slightly to help TypeScript follow along.
This code using a Map is correct but produces a type error:
*/
const nameToNickname = new Map<string, string>();
declare let yourName: string;
let nameToUse: string;
if (nameToNickname.has(yourName)) {
  nameToUse = nameToNickname.get(yourName);
  // ~~~~~~ Type 'string | undefined' is not assignable to type 'string'.
} else {
  nameToUse = yourName;
}

/*
The issue is that TypeScript doesn’t understand the relationship between the
has and get methods of a Map. It doesn’t know that checking has
eliminates the possibility of undefined in a subsequent lookup with get. A
slight change eliminates the type error (and preserves the behavior):

*/

const nameToUse2 = nameToNickname.get(yourName) ?? yourName; // this is correct

/*
It’s also helpful to understand when types don’t narrow. One notable
example is in callbacks:
*/
function logLaterIfNumber(obj: { value: string | number }) {
  if (typeof obj.value === "number") {
    setTimeout(() => console.log(obj.value.toFixed()));
    // Property 'toFixed' does not exist on type 'string | number'.
  }
}

/*
Things to Remember
Understand how TypeScript narrows types based on conditionals and
other types of control flow.
Use tagged/discriminated unions and user-defined type guards to help
the process of narrowing.
Think about whether code can be refactored to let TypeScript follow
along more easily.

*/
