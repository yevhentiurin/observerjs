Observer.js
==========
Native javascript observer

Usage
-----
```javascript
// initialize observable model
var oModel = new Observable({ property1: "", property2: "" });

// add observers for properties
oModel.property1.addObserver( document.getElementById( "observing-element1" ), function( newValue ) {
  this.firstChild.nodeValue = newValue;
});

oModel.property2.addObserver( document.getElementById( "observing-element2" ), function( newValue ) {
  this.firstChild.nodeValue = newValue;
});

// that's all

...

// now you can just change properties values
oModel.property1 = "New content for the first observerving element";
oModel.property2 = "New content for the second observerving element";

// document observing elements would be updated in the background
```