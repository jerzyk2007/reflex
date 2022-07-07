const btnStart = document.querySelector('.start');
const btnReset = document.querySelector('.reset');
const divLives = document.querySelector('.lives');
const divScores = document.querySelector('.scores');
const divTime = document.querySelector('.time');
const btnEnd = document.querySelector('.end');
const divEnd = document.querySelector('.divEnd');
const squaresBoard = document.querySelector('.squaresBoard');
const h1EndGameTitle = document.querySelector('.endGameTitle');
const h2EndTitle = document.querySelector('.endTitle');
let losowanie = 0;
let lives = 3;
let scores = 0;
let time = 60;
let buttonFlag = true;
let counterFlag = true;
let squaresCounter = 0;
let timeCounterLostLive = 2000;
let timeOutId;
let timeOutRandomColor;
let engineFlag = true;


// rysowanie kwadratów na tablicy gry
const createSquares = () => {
    const squaresBoard = document.querySelector('.squaresBoard');
    for (let i = 0; i < 25; i++) {
        const square = document.createElement('div');
        squaresBoard.appendChild(square);
        square.classList.add('square');
    }
    squares = document.querySelectorAll('.square');
    squaresCounter = squares.length;
}

// start gry
const startGame = () => {
    time = 60;
    lives = 3;
    scores = 0;
    divLives.textContent = `Życia: ${lives}`;
    divScores.textContent = `Punkty: ${scores}`;
    divTime.textContent = `Czas: ${time} sek`;
    buttonFlag = false;
    counterFlag = true;
    btnStart.style.backgroundColor = "#ddd";
    btnReset.style.backgroundColor = "#2cff07";
}

//silnik gry
const engineGame = () => {
    for (let i = 0; i < 25; i++) {
        squares[i].addEventListener('click', () => {
            if (losowanie == i && engineFlag == true) {
                engineFlag = false;
                window.clearTimeout(timeOutId);
                resetColor();
                timeCounterLostLive = 1000;
                setimeFunkcjaRandomColor();
                scores++;
                divScores.textContent = `Punkty: ${scores}`;
            } else if ((losowanie != i) && (engineFlag == true)) {
                engineFlag = false;
                lostLive();
                if (lives == 0) {
                    endGame();
                }
            }
        })
    }
}

//brak kliknięcia przez dwie sekundy
const noClick = () => {
    resetColor();
    randomColor();
    lostLive()
}

// wywołanie planszy koniec gry
const endGame = () => {
    counterFlag = false;
    divEnd.style.display = "block";
    btnEnd.style.display = "block";
    h1EndGameTitle.textContent = "Koniec Gry";
    h2EndTitle.textContent = `Liczba punktów: ${scores}`
}

// losowanie który kwadrat ma mieć kolor
const randomColor = () => {
    losowanie = Math.floor(Math.random() * squaresCounter)
    squares[losowanie].style.backgroundColor = "#0f0";
    engineFlag = true;
    setimeFunkcja();
}

// licznik czasu gry
const counter = () => {
    divTime.textContent = `Czas: ${time} sek`;
    if ((--time >= 0) && (counterFlag == true)) {
        setTimeout(counter, 1000);
    } else {
        endGame();
    }
    divLives.textContent = `Życia: ${lives}`;
}

//reset koloru
const resetColor = () => {
    for (let i = 0; i < squaresCounter; i++) {
        squares[i].style.backgroundColor = "#fff"
    }
}

// reset gry
const resetGame = () => {
    if (buttonFlag == false) {
        window.clearTimeout(timeOutId);
        window.clearTimeout(timeOutRandomColor);
        resetTable();
        resetColor();
        randomColor();
    }
}

// przycisk Start
btnStart.addEventListener('click', () => {
    if (buttonFlag == true) {
        startGame();
        counter();
        randomColor();
        engineGame();
    }
})

// przycisk OK po zakończeniu gry
btnEnd.addEventListener('click', () => {
    divEnd.style.display = "none";
    buttonFlag = true;
    window.location.reload(true);
})

// przycisk Reset
btnReset.addEventListener('click', () => {
    resetGame()
})

//strata życia
const lostLive = () => {
    window.clearTimeout(timeOutId);
    window.clearTimeout(timeOutRandomColor);
    lives--;
    if (lives > 0) {
        divLives.textContent = `Życia: ${lives}`;
        divEnd.style.display = "block";
        btnEnd.style.display = "none";
        h1EndGameTitle.textContent = "Straciłeś życie";
        h2EndTitle.textContent = `Liczba żyć: ${lives}`
        setTimeout('divEnd.style.display = "none"', 1000)
        resetColor();
        //        randomColor();
        timeCounterLostLive = 2000;
        setimeFunkcjaRandomColor();
    } else {
        endGame();
    }
}

// przywrócenie wartości poczatkowych dla żyć, punktów i czasu
const resetTable = () => {
    lives = 3;
    scores = 0;
    time = 60;
    divLives.textContent = `Życia: ${lives}`;
    divScores.textContent = `Punkty: ${scores}`;
    divTime.textContent = `Czas: ${time} sek`;
}
// settimeout wywoływany przez funkcję
const setimeFunkcja = () => {
    timeOutId = window.setTimeout(lostLive, 2000)
}
// settimeout wywoływany przez funkcję dla randomColor
const setimeFunkcjaRandomColor = () => {
    timeOutRandomColor = window.setTimeout(randomColor, timeCounterLostLive)
}
createSquares();
