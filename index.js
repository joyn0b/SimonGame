
var buttonColour = ["blue","green", "red", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;



$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("level:" + level);
        nextSequence();
        started = true;
    }
});



$(".btn").click (function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});



function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (gamePattern.length===userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
                
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("#level-title").text("Game Over! Press any key to restart");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
            
        }, 1000);
        startOver();
    }
}

function nextSequence (){
    userClickedPattern =[];
    level++;
    $("#level-title").text("level:" + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function animatePress (currentColor){
    $("#"+ currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
        
    }, 200);
} 

function playSound(name){
    var audio = new Audio ("sounds/"+name+".mp3");
    audio.play();
}

function startOver() {

    gamePattern=[];
    level=0;
    started=false;
    
}