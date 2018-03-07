(() =>
{
  const window = this;

  document.addEventListener("DOMContentLoaded", () =>
  {
    const deckAmounts = document.querySelectorAll(".cards_left") as NodeListOf<HTMLDivElement>;
    const cardContainers = document.querySelectorAll(".cards") as NodeListOf<HTMLDivElement>;
    const humanDeck = document.querySelector(".human .deck img") as HTMLImageElement;
    const resetGame = document.querySelector("button") as HTMLButtonElement;

    const [ cpuLeft, humanLeft ] = Array.from(deckAmounts);

    // bringing stuff to global namespace...
    window.cardContainers = cardContainers;
    window.cpuLeft = cpuLeft;
    window.humanLeft = humanLeft;

    Game.initialize();
    humanDeck.addEventListener("click", () => { Game.step(); });
    resetGame.addEventListener("click", function ()
    {
      if (!Game.active)
      {
        Game.cleanup();
        Game.initialize();

        Game.active = true
        this.setAttribute("disabled", "");
      }
    });
  });
}).call(this);
