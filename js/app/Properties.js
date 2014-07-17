function Properties(){}
Properties.smallTableSize = 8;
Properties.mediumTableSize = 14;
Properties.largeTableSize = 20;
Properties.noOfMines_large = 75;
Properties.noOfMines_medium = 40;
Properties.noOfMines_small = 10;
Properties.rows = Properties.largeTableSize;
Properties.columns = Properties.largeTableSize;
Properties.popupWidth = '500px';    
Properties.fillFactor = Properties.noOfMines_large;
if($(window).width() < 768){
  Properties.fillFactor = Properties.noOfMines_small;
  Properties.rows = Properties.smallTableSize;
  Properties.columns = Properties.smallTableSize;
  Properties.popupWidth = '200px';   
}else if($(window).width() < 1024){
  Properties.fillFactor = Properties.noOfMines_medium;
  Properties.rows = Properties.mediumTableSize;
  Properties.columns = Properties.mediumTableSize; 
}