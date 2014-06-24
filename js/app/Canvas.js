/**
* Created with minesweeper.
* User: kiranbagul
* Date: 2014-06-24
* Time: 02:39 PM
* To change this template use Tools | Templates.
*/

function GameCanvas() {
  this.rows = 20;
  this.columns = 20;
  this.fillFactor = 10;
  this.grid = [this.rows][this.columns];
}

GameCanvas.prototype.init = function () {
    this.grid = this.createGrid();
    $("#grid").html("");
    $("#grid").unbind();
    this.render();
    this.initEvents();
};

GameCanvas.prototype.createGrid = function(){
  var arr = [];
  for(var i=0; i < this.rows; i++){
      arr.push([]);
      arr[i].push( new Array(this.columns));
      for(var j=0; j < this.columns; j++){
        arr[i][j] = new SquareBox(i, j, this.getMine());
      }
  }
  return arr;
};

GameCanvas.prototype.getMine = function(){
	return Math.floor(Math.random() * (this.fillFactor +1))/ this.fillFactor == 1;
};

GameCanvas.prototype.getNumberAtLocation = function(x, y){
    var no = 0;
    no += this.isMineAt(x-1, y-1) ? 1 :  0;
    no += this.isMineAt(x, y-1) ? 1 :  0;
    no += this.isMineAt(x+1, y-1) ? 1 :  0;
    no += this.isMineAt(x-1, y) ? 1 :  0;
    no += this.isMineAt(x+1, y) ? 1 :  0;
    no += this.isMineAt(x-1, y+1) ? 1 :  0;
    no += this.isMineAt(x, y+1) ? 1 :  0;
    no += this.isMineAt(x+1, y+1) ? 1 :  0;
    return no;
};

GameCanvas.prototype.isMineAt = function(x, y){
    if(this.isOutOfBounds(x,y)){
        return false;
    }
    return this.grid[x][y].isMine();
};

GameCanvas.prototype.render = function () {
    var grid = $("#grid");
    for(var row = 0; row < this.rows; row++){
        for(var col = 0; col < this.columns; col++){
            var value= this.getNumberAtLocation(row, col);
            var box = this.grid[row][col];
            box.setValue(value);
            grid.append(box.getElement());
        }
        grid.append("<br>");
    }
};

GameCanvas.prototype.initEvents = function(){
    var me = this;
    $("#grid").on("mineUncovered", function(){
        alert("Game Over");
        me.init();
    });
    
    var uncover = function(x, y){
        if(!me.isOutOfBounds(x, y)){
            me.grid[x][y].uncover();
        }
    };
    
    $("#grid").on("uncoverBox", function(e, x, y){
        uncover(x-1, y-1);
        uncover(x,y-1);
        uncover(x+1,y-1);
        uncover(x-1,y);
        uncover(x+1,y);
        uncover(x-1,y+1);
        uncover(x,y+1);
        uncover(x+1,y+1);
    });
    
};

GameCanvas.prototype.isOutOfBounds = function(x, y){
    return x < 0 || y < 0 || x > this.rows - 1 || y > this.columns - 1;
};

