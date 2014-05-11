Observer.js
==========
Native javascript observer

Usage
-----
```javascript
// initialize basic model
var model = {
  firstProperty: "firstProperty",
  secondProperty: "secondProperty"
},

firstObservingElement = document.getElementById("first-observing-element"),
secondObservingElement = document.getElementById("second-observing-element"),
updateTextNode = function( newValue ) {
  this.firstChild.nodeValue = newValue;
};

// initialize observable model
var oModel = new Observable(model);

// add observers for properties
oModel.firstProperty.addObserver(firstObservingElement, updateTextNode);
oModel.secondProperty.addObserver(secondObservingElement, updateTextNode);

...

// now you can change property values
oModel.firstProperty = "New content for the first observerving element";
oModel.secondProperty = "New content for the second observerving element";

```