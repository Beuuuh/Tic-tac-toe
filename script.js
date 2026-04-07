const gameBoard = (() => {
    const divBoard = document.querySelector(".gameboard");
    const label = document.querySelector(".label");
    const turn = document.querySelector(".turn");

    let playerTurn = true;
    let playerScore = 0;
    let computerScore = 0;
    
    const createBoard = () => {
        for(let i = 0; i < 9; i++) {
            let div = document.createElement("div");
            div.setAttribute("class", "pixel");

            div.style.width = "200px";
            div.style.height = "200px";
            div.style.backgroundColor = "cyan";
            div.style.border = "1px solid black";
            div.style.borderColor = "black";

            divBoard.appendChild(div);

            div.addEventListener("click", () => {
                markTheBoard(div);
                showTurn(playerTurn ? "Player" : "Computer");
                playerTurn = !playerTurn;
            })
        }
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

    return {
        startGame
    }
})()

gameBoard.startGame();
