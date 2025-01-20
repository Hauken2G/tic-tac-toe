// The Gameboard represents the state of the board
function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];
  // loop with a nested loop to create the board (row=0 top row) (columns=0 the most left column)
  for (i = 0; i < rows; i++) {
    board[i] = [];
    for (j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  // This line of code combines array filtering and mapping to create a new array of cells from a board
  const selectCell = (column, player) => {
    const availableCells = board
      .filter((row) => row[column].getValue() === 0)
      .map((row) => row[column]);

    // If no cells make it through the filter,
    // the move is invalid. Stop execution.
    if (!availableCells.length) return;
    // Otherwise, I have a valid cell, the last one in the filtered array
    const lowestRow = availableCells.length - 1;
    board[lowestRow][column].addMarker(player);
  };
  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };
  return { getBoard, selectCell, printBoard };
}
// function to change the value of a space based on the players selection
function Cell() {
  let value = 0;
  const addMarker = (player) => {
    value = player;
  };
  const getValue = () => value;
  return {
    addMarker,
    getValue,
  };
}

// just like the name of the function , controls the state with game turns and checks for a winner

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();
  const players = [
    { name: playerOneName, token: 1 },
    { name: playerTwoName, token: 2 },
  ];
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };
  const playRound = (column) => {
    // Drop a token for the current player
    console.log(
      `Marking ${getActivePlayer().name}'s selection into cell ${column}...`
    );
    board.selectCell(column, getActivePlayer().token);

    /*  This is where we would check for a winner and handle that logic,
        such as a win message. */

    // Switch player turn
    switchPlayerTurn();
    printNewRound();
  };

  // Initial play game message
  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
