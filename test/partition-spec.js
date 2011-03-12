describe("partition", function () {
  var array;
  beforeEach(function () {
    array = 'red yellow green red blue blue blue'.split(' ');
  });

  it('should return empty arrays on null', function () {
    expect(_.partition(null, function (a) { return true; }))
      .toEqual([[],[]]);
  });

  it('should partition all to left on true', function () {
    expect(_.partition(array, function (a) { return true; }))
      .toEqual([array,[]]);
  });

  it('should partition all to right on false', function () {
    expect(_.partition(array, function (a) { return false; }))
      .toEqual([[], array]);
  });

  it('should partition according to the iterator', function () {
    expect(_.partition(array, function (a) { return a.length <= 4; }))
      .toEqual(['red red blue blue blue'.split(' '), ['yellow', 'green']]);
  });

  it('should partition stabley', function () {
    expect(_.partition([1, 5, 2, 6, 3, 7, 4], function (a) { return a < 4; }))
      .toEqual([[1, 2, 3], [5, 6, 7, 4]]);
  });

  it('should leave the original untouched', function () {
    var i, copy = [];
    for (i = 0; i < array.length; i += 1) {
      copy[i] = array[i];
    }

    _.partition(array, function (a) { return a.length <= 4; });
    expect(array).toEqual(copy);
  });
});
