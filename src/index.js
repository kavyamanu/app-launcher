import data from "./data.json";

function reInitializeList(items) {
  const list = document.getElementById("main");
  const app = initialize(items);
  list.innerHTML = ""; // clears list
  list.append(app);
}

function createTile(item, items) {
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
    const items = changePositions(
      e.dataTransfer.getData("itemId"),
      item.id,
      items
    );
    reInitializeList(items);
  });

  let initial = item.title
    .split(" ")
    .map(function (str) {
      return str ? str[0].toUpperCase() : "";
    })
    .splice(0, 2)
    .join("");

  const tileItem = `
      <div class="icon-wrapper" aria-hidden="true">
    <div class="tile-icon">${initial}</div>
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
}

function createAppList(items) {
  const list = document.createElement("ul");
  list.classList.add("tile-list");
  items.forEach((item) => {
    const listItem = createTile(item, items);
    list.append(listItem);
  });
  return list;
}

function initialize(data) {
  // const data = await fetchData();
  const app = document.createElement("div");
  const list = createAppList(data);
  app.appendChild(list);
  return app;
}

function createHeader() {
  const handleSearch = function (e) {
    let newData = [];
    data.items.forEach((item) => {
      if (item.title.toLowerCase().includes(e.target.value.toLowerCase())) {
        newData.push(item);
      }
    });
    const root = document.getElementById("main");
    const app = initialize(newData);
    root.innerHTML = ""; // clears app
    root.append(app);
  };

  const header = document.createElement("div");
  header.classList.add("header");

  const headerItems = `
  <h1 class="title">App Launcher</h1>
  <div class ="search-wrapper">
    <img class="search-icon" src="./images/search.svg" aria-hidden="true"/>
    <input class="search-input" type="text" placeholder="Search app or items..."  />
  </div>
  <button class="add-app">Add New</button
  `;

  header.innerHTML = headerItems;

  header
    .getElementsByTagName("input")[0]
    .addEventListener("input", handleSearch);

  return header;
}

window.addEventListener("load", () => {
  const root = document.getElementById("main");
  const header = document.getElementById("header");
  const app = initialize(data.items);
  const appHeader = createHeader();
  header.append(appHeader);

  root.append(app);
});
