/// <reference types="spec" />
chai.should();

describe("Card", function ()
{
  it("should have property rank", function ()
  {
    new Card({ rank: 2, suit: 3 }).should
      .have.property("rank");
  });

  it("should have property suit", function ()
  {
    new Card({ rank: 2, suit: 3 }).should
      .have.property("suit");
  });

  describe("rank", function ()
  {
    it("should be of type number", function ()
    {
      new Card({ rank: 2, suit: 3 }).rank.should
        .be.a("number");
    });
  });

  describe("suit", function ()
  {
    it("should be of type number", function ()
    {
      new Card({ rank: 2, suit: 3 }).suit.should
        .be.a("number");
    });
  });
});
