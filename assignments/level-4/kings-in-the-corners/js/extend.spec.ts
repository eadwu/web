/// <reference types="spec" />
chai.should();

describe("Array", () =>
{
  it("should have method fold()", () =>
  {
    Array.prototype.should
      .have.property("fold");
  });

  it("should have method sum()", () =>
  {
    Array.prototype.should
      .have.property("sum");
  });

  describe("fold()", () =>
  {
    it("should return the same reference", () =>
    {
      const input = [ 1, 2, 3, 4, 5 ];

      input.fold((v, i) => { input[ i ] = (input[ i ] || v) * 2; }).should
        .be.instanceof(Array)
        .be.equal(input);
    });

    it("should execute an action on all the elements", () =>
    {
      const output = [ 1, 2, 3, 4, 5 ];

      output.fold((v, i) => { output[ i ] = (output[ i ] || v) + 2; }).should
        .be.eql([ 3, 4, 5, 6, 7 ]);
    });
  });

  describe("sum()", () =>
  {
    it("should return a number", () =>
    {
      [ 1, 2, 3, 4, 5 ].sum().should
        .be.a("number");
    });

    it("should return the sum of all the elements", () =>
    {
      [ 1, 2, 3, 4, 5 ].sum().should
        .be.at.least(0)
        .equal(15);
    });

    it("should return 0 when the Array<T> is empty", () =>
    {

      [].sum().should
        .be.a("number")
        .equal(0);
    });
  });
});
