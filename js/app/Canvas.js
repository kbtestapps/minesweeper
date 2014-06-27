/**
* Created with minesweeper.
* User: kiranbagul
* Date: 2014-06-24
* Time: 02:39 PM
*/

function GameCanvas() {
  this.grid = [Properties.rows][Properties.columns]; 
}

GameCanvas.prototype.init = function () {  
    var gridObj = this.createGrid();
    this.grid = gridObj.grid;
    $("#grid").html("").unbind();
    this.render();
    this.dashboard = new Dashboard();
    this.dashboard.updateScore(0, gridObj.noOfMines);
};

GameCanvas.prototype.createGrid = function(){
  var arr = [];
  var noOfMines = 0;
  for(var i=0; i < Properties.rows; i++){
      arr.push([]);
      arr[i].push( new Array(Properties.columns));
      for(var j=0; j < Properties.columns; j++){
        var isMinedSuare = this.getMine();
        noOfMines += isMinedSuare ? 1 : 0;  
        arr[i][j] = new SquareBox(i, j, isMinedSuare);
      }
  }
  return { 'grid' : arr, 'noOfMines' : noOfMines}; 
};

GameCanvas.prototype.play = function(){
    this.initEvents();
    this.dashboard.resume();
};

GameCanvas.prototype.pause = function(){
    this.dashboard.pause();
};

GameCanvas.prototype.resume = function(){
    this.dashboard.resume();
};

GameCanvas.prototype.getMine = function(){
	return Math.floor(Math.random() * (Properties.fillFactor +1))/ Properties.fillFactor == 1;
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
    for(var row = 0; row < Properties.rows; row++){
        for(var col = 0; col < Properties.columns; col++){
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
    $("#grid").on("mineTouched", function(){
        me.blastAllMines();
        setTimeout(function(){
            me.dashboard.gameOver(false);
            me.init();
        },2000);
    });
    
    var uncover = function(x, y){
        if(!me.isOutOfBounds(x, y)){
            me.grid[x][y].uncover();
        }
    };
    
    $("#grid").on("uncoverBox", function(e, x, y){
        uncover(x,y-1);
        uncover(x-1,y);
        uncover(x+1,y);
        uncover(x,y+1);
    });
    
    $("#grid").on("mineSet", function () {
        var mines = me.dashboard.incrementScore();
        if(mines.noOfMines === mines.noOfMinesFound){
            for(var row = 0; row < Properties.rows; row++){
                for(var col = 0; col < Properties.columns; col++){
                    var box = me.grid[row][col];
                    if(box.isMine() && !box.isOpen()){
                        return;
                    }
                }
            }
            me.dashboard.gameOver(true);
            me.init();
        }
    });

    $("#grid").on("mineUnset", function () {
        me.dashboard.decrementScore();
    });
};

GameCanvas.prototype.isOutOfBounds = function(x, y){
    return x < 0 || y < 0 || x > Properties.rows - 1 || y > Properties.columns - 1;
};

GameCanvas.prototype.blastAllMines = function(){
     for(var row = 0; row < Properties.rows; row++){
        for(var col = 0; col < Properties.columns; col++){
            (this.grid[row][col]).blast();
        }
    }
};