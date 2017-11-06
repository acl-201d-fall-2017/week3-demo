let clicks = 0;

const apple = new Fruit('apple', 'apple.png');
const watermelon = new Fruit('watermelon', 'watermelon.jpg');
const bomb = new Fruit('bomb', 'bomb.png');

const fruits = [apple,watermelon,bomb];

for (let i = 0; i < 10; i ++) {
    appendRandomFruit();
}

/* attaching event listeners to every image tag */
// const imgs = document.querySelectorAll('img');
// console.log( imgs );

// will give each individual img an event listener
// for (let i = 0; i < imgs.length; i++) {
    //     imgs[i].addEventListener('click', function (e) {
        //         console.log('heard by the img', e.target);
        //     });
        // }
        

// will not work because imgs is not a single element
// imgs.addEventListener('click', clickHandler);


/* demo event propagation */
// const game = document.getElementById('game');
// const main = document.querySelector('main');

// game.addEventListener('click', function (e) {
//     console.log('heard by game', e.target);
// });

// main.addEventListener('click', function (e) {
//     console.log('heard by main', e.target);
// });


const game = document.getElementById('game');
game.addEventListener('click', clickHandler);

function clickHandler (e) {
    const clickedFruit = e.target; // is the html element that was clicked
    
    // will exit the function if the game section was clicked
    if (clickedFruit.id === 'game') return; 

    // looping over fruits array to find the fruit instance to update
    for (let i = 0; i < fruits.length; i ++) {
        const fruitClass = clickedFruit.classList.value;
        if (fruits[i].type === fruitClass) {
            fruits[i].wasSliced();
            console.log('number of slices', fruits[i].sliced);
        }
    }

    // remove element
    clickedFruit.remove();
    
    // render a new element
    appendRandomFruit();
    
    // increase number of times clicked and if over 5, call endGame()
    clicks++;
    if (clicks >= 5) {
        endGame();
    }
}




function appendRandomFruit () {
    const game = document.getElementById('game');

    // select random fruit object from fruits array, save in randomFruit
    randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    const randomFruitEle = randomFruit.render(); // returns img element
    game.appendChild(randomFruitEle);
}

function endGame () {
    // remove click listener on game section
    const game = document.getElementById('game');
    game.removeEventListener('click', clickHandler);

    console.table(fruits);
}