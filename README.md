Observer.js
==========
Native javascript observer

Usage
-----
```javascript
// initialize observable model
var oModel = new Observable({ firstProperty: "", secondProperty: "" });

// add observers for properties
oModel.firstProperty.addObserver( document.getElementById( "first-observing-element" ), 
  function( newValue ) {
    this.firstChild.nodeValue = newValue;
  });

oModel.secondProperty.addObserver( document.getElementById( "second-observing-element" ), 
  function( newValue ) {
    this.firstChild.nodeValue = newValue;
  });

// that's all

...

// now you can just change properties values
oModel.firstProperty = "New content for the first observerving element";
oModel.secondProperty = "New content for the second observerving element";

// document observing elements would be updated in the background
```