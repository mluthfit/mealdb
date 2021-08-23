class FilterList extends HTMLElement {
  set items(items) {
    this._items = items.db;
    this._uniqueClass = items.class;
    this._data = items.data;
    this._event = items.clicked;
    this.render();
  }

  render() {
    this.className = 'list dflex warp';
    this.classList.add(this._uniqueClass);

    this.innerHTML = '';
    this._items.forEach((item) => {
      const span = document.createElement('span');
      span.innerText = item[this._data];

      span.addEventListener('click', this._event);
      this.appendChild(span);
    });
  }
}

customElements.define('filter-list', FilterList);
