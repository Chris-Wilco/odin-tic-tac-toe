function gridPair(x, y) {
    this.x = x;
    this.y = y;

    const getX = () => x;
    const getY = () => y;

    return { x, y };
}

function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(GameSquare());
        }
    }

    const getBoard = () => board;

    const markSquare = (x, y, player) => {
        if (board[x][y].getValue() == "-") {
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

function GameSquare() {
    let value = "-";

    const markSquare = (playerToken) => {
        value = playerToken;
    };

    const getValue = () => value;

    return {
        markSquare,
        getValue,
    };
}

function GameLogic() {
    playerOneName = "Player One";
    playerTwoName = "Player Two";

    const board = gameBoard();

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
    };
}

const game = GameLogic();
