var buttonColors=["red", "blue", "green", "yellow" ];

var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;


$(document).keypress(function(){
  if(!started){
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }
});



$(".btn").click(function(){
  var userchosencolor= $(this).attr("id");
  userClickedPattern.push(userchosencolor);
  playSound(userchosencolor);
  animatePress(userchosencolor);
  checkAnswer(userClickedPattern.length-1);
});



function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed")
  },100);
}




function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game over ,press any key to Restart");
    startOver();
  }
}

function nextSequence(){
  userClickedPattern=[];
level++;
$("#level-title").text("level "+level);
  var randomNumber=Math.floor(Math.random()*4);
var randomChosenColor=buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
}


function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();

}





function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
