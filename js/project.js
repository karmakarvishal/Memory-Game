let symbols=['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],
opened=[],
cardsMatch=0,
moves=0,
$deck=$(".deck"),
$scorePanel=$("scorePanel"),
$moveNumber=$(".moves"),
$ratingStars=$(".fa-star"),
oneStar=20,
threeStars=8,
twoStars=12,
totalcards=8,
currentTimer,
second = 0,
$timer = $('.timer');


//shuffle

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


function gameStart()
{
	var cards=shuffle(symbols);
	$deck.empty();
	moves=0;
	match=0;
	for(var i=0;i<cards.length;i++)
	{	console.log(cards[i]);
		$deck.append($('<li class="cards"><i class="fa fa-' + cards[i] + '"></i></li>'));
	}
	cardsMatch=0;





					cardListen();







}

function cardListen()
{
		var count=1;
		$deck.find(".cards").bind('click',function(){
		if(count==1)
		{
			//timer starts here
			resetTimer(currentTimer);
			second = 0;
			$timer.text(`${second}`)
			initTime();
			count++;
			//ends here
		}


		var $this=$(this);
		if($this.hasClass("open")||$this.hasClass("match"))
		{
			return true;

		}

		else
		 {
			 $this.addClass("open show");
		 }


			 var cardValue=$this.context.innerHTML;
			 opened.push(cardValue);



			 if(opened.length>1)
			 {
				 if(cardValue===opened[0])
				 {
					 $deck.find(".open").addClass("match animated flip");
					 setTimeout(function(){
						 $deck.find(".match").removeClass("open show animated flip");
					 },500);
					 cardsMatch++;


				 }
				 else{
					 $deck.find(".open").addClass("notMatch animated shake");
					 setTimeout(function(){
						 $deck.find(".open").removeClass("animated shake");
					 },500);
					 setTimeout(function(){
						 $deck.find(".open").removeClass("open show notMatch animated shake");
					 },500);
				 }


				 moves++;
				 setRating(moves);
				 opened=[];
			 }

			 $moveNumber.html(moves);
			 if(totalcards==cardsMatch)
			 {


			 	setRating(moves);
				 setTimeout(function(){
					 var x = document.getElementById("snackbar")
	 x.className = "show";
	 setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
 },500);
				 clearInterval(currentTimer);
				  var score=setRating(moves).score;
				 setTimeout(function() {
				 	gameOver(moves,score);
				 },400);
			 }

	});
}







//restarts the game

$(".restart").bind('click',function () {
	swal({
		closeOnEsc: false,
	  closeOnClickOutside: false,
		title: 'Are you sure?',
		text: "Your progress will be Lost!",
		icon: 'warning',

		button: 'Yes, Restart Game!'
	}).then(function (isConfirm) {
		if (isConfirm) {
			gameStart();
			$(".fa").each(function()
		{
			$(this).removeClass('fa-star-o').addClass('fa-star');
		});
			$timer.html(0);
			resetTimer(currentTimer);
			$moveNumber.html(0);
		}
	})
});



//timer function definition

function initTime() {
	currentTimer = setInterval(function () {
		$timer.text(`${second}`);
		second = second + 1;
	}, 1000);
}

function resetTimer(timer) {
	if (timer) {
		clearInterval(timer);
	}
}

//end game functionality
// End Game
function gameOver(moves, score) {

	var tempTime=second-1;
	swal({
		closeOnEsc: false,
	  closeOnClickOutside: false,
		title: 'Congratulations! You Won!',
		text: 'With ' + moves + ' Moves and ' + score + ' Stars in ' + tempTime + ' Seconds.\n Woooooo!',
		icon: 'success',
		button: 'Play again!'
	}).then(function (isConfirm) {
		if (isConfirm) {
			gameStart();
			$timer.html(0);
			$moveNumber.html(0);
			$(".fa").each(function()
		{
			$(this).removeClass('fa-star-o').addClass('fa-star');
		});

		}
	})
}
//RATING OF Stars
function setRating(moves)
{
	var rating=3;

	if(moves>threeStars && moves<=twoStars)
	{
		$ratingStars.eq(2).removeClass("fa-star").addClass("fa-star-o");
		rating=3-1;
	}
	 if(moves>twoStars && moves<=oneStar)
	{
		$ratingStars.eq(1).removeClass("fa-star").addClass("fa-star-o");
		rating=3-2;
	}
	if(moves>oneStar)
	{
		$ratingStars.eq(0).removeClass("fa-star").addClass("fa-star-o");
		rating=0;
	}
	console.log(rating);

	return {score:rating};
}



gameStart();
