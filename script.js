const gameBoard = (() => {
	const array = ["", "", "", "", "", "", "", "", ""];
	return { array };
})();

const player = (name, marker) => {
	const boxes = document.querySelectorAll(".box");
	const getName = () => name;
	const getMarker = () => marker;

	const addMarker = (box, marker) => {
		box.innerText = marker;
	};

	return { getName, getMarker, addMarker };
};

const game = (() => {
	const playerOne = player("Mudit", "X");
	const playerTwo = player("Rohan", "O");
	const boxes = document.querySelectorAll(".box");
	const defaultPlayer = playerOne;
	let currentPlayer = defaultPlayer;
	const array = gameBoard.array;
	let lengthCounter = 0;

	const renderMarker = () => {
		let i = 0;
		for (box of boxes) {
			box.innerText = array[i];
			box.setAttribute("data-isclick", "not-clicked");
			box.setAttribute("data-index", `${i}`);
			i++;
		}
	};

	const anynamousFunctionHandler = (e) => {
		if (e.target.getAttribute("data-isclick") === "not-clicked") {
			const player = switchPlayer();
			player.addMarker(e.target, player.getMarker());
			const boxIndex = e.target.getAttribute("data-index");
			gameBoard.array[boxIndex] = player.getMarker();
			e.target.setAttribute("data-isclick", "clicked");
			lengthCounter++;
			checkGameOver();
		}
	};

	const addClickEventOnBox = () => {
		boxes.forEach((box) => {
			box.addEventListener("click", anynamousFunctionHandler);
		});
	};

	const switchPlayer = () => {
		if (currentPlayer === playerOne) {
			currentPlayer = playerTwo;
			return playerOne;
		} else {
			currentPlayer = playerOne;
			return playerTwo;
		}
	};

	const checkGameOver = () => {
		if (
			(array[0] === "X" && array[1] === "X" && array[2] === "X") ||
			(array[0] === "O" && array[1] === "O" && array[2] === "O")
		) {
			console.log("win");
			gameOver();
		}
		if (
			(array[3] === "X" && array[4] === "X" && array[5] === "X") ||
			(array[3] === "O" && array[4] === "O" && array[5] === "O")
		) {
			console.log("win");
			gameOver();
		}
		if (
			(array[6] === "X" && array[7] === "X" && array[8] === "X") ||
			(array[6] === "O" && array[7] === "O" && array[8] === "O")
		) {
			console.log("win");
			gameOver();
		}
		if (
			(array[0] === "X" && array[3] === "X" && array[6] === "X") ||
			(array[0] === "O" && array[3] === "O" && array[6] === "O")
		) {
			console.log("win");
			gameOver();
		}
		if (
			(array[1] === "X" && array[4] === "X" && array[7] === "X") ||
			(array[1] === "O" && array[4] === "O" && array[7] === "O")
		) {
			console.log("win");
			gameOver();
		}
		if (
			(array[2] === "X" && array[5] === "X" && array[8] === "X") ||
			(array[2] === "O" && array[5] === "O" && array[8] === "O")
		) {
			console.log("win");
			gameOver();
		}
		if (
			(array[0] === "X" && array[4] === "X" && array[8] === "X") ||
			(array[0] === "O" && array[4] === "O" && array[8] === "O")
		) {
			console.log("win");
			gameOver();
		}
		if (
			(array[2] === "X" && array[4] === "X" && array[6] === "X") ||
			(array[2] === "O" && array[4] === "O" && array[6] === "O")
		) {
			console.log("win");
			gameOver();
		}
		if (checkArrayFilled()) {
			console.log("Tie");
			gameOver();
		}
	};

	const checkArrayFilled = () => {
		if (lengthCounter === gameBoard.array.length) {
			return true;
		}
		return false;
	};

	const gameOver = () => {
		removeClickEventOnBox();
	};

	const removeClickEventOnBox = () => {
		boxes.forEach((box) => {
			box.removeEventListener("click", anynamousFunctionHandler);
		});
	};
	return { renderMarker, addClickEventOnBox };
})();

const windowController = (() => {
	const showPlayerDetailsWindow = () => {
		const window = document.querySelector(".player-details-window");
		window.style.display = "grid";
	};

	const showGameWindow = () => {
		const window = document.querySelector(".game-window");
		window.style.display = "grid";
        game.renderMarker();
        game.addClickEventOnBox();
	};

	const hidePlayerDetailsWindow = () => {
		const window = document.querySelector(".player-details-window");
		window.style.display = "none";
	};
	return { showPlayerDetailsWindow, showGameWindow, hidePlayerDetailsWindow };
})();

const playerDetailsWindow = (() => {
	let playerOneName;
	let playerTwoName;
	const playBtn = document.querySelector(".submit");
	playBtn.addEventListener("click", _checkFormFilled);

	function _checkFormFilled(event) {
        event.preventDefault();
		const playerNames = document.querySelectorAll(".name");
		playerOneName = playerNames[0].value;
		playerTwoName = playerNames[1].value;

		if (playerOneName !== "" && playerTwoName !== "") {
			windowController.hidePlayerDetailsWindow();
			windowController.showGameWindow();
		} else {
			alert("Fill all the fields!!");
		}
	}
})();
