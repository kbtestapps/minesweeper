function Dashboard() {
    this.timerLayout = '{h10}{h1}:{m10}{m1}:{s10}{s1}';
    this.init();

}

Dashboard.prototype.updateScore = function (noOfMinesFound, noOfMines) {
    this.noOfMinesFound = noOfMinesFound;
    this.noOfMines = noOfMines;
    this.renderScore();
};

Dashboard.prototype.renderScore = function () {
    var progressBarWidth = (this.noOfMinesFound * $(".progress").width() ) / this.noOfMines; 
    $("#progressBar").width(progressBarWidth+"px");
    $(".progress-value").html(this.noOfMinesFound + "/" + this.noOfMines);
};

Dashboard.prototype.incrementScore = function () {
    this.noOfMinesFound++;
    this.renderScore();
    return { 'noOfMinesFound' : this.noOfMinesFound, 'noOfMines' : this.noOfMines};
};

Dashboard.prototype.decrementScore = function () {
    this.noOfMinesFound--;
    this.renderScore();
    return { 'noOfMinesFound' : this.noOfMinesFound, 'noOfMines' : this.noOfMines};
};

Dashboard.prototype.init = function () {
    this.noOfMinesFound = 0;
    this.noOfMines = 0;
    $("#progress").html("");
    $('#timer').countdown('destroy');
    $('#timer').countdown({since: new Date(), compact: true, layout : this.timerLayout });
    this.pause();
};

Dashboard.prototype.gameOver = function (status) {
    $('#timer').countdown('pause');
    var title = "Ooops..";
    var msg = "You stepped on bomb, You lost it buddy ... :( ";
    if(arguments.length === 0){
        msg = "Placed markers at wrong places .. lost :( ";
    }
    var backgroundColor = status ? 'rgb(56, 129, 151)' : 'rgb(71, 38, 38)';
    if(status){
        title = "Awesome ... ";
        msg = "You nailed it, mission accomplished .. :) ";
    }
    $("#popup .popUpTitle").html(title);
    $("#popup .popUpContent").html(msg);
    $('#popup').bPopup({
            fadeSpeed: 600, 
            followSpeed: 1500, 
            modalColor: backgroundColor
        });
    
};

Dashboard.prototype.pause = function(){
    $('#timer').countdown('pause');
    $('.controlButton.pause').addClass('selectedControlButton');
    $('.controlButton.play').removeClass('selectedControlButton');
    $('#grid tr td').children().addClass('pausedGame disabled');
};

Dashboard.prototype.resume = function(){
    $('#timer').countdown('resume');
    $('.controlButton.pause').removeClass('selectedControlButton');
    $('.controlButton.play').addClass('selectedControlButton');
    $('#grid tr td').children().removeClass('pausedGame disabled');
};