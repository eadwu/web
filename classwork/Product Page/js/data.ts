(() =>
{
  const DATA = {
    umbrella: { // Instance
      name: "Upskirt Umbrella", // Name
      description: "When a normal umbrella just isn't enough.", // Description
      price: 20, // Price ($$ USD)
      source: "images/umbrella.jpg", // Asset
      options: { // Options
        color: [
          "Black",
          "White"
        ]
      }
    },
    pillow: {
      name: "Body Pillow",
      description: "Here for all your needs in the bed.",
      price: 50,
      source: "images/pillow.jpg",
      options: {
        size: [
          "Small",
          "Medium",
          "Large"
        ]
      }
    },
    shirt: {
      name: "T-Shirt",
      description: "A T-Shirt that isn't your normal everyday T-Shirt.",
      price: 10,
      source: "images/shirt.jpg",
      options: {
        size: [
          "Small",
          "Medium",
          "Large"
        ]
      }
    },
    game: {
      name: "Nekopara",
      description: "One of the best games in existence.",
      price: 40,
      source: "images/nekopara.jpg",
      options: {
        devices: [
          "XBox",
          "PS4",
          "Windows",
          "macOS",
          "Linux"
        ]
      }
    },
    figure: {
      name: "Figurine",
      description: "Just here to sap your money so you can extend your collection.",
      price: 5,
      source: "images/figure.jpg",
      options: {
        type: [
          "Kirito",
          "Lucy",
          "Shiro"
        ]
      }
    }
  };

  this.DATA = DATA;
}).call(this);
