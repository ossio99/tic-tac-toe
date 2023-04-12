import { winnerCombos } from "../constants";

//checar winner al recibir un board
export const checkWinnerFrom = boardToCheck => {
    for(const combo of winnerCombos){
        const [a,b,c] = combo;
        if (
            //revisamos todas las combinaciones ganadoras
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ){
            return boardToCheck[a];
        }
    }
    return null;
}