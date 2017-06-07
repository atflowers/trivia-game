var answers = [4,1,2,1,4,3,4,1,3,3,4,2];
var qName = "";
var ansCorrect; // initialized in reset function
var timeLeft; // initialized in reset function
var timerID; // clock control variable


// Music Files
var musicOpen = document.createElement('audio');
musicOpen.setAttribute('src', 'assets/music/3s Opening.mp3');
var musicBumper = document.createElement('audio');
musicBumper.setAttribute('src', 'assets/music/3s Bumper.mp3');
var musicPlaying = document.createElement('audio');
musicPlaying.setAttribute('src', 'assets/music/3s Playing.mp3');
var musicEnd = document.createElement('audio');
musicEnd.setAttribute('src', 'assets/music/3s Ending.mp3');
var clockTick = document.createElement('audio');
clockTick.setAttribute('src', 'assets/music/clockTick.mp3');

$( document ).ready(function() {
	reset();

	musicOpen.play();

	$("button[name='btnStart']").click(function(){
    	$("#start-page").hide();
    	$("#main-container").show();
    	$("#time-container").show();
    	musicOpen.pause();
    	
    	playGame();
	});

	$("button[name='qEnd']").click(function(){
 		bumper();
	});

	$("button[name='btnReplay']").click(function(){
		reset();
    	$("#end-page").hide();
    	$("#main-container").show();
    	$("#time-container").show();
    	musicEnd.pause();
    	musicPlaying.play();

    	playGame();
	});
});

function reset() {
	for (var i = 0; i < answers.length; i++) {
		qName = "q" + (i + 1);
		$("input[name='" + qName + "']").prop('checked', false);
	}
	ansCorrect = 0;
	timeLeft = 40;
	$("#time-left").html(timeLeft);
	$("#time-left").css("color", "black");
	console.log("The timeLeft variable is " + timeLeft);
}

function checkScore() {
	for (var i = 0; i < answers.length; i++) {
		qName = "q" + (i + 1);
		console.log (qName + " value is " + $("input[name='" + qName + "']:checked").val() + ", but correct ans is " + answers[i]);
		if ($("input[name='" + qName + "']:checked").val() == answers[i]) {
			ansCorrect++;
		}
	}

	if(ansCorrect >= 12) {
		$("#scoreJudgment").html("Groovy!! Your Three's Company knowledge would make Jack, Janet & the rest of the gang proud!");
	} else if (ansCorrect >= 10) {
		$("#scoreJudgment").html("Far Out! You are a true Three's Company aficionado!");
	} else if (ansCorrect >= 8) {
		$("#scoreJudgment").html("Not bad. You've definitely reveled in the gloriousness that is Three's Company!");
	} else if (ansCorrect >= 4) {
		$("#scoreJudgment").html("<a href='https://www.amazon.com/Threes-Company-Complete-John-Ritter/dp/B00KN2KY4W/ref=sr_1_1?ie=UTF8&qid=1496716195&sr=8-1&keywords=3s+company' target='_blank'>Study up</a> and play again.");
	} else if (ansCorrect >= 1) {
		$("#scoreJudgment").html("Bummer... you should probably be ashamed of yourself.");
	} else {
		$("#scoreJudgment").html("If you're not going to take this game seriously, the game won't take you seriously.");
	}

	console.log(ansCorrect);
}

function bumper() {
	clearInterval(timerID);
	musicPlaying.currentTime = 0;
	clockTick.currentTime = 0;
	musicPlaying.pause();
	clockTick.pause();
    musicBumper.play();
   	checkScore();

   	// Switch page display
	$("#display-score").html(ansCorrect);
	$("#main-container").hide();
	$("#time-container").hide();
	$("#bumper-page").show();
	
	timeLeft = 0;
    timerID = setInterval(function() {
		timeLeft++;
		if(timeLeft%4 == 1) {
			$("#calc-text").html(".calculating score.");
		} else if (timeLeft%4 == 2) {
			$("#calc-text").html("..calculating score..");
		} else if (timeLeft%4 == 3) {
			$("#calc-text").html("...calculating score...");
		} else {
			$("#calc-text").html("calculating score");
		}
	}, 200);

	setTimeout(function() {
		clearInterval(timerID);
		$("#bumper-page").hide();
		$("#end-page").show();
		musicEnd.currentTime = 0;
		musicEnd.play();
	}, 16000);
}

function playGame() {
	musicPlaying.play();
	musicPlaying.addEventListener('ended', function() {
    	this.play();
    }, false);

    timerID = setInterval(function() {
    	timeLeft--;
    	$("#time-left").html(timeLeft);
    	if(timeLeft == 11) {
    		clockTick.play();
    	}
    	if (timeLeft <= 0) {
    		clearInterval(timerID);
    		musicPlaying.pause();
    		// animate red flashing 0
    		$("#time-left").css("color", "red");
    		for (var i = 0; i < 4; i++) {
        		$("#time-left").fadeOut(500);
        		$("#time-left").fadeIn(500);
        	}

    		// Delay 3 seconds before switching to bumper page
    		setTimeout(function() {
				bumper();
			}, 3000);
    	}
    	console.log("TL1 = " + timeLeft);
	}, 1000);
}