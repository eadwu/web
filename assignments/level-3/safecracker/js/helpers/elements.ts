(() =>
{
  const _window = this;

  function newElement ({ element, classes = [], attributes = [], text = "" }: {
    element: string,
    classes?: Array<string>,
    attributes?: Array<string>,
    text?: string
  }): HTMLElement
  {
    const newElement = document.createElement(element);

    newElement.textContent = text;
    newElement.classList.add(...classes);
    loop(attributes, v => { newElement.setAttribute(v.name, v.value); });
    return newElement;
  }

  function newItem ({ name, cost, description }: {
    name: string,
    cost: number,
    description: string
  }): HTMLDivElement
  {
    const storeGood = newElement({ element: "div", classes: [ "sp-Good" ] }) as HTMLDivElement;
    const goodModifiers = newElement({ element: "div", classes: [ "gd-Modifiers" ] }) as HTMLDivElement;
    const goodData = newElement({ element: "div", classes: [ "gd-Data" ] }) as HTMLDivElement;

    goodModifiers.appendChild(newElement({ element: "button", classes: [ "gd-Modifier_Increase" ], text: "add1" }));
    goodModifiers.appendChild(newElement({ element: "button", classes: [ "gd-Modifier_Decrease" ], text: "remove1" }));

    goodData.appendChild(newElement({ element: "div", classes: [ "gd-Data_Title" ] }));
    goodData.appendChild(newElement({ element: "div", classes: [ "gd-Data_Description" ] }));
    goodData.appendChild(newElement({ element: "div", classes: [ "gd-Data_Price" ] }));

    storeGood.appendChild(goodModifiers);
    storeGood.appendChild(goodData);
    return storeGood;
  }

  _window.newElement = newElement;
  _window.newItem = newItem;
}).call(this);
