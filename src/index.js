import data from "./data.json";
import { changePositions, getInitials, getSearchResults } from "./utils";

const createTile = (item, items) => {
  const listItem = document.createElement("li");
  const button = document.createElement("button");
  button.classList.add("tile-item");
  button.setAttribute("draggable", true);

  button.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("itemId", item.id);
    e.currentTarget.classList.add("dragging");
  });
  button.addEventListener("dragend", (e) => {
    e.currentTarget.classList.remove("dragging");
  });

  button.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  button.addEventListener("drop", (e) => {
    const newItems = changePositions(
      e.dataTransfer.getData("itemId"),
      item.id,
      items
    );
    initializeAppList(newItems);
  });

  const tileItem = `
    <div class="icon-wrapper" aria-hidden="true">
      <div class="tile-icon">${getInitials(item.title)}</div>
    </div>
    <div class="tile-description">
      <h2 class="tile-title">${item.title}</h2>
      <p>${item.description}</p>
    </div>
    <img src="./images/drag.svg" alt="drag" width=24 height=24 class="tile-move"/>
  `;

  button.innerHTML = tileItem;
  listItem.appendChild(button);
  return button;
};

const initializeAppList = (items) => {
  const listNodes = document.createElement("ul");
  listNodes.classList.add("tile-list");
  items.forEach((item) => {
    const listItem = createTile(item, items);
    listNodes.append(listItem);
  });

  const appListNode = document.getElementById("main");
  appListNode.innerHTML = ""; // clears list if already present
  appListNode.append(listNodes);
};

const initializeHeader = () => {
  const headerNode = document.getElementById("header");

  const handleSearch = function (e) {
    const searchResults = getSearchResults(e.target.value, data.items);
    initializeAppList(searchResults);
  };

  const headerItems = `
  <h1 class="title">App Launcher</h1>
  <div class ="search-wrapper">
    <img class="search-icon" src="./images/search.svg" aria-hidden="true"/>
    <input class="search-input" type="text" placeholder="Search app or items..."  />
  </div>
  <button class="add-app">Add New</button
  `;

  headerNode.innerHTML = headerItems;

  headerNode
    .getElementsByTagName("input")[0]
    .addEventListener("input", handleSearch);
};

const initialize = () => {
  window.addEventListener("load", () => {
    initializeHeader();
    initializeAppList(data.items);
  });
};

initialize();
