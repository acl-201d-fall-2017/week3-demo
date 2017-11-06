// constructor function for Fruits options
function Fruit ( type, src ) {
    this.type = type;
    this.src = './images/' + src;
    this.sliced = 0;
}

Fruit.prototype.wasSliced = function () {
    this.sliced += 1;
};

Fruit.prototype.render = function () {
    const ele = document.createElement('img');
    ele.src = this.src;
    ele.class = this.type;
    return ele;
}