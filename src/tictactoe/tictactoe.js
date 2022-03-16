window.addEventListener('DOMContentLoaded', () => {
    const board_container = document.querySelector(".board-container");
    const winner_section = document.querySelector("#winner");

    const PLAYER_ONE = 'X';
    const PLAYER_TWO = 'O';

    let isGameActive = true;
    let isComputerMode = false;

    let play_board = new Array(9).fill("");
    let currentPlayer = PLAYER_ONE;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    /**
     * Indexes within the board
     * [0] [1] [2]
     * [3] [4] [5]
     * [6] [7] [8]
     */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    renderBoard = () => {
        board_container.innerHTML = "";
        play_board.forEach((val, index) => {
            decorateBlock(val, index);
        })
    }

    decorateBlock = (moveVal, pos) => {
        let block = document.createElement('div');
        block.setAttribute('class', 'block');
        block.setAttribute('id', `block_${pos}`);
        block.addEventListener('click', () => userAction(moveVal, pos));
        board_container.appendChild(block);
    }

    userAction = (val, pos) => {
        if (isValidAction(val, pos) && isGameActive) {
            let block = document.querySelector(`#block_${pos}`);
            block.innerText = currentPlayer;
            block.classList.add(`player${currentPlayer}`);
            updateBoard(pos, currentPlayer);
            validateResult();
            changePlayer(currentPlayer);
        }
    }

    isValidAction = (val, index) => {
        if (play_board[index] === 'X' || play_board[index] === 'O') {
            return false;
        }
        return true;
    }

    updateBoard = (pos, val) => {
        play_board[pos] = val;
    }

    changePlayer = (player) => {
        let displaySection = document.querySelector('.display-player');
        displaySection.classList.remove(`player${currentPlayer}`);
        currentPlayer = player === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
        displaySection.innerText = currentPlayer;
        displaySection.classList.add(`player${player}`);
        // if (isComputerMode && currentPlayer !== PLAYER_ONE) {
        //     addComputerMove(currentPlayer);
        // }
    }

    validateResult = () => {
        let roundWon = false;
        for (let i = 0; i < play_board.length - 1; i++) {
            const winCondition = winningConditions[i];
            const a = play_board[winCondition[0]];
            const b = play_board[winCondition[1]];
            const c = play_board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            // announceWinner 
            isGameActive = false;
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        }
        console.log(play_board);
        if (!play_board.includes('')) {
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

    // addComputerMove = (computer) => {
    //     if (isGameActive) {
    //         do {
    //             selected = Math.floor(Math.random() * 9);
    //         } while (play_board[selected] != "");
    //         userAction(computer, selected)
    //     }
    // };

    reset = (event) => {
        if (event) {
            play_board = new Array(9).fill("");
            isGameActive = true;
            renderBoard();
        }
    }

    renderBoard();
})