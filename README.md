<div align=center>

# React With API

#### React with APIs Exercise for [Epicodus](https://www.epicodus.com/), 05.10.2020

#### By **Adela Darmansyah**

[React Component Lifecycle Methods](#React-Component-Lifecycle-Methods) | [Mounting](#Mounting) | [Updating](#Updating) | [Unmounting](#Unmounting) | [AJAX](#AJAX) | [Redux-Thunk](#Redux-Thunk)

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/ayohana/react-with-api/master?color=%23DE98B2&style=for-the-badge) ![GitHub language count](https://img.shields.io/github/languages/count/ayohana/react-with-api?color=%23DE98B2&style=for-the-badge) ![GitHub top language](https://img.shields.io/github/languages/top/ayohana/react-with-api?color=%23DE98B2&style=for-the-badge)

</div>

## React Component Lifecycle Methods

**Each component in React has a lifecycle** which you can monitor and manipulate during its three main phases: Mounting, Updating and Unmounting.

Helpful resources:
- [React Doc: React Lifecycle Methods Diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [W3Schools: React Lifecycle](https://www.w3schools.com/react/react_lifecycle.asp)

## The Three Stages of React's Component Lifecycle

### Mounting

**Mounting** means putting elements into the DOM. React has 4 built-in methods that gets called, in this order, when mounting a component:

1. `constructor()` - CALLED BEFORE ANYTHING ELSE
2. `getDerivedStateFromProps()` - CALLED RIGHT BEFORE RENDER()
3. `render()` - REQUIRED IN A CLASS COMPONENT
4. `componentDidMount()` - CALLED AFTER RENDER()

#### `constructor()`

The `constructor` method is called, by React, every time you make a component:

> `````
> class Header extends React.Component {
>   constructor(props) {
>     super(props);
>     this.state = {favoritecolor: "red"};
>   }
>   render() {
>     return (
>       <h1>My Favorite Color is {this.state.favoritecolor}</h1>
>     );
>   }
> }
>
> ReactDOM.render(<Header />, document.getElementById('root'));
> `````

The `constructor()` method is called **before anything else**, when the component is initiated, and it is the natural place to set up the `initial state` and other initial values.

The `constructor()` method is called with the `props`, as arguments, and you should always start by calling the `super(props)` **before anything else**, this will initiate the parent's constructor method and allows the component to inherit methods from its parent (`React.Component`).

#### `getDerivedStateFromProps()`

The example below starts with the favorite color being "red", but the `getDerivedStateFromProps()` method updates the favorite color based on the favcol attribute.

The `getDerivedStateFromProps` method is called **right before the `render` method**:

> `````
> class Header extends React.Component {
>   constructor(props) {
>     super(props);
>     this.state = {favoritecolor: "red"};
>   }
>   static getDerivedStateFromProps(props, state) {
>     return {favoritecolor: props.favcol };
>   }
>   render() {
>     return (
>       <h1>My Favorite Color is {this.state.favoritecolor}</h1>
>     );
>   }
> }
> 
> ReactDOM.render(<Header favcol="yellow"/>, document.getElementById('root'));
> `````

The `getDerivedStateFromProps()` method is called **right before rendering** the element(s) in the DOM.

This is the natural place to set the `state` object based on the initial `props`.

It takes `state` as an _argument_, and returns _an object with changes to the `state`_.

#### `render`

The `render()` method is **required**, and is _the method that actual outputs HTML to the DOM_.

#### `componentDidMount()`

The `componentDidMount()` method is called **after** the component is rendered.

This is where you run statements that _requires that the component is already placed in the DOM_.

At first my favorite color is red, but give me a second, and it is yellow instead:

> `````
> class Header extends React.Component {
>   constructor(props) {
>     super(props);
>     this.state = {favoritecolor: "red"};
>   }
>   componentDidMount() {
>     setTimeout(() => {
>       this.setState({favoritecolor: "yellow"})
>     }, 1000)
>   }
>   render() {
>     return (
>       <h1>My Favorite Color is {this.state.favoritecolor}</h1>
>     );
>   }
> }
>
> ReactDOM.render(<Header />, document.getElementById('root'));
> `````

_Note: Per React Doc, this method is a good place to set up any `subscriptions`. If you do that, don’t forget to `unsubscribe` in `componentWillUnmount()`._

### Updating

The next phase in the lifecycle is when a component is _updated_.

**A component is _updated_ whenever there is a change in the component's `state` or `props`.**

React has 5 built-in methods that gets called, in this order, when a component is updated:

1. `getDerivedStateFromProps()` - SETS STATE BASED ON INITIAL PROPS
2. `shouldComponentUpdate()` - RETURNS A BOOLEAN TO SPECIFY IF REACT SHOULD CONTINUE WITH RENDERING
3. `render()` - REQUIRED TO RERENDER NEW COMPONENT
4. `getSnapshotBeforeUpdate()` - CHECKS A COMPONENT'S PROPS AND STATE BEFORE UPDATE
5. `componentDidUpdate()` - CALLED AFTER UPDATE

The `render()` method is **required** and will always be called,**the others are optional and will be called if you define them**.

Per React doc, **updating** is a stage that can happen multiple times during a component's lifecycle.

#### `getDerivedStateFromProps()`

Also at _updates_, the `getDerivedStateFromProps` method is called. This is **the first method that is called when a component gets updated.**

**This is still the natural place to set the `state` object based on the initial `props`.**

The example below has a button that changes the favorite color to blue, but since the `getDerivedStateFromProps()` method is called, which updates the state with the color from the favcol attribute, the favorite color is still rendered as yellow. If the component gets updated, the `getDerivedStateFromProps()` method is called:

> `````
> class Header extends React.Component {
>   constructor(props) {
>     super(props);
>     this.state = {favoritecolor: "red"};
>   }
>   static getDerivedStateFromProps(props, state) {
>     return {favoritecolor: props.favcol };
>   }
>   changeColor = () => {
>     this.setState({favoritecolor: "blue"});
>   }
>   render() {
>     return (
>       <div>
>       <h1>My Favorite Color is {this.state.favoritecolor}</h1>
>       <button type="button" onClick={this.changeColor}>Change color</button>
>       </div>
>     );
>   }
> }
> 
> ReactDOM.render(<Header favcol="yellow"/>, document.getElementById('root'));
> `````

#### `shouldComponentUpdate()`

In the `shouldComponentUpdate()` method you can **return a `Boolean` value that specifies whether React should continue with the rendering or not**.

**The default value is true.**

The example below shows what happens when the `shouldComponentUpdate()` method returns `false`. Stop the component from rendering at any update:

> `````
> class Header extends React.Component {
>   constructor(props) {
>     super(props);
>     this.state = {favoritecolor: "red"};
>   }
>   shouldComponentUpdate() {
>     return false;
>   }
>   changeColor = () => {
>     this.setState({favoritecolor: "blue"});
>   }
>   render() {
>     return (
>       <div>
>       <h1>My Favorite Color is {this.state.favoritecolor}</h1>
>       <button type="button" onClick={this.changeColor}>Change color</button>
>       </div>
>     );
>   }
> }
> 
> ReactDOM.render(<Header />, document.getElementById('root'));
> `````

Same example as above, but this time the `shouldComponentUpdate()` method returns `true` instead:

> `````
> class Header extends React.Component {
>   constructor(props) {
>     super(props);
>     this.state = {favoritecolor: "red"};
>   }
>   shouldComponentUpdate() {
>     return true;
>   }
>   changeColor = () => {
>     this.setState({favoritecolor: "blue"});
>   }
>   render() {
>     return (
>       <div>
>       <h1>My Favorite Color is {this.state.favoritecolor}</h1>
>       <button type="button" onClick={this.changeColor}>Change color</button>
>       </div>
>     );
>   }
> }
> 
> ReactDOM.render(<Header />, document.getElementById('root'));
> `````

#### `render`

The `render()` method is again **required** and of course called when a component gets updated, it has to re-render the HTML to the DOM, with the new changes.

#### `getSnapshotBeforeUpdate()`

In the `getSnapshotBeforeUpdate()` method **you have access to the `props` and `state` _before_ the update**, meaning that even after the update, you can check what the values were before the update.

**If the `getSnapshotBeforeUpdate()` method is present, you should also include the `componentDidUpdate()` method, otherwise you will get an error.**

Use the `getSnapshotBeforeUpdate()` method to find out what the state object looked like _before_ the update:

> `````
> class Header extends React.Component {
>   constructor(props) {
>     super(props);
>     this.state = {favoritecolor: "red"};
>   }
>   componentDidMount() {
>     setTimeout(() => {
>       this.setState({favoritecolor: "yellow"})
>     }, 1000)
>   }
>   getSnapshotBeforeUpdate(prevProps, prevState) {
>     document.getElementById("div1").innerHTML =
>     "Before the update, the favorite was " + prevState.favoritecolor;
>   }
>   componentDidUpdate() {
>     document.getElementById("div2").innerHTML =
>     "The updated favorite is " + this.state.favoritecolor;
>   }
>   render() {
>     return (
>       <div>
>         <h1>My Favorite Color is {this.state.favoritecolor}</h1>
>         <div id="div1"></div>
>         <div id="div2"></div>
>       </div>
>     );
>   }
> }
> 
> ReactDOM.render(<Header />, document.getElementById('root'));
> `````

The example above might seem complicated, but all it does is this:
    * When the component is mounting it is rendered with the favorite color "red".
    * **When the component has been mounted**, a timer changes the state, and after one second, the favorite color becomes "yellow".
    * **This action triggers the update phase**, and since this component has a `getSnapshotBeforeUpdate()` method, this method is executed, and writes a message to the empty `div1` element.
    * Then the `componentDidUpdate()` method is executed and writes a message in the empty DIV2 element.

#### `componentDidUpdate()`

The `componentDidUpdate` method is called **after** the component is updated in the DOM.

See example above of `getSnapshotBeforeUpdate()`.

### Unmounting

The next phase in the lifecycle is _when a component is removed from the DOM_, or **unmounting** as React likes to call it.

React has only 1 built-in method that gets called when a component is unmounted:
    1. `componentWillUnmount()`

#### `componentWillUnmount()`

The `componentWillUnmount` method is called when the component is about to be removed from the DOM.

Click the button to delete the header:

> `````
> class Container extends React.Component {
>   constructor(props) {
>     super(props);
>     this.state = {show: true};
>   }
>   delHeader = () => {
>     this.setState({show: false});
>   }
>   render() {
>     let myheader;
>     if (this.state.show) {
>       myheader = <Child />;
>     };
>     return (
>       <div>
>       {myheader}
>       <button type="button" onClick={this.delHeader}>Delete Header</button>
>       </div>
>     );
>   }
> }
> 
> class Child extends React.Component {
>   componentWillUnmount() {
>     alert("The component named Header is about to be unmounted.");
>   }
>   render() {
>     return (
>       <h1>Hello World!</h1>
>     );
>   }
> }
> 
> ReactDOM.render(<Container />, document.getElementById('root'));
> `````

## AJAX

### What is AJAX?

**AJAX** = **A**synchronous **J**avaScript **A**nd **X**ML.

AJAX is **not** a programming language.

AJAX just uses a combination of:
    * A browser built-in XMLHttpRequest object (to request data from a web server)
    * JavaScript and HTML DOM (to display or use the data)

AJAX is a misleading name. AJAX applications might use XML to transport data, but it is equally common to transport data as plain text or JSON text.

AJAX allows web pages to be updated asynchronously by exchanging data with a web server behind the scenes. This means that it is possible to update parts of a web page, without reloading the whole page.

### How AJAX Works

![Diagram of how AJAX works](./public/img_ajax.gif)

## Redux-Thunk

**A middleware library for Redux.**

**Redux actions are synchronous while API calls are asynchronous.** To manage this issue, we need to use a Redux middleware. For this project, we will use Redux-Thunk.

### What is Middleware?

There's no exact definition in computer programming and it can mean many different things. It's often referred to as the "glue" that allows different applications or components to communicate.

**Handling async code is a common use case for Redux middleware**. However, we also need to use middleware any time we might have other side effects. For example, if we wanted to log certain actions, we'd use middleware for that, too, because the process of logging data (for example, to the console or to a server file) is a side effect.