{/*componente square*/}
{/*recibe la funcion update board del padre*/}
export const Square = ({ children, isSelected, updateBoard, index }) => {
	const className = `square ${isSelected ? 'is-selected' : ''}`;

	const handleClick = () => {
		//de donde sale el index??
		updateBoard(index);
	}

	return (
		<div onClick={handleClick} className={className}>
			{children}
		</div>
	)
}