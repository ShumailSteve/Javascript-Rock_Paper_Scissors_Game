// Get elements from index file
const buttons = document.querySelectorAll('.pick');
const scoreEL  = document.getElementById('score');
const scoreCL  = document.getElementById('comscore');
const main  = document.getElementById('main');
const selection  = document.getElementById('selection');
const user_select = document.getElementById('user_select');
const computer_select = document.getElementById('computer_select');
const winner = document.getElementById('winner');
const rock = document.getElementById('rock_test');

// User Score
let score = 0;

// Computer Score
let comscore = 0;

// Array of available choices
const choices = ['paper', 'rock', 'scissors'];

// Set user Choice to undefined initially
let userChoice = undefined;

// Get value of data-choice of each button (icon)
buttons.forEach((button) => {  
      button.addEventListener('click', () => {
            userChoice = button.getAttribute('data-choice');

            //Check winner between user and computer
            checkWinner(); 
              // Game counter
              counter = counter + 1;  

            // End game if counter = 5 and how results 
              if(counter == 5){        
                showResult();      
              }
            
              else{        
                showResult();
              }
      });
});

// Start game again (Play Again)
reset.addEventListener('click', () => {    
      main.style.display = 'flex';
      selection.style.display = 'none';

      // stop game by setting user and computer scores to 0
      stop_game();
});

// Check winner between user and computer
function checkWinner() {

        // Select any random icon 
          const computerChoice = pickRandomChoice();
  
        // Display user and computer choice
        updateSelection(user_select, userChoice);
        updateSelection(computer_select, computerChoice);

        //GAME RULES  
        // Draw game if user and computer have the same choice
        if(userChoice === computerChoice){          
          winner.innerText = 'draw';
        }

        // Check if User Win 
        else if(
              (userChoice === 'paper' && computerChoice === 'rock') || (userChoice === 'rock' && computerChoice === 'scissors')
              ||
              (userChoice === 'scissors' && computerChoice === 'paper')
         )  {
            // Display User Win
            updateScore();
            winner.innerText = 'you win';
        }
          
         // Else Computer Win
        else {
          
          // Display User Lost
          updateComscore();
          winner.innerText = 'you loss';
        }
};

// Set Counter to 0
var counter = 0;

//Update User Score
function updateScore(value){ 
   score += 1;
   scoreEL.innerText = score;
};

//Update User Score
function updateComscore(){
   comscore += 1;
   scoreCL.innerText = comscore;
};

 // Randomly pick computer choice
function  pickRandomChoice(){
  return choices[Math.floor(Math.random() * choices.length)];
};

// Update Selected choices details 
function updateSelection(selectionEL, choice) {
  
    //Reset class of buttons
    selectionEL.classList.remove('btn-paper');
    selectionEL.classList.remove('btn-rock');
    selectionEL.classList.remove('btn-scissors');

    //Update the selected images 
    const img = selectionEL.querySelector('img');
    selectionEL.classList.add(`btn-${choice}`);
    img.src = `./images/icon-${choice}.svg`;  
    img.alt = choice;
}

//Show Results of the game
function showResult()
{
      main.style.display = 'none';
        selection.style.display = 'flex';
        document.getElementById("reset").hidden = true;
        document.getElementById("user_select").hidden = false;
        document.getElementById("computer_select").hidden = false;
        document.getElementById("labelYouPicked").hidden = false;
        document.getElementById("labelComputerPicked").hidden = false;
  
    // Display result for 1.5 secs
      setTimeout(()=>{
          main.style.display = 'flex';
          selection.style.display = 'none';

        // Unhide Play Again button and hide other elemnets if counter = 5
          if(counter == 5){
                main.style.display = 'none';
                selection.style.display = 'flex';
                document.getElementById("reset").hidden = false;
                document.getElementById("user_select").hidden = true;
                document.getElementById("computer_select").hidden = true;
                document.getElementById("labelYouPicked").hidden = true;
                document.getElementById("labelComputerPicked").hidden = true;
            
                // if computerscore is greater than userscore Com Win
                if(comscore > score){
                  winner.innerText = "Computer Win";
                }
            
                // if userscore is greater than computerscore User Win
                else if(score > comscore ){
                  winner.innerText ="You Win";
                }
                  
                 // Else Draw 
                else if(score == comscore)
                {
                  winner.innerText = "Draw";
                }
                counter = 0;
          }
        }, 1500)
}

// Stop Game by setting scores to 0 
function stop_game()
{
    //Set scores to 0
  	score = 0;
    comscore = 0;
  
    // Update score board
		document.getElementById("score").innerHTML=score;
		document.getElementById("comscore").innerHTML=comscore;
}

