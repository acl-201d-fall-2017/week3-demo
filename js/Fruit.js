// constructor function for Fruits options
function Fruit (type, src, sliced) {
    this.type = type;
    this.src = src;
    this.sliced = sliced || 0;
}

Fruit.prototype.wasSliced = function () {
    this.sliced += 1;
};

Fruit.prototype.render = function () {
    const ele = document.createElement('img');
    ele.src = this.src;
    // ele.id = 'id';
    ele.classList.add(this.type);
    return ele;
}