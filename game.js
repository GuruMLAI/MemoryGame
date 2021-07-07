var pattern = [];
var roundCounter = 0;
var level = 0;
var colors = ["red", "yellow", "green", "blue"];

// $(".btn").click(function(event){
//     console.log(event.currentTarget.id);
// })
function chooseNewColor(){
    return colors[Math.floor(Math.random()*4)];
}

function buttonRingOut(id){
    
    $("#"+id).addClass("pressed");
    var audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
    setTimeout(function(){
    $("#"+id).removeClass("pressed");
    }, 100);
    
}

function addNewMember(pat){
    var level = pat.length + 1;
    $("#level-title").text("Level " + level);
    var new_member = chooseNewColor();
    buttonRingOut(new_member);
    pat = pat.concat([new_member]);

    return pat

}

// function failAttempt(){
//     pattern = [];
//     $("#level-title").text()
// }

$(".btn").click(function(event){
    // debugger;
    if (event.currentTarget.id === pattern[roundCounter]){
        roundCounter++;
        buttonRingOut(event.currentTarget.id);
        
        if (pattern.length === roundCounter){
            setTimeout(function(){
                pattern = addNewMember(pattern);
            },1000)
            
            roundCounter = 0;
        }
    }
    else {
        pattern = [];
        roundCounter = 0;
        $("#level-title").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);
    }

})


$(document).keydown(function(){
    // debugger;
    if (!$("#level-title").text().startsWith("Level")){
        pattern = [];
        pattern = addNewMember(pattern);
        roundCounter = 0;
    }
})
