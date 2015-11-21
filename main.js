$(function(){
    
    evaluateHash();
    window.onhashchange = evaluateHash;
    
    var currentDrawFunction = null;
    var keepDrawing;
    
    $('.nav-pills li').click(function() {
        $('.nav-pills > li.active').removeClass('active');
        $(this).addClass('active');
    });
        
});

function loadGame(scriptName) {
    var script = document.createElement( 'script' );
    script.type = "text/javascript";
    script.src = scriptName;
    $("#gameScriptContainer").empty().append(script);
}

function evaluateHash() {
    
    var keepDrawing = false;

    if (location.hash == "#brickbreaker") {
        loadGame("brickbreaker.js");
        currentDrawFunction = drawBrickBreaker;

        /*$.getScript("brickbreaker.js", function( data, textStatus, jqxhr ) {
          console.log( data ); // Data returned
          console.log( textStatus ); // Success
          console.log( jqxhr.status ); // 200
          console.log( "Load was performed." );
        });*/
    }
    else if (location.hash == "#snake") {
        loadGame("snake.js");
        currentDrawFunction = init;
    }
    else if (location.hash == "#more") {
        gameScreenMessage("more");
    }
    else {
        gameScreenMessage("home");
    }

};

function gameScreenMessage(type) {
    keepDrawing = false;
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    var message;
    
    switch (type) {
        case "home":
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            message = "Please select a game. :)";
            break;
        case "more":
            message = "More games soon...";
            break;
        case "pause":
            message = "Game Paused";
            break;
        case "gameover":
            message = "Game Over! :(";
            break;
        default:
            message = "Please select a game. :)";
    }
    
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(43, 62, 80, 0.8)";
    ctx.fill();
    ctx.closePath();

    ctx.font = "32px Futura";
    ctx.fillStyle = "rgb(223, 105, 26)";
    ctx.fillText(message, canvas.width/2-175, canvas.height/2);
}

function unpause() {
    keepDrawing = true;
    currentDrawFunction();
}