(() =>
{
  const maxDiff = 1000;
  let tick = performance.now();

  function fixIndices (i0: number, source: Array<any>): Array<any>
  {
    return source.map((v, index) => v.index > i0 ? { ...v, index } : v);
  }

  function loop (
    source: Array<any> | NodeListOf<any>,
    func: (v: any, i: number, source: Array<any> | NodeListOf<any>) => void)
  {
    for (let i = 0; i < source.length; i++) func(source[ i ], i, source);
  }

  function getIndexFromId (id: number, source: Array<any>): number
  {
    let n = -1;
    loop(source, (v, i) =>
    {
      if (v.id === id) n = i;
    });
    return n;
  }

  function newListElement (text: string, onClick: (event?: Event) => void, opt?: { [ key: string ]: any }): HTMLElement
  {
    let newElement = document.createElement("li");

    newElement.textContent = text;
    for (key in opt) newElement[ key ] = opt[ key ];
    newElement.addEventListener("click", onClick);
    return newElement;
  }

  document.addEventListener("DOMContentLoaded", () =>
  {
    const prospectiveListElement = document.querySelector("#newgroup") as HTMLOListElement;
    const targetGroupElements = document.querySelectorAll("ol") as NodeListOf<HTMLOListElement>;

    const groups = {
      A: [],
      B: [],
      C: [],
      D: []
    };

    let id = 0;
    let prospects = [];
    let currentGroup = targetGroupElements[ 1 ];

    function executeClick (
      event: Event | null | undefined,
      rootArray: Array<any>,
      newArray: Array<any>,
      i: number,
      text: string,
      parentElement: HTMLElement,
      func: (event?: Event) => void,
      reference: {
        id: number,
        name: string,
        gender: string,
        index: number
      })
    {
      if (event) event.stopPropagation();
      rootArray.splice(i, 1);
      this.parentNode.removeChild(this);
      reference.index = newArray.length;
      newArray.push(reference);
      parentElement.appendChild(newListElement(
        text,
        func,
        {
          reference
        }
      ));
    }

    function prospectiveClick (event?: Event)
    {
      const groupArray = groups[ currentGroup.getAttribute("data-group") ];
      const { reference, textContent } = this;
      const { id, gender } = reference;
      const index = getIndexFromId(id, prospects);

      if (currentGroup === prospectiveListElement || groupArray.length >= 12) return;
      executeClick.call(
        this,
        event,
        prospects,
        groupArray,
        index,
        `${textContent}, Gender: ${gender}`,
        currentGroup,
        groupClick,
        reference
      );
      prospects = fixIndices(index, prospects);
    }

    function groupClick (event?: Event)
    {
      const groupName = this.parentNode.getAttribute("data-group");
      const groupArray = groups[ groupName ];
      const { reference } = this;
      const { name, id } = reference;
      const index = getIndexFromId(id, groupArray);

      if (prospects.length >= 30) return;
      executeClick.call(
        this,
        event,
        groupArray,
        prospects,
        index,
        `Name: ${name}, Id: ${id}`,
        prospectiveListElement,
        prospectiveClick,
        reference
      );
      groups[ groupName ] = fixIndices(index, groupArray);
    }

    loop(targetGroupElements, oListElement =>
    {
      oListElement.addEventListener("click", function ()
      {
        if (this === currentGroup) return;
        const tmp = performance.now();

        if (tmp - tick <= maxDiff)
        {
          const parent = this;
          const isCurrentGroup = currentGroup.hasAttribute("data-group");
          const isNewGroup = this.hasAttribute("data-group");
          const prevElementParent = isCurrentGroup ? currentGroup : prospectiveListElement;
          const prevArray = isCurrentGroup ? groups[ currentGroup.getAttribute("data-group") ] : prospects;
          const newArray = isNewGroup ? groups[ this.getAttribute("data-group") ] : prospects;
          const listLIElements = prevElementParent.querySelectorAll("li") as NodeListOf<HTMLLIElement>;

          loop(listLIElements, (v, i) =>
          {
            const { reference } = v;
            const { name, id, gender } = reference;

            reference.index = newArray.length + i;
            v.parentNode.removeChild(v);
            if (isNewGroup)
            {
              parent.appendChild(newListElement(
                `Name: ${name}, Id: ${id}, Gender: ${gender}`,
                groupClick,
                {
                  reference
                }
              ));
            }
            else
            {
              parent.appendChild(newListElement(
                `Name: ${name}, Id: ${id}`,
                prospectiveClick,
                {
                  reference
                }
              ));
            }
          });
          newArray.push(...prevArray);
          prevArray.splice(0, prevArray.length);

          if (isNewGroup)
            groups[ this.getAttribute("data-group") ] = fixIndices(0, newArray);
          else
            prospects = fixIndices(0, prospects);
        }

        tick = tmp;
        currentGroup = this;
      });
    });

    const intLoop = setInterval(() =>
    {
      if (allPeople.length <= 0) clearInterval(intLoop);
      if (prospects.length >= 30) return;

      const randomPersonIndex = getRandomInteger(0, allPeople.length - 1);
      const randomPerson = allPeople[ randomPersonIndex ];
      const metadata = randomPerson.split(",");
      const [ gender, name ] = metadata;

      const person = {
        id,
        name,
        gender,
        index: id
      };

      prospects.push(person);
      prospectiveListElement.appendChild(newListElement(
        `Name: ${name}, Id: ${id}`,
        prospectiveClick,
        {
          reference: person
        }
      ));
      id++;
    }, 1000);
  });
}).call(this);
