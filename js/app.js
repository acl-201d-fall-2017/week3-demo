let clicks = 0;
let fruits = [];

if (localStorage.fruits) {
    console.log('we has fruit');

    // if we have fruits in localStorage
    // get them, instantiate them, and put them in our fruits array
    
    // fruitsArray is an array of object literals - not Fruits!
    const fruitsArray = JSON.parse(localStorage.fruits);
    console.log('fruitsArray:', fruitsArray);
    
    for (let i = 0; i < fruitsArray.length; i++) {
        // fruitsArray[i] === {type: 'apple', src: 'apple.png', sliced: 1}
        // make sure each fruit has an updated sliced properties
        const fruit = new Fruit(fruitsArray[i].type, fruitsArray[i].src, fruitsArray[i].sliced);
        console.log('current fruit:', fruit);
        console.log('fruits array:', fruits)
        fruits.push(fruit);
    }
} else {
    // if we don't have stored fruit:
    // create new fruits and put them in our fruits array
    const apple = new Fruit('apple', './images/apple.png');
    const watermelon = new Fruit('watermelon', './images/watermelon.jpg');
    const bomb = new Fruit('bomb', './images/bomb.png');
    
    fruits = [apple,watermelon,bomb];
}

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
    if (clicks >= 4) {
        endGame();
    }
}



function appendRandomFruit () {
    const game = document.getElementById('game');

    // select random fruit object from fruits array, save in randomFruit
    randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    const randomFruitEle = randomFruit.render(); // returns img element
    randomFruitEle.style.setProperty('--left-value', Math.floor(Math.random() * 1000) + 25 + 'px');
    randomFruitEle.style.setProperty('--animation-duration', (Math.random() * 1) + 1 +  's');
    game.appendChild(randomFruitEle);
}

function endGame () {
    // remove click listener on game section
    const game = document.getElementById('game');
    game.removeEventListener('click', clickHandler);

    console.table(fruits);
    drawChart();
    // TODO save the fruits in localstorage!
    // JSON.stringify turns an array of objects into a nice string
    localStorage.setItem('fruits', JSON.stringify(fruits));
    // ^ same thing as: localStorage.fruits = fruits;
}

function drawChart () {
  // TODO get canvas element and its context
  const canvas = document.getElementById('endCard');
  canvas.classList.add('done');
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
  const slicedData = []; // [4,2,1]

  for ( let i = 0; i < fruits.length; i++ ){
      fruitNames.push(fruits[i].type);
      slicedData.push(fruits[i].sliced);

      console.log( 'fruitNames:', fruitNames );
      console.log( 'slicedData:', slicedData );
  }

  // TODO add a chart that shows # of slices per fruit
  const chartCanvas = document.getElementById('chart');
  const chartCtx = chartCanvas.getContext('2d');

  Chart.defaults.global.defaultFontColor = '#FFF';
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
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
          }
      }
  );
}