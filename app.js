"use strict";

const field = document.querySelector(".field");
let cellSize = 0;

const empty = {
  value: 0,
  top: 0,
  left: 0,
};

const cells = [];
cells.push(empty);

function updateDimensions() {
  const field = document.querySelector(".field");
  const gap = 5;

  cellSize = field.clientWidth / 4;

  cells.forEach((cell) => {
    if (cell.element) {
      cell.element.style.width = `${cellSize - gap}px`;
      cell.element.style.height = `${cellSize - gap}px`;
      cell.element.style.left = `${cell.left * cellSize + gap / 2}px`;
      cell.element.style.top = `${cell.top * cellSize + gap / 2}px`;
      cell.element.style.fontSize = `${cellSize * 0.4}px`;
    }
  });
}

function move(index) {
  const cell = cells[index];

  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);

  if (leftDiff + topDiff > 1) return;

  cell.element.style.left = `${empty.left * cellSize}px`;
  cell.element.style.top = `${empty.top * cellSize}px`;

  const tempLeft = empty.left;
  const tempTop = empty.top;

  empty.left = cell.left;
  empty.top = cell.top;

  cell.left = tempLeft;
  cell.top = tempTop;

  checkWin();
}

function checkWin() {
  const isFinished = cells.every((cell) => {
    if (cell.value === 0) return cell.top === 0 && cell.left === 0;
    return cell.value === cell.top * 4 + cell.left;
  });

  if (isFinished) {
    showModal();
  }
}

function showModal() {
  const modal = document.getElementById("winModal");
  modal.style.display = "block";
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("winModal").style.display = "none";
  location.reload();
});

const numbers = [...Array(15).keys()]
  .map((x) => x + 1)
  .sort(() => Math.random() - 0.5);

function initGame() {
  field.innerHTML = "";

  for (let i = 1; i <= 15; i++) {
    const cellElement = document.createElement("div");
    const value = numbers[i - 1];

    cellElement.className = "cell";
    cellElement.innerHTML = value;

    const left = i % 4;
    const top = (i - left) / 4;

    const cellObj = {
      value: value,
      left: left,
      top: top,
      element: cellElement,
    };

    cells.push(cellObj);
    field.append(cellElement);

    cellElement.addEventListener("click", () => {
      const index = cells.indexOf(cellObj);
      move(index);
    });
  }

  updateDimensions();
}

window.addEventListener("resize", updateDimensions);

initGame();
