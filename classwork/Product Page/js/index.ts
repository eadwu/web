(() =>
{
  document.addEventListener("DOMContentLoaded", () =>
  {
    //#region mutable
    let cart = [];
    //#endregion mutable
    //#region immutable
    // General variables
    const currentProduct = Object.random(DATA);
    // Action variables
    const quantityElement = document.querySelector(".pd-Quantity") as HTMLSelectElement;
    const addToCart = document.querySelector(".bt-Submit") as HTMLButtonElement;
    const purchase = document.querySelector(".bt-Purchase") as HTMLButtonElement;
    // Product variables
    const productNameElement = document.querySelector(".pd-Name_Content") as HTMLSpanElement;
    const productImageElement = document.querySelector(".pd-Image_Source") as HTMLImageElement;
    const productDescriptionElement = document.querySelector(".pd-Description_Content") as HTMLSpanElement;
    const productPriceElement = document.querySelector(".pd-Price_Content") as HTMLSpanElement;
    const productOptionsForm = document.forms.productOptions as HTMLFormElement;
    // Review HTMLElement variables
    const reviewContainer = document.querySelector(".ct-Reviews") as HTMLDivElement;
    const submitReview = document.querySelector(".rv-Compose") as HTMLButtonElement;
    const reviewRatingElement = document.querySelector(".rv-Rating") as HTMLDivElement;
    const reviewAuthorElement = document.querySelector(".rv-Author") as HTMLInputElement;
    const reviewTitleElement = document.querySelector(".rv-Title") as HTMLInputElement;
    const reviewContentElement = document.querySelector(".rv-Content") as HTMLTextAreaElement;

    const starElements = reviewRatingElement.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>;
    // Related Products HTMLElement variables
    const relatedProductsContainer = document.querySelector(".ct-Related") as HTMLDivElement;
    //#endregion immutable

    function setupProduct (product)
    {
      const option = Object.keys(product.options)[ 0 ];
      // Convert to PascalCase
      const pascalOption = option.substring(0, 1).toUpperCase() + option.substring(1);

      productNameElement.textContent = product.name;
      productImageElement.setAttribute("src", product.source);
      productDescriptionElement.textContent = product.description;
      productPriceElement.textContent = `$${product.price}`;

      while (productOptionsForm.children.length > 2)
      {
        productOptionsForm.removeChild(productOptionsForm.lastChild);
      }
      const optionNameElement = document.createElement("span");
      const selectElement = document.createElement("select");

      optionNameElement.textContent = pascalOption;
      Utility.forNDo(product.options[ option ].length, i =>
      {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", product.options[ option ][ i ]);
        optionElement.textContent = product.options[ option ][ i ];
        selectElement.appendChild(optionElement);
      });
      productOptionsForm.appendChild(optionNameElement);
      productOptionsForm.appendChild(selectElement);
      Object.fold(DATA, newRelatedItem);
    }

    //#region related
    function newRelatedItem (data)
    {
      if (data === currentProduct) return;
      const container = document.createElement("div");
      const image = document.createElement("img");
      const infoContainer = document.createElement("div");
      const name = document.createElement("span");
      const price = document.createElement("span");

      container.product = data;
      container.classList.add("re-Item");
      image.setAttribute("src", data.source);
      infoContainer.classList.add("re-Item_Info");
      name.textContent = data.name;
      price.textContent = `$${data.price}`;

      container.addEventListener("click", function ()
      {
        currentProduct = this.product;
        while (relatedProductsContainer.firstChild)
        {
          relatedProductsContainer.removeChild(relatedProductsContainer.firstChild);
        }
        setupProduct(this.product);
      });

      container.appendChild(image);
      container.appendChild(infoContainer);
      infoContainer.appendChild(name);
      infoContainer.appendChild(price);
      relatedProductsContainer.appendChild(container);
    }

    //#endregion related
    //#region review
    function calculateStars ()
    {
      return starElements.length - Array.from(starElements).reduce((a, v, i) => v.hasAttribute("active") ? i : a, 5);
    }

    function resetReview ()
    {
      resetStars();
      reviewAuthorElement.value = "";
      reviewTitleElement.value = "";
      reviewContentElement.value = "";
    }

    function resetStars ()
    {
      Utility.forNDo(starElements.length, i =>
      {
        if (starElements[ i ].hasAttribute("active"))
        {
          starElements[ i ].removeAttribute("active");
        }
      });
    }

    function newReview (user: string, title: string, message: string, rating: number)
    {
      const divContainer = document.createElement("div");
      const nameContainer = document.createElement("div");
      const subContainer = document.createElement("div");
      const ratingContainer = document.createElement("div");
      const titleContainer = document.createElement("div");
      const bodyContainer = document.createElement("div");

      divContainer.classList.add("rv-Item");
      nameContainer.classList.add("rit-User");
      nameContainer.textContent = user;
      subContainer.classList.add("rit-Info");
      ratingContainer.classList.add("rit-Info_Rating");
      titleContainer.classList.add("rit-Info_Title");
      titleContainer.textContent = title;
      bodyContainer.classList.add("rit-Body");
      bodyContainer.textContent = message;

      divContainer.appendChild(nameContainer);
      Utility.forNDo(starElements.length, i =>
      {
        const starElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const useElement = document.createElementNS("http://www.w3.org/2000/svg", "use");

        if (i < rating) starElement.setAttribute("active", "");
        useElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#star");
        starElement.appendChild(useElement);
        ratingContainer.appendChild(starElement);
      });
      subContainer.appendChild(ratingContainer);
      subContainer.appendChild(titleContainer);
      divContainer.appendChild(subContainer);
      divContainer.appendChild(bodyContainer);
      reviewContainer.appendChild(divContainer);
    }

    Utility.forNDo(starElements.length, i =>
    {
      const starElement = starElements[ i ];

      starElement.addEventListener("click", function ()
      {
        this.setAttribute("active", "");
      });

      starElement.addEventListener("mouseover", resetStars);
    });

    submitReview.addEventListener("click", () =>
    {
      const reviewStars = calculateStars();
      const reviewAuthor = reviewAuthorElement.value;
      const reviewTitle = reviewTitleElement.value;
      const reviewContent = reviewContentElement.value;

      if (reviewStars <= 0 || reviewAuthor.length <= 0 || reviewTitle.length <= 0 || reviewContent.length <= 0) return;
      newReview(reviewAuthor, reviewTitle, reviewContent, reviewStars);
      resetReview();
    });
    //#endregion review
    //#region setup
    setupProduct(currentProduct);

    addToCart.addEventListener("click", () =>
    {
      const otherOptionElement = document.querySelector(".pd-Quantity + span + select") as HTMLSelectElement;

      cart.push([
        currentProduct,
        quantityElement.options[ quantityElement.selectedIndex ].value,
        otherOptionElement.options[ otherOptionElement.selectedIndex ].value
      ]);
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    purchase.addEventListener("click", () =>
    {
      cart = [];
      if (localStorage.getItem("cart"))
      {
        localStorage.removeItem("cart");
      }
    });
    //#endregion setup
  });
}).call(this);
