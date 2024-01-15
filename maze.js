const maze = document.getElementById('maze');
const player = document.createElement('div');
const finishCell = document.createElement('div');
const cells = [];

let playerX = 0;
let playerY = 0;

for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        maze.appendChild(cell);
        cells.push(cell);
    }
}

generateRandomWalls();

cells[0].appendChild(player);
cells[cells.length - 1].classList.add('finish');

updatePlayerPosition();

document.addEventListener('keydown', function (event) {
    movePlayer(event.key);
});

function movePlayer(key) {
    const step = 1;
    let newPosition;

    switch (key) {
        case 'ArrowUp':
            newPosition = getNewPosition(playerX, playerY - step);
            break;
        case 'ArrowDown':
            newPosition = getNewPosition(playerX, playerY + step);
            break;
        case 'ArrowLeft':
            newPosition = getNewPosition(playerX - step, playerY);
            break;
        case 'ArrowRight':
            newPosition = getNewPosition(playerX + step, playerY);
            break;
    }

    if (newPosition && !cells[newPosition.y * 20 + newPosition.x].classList.contains('wall')) {
        playerX = newPosition.x;
        playerY = newPosition.y;
        updatePlayerPosition();
    }

    checkWinCondition();
}
function getNewPosition(x, y) {
    if (x >= 0 && x < 20 && y >= 0 && y < 20) {
        return { x, y };
    }
    return null;
}

function updatePlayerPosition() {
    const cellSize = 25;
    player.style.width = `${cellSize}px`;
    player.style.height = `${cellSize}px`;
    player.style.left = `${playerX * cellSize}px`;
    player.style.top = `${playerY * cellSize}px`;
    player.style.backgroundColor = 'blue';
    player.style.position = 'absolute';
}

function checkWinCondition() {
    const finishCellIndex = cells.findIndex(cell => cell.classList.contains('finish'));
    const finishCellRow = Math.floor(finishCellIndex / 20);
    const finishCellCol = finishCellIndex % 20;

    if (playerX === finishCellCol && playerY === finishCellRow) {
        const restartGame = confirm('KICSIT AZÉRT ÜSSED\nAHOGY ILLIK');
        let BP = document.querySelector('.banner1');
        BP.style.opacity = 1;

        if (restartGame) {
            resetGame();
        }
    }
}

function resetGame() {
    playerX = 0;
    playerY = 0;
    generateRandomWalls();
    updatePlayerPosition();
}

function generateRandomWalls() {
    cells.forEach(cell => {
        cell.classList.remove('wall');
    });
    const finishCellIndex = cells.findIndex(cell => cell.classList.contains('finish'));

    const startingPositionIndex = cells.findIndex(cell => cell.contains(player));
    const startingPositionNeighbors = getNeighborIndices(startingPositionIndex);
    const finishCellNeighbors = getNeighborIndices(finishCellIndex);

    for (let i = 0; i < 100; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * 400);
        } while (randomIndex === finishCellIndex || randomIndex === startingPositionIndex || startingPositionNeighbors.includes(randomIndex) || finishCellNeighbors.includes(randomIndex));

        cells[randomIndex].classList.add('wall');
    }
}

function getNeighborIndices(index) {
    const row = Math.floor(index / 20);
    const col = index % 20;

    const neighbors = [];

    if (row > 0) neighbors.push(index - 20); 
    if (row < 19) neighbors.push(index + 20); 
    if (col > 0) neighbors.push(index - 1);  
    if (col < 19) neighbors.push(index + 1); 

    return neighbors;
}