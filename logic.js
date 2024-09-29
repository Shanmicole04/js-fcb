let board;
let score = 0;
let rows = 4;
let columns = 4;

// Initialize high score from localStorage
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
document.getElementById("highScore").innerText = highScore;

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;
let is16384Exist = false;

function setGame() {
    board = [
        [20000, 20000, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");

    if (num > 0) {
        tile.innerText = num.toString();
        if (num < 8192) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

window.onload = function () {
    setGame();
}

function handleSlide(e) {
    console.log(e.code);

    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
        if (e.code == "ArrowLeft") {
            slideLeft();
            setTwo();
        } else if (e.code == "ArrowRight") {
            slideRight();
            setTwo();
        } else if (e.code == "ArrowUp") {
            slideUp();
            setTwo();
        } else if (e.code == "ArrowDown") {
            slideDown();
            setTwo();
        }
    }

    document.getElementById("score").innerText = score;

    // Update high score if current score is higher
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore); // Save new high score to localStorage
        document.getElementById("highScore").innerText = highScore; // Update high score in UI
    }

    setTimeout(() => {
        checkWin();
    }, 100);

    if (hasLost() == true) {
        setTimeout(() => {
            alert("Game Over! Would you like to restart the game?");
            restartGame();
            alert("Thanks for playing! If you want to play again, just click the arrow ");
        }, 100);
    }
}

document.addEventListener("keydown", handleSlide);

// Rest of your game logic functions (slideLeft, slideRight, slideUp, slideDown, setTwo, etc.)


function slideLeft(){

	for(let r=0; r<rows; r++){

		let row = board[r];
		row = slide(row);
		board[r] = row;

		for(let c=0; c<columns; c++){

			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile, num);


			}
		}
	}

	function slideRight(){
	//Start the first loop
	for(let r=0; r<rows; r++)
	{
		//Slide the tiles on the current row

		board[r]=slide(board[r].reverse());
		board[r].reverse()
		//Start the second loop
		for(let c=0; c<columns; c++)
		{
		//Update tiles
		let tile = document.getElementById(r.toString() + "-" + c.toString());
		updateTile(tile, board[r][c]);
		}
	}
}

	function filterZero(row) {
		return row.filter(num => num != 0);	
	}

function slide(tiles){
	tiles = filterZero(tiles);

	for(let i=0; i < tiles.length-1; i++){
		if(tiles[i] == tiles[i+1]){
			tiles[i] = tiles[i] * 2;
			tiles[i+1] = 0;
            score += tiles[i];
		}
	}

	tiles = filterZero(tiles);

	while(tiles.length < columns){
		tiles.push(0);
	}
	return tiles;
}

function slideUp(){

	for(let c=0; c<columns; c++){

		let col = [board[0][c], board[1][c], board[2][c], board[3][c]]
		col = slide(col);
		
		for(let r=0; r<columns; r++){

			board[r][c] = col[r];


			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];

			updateTile(tile, board[r][c]);


			}
		}
	}

	function slideDown() {

    for (let c = 0; c < columns; c++) {

        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        
        col.reverse();
        col = slide(col);
        col.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = col[r];

            // Update the corresponding tile in the DOM
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
	

function hasEmptyTile(){
		for(let r=0; r<rows; r++){
			for(let c=0; c<columns; c++){
				if(board[r][c] == 0){
					return true;
				}
			}
		}
		return false;
	}

	function setTwo(){
		if(hasEmptyTile() == false){
			return;
		}

	let found = false;

	while(found == false){
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);

		if(board[r][c] == 0){

			board[r][c] = 2;
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			

			tile.innerText = "2";
			tile.classList.add("x2");

			found = true;	
		}

	}
}



function checkWin(){
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {

         if(board[r][c] == 2048 && is2048Exist == false){
         	alert("You Win! you got the 2048");
         	is2048Exist = true;
         }
         else if(board[r][c] == 4096 && is4096Exist == false){
         	alert("You are unstoppable at 4096! You are fantastically unstappable!");
         	is4096Exist = true;
         }
         else if(board[r][c] == 8192 && is8192Exist == false){
         	alert("victory! You have reached 8192! Your are incredible awesome!");
         	is8192Exist = true;

          }
          else if (board[r][c] == 16384 && is16384Exist == false) { // New condition for 16384
                alert("Incredible! You have reached 16384! You are a HALIMAW!");
                is16384Exist = true;
         }
        }
    }
}

function hasLost(){

	for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
        

        if(board[r][c] == 0){
        	return false;
        	}	

    const currentTile = board[r][c];

    if(
        r > 0 && board[r-1][c] === currentTile || 
        r < 3 && board[r+1][c] === currentTile || 
        c > 0 && board[r][c-1] === currentTile || 
        c > 3 && board[r][c+1] === currentTile
        ){
        return false;
    }
    
        }
       
    }
     return true;
}

 function restartGame(){

 	board = [
 		[0, 0, 0, 0],    
 		[0, 0, 0, 0],
 		[0, 0, 0, 0],
 		[0, 0, 0, 0]
 	];

 	setTwo();
 	setTwo();
 }

