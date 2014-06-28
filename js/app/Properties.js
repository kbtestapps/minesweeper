function Properties(){}
Properties.smallTableSize = 8;
Properties.mediumTableSize = 14;
Properties.largeTableSize = 20;
Properties.rows = Properties.largeTableSize;
Properties.columns = Properties.largeTableSize;
Properties.popupWidth = '500px';    
if($(window).width() < 768){
  Properties.rows = Properties.smallTableSize;
  Properties.columns = Properties.smallTableSize;
  Properties.popupWidth = '200px';   
}else if($(window).width() < 1024){
  Properties.rows = Properties.mediumTableSize;
  Properties.columns = Properties.mediumTableSize; 
}
Properties.fillFactor = 7;