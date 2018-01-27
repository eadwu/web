const Constants = {
  ITEMS: [
    {
      name: "Lockpick",
      cost: 1000,
      description: "A lockpick has 1 use only and will reveal 1 random digit from the code."
    },
    {
      name: "Dynamite",
      cost: 5000,
      description: "Dynamite has 1 use only. It will blow open a safe automatically. However, a random amount of money inside the safe may be destroyed. In order to determine the amount of money destroyed, first determine the amount of money inside the vault. Afterwards, use the same formula to generate another amount and subtract it from the first."
    },
    {
      name: "Lawyer",
      cost: 50000,
      description: "A lawyer has 1 use. If the player is caught by the police, (s)he can buy his/her freedom and continue cracking safes. A player must have a lawyer in his/her possession when caught."
    },
    {
      name: "Small Bag",
      cost: 7000,
      description: "Holds 2 Items (Bags cannot hold other bags)."
    },
    {
      name: "Medium Bag",
      cost: 14000,
      description: "Holds 4 items (Bags cannot hold other bags)."
    },
    {
      name: "Large Bag",
      cost: 28000,
      description: "Holds 7 items (Bags cannot hold other bags)."
    },
    {
      name: "Magnet",
      cost: 3000,
      description: "Will add 0 - 5 seconds to the clock. Each time a magnet is used, there is a 10% chance that it will set off the alarm rather than add time. There is also a 40% chance that the magnet will break and become unusable again."
    },
    {
      name: "Stealth Suit",
      cost: 20000,
      description: "The player can choose to escape at any time, regardless of whether or not the safe has been cracked. A stealth suit has a lifetime of 1 – 4 uses (generated when bought) before it wears out and is unusable."
    },
    {
      name: "Henchman",
      cost: 75000,
      description: "A Henchman will hold off the police while a safecracker continues to work on the safe. A henchman can last anywhere from 1 - 6 turns against the police (generated at the start of the battle), giving the player that many more chances to crack the safe (the seconds on the clock no longer matter). After those turns are up the henchman surrenders and is hauled away. The Henchman will begin battling police as soon as the 3 turn grace period is up and the countdown to each henchman's surrender will begin. If the player has more than one henchman in a bag, they will fight police separately so that only one will be captured at a time. Once all of the henchmen are gone, the player is arrested."
    }
  ]
};
