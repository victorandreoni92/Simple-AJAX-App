// Script for running the number-guessing game
// Victor Andreoni    
            
// Set up the webpage to display the instructions of the game with the upper_value and lower_value
// values established based on the variables
function setup(){
    var upper_value = parseInt(document.getElementById("serverMax").value); // Max value in range
    var lower_value = parseInt(document.getElementById("serverMin").value); // Min value in range
    var secret_value = parseInt(document.getElementById("serverTarget").value); // The value the user is guessing for
            
    document.getElementById("game_instructions").innerHTML = " <h2>Welcome to the number guessing game! </h1> \
        <img src='./guess.png' class='center' /> \
        <br/><br/> To play, insert a number between " + lower_value + " and " + upper_value + " on \
        the text box below. Then, click on the guess button to see if you got it right!";
           
}
            
// Validate the secret_value given as input
// Notifies user of validation result via DOM modification
function validate_answer(){
    var input = parseInt(document.getElementById("secret_value").value);
    var upper_value = parseInt(document.getElementById("serverMax").value); // Max value in range
    var lower_value = parseInt(document.getElementById("serverMin").value); // Min value in range
    var secret_value = parseInt(document.getElementById("serverTarget").value); // The value the user is guessing for
                
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
// @param decision argument specifying whether user wants to play again or not
function repeat(decision){
    if (decision) { // If playing again
        requestUpdatedTarget();
        // Show input box and button
        document.getElementById("secret_value").style.visibility="visible";
        document.getElementById("guess_button").style.visibility="visible";                    
                    
        document.getElementById("secret_value").value = ""; // Reset textbox
        document.getElementById("message").innerHTML = "Target number has been reset!"; // Reset message
                    
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
            
// Requests server for new target value by using AJAX
function requestUpdatedTarget(){
    var upper_value = parseInt(document.getElementById("serverMax").value); // Max value in range
    var lower_value = parseInt(document.getElementById("serverMin").value); // Min value in range
    var timestamp = new Date().getTime(); // Get stamp to append to url to prevent IE AJAX caching
    var request = getXHR();
    request.onreadystatechange =
        function() {
            if(request.readyState == 4 && request.status == 200) {
                setUpdatedTarget(request.responseText);
            }
        };
    // Add timestamp to URL to prevent Internet Explorer from caching AJAX request and giving same target
    // value when user plays game more than twice
    request.open('GET', "/updateTarget?upper=" + upper_value + "&lower=" + lower_value + "&ts=" + timestamp + "", true);
    request.send();
            
}
            
// Modifies DOM to set new target received from server
// @param newTarget The new target to update DOM to
function setUpdatedTarget(newTarget){                
    document.getElementById("serverTarget").value = parseInt(newTarget);
}
            
// Cross-browser compatible XMLHttpRequest         
// Credits to Fotiman from http://www.webmasterworld.com/javascript/4027629.htm
/** 
* Gets an XMLHttpRequest. For Internet Explorer 6, attempts to use MXSML 3.0.
* @return {XMLHttpRequest or equivalent ActiveXObject} 
*/ 
function getXHR() { 
    return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); 
}

// Handles key presses on input box to allow for submission via enter key
function handle_keypress(event){
    var key = event.keyCode || event.which; // Get keycode from event
    
    if (key == 13){
        validate_answer(); // If return key was pressed, validate answer
    }
}
             

