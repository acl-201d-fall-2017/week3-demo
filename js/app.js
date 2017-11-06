let clicks = 0;
let randomFruit;

const apple = new Fruit('apple', 'apple.png');
const watermelon = new Fruit('watermelon', 'watermelon.jpg');
const bomb = new Fruit('bomb', 'bomb.png');

const fruits = [apple,watermelon,bomb];

for (let i = 0; i < 10; i ++) {
    appendRandomFruit();
}

const game = document.getElementById('game');
game.addEventListener('click', clickHandler);

function clickHandler (e) {
    const clickedFruit = e.target;
    console.log(clickedFruit);

    // if (clickedFruit.class === 'bomb') {
    //     alert('kaboom! game over');
    //     endGame();
    // }

    // randomFruit.wasSliced();
    // clickedFruit.remove();
    // clicks++;

    // if (clicks > 5) {
    //     endGame();
    // }
}

function appendRandomFruit () {
    const game = document.getElementById('game');
    randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    const randomFruitEle = randomFruit.render();
    game.appendChild(randomFruitEle);

    // if (randomFruit.type === 'bomb') {
    //     setTimeout(function () {
    //         game.removeChild(randomFruitEle);    
    //     }, 2000);
    // }
}

function endGame () {
    const game = document.getElementById('game');
    game.removeEventListener('click', clickHandler);
    clearInterval(play);

    console.table(fruits);
}