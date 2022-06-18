const gameBoard = (() => {
  const array = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
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

  const renderMarker = () => {
    const array = gameBoard.array;
    let i = 0;
    for (box of boxes) {
      box.innerText = array[i];
      i++;
    }
  };

  const addClickEventOnBox = () => {
    boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        const player = checkWhichPlayer();
        player.addMarker(e.target, player.getMarker());
      });
    });
  };

  const checkWhichPlayer = () => {
    if (currentPlayer === playerOne) {
      currentPlayer = playerTwo;
      return playerOne;
    } else {
      currentPlayer = playerOne;
      return playerTwo;
    }
  };
  return { renderMarker, addClickEventOnBox };
})();
