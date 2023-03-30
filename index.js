console.log("Working");

var keys = ["green","red","yellow","blue"];
var seq = [];
var pstep = 0;
var level = 1;
var buttons = "click.game";
var keyl = "keydown.start";
var keyr = "keydown.reset";
var headertext = "Press A key";
var audio = null;

function nextSeq(){
        num = Math.floor((Math.random()*4));
        seq.push(num);
        $(document).off(keyl);
        $("#level-title").text("Level "+level);
        playSeq();
}

function playSeq() {
    var i = 0;
    const intervalId = setInterval(() => {
        $("#"+keys[seq[i]]).fadeIn(100).fadeOut(100).fadeIn(100); 
        audio = new Audio("sounds/"+keys[seq[i]]+'.mp3');
        audio.play();
        i+=1;
        if(i === seq.length || seq == []){
            clearInterval(intervalId);
        }
    }, 800);
    startMouseListener();
}

function rightAnswer() {
    audio = new Audio("sounds/"+keys[seq[pstep]]+'.mp3');
    audio.play();   
    if((pstep+1)==seq.length){
        level +=1;
        pstep = 0;
        $(".btn").off(buttons);
        nextSeq();
    }
    else {
        pstep+=1;
    }
}

function gameOver() {
    audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("Game Over!!!");
    $("body").addClass("game-over", 100);
    $(".btn").off(buttons);
    startResetListener();
}

function resetGame(){
    pstep = 0;
    level = 1;
    seq = [];
    $("body").removeClass("game-over",400);
    $("#level-title").text(headertext + " to start!!!");
    $("body").off(keyr);
    $(".btn").off(buttons);
    startKeyListener();
}

function startMouseListener(){
    $(".btn").on(buttons,function(event) {
    $("#"+event.target.id).addClass("pressed", 100);
    $("#"+event.target.id).removeClass("pressed", 100);
    if (event.target.id != keys[seq[pstep]]) {
            gameOver();
    }
    else {
            rightAnswer();
        }
    })
}

function startResetListener(){
    $("body").on(keyr,function(event){
        resetGame();
    })
}

function startKeyListener(){
    $(document).on(keyl,function(event){
        if (event.key == "a") {
            nextSeq();
        } 
    })
}

$(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        var buttons = "tap.game";
        var keyl = "tap.start";
        var keyr = "tap.reset";
        headertext = "Tap";
        $("#level-title").text(headertext + " to start!!!");
    }
    else {
        $("#level-title").text(headertext + " to start!!!");
    }
    startKeyListener();
})