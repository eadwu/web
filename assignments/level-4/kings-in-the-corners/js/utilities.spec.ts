/// <reference types="spec" />
chai.should();

describe("window", () =>
{
  it("should have method getRandomInteger()", () =>
  {
    window.should
      .have.property("getRandomInteger");
  });

  it("should have method forNDo()", () =>
  {
    window.should
      .have.property("forNDo");
  });

  it("should have method mapRange()", () =>
  {
    window.should
      .have.property("mapRange");
  });

  it("should have method matrix2D()", () =>
  {
    window.should
      .have.property("matrix2D");
  });

  describe("getRandomInteger()", () =>
  {
    it("should return a number", () =>
    {
      getRandomInteger(0, 100).should
        .be.a("number");
    });

    it("should return a number of min <= n <= max", () =>
    {
      const min = 0;
      const max = 100;

      getRandomInteger(min, max).should
        .be.at.within(min, max);
    });
  });

  describe("flatten2D", () =>
  {
    it("should return an T[]", () =>
    {
      flatten2D(matrix2D(4, 6)).should
        .be.a.instanceof(Array);
    });

    it("should return an T[] of length r * c", () =>
    {
      const r = 4;
      const c = 6;

      flatten2D(matrix2D(r, c)).should
        .to.have.length(r * c);
    });
  });

  describe("forNDo()", () =>
  {
    it("should execute an action n times", () =>
    {
      const n = 10;
      const tmp = [];

      forNDo(n, i => { tmp.push(i); });
      tmp.should
        .be.a.instanceof(Array)
        .to.have.length(n)
        .eql([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
    });
  });

  describe("mapRange()", () =>
  {
    it("should return an Array<T>", () =>
    {
      mapRange(10, v => v).should
        .be.a.instanceof(Array);
    });

    it("should function as a map() without needing an Array<T>", () =>
    {
      const n = 10;

      mapRange(n, v => v % 4).should
        .to.have.length(n)
        .eql([ 0, 1, 2, 3, 0, 1, 2, 3, 0, 1 ])
        .eql([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(v => v % 4));
    });
  });

  describe("matrix2D()", () =>
  {
    it("should return an T[][]", () =>
    {
      matrix2D(4, 6).fold(row =>
      {
        row.should
          .be.a.instanceof(Array);
      }).should
        .be.a.instanceof(Array);
    });

    it("should return an T[][] of length r-by-c", () =>
    {
      const r = 4;
      const c = 6;

      matrix2D(r, c).fold(row =>
      {
        row.should
          .to.have.length(c);
      }).should
        .to.have.length(r);
    });
  });
});
