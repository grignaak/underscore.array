describe('applyTo', function () {
  it('should pass arguments', function () {
    var args;
    _.applyTo([1, 2, 3], function () {
      args = arguments;
    });
    expect(args).toEqual([1, 2, 3]);
  });

  it('should use the context', function () {
    var expectedContext = {}, actualContext;
    _.applyTo([1, 2, 3], function () {actualContext = this;}, expectedContext);
    expect(actualContext).toBe(expectedContext);
  });

  it('should return the result', function () {
    expect(_.applyTo([], function () { return 1; })).toBe(1);
  });

  it('should handle nulls', function () {
    expect(_.applyTo(undefined, function (a) { return a; })).toBeUndefined();
    expect(_.applyTo(null, function (a) { return a; })).toBeUndefined();
  });
});


describe('mapApply', function () {
  it('should pass the arguments', function () {
    expect(_.mapApply([[1, 2], [3,4],[5,6]], function add() {
      var i, cur, result = 0;
      for (i = 0; cur = arguments[i]; i += 1) {
        result += cur;
      }
      return result;
    })).toEqual([3, 7, 11]);
  });
  
  it('should use the context', function() {
    var expectedContext = [], actualContext;
    _.mapApply([[1]], function () { actualContext = this; }, expectedContext);
    expect(actualContext).toBe(expectedContext);
  });

  it('should handle nulls', function () {
    expect(_.mapApply(null, null)).toEqual([]);
  });

});
