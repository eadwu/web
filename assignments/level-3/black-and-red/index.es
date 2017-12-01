/**
 * @flow
 */
(() =>
{
  function Token (type)
  {
    this.type = type;
  }

  function Player ()
  {
    this.lastStrategy = undefined;
    this.tokens = [
      ...mapRange(10, () => new Token(0)),
      ...mapRange(10, () => new Token(1))
    ];

    this.tokenByType = function (callback: (element: any, index: number, array: any[]) => boolean)
    {
      return this.tokens.filter(callback);
    };
  }

  function Table (source: HTMLTableElement)
  {
    this.source = source;
    this._insertCell = function (row: HTMLTableRowElement, data: string, index?: number = -1)
    {
      row.insertCell(index).textContent = data;
    };

    this.addEntry = function (entries: string | any[])
    {
      const { source } = this;
      const tableRow = source.insertRow();

      Array.isArray(entries) ? (
        forNDo(entries.length, entry =>
        {
          this._insertCell(tableRow, entries[entry].toString());
        })
      ) : this._insertCell(tableRow, entries.toString());
    };
  }

  document.addEventListener("DOMContentLoaded", () =>
  {
    const User = new Player();
    const Computer = new Player();

    const dataTableElement = ((document.querySelector("#data_table"): any): HTMLTableElement);
    const dataTable = new Table(dataTableElement);
  });
}).call(this);
