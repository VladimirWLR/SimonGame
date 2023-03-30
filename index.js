console.log("Working");

var keys = ["green","red","yellow","blue"];
var seq = [];
var pstep = 0;
var level = 1;
var buttons = "click";
var page = "keydown";
var headertext = "Press A key";


function nextSeq(){
        num = Math.floor((Math.random()*4));
        seq.push(num);
        $(document).off(page);
        $("#level-title").text("Level "+level);
        playSeq();
}

function playSeq() {
    var i = 0;
    const intervalId = setInterval(() => {
        $("#"+keys[seq[i]]).fadeIn(100).fadeOut(100).fadeIn(100); 
        var audio = new Audio("sounds/"+keys[seq[i]]+'.mp3');
        audio.play();
        i+=1;
        if(i === seq.length){
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
    $(document).off(page);
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
            console.log("keys[seq[pstep]]: "+keys[seq[pstep]]);
            console.log("event.target.id: "+event.target.id);
            rightAnswer();
        }
    })
}

function startResetListener(){
    $(document).on(page,function(event){
        resetGame();
    })
}

function startKeyListener(){
    $(document).on(page,function(event){
        if (event.key == "a") {
            nextSeq();
        } 
    })
}

$(document).ready(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        page = "tap";
        buttons = "tap";
        headertext = "Tap";
        $("#level-title").text(headertext + " to start!!!");
    }
    else {
        $("#level-title").text(headertext + " to start!!!");
    }
    startKeyListener();
})