export const changePositions = (startId, endId, items) => {
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
};

export const getInitials = (name) => {
  return name
    .split(" ")
    .map(function (str) {
      return str ? str[0].toUpperCase() : "";
    })
    .splice(0, 2)
    .join("");
};

export const getSearchResults = (searchText, items) => {
  let filteredList = [];
  items.forEach((item) => {
    if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
      filteredList.push(item);
    }
  });
  return filteredList;
};
