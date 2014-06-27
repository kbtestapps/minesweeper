function Dashboard() {
    this.timerLayout = '<span class="image{h10}"></span><span class="image{h1}"></span>' + 
        '<span class="imageSep"></span>' + 
        '<span class="image{m10}"></span><span class="image{m1}"></span>' + 
        '<span class="imageSep"></span>' + 
        '<span class="image{s10}"></span><span class="image{s1}"></span>';
    this.init();
}

Dashboard.prototype.updateScore = function (noOfMinesFound, noOfMines) {
    this.noOfMinesFound = noOfMinesFound;
    this.noOfMines = noOfMines;
    this.renderScore();
};

Dashboard.prototype.renderScore = function () {
    this.progress.setValue(this.noOfMinesFound + "/" + this.noOfMines);
    this.progress.setProgress(this.noOfMinesFound / this.noOfMines);
    $("#scoreValue").text(this.noOfMinesFound + "/" + this.noOfMines);
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
    this.progress = $("#progress").percentageLoader({
        width: 180,
        height: 180,
        progress: 0
    });
    $('#timer').countdown('destroy');
    $('#timer').countdown({since: new Date(), compact: true, layout : this.timerLayout });
    this.pause();
};

Dashboard.prototype.gameOver = function (status) {
    $('#timer').countdown('pause');
    var title = "Ooops..";
    var msg = "You stepped on bomb, You lost it buddy ... :( ";
    var titleClass = status ? "anim success" : "anim error";
    if(status){
        title = "Awesome ... ";
        msg = "You nailed it, mission accomplished .. :) ";
    }
    new Messi(msg, {
        'title': title,
        'width': Properties.popupWidth,
        'titleClass' : titleClass,
        'modal' : true
    }); 
    
};

Dashboard.prototype.pause = function(){
    $('#timer').countdown('pause');
    $('.controlButton.pause').addClass('selectedControlButton');
    $('.controlButton.play').removeClass('selectedControlButton');
    $('#grid').children().addClass('pausedGame disabled');
};

Dashboard.prototype.resume = function(){
    $('#timer').countdown('resume');
    $('.controlButton.pause').removeClass('selectedControlButton');
    $('.controlButton.play').addClass('selectedControlButton');
    $('#grid').children().removeClass('pausedGame disabled');
};