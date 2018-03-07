(() =>
{
  class Game
  {
    static active: boolean = true;
    static players: Array<Player> = [];
    static globalQueue: Array<Card> = [];
    static pendAction: boolean = false;
    static warStatus: boolean = false;

    static cleanup ()
    {
      loop(cardContainers, container =>
      {
        const cards = container.querySelectorAll("img") as NodeListOf<HTMLImageElement>;

        loop(Array.from(cards), (card, index) =>
        {
          container.removeChild(card);
        });
      });
    }

    static newCard (source, parent)
    {
      const newCardElement = document.createElement("img");

      newCardElement.setAttribute("src", `assets/images/${source}`);
      parent.appendChild(newCardElement);
    }

    static resolveCurrent (winner)
    {
      winner.hand.push(...Game.globalQueue);
      Game.globalQueue = [];
      Game.pendAction = true;
    }

    static shuffleDeck (deck)
    {
      const newDeck = [ ...deck ];

      forNDo(getRandomInteger(1, newDeck.length), () =>
      {
        const firstIndex = getRandomInteger(0, newDeck.length);
        const secondIndex = getRandomInteger(firstIndex, newDeck.length);
        const indexDiff = secondIndex - firstIndex;
        const deckCut = newDeck.splice(firstIndex, indexDiff);

        newDeck.push(...deckCut);
      });
      return newDeck;
    }

    static updateDisplay ()
    {
      cpuLeft.textContent = Game.players[ 0 ].hand.length;
      humanLeft.textContent = Game.players[ 1 ].hand.length;
    }

    static initialize ()
    {
      const players = Game.players = mapRange(MAX_PLAYERS, i => new Player(i));
      const fullDeck = Game.shuffleDeck(mapRange(RANKS * SUITS, i =>
      {
        return {
          rank: Math.ceil((i + 1) / SUITS),
          suit: i % 4
        };
      }));

      loop(fullDeck, v =>
      {
        const chosenIndex = getRandomInteger(0, players.length - 1);
        const chosenPlayer = players[ chosenIndex ];

        if (chosenPlayer.hand.length < MAX_CARDS_PER_PLAYER)
          chosenPlayer.hand.push(new Card(v));
        else
          players[ (chosenIndex + 1) % players.length ].hand.push(new Card(v));
      });
      Game.updateDisplay();
    }

    static step ()
    {
      if (!Game.active) return;
      if (Game.pendAction) { Game.cleanup(); Game.pendAction = false; }
      const cpuCardDump = document.querySelectorAll(".computer .deck img") as NodeListOf<HTMLImageElement>;
      const plrCardDump = document.querySelectorAll(".player .deck img") as NodeListOf<HTMLImageElement>;
      const cpuCardContainer = document.querySelector(".computer .cards") as HTMLDivElement;
      const plrCardContainer = document.querySelector(".human .cards") as HTMLDivElement;

      const [ Computer, Player ] = Game.players;

      const computerCard = Computer.getFirstCard();
      const playerCard = Player.getFirstCard();

      Game.globalQueue.push(computerCard, playerCard);
      Game.newCard(`${computerCard.rank}-${computerCard.suit}.png`, cpuCardContainer);
      Game.newCard(`${playerCard.rank}-${playerCard.suit}.png`, plrCardContainer);

      if (computerCard.rank === playerCard.rank)
        Game.war();
      else if (computerCard.rank > playerCard.rank || computerCard.rank === 1)
        Game.resolveCurrent(Computer);
      else if (playerCard.rank > computerCard.rank || playerCard.rank === 1)
        Game.resolveCurrent(Player);

      Game.updateDisplay();

      if (Computer.hand.length > 0 || Player.hand.length > 0)
        return;

      if (Computer.hand.length <= 0 && Player.hand.length <= 0)
        alert("Nice tie.");
      else if (Computer.hand.length <= 0)
        alert("You won!");
      else if (Player.hand.length <= 0)
        alert("You lose!");

      Game.active = false;
    }

    static war ()
    {
      loop(cardContainers, container =>
      {
        const playerType = container.getAttribute("data-player-type");
        const player = Game.players[ playerType ];

        forNDo(WAR_BET, () =>
        {
          if (player.hand.length <= 1) return;
          Game.globalQueue.push(player.getFirstCard());
          const newSourceImageType = parseInt(playerType, 10) === 0 ? "blue" : "red";
          Game.newCard(`back-${newSourceImageType}-75-2.png`, container);
        });
      });

      Game.updateDisplay();
      Game.step();
    }
  }

  this.Game = Game;
}).call(this);
