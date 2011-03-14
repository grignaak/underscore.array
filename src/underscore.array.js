/*jslint undef: true, browser: true, white: true, onevar: true, newcap: true, regexp: true, plusplus: true, bitwise: true, strict: true, maxerr: 50, indent: 2 */
/*global define */
(function () {
  "use strict";
  var makeCountIterator, _a;
  _a = {
    applyTo: function (array, fn, context) {
      return fn.apply(context, array);
    },

    mapApply: function (arrayOfArrays, fn, context) {
      var i, curArray, results = [];
      if (arrayOfArrays) {
        for (i = 0; curArray = arrayOfArrays[i]; i += 1) {
          results.push(fn.apply(context, curArray));
        }
      }
      return results;
    },

    groupby: function (array, iterator, context) {
      if (!array || !array.length) {
        return [];
      } else if (typeof iterator === 'number') {
        iterator = makeCountIterator(iterator);
      }

      var previous = iterator.call(context, array[0], 0),
        currentPartition = [array[0]],
        results = [currentPartition],
        i,
        current;

      for (i = 1; i < array.length; i += 1) {
        current = iterator.call(context, array[i], i);
        if (previous !== current) {
          previous = current;
          currentPartition = [];
          results.push(currentPartition);
        }
        currentPartition.push(array[i]);
      }
      return results;
    },

    partition: function (array, iterator, context) {
      if (array === null) {
        return [[], []];
      }

      var same = [],
        different = [],
        results = [same, different],
        i,
        value;

      for (i = 0; i < array.length; i += 1) {
        value = array[i];
        if (iterator.call(context, value)) {
          same.push(value);
        } else {
          different.push(value);
        }
      }

      return results;
    },
    
    binarySearch: function (array, iterator, context) {
      if (!array) {
        return null;
      }

      var startIndex  = 0,
        stopIndex = array.length - 1,
        middle = Math.floor((stopIndex - startIndex) / 2) + startIndex,
        comparison;

      while (startIndex <= stopIndex) {
        comparison = iterator.call(context, array[middle]);
        if (!comparison) {
          return array[middle];
        } else if (comparison < 0) {
          stopIndex = middle - 1;
        } else {
          startIndex = middle + 1;
        }

        middle = Math.floor((stopIndex - startIndex) / 2) + startIndex;
      }
      return null;
    }
  };

  _a.binarySearch.naturalCompare = function (search) {
    return function (other) {
      return (search < other) ? -1 : (search > other);
    };
  };

  makeCountIterator = function (count) {
    return function (a, i) { return Math.floor(i / count); };
  };

  if (typeof this._ !== 'undefined') {
    this._.mixin(_a);
  } else {
    this._ = _a;
  }
}());
