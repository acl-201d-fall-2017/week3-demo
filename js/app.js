let clicks = 0;

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
    if (clicks >= 2) {
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
    drawChart();
}

function drawChart () {
  // TODO get canvas element and its context
  const canvas = document.getElementById('endCard');
  const context = canvas.getContext('2d');

  // TODO add some graphics to our canvas
  context.fillStyle = 'rgba(200,100,200,1)';
  context.fillRect(0,0,200,200);

  // TODO add text that says "Game over!"
  context.font = '20px sans-serif';
  for (let i = 0; i < 10; i++) {
      context.strokeText('GAME OVER', 200, 200);
  }

  const fruitNames = [];
  const slicedData = [];

  for ( let i = 0; i < fruits.length; i++ ){
      fruitNames.push(fruits[i].type);
      slicedData.push(fruits[i].sliced);

      console.log( 'fruitNames:', fruitNames );
      console.log( 'slicedData:', slicedData );
  }

  // TODO add a chart that shows # of slices per fruit
  const chartCanvas = document.getElementById('chart');
  const chartCtx = chartCanvas.getContext('2d');

  const chart = new Chart (
      chartCtx, // first param is the canvas context
      { // first level children: type, data, options
          type: 'bar',
          data: { // data's children: labels, datasets
              labels: fruitNames, // ['apple','watermelon','bomb'], // y axis labels
              datasets: [
                  { // dataset object's children: label, data, backgroundColor
                      label: 'Number of slices',
                      data: slicedData, // [5,2,0], // data points
                      backgroundColor: 'rgba(255,100,20,1)'
                  }
              ]
          },
          options: {
              title: {
                  display: true,
                  text: 'Fruits Sliced'
              }
          }
      }
  );
}