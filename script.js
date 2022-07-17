const gameBoard = (() => {

    const gameSquares = document.querySelectorAll('.square');
    const palyerTurnDiv = document.querySelector('.palyer-turn');
    let playing = false;
    let nbrOfRounds = 0;

    const StartPlaying = (playerX, playerO) => {
        console.log("Start Playing... ");

        playing = true;
        playerX.playerTurn = true;
        palyerTurnDiv.innerHTML = `Player ${playerX.name}'s turn `;

        gameSquares.forEach(square => {
            square.addEventListener('click', () => {
                if (playing)
                    playRound(square, playerX, playerO);
            });
        });
    };

    const restart = (playerX, playerO) => {

        playerX.restart();
        playerO.restart();

        playerX.playerTurn = true;
        nbrOfRounds = 0;
        palyerTurnDiv.innerHTML = `Player ${playerX.name}'s turn `;
        gameSquares.forEach(square => { square.innerHTML = ''; });
        playing = true;

    };

    const playRound = (square, playerX, playerO) => {

        nbrOfRounds++;

        if (playerX.isUsedSquar(square.id) || playerO.isUsedSquar(square.id)) {

            console.log("This square is used.")

        } else if (playerX.playerTurn) {

            square.innerHTML = playerX.name;
            playerX.playerTurn = false;
            playerO.playerTurn = true;
            palyerTurnDiv.innerHTML = `Player ${playerO.name}'s turn `;

            playerX.addChosenSquares(square.id);
            playerX.showSquars();
            if (playerX.isWiner()) {

                playing = false;
                palyerTurnDiv.innerHTML = `Player ${playerX.name} has won!`;

            } else if (nbrOfRounds == 9) {

                playing = false;
                palyerTurnDiv.innerHTML = `It's a draw!`;

            }

        } else {

            square.innerHTML = playerO.name;
            playerX.playerTurn = true;
            playerO.playerTurn = false;
            palyerTurnDiv.innerHTML = `Player ${playerX.name}'s turn `;

            playerO.addChosenSquares(square.id);
            playerO.showSquars();
            if (playerO.isWiner()) {

                playing = false;
                palyerTurnDiv.innerHTML = `Player ${playerO.name} has won!`;

            } else if (nbrOfRounds == 9) {

                playing = false;
                palyerTurnDiv.innerHTML = `It's a draw!`;

            }

        }
    };

    return { StartPlaying, restart };
})();

const Player = (name) => {


    let chosenSquares = [];
    let playerTurn = false;

    const showSquars = () => {
        console.log(`${name}: ${chosenSquares}`);
    };

    const isUsedSquar = square => chosenSquares.includes(square);

    const addChosenSquares = square => chosenSquares.push(square);

    const isWiner = () => {

        const winerLines = [
            ['s1', 's2', 's3'],
            ['s4', 's5', 's6'],
            ['s7', 's8', 's9'],
            ['s1', 's4', 's7'],
            ['s2', 's5', 's8'],
            ['s3', 's6', 's9'],
            ['s1', 's5', 's9'],
            ['s3', 's5', 's7']
        ];

        return winerLines.some(
            line => line.every(
                square => chosenSquares.includes(square)
            )
        );
    };

    const restart = () => {
        chosenSquares = [];
        playerTurn = false;
    };

    return { name, playerTurn, addChosenSquares, isUsedSquar, showSquars, isWiner, restart };
};

const playerX = Player("X");
const playerO = Player("O");

gameBoard.StartPlaying(playerX, playerO);

document.querySelector('button').addEventListener('click', () => {
    console.log("Restarting... ");
    gameBoard.restart(playerX, playerO);

});