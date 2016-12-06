//VARIABLES

var newGameBtn = document.getElementById('js-newGameButton'),

	pickRock = document.getElementById('js-playerPick_rock'),
	pickPaper = document.getElementById('js-playerPick_paper'),
	pickScissors = document.getElementById('js-playerPick_scissors'),

	newGameElem = document.getElementById('js-newGameElement'),

	pickElem = document.getElementById('js-playerPickElement'),
	resultsElem = document.getElementById('js-resultsTableElement'),
	playerPointsElem = document.getElementById('js-playerPoints'),
	playerNameElem = document.getElementById('js-playerName'),
 	computerPointsElem = document.getElementById('js-computerPoints'),
	playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult'),
	computerPickIcon = document.createElement('i'),
	playerPickIcon = document.createElement('i');

var gameState = 'notStarted',
	player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	};

//LISTENERS

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

//OTHER

computerPickIcon.setAttribute('aria-hidden', 'true');
playerPickIcon.setAttribute('aria-hidden', 'true');

//FUNCTIONS

function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'ended':
			newGameBtn.innerText = 'Jeszcze raz';
			playerResultElem.innerHTML = 'Zaczynamy!';
			computerResultElem.innerHTML = 'Zaczynamy!';
		case 'notStarted':
		default: 
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	}
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

 function newGame() {
 	player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
 	if (player.name) {
 		player.score = computer.score = 0;
 		gameState = 'started';
 		setGameElements();

 		playerNameElem.innerHTML = player.name;
 		setGamePoints();
	} else {
		window.alert('Podaj swoje imię, plz! :)');
	}
}

function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}



function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';
	if(playerPick == computerPick) {
		winnerIs = 'noone';
		playerResultElem.innerHTML = 'Remis!';
		computerResultElem.innerHTML = 'Remis!';

	} else if (
		(computerPick == 'rock' && playerPick == 'scissors') ||
		(computerPick == 'scissors' && playerPick == 'paper') ||
		(computerPick =='paper' && playerPick =='rock')) {

		winnerIs = 'computer';
	}

	if (winnerIs == 'player') {
		playerResultElem.innerHTML = 'Wygrana!';
		player.score++;
	}	else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = 'Wygrana!';
		computer.score++;
	}

	setGamePoints();

	if (computer.score == 10) {
		window.alert('Wygrał komputer');
		gameState = 'ended';
		setGameElements();
	} else if (player.score == 10) {
		window.alert(player.name + '! Zwycięstwo!');
		gameState = 'ended';
		setGameElements();		
	}
}

function playerPick(playerPick) {
	console.log(playerPick);
	var computerPick = getComputerPick();

	if (playerPick == 'scissors') {
		playerPickIcon.className += 'fa fa-hand-scissors-o';
	} else if (playerPick == 'rock') {
		playerPickIcon.className += 'fa fa-hand-rock-o';	
	} else if (playerPick == 'paper') {
		playerPickIcon.className += 'fa fa-hand-paper-o';	
	}

	if (computerPick == 'scissors') {
		computerPickIcon.className += 'fa fa-hand-scissors-o';
	} else if (computerPick == 'rock') {
		computerPickIcon.className += 'fa fa-hand-rock-o';	
	} else if (computerPick == 'paper') {
		playerPickIcon.className += 'fa fa-hand-paper-o';	
	}

	computerPickElem.appendChild(computerPickIcon);
	playerPickElem.appendChild(playerPickIcon);

/*
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
*/
	checkRoundWinner(playerPick, computerPick);
}



