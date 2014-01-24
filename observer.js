/**
* Observer.js v1.0.0
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

function Observable(value)
{
  var observableValue = new Object;

  if (value !== undefined)
    observableValue = value;

  function ObservableConstructor()
  {
    var observable = this;

    observable.get = function()
    {
      return observableValue;
    }

    observable.set = function(newValue)
    {
      observableValue = newValue;

      observable.notifyObservers(newValue);
    }

    observable.getProperty = function(propertyName)
    {
      return observableValue[propertyName];
    }

    observable.setProperty = function(propertyName, newValue)
    {
      if (observableValue[propertyName] !== undefined)
      {
        observableValue[propertyName] = newValue;

        observable.notifyObservers(observableValue);
      }
    }

    if (Object.defineProperty !== undefined && Object.prototype.toString.call(observableValue) === "[object Object]")
    {
      for (var i in observableValue)
      {
        (function(propertyName)
        {
          Object.defineProperty(observable, propertyName, 
          {
            get: function()
            { 
              return observableValue[propertyName]; 
            },
            set : function(newValue)
            { 
              observableValue[propertyName] = newValue;

              observable.notifyObservers(observableValue);
            },
            enumerable : true,
            configurable : true
          });
        })(i);
      }
    }
  }

  ObservableConstructor.prototype = new ObserverCollection;

  return new ObservableConstructor;
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
    "addObserver" : addObserver,
    "removeObserver" : removeObserver,
    "notifyObservers" : notifyObservers
  };
}

if ( window.Observable === undefined )
  window.Observable = Observable;

})( window );
