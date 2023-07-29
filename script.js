const gameBoard = (() => {
    const DIVBOARD = document.querySelector(".gameboard");
    
    const createBoard = () => {
        for(i = 0; i < 9; i++) {
            let div = document.createElement("div");
            div.setAttribute("class", "pixel");
            DIVBOARD.appendChild(div);
            div.addEventListener("click", () => {
                markTheBoard(div);
            });
        };
    };

    const markTheBoard = (div) => {
        div.innerText = "X";
    }; 

    return {
        createBoard,
        markTheBoard
    };
})();
