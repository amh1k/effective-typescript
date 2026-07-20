/*

Item 10: Avoid Object Wrapper Types (String,
Number, Boolean, Symbol, BigIn
 */

/*
In addition to objects, JavaScript has seven types of primitive values:
strings, numbers, booleans, null, undefined, symbol, and bigint. The first
five have been around since the beginning. The symbol primitive was added
in ES2015, and bigint joined the family with ES2020.
Primitives are distinguished from objects by being immutable and not
having methods. You might object that strings do have methods:
> 'primitive'.charAt(3)
'm'
But things are not quite as they seem. There’s actually something surprising
and subtle going on here. While a string primitive does not have methods,
JavaScript also defines a String object type that does. JavaScript freely
converts between these types. When you access a method like charAt on a
string primitive, JavaScript wraps it in a String object, calls the method,
and then throws the object away.
*/

console.log("hello" == new String("hello")); // false since comparing prmitive to object

console.log(new String("hello") === new String("hello")); //since objects compared by reference not value


function isGreeting(phrase: String) {
return ['hello', 'good day'].includes(phrase);
//
~~~~~~
// Argument of type 'String' is not assignable to parameter of type
'string'.
// 'string' is a primitive, but 'String' is a wrapper object.
// Prefer using 'string' when possible.
}


const s: String = "primitive";
const n: Number = 12;
const b: Boolean = true;


/*
Avoid TypeScript object wrapper types. Use the primitive types
instead: string instead of String, number instead of Number,
boolean instead of Boolean, symbol instead of Symbol, and bigint
instead of BigInt.
Understand how object wrapper types are used to provide methods on
primitive values. Avoid instantiating them or using them directly, with
the exception of Symbol and BigInt.
*/