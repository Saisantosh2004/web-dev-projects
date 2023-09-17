var buttonColors=["red","green","blue","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var randomChoosenColor;

var started=false;

var level=0;

$(".btn").click(function (){
    var userChoosenColour=$(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animateColour(userChoosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function startgame(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
}

function startOver(){
    gamePattern=[];
    started=false;
    userClickedPattern=[];
    level=0;
}

function nextSequence(){

    level++;

    $("#level-title").text("Level " + level);


    var randomNumber=Math.floor(Math.random()*4);
    randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}

function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animateColour(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function gameOverAnimation(){
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $(document.body).addClass("game-over");
    setTimeout(function() {
        $(document.body).removeClass("game-over");
    },200);
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            userClickedPattern=[];
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        gameOverAnimation();
        startOver();
    }
}

