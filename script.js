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
      box.setAttribute('data-isclick', 'not-clicked');
      i++;
    }
  };

  const addClickEventOnBox = () => {
    boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        console.log(e.target.getAttribute('data-isclick'));
        if (e.target.getAttribute('data-isclick') === 'not-clicked') {
            const player = checkWhichPlayer();
            player.addMarker(e.target, player.getMarker());
            e.target.setAttribute('data-isclick', 'clicked');
        }
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

  const removeClickEventFromBox = (box) => {
    box.removeEventListener("click", () => {});
  };
  return { renderMarker, addClickEventOnBox };
})();
