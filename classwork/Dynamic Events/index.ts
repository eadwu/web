(() =>
{
  function createCard (source: string): HTMLImageElement
  {
    const newImageElement = document.createElement("img");
    newImageElement.setAttribute("src", `images/${source}`);
    return newImageElement;
  }

  document.addEventListener("DOMContentLoaded", () =>
  {
    const rootImageElement = document.querySelector("img");
    const deck = mapRange(RANKS * SUITS, i =>
    {
      return {
        rank: Math.ceil((i + 1) / SUITS),
        suit: i % 4
      };
    });

    rootImageElement.addEventListener("click", () =>
    {
      if (deck.length <= 0) return;
      const nextCard = deck.shift();
      const newCard = createCard(`${nextCard.rank}-${nextCard.suit}.png`);

      newCard.addEventListener("click", function ()
      {
        const imageSource = this.getAttribute("src");
        const parsedSource = imageSource.split("-");
        const [ parsedRank, parsedSuit ] = parsedSource;

        const foundRank = parsedRank.match(/[0-9]+/)[ 0 ];
        const foundSuit = parsedSuit.match(/[0-9]+/)[ 0 ];

        deck.push({
          rank: foundRank,
          suit: foundSuit
        });
        document.body.removeChild(this);
      });
      document.body.appendChild(newCard);
    });
  });
}).call(this);
