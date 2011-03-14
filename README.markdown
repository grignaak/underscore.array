# underscore.array #

An addition to the awesome [underscore] project, focusing on arrays.

Defined functions.

### groupby(array, [iterator], [context]) ###
Returns an array of arrays where consecutive elements are grouped by the _iterator_. If _iterator_ is not supplied, _identity_ is used instead. If iterator is a number, the array will be grouped into arrays of size _iterator_, with the last array potentially being less than size _iterator_. The _iterator_ function will be passed both the element, and its index in the array.

    _.groupby([1, 2, 3, 4, 5, 6, 7], 3); 
    // => [[1, 2, 3], [4, 5, 6], [7]]

    _.groupby([1, 2, 3, 4, 5, 6, 7], function (a, i) {
       return a < 4;
    });
    // => [[1, 2, 3], [4, 5, 6, 7]]

### partition(array, iterator, [context]) ###
Divides the array into two arrays determined by the results of _iterator_. If _iterator_ returns a truthy value, it goes in the first array, otherwise, it goes into the second array.

    _.partition([1, 5, 2, 6, 3, 7, 4], function (a) { return a < 4; });
    // => [[1, 2, 3], [5, 6, 7, 4]]

### applyTo(array, function, [context]) ###
Call function.apply(context, array). Useful for chained invocations (The [underscore] project must be included to use chained invocations).

    var results = []
    _.applyTo([1, 2, 3], results.push, results);
    // results == [1, 2, 3]

### mapApply(arrayOfArrays, iterator, [context]) ###
Applies each array to _iterator_, returning the array of results. Useful after a groupby call.

    _.mapApply([[1, 2], [3, 4]], function (a, b) { return a + b;})
    // => [3, 4]

### binarySearch(sortedArray, iterator, [context]) ###
Given a sorted array, will find the element matching _iterator_. The _iterator_ should return < 1 to go left, truthy to go right and falsy on match. If iterator is not a function, will use **binarySearch.naturalCompare(iterator)**

**binarySearch.naturalCompare(x)** will return an _iterator_ that uses a types natural ordering to adhere to the above contract;
      

[underscore]: http://documentcloud.github.com/underscore/
