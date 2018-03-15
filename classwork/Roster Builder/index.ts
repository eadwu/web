(() =>
{
  const maxDiff = 500;
  const groups = {
    A: [],
    B: [],
    C: [],
    D: []
  };

  let id = 0;
  let prospects = [];
  let tick = performance.now();

  let targetGroup;
  let prospectiveListElement;

  function loop (
    source: Array<any> | NodeListOf<any>,
    func: (value: any, index: number, source: Array<any> | NodeListOf<any>) => void)
  {
    if (source.length <= 0) return;
    for (let i = 0; i < source.length; i++) func(source[ i ], i, source);
  }

  function newGroupProspect (text: string, reference: { id: number, name: string, gender: string }, parent: HTMLElement)
  {
    const newListElement = document.createElement("li") as HTMLLIElement;
    reference.element = newListElement;
    newListElement.textContent = text;
    newListElement.reference = reference;

    newListElement.addEventListener("click", function ()
    {
      if (prospects.length >= 30) return;
      const groupArray = groups[ this.reference.group ];

      groupArray.splice(this.reference.id, 1);
      prospects.push(this.reference);
      newProspect(`Name: ${this.reference.name}, Id: ${this.reference.id}`, this.reference, prospectiveListElement);
      parent.removeChild(this);
    });

    parent.appendChild(newListElement);
  }

  function newProspect (text: string, reference: { id: number, name: string, gender: string }, parent: HTMLElement)
  {
    const newListElement = document.createElement("li") as HTMLLIElement;
    reference.element = newListElement;
    newListElement.textContent = text;
    newListElement.reference = reference;

    newListElement.addEventListener("click", function ()
    {
      const groupName = targetGroup.getAttribute("data-group");
      const groupArray = groups[ groupName ];

      if (!targetGroup || targetGroup === parent || groups[ groupName ].length >= 12) return;

      prospects.splice(this.reference.id, 1);
      this.reference.group = groupName;
      groupArray[ this.reference.id ] = this.reference;
      newGroupProspect(`${this.textContent}, Gender: ${this.reference.gender}`, this.reference, targetGroup);
      parent.removeChild(this);
    });
    parent.appendChild(newListElement);
  }

  document.addEventListener("DOMContentLoaded", () =>
  {
    prospectiveListElement = document.querySelector("ol") as HTMLOListElement;
    const groupListElements = document.querySelectorAll("ol") as NodeListOf<HTMLOListElement>;

    let intervalLoop;

    loop(groupListElements, orderedList =>
    {
      orderedList.addEventListener("click", function ()
      {
        const now = performance.now();

        if (now - tick <= maxDiff && orderedList !== targetGroup)
        {
          const targetElement = this;
          const isGroupList = targetElement.hasAttribute("data-group");

          let rootArray = targetGroup.hasAttribute("data-group")
            ? groups[ targetGroup.getAttribute("data-group") ]
            : prospects;
          let targetArray = isGroupList ? groups[ this.getAttribute("data-group") ] : prospects;

          console.log(rootArray);
          loop(rootArray, def =>
          {
            if (!def) return;
            const baseText = `Name: ${def.name}, Id: ${def.id}`;
            const text = isGroupList
              ? `${baseText}, Gender ${def.gender}`
              : baseText;

            def.element.parentNode.removeChild(def.element);

            if (isGroupList)
              newGroupProspect(text, def, targetElement);
            else
              newProspect(text, def, prospectiveListElement);
          });

          if (isGroupList)
            groups[ this.getAttribute("data-group") ] = [ ...rootArray, ...targetArray ];
          else
            prospects = [ ...rootArray, ...targetArray ];

          if (targetGroup.hasAttribute("data-group"))
            groups[ targetGroup.getAttribute("data-group") ] = [];
          else
            prospects = [];
        }
        targetGroup = this;
        tick = now;
      });
    });
    intervalLoop = setInterval(() =>
    {
      if (allPeople.length <= 0 || prospects.length >= 30)
        return;

      const randomPersonIndex = getRandomInteger(0, allPeople.length - 1);
      const randomPerson = allPeople[ randomPersonIndex ];
      const metadata = randomPerson.split(",");
      const [ gender, name ] = metadata;

      const person = {
        id,
        name,
        gender
      };

      prospects.push(person);
      newProspect(`Name: ${name}, Id: ${id}`, person, prospectiveListElement);
      id++;
    }, 1000);
  });
}).call(this);
