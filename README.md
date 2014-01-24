Observer.js
==========
Native javascript observer

Usage
-----
```javascript
var observable = new Observable({ property1: "", property2: "" });

observable.addObserver( document.getElementById( "observing-element1" ), function( newValue ) {
  this.firstChild.nodeValue = newValue.property1;
});

observable.addObserver( document.getElementById( "observing-element2" ), function( newValue ) {
  this.firstChild.nodeValue = newValue.property2;
});

...

observable.property1 = "New content for the first observerving element";
observable.property2 = "New content for the second observerving element";
```