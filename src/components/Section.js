export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    };

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    };

    addItem(item) {
        this._containerSelector.append(item);
    };

    addNewItem(item) {
        this._containerSelector.prepend(item);
    };
};