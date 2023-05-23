#import "./theme.typ": *

// --- Colors ---
#let jsYellow = rgb("f7df1e")
#let jsBlack = rgb("#222")
#let jsWhite = rgb("#ffffff")
#let subdued = jsWhite.darken(40%)


#set page(
    fill: jsBlack,
)

#set text(
    font: "Montserrat",
    fill: jsWhite,
)

#show: slides.with(
    author: "Nils Twelker",
    title: "Introcution to JavaScript",
    short-title: "JavaScript Lesson 5",
    date: "March 2023",
    color: jsYellow,
)

#show raw: it => [
    #box(it, fill: jsBlack.lighten(10%), outset: (x: 4pt, y:6pt), radius: 5pt)
]

#let colored = (it, color) => [
    #box(text(raw(it), fill: color), fill: jsBlack.lighten(10%), outset: (x: 4pt, y:6pt), radius: 5pt)
]

#let hint = (it, full: false) => [
    #if full [
        #block([#text("tipp", fill: jsBlack)], fill: jsYellow.lighten(10%), outset: (x: 8pt, y:8pt), radius: (top:5pt))
        #v(-14pt)
        #block(it, fill: jsBlack.lighten(10%), outset: (x: 8pt, y:8pt), radius: (bottom: 5pt, top-right: 5pt))
    ] else [
        #text([Tipp: ], fill: jsYellow.lighten(10%))
        #it
    ]
]

== What learned we last Week?

- Objects #raw("let person = {name: \"Dan\", age: 43}", lang: "js")
- Accessing Properties #raw("person.name // \"Dan\"", lang: "js")
- Adding Properties #raw("person.height = 1.80", lang: "js")
- Removing Properties #raw("delete person.age", lang: "js")
- "this", "in" and "for in" keywords
- Object references and Garbage Collection
- Methods on Primitives #raw("\"Hello World\".length // 11", lang: "js")
- Arrays Methods #raw("[2, 3, 1, 4].sort() // [1, 2, 3, 4]", lang: "js")

== Goals of this week

- Basic introduction to HTML
- Basic introduction to CSS
- Developer Tools
- JavaScript in the Browser
- DOM (Document Object Model)
- Searching & Manipulating the DOM
- Adding / Removing Elements
- Events

== HTML (Hyper Text Markup Language)

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My Website</title>
    </head>
    <body>
        <h1>My Website</h1>
    </body>
</html>
```

== HTML Elements

#align(center, [
```html
<h1 id="title" class="heading large">My Website</h1>
```
])

#let violet = rgb("#8a3fb2")
#let darkGreen = rgb("#248f05")
#let blue = rgb("#4a69c7")

#colored("h1", blue) - Type of the element (tag) \
#colored("id", violet) - Only one id per element \
#colored("class", violet) - Multiple `classes per element` and `elements per class` \
#colored("My Website", white) - Content of the element


== CSS (Cascading Style Sheets)

```css
body { // tag selector
    background-color: black;
}
#title { // id selector
    color: red;
}
.large { // class selector
    font-size: 20px;
}
```

== CSS (Cascading Style Sheets)

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My Website</title>
        <style> h1 { color: red; }</style>
    </head>
    <body>
        <h1>My Website</h1>
    </body>
</html>
```

== Developer Tools

- Press F12 or Ctrl+Shift+I
- `Elements / Inspector` Tab
    - See the current HTML & CSS
    - Change the HTML & CSS
- `Console` Tab
    - Execute JavaScript
    - See Errors

== JavaScript in the Browser

```html
<!DOCTYPE html>
<html>
    <head><title>My Website</title></head>
    <body>
        <h1 id="title">My Website</h1>
        <script>
            document.getElementById("title").style.color = "red";
        </script>
    </body>
</html>
```
== DOM (Document Object Model)

#columns(2, [
    ```html
<!DOCTYPE html>
<html>
    <head>
        <title>My Website</title>
    </head>
    <body>
        <h1>My Website</h1>
    </body>
</html>
```
#colbreak()

```js
document.body // <body>
document.body.children// [<h1>]
```
])

== Searching the DOM

#text([
```html
<h1 id="title" class="heading large">My Website</h1>
<button id="button">Click me!</button>
<span>First Text</span>
<span>Second Text</span>
```

```js
document.getElementById("title") // <h1>
document.getElementsByClassName("heading") // [<h1>]
document.getElementsByTagName("h1") // [<h1>]

document.querySelector("#button") // <button>
document.querySelector(".large") // <h1>
document.querySelectorAll("span") // [<span>, <span>]
```
], size: 0.9em)

== Manipulating the DOM

```html
<h1 id="title">My Website</h1>
```

```js
let myTitle = document.getElementById("title") // <h1>

console.log(myTitle.innerHTML) // "My Website"

myTitle.innerHTML = "My new Website"
myTitle.style.color = "red"
myTitle.style.fontSize = "20px"
```

== Adding Elements

```html
<h1 id="title">My Website</h1>
```

```js
let myTitle = document.getElementById("title") // <h1>

let myText = document.createElement("span") // <span>
myText.innerHTML = "This is some text"

document.body.appendChild(myText)
```

```html
<h1 id="title">My Website</h1>
<span>This is some text</span>
```

== Removing Elements

```html
<h1 id="title">My Website</h1>
<span>This is some text</span>
```

```js
let myText = document.querySelector("span") // <span>

document.body.removeChild(myText)
```

```html
<h1 id="title">My Website</h1>
```

== Events

```html
<h1 id="title">My Website</h1>
<button id="button">Click me!</button>
```

```js
let myButton = document.getElementById("button") // <button>

myButton.onclick = function () {
    console.log("Button clicked!")
}
```

== Events

```html
<h1 id="title">My Website</h1>
<button id="button">Click me!</button>
```

```js
let myButton = document.getElementById("button") // <button>

myButton.addEventListener("click", function () {
    console.log("Button clicked!")
})
myButton.addEventListener("click", function () {
    console.log("Button clicked again!")
})
```

== Tasks and Points
Goal is to get 100 Points.
#columns(2, [
- `array-methods` (25 Points)
- `basic-objects` (25 Points)
- `in-keyword` (25 Points)
- `object-references` (25 Points)
- `graph-calculator` (50 Points)
- `login-system` (50 Points)
])