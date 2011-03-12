describe("groupby", function () {
  var numbers, colors, colorSpec = 'red yellow green red blue blue blue';
  beforeEach(function () {
    var i;
    colors = colorSpec.split(' ');
    numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
    for (i = 0; i < numbers.length; i += 1) {
      numbers[i] = {id: i, order: numbers[i]};
    }
  });

  function identity(x) { return x; }
  function extract(name) {
    return function (o) { return o[name]; }
  }

  function flatten(array, name) {
    var i, j, src, dest, result = [], iron = extract(name);
    for (i = 0; i < array.length; i += 1) {
      src = array[i];
      dest = []
      for (j = 0; j < src.length; j += 1) {
        dest[j] = iron(src[j]);
      }
      result.push(dest);
    }
    return result;
  }

  it('should return empty on null array', function () {
    expect(_.groupby(null, identity)).toEqual([]);
  });

  it('should return empty on empty array', function () {
    expect(_.groupby([], identity)).toEqual([]);
  });

  it('should group into arrays', function () {
    expect(_.groupby([1, 2, 3], identity)).toEqual([[1], [2], [3]]);
  });

  it('should group consecutive things together', function () {
    expect(_.groupby(colors, identity))
      .toEqual([['red'], ['yellow'], ['green'], ['red'], ['blue', 'blue', 'blue']]);
  });

  it('should use the custom iterator', function () {
    var result = _.groupby(numbers, extract('order'));
    expect(flatten(result, 'id'))
      .toEqual([[0], [1, 2], [3, 4, 5], [6, 7, 8, 9]]);
    expect(flatten(result, 'order'))
      .toEqual([[1], [2, 2], [3, 3, 3], [4, 4, 4, 4]]);
  });

  it('should keep the original intact', function () {
    _.groupby(colors, identity);
    expect(colors).toEqual(colorSpec.split(' '));
  });
});
