/**
* Created with minesweeper.
* User: kiranbagul
* Date: 2014-06-24
* Time: 02:47 PM
*/


function SquareBox(x, y, isMine) {
  this.x = x;
  this.y = y;
  this.value = 0;
  this.mine = isMine;
  this.ele = this.getElement();
  this.displayed = false;
  this.isMineSet = false;
}

SquareBox.prototype.isMine = function () {
	return this.mine;
};

SquareBox.prototype.setValue = function (value) {
	this.value = value;
};

SquareBox.prototype.getElement = function(){
    if(!this.ele){
        var template = _.template('<button class="box">&nbsp;</button>');
        var html = template({ mine: this.mine });
        var ele = $(html);
        var me = this;
        ele.click(function(){
            var $this = $(this);
            if ($this.hasClass('clicked')){
                $this.removeClass('clicked'); 
                if(me.isMineSet){
                    me.isMineSet = false;
                    ele.removeClass("mined");
                    $("#grid").trigger("mineUnset");
                }else if(!me.displayed){
                    me.isMineSet = true;
                    ele.addClass("mined");
                    $("#grid").trigger("mineSet");
                }
                return;
            }else{
                $this.addClass('clicked');
                setTimeout(function() {
                    if($this.hasClass('clicked')){
                        $this.removeClass('clicked');
                        if(me.isMineSet){
                            return;
                        }
                        if(me.mine){
                            $("#grid").trigger("mineUncovered");
                        }else{
                            if(!me.displayed){
                                me.displayed = true;
                                $this.addClass("val"+me.value);
                                if(me.value === 0){
                                     $("#grid").trigger("uncoverBox", [me.x, me.y]);
                                }else{
                                    $this.text(me.value);
                                }
                            }
                        }
                    }
                },300);
            }
        });
        return ele;
    }
    return this.ele;
};

SquareBox.prototype.uncover = function(){
    if(!this.displayed && !this.isMineSet){
        this.displayed = true;
        $(this.ele).addClass("val"+this.value);
        if(this.value===0){
            $("#grid").trigger("uncoverBox", [this.x, this.y]);
        }else{
            $(this.ele).text(this.value);
        }
    }
};




