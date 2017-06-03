var answers = [4,1,2,1,4,3,4,1,3,3,4,2];
var qName = "";
var ansCorrect = 0;

$( document ).ready(function() {
	reset();
	var musicOpen = document.createElement('audio');
	musicOpen.setAttribute('src', 'assets/music/3s Opening.mp3');
	var musicBumper = document.createElement('audio');
	musicBumper.setAttribute('src', 'assets/music/3s Bumper.mp3');
	var musicPlaying = document.createElement('audio');
	musicPlaying.setAttribute('src', 'assets/music/3s Playing.mp3');
	var musicEnd = document.createElement('audio');
	musicEnd.setAttribute('src', 'assets/music/3s Ending.mp3');

	musicOpen.play();
/*	$("input[name='asdf']").change(function(){
    	if ($(this).val() === '1') {
     		console.log ("1 was selected");
	    } else if ($(this).val() === '2') {
	    	console.log ("2 was selected");
	    } 
	});*/

	$("button[name='btnStart']").click(function(){
    	$("#start-page").hide();
    	$("#main-container").show();
    	musicOpen.pause();
    	musicPlaying.play();
    	musicPlaying.addEventListener('ended', function() {
        	this.play();
	    }, false);
	});

	$("button[name='qEnd']").click(function(){
    	checkScore();
    	$("#display-score").html(ansCorrect);
    	$("#main-container").hide();
    	$("#end-page").show();
    	musicPlaying.pause();
    	musicEnd.play();
	});

	$("button[name='btnReplay']").click(function(){
		reset();
    	$("#end-page").hide();
    	$("#main-container").show();
    	musicEnd.pause();
    	musicPlaying.play();
	});
});

function reset (){
	for (var i = 0; i < answers.length; i++) {
		qName = "q" + (i + 1);
		$("input[name='" + qName + "']").prop('checked', false);
	}
	ansCorrect = 0;
}

function checkScore(){
	for (var i = 0; i < answers.length; i++) {
		qName = "q" + (i + 1);
		console.log (qName + " value is " + $("input[name='" + qName + "']:checked").val() + ", but correct ans is " + answers[i]);
		if ($("input[name='" + qName + "']:checked").val() == answers[i]) {
			ansCorrect++;
		}
	}
	console.log(ansCorrect);
}