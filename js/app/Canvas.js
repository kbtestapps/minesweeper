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
  this.popupWidth = '500px';    
  if($(window).width() < 800){
    this.rows = 9;
    this.columns = 9;
    this.popupWidth = '200px';   
  }
  this.fillFactor = 20;
  this.grid = [this.rows][this.columns];
  this.noOfMines = 0;
  this.noOfMinesFound = 0;    
}

GameCanvas.prototype.init = function () {
    this.noOfMines = 0;
    this.noOfMinesFound = 0;    
    this.grid = this.createGrid();
    $("#grid").html("");
    $("#grid").unbind();
    this.render();
    this.initEvents();
    this.displayScoreCard();
};

GameCanvas.prototype.createGrid = function(){
  var arr = [];
  for(var i=0; i < this.rows; i++){
      arr.push([]);
      arr[i].push( new Array(this.columns));
      for(var j=0; j < this.columns; j++){
        var isMinedSuare = this.getMine();
        this.noOfMines += isMinedSuare ? 1 : 0;  
        arr[i][j] = new SquareBox(i, j, isMinedSuare);
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
        me.blastAllMines();
        setTimeout(function(){
            new Messi('You stepped on bomb, You lost it buddy ... :( ', {title: 'Ooops ... ', width : me.popupWidth});
            me.init();
        },2000);
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
    
    $("#grid").on("mineSet", function(){
        me.noOfMinesFound++;
        me.displayScoreCard();
        if(me.noOfMinesFound === me.noOfMines){
            new Messi('You nailed it, mission accomplished .. :) ', {title: 'Awesome ... ', width : me.popupWidth});
        }
    });

    $("#grid").on("mineUnset", function(){
        me.noOfMinesFound--;
        me.displayScoreCard();
    });
    
};

GameCanvas.prototype.isOutOfBounds = function(x, y){
    return x < 0 || y < 0 || x > this.rows - 1 || y > this.columns - 1;
};

GameCanvas.prototype.displayScoreCard = function(){
    $("#scoreValue").text(this.noOfMinesFound+"/"+this.noOfMines);
};

GameCanvas.prototype.blastAllMines = function(){
     for(var row = 0; row < this.rows; row++){
        for(var col = 0; col < this.columns; col++){
            var box = this.grid[row][col];
            if(box.isMine()){
                box.getElement().addClass("blast");
            }
        }
    }
};

