const gameBoard = (() => {
	let array = ["", "", "", "", "", "", "", "", ""];

	const getArray = () => {
		return array;
	};

	const reset = () => {
		array = ["", "", "", "", "", "", "", "", ""];
	};
	return { array: getArray, reset, getArray };
})();

const player = (name, marker, markerColor) => {
	const boxes = document.querySelectorAll(".box");
	const getName = () => name;
	const getMarker = () => marker;
	const getMarkerColor = () => markerColor;

	const addMarker = (box, marker) => {
		box.innerText = marker;
		box.style.color = getMarkerColor();
	};

	return { getName, getMarker, addMarker };
};

const game = (() => {
	let playerOne;
	let playerTwo;
	let currentPlayer;
	const boxes = document.querySelectorAll(".box");
	let array = gameBoard.getArray();
	let lengthCounter = 0;
	const resetBtn = document.querySelector(".reset");
	resetBtn.addEventListener("click", resetGame);
	const playAgainBtn = document.querySelector(".btn");
    playAgainBtn.addEventListener('click', resetGame);

	const renderMarker = () => {
		let i = 0;
		for (box of boxes) {
			box.innerText = array[i];
			box.setAttribute("data-isclick", "not-clicked");
			box.setAttribute("data-index", `${i}`);
			box.classList.remove("win-boxes");
			i++;
		}
	};

	const displayPlayerNames = (playerOneName, playerTwoName) => {
		const nameSpans = document.querySelectorAll(".player-names");
		nameSpans[0].innerText = playerOneName;
		nameSpans[1].innerText = playerTwoName;
	};

	const highlightPlayerAndMarker = () => {
		const firstNameSpan = document.querySelector("#first");
		const secondNameSpan = document.querySelector("#second");
		const zeroLogo = document.querySelector("#zero");
		const crossLogo = document.querySelector("#cross");

		const unHightlight = (element, logo, logoBgClass) => {
			element.style.color = "black";
			logo.classList.remove(logoBgClass);
		};
		if (currentPlayer === playerOne) {
			unHightlight(secondNameSpan, crossLogo, "highlight-second");
			firstNameSpan.style.color = "rgb(228 87 87)";
			zeroLogo.classList.add("highlight-first");
		} else {
			unHightlight(firstNameSpan, zeroLogo, "highlight-first");
			secondNameSpan.style.color = "rgb(255, 183, 15)";
			crossLogo.classList.add("highlight-second");
		}
	};

	const initialzePlayers = (playerOneName, playerTwoName) => {
		playerOne = player(playerOneName, "O", "rgb(228 87 87)");
		playerTwo = player(playerTwoName, "X", "rgb(255, 183, 15)");
		currentPlayer = playerOne;

		displayPlayerNames(playerOne.getName(), playerTwo.getName());
		highlightPlayerAndMarker();
	};

	const anynamousFunctionHandler = (e) => {
		if (e.target.getAttribute("data-isclick") === "not-clicked") {
			const player = switchPlayer();
			highlightPlayerAndMarker();
			player.addMarker(e.target, player.getMarker());
			const boxIndex = e.target.getAttribute("data-index");
			const array = gameBoard.getArray();
			array[boxIndex] = player.getMarker();
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

	const chnageMatchedBoxColor = (boxOneIndex, boxTwoIndex, boxThreeIndex) => {
		const changeBackground = (box) => {
			box.classList.add("win-boxes");
		};

		boxes.forEach((box) => {
			if (box.getAttribute("data-index") === boxOneIndex)
				changeBackground(box);
			if (box.getAttribute("data-index") === boxTwoIndex)
				changeBackground(box);
			if (box.getAttribute("data-index") === boxThreeIndex)
				changeBackground(box);
		});
	};

	const isRowMathched = (marker) => {
		if (array[0] === marker && array[1] === marker && array[2] === marker) {
			chnageMatchedBoxColor("0", "1", "2");
			return true;
		}
		if (array[3] === marker && array[4] === marker && array[5] === marker) {
			console.log("win");
			chnageMatchedBoxColor("3", "4", "5");
			return true;
		}
		if (array[6] === marker && array[7] === marker && array[8] === marker) {
			console.log("win");
			chnageMatchedBoxColor("6", "7", "8");
			return true;
		}
		if (array[0] === marker && array[3] === marker && array[6] === marker) {
			console.log("win");
			chnageMatchedBoxColor("0", "3", "6");
			return true;
		}
		if (array[1] === marker && array[4] === marker && array[7] === marker) {
			console.log("win");
			chnageMatchedBoxColor("1", "4", "7");
			return true;
		}
		if (array[2] === marker && array[5] === marker && array[8] === marker) {
			console.log("win");
			chnageMatchedBoxColor("2", "5", "8");
			return true;
		}
		if (array[0] === marker && array[4] === marker && array[8] === marker) {
			console.log("win");
			chnageMatchedBoxColor("0", "4", "8");
			return true;
		}
		if (array[2] === marker && array[4] === marker && array[6] === marker) {
			console.log("win");
			chnageMatchedBoxColor("2", "4", "6");
			return true;
		}
	};

	const checkGameOver = () => {
		const isXWinner = isRowMathched("X");
		const isOWinner = isRowMathched("O");

		if (isXWinner) {
			gameOver();
			windowController.showModal(`${playerTwo.getName()} wins!!`);
		} else if (isOWinner) {
			gameOver();
            windowController.showModal(`${playerOne.getName()} wins!!`);
		} else if (checkArrayFilled()) {
            gameOver();
            windowController.showModal('That was a tie!!');
		}
	};

	const checkArrayFilled = () => {
		if (lengthCounter === gameBoard.getArray().length) {
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

	function resetGame() {
		gameBoard.reset();
		array = gameBoard.getArray();
		lengthCounter = 0;
		windowController.showPlayerDetailsWindow();
        windowController.hideModal();
	}
	return { renderMarker, addClickEventOnBox, initialzePlayers };
})();

const windowController = (() => {
	const showPlayerDetailsWindow = () => {
		const hideWindow = document.querySelector(".game-window");
		hideWindow.style.display = "none";
		const showWindow = document.querySelector(".player-details-window");
		showWindow.style.display = "grid";
	};

	const showGameWindow = (playerOneName, playerTwoName) => {
		const hideWindow = document.querySelector(".player-details-window");
		hideWindow.style.display = "none";
		const showWindow = document.querySelector(".game-window");
		showWindow.style.display = "grid";
		game.initialzePlayers(playerOneName, playerTwoName);
		game.renderMarker();
		game.addClickEventOnBox();
	};
    const showModal = (message) => {
        const modal = document.querySelector('.modal');
        const para = document.querySelector('.message');
        modal.style.display = 'flex';
        para.innerText = message;

    }
    const hideModal = () => {
        const modal = document.querySelector('.modal');
        const para = document.querySelector('.message')
        para.innerText = '';
        modal.style.display = 'none';
    }

	return { showPlayerDetailsWindow, showGameWindow, hideModal, showModal };
})();

const playerDetailsWindow = (() => {
	let playerOneName;
	let playerTwoName;
	const playBtn = document.querySelector(".submit");
	playBtn.addEventListener("click", _checkFormFilled);

	const _clearNameFields = (fieldOne, fieldTwo) => {
		fieldOne.value = "";
		fieldTwo.value = "";
	};
	function _checkFormFilled(event) {
		event.preventDefault();
		const playerNames = document.querySelectorAll(".name");
		playerOneName = playerNames[0].value;
		playerTwoName = playerNames[1].value;
		_clearNameFields(playerNames[0], playerNames[1]);

		if (playerOneName !== "" && playerTwoName !== "") {
			windowController.showGameWindow(playerOneName, playerTwoName);
		} else {
			alert("Fill all the fields!!");
		}
	}
})();
