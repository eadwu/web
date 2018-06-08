/// <reference types="spec" />
chai.should();

describe("Game", () =>
{
  it("should have property deck", function ()
  {
    Game.init().should
      .have.property("deck");
  });

  it("should have property matrix", function ()
  {
    Game.init().should
      .have.property("matrix");
  });

  describe("init", function ()
  {
    it("should return the same reference", () =>
    {
      Game.init().should
        .be.equal(Game);
    });
  });
});
