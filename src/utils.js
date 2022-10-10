function changePositions(startId, endId, items) {
  let startIndex, endIndex;
  for (let i = 0; i < items.length; i++) {
    if (startId === items[i].id) startIndex = i;
    if (endId === items[i].id) endIndex = i;
    if (startIndex && endIndex) break;
  }
  const newItems = [...items];
  const draggedItem = newItems[startIndex];
  newItems.splice(startIndex, 1);
  newItems.splice(endIndex, 0, draggedItem);

  return newItems;
}
