$(function () {
    var App = function () {
        this.gc = new GameCanvas();
        this.isPaused = false;
//        $(function() {
//            FastClick.attach(document.body);
//        });
    };

    App.prototype.init = function () {
        var me = this;
        this.gc.init();
        $("#controls .pause").click(function () {
            if (!this.isPaused) {
                me.gc.pause();
            }
            me.isPaused = true;
        });
        $("#controls .play").click(function () {
            if (this.isPaused) {
                me.gc.resume();
            } else {
                me.isPaused = false;
                me.gc.play();
            }
        });
        $("#controls .restart").click(function () {
            me.gc.init();
        });
        $("#smallSizeButton").click(function () {
            Properties.rows = Properties.smallTableSize;
            Properties.columns = Properties.smallTableSize;
            Properties.fillFactor = Properties.noOfMines_small;
            me.gc.init();
        });
        $("#mediumSizeButton").click(function () {
            Properties.rows = Properties.mediumTableSize;
            Properties.columns = Properties.mediumTableSize;
            Properties.fillFactor = Properties.noOfMines_medium;
            me.gc.init();
        });
        $("#largeSizeButton").click(function () {
            Properties.rows = Properties.largeTableSize;
            Properties.columns = Properties.largeTableSize;
            Properties.fillFactor = Properties.noOfMines_large;
            me.gc.init();
        });
        
        var howToBtn = '<button type="button" id="howToBtn" class="btn btn-info">\
                            <span class="glyphicon glyphicon-info-sign"></span>\
                        </button>';
            $("#popup .popUpTitle").html("<div class='title'>Minesweeper</div>");
            $("#popup .popUpContent").html(howToBtn+
"<div id='help' style='display:none'><li>Uncover a mine, and the game ends.</li>"+
"<li>Uncover an empty square, and you keep playing.</li>"+
"<li>Uncover a number, and it tells you how many mines lay hidden in the eight surrounding squares, this information you use to deduce which nearby squares are safe to click</li>"+
            "<li>Double click (or long touch on mobile) to identify the mine.</li></div");
            $("#popup").bPopup({
                speed: 450,
                transition: 'slideDown'
            });
        $( "#howToBtn" ).click(function() {
            $( "#help" ).toggle({duration : 500});
        });
        
    };

    new App().init();
});