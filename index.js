console.log("Working");

var keys = ["green","red","yellow","blue"];
var seq = [];
var pstep = 0;
var level = 1;
var ismobile = false;
var headertext = "Press A key";
var audio = null;

function nextSeq(){
        num = Math.floor((Math.random()*4));
        seq.push(num);
        if(ismobile){
            $(".btn-start").off("click.start");
        }
        else{
            $("body").off("keydown.start");
        }
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
            startMouseListener();
        }
    }, 800);
}

function rightAnswer() {
    audio = new Audio("sounds/"+keys[seq[pstep]]+'.mp3');
    audio.play();   
    if((pstep+1)==seq.length){
        level +=1;
        pstep = 0;
        $(".btn").off("click.game");
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
    $(".btn").off("click.game");
    $("#start").text("Reset!");
    startResetListener();
}

function resetGame(){
    pstep = 0;
    level = 1;
    seq = [];
    $("body").removeClass("game-over",400);
    $("#level-title").text(headertext + " to start!!!");
    if(ismobile){
        $(".btn-start").off("click.reset");
        $("#start").text("Start!");
    }
    else{
        $("body").off("keydown.reset");
    }
    $(".btn").off("click.game");
    startKeyListener();
}

function startMouseListener(){
    $(".btn").on("click.game",function(event) {
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
    if (!ismobile) {
        $("body").on("keydown.reset",function(event){
            resetGame();
        })   
    }
    else {
        $(".btn-start").on("click.reset",function(event){
            resetGame();
        })
    }
}

function startKeyListener(){
    if (ismobile) {
        $(".btn-start").on("click.start", function(){
            nextSeq();
        })
    }
    else{
        $("body").on("keydown.start",function(event){
            if (event.key == "a") {
                nextSeq();
            }
        })   
    }
}

$(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        ismobile = true;
        $("#level-title").text(headertext + " to start!!!");
    }
    else{
        $(".btn-start").hide();
    }
    startKeyListener();
})