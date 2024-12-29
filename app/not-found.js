'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './styles/notFound.css';

export default function NotFound() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isGameOver, setIsGameOver] = useState(false);
    const [difficulty, setDifficulty] = useState(null); // null, 'easy', 'medium', 'hard'
    const [playerSymbol, setPlayerSymbol] = useState(null); // null, 'X', 'O'
    const [isComputerTurn, setIsComputerTurn] = useState(false);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {
                    winner: squares[a],
                    line: [a, b, c]
                };
            }
        }
        return null;
    };

    const findBestMove = (squares) => {
        // Random move for easy mode
        if (difficulty === 'easy') {
            const availableMoves = squares.map((square, i) => square === null ? i : null).filter(i => i !== null);
            if (availableMoves.length > 0) {
                return availableMoves[Math.floor(Math.random() * availableMoves.length)];
            }
            return -1;
        }

        // For medium mode: 50% chance to make a random move
        if (difficulty === 'medium' && Math.random() < 0.5) {
            const availableMoves = squares.map((square, i) => square === null ? i : null).filter(i => i !== null);
            if (availableMoves.length > 0) {
                return availableMoves[Math.floor(Math.random() * availableMoves.length)];
            }
            return -1;
        }

        // Smart moves for medium and hard mode
        const winMove = findWinningMove(squares, 'O');
        if (winMove !== -1) return winMove;

        // Block player's winning move (only in hard mode or 50% chance in medium)
        const blockMove = findWinningMove(squares, 'X');
        if (blockMove !== -1 && (difficulty === 'hard' || (difficulty === 'medium' && Math.random() < 0.7))) {
            return blockMove;
        }

        // Strategic moves for hard mode
        if (difficulty === 'hard') {
            // Take center if available
            if (squares[4] === null) return 4;

            // Take corners
            const corners = [0, 2, 6, 8];
            const availableCorners = corners.filter(i => squares[i] === null);
            if (availableCorners.length > 0) {
                return availableCorners[Math.floor(Math.random() * availableCorners.length)];
            }
        }

        // Take any available side
        const sides = [1, 3, 5, 7];
        const availableSides = sides.filter(i => squares[i] === null);
        if (availableSides.length > 0) {
            return availableSides[Math.floor(Math.random() * availableSides.length)];
        }

        // Take any available move
        const availableMoves = squares.map((square, i) => square === null ? i : null).filter(i => i !== null);
        if (availableMoves.length > 0) {
            return availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }
        return -1;
    };

    const findWinningMove = (squares, player) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (squares[a] === player && squares[b] === player && squares[c] === null) return c;
            if (squares[a] === player && squares[c] === player && squares[b] === null) return b;
            if (squares[b] === player && squares[c] === player && squares[a] === null) return a;
        }
        return -1;
    };

    const makeComputerMove = () => {
        const newBoard = [...board];
        const move = findBestMove(newBoard);
        if (move !== -1) {
            newBoard[move] = playerSymbol === 'X' ? 'O' : 'X';
            setBoard(newBoard);
            setIsComputerTurn(false);
        }
    };

    useEffect(() => {
        const result = calculateWinner(board);
        const isDraw = !result && board.every(cell => cell);
        
        if (result || isDraw) {
            setIsGameOver(true);
        } else if (isComputerTurn && !isGameOver && difficulty) {
            const timer = setTimeout(() => {
                makeComputerMove();
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [board, isGameOver, difficulty, isComputerTurn]);

    const handleClick = (i) => {
        if (!difficulty || !playerSymbol || board[i] || isGameOver || calculateWinner(board) || isComputerTurn) return;
        
        const newBoard = [...board];
        newBoard[i] = playerSymbol;
        setBoard(newBoard);
        setIsComputerTurn(true);
    };

    const startGame = (level) => {
        setDifficulty(level);
    };

    const selectSymbol = (symbol) => {
        setPlayerSymbol(symbol);
        setIsComputerTurn(symbol === 'O');
        setBoard(Array(9).fill(null));
        setIsGameOver(false);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsGameOver(false);
        setDifficulty(null);
        setPlayerSymbol(null);
        setIsComputerTurn(false);
    };

    const result = calculateWinner(board);
    const winner = result?.winner;
    const winningLine = result?.line || [];
    const isDraw = !result && board.every(cell => cell);
    const status = !difficulty ? "Select difficulty to start" :
                  !playerSymbol ? "" :
                  winner ? `Winner: ${winner}` : 
                  isDraw ? "It's a Draw!" : 
                  isComputerTurn ? "Computer is thinking..." : 
                  "Your turn";

    return (
        <div className="not_found_container">
            {!difficulty && (
                <>
                    <h1 className="not_found_title">404</h1>
                    <p className="not_found_text">
                        Page not found. Challenge the computer to a game?
                    </p>
                </>
            )}
            
            <div className={`game_container ${difficulty ? 'game_active' : ''}`}>
                <div className={`game_status ${winner ? 'winner' : isDraw ? 'draw' : ''}`}>
                    {status}
                </div>
                {!difficulty ? (
                    <div className="difficulty_buttons">
                        <button className="difficulty_button easy" onClick={() => startGame('easy')}>Easy</button>
                        <button className="difficulty_button medium" onClick={() => startGame('medium')}>Medium</button>
                        <button className="difficulty_button hard" onClick={() => startGame('hard')}>Hard</button>
                    </div>
                ) : !playerSymbol ? (
                    <div className="symbol_selection">
                        <p className="symbol_text">Select your symbol</p>
                        <div className="symbol_buttons">
                            <button 
                                className={`symbol_button ${playerSymbol === 'X' ? 'selected' : ''}`} 
                                onClick={() => selectSymbol('X')}
                            >
                                X
                            </button>
                            <button 
                                className={`symbol_button ${playerSymbol === 'O' ? 'selected' : ''}`} 
                                onClick={() => selectSymbol('O')}
                            >
                                O
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="board">
                            {board.map((value, i) => (
                                <button
                                    key={i}
                                    className={`cell ${
                                        winner && winningLine.includes(i) ? 'winner' : 
                                        isDraw ? 'draw' : ''
                                    }`}
                                    onClick={() => handleClick(i)}
                                    disabled={board[i] || isGameOver || calculateWinner(board) || isComputerTurn}
                                >
                                    <span>{value}</span>
                                </button>
                            ))}
                        </div>
                        <div className="button_container">
                            <button className="reset_button" onClick={resetGame}>
                                New Game
                            </button>
                            <Link href="/" className="reset_button">
                                Home
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
