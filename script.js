const gameBoard = (() => {
    const array = () => ['x','o','x','o','x','o','x','o','x'];
    return {array}
})();

const player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    const addMarker = (box) => {
        box.innerText = 'X';
    }
    return {getName, getMarker, addMarker}
}

const game = (() => {
    const boxes = document.querySelectorAll('.box');
    const playerOne = player('Mudit', 'O');

    const renderMarker = () => {
        const array = gameBoard.array();
        let i = 0;
        for (box of boxes) {
            box.innerText = array[i];
            i++;
        }
    }

    const addClickEventOnBox = () => {
        boxes.forEach(box => {
            box.addEventListener('click', (e) =>{
               playerOne.addMarker(e.target);
            });
        });
    }
    return {renderMarker, addClickEventOnBox};
})();
