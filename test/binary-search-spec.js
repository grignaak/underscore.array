describe("binarySearch", function () {
  var sorted;

  function comparator(search) {
    var comparisons = [];
    function comp(other) {
      comparisons.push(other);
      if (search < other) {
        return -1;
      } else if (search > other) {
        return 1;
      } else {
        return 0;
      }
    }
    comp.comparisons = comparisons;

    return comp;
  };
  
  beforeEach(function () {
    sorted = [1, 2, 4, 16, 32, 64, 128];

  });

  function assertSearch(array, comparator, answer, comparisons) {
    if (arguments.length === 3) {
      comparisons = answer;
      answer = comparator;
      comparator = array;
      array = sorted;
    }
    
    expect(_.binarySearch(array, comparator)).toEqual(answer);
    expect(comparator.comparisons).toEqual(comparisons);
  }


  it('should accept null as a parameter', function () {
    expect(_.binarySearch(null, _.binarySearch.naturalCompare(1))).toBeNull();
  });

  it('should return null if the number is not found', function () {
    assertSearch(comparator(5), null, [16,2,4]);
  });

  it('should return the number--on the lower half', function () {
    assertSearch(comparator(4), 4, [16,2,4]);
  });

  it('should return the number--with given comparator', function () {
    expect(_.binarySearch(sorted, _.binarySearch.naturalCompare(4))).toBe(4);
  });

  it('should return the number--on the upper half', function () {
    assertSearch(comparator(64), 64, [16, 64]);
  });

  it('should run off the end', function () {
    assertSearch(comparator(256), null, [16, 64, 128]);
  });
});
