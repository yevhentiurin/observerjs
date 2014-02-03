/**
* Observer.js v1.1.0
* Native javascript observer
* https://github.com/yevhentiurin/observerjs
*
* Yevhen Tiurin <yevhentiurin@gmail.com>
* Licensed under the LGPL Version 3 license
* http://www.gnu.org/licenses/lgpl.txt
*
* Date: January 24, 2014
**/

(function() {

function Observable(inObj)
{
  var obj = new Object,
    ole = this;

  ole.getProperty = function(propertyName)
  {
    return obj[propertyName];
  }

  ole.setProperty = function(propertyName, inValue)
  {
    if (obj[propertyName] === undefined)
      obj[propertyName] = new ObservableValue;

    obj[propertyName].set(inValue);
  }

  function defineObservableProperty(propertyName) 
  {
    Object.defineProperty(ole, propertyName, 
    {
      get: function()
      { 
        return ole.getProperty(propertyName);
      },
      set : function(inValue)
      { 
        ole.setProperty(propertyName, inValue);
      },
      enumerable : true,
      configurable : true
    });
  };

  if (Object.prototype.toString.call(inObj) === "[object Object]")
    for (var i in inObj)
    {
      obj[i] = new ObservableValue(inObj[i]);

      if (Object.defineProperty !== undefined)
        defineObservableProperty(i);
    };
}

function ObservableValue(inValue)
{
  var value = inValue;
  
  function Instance()
  {
    this.get = function()
    {
      return value;
    }

    this.set = function(setValue)
    {
      value = setValue;

      this.notifyObservers(value);
    }

    this.toString = function()
    {
      return value.toString();
    }
  }

  Instance.prototype = new ObserverCollection;

  return new Instance;
}

function ObserverCollection()
{
  var aObservers = [];

  function addObserver(object, notifyHandler)
  {
    aObservers.push(
    {
      object: object,
      notifyHandler: notifyHandler
    });
  }

  function removeObserver(object)
  {
    var indexOfRemoving = aObservers.reduce(function(prevIndex, observer, index)
    {
      return (observer.object === object) ? index : prevIndex;
    }, -1);

    aObservers.splice(indexOfRemoving, (indexOfRemoving > -1 ? 1 : 0));
  }

  function notifyObservers(notifyValue)
  {
    aObservers.forEach(function(observer)
    {
      observer.notifyHandler.apply(observer.object, [notifyValue]);
    });
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
