/// <reference types="spec" />
chai.should();

describe("Deck", () =>
{
  it("should have property cardsLeft", () =>
  {
    new Deck().should
      .have.property("cardsLeft");
    new Deck().cardsLeft.should
      .be.at.most(new Deck().contents.length);
  });

  it("should have property [_]contents", () =>
  {
    const input = new Deck();

    input.should
      .have.property("contents");
    input.contents.should
      .be.equal(input.contents);
  });

  it("should have property [_]currentIndex", () =>
  {
    const input = new Deck();

    input.should
      .have.property("currentIndex");
    input.currentIndex.should
      .be.equal(input._currentIndex);
  });

  it("should have property hasNext", () =>
  {
    new Deck().should
      .have.property("hasNext");
    new Deck().hasNext.should
      .be.a("boolean");
  });

  it("should have property nextIndex", () =>
  {
    const input = new Deck();

    input.should
      .have.property("nextIndex");
    input.nextIndex.should
      .be.equal(input.currentIndex - 1);
  });

  describe("contents", () =>
  {
    it("should be of type Array<Card> with a length of 0 <= n <= 52", () =>
    {
      new Deck().contents.should
        .be.instanceof(Array)
        .to.have.length.within(0, 53);
    });
  });

  describe("shuffle()", () =>
  {
    it("should return the same reference as its parameter", () =>
    {
      const input = new Deck();

      Deck.shuffle(input).should
        .be.equal(input);
    });

    it("should perform the same operations as shuffleDeck()", () =>
    {
      Deck.shuffle(new Deck()).contents.should
        .be.instanceof(Array)
        .to.have.length.within(0, 52);
    });
  });

  describe("nextCard()", () =>
  {
    it("should return a Card", () =>
    {
      new Deck().nextCard().should
        .be.an.instanceof(Card);
    });
  });

  describe("shuffleDeck()", () =>
  {
    it("should return an Array<Card>", () =>
    {
      Deck.shuffleDeck(new Deck().contents).should
        .be.instanceof(Array);
    });

    it("should return an Array<Card> of length of 0 <= n <= 52", () =>
    {
      Deck.shuffleDeck(new Deck().contents).should
        .to.have.length.within(0, 53);
    });
  });
});
