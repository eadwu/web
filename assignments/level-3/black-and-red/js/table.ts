class Table
{
  _source: HTMLTableElement;
  constructor (source: HTMLTableElement)
  {
    this._source = source;
  }

  getSource ()
  {
    return this._source;
  }

  _insertCell (row: HTMLTableRowElement, data: string)
  {
    row.insertCell().textContent = data;
  }

  addEntry (entries: string | any[])
  {
    const source = this.getSource();
    const tableRow = source.insertRow();

    Array.isArray(entries) ? (
      forNDo(entries.length, entry =>
      {
        this._insertCell(tableRow, entries[ entry ].toString());
      })
    ) : this._insertCell(tableRow, entries.toString());
  }
}
