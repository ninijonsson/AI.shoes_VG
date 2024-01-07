const structureContainers = renderStructure();

render_header(structureContainers.header);

renderShoeList(structureContainers.bottom, SHOES);

renderFilterButton(structureContainers.top);

renderShoppingCartPopup(structureContainers.header);
