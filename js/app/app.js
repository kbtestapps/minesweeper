$(function(){
                var App = function(){ 
                    this.gc = new GameCanvas(); 
                    this.isPaused = false;
                };
            
                App.prototype.init = function(){
                    var me = this;
                    this.gc.init();
                    $("#controls .pause").click(function(){
                        if(!this.isPaused){
                            me.gc.pause();
                        }
                        me.isPaused = true; 
                    });
                    $("#controls .play").click(function(){
                        if(this.isPaused){
                            me.gc.resume();
                        }else{
                            me.isPaused = false;
                            me.gc.play();
                        } 
                    });
                    $("#controls .restart").click(function(){
                            me.gc.init();
                    });
                    $(".sizeCircle.small").click(function(){
                        Properties.rows = Properties.smallTableSize;
                        Properties.columns = Properties.smallTableSize;
                        me.gc.init();
                    });
                    $(".sizeCircle.medium").click(function(){
                        Properties.rows = Properties.mediumTableSize;
                        Properties.columns = Properties.mediumTableSize;
                        me.gc.init();
                    });
                    $(".sizeCircle.large").click(function(){
                        Properties.rows = Properties.largeTableSize;
                        Properties.columns = Properties.largeTableSize;
                        me.gc.init();
                    });
                    $("#howTo").click(function(){
                        new Messi("The rules in Minesweeper are simple:<br>"+
"<li>Uncover a mine, and the game ends.</li>"+
"<li>Uncover an empty square, and you keep playing.</li>"+
"<li>Uncover a number, and it tells you how many mines lay hidden in the eight surrounding squares, this information you use to deduce which nearby squares are safe to click</li>",
                        {'width': Properties.popupWidth,'modal' : true});
                    });
                };
                
                new App().init();
            });