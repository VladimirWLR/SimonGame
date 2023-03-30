console.log("Working");

var keys = ["green","red","yellow","blue"];
var seq = [];
var pstep = 0;
var level = 1;

function nextSeq(){
        num = Math.floor((Math.random()*4));
        seq.push(num);
        $(document).off("keydown");
        $("#level-title").text("Level "+level);
        console.log(seq);
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
        $(".btn").off("click");
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
    $(".btn").off("click");
    startResetListener();
}

function resetGame(){
    pstep = 0;
    level = 1;
    seq = [];
    $("body").removeClass("game-over",400);
    $("#level-title").text("Press A button to start!!!");
    $(document).off("keydown");
    $(".btn").off("click");
    startKeyListener();
}

function startMouseListener(){
    $(".btn").on("click",function(event) {
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
    $(document).on("keydown",function(event){
        resetGame();
    })
}

function startKeyListener(){
    $(document).on("keydown",function(event){
        if (event.key == "a") {
            nextSeq();
        } 
    })
}

$(document).ready(function(){
    startKeyListener();
})