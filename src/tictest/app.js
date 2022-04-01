window.addEventListener('DOMContentLoaded', () => {
    //Render Boxes;
    let play_board = new Array(9).fill("");
    const board_container = document.querySelector('div.board-container');
    const winner_section = document.querySelector("#winner");

    const PLAYER_ONE = "X";
    const PLAYER_TWO = "O";
    const TIE = 'TIE';
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';

    let isGameActive = true;
    let currentPlayer = PLAYER_ONE;
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ]
    decorateBox = (box, index) => {
        let block = document.createElement('div');
        block.classList.add('box');
        block.setAttribute('id', `box_${index}`);
        block.addEventListener('click', () => userAction(box, index));
        board_container.appendChild(block);
    };

    renderBoard = () => {
        board_container.innerHTML = "";
        play_board.forEach((box, index) => {
            decorateBox(box, index);
        })
    }

    userAction = (val, pos) => {
        if (isGameActive && isValidAction(val, pos)) {
            let block = document.querySelector(`#box_${pos}`);
            block.textContent = currentPlayer;
            block.classList.add(`player-${currentPlayer}`);
            updateBoard(pos, currentPlayer);
            validateResult();
            changePlayer(currentPlayer);
        }
    }

    updateBoard = (pos, player) => {
        play_board[pos] = player;
    }

    validateResult = () => {
        let roundWon = false;
        for (let startIdx = 0; startIdx < play_board.length - 1; startIdx++) {
            const winCondition = winningConditions[startIdx];
            const a = play_board[winCondition[0]];
            const b = play_board[winCondition[1]];
            const c = play_board[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            isGameActive = false;
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        }
        if (!play_board.includes("")) {
            announce(TIE);
        }
    }

    announce = (player) => {
        switch (player) {
            case PLAYERX_WON:
                winner_section.innerText = `Player X won the competition`;
                break;
            case PLAYERO_WON:
                winner_section.innerText = `Player O won the competition`;
                break;
            case TIE:
                winner_section.innerText = `Math Draw`;
                break;
        }
    }


    changePlayer = (player) => {
        let displaySection = document.querySelector('.display-player');
        displaySection.classList.remove(`player${currentPlayer}`);
        currentPlayer = player === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
        displaySection.innerText = currentPlayer;
        displaySection.classList.add(`player${player}`);
    }

    reset = (event) => {
        if (event) {
            play_board = new Array(9).fill("");
            isGameActive = true;
            renderBoard();
        }
    }

    isValidAction = (val, pos) => {
        if (play_board[pos] === PLAYER_ONE || play_board[pos] === PLAYER_TWO) {
            return false;
        }
        return true;
    }

    renderBoard();
})