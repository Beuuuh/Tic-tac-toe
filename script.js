const gameBoard = (() => {
    const divBoard = document.querySelector(".gameboard");
    const label = document.querySelector(".label");
    const turn = document.querySelector(".turn");

    let playerTurn = true;
    let playerScore = 0;
    let computerScore = 0;
    let gameState = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    let possibleMoves = [];
    let pixels = [];

    let countPlayer = 0;
    let countComputer = 0;
    
    const createBoard = () => {
        for(let i = 0; i < 9; i++) {
            let div = document.createElement("div");
            div.setAttribute("class", "pixel");
            div.setAttribute("id", `${i + 1}`);
            pixels.push(div);
            divBoard.appendChild(div);

            div.addEventListener("click", () => {
                if(div.innerText == "X" || div.innerText == "O") {
                    alert("You have already marked this square");
                } else {
                    markTheBoard(div);
                    addToArray(i + 1);
                    showTurn(playerTurn ? "Player" : "Computer");
                    playerTurn = !playerTurn;
                    console.log(gameState);
                    checksForWinner();
                    evaluateGameState();
                    computerTurn();
                }
            })
        }
    }

    const checksForWinner = () => {
        verifyMainDiagonal();
        verifySecondaryDiagonal();
        verifyRows();
        verifyColumns();

        if(countComputer == 3 || countPlayer == 3) {
            alert(`${(countComputer == 3) ? "Computer" : "Player"}`);
        } else {
            p = c = 0;
        }
    }

    const verifyMainDiagonal = () => {
        let p = 0;
        let c = 0;

        for(let i = 0; i <= gameState.length - 1; i++) {
            if(gameState[i][i] == 1) {
                p++;
            } else if(gameState[i][i] == 2){
                c++;
            }
        }

        if(p == 3) {
            countPlayer = 3;
        } else if(c == 3) {
            countComputer = 3;
        }
    }

    const verifySecondaryDiagonal = () => {
        let p = 0;
        let c = 0;

        for(let i = 0; i <= gameState.length - 1; i++) {
            if(gameState[i][gameState.length - 1 - i] == 1) {
                p++;
            } else if(gameState[i][gameState.length - 1 - i] == 2) {
                c++;
            }
        }

        if(p == 3) {
            countPlayer = 3;
        } else if(c == 3) {
            countComputer = 3;
        }
    }

    const verifyColumns = () => {
        let p = 0;
        let c = 0;

        for(let i = 0; i <= gameState.length - 1; i++) {
            for(let j = 0; j <= gameState.length - 1; j++) {
                if(gameState[j][i] == 1) {
                    p++;
                } else if(gameState[j][i] == 2) {
                    c++;
                }
            }

            if(p == 3 || c == 3) {
                break;
            } else {
                p = c = 0;
            }
        }

        if(p == 3) {
            console.log("deu certo");
            countPlayer = 3;
        } else if(c == 3) {
            countComputer = 3;
        }
    }

    const verifyRows = () => {
        for(let i = 0; i <= gameState.length - 1; i++) {
            if(gameState[i].every( (element) => element == 1 )) {
                countPlayer = 3;
            } else if(gameState[i].every( (element) => element == 2 )) {
                countComputer = 3;
            }
        }
    }

    const addToArray = (i) => {
        const index = i - 1; 
        const row = Math.floor(index / 3);
        const col = index % 3;

        gameState[row][col] = 1;
    }

    const markTheBoard = (div) => {
        div.innerText = "X";
    }

    const startGame = () => {
        showScore(playerScore, computerScore);
        createBoard();
        showTurn("Player");
        playerTurn = !playerTurn;
    }

    const showScore = (playerScore, computerScore) => {
        label.innerText = `Player: ${playerScore} vs Computer: ${computerScore}`;
    }

    const showTurn = (somebodyTurn) => {
        turn.innerText = `It's ${somebodyTurn}'s turn`;
    }

    const computerTurn = () => {
        let max = possibleMoves.length - 1;
        let index = Math.floor(Math.random() * max);
        let {i, j} = possibleMoves[index];
        
        gameState[i][j] = 2;
        changesPixel(i++, j++);
        checksForWinner();
    }

    const evaluateGameState = () => {
        possibleMoves = [];
        
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(gameState[i][j] == 0) {
                    possibleMoves.push({i, j});
                }
            }
        }
    }

    const changesPixel = (i, j) => {
        let index = (i * 3) + j;
        let pixel = pixels[index];

        pixel.innerText = "O";
    }

    return {
        startGame
    }
})()

gameBoard.startGame();
