/// <reference path="../../../../typings/p5.d.ts" />
(() =>
{
  const _window = this;

  function getRandomInteger (min: number, max: number): number
  {
    return parseInt(Math.random() * (max + 1 - min), 10) + min;
  }

  function loop (arr, func)
  {
    for (let i = 0; i < arr.length; i++)
      func(arr[ i ], i, arr);
  }

  document.addEventListener("DOMContentLoaded", () =>
  {
    const container = document.querySelector(".cd-HardFix_Align") as HTMLElement;
    const inputElements = document.querySelectorAll("input");

    const modifiers = [
      [ -1, -1 ],
      [ 0, -1 ],
      [ -1, 0 ],
      [ 0, 1 ],
      [ 1, 0 ],
      [ 1, 1 ]
    ];

    const types = {
      SPACE: 0,
      ORIGINPOINT: 1,
      ENDPOINT: 2,
      WALL: 3,
      PATH: 4
    };

    const root = new p5(base =>
    {
      class Node
      {
        g: number;
        type: number;
        x: number;
        y: number;

        constructor (x, y)
        {
          this.x = x;
          this.y = y;
          this.g = Math.abs(endX - x) + Math.abs(endY - y);
          // this.g = Math.sqrt((endX - x) ** 2 + (endY - y) ** 2);

          if (`${x},${y}` === start)
            this.type = types.ORIGINPOINT;
          else if (`${x},${y}` === end)
            this.type = types.ENDPOINT;
          else
            this.type = types.SPACE;
        }

        next ()
        {
          let next = { type: 0, g: 1000 };
          loop(modifiers, mod =>
          {
            const [ modX, modY ] = mod;
            const newX = this.x + modX;
            const newY = this.y + modY;

            if (newX >= 0 && newY >= 0 && newX < rows && newY < columns)
            {
              const targetNode = grid[ newX ][ newY ];
              if (targetNode.type === types.SPACE && targetNode.g < next.g)
                next = targetNode;
              else if (targetNode.type === types.ENDPOINT)
                next = true;
            }
          });
          if (typeof (next) === "object")
            next.type = types.PATH;

          return next;
        }

        render ()
        {
          if (this.type === types.ORIGINPOINT)
            base.fill("#4caf50");
          else if (this.type === types.ENDPOINT)
            base.fill("#f44336");
          else if (this.type === types.WALL)
            base.fill(0);
          else if (this.type === types.PATH)
            base.fill("#03a9f4");
          else
            base.fill(207, 90, 0 + this.g / Math.sqrt(2 * 15 ** 2) * 100);

          base.stroke(0);
          base.rect(this.x * rowWidth, this.y * columnHeight, rowWidth, columnHeight);
        }
      }

      const rows = 15;
      const columns = 15;

      _window.startX = 0;
      _window.startY = 0;

      let endX = 14;
      let endY = 14;
      let start = `${startX},${startY}`;
      let end = `${endX},${endY}`;
      let grid = Array.apply(null, new Array(rows)).map((_, y) => Array.apply(null, new Array(columns)).map((_, x) => new Node(x, y)));

      let rowWidth;
      let columnHeight;

      _window.updateEndpoints = () =>
      {
        start = `${startX},${startY}`;
        end = `${endX},${endY}`;
        resetGrid();
      };

      function resetGrid ()
      {
        grid = Array.apply(null, new Array(rows)).map((_, y) => Array.apply(null, new Array(columns)).map((_, x) => new Node(x, y)));
      }

      function updateDefaults ()
      {
        rowWidth = container.clientWidth / rows;
        columnHeight = container.clientHeight / columns;
      }

      base.setup = () =>
      {
        base.colorMode(base.HSB);
        base.createCanvas(container.clientWidth, container.clientHeight);
        updateDefaults();
      };

      base.draw = () =>
      {
        loop(grid, row => { loop(row, node => { node.render(); }); });

        let cNode = grid[ startX ][ startY ];

        while (true)
        {
          if (!cNode.next) return;
          const response = cNode.next();
          if (response === true)
            break;
          else
            cNode = response;
        }
      };

      base.windowResized = () =>
      {
        base.resizeCanvas(container.clientWidth, container.clientHeight);
        updateDefaults();
      };
    }, container);

    loop(inputElements, element =>
    {
      const coordinateDimension = element.getAttribute("data-target-type");

      element.addEventListener("keydown", event =>
      {
        if (event.key === "Enter")
        {
          _window[ `start${coordinateDimension}` ] = element.value || 0;
          updateEndpoints();
        }
      });
    });
  });
}).call(this);
