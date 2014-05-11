/**
* Observer.js 1.2
* Native javascript observer
* https://github.com/ytiurin/observerjs
*
* Yevhen Tiurin <yevhentiurin@gmail.com>
* The MIT License (MIT)
* http://opensource.org/licenses/MIT
*
* May 11, 2014
**/

(function() {

function Observable(inObj)
{
  var obj = new Object, ole = this, definePropertyNames;

  ole.getProperty = function(propertyName)
  {
    return obj[propertyName];
  }

  ole.setProperty = function(propertyName, inValue)
  {
    if (obj[propertyName] === undefined)
      obj[propertyName] = new ObservableValue;

    obj[propertyName].set(inValue);

    return ole;
  }

  function defineObservableProperty(propertyName) 
  {
    function getter()
    { 
      return this.getProperty(propertyName);
    }

    function setter(inValue)
    { 
      this.setProperty(propertyName, inValue);
    }

    if (Object.defineProperty !== undefined)
      Object.defineProperty(ole, propertyName, { enumerable : true, 
        configurable : true, get: getter, set : setter });
  };

  if (Object.prototype.toString.call(inObj) === "[object Object]") {
    definePropertyNames = Object.getOwnPropertyNames(inObj);
    definePropertyNames.forEach(function(propertyName) {
      obj[propertyName] = new ObservableValue(inObj[propertyName]);
      defineObservableProperty(propertyName);
    });
  }
}

function ObservableValue(inValue)
{
  var value = inValue;
  
  function get()
  {
    return value;
  }

  function set(setValue)
  {
    value = setValue;

    this.notify();
  }

  function toString()
  {
    return value.toString();
  }

  function notify()
  {
    this.notifyObservers(value);
  }

  function ObservableValueInstance()
  {
    this.get = get;
    this.set = set;
    this.toString = toString;
    this.notify = notify;
  }

  ObservableValueInstance.prototype = new ObserverCollection;

  return new ObservableValueInstance;
}

function ObserverCollection()
{
  var aObservers = [];

  function addObserver(object, notifyHandler)
  {
    var objR = object.length ? object : [object];

    for (var i = objR.length-1; i >= 0; i--)
      aObservers.push({
        object: objR[i],
        notifyHandler: notifyHandler
      });

    if (this.notify)
      this.notify();

    return this;
  }

  function removeObserver(object)
  {
    for (var aoI = aObservers.length-1; aoI >= 0; aoI--) 
      if (aObservers[aoI].object === object) {
        aObservers.splice(aoI, 1);
        aoI--;
      }
    
    return this;
  }

  function notifyObservers(notifyValue)
  {
    aObservers.forEach(function(observer)
    {
      observer.notifyHandler.apply(observer.object, [notifyValue]);
    });
    
    return this;
  }

  return {
    addObserver: addObserver,
    removeObserver: removeObserver,
    notifyObservers: notifyObservers
  };
}

if ( window.Observable === undefined )
  window.Observable = Observable;

})( window );
