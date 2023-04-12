import { useState } from "react";
import confetti from "canvas-Confetti";
import {Square} from "./components/Square";
import { TURNS } from "./constants";
import { checkWinnerFrom } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { resetGameStorage, saveGameStorage } from "./logic/storage";

{/*
flujo
1. se crea elemento square
2. se le añade updateBoard al hacer click al square
en el app se crea un estado con valor inicial de un array de 9 posiciones
se crea estado para turn
funcion updateBoard que se le pasa al componente hijo (square)

NOTA: las comparaciones no se hacen con los estados debido a que estos son asincronos

*/}


//aplicaion padre
function App() {

	const [board, setBoard] = useState( () => {
		//si hay partida guardada en local storage recuperarla
		const boardFromStorage = window.localStorage.getItem('board');
		return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
	})

	const [turn, setTurn] = useState( () => {
		const turnFromStorage = window.localStorage.getItem('turn');
		return turnFromStorage ? turnFromStorage : TURNS.X;
	} );

	//null = no hay ganador aun, false = empate
	const [winner, setWinner] = useState(null);

	const checkEndGame = newBoard => {
		//revisamos si hay empate si no hay mas espacios vacios en el tablero
		return newBoard.every(square => square !== null);
	}

	const updateBoard = index => {
		//si ya existe esa posicion en el board no hacemos nd o si ya existe un winner
		if (board[index] || winner) return;

		//creamos newBoard y en la posicion actual tendra el valor de turn
		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		//cambio de turno
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);

		//recibimos lo que devuelve checkWinner al pasarle el newBoard
		const newWinner = checkWinnerFrom(newBoard);
		
		//si en newWinner recibimos una x u o entonces se lo pasamos al estado winner
		if(newWinner){
			confetti();
			setWinner(newWinner);
		}else if(checkEndGame(newBoard)){
			setWinner(false);
			/*solucion githubCopilot
			!newBoard.includes(null) => setWinner(false);*/
		}

		//guardar partida en local storage
		// saveGameStorage(newBoard, newTurn);

		//metodo midu
		saveGameStorage({
			board: newBoard,
			turn: newTurn
		});

	}

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);

		//borrar la partida de local storage
		resetGameStorage();

	}


    return(
        <main className="board">
            <h1>Tic tac toe</h1>
			<button onClick={resetGame}>Reiniciar el juego</button>
			<section className="game">
				{
					board.map((square,index) => {
						return(
							//le pasamos el update board por props al componente hijo
							<Square key={index} index={index} updateBoard={updateBoard}>
								{square}
							</Square>
						)
					})
				}
			</section>

			{/*componente turno, solo para ver de quien es el turno*/}
			<section className="turn">
				<Square isSelected={turn === TURNS.X}>
					{TURNS.X}
				</Square>
				<Square isSelected={turn === TURNS.O}>
					{TURNS.O}
				</Square>
			</section>

			<WinnerModal winner={winner} resetGame={resetGame} />

        </main>
    )
}

export default App
