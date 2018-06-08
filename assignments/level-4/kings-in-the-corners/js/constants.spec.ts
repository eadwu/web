/// <reference types="spec" />
chai.should();

describe("window", () =>
{
  it("should have property RANKS", () =>
  {
    window.should
      .have.property("RANKS");
  });

  it("should have property SUITS", () =>
  {
    window.should
      .have.property("SUITS");
  });

  it("should have property MATRIX_R", () =>
  {
    window.should
      .have.property("MATRIX_R");
  });

  it("should have property MATRIX_C", () =>
  {
    window.should
      .have.property("MATRIX_C");
  });

  describe("RANKS", () =>
  {
    it("should be of type number", () =>
    {
      RANKS.should
        .be.a("number");
    });

    it("should have a value of 13", () =>
    {
      RANKS.should
        .be.equal(13);
    });
  });

  describe("SUITS", () =>
  {
    it("should be of type number", () =>
    {
      SUITS.should
        .be.a("number");
    });

    it("should have a value of 4", () =>
    {
      SUITS.should
        .be.equal(4);
    });
  });

  describe("MATRIX_R", () =>
  {
    it("should be of type number", () =>
    {
      MATRIX_R.should
        .be.a("number");
    });

    it("should have a value of 4", () =>
    {
      MATRIX_R.should
        .be.equal(4);
    });
  });

  describe("MATRIX_C", () =>
  {
    it("should be of type number", () =>
    {
      MATRIX_C.should
        .be.a("number");
    });

    it("should have a value of 4", () =>
    {
      MATRIX_C.should
        .be.equal(4);
    });
  });
});
