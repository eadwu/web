declare class Table {
    _source: HTMLTableElement;
    constructor(source: HTMLTableElement);
    getSource(): HTMLTableElement;
    _insertCell(row: HTMLTableRowElement, data: string): void;
    addEntry(entries: string | any[]): void;
}
