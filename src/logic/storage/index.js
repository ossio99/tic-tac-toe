// export const saveGameStorage = (board, turn) => {
//     window.localStorage.setItem('board', JSON.stringify(board));
// 	window.localStorage.setItem('turn', turn);
// }

//metodo midu
export const saveGameStorage = ({board, turn}) => {
    window.localStorage.setItem('board', JSON.stringify(board));
	window.localStorage.setItem('turn', turn);
}

export const resetGameStorage = () => {
    window.localStorage.removeItem('board');
	window.localStorage.removeItem('turn');
}