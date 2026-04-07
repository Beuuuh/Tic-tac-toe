const gameBoard = (() => {
    const divBoard = document.querySelector(".gameboard");
    const label = document.querySelector(".label");
    const turn = document.querySelector(".turn");

    let playerTurn = true;
    let playerScore = 0;
    let computerScore = 0;
    let gameState = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    let possibleMoves = [];
    
    const createBoard = () => {
        for(let i = 0; i < 9; i++) {
            let div = document.createElement("div");
            div.setAttribute("class", "pixel");
            div.setAttribute("id", `${i + 1}`);

            div.style.width = "200px";
            div.style.height = "200px";
            div.style.backgroundColor = "cyan";
            div.style.border = "1px solid black";
            div.style.borderColor = "black";

            divBoard.appendChild(div);

            div.addEventListener("click", () => {
                markTheBoard(div);
                addToArray(i + 1);
                showTurn(playerTurn ? "Player" : "Computer");
                playerTurn = !playerTurn;
                evaluateGameState();
                computerTurn();
            })
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
        let max = possibleMoves.length - 1
        let index = Math.floor(Math.random() * max);
        let {i, j} = possibleMoves[index];
        
        gameState[i][j] = 1;
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

    return {
        startGame
    }
})()

gameBoard.startGame();
