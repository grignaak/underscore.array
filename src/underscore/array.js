_.mixin({
  groupby: function (array, iterator, context) {
    if (array.length === 0) {
      return [];
    }

    var previous = iterator.call(context, array[0]),
      currentPartition = [array[0]],
      results = [currentPartition],
      i,
      current;

    for (i = 1; i < array.length; i += 1) {
      current = iterator.call(context, array[i]);
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
    if (array === null) {
      return null;
    }

    var startIndex  = 0,
      stopIndex = array.length - 1,
      middle = Math.floor((stopIndex + startIndex) / 2),
      comparison;

    while (startIndex <= stopIndex) {
      comparison = iterator.call(context, array[middle]);
      if (comparison === 0) {
        return array[middle];
      } else if (comparison < 0) {
        stopIndex = middle - 1;
      } else {
        startIndex = middle + 1;
      }

      middle = Math.floor((stopIndex + startIndex) / 2);
    }
    return null;
  }
});
