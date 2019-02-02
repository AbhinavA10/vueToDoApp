# Some notes on JS

## Iteration in Objects
```javascript
var personObject = {
    firstName : "John",
    lastName : "Smith"
}
personObject.age = 23;
personObject["salary"] = 14000;
for (var member in personObject)
{
    if (personObject.hasOwnProperty(member)) // each object also has hidden metadata
    {
        console.log("the member " + member + " of personObject is " + personObject[member])
    }
}
```

## Iteration in general
```javascript
for (let item of myArr){
    console.log(item)
}
```

## Functions
Functions can access local variables of a parent function -> aka **closure**

Functions always return something. if no ```return``` then they return ```undefined```.

Functions are also objects. the ```this``` always references the owner of the function it is in.      ```this``` inside a function, that is inside a function, or in a standalone function will refer to the global object.

The purpose of defining one function inside another is that the inner function can access the outer functions variables. Also, the inner function is only accessible from within the outer function. If the inner functions variables are declared using ```var```, then the outer function can also access the inner function's variables. This is due to hoisting of ```var```s

```var``` is function scoped. ```let``` is block scoped
### Named Functions / Function Decleration
This type of function can be used in a program before it is defined
```javascript
function greet(name)
{
    return "Hello " + name + "!";
}

console.log(greet("Eric"));      // prints out Hello Eric!
```
### Anon Functions / Function Expressions
These can't be used before they are defined

```javascript
var greet = function(name)
{
    return "Hello " + name + "!";
}

console.log(greet("Eric"));      // prints out Hello Eric!
```
### Arrow Functions
- these do not create their own ```this``` value. They are always anon functions.
```javascript
let nameOfFunction = (paramters) =>{
    statements;
}
```
Similarily, 
```javascript
var kitty = name => name; // ES6

// The same as ES5:
var kitty = function(name) {
  return name;
};


// #4 ES6: promises and callbacks.
asyncfn1().then(() => asyncfn2()).then(() => asyncfn3()).then(() => done());

// same as ES5:
asyncfn1().then(function() {
  asyncfn2();
}).then(function() {
  asyncfn3();
}).done(function() {
  done();
});
```
They pulll their ```this``` from the outer function. Ex.
```javascript
var bunny = {
  name: 'Usagi',
  tasks: ['transform', 'eat cake', 'blow kisses'],
  showTasks() {
    this.tasks.forEach((task) => {
      alert(this.name + " wants to " + task);
    });  
  }
};

bunny.showTasks();
```
### Closures
- used for object data privacy
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

To use a closure, simply define a function inside another function and expose it. To expose a function, return it or pass it to another function.

The inner function will have access to the variables in the outer function scope, even after the outer function has returned.

## Pop-ups
Confirm boxes will return "true" if ok is selected, and return "false" if cancel is selected. Alert boxes will not return anything. Prompt boxes will return whatever is in the text box. Note: prompt boxes also have an optional second parameter, which is the text that will already be in the text box.
```javascript
confirm("Hi!");
prompt("Bye!");
alert("Hello");
```

## Callbacks
Callbacks are functions that are passed as arguments to other functions. Callback functions are executed after another function has finished. Very important feature of asynchronous programming. Enables the function that receives the callback to call our code when it finishes a long task, while allowing us to continue the execution of the code.

In JavaScript, functions are objects. Because of this, functions can take functions as arguments, and can be returned by other functions. Functions that do this are called higher-order functions. Any function that is passed as an argument is called a callback function.

Callbacks can receive arguments and be executed more than once

Using a named function:
```javascript
var callback = function() {
    console.log("Done!");
}

setTimeout(callback, 5000);
console.log("This will be output before the above line");
```
Callbacks can also be defined anonymously:
```javascript
setTimeout(function() {
    console.log("Done!");
}, 5000);
console.log("This will be output before the above line");
```
Another example
```javascript
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}

doHomework('math', function() {
  alert('Finished my homework');
});
```

## OOP JS
JS uses functions as classes to create objects, using ```new```
```javascript
function Person(firstName, lastName) { // i.e. the constructor
    // construct the object using the arguments
    this.firstName = firstName;
    this.lastName = lastName;

    // a method which returns the full name
    this.fullName = function() {
        return this.firstName + " " + this.lastName;
    }
}

var myPerson = new Person("John", "Smith");
console.log(myPerson.fullName());            // outputs "John Smith"
```
The data structure for the Person object above would look like
```javascript
var myPerson = {
    firstName : "John",
    lastName : "Smith",
    fullName : function()
    {
        return this.firstName + " " + this.lastName;
    }
}
```
## Function context/scope/this reference
All standard functions in the browser run under the Window context. Functions defined under an object or a class (another function) will use the context of the object it was created in. However, we can also change the context of a function at runtime, either before or while executing the function.

### Binding a function to an object, to make it an object method
Use ```.bind()```

```javascript
var person = {
    name : "John"
};

function printName()
{
    console.log(this.name);
}
var boundPrintName = printName.bind(person);
boundPrintName();    // prints out "John"
```

We can also use ```call``` and ```apply()``` to call a function as if it was bound to the object, without actually binding it.

```call()``` has paramters 1. context 2-n. other arguments for the function

```apply()``` has paramters 1. context 2. array of other arguments for the function

Context = the thing the ```this``` operator inside the function refers to

## Inheritance

### Prototyping
JavaScript objects are dynamic "bags" of properties (referred to as own properties). JavaScript objects have a link to a prototype object. When trying to access a property of an object, the property will not only be sought on the object but on the prototype of the object, the prototype of the prototype, and so on until either a property with a matching name is found or the end of the prototype chain is reached.

Protoypes are useful to get rid of repeated code. Ex: say we had the following. Then every new instance of Pearson, will have it's own duplicate describe function.
```javascript
function Person(name, age)
{
    this.name = name;
    this.age = age;

    function describe()
    {
        return this.name + ", " + this.age + " years old.";
    }
}
```
By instead doing the following, new instances of Person will not contain a copy of the ```describe()``` function. When calling an object method, JavaScript will attempt to resolve the describe function first from the object itself, and then using its prototype attribute.

```javascript
function Person(name, age)
{
    this.name = name;
    this.age = age;
}

Person.prototype.describe = function()
{
    return this.name + ", " + this.age + " years old.";
}
```
### Actual Inheritence
One way of doing inheritence: 
```javascript
var Person = function() {};

Person.prototype.initialize = function(name, age)
{
    this.name = name;
    this.age = age;
}

Person.prototype.describe = function()
{
    return this.name + ", " + this.age + " years old.";
}

var Student = function() {};
Student.prototype = new Person();

Student.prototype.learn = function(subject)
{
    console.log(this.name + " just learned " + subject);
}

var me = new Student();

me.initialize("John", 25);
console.log(me.learn("Inheritance"));
```
