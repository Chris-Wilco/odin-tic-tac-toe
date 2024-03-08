const newGameButton = document.getElementById("new-game-button");
newGameButton.addEventListener("click", () => {
    startNewGame();
});

const clearBoardButton = document.getElementById("clear-board-button");
clearBoardButton.addEventListener("click", () => {
    clearBoard(document.getElementById("board"));
    resetBoard();
});

function startNewGame() {
    ScreenController();
}

function resetBoard() {
    for (let i = 0; i < 9; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("game-square");
        document.getElementById("board").appendChild(newDiv);
    }
    document.getElementById("turn").textContent = "";
}

function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(GameSquare(i, j));
        }
    }

    const getBoard = () => board;

    const markSquare = (x, y, player) => {
        if (board[x][y].getValue() === "") {
            board[x][y].markSquare(player.token);
            return true;
        } else {
            console.log("This square is not valid");
            return false;
        }
    };

    const printBoard = () => {
        for (let i = 0; i < board.length; i++) {
            let thisLine = "";
            for (let j = 0; j < board[0].length; j++) {
                thisLine += "[" + board[i][j].getValue() + "]";
            }
            console.log(thisLine);
            console.log(`Ping line ${i}`);
        }
    };

    return {
        getBoard,
        markSquare,
        printBoard,
    };
}

function GameSquare(x, y) {
    let value = "";

    const xCoord = "" + x;
    const yCoord = "" + y;
    /* const getX = () => xCoord;
    const getY = () => yCoord; */

    const getX = () => {
        return xCoord;
    };
    const getY = () => {
        return yCoord;
    };

    const markSquare = (playerToken) => {
        value = playerToken;
    };

    const getValue = () => value;

    return {
        markSquare,
        getValue,
        getX,
        getY,
    };
}

function GameLogic() {
    playerOneName = "Player One";
    playerTwoName = "Player Two";

    const board = GameBoard();

    const players = [
        { name: playerOneName, token: "X" },
        { name: playerTwoName, token: "Y" },
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();

        console.log(`${activePlayer.name}'s turn.`);
    };

    const playRound = (x, y) => {
        console.log(
            `Marking ${activePlayer.name}'s ${activePlayer.token} at (${x}, ${y}).`
        );
        if (board.markSquare(x, y, activePlayer)) {
            switchPlayerTurn();
            printNewRound();
        } else {
            console.log(
                `That was an invalid square, ${activePlayer} goes again...`
            );
            printNewRound();
        }
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
    };
}

function ScreenController() {
    const game = GameLogic();

    const playerTurnDiv = document.getElementById("turn");
    const boardDiv = document.getElementById("board");

    const updateScreen = () => {
        clearBoard(boardDiv);

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn.`;

        board.forEach((row) => {
            row.forEach((square) => {
                console.log(
                    "blah" +
                        `grid(${square.getX()},${square.getY()}) Value: ${square.getValue()}`
                );
                const newSquareId = `grid(${square.getX},${square.getY})`;
                const newGameSquare = document.createElement("div");

                newGameSquare.classList.add("game-square");
                newGameSquare.setAttribute("id", newSquareId);
                newGameSquare.textContent = `${square.getValue()}`;
                newGameSquare.addEventListener("click", () => {
                    game.playRound(square.getX(), square.getY());
                    updateScreen();
                });

                boardDiv.appendChild(newGameSquare);
            });
        });

        /* const clickHandler = (gameSquareClicked) => {
            game.playRound(gameSquareClicked.getX, gameSquareClicked.getY);
            updateScreen();
        }; */
    };

    updateScreen();
}

function clearBoard(thisDiv) {
    const thisNode = thisDiv;
    while (thisNode.lastElementChild) {
        thisNode.removeChild(thisNode.lastElementChild);
    }
}
