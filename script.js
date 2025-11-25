// getting form values
const form = document.getElementById("superMarioBrosSurvey");
const emailInput = form.elements["email"];
const usernameInput = form.elements["username"];

//listening to form submission event
form.addEventListener("submit", (event) => {
    event.preventDefault();

    //clearErrors
    clearErrors();

    //validating the form
    if(validateForm()) {
        form.submit();
    }
    
    else {
        console.error("Form has errors.");
    }

});

/**
 * Validates the form by making sure that all fields are entered and that there are no blanks.
 * The email is of complex pattern regex 
 * Username is of this pattern "^[A-Za-z0-9]+$
 * The date of birth is filled out and as date pattern.
 * validating that a radio button for favorite character is selected.
 * ensures at least one checkbox is selected for favorite power ups.
 * ensures a valid selection of a dropdown menu is made.
 * ensure the text area is not blank.
 * 
 * if any fields fail validation an error message will appear.
 * 
 * @returns {boolean} -returns false if these fields fail validation.
 *                    - returns 'true' if the form is valid.
 */

function validateForm() {
    let isValid = true;
    const username = usernameInput.value;
    const usernamePattern = /^[A-Za-z0-9]+$/; //username pattern regex
    //validation for username
    if (!usernamePattern.test(username)) {
        console.error("Please enter a valid username.");
        showInputError(document.getElementById("username"), "Please enter a valid username.");
        isValid = false;
    }
        
    //complex email validation
    const emailInputValue = emailInput.value;
    const complexEmailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; //email pattern regex.

    if(!complexEmailPattern.test(emailInputValue)) {
        console.error("Please enter a valid email address.");
        showInputError(document.getElementById("email"), "Please enter a valid email address.");
        isValid = false;
    }

    //Date of birth validation
    const birthday = document.getElementById("birthday").value;
    if(birthday === "") {
        console.error("Please enter your date of birth.");
        showInputError(document.getElementById("birthday"), "Please enter your date of birth.");
        isValid = false;
    }

    //radio button validation
    const characterButton = document.querySelector('input[name="character"]:checked');
    if(!characterButton) {
        console.error("Please choose an option.");
        showInputError(document.querySelector('input[name="character"]'), "Please choose an option.");
        isValid = false;
    }

    //checkbox button validation
    const powerUps = document.querySelectorAll('input[name="power-ups"]:checked');
    if(powerUps.length === 0) {
        console.error("Please choose an option.");
        showInputError(document.querySelector('input[name="power-ups"]'), "Please choose an option.");
        isValid = false;
    }
   

    //Dropdown menu validation
    const dropMenu = document.getElementById("options").value;
    if(dropMenu === "blank") {
        console.error("Drop down option not selected.");
        showInputError(document.getElementById("options"), "Drop down option not selected.");
        isValid = false;
    }

    //Text bot validation
    const textBox = document.getElementById("text-area").value;
    if(textBox.trim() === "") {
        console.error("Text answer cannot be blank.");
        showInputError(document.getElementById("text-area"), "Text answer cannot be blank.");
        isValid = false;
    }

    return isValid; 
    
};

//input error function
/**
 * Function for displaying error message when data fails validation.
 * prompts user when there is a problem and what to fix
 * @param {*HTMLElement} inputElement -the input element from the HTML that has failed validation.
 * @param {*string} message  -the error message that will be displayed on screen.
 */
function showInputError(inputElement, message) {
    const container = inputElement.closest(".input-container");

    const errorDisplay = document.createElement("span");
    errorDisplay.innerText = message;
    errorDisplay.className = "error";
    errorDisplay.setAttribute("role", "alert");

    container.appendChild(errorDisplay);
}

//clear errors
const clearErrors = () => {
    const errorMessages = document.querySelectorAll(".error");
    errorMessages.forEach((errorField) => {
        errorField.remove();
    });
};