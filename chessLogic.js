// Initialize chess game
const game = new Chess();
let board;

// Initialize the chess board
function initChessBoard() {
    const boardConfig = {
        position: 'start',
        draggable: true,
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd,
        pieceTheme: 'assets/images/chesspieces/{piece}.png'
    };
    
    board = Chessboard('board', boardConfig);
    updateMoveHistory();
}

// Don't allow illegal moves to be dragged
function onDragStart(source, piece, position, orientation) {
    if (game.game_over()) return false;
    
    // Only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

// Handle piece drops
function onDrop(source, target) {
    // See if the move is legal
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Always promote to queen for simplicity
    });

    // Illegal move
    if (move === null) return 'snapback';
    
    updateGameStatus();
    updateMoveHistory();
    
    // If game is over after this move
    if (game.game_over()) {
        setTimeout(() => {
            alert(`Game over! Result: ${getGameResult()}`);
        }, 100);
    }
}

// Update the board position after the piece snap
function onSnapEnd() {
    board.position(game.fen());
}

// Update the game status display
function updateGameStatus() {
    const statusElement = document.querySelector('.game-status');
    
    if (game.in_checkmate()) {
        statusElement.textContent = `Game over, ${game.turn() === 'w' ? 'black' : 'white'} wins by checkmate!`;
    } else if (game.in_draw()) {
        statusElement.textContent = 'Game over, drawn position';
    } else {
        statusElement.textContent = `${game.turn() === 'w' ? 'white' : 'black'}'s turn`;
        if (game.in_check()) {
            statusElement.textContent += ' (check)';
        }
    }
}

// Get game result text
function getGameResult() {
    if (game.in_checkmate()) {
        return `${game.turn() === 'w' ? 'black' : 'white'} wins by checkmate`;
    } else if (game.in_draw()) {
        if (game.in_stalemate()) {
            return 'draw by stalemate';
        } else if (game.in_threefold_repetition()) {
            return 'draw by threefold repetition';
        } else if (game.insufficient_material()) {
            return 'draw by insufficient material';
        } else {
            return 'draw by 50-move rule';
        }
    }
    return 'game still in progress';
}

// Update the move history display
function updateMoveHistory() {
    const moveHistoryElement = document.getElementById('move-history');
    moveHistoryElement.innerHTML = '';
    
    const moves = game.history();
    const movePairs = [];
    
    // Group moves into pairs (white + black)
    for (let i = 0; i < moves.length; i += 2) {
        movePairs.push({
            white: moves[i],
            black: moves[i + 1] || null
        });
    }
    
    // Create move entries
    movePairs.forEach((pair, index) => {
        const moveEntry = document.createElement('div');
        moveEntry.className = 'move-entry';
        
        const moveNumber = document.createElement('div');
        moveNumber.className = 'move-number';
        moveNumber.textContent = `${index + 1}.`;
        
        const moveWhite = document.createElement('div');
        moveWhite.className = 'move-white';
        moveWhite.textContent = pair.white;
        moveWhite.addEventListener('click', () => goToMove(index * 2));
        
        moveEntry.appendChild(moveNumber);
        moveEntry.appendChild(moveWhite);
        
        if (pair.black) {
            const moveBlack = document.createElement('div');
            moveBlack.className = 'move-black';
            moveBlack.textContent = pair.black;
            moveBlack.addEventListener('click', () => goToMove(index * 2 + 1));
            moveEntry.appendChild(moveBlack);
        }
        
        moveHistoryElement.appendChild(moveEntry);
    });
    
    // Scroll to bottom
    moveHistoryElement.scrollTop = moveHistoryElement.scrollHeight;
}

// Go to specific move in history
function goToMove(moveIndex) {
    const moves = game.history({ verbose: true });
    const tempGame = new Chess();
    
    // Replay moves up to the selected one
    for (let i = 0; i <= moveIndex && i < moves.length; i++) {
        tempGame.move(moves[i]);
    }
    
    board.position(tempGame.fen());
}

// New game button
document.getElementById('new-game-btn').addEventListener('click', () => {
    game.reset();
    board.start();
    updateMoveHistory();
    updateGameStatus();
});

// Resign button
document.getElementById('resign-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to resign?')) {
        alert(`You resigned! ${game.turn() === 'w' ? 'black' : 'white'} wins.`);
        game.reset();
        board.start();
        updateMoveHistory();
        updateGameStatus();
    }
});

// Offer draw button
document.getElementById('offer-draw-btn').addEventListener('click', () => {
    alert('Draw offer sent to opponent');
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initChessBoard);
