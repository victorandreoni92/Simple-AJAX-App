        // Script for running the number-guessing game
            var upper_value = 700; // Max value in range
            var lower_value = 0; // Min value in range
            var secret_value = 7; // The value the user is guessing for
            
            // Set up the webpage to display the instructions of the game with the upper_value and lower_value
            // values established based on the variables
            function setup(){
              document.getElementById("game_instructions").innerHTML = " <h2>Welcome to the number guessing game! </h1> \
               <img src='./guess.png' class='center' /> \
               <br/><br/> To play, insert a number between " + lower_value + " and " + upper_value + " on \
              the text box below. Then, click on the guess button to see if you got it right!";
           
            }
            
            // Validate the secret_value given as input
            function validate_answer(){
                var input = parseInt(document.getElementById("secret_value").value);
                
                document.getElementById("message").innerHTML = ""; // Reset message for each run
                
                // If nothing was given as an input or a string was given, signal invalid input
                if (!input || input.length == 0 || isNaN(input)){
                    alert("Invalid input!");
                    return;
                }
                
                // Handle guesses outside of the lower_value upper_value range
                if (input > upper_value || input < lower_value) {
                    document.getElementById("message").innerHTML = "<span style= 'color: green'>Did you read the instructions??</span> <br /> \
                    Your guess was out of the range of possibilities!";
                    
                    return;
                }
                
                // Handle valid input
                if (input == secret_value) {
                    // Hide input textbox and button to prevent user from playing before making decision
                    document.getElementById("secret_value").style.visibility="hidden";
                    document.getElementById("guess_button").style.visibility="hidden";
                    
                    // Show winning information
                    document.getElementById("message").innerHTML = "<span style= 'color: blue'>You won!</span> <br /> Do you want to play again?";
                    document.getElementById("yes_button").style.visibility="visible";
                    document.getElementById("no_button").style.visibility="visible";
                    
                } else if (input > secret_value){
                    document.getElementById("message").innerHTML = "<span style= 'color: red'>Your guess was too high!</span>";
                } else {
                    document.getElementById("message").innerHTML = "<span style= 'color: red'>Your guess was too low!</span>";
                }
            }
            
            // Handle the player's decision to play again or not
            function repeat(decision){
                if (decision) { // If playing again
                    // Show input box and button
                    document.getElementById("secret_value").style.visibility="visible";
                    document.getElementById("guess_button").style.visibility="visible";
                    
                    
                    document.getElementById("game_form").reset(); // Reset form
                    document.getElementById("message").innerHTML = ""; // Reset message
                    
                    // Hide replay buttons
                    document.getElementById("yes_button").style.visibility="hidden";
                    document.getElementById("no_button").style.visibility="hidden";
                    
                    // Focus input box for next round
                    document.getElementById("secret_value").focus();
                } else {
                    alert("Thanks for playing! The page will now be reloaded");
                    window.location.reload();
                }
            }
            
             // Handle user pressing enter while in the text box
             // Prevent form submission and call validate_answer() instead
            function processKeyDown(e){ 
                if (!e) var e = window.event; // Get event
                
                var pressedKey = e.keyCode || e.which; // Get keycode from the event
                
                if (pressedKey == 13) { // If the pressed key was enter (code 13), then validate secret_value.
                    validate_answer();
                }
            }

