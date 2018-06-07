/// <reference types="p5" />
type ArrayAdapt = Array<any> | NodeListOf<any>;

(() =>
{
  function getRandomInteger (min: number, max: number): number
  {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

  function loop (arr: ArrayAdapt, func: (value: any, index: number, source: ArrayAdapt) => void)
  {
    const transformedArr = Array.isArray(arr) ? arr : Array.from(arr);
    for (let i = 0; i < arr.length; i++)
      func(arr[ i ], i, arr);
  }

  document.addEventListener("DOMContentLoaded", () =>
  {
    const container = document.querySelector(".cd-HardFix_Align") as HTMLElement;
    const inputElements = document.querySelectorAll("input");

    const defaultModifiers = [
      [ 0, -1 ],
      [ -1, 0 ],
      [ 1, 0 ],
      [ 0, 1 ]
    ];

    const diagonalModifiers = [
      [ -1, -1 ],
      [ -1, 1 ],
      [ 1, 1 ],
      [ 1, -1 ]
    ];

    const params = location.search.substr(1).split("=");
    let modifiers = params.indexOf("allowDiagonals") >= 0 ? defaultModifiers.concat(diagonalModifiers) : defaultModifiers;

    const types = {
      ORIGINPOINT: 0,
      ENDPOINT: 1,
      SPACE: 2,
      WALL: 3,
      CHECKED: 4,
      PATH: 5
    };

    const root = new p5(base =>
    {
      class Node
      {
        g: number;
        type: number;
        x: number;
        y: number;

        constructor (x: number, y: number)
        {
          this.x = x;
          this.y = y;
          // Manhanttan Distance
          // this.g = Math.abs(endX - x) + Math.abs(endY - y);
          // Euclidean Distance
          this.g = Math.sqrt((endX - x) ** 2 + (endY - y) ** 2);

          if (`${x},${y}` === start)
            this.type = types.ORIGINPOINT;
          else if (`${x},${y}` === end)
            this.type = types.ENDPOINT;
          else
            this.type = types.SPACE;
        }

        next ()
        {
          let current;

          loop(modifiers, mod =>
          {
            const [ modY, modX ] = mod;
            const newX = this.x + modX;
            const newY = this.y + modY;

            if (newX < 0 || newX >= length || newY < 0 || newY >= length) return;
            const targetNode = grid[ newY ][ newX ];

            // Ensure type is either Space, Checked, or Path
            // Should only have to ensure the type is Space
            // if (targetNode.type > 0 && (targetNode.type % 2 === 0 || targetNode.type === 1 || targetNode.type === 5))
            if (targetNode.type === types.ORIGINPOINT || targetNode.type === types.WALL) return;
            current = current
              ? targetNode.g <= current.g
                ? targetNode
                : current
              : targetNode;
          });

          return current;
        }

        render ()
        {
          if (this.type === types.ORIGINPOINT)
            base.fill("#4caf50");
          else if (this.type === types.ENDPOINT)
            base.fill("#f44336");
          else if (this.type === types.WALL)
            base.fill(0);
          else if (this.type === types.CHECKED)
            base.fill("#ffeb3b");
          else if (this.type === types.PATH)
            base.fill("#9c27b0");
          else
            base.fill(207, 90, 0 + this.g / Math.sqrt(2 * length ** 2) * 100);

          base.stroke(0);
          base.rect(this.x * rowWidth, this.y * columnHeight, rowWidth, columnHeight);
        }
      }

      const length = 15;

      let startX = 0;
      let startY = 0;
      let endX = 14;
      let endY = 14;

      let start = `${startX},${startY}`;
      let end = `${endX},${endY}`;
      let grid = Array.apply(null, new Array(length)).map((_, y) => Array.apply(null, new Array(length)).map((_, x) => new Node(x, y)));

      let rowWidth;
      let columnHeight;

      function reCalculatePath ()
      {
        let cNode = grid[ startY ][ startX ];
        let i = 0;

        while (true)
        {
          const response = cNode.next();

          if (response.type === types.ENDPOINT)
            break;

          cNode = response;
          cNode.type = types.PATH;
        }
      }

      function updateEndpoints ()
      {
        const newStart = `${startX},${startY}`;
        const newEnd = `${endX},${endY}`;

        if (newStart === newEnd) return;

        start = newStart;
        end = newEnd;
        resetGrid();
      }

      function resetGrid ()
      {
        grid = Array.apply(null, new Array(length)).map((_, y) => Array.apply(null, new Array(length)).map((_, x) => new Node(x, y)));
        grid[ startY ][ startX ].type = types.ORIGINPOINT;
        grid[ endY ][ endX ].type = types.ENDPOINT;

        reCalculatePath();
      }

      function updateDefaults ()
      {
        rowWidth = container.clientWidth / length;
        columnHeight = container.clientHeight / length;
      }

      base.setup = () =>
      {
        base.colorMode(base.HSB);
        base.createCanvas(container.clientWidth, container.clientHeight);
        base.noLoop();

        loop(inputElements, element =>
        {
          const coordinateState: string = element.getAttribute("data-state");
          const coordinateDimension: string = element.getAttribute("data-target-type");

          element.addEventListener("input", event =>
          {
            const originalValue = element.value;
            const constrainedValue = originalValue ?
              originalValue < 0
                ? length + ~~originalValue
                : originalValue > length - 1
                  ? originalValue % length
                  : +originalValue
              : 0;

            coordinateState === "start"
              ? coordinateDimension === "X"
                ? startX = constrainedValue
                : startY = constrainedValue
              : coordinateDimension === "X"
                ? endX = constrainedValue
                : endY = constrainedValue;

            element.value = constrainedValue;
            updateEndpoints();

            base.redraw();
          });
        });

        base.windowResized();
      };

      base.draw = () =>
      {
        loop(grid, row => { loop(row, node => { node.render(); }); });
        reCalculatePath();
      };

      base.windowResized = () =>
      {
        base.resizeCanvas(container.clientWidth, container.clientHeight);
        updateDefaults();

        base.redraw();
      };
    }, container);
  });
}).call(this);
