const cells = document.querySelectorAll(".cell");
const cellInputs = document.querySelectorAll(".cell-input");
const resetButton = document.querySelector(".button");


cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    cell.classList.toggle("selected");
    checkForWin();
  });
});

function checkForWin() {
  for (let row = 0; row < 4; row++) {
    const rowCells = [];
    for (let col = 0; col < 4; col++) {
      rowCells.push(cells[row * 4 + col]);
    }
    if (rowCells.every((cell) => cell.classList.contains("selected"))) {
      flashCells(rowCells);
      return;
    }
  }

  for (let col = 0; col < 4; col++) {
    const colCells = [];
    for (let row = 0; row < 4; row++) {
      colCells.push(cells[row * 4 + col]);
    }
    if (colCells.every((cell) => cell.classList.contains("selected"))) {
      flashCells(colCells);
      return;
    }
  }

  const diagonal1 = [cells[0], cells[5], cells[10], cells[15]];
  if (diagonal1.every((cell) => cell.classList.contains("selected"))) {
    flashCells(diagonal1);
    return;
  }

  const diagonal2 = [cells[3], cells[6], cells[9], cells[12]];
  if (diagonal2.every((cell) => cell.classList.contains("selected"))) {
    flashCells(diagonal2);
    return;
  }
}

function flashCells(cellsToFlash) {
  const flashInterval = setInterval(() => {
    cellsToFlash.forEach((cell) => cell.classList.toggle("selected"));
  }, 200);

  setTimeout(() => {
    clearInterval(flashInterval);
  }, 2500);
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.classList.remove("selected");
  });
}

function updateCellValue(index) {
  const input = cellInputs[index];
  const cell = cells[index];

  cell.textContent = input.value;

  localStorage.setItem(`cellValue${index}`, input.value);
}

cellInputs.forEach((input, index) => {
  const storedValue = localStorage.getItem(`cellValue${index}`);
  if (storedValue) {
    input.value = storedValue;
    updateCellValue(index);
  }

  input.addEventListener('input', function() {
    console.log("aled")
    updateCellValue(index);
  });
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function shuffleCells() {
  console.log("aled")
  const inputValues = [];
  cellInputs.forEach(input => {
    inputValues.push(input.value);
  });

  // Mélangez le tableau de valeurs de manière aléatoire
  shuffleArray(inputValues);

  // Réaffectez les valeurs mélangées aux inputs
  cellInputs.forEach((input, index) => {
    input.value = inputValues[index];
    // Mettez à jour la cellule correspondante avec la nouvelle valeur
    cells[index].textContent = inputValues[index];
    localStorage.setItem(`cellValue${index}`, inputValues[index]);
  });
}
