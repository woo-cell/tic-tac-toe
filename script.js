const gameBoard = (function () {
    const cells = document.querySelectorAll(".cell-container > div");
    const dialog = document.querySelector("dialog");
    const modalText = document.querySelector("dialog > p");
    const restartButton = document.getElementById("restart-btn");

    // creating the board
    const board = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ];

    const winningCombinations = [
        [[0,0],[0,1],[0,2]],
        [[1,0],[1,1],[1,2]],
        [[2,0],[2,1],[2,2]],
        [[0,0],[1,0],[2,0]],
        [[0,1],[1,1],[2,1]],
        [[0,2],[1,2],[2,2]],
        [[0,0],[1,1],[2,2]],
        [[2,0],[1,1],[0,2]]
    ]

    function playerMakesMove(row,col) {
        const availableMoves = listAvailableMoves();
        const containsRowCol = availableMoves.some((pair) => pair[0] === row && pair[1] === col);
        if (containsRowCol) {
            board[row][col] = "x";
            computerMakesMove();
        }
        win(availableMoves);
    }

    function listAvailableMoves () {
        const availableMoves = [];
        for (let i = 0; i < 3; i ++) {
            for (let j = 0; j < 3; j ++) {
                if (board[i][j] == undefined) {
                    availableMoves.push([i,j]);
                } 
            }
        }
        return availableMoves;
    }

    function computerMakesMove() {
        const availableMoves = listAvailableMoves();
        let containsRowCol = [];
        computerMove = [];
        let randomRow = 0;
        let randomCol = 0;

        if (availableMoves[0]) {
            do {
                randomRow = Math.floor(Math.random()*3);
                randomCol = Math.floor(Math.random()*3);
                containsRowCol = availableMoves.some((pair) => pair[0] === randomRow && pair[1] === randomCol);
            } while (!containsRowCol);
            board[randomRow][randomCol] = "o";
            cMakeMove (randomRow,randomCol);
        }

        win(availableMoves);
    }

    function win() {
        const availableMoves = listAvailableMoves();

        for (let i = 0; i < winningCombinations.length; i ++) {
            const combination = winningCombinations[i];
            const [a,b,c] = combination;
            const [rowA, colA] = a;
            const [rowB, colB] = b;
            const [rowC, colC] = c;         
            if (board[rowA][colA] === "x" &&
                board[rowB][colB] === "x" &&
                board[rowC][colC] === "x") {
                modalText.textContent = "You win";
                dialog.showModal();
                return true;
            } else if (board[rowA][colA] === "o" &&
            board[rowB][colB] === "o" &&
            board[rowC][colC] === "o") {
                modalText.textContent = "Computer wins";
                dialog.showModal();
                return false;
            } else if (!availableMoves[0]) {
                modalText.textContent = "Draw!";
                dialog.showModal();
                return true;
            }
        }
    }


    function resetBoard() {
        for (let i = 0; i < 3; i ++) {
            for (let j = 0; j < 3; j ++) {
                board[i][j] = undefined;
            }
        }
        cells.forEach((cell) => cell.textContent = "");       
    }

    // creating player not necessry now
    // function createPlayer () {
    //     const player = {playerLetter:"x" }
    //     return player;
    // }

    function uMakeMove (e) {
        const availableMoves = listAvailableMoves();
        let rowIndex = 0;
        let colIndex = 0;
        if (e.target.id==="0" || e.target.id==="1" || e.target.id==="2") {
            rowIndex = 0;
        } else if (e.target.id==="3" || e.target.id==="4" || e.target.id==="5") {
            rowIndex = 1;
        } else if (e.target.id==="6" || e.target.id==="7" || e.target.id==="8") {
            rowIndex = 2;
        }

        if (e.target.id==="0" || e.target.id==="3" || e.target.id==="6") {
            colIndex = 0;
        } else if (e.target.id==="1" || e.target.id==="4" || e.target.id==="7") {
            colIndex = 1;
        } else if (e.target.id==="2" || e.target.id==="5" || e.target.id==="8") {
            colIndex = 2;
        }
        playerMakesMove(rowIndex,colIndex);
        availableMoves.forEach((move) => {
            if (move[0] === rowIndex && move[1] === colIndex) {
                e.target.textContent = "X";
            }
        });
    }

    function cMakeMove (row,col) {
        if (row === 0 && col === 0) {
            cells[0].textContent = "O";
        } else if (row === 0 && col === 1) {
            cells[1].textContent = "O";
        } else if (row === 0 && col === 2) {
            cells[2].textContent = "O";
        } else if (row === 1 && col === 0) {
            cells[3].textContent = "O";
        } else if (row === 1 && col === 1) {
            cells[4].textContent = "O";
        } else if (row === 1 && col === 2) {
            cells[5].textContent = "O";
        } else if (row === 2 && col === 0) {
            cells[6].textContent = "O";
        } else if (row === 2 && col === 1) {
            cells[7].textContent = "O";
        } else if (row === 2 && col === 2) {
            cells[8].textContent = "O";
        }
    }

    cells.forEach((cell) => cell.addEventListener("click", uMakeMove));

    restartButton.addEventListener("click", () => {
        dialog.close();
        resetBoard();
    });

    dialog.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            e.preventDefault();
        }
    });

    // return {board,createPlayer,playerMakesMove,listAvailableMoves};
})();

